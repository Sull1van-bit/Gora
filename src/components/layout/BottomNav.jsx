import React from 'react';

export default function BottomNav({ activeTab, onTabChange, onOpenAddPlot, urgentCount = 0 }) {
  const navIconClass = (isActive) => `w-6 h-6 ${isActive ? 'opacity-100' : 'opacity-50'}`;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#dde8d0]/95 backdrop-blur-md border-t border-[#b8ccaa]/60 rounded-t-[28px] shadow-[0_-4px_20px_rgba(0,0,0,0.06)] transition-all">
      <div className="max-w-md mx-auto flex items-center justify-between px-6 py-2 relative" style={{ paddingBottom: 'calc(0.5rem + var(--sab, 0px))' }}>
        
        {/* 1. Beranda */}
        <button
          onClick={() => onTabChange('home')}
          className="relative flex flex-col items-center justify-center min-w-[54px] py-1 group transition-transform active:scale-95"
          style={{ WebkitTapHighlightColor: 'transparent' }}
        >
          <div className="relative flex items-center justify-center">
            <img src="/assets/figma/home_icon.svg" className={navIconClass(activeTab === 'home')} alt="" />
          </div>
          <span className={`text-[10px] font-['Montserrat_Alternates',sans-serif] tracking-tight mt-1 transition-colors ${activeTab === 'home' ? 'text-[#28502d] font-bold' : 'text-[#587352]/70 font-semibold'}`}>
            Beranda
          </span>
        </button>

        {/* 2. Tanaman (Plots) */}
        <button
          onClick={() => onTabChange('plots')}
          className="relative flex flex-col items-center justify-center min-w-[54px] py-1 group transition-transform active:scale-95"
          style={{ WebkitTapHighlightColor: 'transparent' }}
        >
          <div className="relative flex items-center justify-center">
            <img src="/assets/figma/water_pump.svg" className={navIconClass(activeTab === 'plots')} alt="" />
            {urgentCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-rose-500 text-white text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow-sm animate-pulse">
                {urgentCount}
              </span>
            )}
          </div>
          <span className={`text-[10px] font-['Montserrat_Alternates',sans-serif] tracking-tight mt-1 transition-colors ${activeTab === 'plots' ? 'text-[#28502d] font-bold' : 'text-[#587352]/70 font-semibold'}`}>
            Tanaman
          </span>
        </button>

        {/* 3. Center Floating + Button */}
        <div className="relative -mt-6 flex flex-col items-center justify-center">
          <button
            onClick={() => onOpenAddPlot ? onOpenAddPlot() : onTabChange('add-plot')}
            className="w-[54px] h-[54px] rounded-full bg-[#28502d] text-white flex items-center justify-center shadow-lg border-4 border-[#f5f9ed] hover:bg-[#1f4023] active:scale-90 transition-all cursor-pointer group"
            title="Tambah Tanaman"
            aria-label="Tambah Tanaman"
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            <img src="/assets/figma/add_icon.svg" className="w-7 h-7 group-hover:rotate-90 transition-transform duration-300" alt="" />
          </button>
        </div>

        {/* 4. Informasi (Insights) */}
        <button
          onClick={() => onTabChange('insights')}
          className="relative flex flex-col items-center justify-center min-w-[54px] py-1 group transition-transform active:scale-95"
          style={{ WebkitTapHighlightColor: 'transparent' }}
        >
          <div className="relative flex items-center justify-center">
            <img src="/assets/figma/document_icon.svg" className={navIconClass(activeTab === 'insights')} alt="" />
          </div>
          <span className={`text-[10px] font-['Montserrat_Alternates',sans-serif] tracking-tight mt-1 transition-colors ${activeTab === 'insights' ? 'text-[#28502d] font-bold' : 'text-[#587352]/70 font-semibold'}`}>
            Informasi
          </span>
        </button>

        {/* 5. Profil */}
        <button
          onClick={() => onTabChange('profile')}
          className="relative flex flex-col items-center justify-center min-w-[54px] py-1 group transition-transform active:scale-95"
          style={{ WebkitTapHighlightColor: 'transparent' }}
        >
          <div className="relative flex items-center justify-center">
            <img src="/assets/figma/profile_icon.svg" className={navIconClass(activeTab === 'profile')} alt="" />
          </div>
          <span className={`text-[10px] font-['Montserrat_Alternates',sans-serif] tracking-tight mt-1 transition-colors ${activeTab === 'profile' ? 'text-[#28502d] font-bold' : 'text-[#587352]/70 font-semibold'}`}>
            Profil
          </span>
        </button>

      </div>
    </nav>
  );
}
