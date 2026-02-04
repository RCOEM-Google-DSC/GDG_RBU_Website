import React from 'react';
import { Github, Linkedin, Twitter, ExternalLink, Mail, Code, Terminal, Cpu } from 'lucide-react';

interface IconProps {
  name: string;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({ name, className = "w-5 h-5" }) => {
  switch (name.toLowerCase()) {
    case 'github': return <Github className={className} />;
    case 'linkedin': return <Linkedin className={className} />;
    case 'twitter': return <Twitter className={className} />;
    case 'mail': return <Mail className={className} />;
    case 'link': return <ExternalLink className={className} />;
    case 'code': return <Code className={className} />;
    case 'terminal': return <Terminal className={className} />;
    case 'cpu': return <Cpu className={className} />;
    default: return null;
  }
};