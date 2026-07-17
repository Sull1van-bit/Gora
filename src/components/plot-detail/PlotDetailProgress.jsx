import React from 'react';

export default function PlotDetailProgress({ plot, progressPct, setIsLogOpen }) {
  return (
    <section className="-mt-1 flex flex-col items-center justify-center relative z-20">
      <div className="relative w-[173px] h-[173px] flex items-center justify-center my-1 select-none">
        <img 
          src="/assets/figma/detail/progress_ring.svg" 
          className="absolute inset-0 w-full h-full object-contain pointer-events-none" 
          alt="Progress Ring" 
        />
        <div className="flex flex-col items-center justify-center text-[#28502d] z-10 text-center">
          <span className="font-['Montserrat_Alternates',sans-serif] font-medium text-[10px] text-[#28502d]">
            Progres
          </span>
          <span className="font-['Montserrat_Alternates',sans-serif] font-semibold text-[30px] leading-none text-[#28502d] my-1">
            {progressPct}%
          </span>
          <span className="font-['Montserrat_Alternates',sans-serif] font-bold text-[10px] text-[#28502d]">
            {plot.status_text?.split('-')[0]?.trim() || (plot.status === 'urgent' ? 'Perhatian' : plot.status === 'attention' ? 'Perhatian' : 'Aman')}
          </span>
        </div>
      </div>

      
      <div className="text-center mt-3">
        <span className="font-['Montserrat_Alternates',sans-serif] text-[15px] text-[#3c3b3b]">Fase : </span>
        <span className="font-['Montserrat_Alternates',sans-serif] font-bold text-[15px] text-[#28502d]">
          {plot.current_growth_stage || 'Pertumbuhan Vegetatif'}
        </span>
      </div>

      
      <button
        onClick={() => setIsLogOpen(true)}
        className="mt-3.5 bg-[#438347] hover:bg-[#366c3a] active:scale-95 text-white font-['Montserrat_Alternates',sans-serif] font-semibold text-[10px] px-6 py-1.5 rounded-full shadow-xs transition-all flex items-center gap-1.5"
      >
        <span>Update Kondisi</span>
      </button>
    </section>
  );
}
