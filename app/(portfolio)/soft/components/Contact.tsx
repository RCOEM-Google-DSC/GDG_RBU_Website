import React from "react";

interface ContactProps {
  personalInfo: {
    email: string;
    phone: string;
  };
}

const Contact: React.FC<ContactProps> = ({ personalInfo }) => {
  if (!personalInfo || !personalInfo.email) return null;

  return (
    <section id="contact" className="py-24 bg-white dark:bg-neutral-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="inline-block px-3 py-1 mb-6 border border-gray-600 rounded-full text-xs font-medium tracking-widest uppercase text-gray-400">
          Get In Touch
        </span>
        <h2 className="text-black dark:text-white/80 font-display text-4xl md:text-6xl mb-8 leading-tight">
          Ready to bring your <br />{" "}
          <span className="italic text-gray-400">ideas to life?</span>
        </h2>

        <div className="flex flex-col items-center gap-6">
          <a
            href={`mailto:${personalInfo.email}`}
            className="bg-primary dark:bg-white text-white dark:text-black px-8 py-3 rounded-full font-medium hover:text-white transition-colors"
          >
            Email Me
          </a>
          {personalInfo.phone && (
            <p className="text-gray-400">Or call: {personalInfo.phone}</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;