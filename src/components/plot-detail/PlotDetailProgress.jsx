import React from 'react';

const PlantGraphic = ({ stageIndex }) => {
  // Animasi CSS kustom bisa ditambahkan jika perlu, tapi kita manfaatkan animasi standar Tailwind (animate-pulse, animate-bounce, dll)
  // digabung dengan transisi
  
  const getGraphic = () => {
    switch(stageIndex) {
      case 0: // Seed
        return (
          <svg className="w-full h-full text-[#7d5a44]" viewBox="0 0 100 100" fill="currentColor">
            <path d="M20,80 Q50,60 80,80 L80,100 L20,100 Z" fill="#8B5A2B"/>
            <circle cx="50" cy="75" r="5" fill="#DEB887" className="animate-pulse" />
          </svg>
        );
      case 1: // Sprout
        return (
          <svg className="w-full h-full text-[#4c8644]" viewBox="0 0 100 100" fill="currentColor">
            <path d="M20,80 Q50,60 80,80 L80,100 L20,100 Z" fill="#8B5A2B"/>
            <path d="M50,75 C45,60 30,55 30,55 C40,45 50,60 50,75 Z" fill="#4c8644" className="animate-[bounce_2s_infinite]" />
            <path d="M50,75 C55,60 70,55 70,55 C60,45 50,60 50,75 Z" fill="#578a3e" className="animate-[bounce_2.5s_infinite]" />
            <rect x="48" y="70" width="4" height="15" fill="#4c8644" />
          </svg>
        );
      case 2: // Vegetative
        return (
          <svg className="w-full h-full text-[#4c8644]" viewBox="0 0 100 100" fill="currentColor">
            <path d="M20,80 Q50,70 80,80 L80,100 L20,100 Z" fill="#8B5A2B"/>
            <rect x="47" y="40" width="6" height="40" fill="#4c8644" />
            <path d="M48,65 C35,50 15,45 15,45 C25,30 45,50 48,65 Z" fill="#4c8644" className="origin-bottom-right animate-[pulse_3s_infinite]" />
            <path d="M52,60 C65,45 85,40 85,40 C75,25 55,45 52,60 Z" fill="#578a3e" className="origin-bottom-left animate-[pulse_3.5s_infinite]" />
            <path d="M48,50 C30,35 20,20 20,20 C35,15 50,35 48,50 Z" fill="#66a048" className="origin-bottom-right animate-[pulse_4s_infinite]" />
            <path d="M52,45 C70,30 80,15 80,15 C65,10 50,30 52,45 Z" fill="#4c8644" className="origin-bottom-left animate-[pulse_2.5s_infinite]" />
            <circle cx="50" cy="35" r="8" fill="#578a3e" />
          </svg>
        );
      case 3: // Flowering
        return (
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <path d="M20,80 Q50,70 80,80 L80,100 L20,100 Z" fill="#8B5A2B"/>
            <rect x="47" y="30" width="6" height="50" fill="#4c8644" />
            <path d="M48,65 C35,50 15,45 15,45 C25,30 45,50 48,65 Z" fill="#4c8644" />
            <path d="M52,60 C65,45 85,40 85,40 C75,25 55,45 52,60 Z" fill="#578a3e" />
            
            {/* Flowers */}
            <g className="animate-[spin_10s_linear_infinite] origin-[30px_45px]">
              <circle cx="30" cy="45" r="4" fill="#F4D03F" />
              <circle cx="26" cy="41" r="3" fill="#FFF" />
              <circle cx="34" cy="41" r="3" fill="#FFF" />
              <circle cx="26" cy="49" r="3" fill="#FFF" />
              <circle cx="34" cy="49" r="3" fill="#FFF" />
            </g>
            
            <g className="animate-[spin_12s_linear_infinite] origin-[70px_40px]">
              <circle cx="70" cy="40" r="4" fill="#F4D03F" />
              <circle cx="66" cy="36" r="3" fill="#FFF" />
              <circle cx="74" cy="36" r="3" fill="#FFF" />
              <circle cx="66" cy="44" r="3" fill="#FFF" />
              <circle cx="74" cy="44" r="3" fill="#FFF" />
            </g>
            
            <g className="animate-[spin_8s_linear_infinite] origin-[50px_25px]">
              <circle cx="50" cy="25" r="5" fill="#F4D03F" />
              <circle cx="45" cy="20" r="4" fill="#FFF" />
              <circle cx="55" cy="20" r="4" fill="#FFF" />
              <circle cx="45" cy="30" r="4" fill="#FFF" />
              <circle cx="55" cy="30" r="4" fill="#FFF" />
            </g>
          </svg>
        );
      case 4: // Harvest
      default:
        return (
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <path d="M20,80 Q50,70 80,80 L80,100 L20,100 Z" fill="#8B5A2B"/>
            <rect x="46" y="25" width="8" height="55" fill="#4c8644" />
            <path d="M48,65 C35,50 15,45 15,45 C25,30 45,50 48,65 Z" fill="#4c8644" />
            <path d="M52,60 C65,45 85,40 85,40 C75,25 55,45 52,60 Z" fill="#578a3e" />
            <path d="M48,45 C30,30 15,25 15,25 C30,15 45,30 48,45 Z" fill="#66a048" />
            <path d="M52,40 C70,25 85,20 85,20 C70,10 55,25 52,40 Z" fill="#578a3e" />
            
            {/* Fruits (Tomatoes) */}
            <circle cx="30" cy="45" r="7" fill="#E74C3C" className="animate-bounce" />
            <path d="M30,38 L32,36 M30,38 L28,36" stroke="#27AE60" strokeWidth="1.5" />
            
            <circle cx="70" cy="40" r="8" fill="#E74C3C" className="animate-[bounce_1.5s_infinite]" />
            <path d="M70,32 L72,30 M70,32 L68,30" stroke="#27AE60" strokeWidth="1.5" />
            
            <circle cx="50" cy="25" r="9" fill="#E74C3C" className="animate-[bounce_2s_infinite]" />
            <path d="M50,16 L52,14 M50,16 L48,14" stroke="#27AE60" strokeWidth="1.5" />
            
            <circle cx="40" cy="55" r="6" fill="#E74C3C" className="animate-[bounce_2.5s_infinite]" />
            <path d="M40,49 L41,47 M40,49 L39,47" stroke="#27AE60" strokeWidth="1.5" />
          </svg>
        );
    }
  };

  return (
    <div className="w-40 h-40 mx-auto relative drop-shadow-md">
      {getGraphic()}
    </div>
  );
};

export default function PlotDetailProgress({ plot, progressPct, setIsLogOpen }) {
  const defaultStages = [
    {id: "seed", name: "Semai", days: 14},
    {id: "sprout", name: "Tunas", days: 14},
    {id: "vegetative", name: "Vegetatif", days: 30},
    {id: "flowering", name: "Berbunga", days: 15},
    {id: "harvest", name: "Panen", days: 10}
  ];
  
  const stages = plot?.growth_stages || defaultStages;

  let elapsedDays = 0;
  if (plot?.planting_date) {
    const start = new Date(plot.planting_date).getTime();
    const now = new Date().getTime();
    elapsedDays = Math.max(0, Math.floor((now - start) / (1000 * 60 * 60 * 24)));
  }

  let currentStageIndex = 0;
  let accumulatedDays = 0;
  let daysToNext = 0;

  for (let i = 0; i < stages.length; i++) {
    accumulatedDays += stages[i].days;
    if (elapsedDays < accumulatedDays) {
      currentStageIndex = i;
      daysToNext = accumulatedDays - elapsedDays;
      break;
    }
    if (i === stages.length - 1) {
      currentStageIndex = i;
      daysToNext = 0; 
    }
  }

  const nextStageName = currentStageIndex < stages.length - 1 ? stages[currentStageIndex + 1].name : "Siap Panen";

  return (
    <section className="-mt-1 flex flex-col items-center justify-center relative z-20 w-full px-6">
      
      <div className="w-full bg-white rounded-[20px] p-5 shadow-[0px_2px_8px_rgba(0,0,0,0.06)] border border-slate-100 mt-2">
        <div className="flex justify-between items-end mb-4">
          <div>
            <p className="font-['Montserrat_Alternates',sans-serif] text-[12px] text-[#8f8e94]">Fase Saat Ini</p>
            <p className="font-['Montserrat_Alternates',sans-serif] font-bold text-[18px] text-[#28502d] leading-tight">
              {stages[currentStageIndex].name}
            </p>
          </div>
          <div className="text-right">
            {daysToNext > 0 ? (
              <>
                <p className="font-['Montserrat_Alternates',sans-serif] font-bold text-[16px] text-[#d89710] leading-tight">{daysToNext} Hari</p>
                <p className="font-['Montserrat_Alternates',sans-serif] text-[10px] text-[#8f8e94]">menuju {nextStageName}</p>
              </>
            ) : (
              <p className="font-['Montserrat_Alternates',sans-serif] font-bold text-[16px] text-[#578a3e]">Siap Dipanen</p>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center justify-center relative mt-2 mb-2 bg-[#f9fcf7] rounded-xl border border-emerald-100/50 py-4">
          <PlantGraphic stageIndex={currentStageIndex} />
          
          <div className="mt-4 flex gap-1 justify-center w-full px-4">
            {stages.map((stage, idx) => (
              <div 
                key={idx}
                className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${idx <= currentStageIndex ? 'bg-[#4c8644]' : 'bg-slate-200'}`}
              />
            ))}
          </div>
          <p className="mt-2 font-['Montserrat_Alternates',sans-serif] text-[10px] text-slate-400">
            Fase {currentStageIndex + 1} dari {stages.length}
          </p>
        </div>
      </div>
      
      <button
        onClick={() => setIsLogOpen(true)}
        className="mt-7 bg-[#438347] hover:bg-[#366c3a] active:scale-95 text-white font-['Montserrat_Alternates',sans-serif] font-semibold text-[12px] px-8 py-2.5 rounded-full shadow-md transition-all flex items-center gap-2"
      >
        <span>Update Kondisi Lahan</span>
      </button>
    </section>
  );
}
