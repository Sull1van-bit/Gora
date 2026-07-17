import React from 'react';
import { RiAlertFill } from 'react-icons/ri';

export default function PlotDetailHistory({ plotActivities, setIsReportOpen }) {
  return (
    <section className="mx-4 mt-6 pb-6">
      <div className="flex items-center justify-between mb-3.5">
        <div className="flex items-center gap-2">
          <img src="/assets/figma/detail/history.svg" className="w-4 h-4 shrink-0" alt="History" />
          <h3 className="font-['Montserrat_Alternates',sans-serif] font-bold text-[15px] text-[#28502d]">
            Histori Aktivitas
          </h3>
        </div>
        <button
          onClick={() => setIsReportOpen(true)}
          className="text-[10px] font-['Montserrat_Alternates',sans-serif] font-bold text-rose-600 hover:underline flex items-center gap-1 active:scale-95"
        >
          <RiAlertFill /> Lapor Masalah
        </button>
      </div>

      <div className="space-y-3 pl-1">
        {plotActivities.length > 0 ? plotActivities.map((item, idx) => (
          <div 
            key={item.id || idx} 
            className="flex items-start justify-between pb-3 border-b border-[#3c3b3b]/20 last:border-0 text-[#3c3b3b]"
          >
            <div className="flex flex-col gap-0.5">
              <span className="font-['Montserrat_Alternates',sans-serif] font-semibold text-[12px]">{item.title}</span>
              <span className="font-['Montserrat_Alternates',sans-serif] font-medium text-[10px] text-[#6f6e72]">
                {item.notes}
              </span>
            </div>
            <span className="font-['Montserrat_Alternates',sans-serif] font-semibold text-[10px] whitespace-nowrap ml-2">
              {item.date}
            </span>
          </div>
        )) : (
          <div className="text-center py-4 text-[#8f8e94] text-[12px] font-['Montserrat_Alternates',sans-serif]">
            Belum ada histori aktivitas.
          </div>
        )}
      </div>
    </section>
  );
}
