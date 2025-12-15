"use client";

import Image from "next/image";
import LinkItem from "../Components/Common/LinkItem";
import { LINKS } from "@/lib/links";
import Footer from "../Components/LandingPage/Footer";
export default function Home() {
    return (
        <div className="flex flex-col items-center justify-between min-h-screen bg-background text-foreground">
            {/* hero */}
            <section className="w-full max-w-lg text-center px-4 sm:px-6 md:px-8 lg:px-10 pt-16 pb-10">
                <Image
                    src="/icons/gdg.svg"
                    alt="GDG RBU Logo"
                    width={120}
                    height={120}
                    className="mx-auto mb-4"
                />
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
                    Follow us 
                </h1>
                {/* <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
                    Empowering students with cutting-edge tech skills, community, and
                    resources for a future in technology. Join us to learn, build, and
                    connect with fellow developers!
                </p> */}
            </section>

            {/* links */}
            <section className="w-full max-w-2xl px-4 pb-10 space-y-2">
                {LINKS.map((link) => (
                    <LinkItem
                        key={link.id}
                        id={link.id}
                        title={link.title}
                        logo={link.logo}
                        url={link.url}
                        description={link.description}
                    />
                ))}
            </section>

            {/* footer */}
            <Footer />
        </div>
    );
}
