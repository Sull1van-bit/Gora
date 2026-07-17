// Maps Open-Meteo's WMO weather codes to an icon + Indonesian condition label.
// Reference: https://open-meteo.com/en/docs (WMO Weather interpretation codes)

const WMO_MAP = {
    0: { icon: '☀️', condition: 'Cerah' },
    1: { icon: '🌤️', condition: 'Cerah Berawan' },
    2: { icon: '⛅', condition: 'Berawan Sebagian' },
    3: { icon: '☁️', condition: 'Berawan Penuh' },
    45: { icon: '🌫️', condition: 'Berkabut' },
    48: { icon: '🌫️', condition: 'Kabut Beku' },
    51: { icon: '🌦️', condition: 'Gerimis Ringan' },
    53: { icon: '🌦️', condition: 'Gerimis Sedang' },
    55: { icon: '🌧️', condition: 'Gerimis Lebat' },
    56: { icon: '🌧️', condition: 'Gerimis Beku Ringan' },
    57: { icon: '🌧️', condition: 'Gerimis Beku Lebat' },
    61: { icon: '🌦️', condition: 'Hujan Ringan' },
    63: { icon: '🌧️', condition: 'Hujan Sedang' },
    65: { icon: '🌧️', condition: 'Hujan Lebat' },
    66: { icon: '🌧️', condition: 'Hujan Beku Ringan' },
    67: { icon: '🌧️', condition: 'Hujan Beku Lebat' },
    71: { icon: '🌨️', condition: 'Salju Ringan' },
    73: { icon: '🌨️', condition: 'Salju Sedang' },
    75: { icon: '❄️', condition: 'Salju Lebat' },
    77: { icon: '❄️', condition: 'Butiran Salju' },
    80: { icon: '🌦️', condition: 'Hujan Sesaat Ringan' },
    81: { icon: '🌧️', condition: 'Hujan Sesaat Sedang' },
    82: { icon: '⛈️', condition: 'Hujan Sesaat Lebat' },
    85: { icon: '🌨️', condition: 'Salju Sesaat Ringan' },
    86: { icon: '🌨️', condition: 'Salju Sesaat Lebat' },
    95: { icon: '⛈️', condition: 'Badai Petir' },
    96: { icon: '⛈️', condition: 'Badai Petir + Es Ringan' },
    99: { icon: '⛈️', condition: 'Badai Petir + Es Lebat' },
};

export function describeWeatherCode(code) {
    return WMO_MAP[code] || { icon: '🌤️', condition: 'Tidak Diketahui' };
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