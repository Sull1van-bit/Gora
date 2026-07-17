import { useState, useEffect, useCallback } from 'react';

/**
 * @returns {{ latitude: number|null, longitude: number|null, lat: number|null, lon: number|null, provinsi: string|null, kecamatan: string|null, kota: string|null, loading: boolean, error: string|null, refetch: () => void }}
 */
export default function useUserLocation() {
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [provinsi, setProvinsi] = useState(null);
  const [kecamatan, setKecamatan] = useState(null);
  const [kota, setKota] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLocation = useCallback(() => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError('Browser tidak mendukung Geolocation.');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setLat(latitude);
        setLon(longitude);

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=14&addressdetails=1&accept-language=id`,
            { headers: { 'User-Agent': 'GoraApp/1.0 (contact@garuda.com)' } }
          );

          if (!response.ok) throw new Error('Gagal memuat data lokasi.');

          const data = await response.json();
          const address = data.address || {};

          const prov = address.state || address.province || null;
          const kec =
            address.suburb ||
            address.city_district ||
            address.village ||
            address.town ||
            null;
          const kot = address.city || address.regency || address.county || null;

          setProvinsi(prov);
          setKecamatan(kec);
          setKota(kot);
        } catch (err) {
          console.warn('[useUserLocation] Reverse geocode gagal:', err.message);
          setError('Tidak dapat menentukan nama wilayah dari koordinat.');
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        console.warn('[useUserLocation] Geolocation error:', err.message);
        const msg =
          err.code === 1
            ? 'Izin lokasi ditolak. Aktifkan lokasi di pengaturan browser.'
            : err.code === 2
            ? 'Lokasi tidak tersedia saat ini.'
            : 'Timeout mendapatkan lokasi.';
        setError(msg);
        setLoading(false);
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 }
    );
  }, []);

  useEffect(() => {
    fetchLocation();
  }, [fetchLocation]);

  return {
    latitude: lat,
    longitude: lon,
    lat,
    lon,
    provinsi,
    kecamatan,
    kota,
    loading,
    error,
    refetch: fetchLocation,
  };
}
