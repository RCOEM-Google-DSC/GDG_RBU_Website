"use client";

import { useParams, useRouter } from "next/navigation";
import { useTeamProfileData } from "@/hooks/useTeamProfileData";
import { useAuthUser } from "@/hooks/useAuthUser";
import { Github, Linkedin } from "lucide-react";

export default function TeamProfilePage() {
  const router = useRouter();
  const params = useParams();
  const profileUserId = params.userId as string;

  const { data, loading, error } = useTeamProfileData(profileUserId);
  const { user: authUser } = useAuthUser();

  const isOwner = authUser?.id === profileUserId;
  const isAdmin = authUser?.role === "admin";

  if (loading)
    return (
      <p className="text-center py-20 text-neutral-600">
        Loading profile...
      </p>
    );

  if (error || !data)
    return (
      <p className="text-center py-20 text-red-500">
        {error || "Profile not found"}
      </p>
    );

  return (
    <div className="max-w-5xl mx-auto py-16 px-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row gap-12 items-start">
        <img
          src={data.users.image_url}
          alt={data.users.name}
          className="w-56 h-56 rounded-2xl object-cover border-2 border-black shadow-lg"
        />

        <div className="flex-1">
          <h1 className="text-5xl font-black">{data.users.name}</h1>
          <p className="text-xl mt-2 font-semibold uppercase">
            {data.domain}
          </p>

          {/* SOCIALS */}
          <div className="flex gap-4 mt-4">
            {data.users.profile_links?.github && (
              <a
                href={data.users.profile_links.github}
                target="_blank"
                className="p-2 border rounded-full hover:bg-black hover:text-white transition"
              >
                <Github />
              </a>
            )}

            {data.users.profile_links?.linkedin && (
              <a
                href={data.users.profile_links.linkedin}
                target="_blank"
                className="p-2 border rounded-full hover:bg-[#0077b5] hover:text-white transition"
              >
                <Linkedin />
              </a>
            )}
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex gap-3 mt-6">
            {isOwner && (
              <button
                onClick={() => router.push("/member-dashboard/profile-edit")}
                className="px-5 py-2 bg-black text-white rounded-lg"
              >
                Edit Profile
              </button>
            )}

            {isAdmin && (
              <button
                onClick={() => router.push("/admin")}
                className="px-5 py-2 bg-red-600 text-white rounded-lg"
              >
                Admin Dashboard
              </button>
            )}
          </div>
        </div>
      </div>

      {/* BIO */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-2">About</h2>
        <p className="text-neutral-700 text-lg">
          {data.bio || "No bio added."}
        </p>
      </div>

      {/* THOUGHT */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-2">Thought</h2>
        <p className="text-neutral-700 text-lg">
          {data.thought || "No thoughts shared."}
        </p>
      </div>

      {/* CV */}
      {data.cv_url && (
        <div className="mt-12">
          <a
            href={data.cv_url}
            target="_blank"
            className="underline text-blue-600 font-medium"
          >
            View CV
          </a>
        </div>
      )}
    </div>
  );
}
