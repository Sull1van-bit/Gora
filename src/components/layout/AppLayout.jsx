import React from 'react';
import BottomNav from './BottomNav';

export default function AppLayout({ 
  children, 
  activeTab, 
  currentRoute,
  onTabChange, 
  onOpenAddPlot,
  urgentCount = 0,
  headerTitle,
  headerSubtitle,
  headerRight,
  showBack = false,
  onBack
}) {
  const isCustomHeader = activeTab === 'home' || currentRoute === 'home' || currentRoute === 'plot-detail' || activeTab === 'plot-detail' || activeTab === 'plots' || currentRoute === 'plots';

  return (
    <div className={`min-h-screen ${isCustomHeader ? 'bg-[#f5f9ed]' : 'bg-slate-50'} text-slate-800 font-['Manrope',sans-serif] flex flex-col justify-between selection:bg-emerald-500 selection:text-white`}>
      {/* Top App Header with Glassmorphism & Safe Area - Hidden on Home and Plot Detail */}
      {!isCustomHeader && (
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-xs transition-all" style={{ paddingTop: 'var(--sat, 0px)' }}>
          <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {showBack && (
                <button
                  onClick={onBack}
                  className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 hover:bg-slate-200 active:scale-95 transition-all"
                  aria-label="Kembali"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}

              <div>
                {headerTitle ? (
                  <h1 className="text-lg font-extrabold tracking-tight text-slate-900 font-['Montserrat_Alternates',sans-serif]">
                    {headerTitle}
                  </h1>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white font-extrabold text-sm shadow-sm">
                      G
                    </span>
                    <span className="text-xl font-black tracking-tight bg-gradient-to-r from-emerald-600 to-teal-800 bg-clip-text text-transparent font-['Montserrat_Alternates',sans-serif]">
                      GORA
                    </span>
                  </div>
                )}

                {headerSubtitle && (
                  <p className="text-xs text-slate-500 font-medium leading-tight">
                    {headerSubtitle}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              {headerRight || (
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60 shadow-2xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping mr-1.5" />
                    Online
                  </span>
                </div>
              )}
            </div>
          </div>
        </header>
      )}

      {/* Main View Container with Mobile Frame Limits */}
      <main className={`flex-1 max-w-md w-full mx-auto pb-28 ${isCustomHeader ? 'pt-0 px-0' : 'pt-2 px-4'} transition-all`}>
        {children}
      </main>

      {/* Bottom Navigation */}
      <BottomNav 
        activeTab={activeTab} 
        onTabChange={onTabChange} 
        onOpenAddPlot={onOpenAddPlot}
        urgentCount={urgentCount} 
      />
    </div>
  );
}
