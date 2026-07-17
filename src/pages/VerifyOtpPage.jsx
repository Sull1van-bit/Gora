import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabaseClient';
import { RiArrowLeftSLine, RiMailSendFill } from 'react-icons/ri';

export default function VerifyOtpPage({ email, onBack, onVerifySuccess }) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [timer, setTimer] = useState(17);
  const inputRefs = useRef([]);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    // Take only the last character if they pasted or typed quickly
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleResend = async () => {
    if (timer > 0) return;
    setLoading(true);
    setErrorMsg('');
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
      });
      if (error) throw error;
      setTimer(60);
    } catch (err) {
      setErrorMsg(err.message || 'Gagal mengirim ulang kode.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const code = otp.join('');
    if (code.length < 6) {
      setErrorMsg('Masukkan 6 digit kode.');
      return;
    }

    setLoading(true);
    setErrorMsg('');
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token: code,
        type: 'signup',
      });

      if (error) throw error;
      
      if (onVerifySuccess && data.session) {
        onVerifySuccess(data.session);
      }
    } catch (err) {
      setErrorMsg(err.message || 'Kode tidak valid atau kadaluarsa.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white sm:bg-slate-50 flex items-center justify-center sm:py-6">
      <div className="w-full max-w-md bg-[#f5f9ed] font-['Montserrat_Alternates',sans-serif] relative overflow-hidden flex flex-col sm:rounded-[30px] sm:shadow-2xl sm:h-[800px] min-h-screen sm:min-h-0 pt-14 px-6">
        
        {/* Header Back Button */}
        <button onClick={onBack} className="text-[#3a6c3d] text-3xl mb-8 active:scale-95 transition-transform self-start">
          <RiArrowLeftSLine />
        </button>

        {/* Title */}
        <div className="text-center">
          <h1 className="text-[#3a6c3d] text-2xl font-bold leading-tight">
            Verifikasi Email
          </h1>
          <p className="text-[#3c3b3b] text-xs font-semibold mt-4 px-2 leading-relaxed">
            Kami telah mengirimkan kode verifikasi ke <br/>
            <span className="text-[#3a6c3d]">{email || 'email Anda'}</span>
          </p>
        </div>

        {/* Big Icon */}
        <div className="flex justify-center mt-10 mb-12">
          <div className="w-[130px] h-[130px] bg-[#fdf5c8] rounded-full flex items-center justify-center relative">
            <RiMailSendFill className="text-[#578a3e] text-[80px]" />
            <div className="absolute bottom-2 right-2 w-10 h-10 bg-[#f5f9ed] rounded-full flex items-center justify-center">
              <div className="w-6 h-6 text-[#578a3e]">
                {/* Plus/Sparkle star shape from design */}
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0l2 8 8 2-8 2-2 8-2-8-8-2 8-2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleVerify} className="flex flex-col flex-1 pb-10">
          
          {errorMsg && (
            <div className="p-3 bg-red-100 text-red-700 text-sm rounded-xl text-center font-semibold mb-4 mx-2">
              {errorMsg}
            </div>
          )}

          {/* OTP Inputs */}
          <div className="flex justify-center gap-2 mb-8">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputRefs.current[index] = el)}
                className="w-12 h-14 border border-[#8f8e94] rounded-[15px] text-center text-xl font-bold text-[#3c3b3b] focus:outline-none focus:border-[#3a6c3d] focus:ring-1 focus:ring-[#3a6c3d] bg-transparent"
              />
            ))}
          </div>

          {/* Resend Timer */}
          <div className="text-center text-[#3c3b3b] font-semibold mb-12 text-[15px]">
            Kirim ulang kode dalam <span className={timer > 0 ? 'text-[#3a6c3d]' : 'text-gray-400 cursor-pointer'} onClick={handleResend}>
              {timer > 0 ? `00:${timer.toString().padStart(2, '0')}` : 'Sekarang'}
            </span>
          </div>

          {/* Verify Button */}
          <div className="mt-auto mx-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full h-[44px] bg-gradient-to-b from-[#578a3e] to-[#20480c] rounded-[15px] text-white text-base font-semibold flex items-center justify-center shadow-md active:scale-[0.98] transition-transform disabled:opacity-70"
            >
              {loading ? 'Memverifikasi...' : 'Verifikasi'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
