import { svgPaths } from "@/lib/svg/svg";
import clsx from "clsx";
import { CgMail } from "react-icons/cg";
import { FaYoutube, FaLinkedinIn, FaDiscord } from "react-icons/fa";
import { AiOutlineInstagram } from "react-icons/ai";
import { BsTwitterX } from "react-icons/bs";
import Image from "next/image";
import { NeoBrutalism, nb } from "@/components/ui/neo-brutalism";

type SocialButtonProps = {
  icon: React.ReactNode;
  label: string;
  href: string;
};

function SocialButton({ icon, label, href }: SocialButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={nb({
        border: 2,
        shadow: "md",
        rounded: "lg",
        hover: "shadowGrow",
        className:
          "group flex flex-row justify-center items-center gap-3 px-6 py-3 bg-white hover:bg-black hover:text-white transition-all duration-300",
      })}
    >
      <div className="w-10 h-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
        {icon}
      </div>
      <span className="font-['Open_Sans:Bold',sans-serif] font-bold text-lg whitespace-nowrap">
        {label}
      </span>
    </a>
  );
}

type Desktop10Helper2Props = {
  additionalClassNames?: string;
};

function Desktop10Helper2({
  additionalClassNames = "",
}: Desktop10Helper2Props) {
  return (
    <div className={clsx("absolute h-0 w-[83.129px]", additionalClassNames)}>
      <div className="absolute inset-[-1.32px_0]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 83.1294 2.63903"
        >
          <path
            d="M0 1.31951H83.1294"
            id="Vector 499"
            stroke="var(--stroke-0, black)"
            strokeWidth="2.63903"
          />
        </svg>
      </div>
    </div>
  );
}
type Desktop10Helper1Props = {
  additionalClassNames?: string;
};

function Desktop10Helper1({
  additionalClassNames = "",
}: Desktop10Helper1Props) {
  return (
    <div className={clsx("absolute size-10", additionalClassNames)}>
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 40 40"
      >
        <circle
          cx="20"
          cy="20"
          id="Ellipse 44"
          r="19"
          stroke="var(--stroke-0, black)"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}

function RightLogo() {
  return (
    <div className="absolute right-[50px] top-[100px] w-[121px] h-[143px]">
      <Image
        height={143}
        width={121}
        src="/assets/shapes/y-g.svg"
        alt="GDG Logo"
        className="w-full h-full"
      />
    </div>
  );
}

function LeftLogo() {
  return (
    <div className="absolute left-[50px] top-[100px] w-[123px] h-36">
      <Image
        height={144}
        width={123}
        src="/assets/shapes/r-b.svg"
        alt="GDG Logo"
        className="w-full h-full"
      />
    </div>
  );
}

function Desktop10Component() {
  return (
    <div className=" relative w-[1440px] h-[1024px]" data-name="Desktop - 10">
      <div
        className="fixed inset-0 pointer-events-none z-0 "
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      {/* neo brutalism box */}
      <NeoBrutalism
        border={4}
        shadow="xl"
        className="absolute h-24 left-[377px] top-[410px] w-[675px] z-10 bg-white"
      >
        {null}
      </NeoBrutalism>

      {/* right outer box */}
      <div className="absolute h-[146px] left-[759.5px] top-[390px] w-[335px] z-10">
        <div className="absolute inset-[-0.34%_-0.15%_-0.34%_-0.44%]">
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 336.977 147"
          >
            <path
              d={svgPaths.p34e4bd00}
              fill="var(--fill-0, #D9D9D9)"
              id="Vector 494"
              stroke="var(--stroke-0, black)"
            />
          </svg>
        </div>
      </div>
      <RightLogo />
      <LeftLogo />
      <p className="absolute font-geist font-extrabold leading-tight left-[calc(50%-344px)] text-[64px] text-black text-nowrap top-20 z-10 font-retron">
        Join Our Community
      </p>
      <p className="absolute font-geist font-extrabold leading-tight left-[calc(50%-424px)] text-[64px] text-black text-nowrap top-[165px] z-10 font-retron">
        Connect and Grow with us
      </p>
      <p className="absolute font-geist font-extrabold leading-tight left-[714.5px] -translate-x-1/2 text-[55px] text-black text-nowrap top-[430px] z-10">
        Unlock Your Potential.
      </p>

      <div className="absolute left-[289px] top-[565px] w-[870px] z-10">
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-4 gap-4">
            <SocialButton
              icon={<CgMail className="w-full h-full" />}
              label="Email"
              href="mailto:gdsc@rknec.edu"
            />
            <SocialButton
              icon={<FaYoutube className="w-full h-full" />}
              label="YouTube"
              href="https://youtube.com/@gdsc_rcoem"
            />
            <SocialButton
              icon={<FaDiscord className="w-full h-full" />}
              label="Discord"
              href="https://discord.gg/WgJDe2e9aj"
            />
            <SocialButton
              icon={<BsTwitterX className="w-full h-full" />}
              label="Twitter"
              href="https://twitter.com/gdsc_rcoem"
            />
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div className="col-start-2">
              <SocialButton
                icon={<AiOutlineInstagram className="w-full h-full" />}
                label="Instagram"
                href="https://www.instagram.com/gdg_rbu/"
              />
            </div>
            <SocialButton
              icon={<FaLinkedinIn className="w-full h-full" />}
              label="LinkedIn"
              href="https://www.linkedin.com/company/gdsc-rcoem/"
            />
          </div>
        </div>
      </div>

      <p className="absolute font-geist-mono font-medium leading-[normal] left-[calc(50%-11px)] text-[24px] text-black text-center top-[270px] translate-x-[-50%] w-[612px] z-10">
        Connect with like-minded individuals, share knowledge, and grow together
        across our platform
      </p>
      <p className="absolute font-geist-mono font-semibold leading-[normal] left-1/2 -translate-x-1/2 text-[#6e6d6d] text-[24px] text-nowrap top-[750px] z-10">
        Stay connected
      </p>
      <div className="absolute h-8 left-[348.5px] top-[385px] w-[87px]">
        <div className="absolute inset-[-3.13%_0_0_-1.15%]">
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 88 33"
          >
            <path
              d="M88 1H1V33"
              id="Vector 495"
              stroke="var(--stroke-0, black)"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>
      <div
        className="absolute flex h-[58.5px] items-center justify-center left-[901px] top-[710px] w-[80.5px]"
        style={
          {
            "--transform-inner-width": "0",
            "--transform-inner-height": "0",
          } as React.CSSProperties
        }
      >
        <div className="flex-none rotate-270 -scale-y-100">
          <div className="h-[80.5px] relative w-[58.5px]">
            <div className="absolute inset-[-1.24%_0_0_-1.71%]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 59.5 81.5"
              >
                <path
                  d="M59.5 1H1V81.5"
                  id="Vector 502"
                  stroke="var(--stroke-0, black)"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div
        className="absolute flex h-[67px] items-center justify-center left-[258px] top-[540px] w-[39.5px]"
        style={
          {
            "--transform-inner-width": "0",
            "--transform-inner-height": "0",
          } as React.CSSProperties
        }
      >
        <div className="flex-none rotate-90 -scale-y-100">
          <div className="h-[39.5px] relative w-[67px]">
            <div className="absolute inset-[-2.53%_0_0_-1.49%]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 68 40.5"
              >
                <path
                  d="M68 1H1V40.5"
                  id="Vector 498"
                  stroke="var(--stroke-0, black)"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute h-[94px] left-[347.5px] top-[445px] w-[17px]">
        <div className="absolute inset-[0_0_-1.06%_-5.88%]">
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 18 95"
          >
            <path
              d="M1 0V94H18"
              id="Vector 496"
              stroke="var(--stroke-0, black)"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>
      <div className="absolute h-[54px] left-[450px] top-[715px] w-[124px]">
        <div className="absolute inset-[0_0_-1.85%_-0.81%]">
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 125 55"
          >
            <path
              d="M1 0V54H125"
              id="Vector 500"
              stroke="var(--stroke-0, black)"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>
      <div className="absolute h-0 left-[400px] top-[538px] w-[98px]">
        <div className="absolute inset-[-7.36px_-1.02%_-7.36px_0]">
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 99 14.7279"
          >
            <path
              d={svgPaths.p23e1eb00}
              fill="var(--stroke-0, black)"
              id="Vector 497"
            />
          </svg>
        </div>
      </div>
      <div className="absolute left-[252px] size-14 top-[450px]">
        <div className="absolute bottom-1/4 left-[6.7%] right-[6.7%] top-0">
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 48.4974 42"
          >
            <path
              d={svgPaths.p10230200}
              id="Polygon 1"
              stroke="var(--stroke-0, black)"
              strokeWidth="3"
            />
          </svg>
        </div>
      </div>
      <div className="absolute left-[1207px] size-[34px] top-[610px]">
        <div className="absolute bottom-1/4 left-[15.29%] right-[15.29%] top-[11.76%]">
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 23.6004 21.5"
          >
            <path
              d={svgPaths.p27f72e00}
              id="Polygon 2"
              stroke="var(--stroke-0, black)"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>
      <div className="absolute h-6 left-[1002px] rounded-[2px] top-[670px] w-[38px]">
        <div
          aria-hidden="true"
          className="absolute border-2 border-black border-solid -inset-px pointer-events-none rounded-[3px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"
        />
      </div>
      <Desktop10Helper1 additionalClassNames="left-[374px] top-[705px]" />
      <Desktop10Helper1 additionalClassNames="left-[1130px] top-[518px]" />
      <Desktop10Helper2 additionalClassNames="left-[316.27px] top-[677px]" />
      <Desktop10Helper2 additionalClassNames="left-[871px] top-[545px]" />
    </div>
  );
}

function MobileLinksView() {
  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center py-6 px-4">
      <div className="w-full max-w-md relative">
        {/* Left Logo - positioned at heading height */}
        <div className="absolute left-0 top-9 w-12 h-12">
          <Image
            src="/assets/shapes/r-b.svg"
            alt="left"
            width={48}
            height={48}
            className="w-full h-full"
          />
        </div>

        {/* Right Logo - positioned at heading height */}
        <div className="absolute right-0 top-9 w-12 h-12">
          <Image
            src="/assets/shapes/y-g.svg"
            alt="right"
            width={48}
            height={48}
            className="w-full h-full"
          />
        </div>

        <h1 className="text-center font-geist font-extrabold text-2xl leading-tight mb-2 px-14 mt-5">
          Join Our Community.
        </h1>
        <h2 className="text-center font-geist font-extrabold text-2xl leading-tight mb-4 px-14">
          Connect and Grow with us.
        </h2>

        <p className="text-center text-sm text-gray-700 mb-6">
          Connect with like-minded individuals, share knowledge, and grow
          together across our platform
        </p>

        <div className="relative mb-8 flex justify-center">
          <div className="relative inline-block">
            <NeoBrutalism border={3} shadow="lg" className="bg-white px-6 py-3">
              <h3 className="font-geist font-extrabold text-base whitespace-nowrap">
                Unlock Your Potential.
              </h3>
            </NeoBrutalism>
            <div className="absolute top-0 right-0 w-full h-full -z-10 translate-x-[6px] translate-y-[5px] bg-[#D9D9D9] border-[3px] border-black border-l-0 border-t-0" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 mb-6">
          <a
            href="mailto:gdsc@rknec.edu"
            className={nb({
              border: 2,
              shadow: "lg",
              rounded: "lg",
              className: "flex items-center gap-3 px-4 py-4 bg-white",
            })}
          >
            <div className="w-12 h-12 flex items-center justify-center border-2 border-black rounded-md">
              <CgMail className="w-6 h-6" />
            </div>
            <span className="font-geist font-bold text-lg">Email</span>
          </a>

          <a
            href="https://discord.gg/WgJDe2e9aj"
            className={nb({
              border: 2,
              shadow: "lg",
              rounded: "lg",
              className: "flex items-center gap-3 px-4 py-4 bg-white",
            })}
          >
            <div className="w-12 h-12 flex items-center justify-center border-2 border-black rounded-md">
              <FaDiscord className="w-6 h-6" />
            </div>
            <span className="font-geist font-bold text-lg">Discord</span>
          </a>

          <a
            href="https://youtube.com/@gdsc_rcoem"
            className={nb({
              border: 2,
              shadow: "lg",
              rounded: "lg",
              className: "flex items-center gap-3 px-4 py-4 bg-white",
            })}
          >
            <div className="w-12 h-12 flex items-center justify-center border-2 border-black rounded-md">
              <FaYoutube className="w-6 h-6" />
            </div>
            <span className="font-geist font-bold text-lg">YouTube</span>
          </a>

          <a
            href="https://twitter.com/gdsc_rcoem"
            className={nb({
              border: 2,
              shadow: "lg",
              rounded: "lg",
              className: "flex items-center gap-3 px-4 py-4 bg-white",
            })}
          >
            <div className="w-12 h-12 flex items-center justify-center border-2 border-black rounded-md">
              <BsTwitterX className="w-6 h-6" />
            </div>
            <span className="font-geist font-bold text-lg">Twitter</span>
          </a>

          <a
            href="https://www.linkedin.com/company/gdsc-rcoem/"
            className={nb({
              border: 2,
              shadow: "lg",
              rounded: "lg",
              className: "flex items-center gap-3 px-4 py-4 bg-white",
            })}
          >
            <div className="w-12 h-12 flex items-center justify-center border-2 border-black rounded-md">
              <FaLinkedinIn className="w-6 h-6" />
            </div>
            <span className="font-geist font-bold text-lg">LinkedIn</span>
          </a>

          <a
            href="https://www.instagram.com/gdg_rbu/"
            className={nb({
              border: 2,
              shadow: "lg",
              rounded: "lg",
              className: "flex items-center gap-3 px-4 py-4 bg-white",
            })}
          >
            <div className="w-12 h-12 flex items-center justify-center border-2 border-black rounded-md">
              <AiOutlineInstagram className="w-6 h-6" />
            </div>
            <span className="font-geist font-bold text-lg">Instagram</span>
          </a>
        </div>

        <p className="text-center text-sm text-[#6e6d6d] mt-4">
          Stay connected
        </p>
      </div>
    </div>
  );
}

export default function Desktop() {
  return (
    <div className="min-h-screen bg-white flex justify-center">
      <div className="hidden md:block">
        <Desktop10Component />
      </div>
      <div className="block md:hidden w-full">
        <MobileLinksView />
      </div>
    </div>
  );
}
