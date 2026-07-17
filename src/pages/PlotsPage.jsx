import React, { useState } from 'react';
import PlotCardFull from '../components/plots/PlotCardFull';
import LogActivityModal from '../components/plots/LogActivityModal';
import ReportIssueModal from '../components/plots/ReportIssueModal';
import { RiPlantFill } from 'react-icons/ri';

export default function PlotsPage({ 
  plots, 
  komoditasList, 
  onAddPlot, 
  onOpenAddPlot,
  onLogActivity, 
  onReportIssue, 
  onSelectPlot 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const [activeLogPlot, setActiveLogPlot] = useState(null);
  const [activeReportPlot, setActiveReportPlot] = useState(null);

  const filteredPlots = plots.filter((plot) => {
    const matchesSearch = 
      plot.plot_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plot.komoditas_nama?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plot.location?.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (filterStatus !== 'all') {
      return plot.status === filterStatus;
    }
    return true;
  }).sort((a, b) => (b.priority_score || 0) - (a.priority_score || 0));

  return (
    <div className="space-y-4 pt-4 pb-24 px-4 sm:px-5 animate-fade-in text-[#3c3b3b]">
      <h1 className="text-center font-['Montserrat_Alternates',sans-serif] font-bold text-[#28502d] text-[20px] sm:text-[22px] tracking-tight">
        Lahan
      </h1>

      <div className="flex items-center justify-between gap-3 mt-4 mb-3">
        <div className="flex-1 bg-[#c6d5a2] h-[40px] rounded-[30px] pl-5 pr-10 flex items-center relative shadow-2xs">
          <input
            type="text"
            placeholder="Cari Lahan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent border-none outline-none font-['Montserrat_Alternates',sans-serif] font-medium text-[12px] text-[#28502d] placeholder-[#28502d]/75"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-9 text-[#28502d] font-bold text-xs hover:opacity-75 flex items-center justify-center w-5 h-5"
            >
              ✕
            </button>
          )}
          <img 
            src="/assets/figma/plots/search_icon.svg" 
            className="w-[13.5px] h-[13.5px] shrink-0 absolute right-4 pointer-events-none" 
            alt="Search" 
          />
        </div>

        <button
          onClick={() => {
            if (onOpenAddPlot) {
              onOpenAddPlot();
            }
          }}
          type="button"
          className="size-[40px] bg-[#c6d5a2] hover:bg-[#b5c590] active:scale-95 rounded-[30px] flex items-center justify-center shrink-0 shadow-2xs transition-all cursor-pointer"
          aria-label="Tambah Lahan"
        >
          <img src="/assets/figma/plots/add_plus.svg" className="w-5 h-5 shrink-0" alt="Add" />
        </button>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => setFilterStatus('all')}
          type="button"
          className={`px-3.5 py-1 rounded-[100px] text-[10px] sm:text-[11px] font-['Montserrat_Alternates',sans-serif] font-semibold shrink-0 transition-all shadow-2xs ${
            filterStatus === 'all'
              ? 'bg-[#28502d] text-white ring-2 ring-[#28502d]/30 scale-105'
              : 'bg-white/80 text-[#28502d] border border-[#c6d5a2] hover:bg-white'
          }`}
        >
          Semua ({plots.length})
        </button>

        <button
          onClick={() => setFilterStatus(filterStatus === 'urgent' ? 'all' : 'urgent')}
          type="button"
          className={`bg-[#ce4949] text-white px-3.5 py-1 rounded-[100px] text-[10px] sm:text-[11px] font-['Montserrat_Alternates',sans-serif] font-semibold shrink-0 transition-all shadow-2xs ${
            filterStatus === 'urgent' ? 'ring-2 ring-[#ce4949]/50 scale-105' : 'opacity-90 hover:opacity-100'
          }`}
        >
          Mendesak
        </button>

        <button
          onClick={() => setFilterStatus(filterStatus === 'attention' ? 'all' : 'attention')}
          type="button"
          className={`bg-[#fcbe3c] text-white px-3.5 py-1 rounded-[100px] text-[10px] sm:text-[11px] font-['Montserrat_Alternates',sans-serif] font-semibold shrink-0 transition-all shadow-2xs ${
            filterStatus === 'attention' ? 'ring-2 ring-[#fcbe3c]/50 scale-105' : 'opacity-90 hover:opacity-100'
          }`}
        >
          Perlu Perhatian
        </button>

        <button
          onClick={() => setFilterStatus(filterStatus === 'ontrack' ? 'all' : 'ontrack')}
          type="button"
          className={`bg-[#578a3e] text-white px-3.5 py-1 rounded-[100px] text-[10px] sm:text-[11px] font-['Montserrat_Alternates',sans-serif] font-semibold shrink-0 transition-all shadow-2xs ${
            filterStatus === 'ontrack' ? 'ring-2 ring-[#578a3e]/50 scale-105' : 'opacity-90 hover:opacity-100'
          }`}
        >
          Sehat
        </button>
      </div>

      {filteredPlots.length > 0 ? (
        <div className="space-y-5 pt-1">
          {filteredPlots.map((plot) => (
            <PlotCardFull
              key={plot.id}
              plot={plot}
              onSelect={onSelectPlot || ((id) => { window.location.hash = `#plot/${id}`; })}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white/80 rounded-3xl p-8 text-center border border-[#e8e4d9] shadow-sm my-6 flex flex-col items-center">
          <RiPlantFill className="text-5xl text-emerald-500/50 mb-3" />
          <h3 className="font-['Montserrat_Alternates',sans-serif] font-bold text-[#28502d] text-base mb-1">
            Lahan Tidak Ditemukan
          </h3>
          <p className="text-xs text-slate-500 max-w-xs mx-auto mb-4">
            Tidak ada lahan yang cocok dengan pencarian atau filter saat ini.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setFilterStatus('all');
            }}
            className="bg-[#578a3e] text-white text-xs font-bold px-4 py-2 rounded-full shadow-sm hover:bg-[#477332] transition-all"
          >
            Reset Filter
          </button>
        </div>
      )}

      {activeLogPlot && (
        <LogActivityModal
          isOpen={!!activeLogPlot}
          plot={activeLogPlot}
          onClose={() => setActiveLogPlot(null)}
          onSave={(activityData) => {
            onLogActivity?.(activityData);
            setActiveLogPlot(null);
          }}
        />
      )}

      {activeReportPlot && (
        <ReportIssueModal
          isOpen={!!activeReportPlot}
          plot={activeReportPlot}
          onClose={() => setActiveReportPlot(null)}
          onSave={(issueData) => {
            onReportIssue?.(issueData);
            setActiveReportPlot(null);
          }}
        />
      )}
    </div>
  );
}
