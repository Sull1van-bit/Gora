import React, { useState } from 'react';
import { RiEdit2Line, RiCloseLine, RiCheckLine, RiWaterFlashLine, RiPlantLine, RiSearchEyeLine, RiScissorsCutLine } from 'react-icons/ri';
import UniversalIcon from '../../utils/iconHelper';

export default function LogActivityModal({ plot, isOpen, onClose, onLog }) {
  const [activityType, setActivityType] = useState('Watering');
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');

  if (!isOpen || !plot) return null;

  const activityTypes = [
    { id: 'Watering', label: 'Penyiraman (Watering)', icon: RiWaterFlashLine },
    { id: 'Fertilizing', label: 'Pemupukan (Fertilizing)', icon: RiPlantLine },
    { id: 'Pest Inspection', label: 'Inspeksi Hama (Pest Check)', icon: RiSearchEyeLine },
    { id: 'Pruning', label: 'Pemangkasan (Pruning)', icon: RiScissorsCutLine },
    { id: 'Harvesting', label: 'Panen (Harvesting)', icon: 'rice', isUniversal: true },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onLog({
      plot_id: plot.id,
      activity_type: activityType,
      title: title || `${activityType} pada ${plot.plot_name}`,
      notes: notes,
    });
    onClose();
    // Reset form
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
            <h2 className="text-lg font-black text-slate-900 font-['Montserrat_Alternates',sans-serif] flex items-center gap-1.5">
              <RiEdit2Line className="w-5 h-5 shrink-0 text-emerald-600" />
              <span>Catat Aktivitas Lahan</span>
            </h2>
            <div className="flex items-center gap-1 text-xs text-slate-500 font-medium mt-1">
              <UniversalIcon icon={plot.komoditas_icon || 'rice'} className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{plot.plot_name}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center font-bold"
          >
            <RiCloseLine className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Jenis Aktivitas *
            </label>
            <div className="grid grid-cols-1 gap-2">
              {activityTypes.map((act) => {
                const Icon = act.icon;
                return (
                  <button
                    key={act.id}
                    type="button"
                    onClick={() => setActivityType(act.id)}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl border text-sm font-semibold transition-all flex items-center justify-between ${
                      activityType === act.id
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-800 shadow-2xs font-bold'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {act.isUniversal ? (
                        <UniversalIcon icon={act.icon} className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : (
                        <Icon className="w-4 h-4 text-emerald-600 shrink-0" />
                      )}
                      <span>{act.label}</span>
                    </div>
                    {activityType === act.id && <RiCheckLine className="w-5 h-5 text-emerald-600 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Judul / Keterangan Singkat
            </label>
            <input
              type="text"
              placeholder={`Contoh: ${activityType} Pagi Hari`}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Catatan Detail / Dosis
            </label>
            <textarea
              rows={3}
              placeholder="Contoh: Pupuk NPK cair 500ml, irigasi lancar selama 30 menit."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none transition-all resize-none"
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
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-sm shadow-md transition-all active:scale-95"
            >
              Simpan Aktivitas
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
