import React from 'react';
import { RiCalendar2Line, RiLeafFill, RiPlantFill, RiSeedlingFill } from 'react-icons/ri';
import UniversalIcon from '../../utils/iconHelper';

export default function PlotCardMini({ plot, onSelect }) {
  const progressPct = plot.progress || plot.growth_progress || 60;
  
  const daysToHarvest = plot.days_to_harvest || 28;

  const thumbnail = plot.image_url || (
    plot.komoditas_nama?.toLowerCase().includes('tomat') 
      ? '/assets/figma/image10.png' 
      : '/assets/figma/image9.png'
  );

  const cleanCropName = (plot.komoditas_nama || 'Tanaman').replace(/\s*\([^)]*\)/g, '').trim();
  const cleanPlotName = plot.plot_name ? plot.plot_name.split('-')[0].trim() : 'Lahan';

  // Convert growth stage to pure Indonesian term
  const getIndonesianGrowthStage = (stage = '') => {
    if (!stage) return 'Minggu 5: Vegetatif';
    const match = /\(([^)]+)\)/.exec(stage);
    let term = '';
    if (match && match[1]) {
      term = match[1].trim();
    } else {
      const lower = stage.toLowerCase();
      if (lower.includes('flower') || lower.includes('berbunga')) term = 'Berbunga';
      else if (lower.includes('fruit') || lower.includes('pembuahan') || lower.includes('berbuah')) term = 'Pembuahan';
      else if (lower.includes('germinat') || lower.includes('perkecambahan') || lower.includes('kecambah')) term = 'Perkecambahan';
      else if (lower.includes('vegetat')) term = 'Vegetatif';
      else if (lower.includes('harvest') || lower.includes('panen')) term = 'Siap Panen';
      else if (lower.includes('seedling') || lower.includes('bibit') || lower.includes('pembibitan')) term = 'Pembibitan';
      else term = stage;
    }
    const weekMatch = stage.match(/(?:Week|Minggu)\s*(\d+)/i);
    if (weekMatch && weekMatch[1]) {
      return `Minggu ${weekMatch[1]}: ${term}`;
    }
    return term;
  };
  const indonesianGrowthStage = getIndonesianGrowthStage(plot.current_growth_stage);

  // Map status cleanly to colors and labels
  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case 'urgent':
      case 'high':
        return {
          textClass: 'text-[#ce4949]',
          barClass: 'bg-gradient-to-r from-[#ce4949] to-[#e06868]',
          pillClass: 'bg-[#ce4949]',
          pillLabel: 'Mendesak'
        };
      case 'attention':
      case 'medium':
        return {
          textClass: 'text-[#d89710]',
          barClass: 'bg-gradient-to-r from-[#d89710] to-[#f0c771]',
          pillClass: 'bg-[#e8b54a]',
          pillLabel: 'Perlu Perhatian'
        };
      case 'ontrack':
      case 'normal':
      case 'low':
      default:
        return {
          textClass: 'text-[#28502d]',
          barClass: 'bg-gradient-to-r from-[#28502d] to-[#3a6c3d]',
          pillClass: 'bg-[#28502d]',
          pillLabel: 'Sehat'
        };
    }
  };
  const statusStyle = getStatusStyle(plot.status);

  return (
    <div
      onClick={() => onSelect(plot.id)}
      className="w-[145px] sm:w-[155px] h-[200px] bg-[#fbf9f3] rounded-[20px] shadow-[0px_2px_8px_rgba(0,0,0,0.06)] border border-slate-100/80 overflow-hidden shrink-0 flex flex-col justify-between transition-all duration-200 active:scale-[0.98] hover:shadow-md cursor-pointer group select-none"
    >
      {/* Top Image & Overlapping React Icon Badge */}
      <div className="h-[80px] w-full relative bg-slate-100 overflow-visible shrink-0">
        <img 
          src={thumbnail} 
          alt={plot.plot_name} 
          className="w-full h-full object-cover rounded-t-[20px] group-hover:scale-105 transition-transform duration-300"
          onError={(e) => { e.target.src = '/assets/figma/image9.png'; }}
        />
        {/* Overlapping circular icon badge like origin/main */}
        <div className="-bottom-3.5 left-2.5 w-7 h-7 rounded-full bg-white shadow-sm flex items-center justify-center text-sm absolute z-10 border border-slate-100 text-emerald-600">
          {plot.komoditas_nama?.includes('Tomat') ? <RiPlantFill /> :
           plot.komoditas_nama?.includes('Cabai') ? <RiLeafFill /> :
           plot.komoditas_nama?.includes('Padi') ? <RiSeedlingFill /> :
           <RiLeafFill />}
        </div>
      </div>

      {/* Content Area with extra height and breathing room */}
      <div className="p-3 pt-4.5 flex flex-col justify-between flex-1 min-h-0 gap-1">
        <div className="space-y-1">
          {/* Plot Name & Crop */}
          <div className="flex items-center gap-1 font-['Montserrat_Alternates',sans-serif] font-bold text-[#3c3b3b] truncate text-[11px] leading-tight">
            <span className="truncate">{cleanPlotName}</span>
            <span className="text-[9px] font-normal text-[#6f6e72] shrink-0">· {cleanCropName}</span>
          </div>

          {/* Growth Stage in Indonesian */}
          <p className="text-[9px] font-['Montserrat_Alternates',sans-serif] font-normal text-[#3c3b3b] truncate leading-tight">
            {indonesianGrowthStage}
          </p>

          {/* Progress Bar with exact status color */}
          <div className="pt-0.5">
            <div className="flex items-center justify-between font-['Manrope',sans-serif] leading-none mb-1">
              <span className="font-['Montserrat_Alternates',sans-serif] font-semibold text-[#3c3b3b] text-[8.5px] sm:text-[9px]">Progress</span>
              <span className={`font-bold text-[11px] sm:text-[12px] ${statusStyle.textClass}`}>{progressPct}%</span>
            </div>
            <div className="w-full bg-[#d9d9d9] h-[6px] rounded-[20px] overflow-hidden">
              <div 
                className={`h-full rounded-[20px] ${statusStyle.barClass}`} 
                style={{ width: `${progressPct}%` }} 
              />
            </div>
          </div>

          {/* Harvest Info */}
          <div className="flex items-center gap-1 text-[9px] font-['Montserrat_Alternates',sans-serif] text-[#3c3b3b] pt-0.5">
            <RiCalendar2Line className="w-3 h-3 text-slate-500 shrink-0" />
            <span className="truncate">Panen {daysToHarvest} hari lagi</span>
          </div>
        </div>

        {/* Centered Status Pill Button */}
        <div className={`mx-auto w-fit px-3 py-[3px] rounded-[100px] text-[8.5px] font-['Montserrat_Alternates',sans-serif] font-medium text-[#fbf9f3] text-center leading-none shadow-2xs mt-1 ${statusStyle.pillClass}`}>
          {statusStyle.pillLabel}
        </div>
      </div>
    </div>
  );
}
