import React, { useState, useRef } from 'react';
import PlotCardMini from '../components/home/PlotCardMini';
import { RiMapPinLine, RiAddLine, RiWaterFlashLine, RiDropLine, RiCheckboxCircleLine } from 'react-icons/ri';
import UniversalIcon from '../utils/iconHelper';
import useUserLocation from '../hooks/useUserLocation';
import useProfile from '../hooks/useProfile';

export default function HomePage({
  plots,
  actions,
  weather,
  komoditasList,
  newsList,
  onCompleteAction,
  onSelectPlot,
  onNavigateTab,
  onOpenAddPlot,
  weatherLoading
}) {
  const { provinsi, kecamatan, loading: locLoading } = useUserLocation();
  const sliderRef = useRef(null);
  const [activePlotIndex, setActivePlotIndex] = useState(0);
  const { profile, loading: profileLoading } = useProfile();

  const displayName = profile?.full_name || profile?.username || 'Pengguna';

  const sortedPlots = [...plots].sort((a, b) => {
    if (b.priority_score !== a.priority_score) {
      return b.priority_score - a.priority_score;
    }
    return new Date(b.updated_at) - new Date(a.updated_at);
  });
  const plotsToShow = sortedPlots.slice(0, 5);

  const handleSliderScroll = () => {
    if (!sliderRef.current) return;
    const { scrollLeft } = sliderRef.current;
    const index = Math.round(scrollLeft / 167);
    setActivePlotIndex(Math.min(Math.max(index, 0), plotsToShow.length - 1));
  };

  const scrollToPlot = (idx) => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollTo({
      left: idx * 167,
      behavior: 'smooth'
    });
    setActivePlotIndex(idx);
  };

  const pendingActions = actions.filter(a => a.status !== 'completed');
  const completedActions = actions.filter(a => a.status === 'completed');
  const totalActionsCount = actions.length || 2;
  const completedActionsCount = completedActions.length;

  const getGreetingTime = () => {
    const hour = new Date().getHours();
    if (hour < 11) return 'Selamat Pagi,';
    if (hour < 15) return 'Selamat Siang,';
    if (hour < 18) return 'Selamat Sore,';
    return 'Selamat Malam,';
  };

  const getPriorityTextColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high':
        return 'text-[#ce4949]';
      case 'medium':
        return 'text-[#d89710]';
      case 'low':
        return 'text-[#3a6c3d]';
      default:
        return 'text-[#3c3b3b]';
    }
  };

  return (
    <div className="animate-fade-in space-y-0 bg-[#f5f9ed] min-h-screen pb-[80px] relative">
      {/* SECTION A: Curved Green Hero Banner (Bg Dark) */}
      <section className="bg-gradient-to-t from-[#c6d5a2] to-[#25812a] rounded-b-[30px] pt-5 pb-24 px-6 relative overflow-hidden text-white shadow-xs">
        <div className="relative z-10 flex flex-col justify-between max-w-sm">
          <div>
            <p className="text-[#fbf9f3] text-[13px] sm:text-[15px] font-['Montserrat_Alternates',sans-serif] font-medium tracking-tight">
              {getGreetingTime()}
            </p>
            <div className="flex items-center gap-2 font-['Montserrat_Alternates',sans-serif] font-bold text-[22px] sm:text-[24px] text-[#fbf9f3] leading-tight mt-0.5">
              <img src="/assets/figma/leaf_bold.svg" className="w-6 h-6 sm:w-7 sm:h-7 filter brightness-0 invert shrink-0" alt="GORA" />
              <span className="truncate">{displayName}</span>
            </div>
            <p className="text-[11px] sm:text-[12px] font-['Montserrat_Alternates',sans-serif] text-[#fbf9f3] opacity-90 mt-1">
              Pantau kondisi lahan Anda hari ini.
            </p>
          </div>
        </div>

        {/* Right Streak Character Illustration */}
        <img
          src="/assets/figma/streak.svg"
          className="absolute -right-2 top-3 w-[150px] h-[180px] pointer-events-none object-contain select-none"
          alt="Streak Farmer"
        />
      </section>

      {/* SECTION B: Floating Weather Card */}
      <section className="-mt-16 mx-4 bg-[#fbf9f3] rounded-[20px] shadow-[0px_4px_30px_rgba(0,0,0,0.08)] p-4 relative z-20 border border-slate-100/60 transition-all">
        {/* Location Row */}
        <div className="flex items-center gap-1 font-['Montserrat_Alternates',sans-serif] font-semibold text-[11px] text-[#3c3b3b] mb-3">
          <RiMapPinLine className="w-4 h-4 text-slate-500 shrink-0" />
          <span>
            {locLoading
              ? 'Mendeteksi lokasi...'
              : kecamatan && provinsi
                ? `${kecamatan}, ${provinsi}`
                : 'Serpong, Tangerang'}
          </span>
        </div>

        {/* 3-Column Weather Stats Grid */}
        <div
          onClick={() => onNavigateTab('insights', 'weather')}
          className="flex items-center justify-between text-center divide-x divide-slate-200/80 cursor-pointer group"
        >
          {/* Column 1: Temp */}
          <div className="flex-1 flex flex-col items-center justify-center px-1">
            <div className="flex items-center justify-center gap-1.5 mb-0.5">
              <img src="/assets/figma/weather_sun.svg" className="w-6 h-6 group-hover:scale-110 transition-transform" alt="Cuaca" />
              <span className="font-['Manrope',sans-serif] font-bold text-[20px] text-[#28502d]">
                {weather?.temp || 20}°C
              </span>
            </div>
            <span className="text-[10px] font-['Montserrat_Alternates',sans-serif] font-semibold text-[#3c3b3b]">
              {weather?.condition || 'Cerah Berawan'}
            </span>
          </div>

          {/* Column 2: Humidity */}
          <div className="flex-1 flex flex-col items-center justify-center px-1">
            <div className="flex items-center justify-center gap-1.5 mb-0.5">
              <img src="/assets/figma/water_sharp.svg" className="w-5 h-5 group-hover:scale-110 transition-transform" alt="Kelembapan" />
              <span className="font-['Manrope',sans-serif] font-bold text-[18px] text-[#28502d]">
                {weather?.humidity || '72%'}
              </span>
            </div>
            <span className="text-[9px] font-['Montserrat_Alternates',sans-serif] font-semibold text-[#3c3b3b]">
              Kelembapan
            </span>
          </div>

          {/* Column 3: Rain Chance */}
          <div className="flex-1 flex flex-col items-center justify-center px-1">
            <div className="flex items-center justify-center gap-1.5 mb-0.5">
              <img src="/assets/figma/cloud_rain.svg" className="w-5 h-5 group-hover:scale-110 transition-transform" alt="Hujan" />
              <span className="font-['Manrope',sans-serif] font-bold text-[18px] text-[#28502d]">
                {weather?.rainChance || '15%'}
              </span>
            </div>
            <span className="text-[9px] font-['Montserrat_Alternates',sans-serif] font-semibold text-[#3c3b3b]">
              Curah Hujan
            </span>
          </div>
        </div>
      </section>

      {/* SECTION C: Lahan Saya (Plots Horizontal Slider with Dots) */}
      <section className="px-4 mt-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[15px] font-['Montserrat_Alternates',sans-serif] font-bold text-[#3c3b3b]">
            Lahan Saya
          </h2>
          <button
            onClick={() => onNavigateTab('plots')}
            className="text-[12px] font-['Montserrat_Alternates',sans-serif] font-bold text-[#3a6c3d] flex items-center gap-1 hover:underline active:scale-95 transition-all"
          >
            Lihat Semua →
          </button>
        </div>

        {/* Horizontal scroll slider bounded by section padding */}
        <div
          ref={sliderRef}
          onScroll={handleSliderScroll}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          className="flex gap-3 overflow-x-auto pb-2 scrollbar-none snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
        >
          {plotsToShow.map((plot) => (
            <div key={plot.id} className="snap-start shrink-0">
              <PlotCardMini plot={plot} onSelect={onSelectPlot} />
            </div>
          ))}

          {/* Tambah Tanaman Card (Figma 56:186 cardTambah) */}
          <div
            onClick={onOpenAddPlot}
            className="w-[145px] sm:w-[155px] h-[200px] bg-[#fbf9f3] rounded-[20px] shadow-[0px_2px_8px_rgba(0,0,0,0.06)] border border-slate-100/80 p-1.5 shrink-0 cursor-pointer group snap-start active:scale-[0.98] transition-all select-none"
          >
            <div className="border border-[#8f8e94]/50 border-dashed rounded-[16px] h-full flex flex-col items-center justify-center gap-1 group-hover:bg-white/60 transition-colors p-3">
              <span className="font-['Montserrat_Alternates',sans-serif] font-medium text-[28px] sm:text-[30px] text-[#6f6e72] leading-none group-hover:scale-110 transition-transform">
                +
              </span>
              <span className="font-['Montserrat_Alternates',sans-serif] font-medium text-[10px] sm:text-[11px] text-[#3c3b3b] text-center leading-tight">
                Tambah Tanaman
              </span>
            </div>
          </div>
        </div>

        {/* Dots scroll bar indicator representing plots shown (max 5) */}
        {plotsToShow.length > 1 && (
          <div className="flex items-center justify-center gap-1.5 mt-2">
            {plotsToShow.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollToPlot(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${activePlotIndex === idx
                    ? 'w-5 bg-[#28502d]'
                    : 'w-1.5 bg-slate-300 hover:bg-slate-400'
                  }`}
                aria-label={`Plot ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </section>

      {/* SECTION D: 2-Column Grid (Perawatan hari ini & Insights) */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 px-4 mt-3">
        {/* Perawatan hari ini Card */}
        <section className="min-w-0">
          <h2 className="text-[13px] sm:text-[15px] font-['Montserrat_Alternates',sans-serif] font-bold text-[#3c3b3b] mb-1.5 sm:mb-2 truncate">
            Perawatan hari ini
          </h2>
          <div className="bg-[#fbf9f3] rounded-[20px] p-3 sm:p-4 shadow-[0px_2px_8px_rgba(0,0,0,0.06)] flex flex-col justify-between border border-slate-100 h-[190px] overflow-hidden">
            <div className="space-y-1.5 sm:space-y-2 overflow-y-auto pr-0.5 flex-1">
              {pendingActions.length > 0 ? (
                pendingActions.slice(0, 2).map((act, idx) => (
                  <div
                    key={act.id}
                    onClick={() => onCompleteAction(act.id)}
                    className="flex items-center justify-between gap-1.5 sm:gap-2.5 cursor-pointer group py-1 border-b border-slate-100 last:border-0"
                  >
                    <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0">
                      <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0 ${idx === 0 ? 'bg-[#b4d7f1] text-blue-800' : 'bg-[#bcd4aa] text-emerald-800'}`}>
                        {idx === 0 ? <RiWaterFlashLine className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-blue-600 shrink-0" /> : <RiDropLine className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-emerald-600 shrink-0" />}
                      </div>
                      <div className="min-w-0">
                        <p className={`text-[10px] sm:text-[11px] font-['Montserrat_Alternates',sans-serif] font-bold truncate transition-opacity group-hover:opacity-80 ${getPriorityTextColor(act.priority)}`}>
                          {act.title}
                        </p>
                        <p className="text-[8px] sm:text-[9px] font-['Montserrat_Alternates',sans-serif] text-[#6f6e72] truncate">
                          {act.plot_name || 'Lahan Padi'}
                        </p>
                      </div>
                    </div>
                    <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-[5px] sm:rounded-[6px] border-2 border-[#3c3b3b]/60 group-hover:border-[#28502d] group-hover:bg-emerald-50 flex items-center justify-center transition-all shrink-0" />
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center py-2">
                  <RiCheckboxCircleLine className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-600 mb-1 mx-auto" />
                  <p className="text-[10px] sm:text-[11px] font-bold text-[#28502d] font-['Montserrat_Alternates',sans-serif]">Semua selesai</p>
                  <p className="text-[8px] sm:text-[9px] text-[#6f6e72]">Lahan dalam perawatan optimal.</p>
                </div>
              )}
            </div>

            {/* Progress Bar Footer */}
            <div className="pt-1.5 sm:pt-2 border-t border-slate-200/80 mt-1">
              <div className="flex items-center justify-between text-[8px] sm:text-[9px] font-['Montserrat_Alternates',sans-serif] font-semibold text-[#3c3b3b] mb-1">
                <span>{completedActionsCount}/{totalActionsCount} Selesai</span>
              </div>
              <div className="w-full bg-[#d9d9d9] h-[4px] sm:h-[5px] rounded-full overflow-hidden">
                <div
                  className="bg-[#28502d] h-full rounded-full transition-all duration-300"
                  style={{ width: `${(completedActionsCount / Math.max(1, totalActionsCount)) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Insights Card */}
        <section className="min-w-0">
          <h2 className="text-[13px] sm:text-[15px] font-['Montserrat_Alternates',sans-serif] font-bold text-[#3c3b3b] mb-1.5 sm:mb-2 truncate">
            Insights
          </h2>
          <div
            onClick={() => onNavigateTab('insights')}
            className="bg-[#fbf9f3] rounded-[20px] p-3 sm:p-4 shadow-[0px_2px_8px_rgba(0,0,0,0.06)] flex flex-col justify-between border border-slate-100 h-[190px] relative overflow-hidden cursor-pointer group hover:shadow-md transition-all"
          >
            {/* Top Area */}
            <div className="flex items-start justify-between gap-1 sm:gap-2">
              <div className="text-[10px] sm:text-[11px] font-['Montserrat_Alternates',sans-serif] font-semibold text-[#3c3b3b] leading-snug min-w-0">
                Tomat tumbuh <span className="text-[#578a3e] font-bold">3% lebih cepat</span> dari minggu ke-1
              </div>
              <img src="/assets/figma/insights_growth.svg" className="w-[60px] h-[36px] sm:w-[85px] sm:h-[50px] object-contain shrink-0 -mr-1 group-hover:scale-105 transition-transform" alt="Growth Graph" />
            </div>

            {/* Bottom Causes Area */}
            <div className="pt-2 sm:pt-2.5 border-t border-slate-200/80 flex items-start gap-1.5 sm:gap-2.5 mt-1 min-w-0">
              <img src="/assets/figma/bulb_filled.svg" className="w-4 h-4 sm:w-6 sm:h-6 shrink-0 mt-0.5" alt="Idea" />
              <div className="text-[8px] sm:text-[9px] font-['Montserrat_Alternates',sans-serif] font-semibold text-[#3c3b3b] leading-tight min-w-0">
                <p className="mb-0.5 font-bold truncate">Kemungkinan penyebab:</p>
                <p className="text-[#6f6e72] truncate">• Cahaya kurang</p>
                <p className="text-[#6f6e72] truncate">• Tanah terlalu lembap</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* SECTION E: Informasi (Berita & Pasar Grid) */}
      <section className="pb-6">
        <div className="flex items-center justify-between mt-5 mb-2 px-4">
          <h2 className="text-[15px] font-['Montserrat_Alternates',sans-serif] font-bold text-[#3c3b3b]">
            Informasi
          </h2>
          <button
            onClick={() => onNavigateTab('insights')}
            className="text-[12px] font-['Montserrat_Alternates',sans-serif] font-bold text-[#3a6c3d] flex items-center gap-1 hover:underline active:scale-95 transition-all"
          >
            Lihat Semua →
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 px-4">
          {/* Berita Card */}
          <div
            onClick={() => onNavigateTab('insights')}
            className="bg-[#fbf9f3] rounded-[20px] p-3 sm:p-4 shadow-[0px_2px_8px_rgba(0,0,0,0.06)] flex flex-col justify-between border border-slate-100 cursor-pointer hover:shadow-md transition-all h-[135px] overflow-hidden"
          >
            <div>
              <span className="bg-[#28502d] text-[#fbf9f3] text-[8px] sm:text-[9px] font-['Manrope',sans-serif] font-extrabold px-2 py-0.5 rounded-full inline-block mb-1 sm:mb-1.5 uppercase tracking-wider">
                BERITA
              </span>
              <h4 className="text-[11px] sm:text-[12px] font-['Montserrat_Alternates',sans-serif] font-bold text-[#3c3b3b] leading-tight line-clamp-2">
                5 Cara Efektif Mencegah Hama pada Tanaman
              </h4>
            </div>
            <div className="flex items-center justify-between gap-2 mt-1">
              <p className="text-[8px] sm:text-[9px] font-['Montserrat_Alternates',sans-serif] text-[#6f6e72] truncate">
                Tips • 5 min
              </p>
              <img
                src="/assets/figma/berita.png"
                className="w-[38px] h-[38px] sm:w-[46px] sm:h-[46px] rounded-[10px] sm:rounded-[12px] object-cover shrink-0 shadow-xs"
                alt="Berita"
                onError={(e) => { e.target.src = '/assets/figma/image9.png'; }}
              />
            </div>
          </div>

          {/* Pasar Card */}
          <div
            onClick={() => onNavigateTab('insights', 'market')}
            className="bg-[#fbf9f3] rounded-[20px] p-3 sm:p-4 shadow-[0px_2px_8px_rgba(0,0,0,0.06)] flex flex-col justify-between border border-slate-100 cursor-pointer hover:shadow-md transition-all h-[135px] overflow-hidden"
          >
            <span className="bg-[#e8b54a] text-[#fbf9f3] text-[8px] sm:text-[9px] font-['Manrope',sans-serif] font-extrabold px-2 py-0.5 rounded-full self-start uppercase tracking-wider mb-1">
              PASAR
            </span>
            <div className="space-y-1 sm:space-y-1.5 divide-y divide-slate-100 flex-1 flex flex-col justify-around">
              {komoditasList.slice(0, 2).map((kom, idx) => (
                <div key={kom.id || idx} className="pt-1 flex items-center justify-between text-[10px] sm:text-[11px] first:pt-0 gap-1">
                  <div className="flex items-center gap-1 sm:gap-1.5 min-w-0">
                    <UniversalIcon icon={kom.icon || (idx === 0 ? 'tomato' : 'rice')} className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 shrink-0" />
                    <div className="min-w-0">
                      <p className="font-['Montserrat_Alternates',sans-serif] font-bold text-[#3c3b3b] leading-none text-[10px] sm:text-[11px] truncate">{kom.nama ? kom.nama.split('(')[0] : 'Komoditas'}</p>
                      <p className="text-[8px] sm:text-[9px] text-[#6f6e72]">IDR {kom.avgPrice ? new Intl.NumberFormat('id-ID').format(kom.avgPrice) : '15,000'}/{kom.satuan || 'kg'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5 sm:gap-1 shrink-0">
                    <span className={`font-bold text-[9px] sm:text-[10px] ${kom.trend === 'up' ? 'text-[#41a949]' : 'text-[#ce4949]'}`}>
                      {kom.trend === 'up' ? '+1%' : '-3%'}
                    </span>
                    <img src={kom.trend === 'up' ? '/assets/figma/sparkline_up.svg' : '/assets/figma/sparkline_down.svg'} className="w-5 h-2.5 sm:w-7 sm:h-3" alt={kom.trend || 'trend'} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
