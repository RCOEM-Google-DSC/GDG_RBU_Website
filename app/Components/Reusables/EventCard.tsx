import React from 'react';
import { ArrowRight } from 'lucide-react';

// Simplified version of a Shadcn UI Badge component
// Usually this would be in components/ui/badge.tsx
interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "destructive";
}

const Badge = ({ 
  className = "", 
  variant = "default", 
  ...props 
}: BadgeProps) => {
  const baseStyles = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";
  
  const variants = {
    default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
    secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
    destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
    outline: "text-foreground",
  };

  const variantStyles = variants[variant] || variants.default;

  return (
    <div className={`${baseStyles} ${variantStyles} ${className}`} {...props} />
  );
};

const SpiderCraftCard = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      {/* Container for the card. 
        We use a relative container to stack the SVG background and the HTML content.
        Width is set to max-w-sm (approx 384px) to match the mobile card feel.
      */}
      <div className="relative w-full max-w-[340px] drop-shadow-sm filter">
        
        {/* Background SVG Layer 
          Added vectorEffect="non-scaling-stroke" to the path and adjusted viewBox to prevent clipping.
          This ensures the border stays 1.5px thick evenly, even if the container stretches.
        */}
        <svg
          viewBox="-2 -2 344 404"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 w-full h-full text-white"
          preserveAspectRatio="none"
          style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.05))' }}
        >
          {/* The Path Explanation:
            1. Start top-left corner (rounded)
            2. Go right along top edge
            3. Draw the 'dip' curve down towards the right
            4. Top-right corner
            5. Right edge down
            6. Bottom-right corner
            7. Bottom edge left
            8. Bottom-left corner
            9. Left edge up to the notch
            10. The sharp inward triangular notch
            11. Left edge up to start
          */}
          <path
            d="
              M 24 0
              L 180 0
              C 210 0 220 28 250 28
              L 316 28
              Q 340 28 340 52
              L 340 376
              Q 340 400 316 400
              L 24 400
              Q 0 400 0 376
              L 0 160
              L 16 140
              L 0 120
              L 0 24
              Q 0 0 24 0
              Z
            "
            fill="white"
            stroke="black"
            strokeWidth="1.5"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* Content Layer 
          Increased padding to pt-10 and pb-12 to add more breathing room top and bottom.
        */}
        <div className="relative z-10 px-6 pt-10 pb-12 h-full flex flex-col">
          
          {/* Header Badge - Replaced with custom Shadcn-style Badge */}
          <div className="self-start">
            <Badge 
              variant="secondary" 
              className="bg-[#dcdcdc] text-black hover:bg-[#dcdcdc]/80 border-transparent px-4 py-1.5 text-xs font-medium rounded-full"
            >
              Artificial Intelligence
            </Badge>
          </div>

          {/* Title and Action Button Row */}
          <div className="flex items-center justify-between mt-4 mb-3 pr-2">
            <h2 className="text-2xl font-bold text-black tracking-tight">
              SpiderCraft
            </h2>
            <button 
              className="bg-[#fbbf24] hover:bg-[#f59e0b] transition-colors rounded-full p-2 flex items-center justify-center shrink-0"
              aria-label="Go to SpiderCraft"
            >
              <ArrowRight className="w-5 h-5 text-black stroke-[2.5]" />
            </button>
          </div>

          {/* Main Image */}
          <div className="w-full aspect-4/3 rounded-2xl overflow-hidden border border-gray-100 shadow-inner bg-gray-900 relative group">
             {/* Using a placeholder image that closely mimics the vibrant/neon spider-verse aesthetic.
               In a real app, this would be the specific asset.
             */}
             <img 
               src="https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=1000&auto=format&fit=crop" 
               alt="SpiderCraft Poster" 
               className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90"
             />
             {/* Overlay gradient to make it look more 'poster-like' and vibrant if image is dull */}
             <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent mix-blend-overlay"></div>
             
             {/* Text overlay for the 'SPIDERCRAFT' logo effect in the image */}
             <div className="absolute bottom-2 left-0 right-0 text-center">
                {/* This mimics the logo text in the poster if the image doesn't have it */}
             </div>
          </div>

          {/* Footer Text */}
          <div className="mt-4">
            <p className="text-black text-[15px] leading-snug font-medium">
              SPIDER CRAFT 2025: WHERE TECH MET FUN! Still buzzing from the energy of Spider Craft 2025!
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SpiderCraftCard;