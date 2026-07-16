import React, { useState } from 'react';

export default function ReportIssueModal({ plot, isOpen, onClose, onReport }) {
  const [title, setTitle] = useState('');
  const [severity, setSeverity] = useState('Medium');
  const [notes, setNotes] = useState('');

  if (!isOpen || !plot) return null;

  const severityLevels = [
    { id: 'Low', label: '🟢 Rendah (Monitor rutin, tidak mendesak)', color: 'border-emerald-300 bg-emerald-50 text-emerald-800' },
    { id: 'Medium', label: '🟡 Sedang (Perlu penanganan dalam 2-3 hari)', color: 'border-amber-300 bg-amber-50 text-amber-800' },
    { id: 'High', label: '🔴 Urgent / Tinggi (Segera tindak lanjuti hari ini!)', color: 'border-rose-400 bg-rose-50 text-rose-800 font-bold' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;
    onReport({
      plot_id: plot.id,
      title,
      severity,
      notes,
    });
    onClose();
    setTitle('');
    setNotes('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
      <div 
        className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto"
        style={{ paddingBottom: 'calc(1.5rem + var(--sab, 0px))' }}
      >
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
          <div>
            <h2 className="text-lg font-black text-rose-700 font-['Montserrat_Alternates',sans-serif] flex items-center gap-1.5">
              <span>⚠️</span> Lapor Masalah Lahan
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              {plot.komoditas_icon} {plot.plot_name}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center font-bold"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Jenis Masalah / Hama / Penyakit *
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Serangan Kutu Putih / Daun Menguning"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-medium focus:ring-2 focus:ring-rose-500 focus:bg-white outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Tingkat Keparahan (Severity) *
            </label>
            <div className="space-y-2">
              {severityLevels.map((lvl) => (
                <button
                  key={lvl.id}
                  type="button"
                  onClick={() => setSeverity(lvl.id)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl border text-xs font-semibold transition-all ${
                    severity === lvl.id ? `${lvl.color} ring-2 ring-rose-500/50 shadow-sm` : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {lvl.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Gejala Tambahan / Lokasi Bagian Tanaman
            </label>
            <textarea
              rows={3}
              placeholder="Contoh: Ditemukan bercak coklat di bagian bawah daun pucuk selatan."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-medium focus:ring-2 focus:ring-rose-500 focus:bg-white outline-none transition-all resize-none"
            />
          </div>

          <div className="pt-4 flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-slate-100 hover:bg-slate-200 font-bold text-slate-700 py-3 rounded-xl text-sm transition-all"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 rounded-xl text-sm shadow-md transition-all active:scale-95"
            >
              Kirim Laporan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
