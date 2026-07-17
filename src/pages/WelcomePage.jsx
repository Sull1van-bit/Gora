import React from 'react';
import mascotBg from '../assets/mascot.jpeg';

export default function WelcomePage({ onNavigateLogin, onNavigateRegister }) {
  return (
    <div className="min-h-screen bg-white sm:bg-slate-50 flex items-center justify-center sm:py-6">
      <div className="w-full max-w-md bg-[#f5f9ed] font-['Montserrat_Alternates',sans-serif] relative overflow-hidden flex flex-col sm:rounded-[30px] sm:shadow-2xl sm:h-[800px] min-h-screen sm:min-h-0">
        
        {/* Header Text */}
        <div className="pt-16 px-6 text-center z-10 relative">
          <h1 className="text-[#3a6c3d] text-[24px] font-bold leading-tight">
            Selamat Datang!
          </h1>
          <p className="text-[#3c3b3b] text-[13px] font-medium mt-2 px-4 leading-relaxed">
            Masuk untuk melanjutkan perjalanan bertanimu bersama GORA.
          </p>
        </div>

        {/* Mascot Image (Rounded Bottom) */}
        {/* Perbaikan: Dibuat lebih proporsional dengan max-height dan object-contain */}
        <div className="relative w-full flex-1 max-h-[450px] -mt-70 mb-4 z-0 flex items- justify-center overflow-hidden px-8">
           <img 
             src={mascotBg} 
             alt="Gora Mascot" 
             className="w-333px h-full object-contain object-center"
           />
           {/* Gradient opsional, ditambahkan pointer-events-none agar tidak menghalangi klik jika ada */}
           <div className="absolute inset-0 bg-gradient-to-t from-[#f5f9ed] via-transparent to-transparent opacity-80 pointer-events-none"></div>
        </div>

        {/* Action Buttons */}
        <div className="px-6 pb-8 relative z-10 flex flex-col items-center mt-auto">
          <button
            onClick={onNavigateLogin}
            className="w-full h-12 mb-4 bg-gradient-to-b from-[#578a3e] to-[#20480c] rounded-[15px] text-white text-base font-semibold shadow-md active:scale-[0.98] transition-transform"
          >
            Masuk
          </button>
          <button
            onClick={onNavigateRegister}
            className="w-full h-12 bg-white border border-[#cfcbc3] rounded-[15px] text-[#3c3b3b] text-base font-semibold shadow-sm active:scale-[0.98] transition-transform"
          >
            Daftar Akun Baru
          </button>

          {/* Terms and conditions */}
          <p className="text-center text-[#3c3b3b] text-[11px] font-medium mt-6 px-4 leading-relaxed">
            Dengan melanjutkan, kamu setuju dengan <br/>
            <span className="font-semibold text-[#3a6c3d]">Syarat & Ketentuan</span> dan <span className="font-semibold text-[#3a6c3d]">Kebijakan Privasi</span>
          </p>
        </div>

      </div>
    </div>
  );
}