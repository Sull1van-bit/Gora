import React from 'react';

export default function PlotCardMini({ plot, onSelect }) {
  const isUrgentOrAttention = plot.status === 'urgent' || plot.status === 'attention';
  const progressPct = plot.progress || 60;
  
  // Calculate days to harvest or use dummy/actual property
  const daysToHarvest = plot.days_to_harvest || 28;

  // Choose high quality thumbnail from cached Figma assets
  const thumbnail = plot.image_url || (
    plot.komoditas_nama?.toLowerCase().includes('tomat') 
      ? '/assets/figma/image10.png' 
      : '/assets/figma/image9.png'
  );

  return (
    <div
      onClick={() => onSelect(plot.id)}
      className="w-[155px] sm:w-[165px] bg-[#fbf9f3] rounded-[20px] shadow-[0px_2px_8px_rgba(0,0,0,0.06)] overflow-hidden shrink-0 flex flex-col justify-between border border-slate-100/80 transition-all duration-200 active:scale-[0.98] hover:shadow-md cursor-pointer group"
    >
      {/* Top Image & Overlapping Badge */}
      <div className="h-[80px] w-full relative bg-slate-100 overflow-visible">
        <img 
          src={thumbnail} 
          alt={plot.plot_name} 
          className="w-full h-full object-cover rounded-t-[20px] group-hover:scale-105 transition-transform duration-300"
          onError={(e) => { e.target.src = '/assets/figma/image9.png'; }}
        />
        {/* Overlapping circular emoji badge */}
        <div className="-bottom-3.5 left-2.5 w-7 h-7 rounded-full bg-white shadow-sm flex items-center justify-center text-sm absolute z-10 border border-slate-100">
          {plot.komoditas_icon || '🌱'}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-2.5 pt-4 flex flex-col gap-1.5 flex-1 justify-between">
        <div>
          {/* Plot Name & Crop */}
          <div className="flex items-baseline gap-1 font-['Montserrat_Alternates',sans-serif] font-bold text-[#3c3b3b] truncate text-[11px]">
            <span className="truncate">{plot.plot_name}</span>
            <span className="text-[9px] text-[#6f6e72] shrink-0">• {plot.komoditas_nama}</span>
          </div>

          {/* Growth Stage */}
          <p className="text-[9px] font-['Montserrat_Alternates',sans-serif] text-[#6f6e72] truncate">
            {plot.current_growth_stage || 'Week 5: Vegetatif'}
          </p>

          {/* Progress Bar */}
          <div className="flex items-center justify-between text-[10px] font-['Manrope',sans-serif] font-bold mt-1">
            <span className="text-[#3c3b3b] text-[9px]">Progress</span>
            <span className={isUrgentOrAttention ? 'text-[#d89710]' : 'text-[#28502d]'}>{progressPct}%</span>
          </div>
          <div className="w-full bg-[#d9d9d9] h-[5px] rounded-full overflow-hidden mt-0.5">
            <div 
              className={`h-full rounded-full ${isUrgentOrAttention ? 'bg-gradient-to-r from-[#d89710] to-[#f0c771]' : 'bg-gradient-to-r from-[#28502d] to-[#3a6c3d]'}`} 
              style={{ width: `${progressPct}%` }} 
            />
          </div>

          {/* Harvest Info */}
          <div className="flex items-center gap-1 text-[9px] font-['Montserrat_Alternates',sans-serif] text-[#3c3b3b] mt-1.5">
            <span>📅</span>
            <span>Panen {daysToHarvest} hari lagi</span>
          </div>
        </div>

        {/* Status Pill Button */}
        <div className={`w-full py-1 rounded-full text-[9px] font-['Montserrat_Alternates',sans-serif] font-semibold text-[#fbf9f3] text-center mt-1.5 shadow-2xs ${isUrgentOrAttention ? 'bg-[#e8b54a]' : 'bg-[#28502d]'}`}>
          {plot.status_text || (isUrgentOrAttention ? 'Perlu Perhatian' : 'Sehat')}
        </div>
      </div>
    </div>
  );
}
