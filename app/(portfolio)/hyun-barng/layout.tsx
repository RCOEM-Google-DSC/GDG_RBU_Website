import React from 'react';
import './styles.css';
import { Archivo_Black, Inter } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
  weight: ['300', '400', '500', '600']
});

const archivoBlack = Archivo_Black({ 
  subsets: ['latin'], 
  variable: '--font-archivo-black',
  weight: ['400']
});

export default function HyunLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${inter.variable} ${archivoBlack.variable} font-body`}>
      {children}
    </div>
  );
}
