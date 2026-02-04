import React from 'react';
import './styles.css';
import { Inter, Oswald } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700']
});

const oswald = Oswald({ 
  subsets: ['latin'], 
  variable: '--font-oswald',
  weight: ['400', '500', '700']
});

export default function MinimalistLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${inter.variable} ${oswald.variable} font-sans`}>
      {children}
    </div>
  );
}
