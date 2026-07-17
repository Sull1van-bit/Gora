import React, { useState } from 'react';
import { RiAddLine, RiSearchLine, RiPlantLine, RiCloseLine } from 'react-icons/ri';
import PlotCardFull from '../components/plots/PlotCardFull';
import AddPlotModal from '../components/plots/AddPlotModal';
import LogActivityModal from '../components/plots/LogActivityModal';
import ReportIssueModal from '../components/plots/ReportIssueModal';

export default function PlotsPage({ 
  plots = [], 
  komoditasList = [], 
  onAddPlot, 
  onLogActivity, 
  onReportIssue, 
  onSelectPlot 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // 'all' | 'urgent' | 'attention' | 'ontrack'

  // Modals state
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [activeLogPlot, setActiveLogPlot] = useState(null);
  const [activeReportPlot, setActiveReportPlot] = useState(null);

  // Filter plots
  const filteredPlots = plots.filter(plot => {
    const matchesSearch = 
      plot.plot_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plot.komoditas_nama?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plot.location?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || plot.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-4 animate-fade-in pb-20">
      {/* Top Header Title: Lahan */}
      <h1 className="text-center font-['Montserrat_Alternates',sans-serif] font-bold text-[#28502d] text-[20px] sm:text-[22px] tracking-tight">
        Lahan
      </h1>

      {/* Search Input and Add Button Row */}
      <div className="flex items-center justify-between gap-3 mt-4 mb-3">
        {/* Search Input */}
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
              <RiCloseLine className="w-4 h-4" />
            </button>
          )}
          <RiSearchLine className="w-[14px] h-[14px] shrink-0 absolute right-4 text-[#28502d] pointer-events-none" />
        </div>

        {/* Circular + Button */}
        <button
          onClick={() => {
            setIsAddOpen(true);
          }}
          type="button"
          className="size-[40px] bg-[#c6d5a2] hover:bg-[#b5c590] active:scale-95 rounded-[30px] flex items-center justify-center shrink-0 shadow-2xs transition-all cursor-pointer"
          aria-label="Tambah Lahan"
        >
          <RiAddLine className="w-5 h-5 text-[#28502d] shrink-0" />
        </button>
      </div>

      {/* Status Filter Chips Row */}
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
          Kritis
        </button>

        <button
          onClick={() => setFilterStatus(filterStatus === 'attention' ? 'all' : 'attention')}
          type="button"
          className={`bg-[#fcbe3c] text-white px-3.5 py-1 rounded-[100px] text-[10px] sm:text-[11px] font-['Montserrat_Alternates',sans-serif] font-semibold shrink-0 transition-all shadow-2xs ${
            filterStatus === 'attention' ? 'ring-2 ring-[#fcbe3c]/50 scale-105' : 'opacity-90 hover:opacity-100'
          }`}
        >
          Perhatian
        </button>

        <button
          onClick={() => setFilterStatus(filterStatus === 'ontrack' ? 'all' : 'ontrack')}
          type="button"
          className={`bg-[#578a3e] text-white px-3.5 py-1 rounded-[100px] text-[10px] sm:text-[11px] font-['Montserrat_Alternates',sans-serif] font-semibold shrink-0 transition-all shadow-2xs ${
            filterStatus === 'ontrack' ? 'ring-2 ring-[#578a3e]/50 scale-105' : 'opacity-90 hover:opacity-100'
          }`}
        >
          Normal
        </button>
      </div>

      {/* Plots Vertical List */}
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
        <div className="bg-white/80 rounded-3xl p-8 text-center border border-[#e8e4d9] shadow-sm my-6">
          <RiPlantLine className="w-12 h-12 text-emerald-600 block mx-auto mb-3" />
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

      {/* Modals */}
      <AddPlotModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSave={(newPlot) => {
          onAddPlot?.(newPlot);
          setIsAddOpen(false);
        }}
        komoditasList={komoditasList}
      />

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
