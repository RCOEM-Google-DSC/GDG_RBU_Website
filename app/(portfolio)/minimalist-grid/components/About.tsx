import React from 'react';
import { Section } from './Section';
import { p } from 'framer-motion/client';

interface AboutProps {
  about: string;
}

export const About: React.FC<AboutProps> = ({ about }) => {
  if (!about) return null;

  return (
    <Section title="About" id="about">
      <div className="prose prose-lg prose-slate max-w-none text-slate-600 font-light leading-relaxed">
        {about.split('\n').filter(para => para.trim() !== '').map((paragraph, idx) => (
          <p key={idx} className="mb-6 last:mb-0">
            {paragraph.trim()}
          </p>
        ))}
      </div>
    </Section>
  );
};