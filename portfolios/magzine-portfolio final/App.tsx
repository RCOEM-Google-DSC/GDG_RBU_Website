import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import SectionDivider from './components/SectionDivider';
import Skills from './components/Skills';
import Work from './components/Work';
import Experience from './components/Experience';
import Philosophy from './components/Philosophy';
import Footer from './components/Footer';

function App() {
  return (
    <main className="w-full max-w-[1440px] mx-auto min-h-screen border-l border-r border-black flex flex-col bg-white text-black">
      <Header />
      <Hero />
      <SectionDivider 
        number="01" 
        title="The Code<br/>Era Begins" 
        subtitle="Since 2018" 
      />
      <Skills />
      <Work />
      <SectionDivider 
        number="02" 
        title="Dev<br/>Journey" 
        subtitle="Experience" 
        align="right"
      />
      <Experience />
      <Philosophy />
      <Footer />
    </main>
  );
}

export default App;