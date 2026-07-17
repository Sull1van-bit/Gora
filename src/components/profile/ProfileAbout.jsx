import React from 'react';
import { RiInformationFill, RiLogoutBoxRLine, RiRefreshLine } from 'react-icons/ri';

export default function ProfileAbout({ onSignOut, onResetDemoData }) {
  return (
    <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-3 text-xs">
      <h3 className="font-bold text-slate-700 uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center gap-1.5">
        <RiInformationFill className="text-blue-500 text-sm" /> Tentang Aplikasi
      </h3>
      <div className="flex justify-between py-1">
        <span className="text-slate-400">Versi</span>
        <span className="font-bold text-slate-800">v0.2.0</span>
      </div>
      <div className="flex justify-between py-1">
        <span className="text-slate-400">Database</span>
        <span className="font-bold text-emerald-600">Supabase PostgreSQL</span>
      </div>

      <button
        onClick={() => {
          if (window.confirm('Reset semua data demo ke kondisi awal? Aksi ini tidak dapat dibatalkan.')) {
            onResetDemoData?.();
          }
        }}
        className="flex items-center justify-center gap-1.5 w-full mt-3 py-2.5 bg-amber-50 hover:bg-amber-100 text-amber-700 font-bold rounded-xl border border-amber-200 transition-all active:scale-95"
      >
        <RiRefreshLine className="text-lg" /> Reset Data Demo
      </button>

      <button
        onClick={onSignOut}
        className="flex items-center justify-center gap-1.5 w-full mt-3 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold rounded-xl border border-rose-200 transition-all active:scale-95"
      >
        <RiLogoutBoxRLine className="text-lg" /> Keluar dari Akun
      </button>
    </div>
  );
}
