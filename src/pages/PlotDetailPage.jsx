import React, { useState } from 'react';
import LogActivityModal from '../components/plots/LogActivityModal';
import ReportIssueModal from '../components/plots/ReportIssueModal';
import PlotDetailHeader from '../components/plot-detail/PlotDetailHeader';
import PlotDetailProgress from '../components/plot-detail/PlotDetailProgress';
import PlotDetailInfo from '../components/plot-detail/PlotDetailInfo';
import PlotDetailHarvest from '../components/plot-detail/PlotDetailHarvest';
import PlotDetailTasks from '../components/plot-detail/PlotDetailTasks';
import PlotDetailHistory from '../components/plot-detail/PlotDetailHistory';
import { RiAlertFill } from 'react-icons/ri';

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
      <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 shadow-xs mt-6 mx-4 flex flex-col items-center">
        <RiAlertFill className="text-4xl text-rose-500 mb-2" />
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
      <PlotDetailHeader plot={plot} onBack={onBack} />
      
      <PlotDetailProgress 
        plot={plot} 
        progressPct={progressPct} 
        setIsLogOpen={setIsLogOpen} 
      />

      <PlotDetailInfo plot={plot} />

      <PlotDetailHarvest 
        plot={plot} 
        daysToHarvest={daysToHarvest} 
      />

      <PlotDetailTasks 
        highPriorityActions={highPriorityActions} 
        medPriorityActions={medPriorityActions} 
        onCompleteAction={onCompleteAction} 
      />

      <PlotDetailHistory 
        plotActivities={plotActivities} 
        setIsReportOpen={setIsReportOpen} 
      />

      
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
