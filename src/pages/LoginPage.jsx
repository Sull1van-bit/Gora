import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { RiPlantFill, RiAlertFill, RiCheckFill, RiEyeOffFill, RiEyeFill, RiLoader4Line } from 'react-icons/ri';

function translateError(msg = '') {
  if (msg.includes('Invalid login credentials'))
    return 'Email atau password salah. Periksa kembali.';
  if (msg.includes('Email not confirmed'))
    return 'Email belum dikonfirmasi. Cek inbox/spam lalu klik link konfirmasi.';
  if (msg.includes('User already registered'))
    return 'Email sudah terdaftar. Silakan login.';
  if (msg.includes('Password should be at least'))
    return 'Password minimal 6 karakter.';
  if (msg.includes('rate limit'))
    return 'Terlalu banyak percobaan. Tunggu beberapa menit.';
  if (msg.includes('email address is invalid') || msg.includes('email_address_invalid'))
    return 'Format email tidak valid (gunakan email asli, misal: nama@gmail.com).';
  if (msg.includes('network') || msg.includes('fetch'))
    return 'Tidak dapat terhubung ke server. Periksa koneksi internet.';
  return msg;
}

export default function LoginPage({ onLoginSuccess }) {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const reset = () => { setError(''); setMessage(''); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    reset();

    try {
      if (mode === 'login') {
        const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password });
        if (authError) throw authError;
        if (data.session) onLoginSuccess(data.session);

      } else if (mode === 'signup') {
        const { error: authError } = await supabase.auth.signUp({ email, password });
        if (authError) throw authError;
        setMessage('Akun berhasil dibuat! Cek inbox email untuk konfirmasi, lalu login.');
        setMode('login');

      } else if (mode === 'reset') {
        const { error: authError } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: window.location.origin,
        });
        if (authError) throw authError;
        setMessage('Link reset password telah dikirim ke email kamu.');
        setMode('login');
      }
    } catch (err) {
      setError(translateError(err.message));
    } finally {
      setLoading(false);
    }
  };

  const titles = { login: 'Masuk ke GORA', signup: 'Buat Akun Baru', reset: 'Reset Password' };
  const btnLabels = { login: 'Masuk', signup: 'Daftar', reset: 'Kirim Link Reset' };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #064e3b 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
    }}>
      <div style={{
        background: 'white',
        borderRadius: 20,
        padding: '32px 28px',
        width: '100%',
        maxWidth: 380,
        boxShadow: '0 25px 50px rgba(0,0,0,0.4)',
      }}>
        
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 16,
            background: 'linear-gradient(135deg, #10b981, #059669)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 28, margin: '0 auto 12px',
            boxShadow: '0 4px 12px rgba(16,185,129,0.3)',
            color: 'white',
          }}>
            <RiPlantFill />
          </div>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 900, color: '#0f172a', letterSpacing: -0.5 }}>GORA</h1>
          <p style={{ margin: '4px 0 0', fontSize: 12, color: '#94a3b8' }}>Solusi Pintar Pertanian Nusantara</p>
        </div>

        <h2 style={{ margin: '0 0 20px', fontSize: 16, fontWeight: 700, color: '#1e293b' }}>
          {titles[mode]}
        </h2>

        
        {error && (
          <div style={{
            background: '#fef2f2', border: '1px solid #fecaca',
            borderRadius: 10, padding: '10px 14px',
            color: '#b91c1c', fontSize: 13, marginBottom: 14,
            display: 'flex', alignItems: 'flex-start', gap: 8,
          }}>
            <RiAlertFill style={{ fontSize: 16, marginTop: 2, flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        
        {message && (
          <div style={{
            background: '#f0fdf4', border: '1px solid #bbf7d0',
            borderRadius: 10, padding: '10px 14px',
            color: '#166534', fontSize: 13, marginBottom: 14,
            display: 'flex', alignItems: 'flex-start', gap: 8,
          }}>
            <RiCheckFill style={{ fontSize: 16, marginTop: 2, flexShrink: 0 }} />
            <span>{message}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          
          <div style={{ marginBottom: 14 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="nama@gmail.com"
              autoComplete="email"
              style={{
                width: '100%', boxSizing: 'border-box',
                padding: '10px 14px', fontSize: 14,
                border: '1.5px solid #e2e8f0', borderRadius: 10,
                outline: 'none', transition: 'border-color 0.2s',
                color: '#1e293b', background: '#f8fafc',
              }}
              onFocus={e => e.target.style.borderColor = '#10b981'}
              onBlur={e => e.target.style.borderColor = '#e2e8f0'}
            />
          </div>

          
          {mode !== 'reset' && (
            <div style={{ marginBottom: 18 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  placeholder="Minimal 6 karakter"
                  autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                  style={{
                    width: '100%', boxSizing: 'border-box',
                    padding: '10px 40px 10px 14px', fontSize: 14,
                    border: '1.5px solid #e2e8f0', borderRadius: 10,
                    outline: 'none', color: '#1e293b', background: '#f8fafc',
                  }}
                  onFocus={e => e.target.style.borderColor = '#10b981'}
                  onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  style={{
                    position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, padding: 0, color: '#94a3b8', display: 'flex', alignItems: 'center'
                  }}
                >
                  {showPass ? <RiEyeOffFill /> : <RiEyeFill />}
                </button>
              </div>

              
              {mode === 'login' && (
                <div style={{ textAlign: 'right', marginTop: 6 }}>
                  <button
                    type="button"
                    onClick={() => { setMode('reset'); reset(); }}
                    style={{ background: 'none', border: 'none', color: '#10b981', fontSize: 12, cursor: 'pointer', fontWeight: 600 }}
                  >
                    Lupa password?
                  </button>
                </div>
              )}
            </div>
          )}

          
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%', padding: '12px',
              background: loading ? '#94a3b8' : 'linear-gradient(135deg, #10b981, #059669)',
              color: '#fff', border: 'none', borderRadius: 10,
              fontWeight: 700, fontSize: 15, cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: loading ? 'none' : '0 4px 12px rgba(16,185,129,0.3)',
              transition: 'all 0.2s',
            }}
          >
            {loading ? <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}><RiLoader4Line className="animate-spin" /> Memproses...</span> : btnLabels[mode]}
          </button>
        </form>

        
        <div style={{ textAlign: 'center', marginTop: 20, fontSize: 13, color: '#64748b' }}>
          {mode === 'login' && (
            <>
              Belum punya akun?{' '}
              <button
                onClick={() => { setMode('signup'); reset(); }}
                style={{ background: 'none', border: 'none', color: '#10b981', fontWeight: 700, cursor: 'pointer', fontSize: 13 }}
              >
                Daftar sekarang
              </button>
            </>
          )}
          {mode === 'signup' && (
            <>
              Sudah punya akun?{' '}
              <button
                onClick={() => { setMode('login'); reset(); }}
                style={{ background: 'none', border: 'none', color: '#10b981', fontWeight: 700, cursor: 'pointer', fontSize: 13 }}
              >
                Masuk
              </button>
            </>
          )}
          {mode === 'reset' && (
            <button
              onClick={() => { setMode('login'); reset(); }}
              style={{ background: 'none', border: 'none', color: '#10b981', fontWeight: 700, cursor: 'pointer', fontSize: 13 }}
            >
              ← Kembali ke login
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
