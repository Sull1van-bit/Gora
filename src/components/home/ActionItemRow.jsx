import React from 'react';

export default function ActionItemRow({ action, onComplete, onSelectPlot }) {
  const getBadgeConfig = (status) => {
    switch (status) {
      case 'overdue':
        return {
          label: '🔴 Overdue',
          badgeClass: 'bg-rose-100 text-rose-700 border-rose-300',
          accent: 'border-l-4 border-l-rose-500',
        };
      case 'today': 
        return {
          label: '🟡 Due Today',
          badgeClass: 'bg-amber-100 text-amber-800 border-amber-300',
          accent: 'border-l-4 border-l-amber-500',
        };
      case 'soon':
      default:
        return {
          label: '🟢 Due Soon',
          badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
          accent: 'border-l-4 border-l-emerald-500',
        };
    }
  };

  const config = getBadgeConfig(action.status);

  return (
    <div className={`bg-white rounded-xl p-3.5 border border-slate-200/80 shadow-xs transition-all flex items-start gap-3 hover:shadow-md ${config.accent}`}>
      {/* Interactive Checkbox Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onComplete(action.id);
        }}
        className="mt-0.5 w-6 h-6 rounded-full border-2 border-slate-300 hover:border-emerald-500 hover:bg-emerald-50 flex items-center justify-center transition-all group active:scale-90 shrink-0"
        title="Tandai Selesai"
        aria-label="Tandai aksi selesai"
      >
        <svg className="w-3.5 h-3.5 text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      </button>

      {/* Main content area */}
      <div
        onClick={() => onSelectPlot && onSelectPlot(action.plot_id)}
        className="flex-1 min-w-0 cursor-pointer"
      >
        <div className="flex items-center justify-between gap-2 mb-1">
          <span className="text-xs font-bold text-slate-800 tracking-tight leading-tight">
            {action.title}
          </span>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${config.badgeClass}`}>
            {config.label}
          </span>
        </div>

        <p className="text-xs text-slate-500 leading-relaxed mb-2 line-clamp-2">
          {action.description}
        </p>

        <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium">
          <span className="inline-flex items-center gap-1 bg-slate-50 px-2 py-0.5 rounded-md text-slate-600 font-semibold border border-slate-200/60">
            <span>{action.komoditas_icon || '🌱'}</span>
            <span className="truncate max-w-[150px]">{action.plot_name}</span>
          </span>
          <span className="text-slate-400">{action.due_text}</span>
        </div>
      </div>
    </div>
  );
}
