import React from 'react';
import { RiFileTextLine, RiCheckboxCircleLine, RiBookOpenLine, RiTrophyFill, RiStarFill } from 'react-icons/ri';

export default function ProfileWeeklyAndRecords({ longestStreak = 21, activities = [], actions = [] }) {
  const weeklyLogs = activities.length > 0 ? Math.min(activities.length, 7) : 7;
  const completedTasks = actions.filter(a => a.status === 'completed').length || 2;
  const longestStreakValue = longestStreak || 21;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-4">
      {/* Statistik Minggu Ini */}
      <div className="bg-[#fbf9f3] rounded-[24px] p-4 sm:p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
        <h3 className="font-['Montserrat_Alternates',sans-serif] font-bold text-sm sm:text-base text-[#3c3b3b] mb-3.5">
          Statistik Minggu Ini
        </h3>

        <div className="space-y-3 my-auto">
          {/* Item 1: Log dibuat */}
          <div className="flex items-center justify-between gap-3">
            <div className="size-8 rounded-xl bg-[#fef9e8] text-[#d89710] flex items-center justify-center shrink-0 shadow-2xs">
              <RiFileTextLine className="w-4 h-4 font-bold" />
            </div>
            <span className="font-bold text-xs sm:text-sm text-[#525156] flex-1">
              Log dibuat
            </span>
            <span className="font-extrabold text-sm sm:text-base text-[#3c3b3b]">
              {weeklyLogs}
            </span>
          </div>

          {/* Item 2: Tugas Selesai */}
          <div className="flex items-center justify-between gap-3">
            <div className="size-8 rounded-xl bg-[#f0f7ec] text-[#578a3e] flex items-center justify-center shrink-0 shadow-2xs">
              <RiCheckboxCircleLine className="w-4 h-4 font-bold" />
            </div>
            <span className="font-bold text-xs sm:text-sm text-[#525156] flex-1">
              Tugas Selesai
            </span>
            <span className="font-extrabold text-sm sm:text-base text-[#3c3b3b]">
              {completedTasks}
            </span>
          </div>

          {/* Item 3: Baca Artikel */}
          <div className="flex items-center justify-between gap-3">
            <div className="size-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 shadow-2xs">
              <RiBookOpenLine className="w-4 h-4 font-bold" />
            </div>
            <span className="font-bold text-xs sm:text-sm text-[#525156] flex-1">
              Baca Artikel
            </span>
            <span className="font-extrabold text-sm sm:text-base text-[#3c3b3b]">
              3
            </span>
          </div>
        </div>
      </div>

      {/* Rekor Card */}
      <div className="bg-[#fbf9f3] rounded-[24px] p-4 sm:p-5 border border-slate-200/80 shadow-xs relative overflow-hidden flex flex-col justify-between min-h-[170px]">
        <h3 className="font-['Montserrat_Alternates',sans-serif] font-bold text-sm sm:text-base text-[#3c3b3b] mb-2 z-10">
          Rekor
        </h3>

        <div className="text-center my-auto py-2 z-10 space-y-3">
          <div>
            <p className="text-[11px] sm:text-xs font-bold text-[#6f6e72]">
              Streak Terpanjang
            </p>
            <div className="flex items-center justify-center gap-1.5 mt-0.5">
              <span className="text-base sm:text-lg">🏆</span>
              <span className="font-['Manrope',sans-serif] font-black text-base sm:text-lg text-[#3c3b3b]">
                {longestStreakValue} Hari
              </span>
            </div>
          </div>

          <div>
            <p className="text-[11px] sm:text-xs font-bold text-[#6f6e72]">
              Total XP
            </p>
            <div className="flex items-center justify-center gap-1.5 mt-0.5">
              <span className="text-base sm:text-lg">⭐</span>
              <span className="font-['Manrope',sans-serif] font-black text-base sm:text-lg text-[#3c3b3b]">
                420 XP
              </span>
            </div>
          </div>
        </div>

        {/* Decorative Sprouts Graphic at Bottom Right */}
        <div className="absolute -bottom-2 -right-1 pointer-events-none opacity-80 select-none">
          <svg className="w-20 h-16 text-[#8ea67a]" viewBox="0 0 100 80" fill="currentColor">
            <path d="M0,80 Q20,65 50,70 Q70,75 100,60 L100,80 Z" fill="#e4eed9" />
            <path d="M75,65 C73,50 63,47 63,47 C70,40 78,50 75,65 Z" fill="#7ba063" />
            <path d="M77,58 C85,46 98,43 98,43 C91,32 78,45 77,58 Z" fill="#8cb272" />
            <path d="M60,68 C58,58 52,55 52,55 C56,50 62,56 60,68 Z" fill="#8cb272" />
            <path d="M62,63 C67,55 75,53 75,53 C70,46 63,54 62,63 Z" fill="#9bc281" />
          </svg>
        </div>
      </div>
    </div>
  );
}
