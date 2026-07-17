import React from 'react';

export default function PlotDetailHeader({ plot, onBack }) {
  return (
    <section className="bg-[#578a3e] rounded-b-[30px] pt-3 pb-6 px-4 relative text-white shadow-xs">
      <div className="flex items-center justify-between relative z-10 py-1">
        <button
          onClick={onBack}
          className="w-9 h-9 -ml-1 rounded-full flex items-center justify-center hover:bg-white/10 active:scale-90 transition-all"
          aria-label="Kembali"
        >
          <img src="/assets/figma/detail/back_button.svg" className="w-6 h-6 filter brightness-0 invert shrink-0" alt="Back" />
        </button>
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="font-['Montserrat_Alternates',sans-serif] font-bold text-[22px] sm:text-[25px] leading-tight text-white tracking-tight truncate max-w-[240px]">
            {plot.plot_name}
          </h1>
          <div className="flex items-center gap-1.5 mt-0.5 opacity-95">
            <img src="/assets/figma/detail/leaf_title.svg" className="w-3.5 h-3 filter brightness-0 invert shrink-0" alt="" />
            <span className="font-['Montserrat_Alternates',sans-serif] font-medium text-[13px] sm:text-[15px] text-white">
              {plot.komoditas_nama?.split('(')[0]?.trim() || 'Tomat'}
            </span>
          </div>
        </div>
        <div className="w-9" /> 
      </div>
    </section>
  );
}
