import React, { useState } from 'react';
import useMarketPrices from '../hooks/useMarketPrices';
import useUserLocation from '../hooks/useUserLocation';
import { INITIAL_KOMODITAS } from '../services/dataStore';
import { RiMapPin2Fill, RiLoader4Line, RiLineChartLine, RiGlobalLine, RiTimeLine, RiRefreshLine, RiSearchLine, RiCloseLine, RiLightbulbFlashLine, RiBox3Line, RiLeafFill, RiPlantFill, RiSeedlingFill } from 'react-icons/ri';

const FALLBACK_PRICES = INITIAL_KOMODITAS.map((k) => ({
  id: k.id,
  nama: k.nama,
  harga: k.avgPrice,
  satuan: k.satuan,
  icon: k.icon,
  perubahan: k.trend === 'up' ? 5.0 : k.trend === 'down' ? -5.0 : 0,
  wilayah: 'Pasar Induk (Data Referensi)',
}));

function TrendArrow({ perubahan }) {
  if (perubahan == null) return null;
  const n = Number(perubahan);
  if (n > 0) return <span className="ml-1 text-emerald-500 font-bold">↑ {n.toFixed(1)}%</span>;
  if (n < 0) return <span className="ml-1 text-rose-500 font-bold">↓ {Math.abs(n).toFixed(1)}%</span>;
  return <span className="ml-1 text-slate-400">→</span>;
}

export default function HargaKomoditas() {
  const [searchQuery, setSearchQuery] = useState('');

  const {
    lat, lon,
    kecamatan, kota, provinsi,
    loading: locLoading,
    error: locError,
  } = useUserLocation();

  const {
    prices,
    nearestWilayah,
    loading: pricesLoading,
    error: pricesError,
    lastUpdated,
    refetch,
  } = useMarketPrices({ lat, lon });

  const loading = locLoading || pricesLoading;
  const isFallback = prices.length === 0 && !pricesLoading;
  const dataHarga = isFallback ? FALLBACK_PRICES : prices;

  const filteredHarga = dataHarga.filter(
    (item) =>
      item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.wilayah && item.wilayah.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const waktuUpdate = lastUpdated
    ? lastUpdated.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    : null;

  const lokasiLabel = nearestWilayah
    ? `${nearestWilayah.nama_pasar ?? [nearestWilayah.kecamatan, nearestWilayah.kota].filter(Boolean).join(', ')} (${nearestWilayah.jarak_km?.toFixed(1)} km)`
    : !locLoading && !locError && (kecamatan || kota || provinsi)
    ? [kecamatan, kota, provinsi].filter(Boolean).join(', ')
    : null;

  if (loading) {
    return (
      <div className="w-full p-8 flex items-center justify-center text-slate-500 font-medium animate-pulse gap-2">
        <RiLoader4Line className="animate-spin text-lg" />
        {locLoading ? 'Mendeteksi lokasi Anda...' : 'Memuat data harga pasar...'}
      </div>
    );
  }

  return (
    <div className="space-y-3 animate-fade-in">
      <div className="relative">
        <input
          type="text"
          placeholder="Cari komoditas atau wilayah..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white border border-slate-200 rounded-2xl pl-10 pr-4 py-2.5 text-xs font-medium focus:ring-2 focus:ring-emerald-500 outline-none shadow-2xs transition-all"
        />
        <RiSearchLine className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600 bg-slate-100 rounded-full w-5 h-5 flex items-center justify-center font-bold"
          ><RiCloseLine /></button>
        )}
      </div>

      
      {(isFallback || pricesError) && (
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-800 flex items-center gap-1.5">
          <RiLightbulbFlashLine className="shrink-0 text-base" />
          <span>
            {pricesError ? 'Koneksi gagal — ' : 'Data pasar belum tersedia — '}
            Menampilkan harga referensi.
          </span>
        </div>
      )}

      
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/80">
              <th className="p-3.5 text-[11px] font-bold text-slate-500 uppercase tracking-wide">Komoditas</th>
              <th className="p-3.5 text-[11px] font-bold text-slate-500 uppercase tracking-wide hidden sm:table-cell">Wilayah</th>
              <th className="p-3.5 text-[11px] font-bold text-slate-500 uppercase tracking-wide text-right">Harga / Sat.</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredHarga.map((item, idx) => (
              <tr key={item.id ?? idx} className="hover:bg-emerald-50/30 transition-colors">
                <td className="p-3.5">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl leading-none text-emerald-600">
                      {item.nama.includes('Tomat') ? <RiPlantFill /> :
                       item.nama.includes('Cabai') ? <RiLeafFill /> :
                       item.nama.includes('Padi') ? <RiSeedlingFill /> :
                       <RiLeafFill />}
                    </span>
                    <span className="text-xs font-bold text-slate-800">{item.nama}</span>
                  </div>
                </td>
                <td className="p-3.5 text-xs text-slate-400 font-medium hidden sm:table-cell">
                  {item.wilayah || '—'}
                </td>
                <td className="p-3.5 text-right">
                  <span className="text-xs font-extrabold text-emerald-600">
                    Rp {new Intl.NumberFormat('id-ID').format(item.harga)}
                  </span>
                  <span className="text-[11px] text-slate-400">/{item.satuan}</span>
                  <TrendArrow perubahan={item.perubahan} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredHarga.length === 0 && (
          <div className="p-6 text-center text-xs text-slate-400">
            Tidak ditemukan komoditas dengan kata kunci tersebut.
          </div>
        )}
      </div>

      {isFallback && (
        <p className="text-center text-[10px] text-slate-300 pb-1">
          Data referensi • Aktifkan lokasi untuk harga pasar terdekat
        </p>
      )}
    </div>
  );
}