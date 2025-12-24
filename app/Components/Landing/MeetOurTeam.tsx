import React from 'react'
import { CheckCircle } from "lucide-react";
import Image from "next/image";
import { motion } from 'framer-motion';
const MeetOurTeam = () => {
  return (
    <motion.div
      className="w-full flex flex-col items-center justify-center pt-0 pb-12 sm:pt-0 sm:pb-14 bg-background text-foreground px-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.3 }}
      transition={{ duration: 0.3, ease: "easeInOut", delay: 0.1 }}
    >
      <div className="size-full flex items-center justify-center">
        <div className="max-w-7xl w-full rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left Content Section */}
            <div className="p-6 sm:p-8 md:p-10 lg:p-12 xl:p-16 flex flex-col justify-center">
              <div className="space-y-4 sm:space-y-5 md:space-y-6">
                {/* Heading */}
                <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
                  Meet the Google Developer Group Team
                </h1>

                {/* Paragraph Text */}
                <p className="text-sm sm:text-base md:text-sm lg:text-base text-gray-600 leading-relaxed">
                  Google Developer Groups (GDG) are open and volunteer-run communities for developers who are interested in Google technologies. Our team is dedicated to fostering learning, networking, and collaboration through events, workshops, and hands-on sessions.
                </p>

                {/* Bullet Points */}
                <div className="space-y-4 sm:space-y-5 md:space-y-6 pt-2 sm:pt-3 md:pt-4">
                  <div className="flex gap-3 sm:gap-4">
                    <div className="shrink-0 mt-1">
                      <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg md:text-base lg:text-lg text-gray-900 mb-1 sm:mb-2 font-semibold">
                        Passionate Community Leaders
                      </h3>
                      <p className="text-sm sm:text-base md:text-sm lg:text-base text-gray-600 leading-relaxed">
                        Our organizers are committed to building an inclusive environment where developers of all backgrounds can connect, share knowledge, and grow together.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 sm:gap-4">
                    <div className="shrink-0 mt-1">
                      <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg md:text-base lg:text-lg text-gray-900 mb-1 sm:mb-2 font-semibold">
                        Empowering Developers
                      </h3>
                      <p className="text-sm sm:text-base md:text-sm lg:text-base text-gray-600 leading-relaxed">
                        We organize meetups, codelabs, and conferences to help developers stay up-to-date with the latest Google technologies and best practices.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Image Section */}
            <div className="relative h-64 sm:h-80 md:h-full md:min-h-[400px] lg:min-h-[500px]">
              <Image
                src="https://res.cloudinary.com/dlvkywzol/image/upload/v1765395573/WhatsApp_Image_2025-12-11_at_01.06.41_ee2575d7_xtjiwx.jpg"
                alt="Our Team"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div >

  )
}

export default MeetOurTeam