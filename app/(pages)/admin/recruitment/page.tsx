"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { createClient } from "@/supabase/client";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ExternalLink,
  FileText,
  Download,
  Search,
  ChevronDown,
  ChevronUp,
  X,
} from "lucide-react";

const DataTable = dynamic(
  () => import("@/app/Components/Reusables/DataTable"),
  { ssr: false },
);

type Applicant = {
  id: string;
  user_id: string;
  name: string;
  email: string;
  phone: string;
  year: number;
  branch: string;
  domain_pref_1: string;
  domain_pref_2: string | null;
  domain_pref_3: string | null;
  tech_domain: string;
  socials_domain: string;
  linkedin_url: string;
  github_url: string | null;
  codeforces_url: string;
  codechef_url: string | null;
  other_cp_url: string | null;
  cgpa: number | null;
  resume_url: string;
  motive: string;
  value_addition: string;
  projects: string;
  created_at: string;
};

type TaskRow = {
  id: string;
  applicant_id: string;
  user_id: string;
  task_domain: string;
  task_links: string[];
  task_details: Record<string, unknown>;
  status: string;
  created_at: string;
};

// Joined view for the table: one row per task submission + applicant details.
// Applicants without a task yet appear with task_domain = "— (details only)".
type Submission = Applicant & {
  task_id: string | null;
  task_domain: string;
  task_links: string[];
  task_details: Record<string, unknown>;
  status: string;
  task_created_at: string | null;
};

const STATUS_COLORS: Record<string, string> = {
  submitted: "bg-yellow-100 text-yellow-800 border-yellow-300",
  reviewed: "bg-blue-100 text-blue-800 border-blue-300",
  shortlisted: "bg-green-100 text-green-800 border-green-300",
  rejected: "bg-red-100 text-red-800 border-red-300",
};
/** Build a browser-viewable URL for resume PDFs.
 *  Azure Blob URLs work directly (correct Content-Type headers).
 *  Old Cloudinary URLs go through a proxy. */
function getResumeViewUrl(url: string): string {
  if (!url) return "";
  // Azure Blob Storage serves PDFs correctly — use direct URL
  if (url.includes("blob.core.windows.net")) return url;
  // Cloudinary raw URLs need the proxy
  return `/api/view-resume?url=${encodeURIComponent(url)}`;
}

export default function AdminRecruitmentPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [domainFilter, setDomainFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    setLoading(true);
    const { data: applicants, error: appError } = await supabase
      .from("recruitment_applicants")
      .select("*")
      .order("created_at", { ascending: false });

    if (appError) {
      toast.error("Failed to fetch applicants");
      console.error(appError);
      setLoading(false);
      return;
    }

    const { data: tasks, error: taskError } = await supabase
      .from("recruitment_task_submissions")
      .select("*")
      .order("created_at", { ascending: false });

    if (taskError) {
      toast.error("Failed to fetch task submissions");
      console.error(taskError);
    }

    const tasksByApplicant = new Map<string, TaskRow[]>();
    for (const t of (tasks as TaskRow[]) || []) {
      const list = tasksByApplicant.get(t.applicant_id) || [];
      list.push(t);
      tasksByApplicant.set(t.applicant_id, list);
    }

    const joined: Submission[] = [];
    for (const a of (applicants as Applicant[]) || []) {
      const applicantTasks = tasksByApplicant.get(a.id) || [];
      if (applicantTasks.length === 0) {
        joined.push({
          ...a,
          task_id: null,
          task_domain: "— (details only)",
          task_links: [],
          task_details: {},
          status: "details-only",
          task_created_at: null,
        });
      } else {
        for (const t of applicantTasks) {
          joined.push({
            ...a,
            task_id: t.id,
            task_domain: t.task_domain,
            task_links: t.task_links,
            task_details: t.task_details,
            status: t.status,
            task_created_at: t.created_at,
          });
        }
      }
    }

    setSubmissions(joined);
    setLoading(false);
  };

  const updateStatus = async (taskId: string | null, status: string) => {
    if (!taskId) {
      toast.error("No task submitted yet for this applicant");
      return;
    }
    const { error } = await supabase
      .from("recruitment_task_submissions")
      .update({ status })
      .eq("id", taskId);

    if (error) {
      toast.error("Failed to update status");
    } else {
      setSubmissions((prev) =>
        prev.map((s) => (s.task_id === taskId ? { ...s, status } : s)),
      );
      toast.success(`Status updated to ${status}`);
    }
  };

  const filtered = submissions.filter((s) => {
    const matchesSearch = `${s.name} ${s.email} ${s.branch}`
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesDomain =
      domainFilter && domainFilter !== "all" ? s.task_domain === domainFilter : true;
    const matchesStatus =
      statusFilter && statusFilter !== "all" ? s.status === statusFilter : true;
    return matchesSearch && matchesDomain && matchesStatus;
  });

  const uniqueDomains = [...new Set(submissions.map((s) => s.task_domain))];

  const exportCsv = () => {
    const headers = [
      "Name", "Email", "Phone", "Year", "Branch",
      "Pref 1", "Pref 2", "Pref 3",
      "Tech Domain", "Socials Domain",
      "LinkedIn", "GitHub", "Codeforces", "Codechef", "Other CP",
      "CGPA", "Resume URL",
      "Motive", "Value Addition", "Projects",
      "Task Domain", "Task Links", "Status", "Submitted At",
    ];
    const rows = filtered.map((s) => [
      s.name, s.email, s.phone, s.year, s.branch,
      s.domain_pref_1, s.domain_pref_2 || "", s.domain_pref_3 || "",
      s.tech_domain, s.socials_domain,
      s.linkedin_url, s.github_url || "", s.codeforces_url, s.codechef_url || "", s.other_cp_url || "",
      s.cgpa ?? "", s.resume_url,
      `"${(s.motive || "").replace(/"/g, '""')}"`,
      `"${(s.value_addition || "").replace(/"/g, '""')}"`,
      `"${(s.projects || "").replace(/"/g, '""')}"`,
      s.task_domain, (s.task_links || []).join(" | "), s.status,
      new Date(s.task_created_at || s.created_at).toLocaleString(),
    ]);
    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `recruitment_submissions_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const rowKey = (s: Submission) => s.task_id || `applicant-${s.id}`;

  const columns = [
    {
      header: "Name",
      accessorKey: "name",
      cell: ({ row }: any) => {
        const key = row.original.task_id || `applicant-${row.original.id}`;
        const isOpen = expandedId === key;
        return (
          <span className="font-semibold flex items-center gap-1">
            {row.original.name}
            {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </span>
        );
      },
    },
    { header: "Email", accessorKey: "email" },
    { header: "Branch", accessorKey: "branch" },
    { header: "Year", accessorKey: "year" },
    { header: "Task Domain", accessorKey: "task_domain" },
    { header: "Pref 1", accessorKey: "domain_pref_1" },
    {
      header: "Resume",
      accessorKey: "resume_url",
      cell: ({ row }: any) => {
        const url = row.original.resume_url;
        return (
          <a
            href={getResumeViewUrl(url)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            <FileText size={14} />
            View
          </a>
        );
      },
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }: any) => {
        const s = row.original as Submission;
        if (!s.task_id) {
          return (
            <span className="px-2 py-0.5 text-xs font-bold uppercase rounded border bg-gray-100 text-gray-600 border-gray-300">
              details-only
            </span>
          );
        }
        return (
          <Select
            value={s.status}
            onValueChange={(v) => updateStatus(s.task_id, v)}
          >
            <SelectTrigger className="w-[130px]">
              <SelectValue>
                <span className={`px-2 py-0.5 text-xs font-bold uppercase rounded border ${STATUS_COLORS[s.status] || ""}`}>
                  {s.status}
                </span>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="submitted">Submitted</SelectItem>
              <SelectItem value="reviewed">Reviewed</SelectItem>
              <SelectItem value="shortlisted">Shortlisted</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        );
      },
    },
    {
      header: "Date",
      accessorKey: "created_at",
      cell: ({ row }: any) =>
        new Date(row.original.task_created_at || row.original.created_at).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
        }),
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Recruitment Submissions</h2>
          <p className="text-sm text-gray-500">
            {filtered.length} of {submissions.length} submissions
            (applicants + per-domain tasks)
          </p>
        </div>
        <Button onClick={exportCsv} variant="outline" className="flex items-center gap-2">
          <Download size={16} />
          Export CSV
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search name, email, branch..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={domainFilter} onValueChange={setDomainFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Domains" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Domains</SelectItem>
            {uniqueDomains.map((d) => (
              <SelectItem key={d} value={d}>{d}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="details-only">Details Only</SelectItem>
            <SelectItem value="submitted">Submitted</SelectItem>
            <SelectItem value="reviewed">Reviewed</SelectItem>
            <SelectItem value="shortlisted">Shortlisted</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
        {(search || domainFilter || statusFilter) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => { setSearch(""); setDomainFilter(""); setStatusFilter(""); }}
            className="flex items-center gap-1"
          >
            <X size={14} /> Clear
          </Button>
        )}
      </div>

      {/* Table */}
      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading submissions...</div>
      ) : (
        <>
          <DataTable
            data={filtered.map((d) => ({ ...d, domainFilter, statusFilter }))}
            columns={columns}
            onRowClick={(row: any) => {
              const key = row.task_id || `applicant-${row.id}`;
              setExpandedId(expandedId === key ? null : key);
            }}
          />

          {/* Expanded Detail Panel */}
          {expandedId && (
            <ExpandedDetail
              submission={submissions.find((s) => rowKey(s) === expandedId)!}
              onClose={() => setExpandedId(null)}
            />
          )}
        </>
      )}
    </div>
  );
}

/* ========== Expanded Submission Detail ========== */

function ExpandedDetail({
  submission: s,
  onClose,
}: {
  submission: Submission;
  onClose: () => void;
}) {
  if (!s) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">{s.name}</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-6">
          <Detail label="Email" value={s.email} />
          <Detail label="Phone" value={s.phone} />
          <Detail label="Year" value={`${s.year}`} />
          <Detail label="Branch" value={s.branch} />
          <Detail label="CGPA" value={s.cgpa ? String(s.cgpa) : "—"} />
          <Detail label="Status" value={s.status} />
        </div>

        <Section title="Domain Preferences">
          <Detail label="Preference 1" value={s.domain_pref_1} />
          <Detail label="Preference 2" value={s.domain_pref_2 || "—"} />
          <Detail label="Preference 3" value={s.domain_pref_3 || "—"} />
          <Detail label="Tech Domain" value={s.tech_domain} />
          <Detail label="Socials Domain" value={s.socials_domain} />
        </Section>

        <Section title="Profile Links">
          <LinkRow label="LinkedIn" url={s.linkedin_url} />
          <LinkRow label="GitHub" url={s.github_url} />
          <LinkRow label="Codeforces" url={s.codeforces_url} />
          <LinkRow label="Codechef" url={s.codechef_url} />
          <LinkRow label="Other CP" url={s.other_cp_url} />
          <div className="col-span-2">
            <span className="text-gray-500 text-xs">Resume</span>
            <div className="mt-2 border-2 border-gray-200 rounded overflow-hidden" style={{ height: "400px" }}>
              <iframe
                src={getResumeViewUrl(s.resume_url)}
                className="w-full h-full"
                title="Resume Preview"
              />
            </div>
            <div className="flex items-center gap-4 mt-2">
              <a
                href={getResumeViewUrl(s.resume_url)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium text-sm"
              >
                <ExternalLink size={14} /> Open in New Tab
              </a>
              <a
                href={s.resume_url}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 font-medium text-sm"
              >
                <FileText size={14} /> Download
              </a>
            </div>
          </div>
        </Section>

        <Section title="About">
          <LongText label="Motive to Join" value={s.motive} />
          <LongText label="Value Addition" value={s.value_addition} />
          <LongText label="Projects / Experience" value={s.projects} />
        </Section>

        <Section title={`Task — ${s.task_domain}`}>
          {s.task_links && s.task_links.length > 0 ? (
            <div className="space-y-2">
              {(s.task_links || []).map((link, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-gray-500 text-xs font-mono">Link {i + 1}:</span>
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1 truncate"
                  >
                    {link} <ExternalLink size={12} />
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No task submitted yet — personal details only.</p>
          )}
        </Section>

        <div className="text-xs text-gray-400 mt-4">
          Submitted: {new Date(s.task_created_at || s.created_at).toLocaleString("en-IN")}
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h4 className="font-bold text-sm uppercase tracking-wider text-gray-500 mb-2 border-b pb-1">
        {title}
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">{children}</div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="text-gray-500 text-xs">{label}</span>
      <p className="font-medium">{value}</p>
    </div>
  );
}

function LinkRow({ label, url }: { label: string; url: string | null }) {
  if (!url || url === "Nil") return (
    <Detail label={label} value="—" />
  );
  return (
    <div>
      <span className="text-gray-500 text-xs">{label}</span>
      <a
        href={url.startsWith("http") ? url : `https://${url}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm truncate"
      >
        {url} <ExternalLink size={10} />
      </a>
    </div>
  );
}

function LongText({ label, value }: { label: string; value: string }) {
  return (
    <div className="col-span-2">
      <span className="text-gray-500 text-xs">{label}</span>
      <p className="text-sm bg-gray-50 p-3 rounded border mt-1 whitespace-pre-wrap">{value}</p>
    </div>
  );
}
