import React, { useState } from 'react';
import LogActivityModal from '../components/plots/LogActivityModal';
import ReportIssueModal from '../components/plots/ReportIssueModal';

export default function PlotDetailPage({ 
  plotId, 
  plots, 
  actions, 
  activities, 
  onCompleteAction, 
  onLogActivity, 
  onReportIssue, 
  onBack 
}) {
  const [isLogOpen, setIsLogOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);

  const plot = plots.find((p) => p.id === plotId);

  if (!plot) {
    return (
      <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 shadow-xs mt-6 mx-4">
        <span className="text-4xl block mb-2">⚠️</span>
        <h3 className="font-bold text-slate-800 text-sm font-['Montserrat_Alternates',sans-serif]">Data Lahan Tidak Ditemukan</h3>
        <p className="text-xs text-slate-400 mt-1">Lahan yang Anda cari mungkin telah dihapus atau dipindahkan.</p>
        <button
          onClick={onBack}
          className="mt-4 px-5 py-2.5 bg-[#578a3e] text-white rounded-xl text-xs font-bold active:scale-95 transition-all"
        >
          Kembali ke Lahan Saya
        </button>
      </div>
    );
  }

  const plotActions = actions.filter((a) => a.plot_id === plot.id);
  const plotActivities = activities.filter((a) => a.plot_id === plot.id);

  // Split actions into high vs medium/low priority according to Figma design
  const pendingActions = plotActions.filter(a => a.status !== 'completed');
  const completedActions = plotActions.filter(a => a.status === 'completed');

  const highPriorityActions = pendingActions.length > 0 
    ? pendingActions.slice(0, 1) 
    : plotActions.slice(0, 1);
  const medPriorityActions = pendingActions.length > 1 
    ? pendingActions.slice(1) 
    : (completedActions.length > 0 ? completedActions : plotActions.slice(1, 3));

  const progressPct = plot.progress || plot.growth_progress || 67;
  const daysToHarvest = plot.days_to_harvest || 28;

  return (
    <div className="animate-fade-in pb-8 space-y-0 text-[#3c3b3b]">
      {/* SECTION 1: Top Curved Green Header Banner */}
      <section className="bg-[#578a3e] rounded-b-[30px] pt-3 pb-6 px-4 relative text-white shadow-xs">
        <div className="flex items-center justify-between relative z-10 py-1">
          <button
            onClick={onBack}
            className="w-9 h-9 -ml-1 rounded-full flex items-center justify-center hover:bg-white/10 active:scale-90 transition-all"
            aria-label="Kembali"
          >
            <img src="/assets/figma/detail/back_button.svg" className="w-6 h-6 filter brightness-0 invert shrink-0" alt="Back" />
          </button>
          <div className="flex flex-col items-center justify-center text-center">
            <h1 className="font-['Montserrat_Alternates',sans-serif] font-bold text-[22px] sm:text-[25px] leading-tight text-white tracking-tight truncate max-w-[240px]">
              {plot.plot_name}
            </h1>
            <div className="flex items-center gap-1.5 mt-0.5 opacity-95">
              <img src="/assets/figma/detail/leaf_title.svg" className="w-3.5 h-3 filter brightness-0 invert shrink-0" alt="" />
              <span className="font-['Montserrat_Alternates',sans-serif] font-medium text-[13px] sm:text-[15px] text-white">
                {plot.komoditas_nama?.split('(')[0]?.trim() || 'Tomat'}
              </span>
            </div>
          </div>
          <div className="w-9" /> {/* Spacer for precise center alignment */}
        </div>
      </section>

      {/* SECTION 2: Circular Progress Diagram & Phase */}
      <section className="-mt-1 flex flex-col items-center justify-center relative z-20">
        <div className="relative w-[173px] h-[173px] flex items-center justify-center my-1 select-none">
          <img 
            src="/assets/figma/detail/progress_ring.svg" 
            className="absolute inset-0 w-full h-full object-contain pointer-events-none" 
            alt="Progress Ring" 
          />
          <div className="flex flex-col items-center justify-center text-[#28502d] z-10 text-center">
            <span className="font-['Montserrat_Alternates',sans-serif] font-medium text-[10px] text-[#28502d]">
              Progres
            </span>
            <span className="font-['Montserrat_Alternates',sans-serif] font-semibold text-[30px] leading-none text-[#28502d] my-1">
              {progressPct}%
            </span>
            <span className="font-['Montserrat_Alternates',sans-serif] font-bold text-[10px] text-[#28502d]">
              {plot.status_text?.split('-')[0]?.trim() || (plot.status === 'urgent' ? 'Perhatian' : plot.status === 'attention' ? 'Perhatian' : 'Aman')}
            </span>
          </div>
        </div>

        {/* Growth Phase Text */}
        <div className="text-center mt-3">
          <span className="font-['Montserrat_Alternates',sans-serif] text-[15px] text-[#3c3b3b]">Fase : </span>
          <span className="font-['Montserrat_Alternates',sans-serif] font-bold text-[15px] text-[#28502d]">
            {plot.current_growth_stage || 'Pertumbuhan Vegetatif'}
          </span>
        </div>

        {/* Update Kondisi Button */}
        <button
          onClick={() => setIsLogOpen(true)}
          className="mt-3.5 bg-[#438347] hover:bg-[#366c3a] active:scale-95 text-white font-['Montserrat_Alternates',sans-serif] font-semibold text-[10px] px-6 py-1.5 rounded-full shadow-xs transition-all flex items-center gap-1.5"
        >
          <span>Update Kondisi</span>
        </button>
      </section>

      {/* SECTION 3: Info Cards Grid (Lokasi Lahan & Luas Lahan) */}
      <section className="grid grid-cols-12 gap-2.5 mt-5 px-4">
        {/* Lokasi Lahan (7 cols) */}
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

        {/* Luas Lahan (5 cols) */}
        <div className="col-span-5 bg-[#fbf9f3] rounded-[10px] px-4 py-2.5 shadow-[0px_2px_2px_rgba(0,0,0,0.1)] flex flex-col justify-center border border-slate-100/60">
          <span className="font-['Montserrat_Alternates',sans-serif] font-medium text-[10px] text-[#3c3b3b]">
            Luas Lahan
          </span>
          <span className="font-['Montserrat_Alternates',sans-serif] font-semibold text-[11px] sm:text-[12px] text-[#28502d] mt-1 truncate">
            {plot.area ? `${plot.area} m²` : '10 km'}
          </span>
        </div>
      </section>

      {/* SECTION 4: Tanggal Tanam & Estimasi Panen Banner */}
      <section className="mx-4 mt-3 bg-[#fbf9f3] rounded-[10px] px-5 py-3.5 shadow-[0px_2px_1px_rgba(0,0,0,0.1)] border border-slate-100/60">
        <div className="flex items-center justify-around relative">
          {/* Left col */}
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <span className="font-['Montserrat_Alternates',sans-serif] font-medium text-[10px] text-[#3c3b3b]">
              Tanggal Tanam
            </span>
            <span className="font-['Montserrat_Alternates',sans-serif] font-semibold text-[18px] sm:text-[20px] text-[#28502d] tracking-[1px] mt-1">
              {plot.planting_date || '08/01/2026'}
            </span>
          </div>

          {/* Center line divider */}
          <div className="h-12 flex items-center justify-center px-2">
            <img src="/assets/figma/detail/divider_line.svg" className="h-11 w-px object-contain" alt="|" />
          </div>

          {/* Right col */}
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <span className="font-['Montserrat_Alternates',sans-serif] font-medium text-[10px] text-[#3c3b3b]">
              Estimasi Panen
            </span>
            <span className="font-['Montserrat_Alternates',sans-serif] font-semibold text-[18px] sm:text-[20px] text-[#28502d] tracking-[1px] mt-1">
              {plot.estimated_harvest_date || '08/12/2026'}
            </span>
          </div>
        </div>

        {/* Bottom Harvest Days Countdown */}
        <div className="flex items-center justify-center gap-2 mt-3 pt-2.5 border-t border-slate-200/60">
          <img src="/assets/figma/detail/calendar.svg" className="w-3 h-3 shrink-0" alt="" />
          <p className="font-['Montserrat_Alternates',sans-serif] text-[10px] text-[#28502d]">
            <span>Panen dalam </span>
            <span className="font-bold">{daysToHarvest} hari</span>
          </p>
        </div>
      </section>

      {/* SECTION 5: To-Do Checklist Card (Perlu Dilakukan Hari Ini) */}
      <section className="mx-4 mt-5 bg-[#fbf9f3] rounded-[15px] p-5 shadow-[0px_2px_8px_rgba(0,0,0,0.06)] border border-slate-100/80">
        <div className="flex items-center gap-2.5 mb-5">
          <img src="/assets/figma/detail/notification.svg" className="w-4 h-4 shrink-0" alt="" />
          <h3 className="font-['Montserrat_Alternates',sans-serif] font-bold text-[15px] text-[#28502d]">
            Perlu Dilakukan Hari Ini:
          </h3>
        </div>

        {/* Prioritas Tinggi Section */}
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

        {/* Prioritas Sedang Section */}
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

      {/* SECTION 6: Histori Aktivitas */}
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
            ⚠️ Lapor Masalah
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

      {/* Modals */}
      <LogActivityModal
        plot={plot}
        isOpen={isLogOpen}
        onClose={() => setIsLogOpen(false)}
        onLog={onLogActivity}
      />

      <ReportIssueModal
        plot={plot}
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        onReport={onReportIssue}
      />
    </div>
  );
}
