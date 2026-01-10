"use client";

import React, { useState } from "react";
import {
  Github,
  Terminal,
  ArrowRight,
  Copy,
  Check,
  Upload,
  FileCode,
  Package,
  Cloud,
  Coffee,
  GitBranch,
  AlertCircle,
  Link as LinkIcon,
  Rocket,
  ArrowUp,
  Camera,
  Monitor,
  X,
} from "lucide-react";

const REPO_IMAGES = [
  "https://res.cloudinary.com/dlvkywzol/image/upload/v1767971419/90039510-1094-4dda-b5ca-04f292e6400a.png",
  "https://res.cloudinary.com/dlvkywzol/image/upload/v1767971508/aeb0ce11-92e3-4883-a878-3f663312fe24.png",
  "https://res.cloudinary.com/dlvkywzol/image/upload/v1767971603/5c7fb8da-be5f-4e8c-b666-da85bd1a82c4.png",
  "https://res.cloudinary.com/dlvkywzol/image/upload/v1767971668/03eeb8d4-762a-4833-817b-fbb0ea66a98b.png",
  "https://res.cloudinary.com/dlvkywzol/image/upload/v1767971745/9f6b3bde-5e47-400c-8ce9-fdda5c6c2232.png",
  "https://res.cloudinary.com/dlvkywzol/image/upload/v1767971802/48817d3c-a043-4f96-ac48-5b4eed261e4e.png",
];

type ClassNameProp = { className?: string };

const DecoCross: React.FC<ClassNameProp> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="4"
  >
    <path d="M6 6L18 18M6 18L18 6" />
  </svg>
);

const DecoZigZag: React.FC<ClassNameProp> = ({ className }) => (
  <svg
    viewBox="0 0 100 20"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="4"
  >
    <path d="M0 10 L10 0 L20 10 L30 0 L40 10 L50 0 L60 10 L70 0 L80 10 L90 0 L100 10" />
  </svg>
);

const DecoCircle: React.FC<ClassNameProp> = ({ className }) => (
  <div
    className={`${className ?? ""} rounded-full border-4 border-black bg-transparent`}
  />
);

// Fixed CopyButton: use async clipboard API with a robust fallback and removed active animation classes
const CopyButton: React.FC<{ text: string }> = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        // fallback for older browsers
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // final fallback attempt
      try {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (e) {
        // fail silently but log for debugging
        // console.error("Copy failed", e);
      }
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="absolute top-1/2 -translate-y-1/2 right-2 p-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
      title="Copy command"
      aria-label="Copy command"
    >
      {copied ? (
        <Check size={16} strokeWidth={3} className="text-white" />
      ) : (
        <Copy size={16} strokeWidth={3} className="text-white" />
      )}
    </button>
  );
};

const CommandBlock: React.FC<{ command: string; label?: string }> = ({
  command,
  label,
}) => (
  <div className="relative group w-full">
    {label && (
      <div className="inline-block bg-black text-white px-2 py-0.5 text-xs font-bold uppercase mb-1 transform -rotate-1">
        {label}
      </div>
    )}
    <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm border-4 border-black shadow-[6px_6px_0px_0px_#8338ec] relative">
      <div className="flex items-start gap-2">
        <span className="select-none text-gray-500 mt-1 mr-1">$</span>
        <div className="whitespace-pre-wrap break-words flex-1 min-w-0 pr-12">
          {command}
        </div>
      </div>
      <CopyButton text={command} />
    </div>
  </div>
);

type StepCardProps = {
  number: React.ReactNode;
  title: string;
  icon: React.ComponentType<any>;
  children?: React.ReactNode;
  className?: string;
};

const StepCard: React.FC<StepCardProps> = ({
  number,
  title,
  icon: Icon,
  children,
  className = "",
}) => (
  <div
    className={`bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-transform duration-300 relative ${className}`}
  >
    <div className="absolute -top-5 -left-5 bg-yellow-400 border-4 border-black w-12 h-12 flex items-center justify-center font-black text-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      {number}
    </div>
    <div className="mb-4 flex justify-between items-start pt-2">
      <h3 className="text-2xl font-black uppercase leading-none">{title}</h3>
      <Icon size={32} strokeWidth={2.5} className="text-red-500" />
    </div>
    <div className="font-medium text-lg leading-relaxed">{children}</div>
  </div>
);

type Slide = { src?: string; label?: string; description?: string };

const ScreenshotPlaceholder: React.FC<{
  src?: string;
  items?: Array<string | Slide>;
  onImageClick?: (src: string) => void;
}> = ({ src, items, onImageClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  let slides: Slide[] = [];
  if (Array.isArray(items) && items.length > 0) {
    slides = items.map((it) => (typeof it === "string" ? { src: it } : { src: it.src }));
  } else if (typeof src === "string" && src.length > 0) {
    slides = [{ src }];
  } else {
    slides = [{ src: "" }];
  }

  const hasMultiple = slides.length > 1;
  const current = slides[currentIndex];

  const next = () => setCurrentIndex((prev) => Math.min(prev + 1, slides.length - 1));
  const prev = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));

  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < slides.length - 1;

  return (
    <div className="mt-8 w-full aspect-video bg-black border-4 border-gray-700 border-dashed rounded-xl flex flex-col items-center justify-center text-gray-500 hover:bg-gray-900 transition-colors group relative overflow-hidden select-none">
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%)] bg-[length:20px_20px] opacity-20"></div>

      {hasMultiple && (
        <>
          {hasPrev && (
            <button
              onClick={(e) => {
                e.preventDefault();
                prev();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white text-black p-2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-30"
              title="Previous Image"
            >
              <ArrowRight className="rotate-180" size={24} />
            </button>
          )}

          {hasNext && (
            <button
              onClick={(e) => {
                e.preventDefault();
                next();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white text-black p-2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-30"
              title="Next Image"
            >
              <ArrowRight size={24} />
            </button>
          )}

          <div className="absolute bottom-4 flex gap-2 z-30">
            {slides.map((_, idx) => (
              <div
                key={idx}
                className={`w-3 h-3 border-2 border-black transition-colors ${idx === currentIndex ? "bg-[#ffbe0b]" : "bg-white"}`}
              />
            ))}
          </div>
        </>
      )}

      {current.src ? (
        <img
          src={current.src}
          alt={`Screenshot`}
          className="w-full h-full object-cover relative z-10 cursor-pointer hover:opacity-90 transition-opacity"
          onClick={() => onImageClick && onImageClick(current.src ?? "")}
        />
      ) : (
        <>
          <Camera
            size={48}
            className="mb-4 text-gray-600 group-hover:text-gray-400 transition-colors relative z-10"
          />
          <span className="font-black uppercase tracking-widest text-sm md:text-base text-center px-16 relative z-10 animate-in fade-in zoom-in duration-200">
            Place Screenshot Here
          </span>
          <span className="text-xs mt-2 text-gray-600 relative z-10">
            Aspect Ratio 16:9 Recommended
          </span>
        </>
      )}
    </div>
  );
};

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
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-4xl md:text-5xl font-black uppercase bg-white border-4 border-black px-6 py-2 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              Git Setup
            </h2>
            <ArrowRight size={40} strokeWidth={3} className="hidden md:block" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* A: Install Git (Windows) */}
            <StepCard number="A" title="Install Git (Windows)" icon={Terminal}>
              <p className="mb-4">Download and run the Git for Windows installer. Defaults are fine for beginners.</p>

              <div className="space-y-4">
                <CommandBlock command="https://git-scm.com/download/win" label="Download Git for Windows" />
                <div className="text-sm text-gray-700">
                  <p className="mb-2">Run the downloaded .exe and follow the installer. After installation, verify:</p>
                  <CommandBlock command="git --version" label="Verify Git" />
                </div>

                <div className="mt-3">
                  <div className="inline-block bg-black text-white px-3 py-1 text-xs font-bold uppercase mb-2 transform -rotate-1">
                    Optional: GitHub CLI (Windows)
                  </div>
                  <p className="text-sm text-gray-700 mb-2">You can install the GitHub CLI to make authentication easier:</p>
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
                <div className="text-sm text-gray-700">
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
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-4xl md:text-5xl font-black uppercase bg-white border-4 border-black px-6 py-2 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              The Workflow
            </h2>
            <ArrowRight size={40} strokeWidth={3} className="hidden md:block" />
          </div>

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
                    <p className="text-xl font-bold mb-4">You have a file named <code className="text-[#f89820]">Main.java</code>.</p>
                    <div className="bg-gray-800 rounded-lg border-2 border-gray-600 p-6 font-mono text-sm leading-relaxed overflow-x-auto shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)]">
{`public class Main {
  public static void main(String[] args) {
    System.out.println("Hello GitHub!");
  }
}`}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-20">
                <div className="border-l-4 border-[#f89820] pl-6 md:pl-10 relative">
                  <div className="absolute -left-[14px] top-0 w-6 h-6 bg-[#f89820] rounded-full border-4 border-[#1a1a1a]"></div>
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
                  <div className="absolute -left-[14px] top-0 w-6 h-6 bg-[#f89820] rounded-full border-4 border-[#1a1a1a]"></div>
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
                  <div className="absolute -left-[14px] top-0 w-6 h-6 bg-[#f89820] rounded-full border-4 border-[#1a1a1a]"></div>
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
                  <div className="absolute -left-[14px] top-0 w-6 h-6 bg-[#f89820] rounded-full border-4 border-[#1a1a1a]"></div>
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
                  <div className="absolute -left-[14px] top-0 w-6 h-6 bg-[#f89820] rounded-full border-4 border-[#1a1a1a]"></div>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {REPO_IMAGES.map((src, i) => (
              <div key={i} className="group bg-white p-4 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all">
                <div className="h-48 bg-gray-100 border-2 border-black mb-4 flex items-center justify-center relative overflow-hidden">
                  <img src={src} alt={`Fig ${i + 1}`} className="w-full h-full object-cover cursor-pointer" onClick={() => openLightbox(src)} />
                  
                </div>

                <h3 className="font-black uppercase text-lg">Fig {i + 1}</h3>
                <p className="text-sm font-bold text-gray-600">Click image to open full view.</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {lightbox.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 cursor-zoom-out" onClick={() => setLightbox({ open: false, src: "" })}>
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm"></div>

          <div className="relative z-10 max-w-6xl w-full max-h-[90vh] bg-white border-4 border-black p-2 shadow-[10px_10px_0px_0px_#ffbe0b] cursor-default animate-in fade-in zoom-in duration-300" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setLightbox({ open: false, src: "" })} className="absolute -top-6 -right-6 bg-red-500 text-white border-4 border-black p-2 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none active:translate-y-2 active:shadow-none transition-all z-20" title="Close">
              <X size={32} strokeWidth={4} />
            </button>

            <div className="relative w-full h-full bg-gray-100 flex flex-col">
              <div className="flex-1 overflow-auto flex items-center justify-center bg-[#1a1a1a] p-4 border-b-4 border-black min-h-[50vh]">
                <img src={lightbox.src} alt={`Screenshot`} className="max-w-full max-h-[75vh] object-contain shadow-2xl" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
