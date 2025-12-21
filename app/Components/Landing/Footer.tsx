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
        <footer className='bg-black text-white px-6 md:px-12 lg:px-20 py-8 md:py-10'>
            <div className='flex flex-col md:flex-row justify-between items-center md:items-start gap-8 md:gap-6 w-full'>
                {/* left: logo */}
                <div className='flex-shrink-0'>
                    <div className='flex flex-col items-center justify-center gap-3'>
                        <Image
                            src='/icons/gdg.svg'
                            alt='GDG Logo'
                            width={120}
                            height={120}
                            className='md:w-[150px] md:h-[150px]'
                        />
                        <div className='flex flex-col justify-center items-center text-center'>
                            <h4 className='text-xl md:text-2xl font-semibold'>Google Developers Group</h4>
                            <p className='text-sm md:text-base text-white/80'>On Campus Ramdeobaba University</p>
                        </div>
                    </div>
                </div>

                {/* divider (only on md+) */}
                <div className="hidden md:flex items-center justify-center">
                    <div className="h-48 lg:h-64 w-px bg-white/20" />
                </div>

                {/* divider only on mobile */}
                <div className="md:hidden w-full">
                    <div className="h-px w-full bg-white/20" />
                </div>

                {/* right: text/links */}
                <div className='flex flex-col gap-6 md:gap-8 items-center md:items-start justify-center w-full md:w-auto'>
                    {/* links */}
                    <div className='flex flex-col sm:flex-row gap-6 sm:gap-8 lg:gap-10 w-full md:w-auto'>
                        {Object.entries(Links).map(([section, links]) => (
                            <div key={section} className='flex flex-col gap-2 text-center sm:text-left'>
                                <h5 className='text-white/90 capitalize tracking-widest text-sm md:text-base font-semibold mb-1'>
                                    {section}
                                </h5>
                                {links.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className='hover:underline text-white/70 hover:text-white transition-colors text-sm md:text-base'
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </div>
                        ))}
                    </div>

                    {/* socials */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5">
                        <h5 className="tracking-widest text-sm md:text-base font-semibold">Follow Us:</h5>
                        <div className='flex flex-row gap-4 md:gap-6'>
                            <Link
                                href='#'
                                target='_blank'
                                rel='noopener noreferrer'
                                className='hover:text-white/70 transition-colors'
                            >
                                <FaFacebookF size={20} className='md:w-6 md:h-6' />
                            </Link>
                            <Link
                                href='#'
                                target='_blank'
                                rel='noopener noreferrer'
                                className='hover:text-white/70 transition-colors'
                            >
                                <BsTwitterX size={20} className='md:w-6 md:h-6' />
                            </Link>
                            <Link
                                href='#'
                                target='_blank'
                                rel='noopener noreferrer'
                                className='hover:text-white/70 transition-colors'
                            >
                                <AiOutlineInstagram size={20} className='md:w-6 md:h-6' />
                            </Link>
                            <Link
                                href='#'
                                target='_blank'
                                rel='noopener noreferrer'
                                className='hover:text-white/70 transition-colors'
                            >
                                <GrLinkedinOption size={20} className='md:w-6 md:h-6' />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
