import React from 'react';

export default function BottomNav({ activeTab, onTabChange, onOpenAddPlot, urgentCount = 0 }) {
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
            <svg className={`w-6 h-6 transition-colors ${activeTab === 'home' ? 'text-[#28502d]' : 'text-[#587352]/70'}`} fill={activeTab === 'home' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={activeTab === 'home' ? 0 : 2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
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
            <svg className={`w-6 h-6 transition-colors ${activeTab === 'plots' ? 'text-[#28502d]' : 'text-[#587352]/70'}`} fill={activeTab === 'plots' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={activeTab === 'plots' ? 0 : 2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
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
            <span className="text-[30px] font-light leading-none mb-0.5 group-hover:rotate-90 transition-transform duration-300">+</span>
          </button>
        </div>

        {/* 4. Informasi (Insights) */}
        <button
          onClick={() => onTabChange('insights')}
          className="relative flex flex-col items-center justify-center min-w-[54px] py-1 group transition-transform active:scale-95"
          style={{ WebkitTapHighlightColor: 'transparent' }}
        >
          <div className="relative flex items-center justify-center">
            <svg className={`w-6 h-6 transition-colors ${activeTab === 'insights' ? 'text-[#28502d]' : 'text-[#587352]/70'}`} fill={activeTab === 'insights' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={activeTab === 'insights' ? 0 : 2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
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
            <svg className={`w-6 h-6 transition-colors ${activeTab === 'profile' ? 'text-[#28502d]' : 'text-[#587352]/70'}`} fill={activeTab === 'profile' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={activeTab === 'profile' ? 0 : 2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <span className={`text-[10px] font-['Montserrat_Alternates',sans-serif] tracking-tight mt-1 transition-colors ${activeTab === 'profile' ? 'text-[#28502d] font-bold' : 'text-[#587352]/70 font-semibold'}`}>
            Profil
          </span>
        </button>

      </div>
    </nav>
  );
}
