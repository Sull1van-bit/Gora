import React from 'react';
import { RiMapPin2Fill, RiSunCloudyFill, RiPlantFill, RiRainyFill } from 'react-icons/ri';

export default function WeatherDetailView({ weather }) {
  const hourlyForecast = weather?.hourlyForecast || [];
  const weeklyForecast = weather?.weeklyForecast || [];

  return (
    <div className="space-y-4 animate-fade-in">
      
      <div className="bg-gradient-to-br from-blue-600 via-indigo-700 to-slate-900 text-white rounded-3xl p-5 shadow-lg relative overflow-hidden">
        <div className="absolute -right-8 -top-8 w-36 h-36 rounded-full bg-white/10 pointer-events-none blur-xl" />

        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-blue-100 flex items-center gap-1">
              <RiMapPin2Fill /> {weather?.locationName || 'Memuat Lokasi...'}
            </span>
            <h2 className="text-xl font-black font-['Montserrat_Alternates',sans-serif] mt-2">
              {weather?.condition || 'Cerah Berawan'}
            </h2>
          </div>
          <span className="text-5xl shrink-0 flex items-center justify-center">{weather?.icon || <RiSunCloudyFill />}</span>
        </div>

        <div className="flex items-baseline gap-3 my-2">
          <span className="text-5xl font-black font-['Montserrat_Alternates',sans-serif]">
            {weather?.temp || '--'}°C
          </span>
          <span className="text-sm text-blue-200 font-medium">Terasa seperti {weather?.feelsLike || '--'}°C</span>
        </div>

        
        <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-white/15 text-center">
          <div className="bg-white/10 rounded-xl p-2 backdrop-blur-2xs">
            <span className="text-slate-300 block text-[10px]">Kelembaban</span>
            <span className="font-bold text-sm text-white">{weather?.humidity || 72}%</span>
          </div>
          <div className="bg-white/10 rounded-xl p-2 backdrop-blur-2xs">
            <span className="text-slate-300 block text-[10px]">Kecepatan Angin</span>
            <span className="font-bold text-sm text-white">{weather?.windSpeed || 14} km/j</span>
          </div>
          <div className="bg-white/10 rounded-xl p-2 backdrop-blur-2xs">
            <span className="text-slate-300 block text-[10px]">Peluang Hujan</span>
            <span className="font-bold text-sm text-amber-300">{weather?.rainProbability || 25}%</span>
          </div>
        </div>
      </div>

      
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-4.5 border border-amber-200/80 shadow-xs">
        <div className="flex items-center gap-2 text-amber-800 font-bold text-xs mb-1">
          <span className="text-base"><RiPlantFill /></span>
          <span className="uppercase tracking-wider">Saran Pertanian Khusus</span>
        </div>
        <p className="text-xs text-amber-900 leading-relaxed font-medium">
          {weather?.advisory || 'Kondisi cuaca saat ini sangat ideal untuk penyiraman pagi dan pemupukan foliar. Harap bersiap menghadapi potensi hujan ringan besok sore.'}
        </p>
      </div>

      
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
        <h3 className="text-xs font-bold text-slate-700 mb-3 uppercase tracking-wider">
          Prakiraan Per Jam
        </h3>
        <div className="grid grid-cols-4 gap-2 text-center">
          {hourlyForecast.map((h, i) => (
            <div key={i} className="bg-slate-50 p-2.5 rounded-xl border border-slate-100/80">
              <span className="text-[11px] text-slate-400 font-medium block">{h.time}</span>
              <span className="text-2xl my-1 block">{h.icon}</span>
              <span className="text-sm font-extrabold text-slate-800 block">{h.temp}°C</span>
              <span className="text-[10px] text-slate-500">{h.label}</span>
            </div>
          ))}
        </div>
      </div>

      
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
        <h3 className="text-xs font-bold text-slate-700 mb-3 uppercase tracking-wider">
          Prakiraan Cuaca 6 Hari Kedepan
        </h3>
        <div className="divide-y divide-slate-100">
          {weeklyForecast.map((w, idx) => (
            <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 w-1/3">
                <span className="text-lg">{w.icon}</span>
                <span className="font-bold text-slate-800">{w.day}</span>
              </div>
              <div className="w-1/3 text-center text-slate-500 font-medium truncate">
                {w.cond}
              </div>
              <div className="w-1/3 text-right">
                <span className="font-extrabold text-slate-700">{w.temp}</span>
                <span className="flex items-center justify-end gap-1 mt-0.5 text-[10px] text-blue-500 font-semibold"><RiRainyFill /> {w.rain}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
