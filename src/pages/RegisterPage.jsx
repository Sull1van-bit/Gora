import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { RiEyeCloseLine, RiEyeLine, RiArrowLeftSLine } from 'react-icons/ri';
import { FaGoogle, FaFacebookF, FaApple } from 'react-icons/fa';

export default function RegisterPage({ onBackToWelcome, onRegisterSuccess }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      if (!supabase) throw new Error("Koneksi Supabase belum siap.");
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          }
        }
      });

      if (error) throw error;
      
      // Navigate to OTP Verification page passing the email
      if (onRegisterSuccess) {
        onRegisterSuccess(email);
      }
    } catch (err) {
      setErrorMsg(err.message || "Pendaftaran gagal. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthLogin = async (provider) => {
    try {
      if (!supabase) throw new Error("Koneksi Supabase belum siap.");
      const { error } = await supabase.auth.signInWithOAuth({ provider });
      if (error) throw error;
    } catch (err) {
      setErrorMsg(err.message || `Gagal mendaftar dengan ${provider}.`);
    }
  };

  return (
    <div className="min-h-screen bg-white sm:bg-slate-50 flex items-center justify-center sm:py-6">
      <div className="w-full max-w-md bg-[#f5f9ed] font-['Montserrat_Alternates',sans-serif] relative overflow-hidden flex flex-col sm:rounded-[30px] sm:shadow-2xl sm:h-[800px] min-h-screen sm:min-h-0">
        
        {/* Decorative Top */}
        <div className="absolute top-0 left-0 w-full h-[200px] bg-gradient-to-b from-[#e5edd7] to-transparent pointer-events-none" />

        {/* Header */}
        <div className="pt-14 px-6 relative z-10">
          <button onClick={onBackToWelcome} className="text-[#3a6c3d] text-3xl mb-6 active:scale-95 transition-transform">
            <RiArrowLeftSLine />
          </button>
          <div className="text-center px-4">
            <h1 className="text-[#3a6c3d] text-2xl font-bold leading-tight">
              Daftar Akun Baru
            </h1>
            <p className="text-[#3c3b3b] text-[13px] font-medium mt-2">
              Bergabunglah untuk memulai perjalanan bertanimu
            </p>
          </div>
        </div>

        {/* Form Card */}
        <div className="mt-8 mx-5 bg-[#fbf9f3] rounded-[20px] shadow-[0px_2px_8px_rgba(0,0,0,0.06)] px-6 py-8 relative z-10 flex-1 mb-10">
          <form onSubmit={handleRegister} className="space-y-6">
            {errorMsg && (
              <div className="p-3 bg-red-100 text-red-700 text-sm rounded-xl text-center font-semibold">
                {errorMsg}
              </div>
            )}
            
            <div className="flex flex-col gap-2">
              <label className="text-[#3c3b3b] text-base font-semibold pl-1">Nama Lengkap</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Contoh: Budi Santoso"
                className="w-full h-12 border border-[#8f8e94] rounded-[15px] px-4 text-sm font-medium text-[#3c3b3b] placeholder:text-[#8f8e94] focus:outline-none focus:border-[#3a6c3d] focus:ring-1 focus:ring-[#3a6c3d] bg-transparent"
                required
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-[#3c3b3b] text-base font-semibold pl-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Contoh: gora@gmail.com"
                className="w-full h-12 border border-[#8f8e94] rounded-[15px] px-4 text-sm font-medium text-[#3c3b3b] placeholder:text-[#8f8e94] focus:outline-none focus:border-[#3a6c3d] focus:ring-1 focus:ring-[#3a6c3d] bg-transparent"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[#3c3b3b] text-base font-semibold pl-1">Kata Sandi</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="******"
                  className="w-full h-12 border border-[#8f8e94] rounded-[15px] px-4 text-lg tracking-widest text-[#3c3b3b] placeholder:text-[#8f8e94] focus:outline-none focus:border-[#3a6c3d] focus:ring-1 focus:ring-[#3a6c3d] bg-transparent"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8f8e94] text-xl"
                >
                  {showPassword ? <RiEyeLine /> : <RiEyeCloseLine />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 mt-4 bg-gradient-to-b from-[#578a3e] to-[#20480c] rounded-[15px] text-white text-base font-semibold flex items-center justify-center shadow-md active:scale-[0.98] transition-transform disabled:opacity-70"
            >
              {loading ? 'Memproses...' : 'Daftar Sekarang'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 mt-10 w-full px-2">
            <div className="h-[1px] bg-[#8f8e94]/30 flex-1"></div>
            <span className="text-[#3a6c3d] font-semibold text-sm shrink-0">atau daftar dengan</span>
            <div className="h-[1px] bg-[#8f8e94]/30 flex-1"></div>
          </div>

          {/* Social Logins */}
          <div className="flex items-center justify-center gap-6 mt-6">
            <button type="button" onClick={() => handleOAuthLogin('google')} className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-100 text-gray-700 text-xl hover:bg-slate-50">
              <FaGoogle />
            </button>
            <button type="button" onClick={() => handleOAuthLogin('facebook')} className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-100 text-[#1877F2] text-xl hover:bg-slate-50">
              <FaFacebookF />
            </button>
            <button type="button" onClick={() => handleOAuthLogin('apple')} className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-100 text-black text-2xl hover:bg-slate-50 pb-1">
              <FaApple />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="pb-8 text-center text-sm font-semibold">
          <span className="text-[#3c3b3b]">Sudah punya akun? </span>
          <button type="button" onClick={onBackToLogin} className="text-[#3a6c3d] hover:underline">Masuk di sini</button>
        </div>

      </div>
    </div>
  );
}
