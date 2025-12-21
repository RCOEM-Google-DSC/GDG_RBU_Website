import React from 'react'
import { CheckCircle } from "lucide-react";
import Image from "next/image";
const MeetOurTeam = () => {
  return (
     <div className="size-full flex items-center justify-center ">
          <div className="max-w-7xl w-full rounded-3xl overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Left Content Section */}
              <div className="p-12 lg:p-16 flex flex-col justify-center">
                <div className="space-y-6">
                  {/* Heading */}
                    <h1 className="text-5xl lg:text-6xl font-bold text-gray-900">
                    Meet the Google Developer Group Team
                    </h1>

                    {/* Paragraph Text */}
                    <p className="text-sm text-gray-600">
                    Google Developer Groups (GDG) are open and volunteer-run communities for developers who are interested in Google technologies. Our team is dedicated to fostering learning, networking, and collaboration through events, workshops, and hands-on sessions.
                    </p>

                    {/* Bullet Points */}
                    <div className="space-y-6 pt-4">
                    <div className="flex gap-4">
                      <div className="shrink-0 mt-1">
                      <CheckCircle className="w-6 h-6 text-orange-500" />
                      </div>
                      <div>
                      <h3 className="text-gray-900 mb-2 font-semibold">
                        Passionate Community Leaders
                      </h3>
                      <p className="text-sm text-gray-600">
                        Our organizers are committed to building an inclusive environment where developers of all backgrounds can connect, share knowledge, and grow together.
                      </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="shrink-0 mt-1">
                      <CheckCircle className="w-6 h-6 text-orange-500" />
                      </div>
                      <div>
                      <h3 className="text-gray-900 mb-2 font-semibold">
                        Empowering Developers
                      </h3>
                      <p className="text-sm text-gray-600">
                        We organize meetups, codelabs, and conferences to help developers stay up-to-date with the latest Google technologies and best practices.
                      </p>
                      </div>
                    </div>
                    </div>
                </div>
              </div>

              {/* Right Image Section */}
              <div className="relative h-full min-h-[500px]">
                <Image
                src="https://res.cloudinary.com/dlvkywzol/image/upload/v1765395573/WhatsApp_Image_2025-12-11_at_01.06.41_ee2575d7_xtjiwx.jpg"
                alt="Our Team"
                width={500}
                height={500}
                className="w-full h-full object-cover"
              />
              </div>
            </div>
          </div>
        </div>
  )
}

export default MeetOurTeam