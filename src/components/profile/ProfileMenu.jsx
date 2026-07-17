import React, { useState } from 'react';
import { 
  RiQuestionLine, RiFileTextLine, RiLogoutBoxRLine, RiArrowRightSLine, 
  RiCloseLine, RiRefreshLine, RiInformationFill, RiMailSendLine, RiCheckLine 
} from 'react-icons/ri';
import Toggle from '../ui/Toggle';

export default function ProfileMenu({ onSignOut, onResetDemoData }) {
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  
  // Local preferences state preserved inside About/Settings modal
  const [notifEnabled, setNotifEnabled] = useState(true);
  const [offlineSync, setOfflineSync]   = useState(true);
  const [language, setLanguage]         = useState('id');

  return (
    <>
      <div className="bg-[#fbf9f3] rounded-[24px] p-2 sm:p-2.5 border border-slate-200/80 shadow-xs mt-4 divide-y divide-slate-100/80">
        {/* Item 1: Bantuan & Dukungan */}
        <div
          onClick={() => setShowHelpModal(true)}
          className="flex items-center justify-between py-3.5 px-3.5 hover:bg-slate-50/80 active:bg-slate-100/70 rounded-xl transition-all cursor-pointer select-none group"
        >
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center transition group-hover:bg-[#578a3e] group-hover:text-white">
              <RiQuestionLine className="w-4.5 h-4.5 font-bold" />
            </div>
            <span className="font-['Montserrat_Alternates',sans-serif] font-bold text-xs sm:text-sm text-[#3c3b3b]">
              Bantuan & Dukungan
            </span>
          </div>
          <RiArrowRightSLine className="w-5 h-5 text-slate-400 group-hover:text-slate-600 transition" />
        </div>

        {/* Item 2: Tentang Aplikasi */}
        <div
          onClick={() => setShowAboutModal(true)}
          className="flex items-center justify-between py-3.5 px-3.5 hover:bg-slate-50/80 active:bg-slate-100/70 rounded-xl transition-all cursor-pointer select-none group"
        >
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center transition group-hover:bg-[#578a3e] group-hover:text-white">
              <RiFileTextLine className="w-4.5 h-4.5 font-bold" />
            </div>
            <span className="font-['Montserrat_Alternates',sans-serif] font-bold text-xs sm:text-sm text-[#3c3b3b]">
              Tentang Aplikasi
            </span>
          </div>
          <RiArrowRightSLine className="w-5 h-5 text-slate-400 group-hover:text-slate-600 transition" />
        </div>

        {/* Item 3: Keluar */}
        <div
          onClick={onSignOut}
          className="flex items-center justify-between py-3.5 px-3.5 hover:bg-rose-50/80 active:bg-rose-100/70 rounded-xl transition-all cursor-pointer select-none group"
        >
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-xl bg-rose-100/70 text-rose-500 flex items-center justify-center transition group-hover:bg-rose-500 group-hover:text-white">
              <RiLogoutBoxRLine className="w-4.5 h-4.5 font-bold" />
            </div>
            <span className="font-['Montserrat_Alternates',sans-serif] font-bold text-xs sm:text-sm text-rose-500">
              Keluar
            </span>
          </div>
          <RiArrowRightSLine className="w-5 h-5 text-rose-300 group-hover:text-rose-500 transition" />
        </div>
      </div>

      {/* Modal Tentang Aplikasi & Preferensi */}
      {showAboutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
          <div className="w-full max-w-md bg-[#fbf9f3] rounded-[28px] p-6 shadow-2xl border border-slate-100 flex flex-col relative max-h-[90vh] overflow-y-auto scrollbar-none">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/60">
              <div className="flex items-center gap-2">
                <RiInformationFill className="w-5 h-5 text-[#578a3e]" />
                <h3 className="font-['Montserrat_Alternates',sans-serif] font-bold text-base text-[#3c3b3b]">
                  Tentang Aplikasi & Preferensi
                </h3>
              </div>
              <button
                onClick={() => setShowAboutModal(false)}
                className="size-8 rounded-full bg-slate-200/70 hover:bg-slate-300 flex items-center justify-center text-slate-700 transition cursor-pointer"
              >
                <RiCloseLine className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-4 text-xs">
              <div className="bg-white rounded-2xl p-3.5 border border-slate-200/80 space-y-2.5">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-400 font-medium">Nama Aplikasi</span>
                  <span className="font-bold text-[#28502d] font-['Montserrat_Alternates',sans-serif]">GORA (Green Operations & Rural Agronomy)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-400 font-medium">Versi</span>
                  <span className="font-bold text-slate-800">v0.2.0</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400 font-medium">Database</span>
                  <span className="font-bold text-emerald-600">Supabase PostgreSQL</span>
                </div>
              </div>

              {/* Preferences */}
              <div className="bg-white rounded-2xl p-3.5 border border-slate-200/80 space-y-3.5">
                <h4 className="font-['Montserrat_Alternates',sans-serif] font-bold text-xs text-slate-700 uppercase tracking-wider">
                  Preferensi Aplikasi
                </h4>

                <div className="flex items-center justify-between text-xs py-1">
                  <div>
                    <span className="font-bold text-slate-800 block">Notifikasi Tugas Harian</span>
                    <span className="text-slate-400 text-[11px]">Pengingat jadwal siram & pupuk pagi hari</span>
                  </div>
                  <Toggle enabled={notifEnabled} onChange={setNotifEnabled} />
                </div>

                <div className="flex items-center justify-between text-xs py-1 border-t border-slate-100 pt-2">
                  <div>
                    <span className="font-bold text-slate-800 block">Penyimpanan Offline</span>
                    <span className="text-slate-400 text-[11px]">Simpan log di perangkat saat sinyal di kebun hilang</span>
                  </div>
                  <Toggle enabled={offlineSync} onChange={setOfflineSync} />
                </div>

                <div className="flex items-center justify-between text-xs py-1 border-t border-slate-100 pt-2">
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

              {/* Reset Demo Data Button */}
              <button
                onClick={() => {
                  if (window.confirm('Reset semua data demo ke kondisi awal? Aksi ini tidak dapat dibatalkan.')) {
                    onResetDemoData?.();
                    setShowAboutModal(false);
                  }
                }}
                className="flex items-center justify-center gap-2 w-full py-3 bg-amber-50 hover:bg-amber-100 text-amber-700 font-bold rounded-2xl border border-amber-200 transition-all active:scale-95 cursor-pointer shadow-2xs"
              >
                <RiRefreshLine className="text-base" />
                <span>Reset Data Demo</span>
              </button>
            </div>

            <button
              onClick={() => setShowAboutModal(false)}
              className="w-full py-3 bg-[#28502d] text-white font-['Montserrat_Alternates',sans-serif] font-bold text-sm rounded-2xl hover:bg-[#1f3f23] transition shadow-md cursor-pointer"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      {/* Modal Bantuan & Dukungan */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
          <div className="w-full max-w-md bg-[#fbf9f3] rounded-[28px] p-6 shadow-2xl border border-slate-100 flex flex-col relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/60">
              <div className="flex items-center gap-2">
                <RiQuestionLine className="w-5 h-5 text-[#578a3e]" />
                <h3 className="font-['Montserrat_Alternates',sans-serif] font-bold text-base text-[#3c3b3b]">
                  Bantuan & Dukungan
                </h3>
              </div>
              <button
                onClick={() => setShowHelpModal(false)}
                className="size-8 rounded-full bg-slate-200/70 hover:bg-slate-300 flex items-center justify-center text-slate-700 transition cursor-pointer"
              >
                <RiCloseLine className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-3.5 text-xs">
              <div className="bg-white rounded-2xl p-4 border border-slate-200/80 space-y-2">
                <h4 className="font-['Montserrat_Alternates',sans-serif] font-bold text-sm text-[#28502d]">
                  Bagaimana cara menambah lahan baru?
                </h4>
                <p className="text-slate-600 leading-relaxed">
                  Tekan tombol hijau (+) di bagian tengah menu bawah (Bottom Navigation) atau masuk ke menu Tanaman untuk menambahkan lahan dan komoditas baru.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-4 border border-slate-200/80 space-y-2">
                <h4 className="font-['Montserrat_Alternates',sans-serif] font-bold text-sm text-[#28502d]">
                  Bagaimana cara menjaga streak?
                </h4>
                <p className="text-slate-600 leading-relaxed">
                  Lakukan observasi dan catat log kondisi tanaman minimal 1 kali setiap hari melalui tombol (+) atau di halaman detail lahan.
                </p>
              </div>

              <div className="bg-[#f0f7ec] rounded-2xl p-4 border border-[#c6d5a2] flex items-center justify-between gap-3">
                <div>
                  <h4 className="font-['Montserrat_Alternates',sans-serif] font-bold text-sm text-[#28502d]">
                    Butuh bantuan tim GORA?
                  </h4>
                  <p className="text-slate-600 text-[11px] mt-0.5">
                    Hubungi agronomis atau tim teknis kami via email.
                  </p>
                </div>
                <a
                  href="mailto:support@gora.id"
                  className="px-3.5 py-2 bg-[#28502d] text-white rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-xs shrink-0 hover:bg-[#1f3f23] transition"
                >
                  <RiMailSendLine />
                  <span>Email</span>
                </a>
              </div>
            </div>

            <button
              onClick={() => setShowHelpModal(false)}
              className="w-full py-3 bg-[#28502d] text-white font-['Montserrat_Alternates',sans-serif] font-bold text-sm rounded-2xl hover:bg-[#1f3f23] transition shadow-md cursor-pointer"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </>
  );
}
