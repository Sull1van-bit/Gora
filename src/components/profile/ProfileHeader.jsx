import React, { useState, useEffect } from 'react';
import { RiEdit2Line, RiCheckLine, RiCloseLine, RiMapPin2Fill, RiFireFill, RiMedal2Fill } from 'react-icons/ri';

export default function ProfileHeader({ 
  profile, 
  profileLoading, 
  plots = [], 
  streakCount = 8, 
  kecamatan, 
  kota, 
  provinsi, 
  updateProfile 
}) {
  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState('');

  useEffect(() => {
    if (profile) {
      setNameInput(profile.full_name || profile.username || 'El Sullivan');
    }
  }, [profile]);

  const displayName = profile?.full_name || profile?.username || 'El Sullivan';
  const locationText = [kecamatan, kota || 'Serpong', provinsi || 'Tangerang'].filter(Boolean).slice(-2).join(', ');
  const memberSince = profile?.created_at 
    ? `Petani Sejak ${new Date(profile.created_at).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}`
    : 'Petani Sejak Mei 2026';

  const handleSaveName = async () => {
    if (updateProfile && nameInput.trim()) {
      await updateProfile({ full_name: nameInput.trim() });
    }
    setEditingName(false);
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Main Profile Info Row */}
      <div className="flex items-start gap-4">
        {/* Avatar Circle with Green Ring */}
        <div className="relative size-[104px] sm:size-[114px] rounded-full p-[3.5px] bg-gradient-to-br from-[#578a3e] to-[#28502d] shadow-sm shrink-0">
          <div className="w-full h-full rounded-full bg-[#e8f1e3] overflow-hidden flex items-center justify-center relative">
            <div className="absolute inset-2 rounded-full bg-[#dcf0d2]/70 -z-0" />
            <img 
              src={profile?.avatar_url || "/assets/figma/streak.svg"} 
              className="w-[92%] h-[92%] object-contain relative z-10 select-none pt-1" 
              alt={displayName}
              onError={(e) => { e.target.src = '/assets/figma/image10.png'; }}
            />
          </div>
        </div>

        {/* Name, Location & Edit Button */}
        <div className="flex-1 min-w-0 pt-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              {editingName ? (
                <div className="flex items-center gap-1.5 mb-1">
                  <input
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    className="bg-white border border-[#578a3e] rounded-xl px-2.5 py-1 text-sm font-['Montserrat_Alternates',sans-serif] font-bold text-[#28502d] outline-none w-full max-w-[160px] shadow-2xs"
                    autoFocus
                    onKeyDown={(e) => e.key === 'Enter' && handleSaveName()}
                  />
                  <button 
                    onClick={handleSaveName} 
                    className="size-7 bg-[#578a3e] hover:bg-[#436c30] text-white rounded-xl flex items-center justify-center transition shrink-0 shadow-2xs cursor-pointer"
                  >
                    <RiCheckLine className="w-4 h-4 font-bold" />
                  </button>
                  <button 
                    onClick={() => setEditingName(false)} 
                    className="size-7 bg-slate-200 hover:bg-slate-300 text-slate-600 rounded-xl flex items-center justify-center transition shrink-0 cursor-pointer"
                  >
                    <RiCloseLine className="w-4 h-4 font-bold" />
                  </button>
                </div>
              ) : (
                <h1 className="font-['Montserrat_Alternates',sans-serif] font-bold text-[22px] sm:text-[24px] text-[#28502d] leading-tight truncate">
                  {profileLoading ? '...' : displayName}
                </h1>
              )}
            </div>

            {!editingName && (
              <button
                onClick={() => setEditingName(true)}
                className="px-3 py-1 rounded-full border border-[#578a3e] bg-white text-[#578a3e] hover:bg-[#578a3e] hover:text-white font-['Montserrat_Alternates',sans-serif] font-bold text-[11px] transition-all flex items-center gap-1 shadow-2xs shrink-0 cursor-pointer active:scale-95"
              >
                <RiEdit2Line className="w-3.5 h-3.5" />
                <span>Edit Profil</span>
              </button>
            )}
          </div>

          <p className="text-[11.5px] sm:text-xs font-semibold text-[#525156] flex items-center gap-1.5 mt-1 truncate">
            <span>📍</span>
            <span className="truncate">{locationText}</span>
          </p>

          <p className="text-[11.5px] sm:text-xs font-semibold text-[#525156] flex items-center gap-1.5 mt-0.5 truncate">
            <span>🌱</span>
            <span className="truncate">{memberSince}</span>
          </p>
        </div>
      </div>

      {/* Two Cards Row: Streak & Level */}
      <div className="grid grid-cols-2 gap-2.5 mt-1.5">
        {/* Streak Card */}
        <div className="bg-[#fef9e8] border border-[#fcbe3c] rounded-[20px] p-3 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-sm select-none">🔥</span>
            <span className="font-['Montserrat_Alternates',sans-serif] font-extrabold text-[10px] text-[#d89710] uppercase tracking-wider">
              Streak Saat Ini
            </span>
          </div>
          <div className="my-1.5">
            <span className="font-['Manrope',sans-serif] font-black text-xl sm:text-2xl text-[#d89710] leading-none">
              {streakCount || 8} Hari
            </span>
          </div>
          <p className="text-[9.5px] font-bold text-[#6f6e72]">
            Pertahankan streak-mu!
          </p>
        </div>

        {/* Level / XP Card */}
        <div className="bg-[#fbf9f3] border border-[#fcbe3c]/60 rounded-[20px] p-3 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center gap-2">
            <div className="size-7 rounded-lg bg-[#578a3e] text-white flex items-center justify-center shrink-0 shadow-2xs">
              <RiMedal2Fill className="w-4 h-4 font-bold" />
            </div>
            <span className="font-['Montserrat_Alternates',sans-serif] font-extrabold text-xs text-[#3c3b3b] truncate">
              Level 3 • Grower
            </span>
          </div>
          <div className="mt-2">
            <div className="w-full bg-[#e2e8d8] h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-[#578a3e] h-full rounded-full transition-all duration-500" 
                style={{ width: '84%' }}
              />
            </div>
            <p className="text-[9.5px] font-bold text-[#6f6e72] mt-1 block text-right sm:text-left">
              420 / 500 XP
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
