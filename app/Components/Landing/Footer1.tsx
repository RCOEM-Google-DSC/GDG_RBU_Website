import Link from "next/link";
import { AiOutlineInstagram } from "react-icons/ai";
import { BsTwitter } from "react-icons/bs";
import { CgMail } from "react-icons/cg";
import { FaLinkedinIn } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";

const Footer1 = () => {
    return (
        <footer id="contact" className="relative bg-gray-100 dark:bg-gray-900">

            <div className="mx-auto max-w-6xl px-4 py-8 grid gap-6 lg:grid-cols-2 items-start">


                <div className="flex justify-center lg:justify-start relative w-full">
                    <img
                        src="/icons/gdg.svg"
                        alt="GDG Logo"
                        className="w-36 md:w-52 lg:w-60 h-auto"
                    />

                    <div className="hidden lg:block absolute top-0 right-0 h-full w-px bg-gray-400"></div>
                </div>

                <div className="flex flex-col items-center lg:items-start text-center lg:text-left text-gray-700 dark:text-gray-300 leading-relaxed gap-4">


                    <div className="flex items-start gap-2">
                        <IoLocationOutline
                            size={28}

                        />
                        <div>
                            <p>Shri Ramdeobaba College of Engineering and Management, Ramdeo Tekdi,</p>
                            <p>Gittikhadan, Katol Road, Nagpur - 440013</p>
                        </div>
                    </div>


                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-4">

                        <div className="flex items-center gap-2">
                            <CgMail
                                size={24}

                            />
                            <a
                                href="mailto:dsc.rknec@gmail.com"
                                className="hover:text-blue-600 underline"
                            >
                                dsc.rknec@gmail.com
                            </a>
                        </div>


                        <div className="flex flex-col items-center sm:items-start">
                            <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-1">
                                Follow Us:
                            </h3>
                            <div className="flex gap-4">
                                <Link
                                    href="https://instagram.com"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-700"
                                >
                                    <AiOutlineInstagram
                                        size={20}

                                    />
                                </Link>
                                <Link
                                    href="https://linkedin.com"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-700"
                                >
                                    <FaLinkedinIn size={20} />
                                </Link>
                                <Link
                                    href="https://twitter.com"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-700"
                                >
                                    <BsTwitter size={20} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="w-full overflow-hidden">
                <img
                    src="/assets/footer-pic.svg"
                    alt="Decorative shapes"
                    className="w-full h-16 md:h-20 lg:h-24 object-cover"
                />
            </div>
        </footer>
    );
};

export default Footer1;