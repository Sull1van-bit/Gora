import React from 'react';
import { RiMapPin2Fill, RiRefreshLine } from 'react-icons/ri';

export default function ProfileLocation({ 
  kecamatan, 
  kota, 
  provinsi, 
  refetchLocation 
}) {
  return (
    <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-3.5">
      <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center gap-1.5">
        <RiMapPin2Fill className="text-rose-500 text-sm" /> Lokasi & Harga Pasar
      </h3>
      <div className="flex items-center justify-between text-xs">
        <div>
          <span className="font-bold text-slate-800 block">Deteksi Lokasi Otomatis</span>
          <span className="text-slate-400 text-[11px]">Digunakan untuk harga pasar terdekat & prakiraan cuaca</span>
          {(kecamatan || kota) && (
            <span className="flex items-center gap-1 text-[11px] text-emerald-600 font-semibold mt-0.5">
              <RiMapPin2Fill /> {[kecamatan, kota, provinsi].filter(Boolean).join(', ')}
            </span>
          )}
        </div>
        <button
          onClick={refetchLocation}
          className="flex items-center gap-1 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold rounded-xl border border-emerald-200 text-xs active:scale-95 transition-all shrink-0 ml-2"
        >
          <RiRefreshLine /> Refresh
        </button>
      </div>
    </div>
  );
}
