import React from 'react';

export default function PlotCardFull({ plot, onSelect }) {
  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case 'urgent':
      case 'high':
        return {
          label: 'Mendesak',
          bgClass: 'bg-[#ce4949] text-white',
          textClass: 'text-[#ce4949]',
          barClass: 'bg-gradient-to-r from-[#ce4949] to-[#e06868]',
        };
      case 'attention':
      case 'medium':
        return {
          label: 'Perlu Perhatian',
          bgClass: 'bg-[#e8b54a] text-[#fbf9f3]',
          textClass: 'text-[#d89710]',
          barClass: 'bg-gradient-to-r from-[#d89710] to-[#f0c771]',
        };
      case 'ontrack':
      case 'normal':
      case 'low':
      default:
        return {
          label: 'Sehat',
          bgClass: 'bg-[#28502d] text-white',
          textClass: 'text-[#28502d]',
          barClass: 'bg-gradient-to-r from-[#28502d] to-[#3a6c3d]',
        };
    }
  };

  const statusStyle = getStatusStyle(plot.status);
  
  let progressVal = plot.growth_progress || plot.progress || 15;
  let daysToHarvest = plot.days_to_harvest || 28;

  if (plot.planting_date && plot.estimated_harvest_date) {
    const start = new Date(plot.planting_date).getTime();
    const now = new Date().getTime();
    elapsedDays = Math.max(0, Math.floor((now - start) / (1000 * 60 * 60 * 24)));
  }

  let currentStageIndex = 0;
  let accumulatedDays = 0;
  let daysToNext = 0;

  for (let i = 0; i < stages.length; i++) {
    accumulatedDays += stages[i].days;
    if (elapsedDays < accumulatedDays) {
      currentStageIndex = i;
      daysToNext = accumulatedDays - elapsedDays;
      break;
    }
    if (i === stages.length - 1) {
      currentStageIndex = i;
      daysToNext = 0; 
    }
  }

  const nextStageName = currentStageIndex < stages.length - 1 ? stages[currentStageIndex + 1].name : "Siap Panen";


  return (
    <div
      onClick={() => onSelect(plot.id)}
      className="bg-[#fbf9f3] rounded-[20px] shadow-[0px_0px_4px_rgba(0,0,0,0.08)] border border-[#e8e4d9] overflow-hidden cursor-pointer active:scale-[0.99] transition-all relative select-none"
    >
      <div className="h-[98px] sm:h-[110px] w-full relative">
        <img 
          src={plot.image_url || '/assets/figma/image9.png'} 
          className="w-full h-full object-cover rounded-t-[20px] pointer-events-none" 
          alt={plot.plot_name} 
        />
      </div>

      <div className="size-[55px] bg-[#fbf9f3] rounded-full absolute top-[70px] sm:top-[82px] left-[10px] shadow-[0px_2px_4px_rgba(0,0,0,0.1)] flex items-center justify-center z-10 border-2 border-[#fbf9f3] text-emerald-600">
        <span className="text-[30px] leading-none select-none flex items-center justify-center text-black">
          {plot.komoditas_icon ? plot.komoditas_icon :
           plot.komoditas_nama?.includes('Tomat') ? '🍅' :
           plot.komoditas_nama?.includes('Cabai') ? '🌶️' :
           plot.komoditas_nama?.includes('Padi') ? '🌾' :
           plot.komoditas_nama?.includes('Jagung') ? '🌽' :
           plot.komoditas_nama?.includes('Bawang') ? '🧅' :
           plot.komoditas_nama?.includes('Kubis') ? '🥬' :
           '🌱'}
        </span>
      </div>

      <div className="pt-2.5 pb-4 px-4 relative">
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

            <div className="flex items-center gap-1.5 mt-1.5">
              <img src="/assets/figma/plots/calendar_icon.svg" className="w-[11px] h-[11px] shrink-0" alt="" />
              <p className="font-['Montserrat_Alternates',sans-serif] font-medium text-[#8f8e94] text-[10px]">
                Umur: <span className="font-bold">{elapsedDays} Hari</span>
              </p>
            </div>
          </div>

          <div className={`${statusStyle.bgClass} px-2.5 py-1 rounded-full text-[9px] font-['Montserrat_Alternates',sans-serif] font-medium shrink-0 ml-2 shadow-2xs`}>
            {statusStyle.label}
          </div>
        </div>

        <div className="mt-3.5 space-y-1.5">
          <div className="flex items-center justify-between w-full">
            <p className="font-['Montserrat_Alternates',sans-serif] font-semibold text-[#3c3b3b] text-[11px]">
              Progress
            </p>
            <p className={`font-['Manrope',sans-serif] font-semibold text-[12px] ${statusStyle.textClass}`}>
              {progressVal}%
            </p>
          </div>
          <div className="w-full bg-[#d9d9d9] h-[4px] rounded-full mt-2 overflow-hidden">
            <div 
              className={`${statusStyle.barClass} h-full rounded-full transition-all duration-500`}
              style={{ width: `${progressVal}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
