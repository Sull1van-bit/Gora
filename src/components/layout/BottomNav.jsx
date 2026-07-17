import React from 'react';

export default function BottomNav({ activeTab, onTabChange, onOpenAddPlot, urgentCount = 0 }) {
  const navIconClass = (isActive) =>
    `w-[25.8px] h-[25.8px] transition-all duration-200 ${
      isActive ? 'opacity-100 drop-shadow-[0px_3px_3px_#9fb58e]' : 'opacity-70 group-hover:opacity-100'
    }`;

  const navTextClass = (isActive) =>
    `text-[10px] font-['Montserrat_Alternates',sans-serif] mt-1 leading-none transition-colors duration-200 truncate ${
      isActive ? 'text-[#28502d] font-bold' : 'text-[#28502d]/75 font-semibold group-hover:text-[#28502d]'
    }`;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none transition-all">
      <div
        className="max-w-[440px] mx-auto h-[84px] relative pointer-events-auto select-none"
        style={{ paddingBottom: 'var(--sab, 0px)' }}
      >
        {/* Background Shape with Center Notch (Rectangle 1035) */}
        <div className="absolute inset-[28.21%_0_0_0] overflow-visible">
          <svg
            preserveAspectRatio="none"
            width="100%"
            height="100%"
            overflow="visible"
            style={{ display: 'block' }}
            viewBox="0 0 403.846 60.3077"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-[0_-3px_10px_rgba(0,0,0,0.06)]"
          >
            <path
              id="Rectangle 1035"
              d="M0 22C0 9.84972 9.84974 0 22 0H100.692H151.846C151.846 0 156.692 0 165.846 0C176.775 0 174.462 29.0769 201.923 29.0769C231 29.0769 226.945 -6.08378e-06 237.462 0C246.615 5.29566e-06 251.462 0 251.462 0H304.231H381.846C393.996 0 403.846 9.84974 403.846 22V60.3077H0V22Z"
              fill="#C6D5A2"
            />
          </svg>
        </div>

        {/* Floating Center Plus Button */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
          <button
            onClick={() => (onOpenAddPlot ? onOpenAddPlot() : onTabChange('add-plot'))}
            className="w-[47.4px] h-[47.4px] rounded-full bg-[#578a3e] drop-shadow-[0px_0px_2px_#8fb37d] flex items-center justify-center p-[9px] cursor-pointer group hover:bg-[#4d7b36] active:scale-95 transition-all"
            title="Tambah Tanaman"
            aria-label="Tambah Tanaman"
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            <img
              src="/assets/figma/add_icon.svg"
              className="w-[30px] h-[30px] filter brightness-0 invert transition-transform duration-300 group-hover:rotate-90"
              alt=""
            />
          </button>
        </div>

        {/* Navigation Tabs Layer */}
        <div className="absolute inset-[28.21%_0_0_0] flex items-center justify-between px-3 sm:px-5 z-10">
          {/* 1. Beranda */}
          <button
            onClick={() => onTabChange('home')}
            className="flex flex-col items-center justify-center flex-1 py-1 cursor-pointer group transition-transform active:scale-95"
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            <div className="relative flex items-center justify-center">
              <img
                src="/assets/figma/home_icon.svg"
                className={navIconClass(activeTab === 'home')}
                alt=""
              />
            </div>
            <span className={navTextClass(activeTab === 'home')}>Beranda</span>
          </button>

          {/* 2. Tanaman */}
          <button
            onClick={() => onTabChange('plots')}
            className="flex flex-col items-center justify-center flex-1 py-1 cursor-pointer group transition-transform active:scale-95"
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            <div className="relative flex items-center justify-center">
              <img
                src="/assets/figma/tanaman_icon.svg"
                className={navIconClass(activeTab === 'plots')}
                alt=""
              />
              {urgentCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-rose-500 text-white text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow-sm animate-pulse">
                  {urgentCount}
                </span>
              )}
            </div>
            <span className={navTextClass(activeTab === 'plots')}>Tanaman</span>
          </button>

          {/* Center Spacer for Floating Button */}
          <div className="w-[58px] shrink-0 pointer-events-none" aria-hidden="true" />

          {/* 3. Informasi */}
          <button
            onClick={() => onTabChange('insights')}
            className="flex flex-col items-center justify-center flex-1 py-1 cursor-pointer group transition-transform active:scale-95"
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            <div className="relative flex items-center justify-center">
              <img
                src="/assets/figma/document_icon.svg"
                className={navIconClass(activeTab === 'insights')}
                alt=""
              />
            </div>
            <span className={navTextClass(activeTab === 'insights')}>Informasi</span>
          </button>

          {/* 4. Profil */}
          <button
            onClick={() => onTabChange('profile')}
            className="flex flex-col items-center justify-center flex-1 py-1 cursor-pointer group transition-transform active:scale-95"
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            <div className="relative flex items-center justify-center">
              <img
                src="/assets/figma/profile_icon.svg"
                className={navIconClass(activeTab === 'profile')}
                alt=""
              />
            </div>
            <span className={navTextClass(activeTab === 'profile')}>Profil</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
