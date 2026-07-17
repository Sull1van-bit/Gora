import React from 'react';
import StreakFlame from '../ui/StreakFlame';
import { RiCheckboxCircleFill, RiFocus3Line, RiTrophyFill, RiStarFill } from 'react-icons/ri';

export default function ProfileStreak({ 
  streakCount, 
  streakStatus, 
  longestStreak, 
  isActiveToday, 
  lastActivityDate 
}) {
  const lastActivityLabel = lastActivityDate
    ? new Date(lastActivityDate + 'T00:00:00').toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
    : 'Belum ada aktivitas';

  const streakMsg =
    streakCount === 0  ? <>Mulai log aktivitas hari ini!</>   :
    streakCount === 1  ? <>Hari pertama — jaga konsistensi!</>  :
    streakCount < 7   ? <>{7 - streakCount} hari lagi ke Streak Mingguan <RiFocus3Line className="inline-block ml-0.5 text-blue-500" /></> :
    streakCount < 30  ? <>{30 - streakCount} hari lagi ke Streak Bulanan <RiTrophyFill className="inline-block ml-0.5 text-amber-500" /></> :
    <>Luar biasa! Petani sejati! <RiStarFill className="inline-block ml-0.5 text-yellow-400" /></>;

  return (
    <div className={`rounded-3xl p-5 shadow-xs border ${
      streakStatus === 'hot'  ? 'bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200' :
      streakStatus === 'warm' ? 'bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200' :
      'bg-white border-slate-200'
    }`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Streak Harian</p>
          <div className="flex items-end gap-2">
            <StreakFlame count={streakCount} status={streakStatus} />
            <div>
              <span className={`text-4xl font-black leading-none ${
                streakStatus === 'hot' ? 'text-orange-500' :
                streakStatus === 'warm' ? 'text-amber-500' : 'text-slate-600'
              }`}>{streakCount}</span>
              <span className="text-sm text-slate-400 ml-1">hari</span>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-2">{streakMsg}</p>
        </div>

        <div className="text-right space-y-1">
          <div className="bg-white/80 rounded-2xl px-4 py-2.5 border border-slate-100 shadow-xs">
            <p className="text-[10px] text-slate-400 font-medium">Terpanjang</p>
            <p className="text-xl font-black text-slate-700">{longestStreak} <span className="text-sm font-medium">hari</span></p>
          </div>
          {isActiveToday && (
            <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-100 text-emerald-700 font-bold px-2.5 py-1 rounded-full border border-emerald-200">
              <RiCheckboxCircleFill className="text-sm" /> Aktif Hari Ini
            </span>
          )}
        </div>
      </div>

      
      <div className="mt-4">
        <div className="flex justify-between text-[10px] text-slate-400 mb-1">
          <span>0</span>
          <span>Target: {streakCount < 7 ? '7 hari' : streakCount < 30 ? '30 hari' : '100 hari'}</span>
          <span>{streakCount < 7 ? 7 : streakCount < 30 ? 30 : 100}</span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ${
              streakStatus === 'hot' ? 'bg-gradient-to-r from-orange-400 to-amber-400' :
              streakStatus === 'warm' ? 'bg-gradient-to-r from-amber-400 to-yellow-400' :
              'bg-emerald-400'
            }`}
            style={{ width: `${Math.min(100, (streakCount / (streakCount < 7 ? 7 : streakCount < 30 ? 30 : 100)) * 100)}%` }}
          />
        </div>
        <p className="text-[10px] text-slate-400 mt-1.5">
          Aktivitas terakhir: {lastActivityLabel}
        </p>
      </div>
    </div>
  );
}
