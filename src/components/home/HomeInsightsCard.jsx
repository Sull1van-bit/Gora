import React from 'react';

export default function HomeInsightsCard({ onNavigateTab }) {
  return (
    <section>
      <h2 className="text-[14px] font-['Montserrat_Alternates',sans-serif] font-semibold text-[#3c3b3b] mb-3">
        Insights
      </h2>
      <div 
        onClick={() => onNavigateTab('insights')}
        className="bg-[#fbf9f3] rounded-[20px] shadow-[0px_0px_4px_rgba(0,0,0,0.08)] h-[115px] relative overflow-hidden cursor-pointer group hover:shadow-md transition-all flex flex-col justify-between"
      >
        
        <div className="relative flex-1 px-3 pt-3">
          <div className="text-[10px] font-['Montserrat_Alternates',sans-serif] font-semibold text-[#3c3b3b] leading-tight w-[80%] relative z-10">
            Tomat Anda tumbuh <br />
            <span className="text-[#578a3e]">3% lebih cepat</span> <br />
            dibanding minggu ke-1
          </div>
          
          <div className="absolute right-0 top-3 h-[46px] w-[80px] pr-2 flex justify-end">
            
            <img src="/assets/figma/insights_growth.svg" className="h-full object-contain group-hover:scale-105 transition-transform origin-bottom-right" alt="Growth" onError={(e) => e.target.style.display='none'} />
          </div>
        </div>

        
        <div className="relative">
          
          <div className="absolute top-0 left-0 w-full h-[0.5px] bg-[#d1d5db]" />
          <div className="px-3 py-2 flex items-start gap-1.5">
            <img src="/assets/figma/bulb_filled.svg" className="w-[20px] h-[20px] shrink-0 opacity-80" alt="Idea" />
            <div className="text-[6px] font-['Montserrat_Alternates',sans-serif] font-semibold text-[#3c3b3b] leading-[8px] mt-0.5">
              <p>Kemungkinan penyebab:</p>
              <p className="font-normal mt-0.5">• Cahaya kurang</p>
              <p className="font-normal">• Tanah terlalu lembap</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
