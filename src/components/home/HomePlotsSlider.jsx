import React from 'react';
import PlotCardMini from './PlotCardMini';

export default function HomePlotsSlider({ onNavigateTab, sortedPlots, onSelectPlot, onOpenAddPlot }) {
  return (
    <section>
      <div className="flex items-center justify-between mt-5 mb-3 px-4">
        <h2 className="text-[15px] font-['Montserrat_Alternates',sans-serif] font-bold text-[#3c3b3b]">
          Lahan Saya
        </h2>
        <button
          onClick={() => onNavigateTab('plots')}
          className="text-[12px] font-['Montserrat_Alternates',sans-serif] font-bold text-[#3a6c3d] flex items-center gap-1 hover:underline active:scale-95 transition-all"
        >
          Lihat Semua →
        </button>
      </div>

      
      <div className="flex gap-3 overflow-x-auto pb-3 px-4 scrollbar-none snap-x">
        {sortedPlots.map((plot) => (
          <div key={plot.id} className="snap-start shrink-0">
            <PlotCardMini plot={plot} onSelect={onSelectPlot} />
          </div>
        ))}

        
        <div 
          onClick={onOpenAddPlot}
          className="w-[130px] sm:w-[140px] border-2 border-dashed border-[#8f8e94]/50 rounded-[20px] p-4 shrink-0 flex flex-col items-center justify-center gap-2 cursor-pointer bg-white/40 hover:bg-white/80 transition-all active:scale-95 group snap-start"
        >
          <span className="text-[32px] text-[#6f6e72] font-light leading-none group-hover:scale-110 transition-transform">+</span>
          <span className="text-[11px] font-['Montserrat_Alternates',sans-serif] font-semibold text-[#3c3b3b] text-center leading-tight">
            Tambah Tanaman
          </span>
        </div>
      </div>
    </section>
  );
}
