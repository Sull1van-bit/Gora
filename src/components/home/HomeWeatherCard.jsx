import React from 'react';
import { MdOutlineLocationOn } from 'react-icons/md';

export default function HomeWeatherCard({ 
  locLoading, 
  kecamatan, 
  provinsi, 
  onNavigateTab, 
  weatherLoading, 
  weather 
}) {
  return (
    <section className="-mt-[40px] mx-[19px] bg-[#fbf9f3] rounded-[20px] shadow-[0px_0px_30px_rgba(0,0,0,0.08)] h-[89px] relative z-20 transition-all flex flex-col justify-center px-4">
      
      <div className="absolute top-[10px] left-[14px] flex items-center gap-1 font-['Montserrat_Alternates',sans-serif] font-semibold text-[8px] text-[#3c3b3b]">
        <MdOutlineLocationOn className="w-[14px] h-[14px]" />
        {locLoading ? (
          <div className="h-2 w-24 bg-slate-200 animate-pulse rounded-md" />
        ) : (
          <span>
            {kecamatan && provinsi 
              ? `${kecamatan}, ${provinsi}` 
              : 'Serpong, Tangerang'}
          </span>
        )}
      </div>

      
      <div 
        onClick={() => onNavigateTab('insights', 'weather')}
        className="flex items-center justify-between text-center divide-x divide-slate-300 mt-5 cursor-pointer group"
      >
        
        <div className="flex-[1.2] flex flex-col items-start pl-2">
          <div className="flex items-center gap-2 mb-1">
            <img src="/assets/figma/weather_sun.svg" className="w-[30px] h-[30px] group-hover:scale-110 transition-transform" alt="Cuaca" />
            {weatherLoading ? (
              <div className="h-6 w-12 bg-slate-200 animate-pulse rounded-md" />
            ) : (
              <span className="font-['Manrope',sans-serif] font-semibold text-[24px] text-[#28502d] leading-none">
                {weather?.temp || 20}°C
              </span>
            )}
          </div>
          <span className="text-[8px] font-['Montserrat_Alternates',sans-serif] font-semibold text-[#3c3b3b] ml-1">
            {weather?.condition || 'Cerah Berawan'}
          </span>
        </div>

        
        <div className="flex-1 flex flex-col items-center justify-center relative">
          <span className="text-[8px] font-['Montserrat_Alternates',sans-serif] font-semibold text-[#3c3b3b] absolute top-[-6px]">
            Kelembapan
          </span>
          <div className="flex items-center justify-center gap-1.5 mt-2 mb-0.5">
            <img src="/assets/figma/water_sharp.svg" className="w-[20px] h-[20px]" alt="Kelembapan" />
            {weatherLoading ? (
              <div className="h-5 w-8 bg-slate-200 animate-pulse rounded-md" />
            ) : (
              <span className="font-['Manrope',sans-serif] font-semibold text-[20px] text-[#28502d] leading-none">
                {weather?.humidity || '72%'}
              </span>
            )}
          </div>
          <span className="text-[8px] font-['Montserrat_Alternates',sans-serif] font-semibold text-[#3c3b3b] mt-0.5">
            Udara Lembap
          </span>
        </div>

        
        <div className="flex-1 flex flex-col items-center justify-center relative">
          <span className="text-[8px] font-['Montserrat_Alternates',sans-serif] font-semibold text-[#3c3b3b] absolute top-[-6px]">
            Curah Hujan
          </span>
          <div className="flex items-center justify-center gap-1 mt-2 mb-0.5">
            <img src="/assets/figma/cloud_rain.svg" className="w-[20px] h-[20px]" alt="Hujan" />
            {weatherLoading ? (
              <div className="h-5 w-8 bg-slate-200 animate-pulse rounded-md" />
            ) : (
              <span className="font-['Manrope',sans-serif] font-semibold text-[20px] text-[#28502d] leading-none">
                {weather?.rainProbability || '15'}%
              </span>
            )}
          </div>
          <span className="text-[8px] font-['Montserrat_Alternates',sans-serif] font-semibold text-[#3c3b3b] mt-0.5">
            Peluang Hujan
          </span>
        </div>
      </div>
    </section>
  );
}
