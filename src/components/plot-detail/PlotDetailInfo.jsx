import React from 'react';

export default function PlotDetailInfo({ plot }) {
  return (
    <section className="grid grid-cols-12 gap-2.5 mt-5 px-4">
      
      <div className="col-span-7 bg-[#fbf9f3] rounded-[10px] px-4 py-2.5 shadow-[0px_2px_2px_rgba(0,0,0,0.1)] flex flex-col justify-center border border-slate-100/60">
        <span className="font-['Montserrat_Alternates',sans-serif] font-medium text-[10px] text-[#3c3b3b]">
          Lokasi Lahan
        </span>
        <div className="flex items-center gap-1.5 mt-1">
          <img src="/assets/figma/detail/location_pin.svg" className="w-3 h-3.5 shrink-0" alt="" />
          <span className="font-['Montserrat_Alternates',sans-serif] font-semibold text-[11px] sm:text-[12px] text-[#28502d] truncate">
            {plot.location || 'Tangerang, Indonesia'}
          </span>
        </div>
      </div>

      
      <div className="col-span-5 bg-[#fbf9f3] rounded-[10px] px-4 py-2.5 shadow-[0px_2px_2px_rgba(0,0,0,0.1)] flex flex-col justify-center border border-slate-100/60">
        <span className="font-['Montserrat_Alternates',sans-serif] font-medium text-[10px] text-[#3c3b3b]">
          Luas Lahan
        </span>
        <span className="font-['Montserrat_Alternates',sans-serif] font-semibold text-[11px] sm:text-[12px] text-[#28502d] mt-1 truncate">
          {plot.area ? `${plot.area} m²` : '10 km'}
        </span>
      </div>
    </section>
  );
}
