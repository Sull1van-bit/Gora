import React, { useState, useEffect } from 'react';
import { RiLineChartLine, RiTimeLine, RiSearchLine, RiCloseLine, RiLightbulbLine, RiArrowUpSLine, RiArrowDownSLine } from 'react-icons/ri';
import UniversalIcon from '../utils/iconHelper';
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
                .from('harga_pasar')
                .select('*')
                .eq('tanggal', today)
                .order('nama_komoditas');

            if (error || !data || data.length === 0) {
                const fallbackFromDB = await fetchLatestAvailable();
                if (fallbackFromDB.length > 0) {
                    setDataHarga(fallbackFromDB);
                } else {
                    setDataHarga(fallbackData);
                }
            } else {
                setDataHarga(data.map(item => ({
                    id: item.id,
                    nama: item.nama_komoditas,
                    harga: item.harga,
                    satuan: item.satuan || 'Kg',
                    trend: item.trend || 'stable',
                    icon: item.icon || 'rice',
                    wilayah: item.wilayah || 'Pasar Induk Batu',
                })));
            }
            setWaktuUpdate(new Date().toLocaleTimeString('id-ID'));
        } catch (err) {
            console.error('Error fetching market prices:', err);
            setDataHarga(fallbackData);
            setErrorMsg('Menggunakan data pasar referensi offline.');
        } finally {
            setLoading(false);
        }
    };

    const fetchLatestAvailable = async () => {
        if (!supabase) return [];
        const { data } = await supabase
            .from('harga_pasar')
            .select('*')
            .order('tanggal', { ascending: false })
            .limit(10);
        if (!data) return [];
        return data.map(item => ({
            id: item.id,
            nama: item.nama_komoditas,
            harga: item.harga,
            satuan: item.satuan || 'Kg',
            trend: item.trend || 'stable',
            icon: item.icon || 'rice',
            wilayah: item.wilayah || 'Pasar Induk Batu',
        }));
    };

    useEffect(() => {
        ambilData();
    }, []);

    const filteredHarga = dataHarga.filter(item =>
        item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.wilayah.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-3 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-2">
                <div>
                    <h2 className="text-base font-extrabold text-slate-800 font-['Montserrat_Alternates',sans-serif] flex items-center gap-1.5">
                        <RiLineChartLine className="w-5 h-5 text-emerald-600 shrink-0" />
                        <span>Harga Komoditas Pasar (Market Insight)</span>
                    </h2>
                    <p className="text-xs text-slate-500">Pantau fluktuasi harga komoditas pertanian harian</p>
                </div>
                <div className="flex items-center gap-2 mt-2 sm:mt-0">
                    {waktuUpdate && (
                        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1.5">
                            <RiTimeLine className="w-3.5 h-3.5 shrink-0" />
                            <span>{waktuUpdate} WIB</span>
                        </span>
                    )}
                </div>
            </div>

            {/* Search filter */}
            <div className="relative">
                <input
                    type="text"
                    placeholder="Cari komoditas atau wilayah pasar..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-2xl pl-10 pr-4 py-2.5 text-xs font-medium focus:ring-2 focus:ring-emerald-500 outline-none shadow-2xs transition-all"
                />
                <RiSearchLine className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                {searchQuery && (
                    <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600 bg-slate-100 rounded-full w-5 h-5 flex items-center justify-center font-bold"
                    >
                        <RiCloseLine className="w-4 h-4" />
                    </button>
                )}
            </div>

            {errorMsg && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-800 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                        <RiLightbulbLine className="w-4 h-4 text-amber-600 shrink-0" />
                        <span>{errorMsg}</span>
                    </span>
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
                                    <UniversalIcon icon={item.icon || 'rice'} className="w-5 h-5 text-emerald-600 shrink-0" />
                                    <span>{item.nama}</span>
                                </td>
                                <td className="p-3.5 text-xs text-slate-500 font-medium">
                                    {item.wilayah}
                                </td>
                                <td className="p-3.5 text-xs font-extrabold text-emerald-600 text-right">
                                    Rp {new Intl.NumberFormat('id-ID').format(item.harga)}
                                    <span className="text-slate-400 font-normal">/{item.satuan}</span>
                                    {item.trend && (
                                        <span className={`inline-flex items-center ml-1 font-bold ${item.trend === 'up' ? 'text-emerald-500' : item.trend === 'down' ? 'text-rose-500' : 'text-slate-400'}`}>
                                            {item.trend === 'up' ? <RiArrowUpSLine className="w-4 h-4 inline" /> : item.trend === 'down' ? <RiArrowDownSLine className="w-4 h-4 inline" /> : '—'}
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