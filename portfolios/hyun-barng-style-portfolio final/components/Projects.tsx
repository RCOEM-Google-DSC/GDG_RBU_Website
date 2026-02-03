import React from 'react';

interface ProjectProps {
    title: string;
    subtitle: string;
    description: string;
    image: string;
    linkText: string;
    linkUrl: string;
}

const ProjectCard: React.FC<ProjectProps> = ({ title, subtitle, description, image, linkText, linkUrl }) => (
    <article className="relative group rounded-3xl overflow-hidden shadow-2xl bg-neutral-900">
        <div className="aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden">
            <img 
                src={image} 
                alt={title} 
                className="w-full h-full object-cover opacity-60 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700" 
            />
        </div>
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 bg-gradient-to-t from-black via-black/50 to-transparent">
            <div className="md:flex justify-between items-end">
                <div className="mb-6 md:mb-0">
                    <h3 className="text-white font-display text-3xl md:text-5xl uppercase mb-2">{title}</h3>
                    <p className="text-neutral-400 text-xs uppercase tracking-widest">{subtitle}</p>
                </div>
                <div className="max-w-md">
                    <p className="text-neutral-300 text-sm leading-relaxed mb-6">
                        {description}
                    </p>
                    <a href={linkUrl} className="inline-flex items-center text-white text-xs font-bold uppercase tracking-widest hover:text-neutral-400 transition-colors">
                        {linkText} <span className="material-icons-outlined ml-2 text-sm">arrow_forward</span>
                    </a>
                </div>
            </div>
        </div>
    </article>
);

export const Projects: React.FC = () => {
  return (
    <section id="projects" className="bg-background-dark py-24 px-4 md:px-0">
      <div className="max-w-7xl mx-auto mb-16 px-6 text-center">
        <h2 className="text-white font-display text-4xl uppercase tracking-wider">Featured Works</h2>
      </div>
      <div className="space-y-16 max-w-6xl mx-auto">
        <ProjectCard 
            title="FinTech Analytics"
            subtitle="SaaS Dashboard | React & Python"
            description="A high-performance financial data visualization platform processing millions of transaction rows in real-time. Built with a specialized focus on accessibility and data density."
            image="https://lh3.googleusercontent.com/aida-public/AB6AXuB00xZXZcvLPv3PpqhMp-DbezZPN6Qti4YE4GF3mjjWt6DmLsMxDfS3SyMKAWoLJvIWuwA9H9rsI5GD9uGnYoo_sFYTpDLl9XDmy6iF8mcRhQq5tmPJGI25kCyZyhxO-sBP29jwD9GzeTf2grskP0RPnzT_VzFzkeDCuTz8Y5s_9Ur7B0hChHMOH9zU3Wp_etf4Gy79icWLMoS-ulOcVVq6rqIe6ycmkImwUqrExN2CPL7Y0lVn-BHJDkhtsdOQz8ZAuTmehnjZrN0"
            linkText="View Case Study"
            linkUrl="#"
        />
        <ProjectCard 
            title="Sentinel AI"
            subtitle="Security | TensorFlow & Rust"
            description="An anomaly detection system for network traffic. Utilizes unsupervised learning to identify potential security threats without prior labeling, reducing false positives by 40%."
            image="https://lh3.googleusercontent.com/aida-public/AB6AXuBt39sp0mfEqrujonKHwS_ybLXF5DtaalZC9YAEfurP9p6nxcZ5F0Egm4G17Q_iHG6aBfG1LpxMM1Tyc5e20gzT6PNWNaSbupFzSekA3ZOmoIUG0pzMRZ62RmUMIqP9Qj00mug3ByULKV8lOVeUlh2mK19N7OjJR3kMMa8_BC1XuLOFzuYYd7r2KWbWgT1PrxK-Mqh-1UZR9-yVdRYgd-oqwah5inf2SQ3K59gKcwARmkId_GWqQZ_CquF_kA9hH3rs2GJVkSyG0Q4"
            linkText="View GitHub"
            linkUrl="#"
        />
        <ProjectCard 
            title="Project Vision"
            subtitle="AR Experience | Three.js & WebGL"
            description="A web-based Augmented Reality museum experience. Allows users to interact with 3D artifacts directly in the browser without installing external applications."
            image="https://lh3.googleusercontent.com/aida-public/AB6AXuD9juggdBd_Ve39JSd2eraU3qOWiobUiSHXWAXme6vb_OGEq0Of6DfpjcxlHP8hX-yWMF0AeInIlsk5AUN97r1XpC4SW16VsEq3N-lunjx18ZiA3BwOpLdgYBvog7pVBbdKYrnKj64YGnwu_V9wMNYPlup9jck2ifnmcQ2PM3H3ozeR-vDZRXN0xiqPbfGIXJQ6LhSeTedSkDU5mHTGrW2MnOcxw3FiUG0OuQ-q-sxx3thrqgHkO7stkaoe7S6QVeinp2MRWK7us6A"
            linkText="Launch Demo"
            linkUrl="#"
        />
      </div>
    </section>
  );
};