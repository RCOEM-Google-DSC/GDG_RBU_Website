"use client";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";
import { UIUser } from "../../../lib/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { CompleteProfileSheet } from "./CompleteProfileSheet";

interface ProfileHeaderProps {
  user: UIUser;
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  return (
    <div className="bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm rounded-3xl p-6 md:p-10 shadow-xl border border-neutral-200 dark:border-neutral-800 relative z-10">
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
        {/* Avatar Section */}
        <div className="relative group">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full p-1 bg-linear-to-tr from-blue-500 via-purple-500 to-pink-500 shadow-lg">
            <div className="w-full h-full rounded-full bg-white dark:bg-neutral-900 p-1 overflow-hidden relative">
              <Image
                src={user.avatarUrl}
                width={300}
                height={300}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="flex-1 text-center md:text-left space-y-4">
          <div>
            <div className="flex flex-col md:flex-row md:items-center gap-3 justify-center md:justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white">
                  {user.name}
                </h1>
                <p className="text-blue-600 dark:text-blue-400 font-medium text-lg mt-1">
                  {user.title}
                </p>
              </div>
              <CompleteProfileSheet 
                user={user}
                trigger={
                  <Button
                    className="flex items-center gap-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-5 py-2.5 rounded-full font-medium shadow-lg hover:transform hover:scale-105 transition-all active:scale-95 text-sm md:text-base whitespace-nowrap"
                  >
                    Complete your profile
                  </Button>
                }
              />
            </div>

            <p className="text-neutral-600 dark:text-neutral-400 mt-4 max-w-2xl leading-relaxed">
              {user.bio}
            </p>
          </div>

          {/* Contact Pills */}
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            <div className="flex items-center gap-2 bg-neutral-800 text-neutral-200 px-4 py-2 rounded-lg text-sm">
              <Mail className="w-4 h-4" />
              {user.email}
            </div>
            <div className="flex items-center gap-2 bg-neutral-800 text-neutral-200 px-4 py-2 rounded-lg text-sm">
              <Phone className="w-4 h-4" />
              {user.phone}
            </div>
            <div className="flex items-center gap-2 bg-neutral-800 text-neutral-200 px-4 py-2 rounded-lg text-sm">
              <MapPin className="w-4 h-4" />
              {user.location}
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4 justify-center md:justify-start pt-2">
            {[
              { Icon: Github, key: "github", href: user.profileLinks.github },
              {
                Icon: Linkedin,
                key: "linkedin",
                href: user.profileLinks.linkedin,
              },
              { Icon: Twitter, key: "twitter", href: user.profileLinks.twitter },
            ].map(({ Icon, key, href }) =>
              href ? (
                <Link
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  title={`Visit ${key} profile`}
                  aria-label={`Visit ${key} profile`}
                  className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded-full text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </Link>
              ) : (
                <Button
                  key={key}
                  disabled
                  aria-label={`${key} profile not available`}
                  className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded-full text-neutral-400 cursor-not-allowed"
                >
                  <Icon className="w-5 h-5" />
                </Button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
