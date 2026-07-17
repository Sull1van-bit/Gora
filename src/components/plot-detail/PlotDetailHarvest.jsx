import React from 'react';

export default function PlotDetailHarvest({ plot, daysToHarvest }) {
  const formatDate = (dateStr, fallback = '-') => {
    if (!dateStr) return fallback;
    
    const [year, month, day] = dateStr.split('-');
    if (!year || !month || !day) return dateStr; // format nggak dikenali, tampilkan mentah
    
    return `${day}/${month}/${year}`;
  };

  return (
    <section className="mx-4 mt-3 bg-[#fbf9f3] rounded-[10px] px-5 py-3.5 shadow-[0px_2px_1px_rgba(0,0,0,0.1)] border border-slate-100/60">
      <div className="flex items-center justify-around relative">
        
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <span className="font-['Montserrat_Alternates',sans-serif] font-medium text-[10px] text-[#3c3b3b]">
            Tanggal Tanam
          </span>
          <span className="font-['Montserrat_Alternates',sans-serif] font-semibold text-[18px] sm:text-[20px] text-[#28502d] tracking-[1px] mt-1">
            {formatDate(plot.planting_date, '01/08/2026')}
          </span>
        </div>

        
        <div className="h-12 flex items-center justify-center px-2">
          <img src="/assets/figma/detail/divider_line.svg" className="h-11 w-px object-contain" alt="|" />
        </div>

        
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <span className="font-['Montserrat_Alternates',sans-serif] font-medium text-[10px] text-[#3c3b3b]">
            Estimasi Panen
          </span>
          <span className="font-['Montserrat_Alternates',sans-serif] font-semibold text-[18px] sm:text-[20px] text-[#28502d] tracking-[1px] mt-1">
            {formatDate(plot.estimated_harvest_date, '12/08/2026')}
          </span>
        </div>
      </div>

      
      <div className="flex items-center justify-center gap-2 mt-3 pt-2.5 border-t border-slate-200/60">
        <img src="/assets/figma/detail/calendar.svg" className="w-3 h-3 shrink-0" alt="" />
        <p className="font-['Montserrat_Alternates',sans-serif] text-[10px] text-[#28502d]">
          <span>Panen dalam </span>
          <span className="font-bold">{daysToHarvest} hari</span>
        </p>
      </div>
    </section>
  );
}
