import React from 'react';

interface SectionDividerProps {
  number: string;
  title: string;
  subtitle: string;
  align?: 'left' | 'right';
}

const SectionDivider: React.FC<SectionDividerProps> = ({ number, title, subtitle, align = 'left' }) => {
  const isRight = align === 'right';
  
  return (
    <div className="grid grid-cols-12 border-b border-black overflow-hidden">
      {isRight ? (
        <>
           <div className="col-span-12 lg:col-span-4 flex items-center justify-center bg-black text-white py-12 lg:py-0 border-b lg:border-b-0 lg:border-r border-black order-2 lg:order-1">
            <span className="font-display text-[120px] lg:text-[180px] font-bold leading-none tracking-tighter">{number}</span>
          </div>
          <div className="col-span-12 lg:col-span-8 p-8 lg:p-16 flex flex-col justify-center order-1 lg:order-2">
            <h2 className="font-display text-4xl lg:text-6xl font-black uppercase leading-none mb-4 text-right" dangerouslySetInnerHTML={{ __html: title }} />
            <p className="font-sans text-xs uppercase tracking-widest text-gray-500 text-right">{subtitle}</p>
          </div>
        </>
      ) : (
        <>
          <div className="col-span-12 lg:col-span-8 p-8 lg:p-16 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-black">
            <h2 className="font-display text-4xl lg:text-6xl font-black uppercase leading-none mb-4" dangerouslySetInnerHTML={{ __html: title }} />
            <p className="font-sans text-xs uppercase tracking-widest text-gray-500">{subtitle}</p>
          </div>
          <div className="col-span-12 lg:col-span-4 flex items-center justify-center bg-black text-white py-12 lg:py-0">
            <span className="font-display text-[120px] lg:text-[180px] font-bold leading-none tracking-tighter">{number}</span>
          </div>
        </>
      )}
    </div>
  );
};

export default SectionDivider;