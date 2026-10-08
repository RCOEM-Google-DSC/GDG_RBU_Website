"use client";

import { jsPDF } from "jspdf";
import type { Domain, TaskBrief } from "./constants";

const MARGIN = 15;
const PAGE_W = 210;
const PAGE_H = 297;
const CONTENT_W = PAGE_W - MARGIN * 2;

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  const v =
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h;
  return [
    parseInt(v.slice(0, 2), 16),
    parseInt(v.slice(2, 4), 16),
    parseInt(v.slice(4, 6), 16),
  ];
}

/** Drop the `backtick` inline-code markers used in brief text. */
function plain(s: string) {
  return s.replace(/`([^`]+)`/g, "$1");
}

function slug(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

let headerCache: { url: string; w: number; h: number } | null | undefined;

async function loadHeaderImage(): Promise<{
  url: string;
  w: number;
  h: number;
} | null> {
  if (headerCache !== undefined) return headerCache;
  try {
    const res = await fetch("/assets/header.png");
    if (!res.ok) throw new Error("header not found");
    const blob = await res.blob();
    const url = await new Promise<string>((resolve, reject) => {
      const r = new FileReader();
      r.onload = () => resolve(r.result as string);
      r.onerror = reject;
      r.readAsDataURL(blob);
    });
    const dims = await new Promise<{ w: number; h: number }>((resolve) => {
      const im = new Image();
      im.onload = () =>
        resolve({ w: im.naturalWidth || 873, h: im.naturalHeight || 214 });
      im.onerror = () => resolve({ w: 873, h: 214 });
      im.src = url;
    });
    headerCache = { url, ...dims };
  } catch {
    headerCache = null;
  }
  return headerCache;
}

export async function buildTaskDoc(domain: Domain, brief: TaskBrief) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const [dr, dg, db] = hexToRgb(domain.color);
  let y = 0;

  const footer = () => {
    const pages = doc.getNumberOfPages();
    for (let i = 1; i <= pages; i++) {
      doc.setPage(i);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(130);
      doc.text(
        `GDG RBU · Recruitment 2026-27 · ${domain.name} - ${brief.position}`,
        MARGIN,
        PAGE_H - 10,
      );
      doc.text(`${i} / ${pages}`, PAGE_W - MARGIN, PAGE_H - 10, {
        align: "right",
      });
    }
  };

  const need = (h: number) => {
    if (y + h > PAGE_H - 20) {
      doc.addPage();
      y = MARGIN;
    }
  };

  const wrapped = (text: string, size: number, style = "normal") => {
    doc.setFont("helvetica", style as "normal" | "bold");
    doc.setFontSize(size);
    return doc.splitTextToSize(text, CONTENT_W) as string[];
  };

  const writeLines = (lines: string[], x = MARGIN, gap = 4.5) => {
    for (const line of lines) {
      need(gap + 1);
      doc.text(line, x, y);
      y += gap;
    }
  };

  /* ---- Header: GDG banner + domain strip ---- */
  const header = await loadHeaderImage();
  if (header) {
    const imgH = Math.min(55, (PAGE_W * header.h) / header.w);
    doc.addImage(header.url, "PNG", 0, 0, PAGE_W, imgH, undefined, "FAST");
    y = imgH;
  } else {
    doc.setFillColor(dr, dg, db);
    doc.rect(0, 0, PAGE_W, 26, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("GOOGLE DEVELOPER GROUPS - RBU", MARGIN, 10);
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text("RECRUITMENT DRIVE 2026-27", MARGIN, 16.5);
    y = 26;
  }
  doc.setFillColor(dr, dg, db);
  doc.rect(0, y, PAGE_W, 8, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text("RECRUITMENT DRIVE 2026-27", MARGIN, y + 5.5);
  doc.text(`${domain.shortName} - ${brief.label}`, PAGE_W - MARGIN, y + 5.5, {
    align: "right",
  });

  y += 20;
  doc.setTextColor(0, 0, 0);

  /* ---- Title ---- */
  writeLines(wrapped(domain.name.toUpperCase(), 20, "bold"), MARGIN, 8);
  y += 1;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(90);
  writeLines(wrapped(`Position: ${brief.position}`, 11), MARGIN, 5.5);
  doc.setTextColor(0, 0, 0);
  if (brief.badge) {
    y += 1;
    need(8);
    doc.setFillColor(0, 0, 0);
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    const label = `  ${brief.badge.toUpperCase()}  `;
    const w = doc.getTextWidth(label) + 2;
    doc.rect(MARGIN, y - 4.5, w, 7, "F");
    doc.text(label, MARGIN + 1, y);
    y += 6;
    doc.setTextColor(0, 0, 0);
  }

  /* ---- Accent rule ---- */
  need(4);
  doc.setFillColor(dr, dg, db);
  doc.rect(MARGIN, y, CONTENT_W, 1.2, "F");
  y += 6;

  /* ---- Overview ---- */
  writeLines(wrapped(plain(brief.overview), 10.5), MARGIN, 5);
  y += 2;

  if (brief.note) {
    const lines = wrapped(`Note: ${brief.note}`, 9.5, "bold");
    const h = lines.length * 5 + 5;
    need(h);
    doc.setFillColor(255, 243, 205);
    doc.setDrawColor(251, 188, 4);
    doc.rect(MARGIN, y - 4, CONTENT_W, h, "FD");
    doc.setTextColor(0, 0, 0);
    writeLines(lines, MARGIN + 3, 5);
    y += 3;
  }

  /* ---- Sections ---- */
  for (const s of brief.sections) {
    y += 2;
    need(10);
    doc.setFillColor(dr, dg, db);
    doc.rect(MARGIN, y - 3.5, 3.5, 3.5, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    const head = doc.splitTextToSize(s.heading, CONTENT_W - 8) as string[];
    for (const line of head) {
      need(6);
      doc.text(line, MARGIN + 7, y);
      y += 5.5;
    }
    y += 1;
    for (const p of s.paragraphs ?? []) {
      writeLines(wrapped(plain(p), 10), MARGIN + 2, 5);
      y += 1;
    }
    if (s.table) {
      // Rubric | Points | Notes
      const widths = [52, 18, CONTENT_W - 2 - 52 - 18];
      const x0 = MARGIN + 2;
      const pad = 2.5;
      const lineH = 4.6;
      const drawRow = (cells: string[], header: boolean, shade: boolean) => {
        doc.setFont("helvetica", header ? "bold" : "normal");
        doc.setFontSize(header ? 9 : 9.5);
        const wrappedCells = cells.map((c, j) =>
          doc.splitTextToSize(plain(c), widths[j] - pad * 2) as string[],
        );
        const h = Math.max(...wrappedCells.map((w) => w.length)) * lineH + pad * 1.6;
        if (y + h > PAGE_H - 20) {
          doc.addPage();
          y = MARGIN;
        }
        if (header) doc.setFillColor(dr, dg, db);
        else doc.setFillColor(shade ? 243 : 255, shade ? 245 : 255, shade ? 244 : 255);
        doc.rect(x0, y, CONTENT_W - 2, h, "F");
        doc.setDrawColor(0, 0, 0);
        doc.setLineWidth(header ? 0.5 : 0.15);
        doc.line(x0, y + h, x0 + CONTENT_W - 2, y + h);
        let x = x0;
        wrappedCells.forEach((lines, j) => {
          doc.setFont("helvetica", header || j === 0 || j === 1 ? "bold" : "normal");
          doc.setTextColor(header ? 255 : 0);
          lines.forEach((line, k) => {
            const ty = y + pad + 3 + k * lineH;
            if (j === 1) doc.text(line, x + widths[j] / 2, ty, { align: "center" });
            else doc.text(line, x + pad, ty);
          });
          x += widths[j];
        });
        y += h;
      };
      need(14);
      const top = y;
      const startPage = doc.getNumberOfPages();
      drawRow(s.table.columns.map((c) => c.toUpperCase()), true, false);
      s.table.rows.forEach((row, r) => drawRow(row, false, r % 2 === 1));
      // Outer border only when the table stayed on one page
      if (doc.getNumberOfPages() === startPage) {
        doc.setLineWidth(0.5);
        doc.rect(x0, top, CONTENT_W - 2, y - top, "D");
      }
      doc.setTextColor(0, 0, 0);
      y += 5;
    }
    for (const b of s.bullets ?? []) {
      const bl = wrapped(`\u2022  ${plain(b)}`, 10);
      // indent wrapped continuation lines
      const first = bl[0];
      const rest = bl.slice(1).map((l) => `    ${l}`);
      writeLines([first, ...rest], MARGIN + 2, 5);
    }
    for (const c of s.code ?? []) {
      y += 1;
      need(12);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(110);
      doc.text((c.caption ?? c.lang).toUpperCase(), MARGIN + 2, y);
      y += 3;
      doc.setFont("courier", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(0, 0, 0);
      const lineH = 3.8;
      const codeW = CONTENT_W - 2;
      const lines = c.content
        .split("\n")
        .flatMap((l) => (l ? (doc.splitTextToSize(l, codeW - 6) as string[]) : [""]));
      lines.forEach((line, i) => {
        if (y + lineH > PAGE_H - 20) {
          doc.addPage();
          y = MARGIN;
        }
        // Shade line by line so the block survives page breaks. jsPDF's
        // text colour shares the fill operator, so reset the fill each time.
        doc.setFillColor(242, 242, 242);
        const top = i === 0 ? y - 1 : y;
        const h = i === 0 || i === lines.length - 1 ? lineH + 1 : lineH;
        doc.rect(MARGIN + 2, top, codeW, h, "F");
        doc.text(line, MARGIN + 5, y + 2.8);
        y += lineH;
      });
      y += 5;
    }
    for (const l of s.links ?? []) {
      const ll = wrapped(`- ${l.label}`, 9.5);
      need(ll.length * 4.5 + 2);
      doc.setTextColor(20, 80, 200);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9.5);
      for (const line of ll) {
        doc.textWithLink(line, MARGIN + 2, y, { url: l.url });
        y += 4.5;
      }
      doc.setTextColor(0, 0, 0);
    }
  }

  /* ---- Submission box ---- */
  y += 3;
  const subLines: string[] = [];
  brief.submission.forEach((s, i) => {
    const parts = doc.splitTextToSize(
      `${i + 1}. ${plain(s)}`,
      CONTENT_W - 6,
    ) as string[];
    subLines.push(...parts);
  });
  const boxH = subLines.length * 5 + 12;
  need(boxH > 60 ? 40 : boxH);
  const boxStart = y;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("SUBMISSION", MARGIN + 3, y + 2);
  y += 8;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  for (const line of subLines) {
    need(6);
    // if we spilled to a new page, redraw context is fine - keep simple border at end
    doc.text(line, MARGIN + 3, y);
    y += 5;
  }
  const boxEnd = y + 3;
  doc.setDrawColor(0, 0, 0);
  doc.setLineWidth(0.6);
  // draw border around the box (may span pages - jsPDF rect can't span, so draw per page simply)
  try {
    doc.rect(MARGIN, boxStart - 4, CONTENT_W, boxEnd - boxStart, "D");
  } catch {
    /* ignore border errors on page splits */
  }
  y += 4;

  /* ---- Contacts ---- */
  need(12);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("QUERIES? CONTACT", MARGIN, y);
  y += 6;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  for (const c of brief.contacts) {
    need(6);
    doc.text(`${c.name} - ${c.role} - ${c.phone}`, MARGIN + 2, y);
    y += 5;
  }

  footer();
  return doc;
}

export async function downloadTaskPdf(domain: Domain, brief: TaskBrief) {
  const doc = await buildTaskDoc(domain, brief);
  doc.save(`GDG-RBU_${slug(domain.name)}_${slug(brief.id)}_Task-2026-27.pdf`);
}
