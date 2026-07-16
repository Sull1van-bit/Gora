import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { INITIAL_KOMODITAS } from '../services/dataStore';

export default function HargaKomoditas() {
    const [dataHarga, setDataHarga] = useState([]);
    const [loading, setLoading] = useState(true);
    const [waktuUpdate, setWaktuUpdate] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const fallbackData = INITIAL_KOMODITAS.map(kom => ({
        id: kom.id,
        nama: kom.nama,
        harga: kom.avgPrice,
        satuan: kom.satuan,
        trend: kom.trend,
        icon: kom.icon,
        wilayah: 'Pasar Induk Batu & Malang (Data Referensi)',
    }));

    const ambilData = async () => {
        try {
            setErrorMsg('');
            const today = new Date().toISOString().split('T')[0];

            if (!supabase) {
                setDataHarga(fallbackData);
                setWaktuUpdate(new Date().toLocaleTimeString('id-ID'));
                setLoading(false);
                return;
            }

            const { data, error } = await supabase
                .from('harga_harian')
                .select(`
                    id,
                    harga,
                    tanggal,
                    komoditas:komoditas_id ( nama, satuan ),
                    wilayah:wilayah_id ( provinsi, kota, kecamatan )
                `)
                .eq('tanggal', today)
                .order('harga', { ascending: false });

            if (error) throw error;

            if (data && data.length > 0) {
                const uniqueData = [];
                const seen = new Set();
                
                data.forEach((row, idx) => {
                    const nama = row.komoditas?.nama || 'Tidak diketahui';
                    if (!seen.has(nama)) {
                        seen.add(nama);
                        uniqueData.push({
                            id: row.id || idx,
                            nama,
                            harga: row.harga,
                            satuan: row.komoditas?.satuan || 'kg',
                            wilayah: row.wilayah
                                ? `${row.wilayah.kecamatan}, ${row.wilayah.kota}`
                                : 'Tidak diketahui',
                        });
                    }
                });
                setDataHarga(uniqueData);
            } else {
                setDataHarga(fallbackData);
                setErrorMsg('Data Supabase hari ini belum tersedia — menampilkan harga referensi terkini.');
            }

            setWaktuUpdate(new Date().toLocaleTimeString('id-ID'));
        } catch (err) {
            console.warn('[HargaKomoditas] Menggunakan data referensi:', err.message);
            setErrorMsg('Mode offline aktif — menampilkan harga referensi pasar terkini.');
            setDataHarga(fallbackData);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        ambilData();
    }, []);

    const filteredHarga = dataHarga.filter(item =>
        item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.wilayah && item.wilayah.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    if (loading) {
        return (
            <div className="w-full max-w-4xl p-8 mx-auto text-center text-slate-500 font-medium">
                Memuat data harga pasar...
            </div>
        );
    }

    return (
        <div className="space-y-3 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-2">
                <div>
                    <h2 className="text-base font-extrabold text-slate-800 font-['Montserrat_Alternates',sans-serif]">
                        📈 Harga Komoditas Pasar (Market Insight)
                    </h2>
                    <p className="text-xs text-slate-500">Pantau fluktuasi harga komoditas pertanian harian</p>
                </div>
                <div className="flex items-center gap-2 mt-2 sm:mt-0">
                    {waktuUpdate && (
                        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                            🕒 {waktuUpdate} WIB
                        </span>
                    )}
                </div>
            </div>

            {/* Search filter */}
            <div className="relative">
                <input
                    type="text"
                    placeholder="🔍 Cari komoditas atau wilayah pasar..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-2xl pl-10 pr-4 py-2.5 text-xs font-medium focus:ring-2 focus:ring-emerald-500 outline-none shadow-2xs transition-all"
                />
                <svg className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                {searchQuery && (
                    <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600 bg-slate-100 rounded-full w-5 h-5 flex items-center justify-center font-bold"
                    >
                        ✕
                    </button>
                )}
            </div>

            {errorMsg && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-800 flex items-center justify-between">
                    <span>💡 {errorMsg}</span>
                    <button
                        onClick={() => { setLoading(true); ambilData(); }}
                        className="underline font-bold hover:text-amber-900 shrink-0 ml-2"
                    >
                        Refresh
                    </button>
                </div>
            )}

            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-slate-200 bg-slate-50">
                            <th className="p-3.5 text-xs font-bold text-slate-600">Komoditas</th>
                            <th className="p-3.5 text-xs font-bold text-slate-600">Wilayah / Sentra</th>
                            <th className="p-3.5 text-xs font-bold text-slate-600 text-right">Harga / Satuan</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {filteredHarga.map((item, indeks) => (
                            <tr key={item.id || indeks} className="hover:bg-slate-50/70 transition-colors">
                                <td className="p-3.5 text-xs font-bold text-slate-800 flex items-center gap-2">
                                    <span className="text-xl">{item.icon || '📦'}</span>
                                    <span>{item.nama}</span>
                                </td>
                                <td className="p-3.5 text-xs text-slate-500 font-medium">
                                    {item.wilayah}
                                </td>
                                <td className="p-3.5 text-xs font-extrabold text-emerald-600 text-right">
                                    Rp {new Intl.NumberFormat('id-ID').format(item.harga)}
                                    <span className="text-slate-400 font-normal">/{item.satuan}</span>
                                    {item.trend && (
                                        <span className={`ml-1 font-bold ${item.trend === 'up' ? 'text-emerald-500' : item.trend === 'down' ? 'text-rose-500' : 'text-slate-400'}`}>
                                            {item.trend === 'up' ? '↑' : item.trend === 'down' ? '↓' : '→'}
                                        </span>
                                    )}
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
        </div>
    );
}