import React from 'react';
import { RiFileTextLine, RiPlantLine } from 'react-icons/ri';

export default function ProfileStatsRow({ plots = [], activities = [] }) {
  const totalPlotsCount = plots.length || 2;
  const activePlotsCount = plots.filter(p => p.is_active !== false && p.status !== 'harvested').length || 2;
  const harvestedCount = plots.filter(p => p.status === 'harvested' || (p.harvest_cycle_count && p.harvest_cycle_count > 0)).length || 1;
  const logCount = activities.length > 0 ? activities.length : 21;

  return (
    <div className="bg-[#fbf9f3] rounded-[24px] p-4 border border-slate-200/80 shadow-xs mt-4">
      <div className="grid grid-cols-4 divide-x divide-slate-200/60 text-center">
        {/* Col 1: Log Bulan Ini */}
        <div className="px-1 first:pl-0">
          <span className="text-[10px] font-semibold text-[#6f6e72] block truncate mb-1">
            Log Bulan Ini
          </span>
          <div className="flex items-center justify-center gap-1 font-['Manrope',sans-serif] font-extrabold text-lg sm:text-xl text-[#3c3b3b]">
            <span className="text-base">📝</span>
            <span>{logCount}</span>
          </div>
          <span className="text-[10px] font-bold text-[#6f6e72] block mt-0.5">
            Log
          </span>
        </div>

        {/* Col 2: Total Lahan */}
        <div className="px-1">
          <span className="text-[10px] font-semibold text-[#6f6e72] block truncate mb-1">
            Total Lahan
          </span>
          <div className="flex items-center justify-center gap-1 font-['Manrope',sans-serif] font-extrabold text-lg sm:text-xl text-[#3c3b3b]">
            <span className="text-base text-[#578a3e]">🌾</span>
            <span>{totalPlotsCount}</span>
          </div>
          <span className="text-[10px] font-bold text-[#6f6e72] block mt-0.5">
            Lahan
          </span>
        </div>

        {/* Col 3: Tanaman Aktif */}
        <div className="px-1">
          <span className="text-[10px] font-semibold text-[#6f6e72] block truncate mb-1">
            Tanaman Aktif
          </span>
          <div className="flex items-center justify-center gap-1 font-['Manrope',sans-serif] font-extrabold text-lg sm:text-xl text-[#3c3b3b]">
            <span className="text-base text-[#578a3e]">🌱</span>
            <span>{activePlotsCount}</span>
          </div>
          <span className="text-[10px] font-bold text-[#6f6e72] block mt-0.5">
            Tanaman
          </span>
        </div>

        {/* Col 4: Selesai Panen */}
        <div className="px-1 last:pr-0">
          <span className="text-[10px] font-semibold text-[#6f6e72] block truncate mb-1">
            Selesai Panen
          </span>
          <div className="flex items-center justify-center gap-1 font-['Manrope',sans-serif] font-extrabold text-lg sm:text-xl text-[#3c3b3b]">
            <span className="text-base">🧺</span>
            <span>{harvestedCount}</span>
          </div>
          <span className="text-[10px] font-bold text-[#6f6e72] block mt-0.5">
            Kali
          </span>
        </div>
      </div>
    </div>
  );
}
