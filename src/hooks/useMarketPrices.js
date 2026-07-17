import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function useMarketPrices({ lat = null, lon = null } = {}) {
  const [prices, setPrices] = useState([]);
  const [nearestWilayah, setNearestWilayah] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchPrices = useCallback(async () => {
    setLoading(true);
    setError(null);

    if (!supabase) {
      setPrices([]);
      setLoading(false);
      return;
    }

    try {
      let wilayahId = null;
      let wilayahInfo = null;

      if (lat != null && lon != null) {
        const { data: nearest, error: rpcError } = await supabase
          .rpc('get_nearest_wilayah', { p_lat: lat, p_lon: lon });

        if (!rpcError && nearest && nearest.length > 0) {
          wilayahId = nearest[0].wilayah_id;
          wilayahInfo = nearest[0];
          setNearestWilayah(nearest[0]);
        }
      }

      const threeDaysAgo = new Date();
      threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
      const fromDate = threeDaysAgo.toISOString().split('T')[0];

      let query = supabase
        .from('harga_harian')
        .select(`
          id,
          harga,
          tanggal,
          perubahan_persen,
          komoditas:komoditas_id ( id, nama, satuan, icon ),
          wilayah:wilayah_id ( id, provinsi, kota, kecamatan )
        `)
        .gte('tanggal', fromDate)
        .order('tanggal', { ascending: false })
        .order('harga', { ascending: false });

      if (wilayahId) {
        query = query.eq('wilayah_id', wilayahId);
      }

      const { data, error: fetchError } = await query;
      if (fetchError) throw fetchError;

      if (data && data.length > 0) {
        const seen = new Set();
        const unique = [];

        data.forEach((row, idx) => {
          const nama = row.komoditas?.nama ?? 'Tidak diketahui';
          if (!seen.has(nama)) {
            seen.add(nama);
            unique.push({
              id: row.id ?? idx,
              nama,
              harga: row.harga,
              satuan: row.komoditas?.satuan ?? 'kg',
              icon: row.komoditas?.icon ?? '🌿',
              perubahan: row.perubahan_persen != null ? Number(row.perubahan_persen) : null,
              tanggal: row.tanggal,
              wilayah: row.wilayah
                ? [row.wilayah.kecamatan, row.wilayah.kota, row.wilayah.provinsi]
                    .filter(Boolean)
                    .join(', ')
                : (wilayahInfo
                    ? [wilayahInfo.kecamatan, wilayahInfo.kota, wilayahInfo.provinsi].filter(Boolean).join(', ')
                    : null),
            });
          }
        });

        setPrices(unique);
        setLastUpdated(new Date());
      } else if (wilayahId) {
        setNearestWilayah(null);
        const { data: national } = await supabase
          .from('harga_harian')
          .select(`
            id, harga, tanggal, perubahan_persen,
            komoditas:komoditas_id ( id, nama, satuan, icon ),
            wilayah:wilayah_id ( provinsi, kota, kecamatan )
          `)
          .gte('tanggal', fromDate)
          .order('tanggal', { ascending: false })
          .order('harga', { ascending: false });

        if (national && national.length > 0) {
          const seen = new Set();
          const unique = national
            .filter((row) => {
              const nama = row.komoditas?.nama ?? '';
              if (seen.has(nama)) return false;
              seen.add(nama);
              return true;
            })
            .map((row, idx) => ({
              id: row.id ?? idx,
              nama: row.komoditas?.nama ?? 'Tidak diketahui',
              harga: row.harga,
              satuan: row.komoditas?.satuan ?? 'kg',
              icon: row.komoditas?.icon ?? '🌿',
              perubahan: row.perubahan_persen != null ? Number(row.perubahan_persen) : null,
              tanggal: row.tanggal,
              wilayah: row.wilayah
                ? [row.wilayah.kecamatan, row.wilayah.kota, row.wilayah.provinsi].filter(Boolean).join(', ')
                : null,
            }));
          setPrices(unique);
          setLastUpdated(new Date());
        } else {
          setPrices([]);
        }
      } else {
        setPrices([]);
      }
    } catch (err) {
      console.error('[useMarketPrices]', err.message);
      setError(err.message);
      setPrices([]);
    } finally {
      setLoading(false);
    }
  }, [lat, lon]);

  useEffect(() => {
    fetchPrices();
  }, [fetchPrices]);

  return { prices, nearestWilayah, loading, error, lastUpdated, refetch: fetchPrices };
}
