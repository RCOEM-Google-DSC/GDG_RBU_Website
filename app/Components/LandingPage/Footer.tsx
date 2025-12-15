import { GrLinkedinOption } from "react-icons/gr";
import { AiOutlineInstagram } from "react-icons/ai";
import Image from 'next/image';
import Link from 'next/link';
import { FaFacebookF } from 'react-icons/fa';
import { BsTwitterX } from "react-icons/bs";

const Links = {
    community: [
        { name: 'About Us', href: '#about' },
        { name: 'Events', href: '#events' },
        { name: 'Team', href: '#team' },
        { name: 'Join GDG', href: '#join' },
    ],
    resources: [
        { name: 'Resources', href: '#resources' },
        { name: 'Blog', href: '#blog' },
        { name: 'Meetup', href: '#meetup' },
        { name: 'Workshops', href: '#workshops' },
    ],
    legal: [
        { name: 'Community Guidelines', href: '#guidelines' },
        { name: 'Code of Conduct', href: '#code-of-conduct' },
        { name: 'Privacy Policy', href: '#privacy' },
        { name: 'Terms of Service', href: '#terms' },
    ],
}

export default function Footer() {
    return (
        <footer className='bg-black text-white px-20 py-8 flex justify-between w-full'>
            {/* left: logo */}
            <div>
                <div className='flex flex-col items-center justify-center gap-3'>
                    <Image
                        src='/icons/gdg.svg'
                        alt='GDG Logo'
                        width={150}
                        height={150}
                    />
                    <div className='flex flex-col justify-center items-center'>
                        <h4 className='text-2xl'>Google Developers Group</h4>
                        <p>On Campus Ramdeobaba University </p>
                    </div>
                </div>
            </div>

            {/* divider (only on md+) */}
            <div className="hidden md:flex items-center justify-center">
                <div className="h-64 w-px bg-muted-foreground" />
            </div>

            {/* divider only on sm */}
            <div className="md:hidden w-full ">
                <div className="h-px w-full bg-muted-foreground" />
            </div>
            {/* right: text/links */}
            <div className='flex flex-col gap-8 items-center justify-center '>
                {/* links */}
                <div className='flex flex-row gap-10'>
                    {Object.entries(Links).map(([section, links]) => (
                        <div key={section} className='flex flex-col'>
                            <h5 className='text-white/90 capitalize tracking-widest'>{section}</h5>
                            {links.map((link) => (
                                <Link key={link.name} href={link.href} className='hover:underline'>
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    ))}
                </div>
                {/* socials */}
                <div className="flex flex-row gap-5">
                    <h5 className="tracking-widest">Follow Us:</h5>
                    <div className='flex flex-row gap-6'>
                        <Link href='#' target='_blank' rel='noopener noreferrer'>
                            <FaFacebookF size={24} />
                        </Link>
                        <Link href='#' target='_blank' rel='noopener noreferrer'>
                            <BsTwitterX size={24} />
                        </Link>
                        <Link href='#' target='_blank' rel='noopener noreferrer'>
                            <AiOutlineInstagram size={24} />
                        </Link>
                        <Link href='#' target='_blank' rel='noopener noreferrer'>
                            <GrLinkedinOption size={24} />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
