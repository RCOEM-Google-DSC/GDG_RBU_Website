import React from 'react';
import { ArrowUpRight, Code, Eye } from 'lucide-react';

const Work: React.FC = () => {
  return (
    <div id="projects">
      {/* Featured Project */}
      <section className="grid grid-cols-1 lg:grid-cols-12 border-b border-black divide-y lg:divide-y-0 lg:divide-x divide-black">
        <div className="col-span-12 lg:col-span-8 relative group overflow-hidden border-b lg:border-b-0 border-black">
          <img 
            alt="Abstract interface design" 
            className="w-full h-[400px] lg:h-[600px] object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTNCXHzxLRpSyIMtcvCNxs4mZ7Eruy7ZduZxdu4kZEVncRPv0FB6bhekPqT6-nmZrZLK1Bd1hlIfahVB3lrd_TlbLiMhjnGVEBTCVGWBUsldetmBF9iA19rpc3zjN0w_Ul6cylLYGkncx7UagpgQN7w3_EYktvel4JG5e2XGhEUNia1poCo5dS7dZbrnpwy7BvbqmZ_oo4a6G8N31sShOAmzl1cUnzx0kiGkcyu9eoNU20wIslDuyhxLkZvw9xbvtEs90dN6t1Qj0" 
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
          <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 text-xs font-bold uppercase">
            Featured Project
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 flex flex-col">
          <div className="flex-grow p-8 flex flex-col justify-center">
            <h3 className="font-display text-4xl font-bold uppercase mb-4">FinDash<br />Analytics</h3>
            <p className="font-sans text-sm text-gray-600 leading-relaxed mb-6">
              A comprehensive financial dashboard built with Next.js and D3.js. Features real-time data visualization, predictive modeling using Python backend, and a highly responsive grid layout.
            </p>
            <div className="flex gap-2 mb-8">
              {['React', 'D3.js', 'Node'].map(tag => (
                <span key={tag} className="border border-black px-2 py-1 text-[10px] uppercase font-bold">{tag}</span>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 border-t border-black divide-x divide-black">
            <a href="#" className="p-6 flex items-center justify-center gap-2 hover:bg-black hover:text-white transition-colors font-display text-sm font-bold uppercase">
              <Code className="w-4 h-4" /> Source
            </a>
            <a href="#" className="p-6 flex items-center justify-center gap-2 hover:bg-black hover:text-white transition-colors font-display text-sm font-bold uppercase">
              <Eye className="w-4 h-4" /> Live Demo
            </a>
          </div>
        </div>
      </section>

      {/* Grid Projects */}
      <section className="grid grid-cols-1 md:grid-cols-2 border-b border-black divide-y md:divide-y-0 md:divide-x divide-black">
        {/* Project 1 */}
        <div className="group">
          <div className="relative overflow-hidden h-64 border-b border-black">
            <img 
              alt="E-commerce code" 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIHT2So2Vqmbzwx6UaxnyF4ATyNbMy2tblZR4jkO2Ik1d7iUQ4CI_M7MQ2-an4Du51OUibT8KO0HvUaS48gOerotiBtK5SQ-or2dOXlpv90b767IaYnT08-buB-WtarsE5VGmRHgQIRZmUXC7BaXYYw1mgCaM1TOJ2Orrb3g_0rq4BqhnGsc4RilO_b63seFEd5NfpnzXWVjHMOidGsyGzh5XSEShtI3-wgHJR3UTeUFs4Gk58cjk6tT5bhgXs823bvHfw5-egkrM" 
            />
          </div>
          <div className="p-8">
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-display text-2xl font-bold uppercase">E-Comm API</h4>
              <a href="#" className="hover:text-gray-500 transition-colors">
                <ArrowUpRight className="w-5 h-5" />
              </a>
            </div>
            <p className="font-sans text-xs text-gray-500 mb-4 line-clamp-2">
              A headless e-commerce backend built with Django REST Framework. Handles secure payments, inventory management, and user authentication.
            </p>
            <div className="flex gap-2">
              {['Django', 'Redis', 'Postgres'].map(tag => (
                <span key={tag} className="text-[10px] font-bold uppercase text-gray-400">{tag}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Project 2 */}
        <div className="group">
          <div className="relative overflow-hidden h-64 border-b border-black">
            <img 
              alt="Data visualization dashboard" 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBpcnhZn4DTZdobGcYeEQ0y1_ThldP5tw5HtFo-RF6474h4zgGnGqKVkmvfGMLowCMC8xWNvjKgqIlPLOugiCWCwr6VGK_abHytAPAs7x5UYMXYQa1hrpN_eUjyv9hxiHlj5KFWIMrqpZVgzLSxvPoUQLxjU6D770AFqmu2dxSGw1vURFR3rs22Qdiu4pRqXUgMdblHaTkud3BUN-XTiykgku8F-4yjqdxvhXeMok7go2yd2Yup9adlqptL_BfEoKlcZFI7_Eevn1Q" 
            />
          </div>
          <div className="p-8">
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-display text-2xl font-bold uppercase">Vision AI</h4>
              <a href="#" className="hover:text-gray-500 transition-colors">
                <ArrowUpRight className="w-5 h-5" />
              </a>
            </div>
            <p className="font-sans text-xs text-gray-500 mb-4 line-clamp-2">
              Image recognition application using TensorFlow.js. Identifies objects in real-time through the browser webcam with 95% accuracy.
            </p>
            <div className="flex gap-2">
              {['TensorFlow', 'Vue', 'WebRTC'].map(tag => (
                <span key={tag} className="text-[10px] font-bold uppercase text-gray-400">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Work;