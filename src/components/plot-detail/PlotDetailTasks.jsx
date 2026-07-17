import React from 'react';

export default function PlotDetailTasks({ highPriorityActions, medPriorityActions, onCompleteAction }) {
  return (
    <section className="mx-4 mt-5 bg-[#fbf9f3] rounded-[15px] p-5 shadow-[0px_2px_8px_rgba(0,0,0,0.06)] border border-slate-100/80">
      <div className="flex items-center gap-2.5 mb-5">
        <img src="/assets/figma/detail/notification.svg" className="w-4 h-4 shrink-0" alt="" />
        <h3 className="font-['Montserrat_Alternates',sans-serif] font-bold text-[15px] text-[#28502d]">
          Perlu Dilakukan Hari Ini:
        </h3>
      </div>

      
      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-2">
          <img src="/assets/figma/detail/dot_high.svg" className="w-2 h-2 shrink-0" alt="High Priority" />
          <span className="font-['Montserrat_Alternates',sans-serif] font-semibold text-[12px] text-[#3c3b3b]">
            Prioritas Tinggi
          </span>
        </div>
        <div className="pl-4 space-y-3">
          {highPriorityActions.length > 0 ? (
            highPriorityActions.map((act) => (
              <div 
                key={act.id} 
                onClick={() => onCompleteAction(act.id)} 
                className="flex items-start gap-2.5 cursor-pointer group"
              >
                <div className="w-4 h-4 rounded-[3px] border border-[#3c3b3b] group-hover:border-[#28502d] flex items-center justify-center shrink-0 mt-0.5 transition-all">
                  {act.status === 'completed' && <span className="text-[10px] font-bold text-[#28502d]">✓</span>}
                </div>
                <div className="min-w-0">
                  <p className={`font-['Montserrat_Alternates',sans-serif] font-medium text-[10px] text-[#3c3b3b] leading-tight ${act.status === 'completed' ? 'line-through text-slate-400' : ''}`}>
                    {act.title}
                  </p>
                  <p className="font-['Montserrat_Alternates',sans-serif] text-[8px] text-[#6f6e72] mt-0.5 leading-relaxed">
                    {act.notes || 'Prediksi hujan besar / butuh penanganan tepat waktu'}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-start gap-2.5 cursor-pointer group">
              <div className="w-4 h-4 rounded-[3px] border border-[#3c3b3b] flex items-center justify-center shrink-0 mt-0.5" />
              <div>
                <p className="font-['Montserrat_Alternates',sans-serif] font-medium text-[10px] text-[#3c3b3b] leading-tight">Periksa saluran air</p>
                <p className="font-['Montserrat_Alternates',sans-serif] text-[8px] text-[#6f6e72] mt-0.5 leading-relaxed">Prediksi hujan besar</p>
              </div>
            </div>
          )}
        </div>
      </div>

      
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <img src="/assets/figma/detail/dot_med.svg" className="w-2 h-2 shrink-0" alt="Medium Priority" />
          <span className="font-['Montserrat_Alternates',sans-serif] font-semibold text-[12px] text-[#3c3b3b]">
            Prioritas Sedang
          </span>
        </div>
        <div className="pl-4 space-y-3">
          {medPriorityActions.length > 0 ? (
            medPriorityActions.map((act) => (
              <div 
                key={act.id} 
                onClick={() => onCompleteAction(act.id)} 
                className="flex items-start gap-2.5 cursor-pointer group"
              >
                <div className="w-4 h-4 rounded-[3px] border border-[#3c3b3b] group-hover:border-[#28502d] flex items-center justify-center shrink-0 mt-0.5 transition-all">
                  {act.status === 'completed' && <span className="text-[10px] font-bold text-[#28502d]">✓</span>}
                </div>
                <div className="min-w-0">
                  <p className={`font-['Montserrat_Alternates',sans-serif] font-medium text-[10px] text-[#3c3b3b] leading-tight ${act.status === 'completed' ? 'line-through text-slate-400' : ''}`}>
                    {act.title}
                  </p>
                  <p className="font-['Montserrat_Alternates',sans-serif] text-[8px] text-[#6f6e72] mt-0.5 leading-relaxed">
                    {act.notes || 'Recent fertilization and forecast conditions suggest waiting.'}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <>
              <div className="flex items-start gap-2.5 cursor-pointer group">
                <div className="w-4 h-4 rounded-[3px] border border-[#3c3b3b] flex items-center justify-center shrink-0 mt-0.5" />
                <div>
                  <p className="font-['Montserrat_Alternates',sans-serif] font-medium text-[10px] text-[#3c3b3b] leading-tight">Delay Fertilization</p>
                  <p className="font-['Montserrat_Alternates',sans-serif] text-[8px] text-[#6f6e72] mt-0.5 leading-relaxed">Recent fertilization and forecast conditions suggest waiting.</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 cursor-pointer group">
                <div className="w-4 h-4 rounded-[3px] border border-[#3c3b3b] flex items-center justify-center shrink-0 mt-0.5" />
                <div>
                  <p className="font-['Montserrat_Alternates',sans-serif] font-medium text-[10px] text-[#3c3b3b] leading-tight">Delay Fertilization</p>
                  <p className="font-['Montserrat_Alternates',sans-serif] text-[8px] text-[#6f6e72] mt-0.5 leading-relaxed">Recent fertilization and forecast conditions suggest waiting.</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
