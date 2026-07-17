import React, { useState } from 'react';
import { RiMapPinLine, RiRefreshLine, RiSettings4Line, RiInformationLine } from 'react-icons/ri';

export default function ProfilePage({ totalArea = 5150, plots = [], onResetDemoData, refetchLocation, locationData }) {
  const [notifEnabled, setNotifEnabled] = useState(true);
  const [offlineSync, setOfflineSync] = useState(true);
  const [language, setLanguage] = useState('id'); // 'id' | 'en'

  const { kecamatan, provinsi } = locationData || {};

  return (
    <div className="space-y-4 animate-fade-in pb-8">
      {/* Profile Header Banner */}
      <div className="bg-gradient-to-br from-[#28502d] via-[#3a6c3d] to-[#1e3d22] text-white rounded-3xl p-5 shadow-lg relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-white/10 pointer-events-none blur-2xl" />

        <div className="flex items-center gap-4 relative z-10">
          <div className="w-16 h-16 rounded-full border-2 border-white/80 overflow-hidden shadow-md shrink-0 bg-emerald-800">
            <img
              src="/assets/figma/image9.png"
              alt="Avatar Petani"
              className="w-full h-full object-cover"
              onError={(e) => { e.target.src = 'https://via.placeholder.com/64?text=Petani'; }}
            />
          </div>
          <div>
            <h1 className="text-lg font-black font-['Montserrat_Alternates',sans-serif]">
              Budi Santoso
            </h1>
            <p className="text-xs text-emerald-300 font-medium mt-0.5">
              Kelompok Tani Garuda Sukses • ID: GR-8421
            </p>
            <div className="inline-flex items-center gap-1.5 text-[11px] bg-white/10 px-2.5 py-0.5 rounded-full mt-2 border border-white/15">
              <RiMapPinLine className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
              <span>{kecamatan || 'Bumiaji'}, {provinsi || 'Jawa Timur'}</span>
            </div>
          </div>
        </div>

        {/* Farm Stats Summary Grid */}
        <div className="grid grid-cols-2 gap-2 mt-5 pt-4 border-t border-white/15">
          <div className="bg-white/10 rounded-2xl p-3 backdrop-blur-2xs">
            <span className="text-slate-300 text-[11px] block">Total Luas Kelola</span>
            <span className="text-base font-black text-emerald-400">{totalArea} m²</span>
            <span className="text-[10px] text-slate-400 block">(~{(totalArea / 10000).toFixed(2)} Hektar)</span>
          </div>
          <div className="bg-white/10 rounded-2xl p-3 backdrop-blur-2xs">
            <span className="text-slate-300 text-[11px] block">Lahan Terdaftar</span>
            <span className="text-base font-black text-white">{plots.length} Plot</span>
            <span className="text-[10px] text-emerald-300 block">Semua Aktif</span>
          </div>
        </div>
      </div>

      {/* Settings Section 1: Lokasi & Sensor */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-3.5">
        <div className="flex items-center gap-1.5 border-b border-slate-100 pb-2">
          <RiMapPinLine className="w-4 h-4 text-emerald-600 shrink-0" />
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Lokasi GPS & Perangkat Capacitor
          </h3>
        </div>

        <div className="flex items-center justify-between text-xs">
          <div>
            <span className="font-bold text-slate-800 block">Deteksi Lokasi Otomatis</span>
            <span className="text-slate-400 text-[11px]">Digunakan untuk prakiraan cuaca & harga regional</span>
          </div>
          <button
            onClick={refetchLocation}
            className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold rounded-xl border border-emerald-200 text-xs active:scale-95 transition-all flex items-center gap-1"
          >
            <RiRefreshLine className="w-3.5 h-3.5 shrink-0" />
            <span>Refresh GPS</span>
          </button>
        </div>
      </div>

      {/* Settings Section 2: Preferensi & Offline Mode */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-3.5">
        <div className="flex items-center gap-1.5 border-b border-slate-100 pb-2">
          <RiSettings4Line className="w-4 h-4 text-emerald-600 shrink-0" />
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Preferensi Aplikasi
          </h3>
        </div>

        {/* Notifikasi Toggle */}
        <div className="flex items-center justify-between text-xs py-1">
          <div>
            <span className="font-bold text-slate-800 block">Notifikasi Tugas Harian</span>
            <span className="text-slate-400 text-[11px]">Pengingat jadwal siram & pupuk pagi hari</span>
          </div>
          <button
            onClick={() => setNotifEnabled(!notifEnabled)}
            className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${notifEnabled ? 'bg-emerald-500' : 'bg-slate-300'
              }`}
          >
            <div className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${notifEnabled ? 'translate-x-6' : 'translate-x-0'
              }`} />
          </button>
        </div>

        {/* Offline Sync Toggle */}
        <div className="flex items-center justify-between text-xs py-1 border-t border-slate-100 pt-2.5">
          <div>
            <span className="font-bold text-slate-800 block">Penyimpanan Offline (Capacitor Sync)</span>
            <span className="text-slate-400 text-[11px]">Simpan log di perangkat saat sinyal di kebun hilang</span>
          </div>
          <button
            onClick={() => setOfflineSync(!offlineSync)}
            className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${offlineSync ? 'bg-emerald-500' : 'bg-slate-300'
              }`}
          >
            <div className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${offlineSync ? 'translate-x-6' : 'translate-x-0'
              }`} />
          </button>
        </div>

        {/* Bahasa */}
        <div className="flex items-center justify-between text-xs py-1 border-t border-slate-100 pt-2.5">
          <div>
            <span className="font-bold text-slate-800 block">Bahasa (Language)</span>
            <span className="text-slate-400 text-[11px]">Bahasa antarmuka aplikasi</span>
          </div>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1 font-bold text-slate-700 outline-none"
          >
            <option value="id">Bahasa Indonesia</option>
            <option value="en">English (US)</option>
          </select>
        </div>
      </div>

      {/* Settings Section 3: Akun & Tentang */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-3 text-xs">
        <div className="flex items-center gap-1.5 border-b border-slate-100 pb-2">
          <RiInformationLine className="w-4 h-4 text-emerald-600 shrink-0" />
          <h3 className="font-bold text-slate-700 uppercase tracking-wider">
            Tentang Aplikasi
          </h3>
        </div>
        <div className="flex justify-between py-1">
          <span className="text-slate-400">Versi Aplikasi</span>
          <span className="font-bold text-slate-800">v0.1.0 (Capacitor Mobile Build)</span>
        </div>
        <div className="flex justify-between py-1">
          <span className="text-slate-400">Database Engine</span>
          <span className="font-bold text-emerald-600">Supabase + Local Cache Sync</span>
        </div>

        <button
          onClick={() => {
            if (window.confirm('Reset semua data demo ke kondisi awal? Aksi ini tidak dapat dibatalkan.')) {
              onResetDemoData?.();
            }
          }}
          className="w-full mt-3 py-2.5 bg-amber-50 hover:bg-amber-100 text-amber-700 font-bold rounded-xl border border-amber-200 transition-all text-center flex items-center justify-center gap-1.5"
        >
          <RiRefreshLine className="w-4 h-4 shrink-0" />
          <span>Reset Data Demo</span>
        </button>

        <button
          onClick={() => alert('Fitur keluar akun dan pencadangan data ke cloud siap diaktifkan.')}
          className="w-full mt-3 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold rounded-xl border border-rose-200 transition-all text-center"
        >
          Keluar dari Akun
        </button>
      </div>
    </div>
  );
}