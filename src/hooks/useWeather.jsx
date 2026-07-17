import { useState, useEffect, useCallback } from 'react';
import useUserLocation from './useUserLocation';
import { 
  RiSunFill, 
  RiSunCloudyFill, 
  RiCloudFill, 
  RiMistFill, 
  RiDrizzleFill, 
  RiShowersFill, 
  RiHeavyShowersFill, 
  RiThunderstormsFill 
} from 'react-icons/ri';

function getWeatherInfo(code) {
  if (code === 0) return { icon: <RiSunFill />, condition: 'Cerah' };
  if (code === 1 || code === 2) return { icon: <RiSunCloudyFill />, condition: 'Cerah Berawan' };
  if (code === 3) return { icon: <RiCloudFill />, condition: 'Berawan' };
  if (code >= 45 && code <= 48) return { icon: <RiMistFill />, condition: 'Berkabut' };
  if (code >= 51 && code <= 55) return { icon: <RiDrizzleFill />, condition: 'Gerimis Ringan' };
  if (code >= 61 && code <= 65) return { icon: <RiShowersFill />, condition: 'Hujan' };
  if (code >= 80 && code <= 82) return { icon: <RiHeavyShowersFill />, condition: 'Hujan Deras' };
  if (code >= 95) return { icon: <RiThunderstormsFill />, condition: 'Hujan Petir' };
  return { icon: <RiSunCloudyFill />, condition: 'Berawan' };
}

export default function useWeather() {
  const { lat, lon, kecamatan, kota, provinsi, loading: locLoading } = useUserLocation();
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWeather = useCallback(async () => {
    if (locLoading) return;

    const fetchLat = lat ?? -7.8830;
    const fetchLon = lon ?? 112.5263;
    const locationName = lat && lon && (kecamatan || kota || provinsi)
      ? [kecamatan, kota, provinsi].filter(Boolean).join(', ')
      : 'Bumiaji, Kota Batu (Default)';

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${fetchLat}&longitude=${fetchLon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto`
      );

      if (!response.ok) throw new Error('Failed to fetch weather data');
      const data = await response.json();

      const currentInfo = getWeatherInfo(data.current.weather_code);

      let advisory = 'Kondisi cuaca ideal untuk penyiraman dan pemupukan luar ruangan pagi hari.';
      if (data.current.weather_code >= 61) {
        advisory = 'Hujan turun. Tunda pemupukan foliar atau penyiraman untuk mencegah pencucian nutrisi.';
      } else if (data.current.temperature_2m > 33) {
        advisory = 'Suhu cukup panas. Pastikan kelembaban tanah terjaga dengan irigasi tetes atau penyiraman intensif.';
      } else if (data.current.wind_speed_10m > 25) {
        advisory = 'Angin cukup kencang. Waspadai kerusakan fisik pada tanaman yang tinggi.';
      }

      const currentHour = new Date().getHours();
      const hourlyForecast = [];
      for (let i = 1; i <= 4; i++) {
        const hIdx = currentHour + (i * 3);
        if (hIdx < data.hourly.time.length) {
          const timeLabel = new Date(data.hourly.time[hIdx]).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
          const info = getWeatherInfo(data.hourly.weather_code[hIdx]);
          let label = 'Waktu';
          const hour = new Date(data.hourly.time[hIdx]).getHours();
          if (hour >= 5 && hour < 11) label = 'Pagi';
          else if (hour >= 11 && hour < 15) label = 'Siang';
          else if (hour >= 15 && hour < 18) label = 'Sore';
          else label = 'Malam';

          hourlyForecast.push({
            time: timeLabel,
            temp: Math.round(data.hourly.temperature_2m[hIdx]),
            icon: info.icon,
            label,
          });
        }
      }

      const weeklyForecast = [];
      for (let i = 0; i < Math.min(6, data.daily.time.length); i++) {
        const dateObj = new Date(data.daily.time[i]);
        const dayLabel = i === 0 ? 'Hari Ini' : i === 1 ? 'Besok' : i === 2 ? 'Lusa' : dateObj.toLocaleDateString('id-ID', { weekday: 'long' });
        const info = getWeatherInfo(data.daily.weather_code[i]);
        weeklyForecast.push({
          day: dayLabel,
          temp: `${Math.round(data.daily.temperature_2m_min[i])}° - ${Math.round(data.daily.temperature_2m_max[i])}°C`,
          icon: info.icon,
          cond: info.condition,
          rain: `${data.daily.precipitation_probability_max[i]}%`,
        });
      }

      setWeatherData({
        locationName,
        temp: Math.round(data.current.temperature_2m),
        feelsLike: Math.round(data.current.apparent_temperature),
        condition: currentInfo.condition,
        icon: currentInfo.icon,
        humidity: data.current.relative_humidity_2m,
        windSpeed: Math.round(data.current.wind_speed_10m),
        rainProbability: data.daily.precipitation_probability_max[0] || 0,
        advisory,
        hourlyForecast,
        weeklyForecast,
      });

    } catch (err) {
      console.error('[useWeather] Error fetching:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [lat, lon, locLoading, kecamatan, kota, provinsi]);

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  return { weatherData, loading, error, refetch: fetchWeather };
}
