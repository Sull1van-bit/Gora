import React, { useState, useEffect } from 'react';
import { RiEdit2Fill, RiMapPin2Fill, RiFireFill } from 'react-icons/ri';

export default function ProfileHeader({ 
  profile, 
  profileLoading, 
  plots, 
  streakCount, 
  kecamatan, 
  kota, 
  provinsi, 
  updateProfile 
}) {
  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState('');

  useEffect(() => {
    if (profile) {
      setNameInput(profile.full_name || '');
    }
  }, [profile]);

  const totalArea = plots.reduce((acc, p) => acc + Number(p.area || 0), 0);
  const displayName  = profile?.full_name  || profile?.username || 'Pengguna';
  const displayEmail = profile?.email      || '—';
  const kelompok     = profile?.kelompok_tani || 'Kelompok Tani GORA';
  const initials     = displayName.slice(0, 2).toUpperCase();

  const handleSaveName = async () => {
    await updateProfile({ full_name: nameInput });
    setEditingName(false);
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white rounded-3xl p-5 shadow-lg relative overflow-hidden">
      
      <div className="absolute -top-6 -right-6 w-32 h-32 bg-emerald-600/20 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-2xl font-black text-white shadow-md border-2 border-white/20 shrink-0">
          {initials}
        </div>
        <div className="min-w-0">
          {editingName ? (
            <div className="flex gap-2 items-center">
              <input
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                className="bg-white/10 border border-white/30 rounded-xl px-3 py-1.5 text-sm font-bold text-white outline-none w-36"
                autoFocus
                onKeyDown={(e) => e.key === 'Enter' && handleSaveName()}
              />
              <button onClick={handleSaveName} className="text-xs bg-emerald-500 hover:bg-emerald-400 text-white px-3 py-1.5 rounded-xl font-bold transition">✓</button>
              <button onClick={() => setEditingName(false)} className="text-xs text-white/60 hover:text-white">✕</button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black font-['Montserrat_Alternates',sans-serif] truncate">
                {profileLoading ? '...' : displayName}
              </h1>
              <button onClick={() => setEditingName(true)} className="text-white/40 hover:text-white/80 transition text-sm">
                <RiEdit2Fill />
              </button>
            </div>
          )}
          <p className="text-xs text-emerald-300 font-medium mt-0.5 truncate">{kelompok}</p>
          <p className="text-[11px] text-white/40 truncate">
            {profile?.username ? `@${profile.username} • ` : ''}{displayEmail}
          </p>
          <div className="inline-flex items-center gap-1 text-[11px] bg-white/10 px-2.5 py-0.5 rounded-full mt-2 border border-white/15">
            <RiMapPin2Fill className="text-emerald-400" /> {kecamatan || kota || 'Lokasi'}{provinsi ? `, ${provinsi}` : ''}
          </div>
        </div>
      </div>

      
      <div className="grid grid-cols-3 gap-2 mt-5 pt-4 border-t border-white/15">
        <div className="bg-white/10 rounded-2xl p-3">
          <span className="text-slate-300 text-[11px] block">Total Luas</span>
          <span className="text-sm font-black text-emerald-400">{totalArea} m²</span>
          <span className="text-[10px] text-slate-400 block">~{(totalArea / 10000).toFixed(2)} Ha</span>
        </div>
        <div className="bg-white/10 rounded-2xl p-3">
          <span className="text-slate-300 text-[11px] block">Plot Aktif</span>
          <span className="text-sm font-black text-white">{plots.length}</span>
          <span className="text-[10px] text-emerald-300 block">Terdaftar</span>
        </div>
        <div className="bg-white/10 rounded-2xl p-3">
          <span className="text-slate-300 text-[11px] block">Streak</span>
          <span className="text-sm font-black text-orange-400 flex items-center gap-0.5">
            {streakCount}<RiFireFill />
          </span>
          <span className="text-[10px] text-slate-400 block">hari</span>
        </div>
      </div>
    </div>
  );
}
