import { useState, useEffect, useCallback } from 'react';
import { Geolocation } from '@capacitor/geolocation';

@returns {{ provinsi, kecamatan, loading, error, refetch }}

export default function useUserLocation() {
  const [provinsi, setProvinsi] = useState(null);
  const [kecamatan, setKecamatan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLocation = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const permStatus = await Geolocation.checkPermissions();
      
      if (permStatus.location === 'denied') {
        const reqResult = await Geolocation.requestPermissions();
        if (reqResult.location === 'denied') {
          throw new Error('Izin lokasi ditolak. Silakan pilih lokasi secara manual.');
        }
      }

      const position = await Geolocation.getCurrentPosition({
        enableHighAccuracy: false, 
        timeout: 10000,
      });

      const { latitude, longitude } = position.coords;

      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=14&addressdetails=1&accept-language=id`,
        {
          headers: {
            'User-Agent': 'GoraApp/1.0 (contact@garuda.com)',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Gagal mendapatkan informasi lokasi.');
      }

      const data = await response.json();
      const address = data.address || {};

      const prov = address.state || address.province || null;
      
      const kec =
        address.suburb ||
        address.city_district ||
        address.village ||
        address.town ||
        address.city ||
        null;

      setProvinsi(prov);
      setKecamatan(kec);
    } catch (err) {
      console.warn('[useUserLocation]', err);
      setError(err.message || 'Tidak dapat mendeteksi lokasi.');
      setProvinsi(null);
      setKecamatan(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLocation();
  }, [fetchLocation]);

  return {
    provinsi,
    kecamatan,
    loading,
    error,
    refetch: fetchLocation,
  };
}
