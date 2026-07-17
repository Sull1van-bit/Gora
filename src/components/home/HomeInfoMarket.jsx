import React from 'react';

export default function HomeInfoMarket({ onNavigateTab, komoditasList, newsList }) {
  const latestNews = newsList && newsList.length > 0 ? newsList[0] : null;

  return (
    <section className="pb-6">
      <div className="flex items-center justify-between mt-5 mb-2 px-[23px]">
        <h2 className="text-[14px] font-['Montserrat_Alternates',sans-serif] font-semibold text-[#3c3b3b]">
          Informasi
        </h2>
        <button
          onClick={() => onNavigateTab('insights')}
          className="text-[12px] font-['Montserrat_Alternates',sans-serif] font-semibold text-[#3a6c3d] flex items-center gap-1 active:scale-95 transition-all"
        >
          Lihat Semua 
          <svg width="15" height="16" viewBox="0 0 15 16" fill="none" className="rotate-90 text-[#3a6c3d]">
            <path d="M7.5 12V4M7.5 4L3.75 7.75M7.5 4L11.25 7.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-[11px] px-[19px]">
        
        <div 
          onClick={() => onNavigateTab('insights', 'news')}
          className="bg-[#fbf9f3] rounded-[20px] shadow-[0px_0px_4px_rgba(0,0,0,0.08)] flex items-center justify-between gap-3 cursor-pointer hover:shadow-md transition-all h-[93px] relative overflow-hidden p-3"
        >
          <div className="flex-1 min-w-0 flex flex-col justify-between h-full">
            <span className="bg-[#28502d] text-[#fbf9f3] text-[6px] font-['Manrope',sans-serif] font-semibold px-2.5 py-1 rounded-full self-start mb-1 uppercase tracking-wider">
              BERITA
            </span>
            <h4 className="text-[10px] font-['Montserrat_Alternates',sans-serif] font-semibold text-[#3c3b3b] leading-tight line-clamp-3 mb-1">
              {latestNews ? latestNews.title : 'Sedang memuat berita...'}
            </h4>
            <div className="text-[6px] font-['Montserrat_Alternates',sans-serif] text-[#3c3b3b] flex items-center gap-1">
              <span className="text-[#28502d]">{latestNews ? latestNews.category : '...'}</span>
              <span>•</span>
              <span>{latestNews ? latestNews.readTime : '...'}</span>
            </div>
          </div>
          <img 
            src={latestNews && latestNews.image ? latestNews.image : "/assets/figma/berita.png"} 
            className="w-[58px] h-[57px] rounded-[20px] object-cover shrink-0 shadow-sm" 
            alt="Berita"
            onError={(e) => { e.target.src = '/assets/figma/image9.png'; }}
          />
        </div>

        
        <div 
          onClick={() => onNavigateTab('insights', 'market')}
          className="bg-[#fbf9f3] rounded-[20px] shadow-[0px_0px_4px_rgba(0,0,0,0.08)] flex flex-col justify-between cursor-pointer hover:shadow-md transition-all h-[93px] relative overflow-hidden p-3"
        >
          <span className="bg-[#e8b54a] text-[#fbf9f3] text-[6px] font-['Manrope',sans-serif] font-semibold px-2.5 py-1 rounded-full self-start uppercase tracking-wider absolute top-2 left-3">
            PASAR
          </span>
          <div className="mt-5 space-y-1.5 flex-1 flex flex-col justify-end divide-y divide-slate-100">
            {komoditasList.slice(0, 2).map((kom, idx) => {
              const isUp = kom.trend === 'up' || idx === 1;
              const trendValue = kom.trend === 'up' ? '+1%' : '-3%';
              const sparklineIcon = isUp ? '/assets/figma/sparkline_up.svg' : '/assets/figma/sparkline_down.svg';
              
              return (
                <div key={kom.id || idx} className="pt-1.5 flex items-center justify-between text-[11px] first:pt-0 relative">
                  <div className="flex flex-col min-w-0 flex-[1.5]">
                    <p className="font-['Montserrat_Alternates',sans-serif] font-semibold text-[#3c3b3b] leading-tight text-[10px] truncate">{kom.nama ? kom.nama.split('(')[0] : (idx === 0 ? 'Tomat' : 'Nasi')}</p>
                    <p className="text-[6px] font-['Montserrat_Alternates',sans-serif] text-[#3c3b3b] opacity-80 mt-0.5">
                      IDR {kom.avgPrice ? new Intl.NumberFormat('id-ID').format(kom.avgPrice) : (idx === 0 ? '18,000' : '12,500')}/{kom.satuan || 'kg'}
                    </p>
                  </div>
                  <div className="flex items-center gap-[10px] shrink-0 justify-end flex-1">
                    <span className={`font-['Montserrat_Alternates',sans-serif] font-semibold text-[10px] ${isUp ? 'text-[#41a949]' : 'text-[#ce4949]'}`}>
                      {trendValue}
                    </span>
                    <img src={sparklineIcon} className="w-[36px] h-[15px] object-contain" alt={kom.trend || 'trend'} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
