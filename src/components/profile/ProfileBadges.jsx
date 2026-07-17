import React from 'react';
import { RiArrowRightLine, RiLockFill, RiMedal2Fill } from 'react-icons/ri';

export default function ProfileBadges() {
  const badges = [
    {
      id: 'panen_pertama',
      title: 'Panen\nPertama',
      icon: '🌱',
      unlocked: true,
      bg: 'bg-gradient-to-b from-[#f0f7ec] to-[#e4eed9]',
      border: 'border-[#578a3e]',
      shadow: 'shadow-[#578a3e]/15'
    },
    {
      id: 'streak_7',
      title: '7-Hari\nStreak',
      icon: '📅',
      badgeNum: '7',
      unlocked: true,
      bg: 'bg-gradient-to-b from-[#f0f7ec] to-[#d8e6cb]',
      border: 'border-[#28502d]',
      shadow: 'shadow-[#28502d]/15'
    },
    {
      id: 'pelindung_air',
      title: 'Pelindung\nAir',
      icon: '💧',
      unlocked: true,
      bg: 'bg-gradient-to-b from-[#eff6ff] to-[#dbeafe]',
      border: 'border-blue-400',
      shadow: 'shadow-blue-500/15'
    },
    {
      id: 'ahli_nasi',
      title: 'Ahli\nNasi',
      icon: '🌾',
      unlocked: true,
      bg: 'bg-gradient-to-b from-[#fef9e8] to-[#fef0c7]',
      border: 'border-[#fcbe3c]',
      shadow: 'shadow-[#fcbe3c]/15'
    },
    {
      id: 'streak_30',
      title: '30-Hari\nStreak',
      icon: <RiLockFill className="w-5 h-5 text-slate-400" />,
      unlocked: false,
      bg: 'bg-gradient-to-b from-slate-100 to-slate-200/80',
      border: 'border-slate-300/80',
      shadow: 'shadow-slate-300/10'
    },
    {
      id: 'si_rajin',
      title: 'Si-Rajin',
      icon: <RiLockFill className="w-5 h-5 text-slate-400" />,
      unlocked: false,
      bg: 'bg-gradient-to-b from-slate-100 to-slate-200/80',
      border: 'border-slate-300/80',
      shadow: 'shadow-slate-300/10'
    }
  ];

  return (
    <div className="bg-[#fbf9f3] rounded-[24px] p-4 sm:p-5 border border-slate-200/80 shadow-xs mt-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-3.5">
        <h3 className="font-['Montserrat_Alternates',sans-serif] font-bold text-sm sm:text-base text-[#3c3b3b]">
          Pencapaian
        </h3>
        <button 
          type="button"
          className="text-xs font-bold text-[#578a3e] hover:text-[#28502d] transition flex items-center gap-1 cursor-pointer"
        >
          <span>Lihat Semua</span>
          <RiArrowRightLine className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5 pt-1">
        {badges.map((badge) => (
          <div key={badge.id} className="flex flex-col items-center group select-none">
            {/* Hexagon / Shield Badge Container */}
            <div 
              className={`size-14 sm:size-15 rounded-[18px] border-[2.5px] ${badge.bg} ${badge.border} shadow-sm ${badge.shadow} flex flex-col items-center justify-center relative transition-transform duration-300 group-hover:scale-105`}
            >
              {typeof badge.icon === 'string' ? (
                <div className="relative flex flex-col items-center justify-center">
                  <span className="text-2xl sm:text-[26px] leading-none select-none">{badge.icon}</span>
                  {badge.badgeNum && (
                    <span className="absolute inset-0 flex items-center justify-center font-black text-[11px] text-[#28502d] pt-1">
                      {badge.badgeNum}
                    </span>
                  )}
                </div>
              ) : (
                badge.icon
              )}
            </div>

            {/* Badge Title */}
            <span className={`text-[10px] font-['Montserrat_Alternates',sans-serif] font-bold text-center mt-1.5 whitespace-pre-line leading-tight ${
              badge.unlocked ? 'text-[#3c3b3b]' : 'text-slate-400'
            }`}>
              {badge.title}
            </span>
          </div>
        ))}
      </div>

      {/* Progress Bar Footer Row */}
      <div className="flex items-center gap-3 mt-4 pt-3.5 border-t border-slate-200/60">
        <div className="size-8 sm:size-9 rounded-xl bg-[#28502d] text-white flex items-center justify-center shadow-2xs shrink-0">
          <RiMedal2Fill className="w-4 h-4 font-bold" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="w-full bg-[#e2e8d8] h-2.5 sm:h-3 rounded-full overflow-hidden">
            <div 
              className="bg-[#28502d] h-full rounded-full transition-all duration-700" 
              style={{ width: '14%' }}
            />
          </div>
        </div>

        <span className="text-[10px] sm:text-xs font-bold text-[#525156] shrink-0 font-['Montserrat_Alternates',sans-serif]">
          4 / 28 Badge Terkumpul
        </span>
      </div>
    </div>
  );
}
