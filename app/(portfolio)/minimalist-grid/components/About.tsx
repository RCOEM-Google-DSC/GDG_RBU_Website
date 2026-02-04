import React from 'react';
import { Section } from './Section';

interface AboutProps {
  about: string;
}

export const About: React.FC<AboutProps> = ({ about }) => {
  if (!about) return null;

  return (
    <Section title="About" id="about">
      <div className="prose prose-lg prose-slate max-w-none text-slate-600 font-light leading-relaxed">
        {about.split('
').map((paragraph, idx) => (
          <p key={idx} className="mb-6">{paragraph}</p>
        ))}
      </div>
    </Section>
  );
};