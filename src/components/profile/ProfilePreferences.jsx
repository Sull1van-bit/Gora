import React from 'react';
import Toggle from '../ui/Toggle';
import { RiSettings4Fill } from 'react-icons/ri';

export default function ProfilePreferences({ 
  notifEnabled, 
  setNotifEnabled, 
  offlineSync, 
  setOfflineSync, 
  language, 
  setLanguage 
}) {
  return (
    <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-3.5">
      <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center gap-1.5">
        <RiSettings4Fill className="text-slate-500 text-sm" /> Preferensi Aplikasi
      </h3>

      <div className="flex items-center justify-between text-xs py-1">
        <div>
          <span className="font-bold text-slate-800 block">Notifikasi Tugas Harian</span>
          <span className="text-slate-400 text-[11px]">Pengingat jadwal siram & pupuk pagi hari</span>
        </div>
        <Toggle enabled={notifEnabled} onChange={setNotifEnabled} />
      </div>

      <div className="flex items-center justify-between text-xs py-1 border-t border-slate-100 pt-2.5">
        <div>
          <span className="font-bold text-slate-800 block">Penyimpanan Offline</span>
          <span className="text-slate-400 text-[11px]">Simpan log di perangkat saat sinyal di kebun hilang</span>
        </div>
        <Toggle enabled={offlineSync} onChange={setOfflineSync} />
      </div>

      <div className="flex items-center justify-between text-xs py-1 border-t border-slate-100 pt-2.5">
        <div>
          <span className="font-bold text-slate-800 block">Bahasa</span>
          <span className="text-slate-400 text-[11px]">Bahasa antarmuka aplikasi</span>
        </div>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1 font-bold text-slate-700 outline-none text-xs"
        >
          <option value="id">Bahasa Indonesia</option>
          <option value="en">English (US)</option>
        </select>
      </div>
    </div>
  );
}
