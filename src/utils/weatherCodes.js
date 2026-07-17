// Maps Open-Meteo's WMO weather codes to an icon + Indonesian condition label.
// Reference: https://open-meteo.com/en/docs (WMO Weather interpretation codes)

const WMO_MAP = {
    0: { icon: 'sun', condition: 'Cerah' },
    1: { icon: 'partly_cloudy', condition: 'Cerah Berawan' },
    2: { icon: 'partly_cloudy', condition: 'Berawan Sebagian' },
    3: { icon: 'cloudy', condition: 'Berawan Penuh' },
    45: { icon: 'fog', condition: 'Berkabut' },
    48: { icon: 'fog', condition: 'Kabut Beku' },
    51: { icon: 'drizzle', condition: 'Gerimis Ringan' },
    53: { icon: 'drizzle', condition: 'Gerimis Sedang' },
    55: { icon: 'rain', condition: 'Gerimis Lebat' },
    56: { icon: 'rain', condition: 'Gerimis Beku Ringan' },
    57: { icon: 'rain', condition: 'Gerimis Beku Lebat' },
    61: { icon: 'drizzle', condition: 'Hujan Ringan' },
    63: { icon: 'rain', condition: 'Hujan Sedang' },
    65: { icon: 'heavy_rain', condition: 'Hujan Lebat' },
    66: { icon: 'rain', condition: 'Hujan Beku Ringan' },
    67: { icon: 'heavy_rain', condition: 'Hujan Beku Lebat' },
    71: { icon: 'snow', condition: 'Salju Ringan' },
    73: { icon: 'snow', condition: 'Salju Sedang' },
    75: { icon: 'snow', condition: 'Salju Lebat' },
    77: { icon: 'snow', condition: 'Butiran Salju' },
    80: { icon: 'drizzle', condition: 'Hujan Sesaat Ringan' },
    81: { icon: 'rain', condition: 'Hujan Sesaat Sedang' },
    82: { icon: 'heavy_rain', condition: 'Hujan Sesaat Lebat' },
    85: { icon: 'snow', condition: 'Salju Sesaat Ringan' },
    86: { icon: 'snow', condition: 'Salju Sesaat Lebat' },
    95: { icon: 'thunderstorm', condition: 'Badai Petir' },
    96: { icon: 'thunderstorm', condition: 'Badai Petir + Es Ringan' },
    99: { icon: 'thunderstorm', condition: 'Badai Petir + Es Lebat' },
};

export function describeWeatherCode(code) {
    return WMO_MAP[code] || { icon: 'partly_cloudy', condition: 'Tidak Diketahui' };
}

// Simple heuristic advisory text for farmers based on current conditions.
export function buildAdvisory({ code, rainProbability, windSpeed }) {
    if (rainProbability >= 60) {
        return 'Peluang hujan tinggi hari ini. Tunda pemupukan luar ruangan dan pastikan drainase lahan lancar.';
    }
    if (code >= 95) {
        return 'Waspada potensi badai petir. Hindari aktivitas di lahan terbuka dan amankan peralatan.';
    }
    if (windSpeed >= 30) {
        return 'Angin cukup kencang, tunda penyemprotan pestisida/pupuk cair agar tidak melenceng dari sasaran.';
    }
    if (rainProbability <= 30 && code <= 2) {
        return 'Kondisi cuaca ideal untuk penyiraman dan pemupukan luar ruangan pagi hari.';
    }
    return 'Pantau kondisi cuaca secara berkala dan sesuaikan jadwal perawatan lahan Anda.';
}