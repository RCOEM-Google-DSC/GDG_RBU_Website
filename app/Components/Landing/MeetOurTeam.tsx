import { CheckCircle } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
const MeetOurTeam = () => {
  return (
    <motion.div
      className="w-full flex flex-col items-center justify-center  pt-0 pb-12 sm:pt-0 sm:pb-14 text-foreground px-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.3 }}
      transition={{ duration: 0.3, ease: "easeInOut", delay: 0.1 }}
    >
      <div className="size-full flex items-center justify-center ">
        <div
          className="max-w-7xl w-full overflow-hidden bg-[#FDFCF8]"
          style={{
            border: "4px solid #000000",
            boxShadow: "8px 8px 0px #000000",
          }}
        >
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left Content Section */}
            <div className="p-6 sm:p-8 md:p-10 lg:p-12 xl:p-16 flex flex-col justify-center">
              <div className="space-y-4 sm:space-y-5 md:space-y-6">
                {/* Heading */}
                <h1
                  className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl font-black leading-tight font-retron"
                  style={{ color: "#000000" }}
                >
                  Meet the Google Developer Group Team
                </h1>

                {/* Paragraph Text */}
                <p
                  className="text-sm sm:text-base md:text-sm lg:text-base leading-relaxed font-medium"
                  style={{ color: "#000000" }}
                >
                  Google Developer Groups (GDG) are open and volunteer-run
                  communities for developers interested in Google technologies.
                  Our team focuses on learning, networking, and collaboration
                  through events and hands-on sessions.
                </p>

                {/* Bullet Points */}
                <div className="space-y-4 sm:space-y-5 md:space-y-6 pt-2 sm:pt-3 md:pt-4">
                  <div className="flex gap-3 sm:gap-4">
                    <CheckCircle
                      className="size-13 md:size-12 lg:size-10"
                      style={{ color: "#000000" }}
                    />

                    <div>
                      <h3
                        className="text-base sm:text-lg md:text-base lg:text-lg mb-1 sm:mb-2 font-black"
                        style={{ color: "#000000" }}
                      >
                        Passionate Community Leaders
                      </h3>
                      <p
                        className="text-sm sm:text-base md:text-sm lg:text-base leading-relaxed font-medium"
                        style={{ color: "#000000" }}
                      >
                        Our organizers build an inclusive environment where
                        developers can connect, share knowledge, and grow
                        together.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 sm:gap-4">
                    <CheckCircle
                      className="size-13 md:size-12 lg:size-10"
                      style={{ color: "#000000" }}
                    />

                    <div>
                      <h3
                        className="text-base sm:text-lg md:text-base lg:text-lg mb-1 sm:mb-2 font-black "
                        style={{ color: "#000000" }}
                      >
                        Empowering Developers
                      </h3>
                      <p
                        className="text-sm sm:text-base md:text-sm lg:text-base leading-relaxed font-medium"
                        style={{ color: "#000000" }}
                      >
                        We host meetups and codelabs to help developers stay
                        current with modern tools and best practices.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Image Section */}
            <div className="relative h-80 sm:h-96 md:h-full md:min-h-[500px] lg:min-h-[600px] xl:min-h-[700px]">
              <Image
                src="https://res.cloudinary.com/dlvkywzol/image/upload/v1767200855/IMG-20251014-WA0066_zwzfw3.jpg"
                alt="Our Team"
                fill
                sizes="(max-width: 788px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MeetOurTeam;
