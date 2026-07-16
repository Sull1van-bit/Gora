import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function HargaKomoditas() {
    const [dataHarga, setDataHarga] = useState([]);
    const [loading, setLoading] = useState(true);
    const [waktuUpdate, setWaktuUpdate] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const ambilData = async () => {
        try {
            setErrorMsg('');
            const today = new Date().toISOString().split('T')[0];

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
                setDataHarga([]);
                setErrorMsg('Data untuk hari ini belum tersedia di database.');
            }

            setWaktuUpdate(new Date().toLocaleTimeString('id-ID'));
        } catch (err) {
            console.error('[HargaKomoditas] Error fetch data:', err.message);
            setErrorMsg(`Gagal memuat data: ${err.message}`);
            setDataHarga([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        ambilData();
    }, []);

    if (loading) {
        return (
            <div className="w-full max-w-4xl p-6 mx-auto text-center text-slate-500 font-medium">
                Memuat data...
            </div>
        );
    }

    return (
        <div className="w-full max-w-4xl p-6 bg-white rounded-xl shadow-md border border-slate-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-4 mb-4">
                <div>
                    <h2 className="text-xl font-bold text-slate-800">Market Insight</h2>
                </div>
                <div className="flex items-center gap-2 mt-2 sm:mt-0">
                    {waktuUpdate && (
                        <span className="text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                            {waktuUpdate} WIB
                        </span>
                    )}
                </div>
            </div>

            {errorMsg && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-center justify-between">
                    <span>{errorMsg}</span>
                    <button
                        onClick={() => { setLoading(true); ambilData(); }}
                        className="underline font-semibold hover:text-red-900"
                    >
                        Coba Lagi
                    </button>
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-slate-200 bg-slate-50">
                            <th className="p-3 text-sm font-semibold text-slate-600">Nama Komoditas</th>
                            <th className="p-3 text-sm font-semibold text-slate-600">Satuan</th>
                            <th className="p-3 text-sm font-semibold text-slate-600 text-right">Harga</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {dataHarga.map((item, indeks) => (
                            <tr key={item.id || indeks} className="hover:bg-slate-50/50 transition-colors">
                                <td className="p-3 text-sm font-medium text-slate-700">{item.nama}</td>
                                <td className="p-3 text-sm text-slate-400">/{item.satuan}</td>
                                <td className="p-3 text-sm font-bold text-emerald-600 text-right">
                                    Rp {new Intl.NumberFormat('id-ID').format(item.harga)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}