import React from 'react';

export default function HomeHero({ profileLoading, displayName, streakCount = 0 }) {
  const getGreetingTime = () => {
    const hour = new Date().getHours();
    if (hour < 11) return 'Selamat Pagi,';
    if (hour < 15) return 'Selamat Siang,';
    if (hour < 18) return 'Selamat Sore,';
    return 'Selamat Malam,';
  };

  let mascotImg = '/assets/figma/streak.svg';

  return (
    <section className="bg-gradient-to-t from-[#c6d5a2] to-[#25812a] rounded-b-[30px] pt-8 pb-12 px-6 relative text-white shadow-xs h-[212px]">
      <div className="relative z-10 flex flex-col justify-between max-w-sm">
        <div className="mt-4">
          <p className="text-[#fbf9f3] text-[16px] font-['Montserrat_Alternates',sans-serif] font-medium leading-none">
            {getGreetingTime()}
          </p>
          <div className="flex items-center gap-2 font-['Montserrat_Alternates',sans-serif] font-bold text-[24px] text-[#fbf9f3] leading-none mt-2">
            <svg width="29" height="29" viewBox="0 0 24 24" fill="currentColor" className="shrink-0 text-white">
              <path d="M21 4C21 4 19.341 3.5 15.5 3.5C11.5 3.5 8.163 5.485 6.096 8.322C4.195 7.158 2.012 7.008 1 7C1 7 1 9.5 2.5 12C3.896 14.331 6.505 16 9.5 16C10.15 16 10.776 15.937 11.385 15.82C12.443 18.257 14.945 20 18 20V22H20V19.791C22.41 18.455 24 15.918 24 13C24 9.07 22.8 4 21 4ZM18 18C15.826 18 13.914 16.657 13.064 14.77C13.882 14.167 14.653 13.433 15.352 12.565L16.914 13.829C16.143 14.786 15.289 15.589 14.373 16.241C15.263 17.333 16.571 18 18 18ZM9.5 14C7.019 14 4.887 12.637 3.738 10.59C4.811 10.457 6.368 10.407 7.917 11.666L6.653 13.228C5.234 12.074 4.093 12.001 3.864 12.001C4.856 13.204 6.31 14 7.917 14C8.453 14 8.981 13.921 9.5 13.771V14ZM22 13C22 15.206 20.383 17 18 17C16.513 17 15.215 16.241 14.444 15.093L12.882 13.83C12.112 12.872 11.442 11.758 10.898 10.523C13.267 8.232 16.173 5.5 21 5.5C21 5.5 22 10.038 22 13Z"/>
            </svg>
            {profileLoading ? (
              <div className="h-7 w-32 bg-white/20 animate-pulse rounded-md ml-1" />
            ) : (
              <span className="truncate">{displayName}</span>
            )}
          </div>
          <p className="text-[12px] font-['Montserrat_Alternates',sans-serif] text-[#fbf9f3] opacity-90 mt-3 leading-tight w-[283px]">
            Pantau kondisi lahan Anda hari ini.
          </p>
        </div>
      </div>

      
      <div className="absolute h-[180px] w-[156px] left-[65%] top-[42px] z-10 pointer-events-none">
        <img 
          src={mascotImg} 
          className="absolute inset-0 max-w-none object-cover size-full" 
          alt="Streak Farmer Mascot" 
        />
        
        {streakCount > 0 && (
          <div className="absolute right-[0px] bottom-[20px] w-[60px] h-[60px] flex items-center justify-center transform rotate-[-7deg]">
            
            <svg viewBox="0 0 58 58" className="absolute inset-0 w-full h-full text-[#c8923a]">
              <path d="M10 8 L48 4 L52 46 L8 50 Z" fill="currentColor" stroke="#936215" strokeWidth="2" />
              <path d="M16 10 L44 6 L48 44 L14 48 Z" fill="#e6b15c" />
            </svg>
            <span className="relative z-10 font-['Montserrat_Alternates',sans-serif] font-bold text-[#fbf9f3] text-[24px] drop-shadow-md">
              {streakCount}
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
