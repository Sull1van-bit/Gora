import { useState, useEffect, useCallback } from 'react';
import { describeWeatherCode, buildAdvisory } from '../utils/weatherCodes';
import { WEATHER_PREVIEW } from '../services/dataStore';

// Static fallback used when location is unavailable or the Open-Meteo
// request fails (offline, permission denied, etc). Keeps the UI populated
// with sensible placeholder data instead of blank/broken widgets.
const FALLBACK_HOURLY = [
    { time: '08:00', temp: 26, icon: 'partly_cloudy', label: 'Pagi' },
    { time: '12:00', temp: 30, icon: 'sun', label: 'Siang' },
    { time: '16:00', temp: 28, icon: 'partly_cloudy', label: 'Sore' },
    { time: '20:00', temp: 24, icon: 'moon', label: 'Malam' },
];

const DAY_LABELS = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

function formatDailyLabel(dateStr, index) {
    if (index === 0) return 'Hari Ini';
    if (index === 1) return 'Besok';
    if (index === 2) return 'Lusa';
    const d = new Date(dateStr);
    return DAY_LABELS[d.getDay()];
}

export default function useWeather(latitude, longitude) {
    const [current, setCurrent] = useState(WEATHER_PREVIEW);
    const [hourly, setHourly] = useState(FALLBACK_HOURLY);
    const [daily, setDaily] = useState(null); // null until real data loads
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [usingFallback, setUsingFallback] = useState(true);

    const fetchWeather = useCallback(async () => {
        if (latitude == null || longitude == null) {
            // No coordinates yet (still loading location, or permission denied) —
            // keep showing fallback data rather than an error state.
            setUsingFallback(true);
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const url =
                `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}` +
                `&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m` +
                `&hourly=temperature_2m,weather_code,precipitation_probability` +
                `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max` +
                `&timezone=auto&forecast_days=7`;

            const response = await fetch(url);
            if (!response.ok) {
                const body = await response.json().catch(() => null);
                throw new Error(body?.reason || `Open-Meteo request failed (${response.status})`);
            }

            const data = await response.json();

            // --- Current conditions ---
            const c = data.current;
            const { icon, condition } = describeWeatherCode(c.weather_code);
            const windSpeed = Math.round(c.wind_speed_10m);

            // precipitation_probability isn't available on the `current` endpoint,
            // so use the hourly slot matching the current time as a stand-in.
            const currentHourIdx = Math.max(0, data.hourly.time.findIndex((t) => t >= c.time));
            const rainProbability = data.hourly.precipitation_probability?.[currentHourIdx] ?? 0;

            setCurrent({
                temp: Math.round(c.temperature_2m),
                condition,
                icon,
                humidity: Math.round(c.relative_humidity_2m),
                windSpeed,
                rainProbability,
                advisory: buildAdvisory({ code: c.weather_code, rainProbability, windSpeed }),
            });

            // --- Next 4 hourly slots from now ---
            const nowIso = data.current.time;
            const hourlyTimes = data.hourly.time;
            const startIdx = Math.max(0, hourlyTimes.findIndex((t) => t >= nowIso));
            const nextHours = [];
            for (let i = startIdx; i < startIdx + 4 && i < hourlyTimes.length; i++) {
                const hCode = data.hourly.weather_code[i];
                const { icon: hIcon } = describeWeatherCode(hCode);
                const dt = new Date(hourlyTimes[i]);
                nextHours.push({
                    time: dt.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
                    temp: Math.round(data.hourly.temperature_2m[i]),
                    icon: hIcon,
                    label: i === startIdx ? 'Sekarang' : '',
                });
            }
            if (nextHours.length > 0) setHourly(nextHours);

            // --- 7-day daily forecast ---
            const dailyDays = data.daily.time.map((dateStr, idx) => {
                const dCode = data.daily.weather_code[idx];
                const { icon: dIcon, condition: dCond } = describeWeatherCode(dCode);
                return {
                    day: formatDailyLabel(dateStr, idx),
                    temp: `${Math.round(data.daily.temperature_2m_min[idx])}° - ${Math.round(data.daily.temperature_2m_max[idx])}°C`,
                    icon: dIcon,
                    cond: dCond,
                    rain: `${Math.round(data.daily.precipitation_probability_max[idx] ?? 0)}%`,
                };
            });
            setDaily(dailyDays);

            setUsingFallback(false);
        } catch (err) {
            console.warn('[useWeather] Falling back to static data:', err);
            setError(err.message || 'Tidak dapat memuat data cuaca terkini.');
            setUsingFallback(true);
        } finally {
            setLoading(false);
        }
    }, [latitude, longitude]);

    useEffect(() => {
        fetchWeather();
    }, [fetchWeather]);

    return {
        weather: current,
        hourlyForecast: hourly,
        weeklyForecast: daily, // null while loading/fallback — components should fall back to their own defaults
        loading,
        error,
        usingFallback,
        refetch: fetchWeather,
    };
}