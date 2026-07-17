import React from 'react';
import { MdWaterDrop } from 'react-icons/md';
import { GiWaterDrop } from 'react-icons/gi';

export default function HomePriorities({ 
  pendingActions, 
  onCompleteAction, 
  completedActionsCount, 
  totalActionsCount 
}) {
  return (
    <section>
      <h2 className="text-[14px] font-['Montserrat_Alternates',sans-serif] font-semibold text-[#3c3b3b] mb-3">
        Prioritas Hari Ini
      </h2>
      <div className="bg-[#fbf9f3] rounded-[20px] shadow-[0px_0px_4px_rgba(0,0,0,0.08)] h-[115px] relative flex flex-col justify-between">
        <div className="flex-1 px-[13px] pt-[8px] space-y-[12px] overflow-hidden">
          {pendingActions.length > 0 ? (
            pendingActions.slice(0, 2).map((act, idx) => (
              <div 
                key={act.id} 
                onClick={() => onCompleteAction(act.id)} 
                className="flex items-center gap-3 cursor-pointer group"
              >
                <div className={`w-[25px] h-[25px] rounded-[8px] flex items-center justify-center text-[18px] shrink-0 ${idx === 0 ? 'bg-[#b4d7f1] text-[#2c658f]' : 'bg-[#bcd4aa] text-[#4d6b38]'}`}>
                  {idx === 0 ? <MdWaterDrop /> : <GiWaterDrop />}
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <p className="text-[10px] font-['Montserrat_Alternates',sans-serif] font-semibold text-[#3c3b3b] truncate leading-tight group-hover:text-emerald-700 transition-colors">
                    {act.title}
                  </p>
                  <p className="text-[6px] font-['Montserrat_Alternates',sans-serif] font-normal text-[#3c3b3b] truncate mt-0.5">
                    {act.plot_name || 'Lahan Padi'}
                  </p>
                </div>
                <div className="w-[16px] h-[16px] rounded-[4px] border border-[rgba(60,59,59,0.7)] group-hover:border-[#28502d] group-hover:bg-emerald-50 flex items-center justify-center transition-all shrink-0" />
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <p className="text-[10px] font-bold text-[#28502d] font-['Montserrat_Alternates',sans-serif]">Semua Selesai!</p>
            </div>
          )}
        </div>

        
        <div className="relative">
          
          <div className="absolute top-0 left-0 w-full h-[0.5px] bg-[#d1d5db]" />
          <div className="px-[14px] py-[6px] flex flex-col gap-1">
            <span className="text-[6px] font-['Montserrat_Alternates',sans-serif] font-medium text-[#3c3b3b]">
              {completedActionsCount}/{totalActionsCount} Selesai
            </span>
            <div className="w-full bg-[#d9d9d9] h-[5px] rounded-[20px] overflow-hidden">
              <div 
                className="bg-[#3c3b3b] h-full rounded-[20px] transition-all duration-300" 
                style={{ width: `${(completedActionsCount / Math.max(1, totalActionsCount)) * 100}%` }} 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
