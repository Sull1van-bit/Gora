import React from 'react';

export default function BrandLogo({ compact = false }) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-1.5 leading-none">
        <span className={`font-['Montserrat_Alternates',sans-serif] font-bold text-[#408547] ${compact ? 'text-[24px]' : 'text-[28px]'}`}>
          G
        </span>
        <span className={`inline-flex items-center justify-center rounded-full bg-[#408547] ${compact ? 'w-8 h-8' : 'w-9 h-9'}`}>
          <img src="/assets/figma/leaf_bold.svg" className={compact ? 'w-5 h-4.5' : 'w-5.5 h-5'} alt="" />
        </span>
        <span className={`font-['Montserrat_Alternates',sans-serif] font-bold text-[#408547] ${compact ? 'text-[24px]' : 'text-[28px]'}`}>
          RA
        </span>
      </div>
      <span className={`font-['Montserrat_Alternates',sans-serif] font-semibold tracking-[0.24em] text-[#3c3b3b]/85 ${compact ? 'text-[7px] ml-[3px]' : 'text-[8px] ml-0.5'}`}>
        YOUR FARMING COMPANION
      </span>
    </div>
  );
}
