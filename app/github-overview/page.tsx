"use client";

import React, { useState } from "react";
import {
  Github,
  Terminal,
  Upload,
  Package,
  Cloud,
  Coffee,
  GitBranch,
  Link as LinkIcon,
  Rocket,
} from "lucide-react";
import Image from "next/image";
import { DecoCross } from "@/app/Components/session-docs/DecoCross";
import { DecoZigZag } from "@/app/Components/session-docs/DecoZigZag";
import { DecoCircle } from "@/app/Components/session-docs/DecoCircle";
import { CommandBlock } from "@/app/Components/session-docs/CommandBlock";
import { StepCard } from "@/app/Components/session-docs/StepCard";
import { ScreenshotPlaceholder } from "@/app/Components/session-docs/ScreenshotPlaceholder";
import { Lightbox } from "@/app/Components/session-docs/Lightbox";
import { SectionHeader } from "@/app/Components/session-docs/SectionHeader";

const REPO_IMAGES = [
  "https://res.cloudinary.com/dlvkywzol/image/upload/v1767971419/90039510-1094-4dda-b5ca-04f292e6400a.png",
  "https://res.cloudinary.com/dlvkywzol/image/upload/v1767971508/aeb0ce11-92e3-4883-a878-3f663312fe24.png",
  "https://res.cloudinary.com/dlvkywzol/image/upload/v1767971603/5c7fb8da-be5f-4e8c-b666-da85bd1a82c4.png",
  "https://res.cloudinary.com/dlvkywzol/image/upload/v1767971668/03eeb8d4-762a-4833-817b-fbb0ea66a98b.png",
  "https://res.cloudinary.com/dlvkywzol/image/upload/v1767971745/9f6b3bde-5e47-400c-8ce9-fdda5c6c2232.png",
  "https://res.cloudinary.com/dlvkywzol/image/upload/v1767971802/48817d3c-a043-4f96-ac48-5b4eed261e4e.png",
];

const REPO_IMAGES_DESC = [
  "Create a new repository",
  "Empty repository",
  "Initial commit",
  "Pushed files",
  "Branches",
  "Committed changes",
]

export default function GithubGuide() {
  const [lightbox, setLightbox] = useState<{ open: boolean; src: string }>(
    {
      open: false,
      src: "",
    }
  );

  const openLightbox = (src: string) => {
    setLightbox({ open: true, src });
  };

  return (
    <div className="min-h-screen text-black relative overflow-hidden font-['Gesit','Gesit-Regular',sans-serif] selection:bg-yellow-300 selection:text-black bg-[#f0f0f0] pb-20">
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <DecoCross className="hidden md:block absolute top-20 right-20 w-16 h-16 text-black opacity-100" />
        <DecoCross className="hidden md:block absolute bottom-40 left-10 w-24 h-24 text-yellow-400 opacity-100" />
        <DecoCircle className="hidden md:block absolute top-[15%] left-[5%] w-32 h-32 border-black opacity-40" />
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-16 md:pt-24 mb-16 relative z-10">
        <div className="bg-[#ffbe0b] border-4 border-black p-8 md:p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative">
          <DecoZigZag className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-48 h-8 text-red-500" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <div className="inline-block bg-black text-white px-4 py-1 text-xl font-bold mb-4">
                THE ONE TRUE METHOD
              </div>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] mb-4">
                GIT GUD
                <br />
                AT{" "}
                <span className="text-white text-stroke-3 text-stroke-black">
                  GITHUB
                </span>
              </h1>
              <p className="text-2xl font-bold max-w-xl">
                Stop dragging and dropping files like a peasant. Learn the
                command line. It's fast, it's raw, and it works.
              </p>
            </div>

            <div className="bg-black p-4 rounded-xl transition-all duration-300 w-full md:w-auto">
              <Github size={180} className="text-white mx-auto" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 space-y-24 relative z-10">
        {/* --- GIT SETUP (2x2 grid) - Windows & macOS split, linux removed */}
        <section>
          <SectionHeader title="Git Setup" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* A: Install Git (Windows) */}
            <StepCard number="A" title="Install Git (Windows)" icon={Terminal}>
              <p className="mb-4">Download and run the Git for Windows installer. Defaults are fine for beginners.</p>

              <div className="space-y-4">
                <CommandBlock command="https://git-scm.com/download/win" label="Download Git for Windows" />
                <div className="text-[16px] text-gray-700">
                  <p className="mb-2">Run the downloaded .exe and follow the installer. After installation, verify:</p>
                  <CommandBlock command="git --version" label="Verify Git" />
                </div>

                <div className="mt-3">
                  <div className="inline-block bg-black text-white px-3 py-1 text-xs font-bold uppercase mb-2 transform -rotate-1">
                    Optional: GitHub CLI (Windows)
                  </div>
                  <p className="text-[16px] text-gray-700 mb-2">You can install the GitHub CLI to make authentication easier:</p>
                  <CommandBlock command="winget install --id GitHub.cli" label="Install gh (winget)" />
                </div>
              </div>
            </StepCard>

            {/* B: Install Git (macOS) */}
            <StepCard number="B" title="Install Git (macOS)" icon={Terminal}>
              <p className="mb-4">Recommended: install via Homebrew. Alternatively, use Xcode Command Line Tools.</p>

              <div className="space-y-4">
                <CommandBlock command={`/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`} label="Install Homebrew (if needed)" />
                <CommandBlock command="brew install git" label="Install Git (Homebrew)" />
                <CommandBlock command="xcode-select --install" label="Or: Xcode Command Line Tools" />
                <CommandBlock command="git --version" label="Verify Git" />

                <div className="mt-3">
                  <div className="inline-block bg-black text-white px-3 py-1 text-xs font-bold uppercase mb-2 transform -rotate-1">
                    Optional: GitHub CLI (macOS)
                  </div>
                  <CommandBlock command="brew install gh" label="Install gh (Homebrew)" />
                </div>
              </div>
            </StepCard>

            {/* C: Configure Identity */}
            <StepCard number="C" title="Configure Identity" icon={GitBranch}>
              <p className="mb-4">Set your name and email so commits are attributed to you.</p>

              <div className="space-y-4">
                <CommandBlock command="git config --get user.name" label="Check username" />
                <CommandBlock command={`git config --global user.name "Your Name"`} label="Set name" />
                <CommandBlock command={`git config --global user.email "your.email@example.com"`} label="Set email" />
                <div className="mt-2 text-sm text-gray-700">
                  <p className="mb-2">Verify your configuration:</p>
                  <CommandBlock command="git config --list" label="Show config" />
                </div>
              </div>
            </StepCard>

            {/* D: Authenticate with GitHub (gh auth login) */}
            <StepCard number="D" title="Authenticate with GitHub" icon={Cloud}>
              <p className="mb-4">Use the GitHub CLI to authenticate (recommended). It guides you through a web-based login and makes HTTPS pushes painless.</p>

              <div className="space-y-4">
                <CommandBlock command="gh auth login" label="Start GitHub CLI login" />
                <div className="text-[16px] text-gray-700">
                  <ol className="list-decimal list-inside space-y-2">
                    <li>Select <strong>GitHub.com</strong>.</li>
                    <li>Choose <strong>HTTPS</strong> for Git operations (recommended).</li>
                    <li>Choose <strong>Login with a web browser</strong> and follow the code flow (enter code at github.com/login/device).</li>
                  </ol>
                </div>
                <CommandBlock command="gh auth status" label="Check GitHub auth" />
              </div>
            </StepCard>
          </div>
        </section>

        {/* --- SECTION 1: THE BASICS (The Workflow) --- */}
        <section>
          <SectionHeader title="The Workflow" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <StepCard number="01" title="Initialize" icon={Terminal}>
              <p className="mb-4">Create a new local repository. This tells Git to start watching your folder.</p>
              <CommandBlock command="git init" label="Run once per project" />
            </StepCard>

            <StepCard number="02" title="Staging" icon={Upload}>
              <p className="mb-4">Select the files you want to save. The <span className="bg-yellow-300 px-1">.</span> adds everything.</p>
              <CommandBlock command="git add ." label="Add all files" />
            </StepCard>

            <StepCard number="03" title="Commit" icon={Package}>
              <p className="mb-4">Wrap your changes in a package with a label. Be descriptive.</p>
              <CommandBlock command={'git commit -m "First commit"'} label="Save snapshot" />
            </StepCard>

            <StepCard number="04" title="Connect" icon={LinkIcon}>
              <p className="mb-4">Link your local repo to the specific GitHub URL. This builds the bridge.</p>
              <CommandBlock command="git remote add origin <URL>" label="Set Destination" />
            </StepCard>

            <StepCard number="05" title="Liftoff" icon={Rocket} className="md:col-span-2 md:w-2/3 md:mx-auto">
              <p className="mb-4">Send your commits to the cloud. The <code className="bg-yellow-300 font-bold px-1">-u</code> remembers where you pushed for next time.</p>
              <CommandBlock command="git push -u origin main" label="Upload to Github" />
            </StepCard>
          </div>
        </section>

        {/* ... rest unchanged (Java walkthrough, repo gallery, lightbox) */}
        <section className="relative">
          <div className="absolute -top-10 -right-10 hidden md:block">
            <Coffee size={120} strokeWidth={1} className="text-orange-200" />
          </div>

          <div className="bg-[#1a1a1a] text-white p-6 md:p-12 border-4 border-black shadow-[16px_16px_0px_0px_#000000] relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row gap-6 md:items-end mb-12 border-b-2 border-gray-700 pb-8">
                <div>
                  <h2 className="text-4xl md:text-6xl font-black text-white mb-2">
                    JAVA <span className="text-[#f89820]">EDITION</span>
                  </h2>
                  <p className="text-gray-400 font-mono text-lg">Scenario: You wrote your first Hello World and need to flex it.</p>
                </div>

              </div>

              <div className="mb-16">
                <div className="inline-block bg-[#f89820] text-black px-4 py-1 font-black mb-4 uppercase text-lg">
                  0. The Context
                </div>
                <div className="flex flex-col lg:flex-row gap-6 items-start">
                  <div className="flex-1 w-full">
                    <p className="text-xl font-bold mb-4">
                      You have a file named
                      <code className="text-[#f89820]"> Main.java</code>.
                    </p>
                    <pre className="bg-gray-800 rounded-lg border-2 border-gray-600 p-6 font-mono text-sm leading-relaxed overflow-x-auto shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)]">
                      {`public class Main {
    public static void main(String[] args) {
      System.out.println("Hello World");
    }
}`}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="space-y-20">
                <div className="border-l-4 border-[#f89820] pl-6 md:pl-10 relative">
                  <div className="absolute -left-3.5 top-0 w-6 h-6 bg-[#f89820] rounded-full border-4 border-[#1a1a1a]"></div>
                  <h3 className="text-3xl font-black text-white mb-2 uppercase">1. Initialize</h3>
                  <p className="text-gray-400 text-lg mb-6">Turn this folder into a repository.</p>

                  <div className="grid grid-cols-1 gap-6">
                    <CommandBlock command="git init" />
                    <ScreenshotPlaceholder
                      onImageClick={openLightbox}
                      items={[
                        "https://res.cloudinary.com/dlvkywzol/image/upload/v1767967999/Screenshot_2026-01-09_194230_cropped_processed_by_imagy_u8wdgs.png",
                        "https://res.cloudinary.com/dlvkywzol/image/upload/v1767967715/Screenshot_2026-01-09_193716_aif7gz.png",
                      ]}
                    />
                  </div>
                </div>

                <div className="border-l-4 border-[#f89820] pl-6 md:pl-10 relative">
                  <div className="absolute -left-3.5 top-0 w-6 h-6 bg-[#f89820] rounded-full border-4 border-[#1a1a1a]"></div>
                  <h3 className="text-3xl font-black text-white mb-2 uppercase">2. Stage File</h3>
                  <p className="text-gray-400 text-lg mb-6">Tell git to track your Java file.</p>

                  <div className="grid grid-cols-1 gap-6">
                    <CommandBlock command="git add Main.java" />
                    <ScreenshotPlaceholder
                      onImageClick={openLightbox}
                      items={[
                        "https://res.cloudinary.com/dlvkywzol/image/upload/v1767968182/3_dfnsjm.png",
                        "https://res.cloudinary.com/dlvkywzol/image/upload/v1767968285/Screenshot_2026-01-09_194749_mty0hh.png",
                      ]}
                    />
                  </div>
                </div>

                <div className="border-l-4 border-[#f89820] pl-6 md:pl-10 relative">
                  <div className="absolute -left-3.5 top-0 w-6 h-6 bg-[#f89820] rounded-full border-4 border-[#1a1a1a]"></div>
                  <h3 className="text-3xl font-black text-white mb-2 uppercase">3. Commit</h3>
                  <p className="text-gray-400 text-lg mb-6">Save the version history.</p>

                  <div className="grid grid-cols-1 gap-6">
                    <CommandBlock command={'git commit -m "Added hello world"'} />
                    <ScreenshotPlaceholder
                      onImageClick={openLightbox}
                      items={[
                        "https://res.cloudinary.com/dlvkywzol/image/upload/v1767968557/5_ashbia.png",
                        "https://res.cloudinary.com/dlvkywzol/image/upload/v1767968636/ec1c3a9e-709a-4334-9a07-2cb7ac8dbad0.png",
                      ]}
                    />
                  </div>
                </div>

                <div className="border-l-4 border-[#f89820] pl-6 md:pl-10 relative">
                  <div className="absolute -left-3.5 top-0 w-6 h-6 bg-[#f89820] rounded-full border-4 border-[#1a1a1a]"></div>
                  <h3 className="text-3xl font-black text-white mb-2 uppercase">4. Connect Remote</h3>
                  <p className="text-gray-400 text-lg mb-6">Point your local folder to your GitHub URL.</p>

                  <div className="grid grid-cols-1 gap-6">
                    <CommandBlock command="git remote add origin https://github.com/you/repo.git" />
                    <ScreenshotPlaceholder
                      onImageClick={openLightbox}
                      items={[
                        "https://res.cloudinary.com/dlvkywzol/image/upload/v1767968957/Screenshot_2026-01-09_195823_16x9_vm6wpf.png",
                        "https://res.cloudinary.com/dlvkywzol/image/upload/v1767968636/ec1c3a9e-709a-4334-9a07-2cb7ac8dbad0.png",
                      ]}
                    />
                  </div>
                </div>

                <div className="border-l-4 border-[#f89820] pl-6 md:pl-10 relative">
                  <div className="absolute -left-3.5 top-0 w-6 h-6 bg-[#f89820] rounded-full border-4 border-[#1a1a1a]"></div>
                  <h3 className="text-3xl font-black text-white mb-2 uppercase">5. Push Code</h3>
                  <p className="text-gray-400 text-lg mb-6">Send it to the internet.</p>

                  <div className="grid grid-cols-1 gap-6">
                    <CommandBlock command="git push -u origin main" />
                    <ScreenshotPlaceholder
                      onImageClick={openLightbox}
                      items={[
                        "https://res.cloudinary.com/dlvkywzol/image/upload/v1767970869/6_m7ochj.png",
                        "https://res.cloudinary.com/dlvkywzol/image/upload/v1767968636/ec1c3a9e-709a-4334-9a07-2cb7ac8dbad0.png",
                      ]}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="flex justify-center mb-8">
            <h2 className="text-3xl font-black bg-yellow-300 px-8 py-4 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              REPOSITORY GALLERY
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {REPO_IMAGES.map((src, i) => (
              <div key={i} className="group size-75 bg-white p-4 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all">
                <div className="h-48 bg-gray-100 border-2 border-black mb-4 flex items-center justify-center relative overflow-hidden">
                  <Image width={200} height={200} src={src} alt={`Img ${i + 1}`} className="w-full h-full object-cover cursor-pointer" onClick={() => openLightbox(src)} />

                </div>

                <p className="text-lg font-bold text-gray-600">{REPO_IMAGES_DESC[i]}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Lightbox
        open={lightbox.open}
        src={lightbox.src}
        onClose={() => setLightbox({ open: false, src: "" })}
      />
    </div>
  );
}
