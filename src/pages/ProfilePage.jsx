import React, { useState } from 'react';
import useUserLocation from '../hooks/useUserLocation';

export default function ProfilePage({ plots }) {
  const { provinsi, kecamatan, refetch: refetchLocation } = useUserLocation();
  const [notifEnabled, setNotifEnabled] = useState(true);
  const [offlineSync, setOfflineSync] = useState(true);
  const [language, setLanguage] = useState('id'); // 'id' | 'en'

  const totalArea = plots.reduce((acc, p) => acc + Number(p.area || 0), 0);

  return (
    <div className="space-y-4 animate-fade-in pb-6">
      {/* Profile Header Card */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white rounded-3xl p-5 shadow-lg relative overflow-hidden">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-2xl font-black text-white shadow-md border-2 border-white/20">
            BS
          </div>
          <div>
            <h1 className="text-xl font-black font-['Montserrat_Alternates',sans-serif]">
              Budi Santoso
            </h1>
            <p className="text-xs text-emerald-300 font-medium mt-0.5">
              Kelompok Tani Garuda Sukses • ID: GR-8421
            </p>
            <div className="inline-flex items-center gap-1 text-[11px] bg-white/10 px-2.5 py-0.5 rounded-full mt-2 border border-white/15">
              <span>📍 {kecamatan || 'Bumiaji'}, {provinsi || 'Jawa Timur'}</span>
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
        <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider border-b border-slate-100 pb-2">
          📍 Lokasi GPS & Perangkat Capacitor
        </h3>

        <div className="flex items-center justify-between text-xs">
          <div>
            <span className="font-bold text-slate-800 block">Deteksi Lokasi Otomatis</span>
            <span className="text-slate-400 text-[11px]">Digunakan untuk prakiraan cuaca & harga regional</span>
          </div>
          <button
            onClick={refetchLocation}
            className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold rounded-xl border border-emerald-200 text-xs active:scale-95 transition-all"
          >
            🔄 Refresh GPS
          </button>
        </div>
      </div>

      {/* Settings Section 2: Preferensi & Offline Mode */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-3.5">
        <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider border-b border-slate-100 pb-2">
          ⚙️ Preferensi Aplikasi
        </h3>

        {/* Notifikasi Toggle */}
        <div className="flex items-center justify-between text-xs py-1">
          <div>
            <span className="font-bold text-slate-800 block">Notifikasi Tugas Harian</span>
            <span className="text-slate-400 text-[11px]">Pengingat jadwal siram & pupuk pagi hari</span>
          </div>
          <button
            onClick={() => setNotifEnabled(!notifEnabled)}
            className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
              notifEnabled ? 'bg-emerald-500' : 'bg-slate-300'
            }`}
          >
            <div className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
              notifEnabled ? 'translate-x-6' : 'translate-x-0'
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
            className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
              offlineSync ? 'bg-emerald-500' : 'bg-slate-300'
            }`}
          >
            <div className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
              offlineSync ? 'translate-x-6' : 'translate-x-0'
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
        <h3 className="font-bold text-slate-700 uppercase tracking-wider border-b border-slate-100 pb-2">
          ℹ️ Tentang Aplikasi
        </h3>
        <div className="flex justify-between py-1">
          <span className="text-slate-400">Versi Aplikasi</span>
          <span className="font-bold text-slate-800">v0.1.0 (Capacitor Mobile Build)</span>
        </div>
        <div className="flex justify-between py-1">
          <span className="text-slate-400">Database Engine</span>
          <span className="font-bold text-emerald-600">Supabase + Local Cache Sync</span>
        </div>

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
