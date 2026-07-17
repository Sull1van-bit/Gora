import React from 'react';
import UniversalIcon from '../../utils/iconHelper';

export default function PlotCardFull({ plot, onSelect }) {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'urgent':
        return {
          label: 'Kritis',
          bgClass: 'bg-[#ce4949] text-white',
        };
      case 'attention':
        return {
          label: 'Perlu Perhatian',
          bgClass: 'bg-[#e8b54a] text-[#fbf9f3]',
        };
      case 'ontrack':
      default:
        return {
          label: 'Normal',
          bgClass: 'bg-[#578a3e] text-white',
        };
    }
  };

  const statusBadge = getStatusBadge(plot.status);
  const progressVal = plot.growth_progress || 67;

  return (
    <div
      onClick={() => onSelect(plot.id)}
      className="bg-[#fbf9f3] rounded-[20px] shadow-[0px_0px_4px_rgba(0,0,0,0.08)] border border-[#e8e4d9] overflow-hidden cursor-pointer active:scale-[0.99] transition-all relative select-none"
    >
      {/* Top Image Banner */}
      <div className="h-[98px] sm:h-[110px] w-full relative">
        <img 
          src={plot.image_url || '/assets/figma/image9.png'} 
          className="w-full h-full object-cover rounded-t-[20px] pointer-events-none" 
          alt={plot.plot_name} 
        />
      </div>

      {/* Overlapping Circular Commodity Badge */}
      <div className="size-[55px] bg-[#fbf9f3] rounded-full absolute top-[70px] sm:top-[82px] left-[10px] shadow-[0px_2px_4px_rgba(0,0,0,0.1)] flex items-center justify-center z-10 border-2 border-[#fbf9f3]">
        <UniversalIcon icon={plot.komoditas_icon || 'rice'} className="w-7 h-7 text-emerald-600" />
      </div>

      {/* Card Body */}
      <div className="pt-2.5 pb-4 px-4 relative">
        {/* Title, Commodity & Status Row */}
        <div className="pl-[68px] flex items-start justify-between min-h-[40px]">
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <p className="font-['Montserrat_Alternates',sans-serif] font-semibold text-[#3c3b3b] text-[15px] leading-tight">
                {plot.plot_name}
              </p>
              <img src="/assets/figma/plots/dot_bullet.svg" className="w-[3px] h-[3px] shrink-0" alt="" />
              <p className="font-['Montserrat_Alternates',sans-serif] font-medium text-[#3c3b3b] text-[11px] leading-tight">
                {plot.komoditas_nama}
              </p>
            </div>

            {/* Harvest Countdown */}
            <div className="flex items-center gap-1.5 mt-1.5">
              <img src="/assets/figma/plots/calendar_icon.svg" className="w-[11px] h-[11px] shrink-0" alt="" />
              <p className="font-['Montserrat_Alternates',sans-serif] font-medium text-[#8f8e94] text-[10px]">
                Panen <span className="font-bold">{plot.days_to_harvest || 28} hari lagi</span>
              </p>
            </div>
          </div>

          {/* Status Badge */}
          <div className={`${statusBadge.bgClass} px-2.5 py-1 rounded-full text-[9px] font-['Montserrat_Alternates',sans-serif] font-medium shrink-0 ml-2 shadow-2xs`}>
            {statusBadge.label}
          </div>
        </div>

        {/* Progress Section */}
        <div className="mt-3.5 space-y-1.5">
          <div className="flex items-center justify-between w-full">
            <p className="font-['Montserrat_Alternates',sans-serif] font-semibold text-[#3c3b3b] text-[11px]">
              Progress
            </p>
            <p className="font-['Manrope',sans-serif] font-semibold text-[#d89710] text-[12px]">
              {progressVal}%
            </p>
          </div>
          <div className="w-full bg-[#d9d9d9] h-[6px] rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-[#d89710] to-[#f0c771] h-full rounded-full transition-all duration-500"
              style={{ width: `${progressVal}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
