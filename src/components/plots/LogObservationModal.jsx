import React, { useState, useEffect, useRef } from 'react';
import { 
  RiCheckLine, RiCloseLine, RiAddLine, RiCameraLine, RiDropLine, 
  RiWaterFlashLine, RiPlantLine, RiScissorsCutLine, RiBugLine 
} from 'react-icons/ri';

export default function LogObservationModal({
  isOpen,
  onClose,
  plots = [],
  onSaveObservation,
  streakCount = 7,
  initialPlotId = null,
  initialStep = 1
}) {
  const [step, setStep] = useState(1);
  const [selectedPlotId, setSelectedPlotId] = useState(null);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [condition, setCondition] = useState(null); // No default option when opening page 2
  const [notes, setNotes] = useState('');
  const [photoUrl, setPhotoUrl] = useState(null);
  const [streakDisplay, setStreakDisplay] = useState(null);

  const prevOpenRef = useRef(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    // Only reset state when modal transitions from closed to open
    // This prevents useEffect from resetting step back to 1 when onSaveObservation updates plots!
    if (isOpen && !prevOpenRef.current) {
      setStep(initialStep || 1);
      if (initialPlotId) {
        setSelectedPlotId(initialPlotId);
      } else {
        setSelectedPlotId(plots.length > 0 ? plots[0].id : null);
      }
      setSelectedActivities([]);
      setCondition(null);
      setNotes('');
      setPhotoUrl(null);
      setStreakDisplay(null);
    }
    prevOpenRef.current = isOpen;
  }, [isOpen, plots, initialPlotId, initialStep]);

  if (!isOpen) return null;

  const selectedPlot = plots.find(p => p.id === selectedPlotId) || plots[0] || {
    id: 'dummy',
    plot_name: 'Lahan Utara',
    komoditas_nama: 'Padi',
    current_growth_stage: 'Vegetatif • Week 5',
    progress: 67,
    image_url: '/assets/figma/image9.png',
    status: 'attention'
  };

  const activityOptions = [
    { id: 'Menyiram', label: 'Menyiram', icon: <RiDropLine className="w-4 h-4 text-blue-600" /> },
    { id: 'Memeriksa Saluran Air', label: 'Memeriksa Saluran Air', icon: <RiWaterFlashLine className="w-4 h-4 text-cyan-600" /> },
    { id: 'Memberi Pupuk', label: 'Memberi Pupuk', icon: <RiPlantLine className="w-4 h-4 text-emerald-600" /> },
    { id: 'Membersihkan Gulma', label: 'Membersihkan Gulma', icon: <RiPlantLine className="w-4 h-4 text-amber-600" /> },
    { id: 'Pemangkasan', label: 'Pemangkasan', icon: <RiScissorsCutLine className="w-4 h-4 text-slate-600" /> },
    { id: 'Penyemprotan Hama', label: 'Penyemprotan Hama', icon: <RiBugLine className="w-4 h-4 text-rose-600" /> },
    { id: 'Lainnya', label: 'Lainnya', icon: <RiAddLine className="w-4 h-4 text-slate-500" /> }
  ];

  const toggleActivity = (id) => {
    if (selectedActivities.includes(id)) {
      setSelectedActivities(selectedActivities.filter(a => a !== id));
    } else {
      setSelectedActivities([...selectedActivities, id]);
    }
  };

  const handleCameraClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPhotoUrl(url);
    }
  };

  const handleSimpanLog = async () => {
    const conditionLabelMap = {
      ontrack: 'Normal, Baik',
      attention: 'Perlu Perhatian',
      urgent: 'Bermasalah'
    };

    const finalCondition = condition || 'ontrack';

    const logData = {
      plot_id: selectedPlot.id,
      plot_name: selectedPlot.plot_name,
      komoditas_nama: selectedPlot.komoditas_nama,
      activity_type: selectedActivities.length > 0 ? selectedActivities.join(', ') : 'Observasi Lahan',
      notes: notes || `Kondisi: ${conditionLabelMap[finalCondition]}.`,
      status: finalCondition,
      status_text: `Kondisi dicatat: ${conditionLabelMap[finalCondition]}`,
      photo_url: photoUrl,
      timestamp: new Date().toISOString()
    };

    let result = null;
    if (onSaveObservation) {
      result = await onSaveObservation(logData);
    }
    if (result && typeof result === 'object' && 'isFirstToday' in result) {
      setStreakDisplay(result);
    } else {
      setStreakDisplay({
        isFirstToday: true,
        previousCount: streakCount,
        newCount: streakCount + 1
      });
    }
    // Transition to Step 4 (celebration streak modal) and stay there until user clicks Lanjutkan
    setStep(4);
  };

  const renderPlotCard = (plot, isSelected, onClick, hideSelectCircle = false) => {
    let progressPct = plot.growth_progress || plot.progress || 15;
    let daysToHarvest = plot.days_to_harvest || 28;

    if (plot.planting_date && plot.estimated_harvest_date) {
      const start = new Date(plot.planting_date).getTime();
      const end = new Date(plot.estimated_harvest_date).getTime();
      const now = new Date().getTime();

      if (now >= end) {
        progressPct = 100;
        daysToHarvest = 0;
      } else if (now <= start) {
        progressPct = 0;
        daysToHarvest = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      } else {
        const totalDays = end - start;
        const elapsedDays = now - start;
        progressPct = Math.round((elapsedDays / totalDays) * 100);
        daysToHarvest = Math.ceil((end - now) / (1000 * 60 * 60 * 24));
      }
    }

    return (
      <div
        key={plot.id}
        onClick={onClick}
        className={`rounded-[24px] bg-[#fbf9f3] border-2 transition-all p-3.5 shadow-xs flex flex-col justify-between relative select-none ${
          onClick ? 'cursor-pointer active:scale-[0.99]' : ''
        } ${
          isSelected && !hideSelectCircle
            ? 'border-[#28502d] ring-4 ring-[#28502d]/10 bg-emerald-50/20' 
            : hideSelectCircle 
              ? 'border-[#28502d] bg-[#f0f7ec]/80'
              : 'border-slate-200/80 hover:border-slate-300'
        }`}
      >
        <div className="flex items-start gap-3">
          <div className="size-[64px] rounded-2xl overflow-hidden bg-slate-100 shrink-0 relative">
            <img 
              src={plot.image_url || '/assets/figma/image9.png'} 
              className="w-full h-full object-cover" 
              alt={plot.plot_name}
            />
            <div className="absolute -bottom-1 -right-1 size-6 rounded-full bg-white shadow-sm flex items-center justify-center text-xs border border-slate-100">
              {plot.komoditas_icon || '🌱'}
            </div>
          </div>

          <div className="flex-1 min-w-0 pr-8">
            <h4 className="font-['Montserrat_Alternates',sans-serif] font-bold text-[14px] sm:text-[15px] text-[#3c3b3b] truncate">
              {plot.plot_name} <span className="font-normal text-slate-500 text-xs">• {plot.komoditas_nama}</span>
            </h4>
            <p className="text-[11px] text-slate-500 font-medium flex items-center gap-1 mt-0.5">
              <span>Panen {daysToHarvest} hari lagi</span>
            </p>

            <div className="mt-2.5">
              <div className="flex items-center justify-between text-[10px] font-semibold text-[#3c3b3b] mb-1">
                <span className="font-['Montserrat_Alternates',sans-serif]">Progress</span>
                <span className="font-bold text-[#28502d] text-xs">{progressPct}%</span>
              </div>
              <div className="w-full bg-[#d9d9d9] h-[5px] rounded-full overflow-hidden">
                <div 
                  className="bg-[#e8b54a] h-full rounded-full" 
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>
          </div>

          {!hideSelectCircle && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              {isSelected ? (
                <div className="size-6 rounded-full bg-[#578a3e] text-white flex items-center justify-center shadow-sm">
                  <RiCheckLine className="w-4 h-4 font-bold" />
                </div>
              ) : (
                <div className="size-6 rounded-full border-2 border-slate-300 bg-white" />
              )}
            </div>
          )}
        </div>

        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[10px] font-medium text-slate-400">
            {plot.current_growth_stage || 'Vegetatif • Week 5'}
          </span>
          <span className={`px-2.5 py-0.5 rounded-full text-[9.5px] font-['Montserrat_Alternates',sans-serif] font-semibold ${
            plot.status === 'urgent' ? 'bg-[#ce4949] text-white' :
            plot.status === 'attention' ? 'bg-[#e8b54a] text-white' :
            'bg-[#28502d] text-white'
          }`}>
            {plot.status === 'urgent' ? 'Mendesak' : plot.status === 'attention' ? 'Perlu Perhatian' : 'Sehat'}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs animate-fade-in p-0 sm:p-4 selection:bg-emerald-500 selection:text-white">
      <div 
        className={`w-full max-w-md bg-[#fbf9f3] rounded-t-[32px] sm:rounded-[32px] shadow-2xl border border-slate-100/80 flex flex-col transition-all duration-300 max-h-[92vh] sm:max-h-[88vh] relative px-5 sm:px-6 ${
          step === 4 ? 'pt-14 pb-6 overflow-visible' : 'pt-5 pb-5 overflow-hidden'
        }`}
      >
        {/* Hidden File Input for Device Camera / Photo Upload */}
        <input
          type="file"
          accept="image/*"
          capture="environment"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Step Indicator Bars & Close Button (Only for Steps 1, 2, 3) */}
        {step <= 3 && (
          <div className="flex items-center justify-between pb-3 border-b border-slate-200/50 mb-3 shrink-0">
            <div className="flex items-center gap-1.5 mx-auto">
              <div className={`h-2 rounded-full transition-all duration-300 ${step >= 1 ? 'w-8 bg-[#28502d]' : 'w-6 bg-[#c6d5a2]/60'}`} />
              <div className={`h-2 rounded-full transition-all duration-300 ${step >= 2 ? 'w-8 bg-[#28502d]' : 'w-6 bg-[#c6d5a2]/60'}`} />
              <div className={`h-2 rounded-full transition-all duration-300 ${step >= 3 ? 'w-8 bg-[#28502d]' : 'w-6 bg-[#c6d5a2]/60'}`} />
            </div>
            <button
              onClick={onClose}
              className="absolute right-4 sm:right-5 top-4 size-8 rounded-full bg-[#e2e8d8] sm:bg-slate-200/70 hover:bg-slate-300/80 flex items-center justify-center text-slate-700 transition-colors shrink-0 cursor-pointer"
              aria-label="Tutup"
            >
              <RiCloseLine className="w-5 h-5 font-bold" />
            </button>
          </div>
        )}

        {/* Modal Header for Steps 1, 2, 3 */}
        {step <= 3 && (
          <div className="text-center mb-4 shrink-0">
            <h2 className="text-[20px] sm:text-[22px] font-['Montserrat_Alternates',sans-serif] font-bold text-[#3c3b3b] leading-tight">
              {step === 3 ? 'Ringkasan Log' : 'Log Harian'}
            </h2>
            <p className="text-[11.5px] sm:text-[12.5px] text-[#6f6e72] font-medium mt-0.5">
              {step === 1 && 'Pilih lahan atau tanaman untuk dicatat.'}
              {step === 2 && 'Catat aktivitas dan kondisi tanamanmu.'}
              {step === 3 && 'Periksa kembali sebelum menyimpan.'}
            </p>
          </div>
        )}

        {/* STEP 1: Pilih Lahan */}
        {step === 1 && (
          <div className="flex-1 overflow-y-auto space-y-3.5 px-1 pb-1 scrollbar-none">
            {plots.map(plot => renderPlotCard(plot, selectedPlotId === plot.id, () => setSelectedPlotId(plot.id), false))}
          </div>
        )}

        {/* STEP 2: Catat Aktivitas & Kondisi */}
        {step === 2 && (
          <div className="flex-1 overflow-y-auto space-y-4 px-1 pb-1 scrollbar-none">
            {/* Lahan yang dipilih */}
            <div>
              <label className="block text-[12.5px] font-['Montserrat_Alternates',sans-serif] font-bold text-[#3c3b3b] mb-1.5">
                Lahan yang dipilih
              </label>
              <div className="bg-[#f2f7ec] border border-[#c6d5a2]/60 rounded-2xl p-2.5 flex items-center justify-between gap-3 shadow-2xs">
                <div className="flex items-center gap-2.5 min-w-0">
                  <img 
                    src={selectedPlot.image_url || '/assets/figma/image9.png'} 
                    className="size-11 rounded-xl object-cover shrink-0" 
                    alt={selectedPlot.plot_name}
                  />
                  <div className="min-w-0">
                    <h5 className="font-['Montserrat_Alternates',sans-serif] font-bold text-xs sm:text-sm text-[#3c3b3b] truncate">
                      {selectedPlot.plot_name} • {selectedPlot.komoditas_nama}
                    </h5>
                    <p className="text-[10.5px] text-slate-500 truncate mt-0.5">
                      {selectedPlot.current_growth_stage || 'Vegetatif • Week 5'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setStep(1)}
                  type="button"
                  className="px-3.5 py-1 rounded-full border border-[#578a3e] text-[#578a3e] hover:bg-[#578a3e] hover:text-white font-['Montserrat_Alternates',sans-serif] font-bold text-[11px] transition-all shrink-0 bg-white shadow-2xs cursor-pointer"
                >
                  Ubah
                </button>
              </div>
            </div>

            {/* Aktivitas Hari Ini */}
            <div>
              <div className="mb-1.5">
                <label className="block text-[12.5px] font-['Montserrat_Alternates',sans-serif] font-bold text-[#3c3b3b]">
                  Aktivitas Hari Ini
                </label>
                <span className="text-[10.5px] text-slate-500">Pilih semua yang dilakukan</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {activityOptions.map((act, idx) => {
                  const isChecked = selectedActivities.includes(act.id);
                  const isLastOdd = idx === activityOptions.length - 1 && activityOptions.length % 2 === 1;
                  return (
                    <div
                      key={act.id}
                      onClick={() => toggleActivity(act.id)}
                      className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-2 select-none ${
                        isLastOdd ? 'col-span-2' : ''
                      } ${
                        isChecked 
                          ? 'border-[#578a3e] bg-[#f0f7ec] shadow-2xs font-bold' 
                          : 'border-slate-200/80 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="size-6 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                          {act.icon}
                        </div>
                        <span className="text-[11px] sm:text-[11.5px] font-['Montserrat_Alternates',sans-serif] font-semibold text-[#3c3b3b] truncate">
                          {act.label}
                        </span>
                      </div>
                      <div className={`size-4 sm:size-4.5 rounded-[4px] border flex items-center justify-center shrink-0 transition-all ${
                        isChecked ? 'bg-[#578a3e] border-[#578a3e] text-white' : 'border-slate-300 bg-[#fbf9f3]'
                      }`}>
                        {isChecked && <RiCheckLine className="w-3.5 h-3.5 font-bold" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Kondisi Tanaman */}
            <div>
              <div className="mb-1.5">
                <label className="block text-[12.5px] font-['Montserrat_Alternates',sans-serif] font-bold text-[#3c3b3b]">
                  Kondisi Tanaman <span className="text-rose-500">*</span>
                </label>
                <span className="text-[10.5px] text-slate-500">Bagaimana kondisi tanaman hari ini?</span>
              </div>
              <div className="grid grid-cols-3 gap-2 p-0.5">
                {[
                  { id: 'ontrack', label: 'Normal,\nBaik', emoji: '😊', border: 'border-[#578a3e]', activeBg: 'bg-[#f0f7ec]' },
                  { id: 'attention', label: 'Perlu\nPerhatian', emoji: '😐', border: 'border-[#fcbe3c]', activeBg: 'bg-[#fef9e8]' },
                  { id: 'urgent', label: 'Bermasalah', emoji: '😟', border: 'border-[#ce4949]', activeBg: 'bg-[#fdeede]' }
                ].map(opt => {
                  const isActive = condition === opt.id;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => setCondition(opt.id)}
                      className={`p-2.5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col items-center justify-center text-center select-none active:scale-[0.98] ${
                        isActive 
                          ? `${opt.border} ${opt.activeBg} shadow-sm font-extrabold` 
                          : 'border-slate-200/80 bg-white hover:border-slate-300 opacity-85 hover:opacity-100'
                      }`}
                    >
                      <span className="text-2xl sm:text-3xl mb-1 select-none">{opt.emoji}</span>
                      <span className="text-[10.5px] sm:text-[11px] font-['Montserrat_Alternates',sans-serif] font-bold text-[#3c3b3b] whitespace-pre-line leading-tight">
                        {opt.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Catatan (Opsional) */}
            <div>
              <label className="block text-[12.5px] font-['Montserrat_Alternates',sans-serif] font-bold text-[#3c3b3b] mb-1">
                Catatan (Opsional)
              </label>
              <textarea
                rows={2}
                placeholder="Tuliskan catatan tentang kondisi tanaman hari ini.."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full rounded-2xl border border-slate-200/80 bg-white p-3 text-xs sm:text-sm text-[#3c3b3b] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#28502d]/40 focus:border-[#28502d] transition-all resize-none"
              />
            </div>

            {/* Foto (Opsional) - Opens Device Camera / File Input */}
            <div>
              <label className="block text-[12.5px] font-['Montserrat_Alternates',sans-serif] font-bold text-[#3c3b3b] mb-1">
                Foto (Opsional)
              </label>
              {photoUrl ? (
                <div className="relative size-20 rounded-2xl overflow-hidden border border-slate-200 shadow-sm group">
                  <img src={photoUrl} className="w-full h-full object-cover" alt="Foto Observasi" />
                  <button
                    onClick={() => setPhotoUrl(null)}
                    type="button"
                    className="absolute top-1 right-1 size-5 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-rose-600 transition-colors cursor-pointer"
                  >
                    <RiCloseLine className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleCameraClick}
                  className="px-4 py-2.5 rounded-xl border border-[#578a3e] bg-[#f2f7ec] text-[#578a3e] hover:bg-[#e4eed9] active:scale-95 transition-all flex items-center gap-2 font-['Montserrat_Alternates',sans-serif] font-bold text-xs shadow-2xs cursor-pointer"
                >
                  <RiCameraLine className="w-4 h-4" />
                  <span>Tambah Foto</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* STEP 3: Ringkasan Log - Reuses exact plot card from Page 1 */}
        {step === 3 && (
          <div className="flex-1 overflow-y-auto space-y-4 px-1 pb-1 scrollbar-none">
            {/* Reused Plot Card exactly as in page 1 */}
            <div>
              <label className="block text-xs font-['Montserrat_Alternates',sans-serif] font-bold text-slate-500 mb-1.5">
                Lahan Terpilih
              </label>
              {renderPlotCard(selectedPlot, true, null, true)}
            </div>

            {/* Aktivitas Ringkasan */}
            <div className="border-b border-slate-200/60 pb-3">
              <label className="block text-xs font-['Montserrat_Alternates',sans-serif] font-bold text-slate-500 mb-1.5">
                Aktivitas
              </label>
              <div className="flex flex-wrap gap-2">
                {selectedActivities.length > 0 ? (
                  selectedActivities.map(actId => {
                    const opt = activityOptions.find(o => o.id === actId) || { label: actId, icon: <RiDropLine /> };
                    return (
                      <div key={actId} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 shadow-2xs text-xs font-bold text-[#3c3b3b]">
                        {opt.icon}
                        <span>{opt.label}</span>
                      </div>
                    );
                  })
                ) : (
                  <span className="text-xs text-slate-400 italic">Tidak ada aktivitas dipilih</span>
                )}
              </div>
            </div>

            {/* Kondisi Tanaman Ringkasan */}
            <div className="border-b border-slate-200/60 pb-3 flex items-center justify-between">
              <label className="text-xs font-['Montserrat_Alternates',sans-serif] font-bold text-slate-500">
                Kondisi Tanaman
              </label>
              <div className="flex items-center gap-1.5 font-bold text-xs text-[#3c3b3b]">
                <span className="text-lg">
                  {condition === 'ontrack' ? '😊' : condition === 'attention' ? '😐' : condition === 'urgent' ? '😟' : '❓'}
                </span>
                <span>
                  {condition === 'ontrack' ? 'Normal, Baik' : condition === 'attention' ? 'Perlu Perhatian' : condition === 'urgent' ? 'Bermasalah' : 'Belum dipilih'}
                </span>
              </div>
            </div>

            {/* Catatan Ringkasan */}
            <div className="border-b border-slate-200/60 pb-3">
              <label className="block text-xs font-['Montserrat_Alternates',sans-serif] font-bold text-slate-500 mb-1">
                Catatan
              </label>
              <p className="text-xs text-[#3c3b3b] leading-relaxed bg-white/80 p-3 rounded-xl border border-slate-100">
                {notes || (condition === 'ontrack' 
                  ? 'Daun terlihat hijau segar dan tidak ada hama yang terlihat hari ini.' 
                  : condition === 'attention' 
                    ? 'Kondisi tanaman dicatat: Perlu Perhatian.' 
                    : condition === 'urgent'
                      ? 'Kondisi tanaman dicatat: Bermasalah.'
                      : 'Observasi rutin harian.')}
              </p>
            </div>

            {/* Foto Ringkasan */}
            {photoUrl && (
              <div>
                <label className="block text-xs font-['Montserrat_Alternates',sans-serif] font-bold text-slate-500 mb-1.5">
                  Foto
                </label>
                <div className="size-20 rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                  <img src={photoUrl} className="w-full h-full object-cover" alt="Foto Observasi" />
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 4: Celebration / Success */}
        {step === 4 && (
          <div className="text-center py-2 animate-fade-in relative">
            {/* Floating Checkmark Circle Badge */}
            <div className="absolute -top-21 left-1/2 -translate-x-1/2 size-16 rounded-full bg-[#578a3e] border-4 border-white shadow-xl flex items-center justify-center text-white z-20">
              <RiCheckLine className="w-8 h-8 font-extrabold" />
            </div>

            {/* Mascot Illustration */}
            <div className="w-[170px] h-[170px] mx-auto mt-2 relative">
              <img 
                src="/assets/figma/streak.svg" 
                className="w-full h-full object-contain mx-auto select-none" 
                alt="Farmer Celebration"
                onError={(e) => { e.target.src = '/assets/figma/image10.png'; }}
              />
            </div>

            <h3 className="text-[22px] sm:text-[24px] font-['Montserrat_Alternates',sans-serif] font-bold text-[#28502d] mt-2">
              Log Tersimpan!
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-medium px-4 mt-1 leading-snug">
              Terima kasih, catatan anda sangat berarti untuk pertumbuhan tanaman
            </p>

            {/* Streak Banner */}
            {(() => {
              const isFirst = streakDisplay?.isFirstToday ?? true;
              const displayedCount = streakDisplay?.newCount ?? (streakCount + 1);
              return (
                <div className="mt-4 bg-[#fef9e8] border-2 border-[#fcbe3c] rounded-2xl p-4 shadow-sm flex items-center justify-center gap-3 relative overflow-visible mx-2">
                  <span className="text-3xl select-none animate-bounce">🔥</span>
                  <div className="text-left">
                    <p className="font-['Montserrat_Alternates',sans-serif] font-extrabold text-xs text-[#d89710] uppercase tracking-wider">
                      {isFirst ? 'Streak Bertambah!' : 'Streak Terjaga!'}
                    </p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="font-['Manrope',sans-serif] font-black text-xl text-[#3c3b3b]">
                        {displayedCount} Hari
                      </span>
                      {isFirst && (
                        <span className="bg-[#578a3e] text-white font-bold text-[10px] px-1.5 py-0.5 rounded-full shadow-2xs">
                          +1
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-slate-500 font-semibold">
                      {isFirst ? 'berturut-turut' : 'Hari ini sudah dicatat • Pertahankan!'}
                    </p>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* Modal Footer Buttons */}
        <div className="pt-3 border-t border-slate-200/50 mt-3 shrink-0">
          {step === 1 && (
            <button
              type="button"
              onClick={() => setStep(2)}
              disabled={!selectedPlotId}
              className={`w-full py-3.5 rounded-2xl sm:rounded-3xl font-['Montserrat_Alternates',sans-serif] font-bold text-sm text-white shadow-md transition-all ${
                selectedPlotId 
                  ? 'bg-[#28502d] hover:bg-[#1f3f23] active:scale-[0.99] cursor-pointer' 
                  : 'bg-[#28502d]/50 cursor-not-allowed'
              }`}
            >
              Lanjutkan
            </button>
          )}

          {step === 2 && (
            <button
              type="button"
              onClick={() => setStep(3)}
              disabled={!condition}
              className={`w-full py-3.5 rounded-2xl sm:rounded-3xl font-['Montserrat_Alternates',sans-serif] font-bold text-sm text-white shadow-md transition-all ${
                condition
                  ? 'bg-[#28502d] hover:bg-[#1f3f23] active:scale-[0.99] cursor-pointer'
                  : 'bg-[#28502d]/50 cursor-not-allowed'
              }`}
            >
              Lanjutkan
            </button>
          )}

          {step === 3 && (
            <div className="space-y-2.5">
              <button
                type="button"
                onClick={handleSimpanLog}
                className="w-full py-3.5 rounded-2xl sm:rounded-3xl font-['Montserrat_Alternates',sans-serif] font-bold text-sm text-white bg-[#28502d] hover:bg-[#1f3f23] active:scale-[0.99] shadow-md transition-all cursor-pointer"
              >
                Simpan Log
              </button>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full py-3 sm:py-3.5 rounded-2xl sm:rounded-3xl font-['Montserrat_Alternates',sans-serif] font-bold text-sm text-[#3c3b3b] bg-transparent border border-slate-300 hover:bg-slate-200/50 active:scale-[0.99] transition-all cursor-pointer"
              >
                Kembali
              </button>
            </div>
          )}

          {step === 4 && (
            <button
              type="button"
              onClick={onClose}
              className="w-full py-3.5 rounded-2xl sm:rounded-3xl font-['Montserrat_Alternates',sans-serif] font-bold text-sm text-white bg-[#28502d] hover:bg-[#1f3f23] active:scale-[0.99] shadow-md transition-all cursor-pointer mt-1"
            >
              Lanjutkan
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
