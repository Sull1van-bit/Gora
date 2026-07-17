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
        {(plotActivities.length > 0 ? plotActivities : [
          { id: 'h1', title: 'Disiram', timeAgo: '1 hari lalu', date: '18/07/2026' },
          { id: 'h2', title: 'Disiram', timeAgo: '1 hari lalu', date: '18/07/2026' },
          { id: 'h3', title: 'Disiram', timeAgo: '1 hari lalu', date: '18/07/2026' }
        ]).map((item, idx) => (
          <div 
            key={item.id || idx} 
            className="flex items-start justify-between pb-3 border-b border-[#3c3b3b]/20 last:border-0 text-[#3c3b3b]"
          >
            <div className="flex flex-col gap-0.5">
              <span className="font-['Montserrat_Alternates',sans-serif] font-semibold text-[12px]">{item.title}</span>
              <span className="font-['Montserrat_Alternates',sans-serif] font-medium text-[10px] text-[#6f6e72]">
                {item.timeAgo || (item.timestamp ? item.timestamp : '1 hari lalu')}
              </span>
            </div>
            <span className="font-['Montserrat_Alternates',sans-serif] font-semibold text-[12px]">
              {item.date || '18/07/2026'}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
