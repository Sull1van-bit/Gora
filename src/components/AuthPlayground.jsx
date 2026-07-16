import { useEffect, useState } from 'react';
import { isSupabaseConfigured, supabase } from '../lib/supabaseClient';

const emptyForm = {
  email: '',
  password: '',
  displayName: '',
};

const emptyPlotForm = {
  plotName: '',
  komoditasId: '',
  location: '',
  plantingDate: '',
};

function getCommodityLabel(commodity) {
  return commodity?.nama ?? commodity?.name ?? commodity?.title ?? 'Tanaman';
}

function getHarvestDays(commodity) {
  const candidates = [
    commodity?.harvest_days,
    commodity?.days_to_harvest,
    commodity?.lama_panen,
    commodity?.panen_hari,
    commodity?.duration_days,
  ];

  for (const candidate of candidates) {
    const value = Number(candidate);
    if (Number.isFinite(value) && value > 0) {
      return value;
    }
  }

  return null;
}

function getRecommendation(commodity) {
  return (
    commodity?.initial_recommendation ??
    commodity?.rekomendasi_awal ??
    commodity?.recommendation ??
    'Pantau kelembapan tanah dan paparan matahari secara rutin.'
  );
}

function getGrowthStage(plantingDate, harvestDays) {
  if (!plantingDate) {
    return 'Seedling';
  }

  const plantedAt = new Date(plantingDate);
  const elapsedDays = Math.max(0, Math.floor((Date.now() - plantedAt.getTime()) / 86400000));

  if (!harvestDays) {
    return elapsedDays < 14 ? 'Seedling' : 'Vegetative';
  }

  const progress = elapsedDays / harvestDays;

  if (progress < 0.25) {
    return 'Seedling';
  }

  if (progress < 0.5) {
    return 'Vegetative';
  }

  if (progress < 0.85) {
    return 'Flowering';
  }

  return 'Ready to harvest';
}

function getEstimatedHarvestDate(plantingDate, harvestDays) {
  if (!plantingDate || !harvestDays) {
    return '';
  }

  const result = new Date(plantingDate);
  result.setDate(result.getDate() + harvestDays);
  return result.toISOString().slice(0, 10);
}

function formatDateLabel(dateValue) {
  if (!dateValue) {
    return 'Belum dihitung';
  }

  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(dateValue));
}

export default function AuthPlayground() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authMode, setAuthMode] = useState('login');
  const [authForm, setAuthForm] = useState(emptyForm);
  const [plotForm, setPlotForm] = useState(emptyPlotForm);
  const [plots, setPlots] = useState([]);
  const [komoditas, setKomoditas] = useState([]);
  const [deviceCoordinates, setDeviceCoordinates] = useState({ latitude: '', longitude: '' });
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!navigator.geolocation) {
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setDeviceCoordinates({
          latitude: position.coords.latitude.toFixed(6),
          longitude: position.coords.longitude.toFixed(6),
        });
      },
      () => {
        setDeviceCoordinates({ latitude: '', longitude: '' });
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
      }
    );
  }, []);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      setError('Supabase belum dikonfigurasi. Isi VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY di .env terlebih dulu.');
      return;
    }

    let mounted = true;

    const initialize = async () => {
      const { data } = await supabase.auth.getSession();

      if (!mounted) {
        return;
      }

      setSession(data.session ?? null);
      setLoading(false);
    };

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });

    initialize();

    return () => {
      mounted = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!session || !supabase) {
      setPlots([]);
      setKomoditas([]);
      return;
    }

    const loadReferenceData = async () => {
      const [plotsResult, komoditasResult] = await Promise.all([
        supabase
          .from('plots')
          .select('id, plot_name, location, planting_date, komoditas_id, latitude, longitude, estimated_harvest_date, current_growth_stage, initial_recommendation, is_active, created_at')
          .order('created_at', { ascending: false }),
        supabase
          .from('komoditas')
          .select('*')
          .order('nama', { ascending: true }),
      ]);

      if (plotsResult.error) {
        setError(plotsResult.error.message);
        setPlots([]);
      } else {
        setPlots(plotsResult.data ?? []);
      }

      if (komoditasResult.error) {
        setError(komoditasResult.error.message);
        setKomoditas([]);
      } else {
        setKomoditas(komoditasResult.data ?? []);
      }
    };

    loadReferenceData();
  }, [session]);

  const resetMessages = () => {
    setError('');
    setStatus('');
  };

  const handleAuthInput = (event) => {
    const { name, value } = event.target;
    setAuthForm((current) => ({ ...current, [name]: value }));
  };

  const handlePlotInput = (event) => {
    const { name, value } = event.target;
    setPlotForm((current) => ({ ...current, [name]: value }));
  };

  const selectedCommodity = komoditas.find((item) => String(item.id) === String(plotForm.komoditasId)) ?? null;
  const selectedCommodityLabel = selectedCommodity ? getCommodityLabel(selectedCommodity) : 'Pilih crop type';
  const selectedHarvestDays = getHarvestDays(selectedCommodity);
  const estimatedHarvestDate = getEstimatedHarvestDate(plotForm.plantingDate, selectedHarvestDays);
  const currentGrowthStage = getGrowthStage(plotForm.plantingDate, selectedHarvestDays);
  const initialRecommendation = getRecommendation(selectedCommodity);

  const handleRegister = async (event) => {
    event.preventDefault();
    resetMessages();

    const { data, error: signUpError } = await supabase.auth.signUp({
      email: authForm.email,
      password: authForm.password,
      options: {
        data: {
          display_name: authForm.displayName,
        },
      },
    });

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    setStatus(data.session ? 'Akun dibuat dan langsung login.' : 'Akun dibuat. Cek email jika verifikasi diaktifkan.');
    setAuthForm(emptyForm);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    resetMessages();

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: authForm.email,
      password: authForm.password,
    });

    if (signInError) {
      setError(signInError.message);
      return;
    }

    setStatus('Login berhasil.');
    setAuthForm(emptyForm);
  };

  const handleSignOut = async () => {
    resetMessages();
    const { error: signOutError } = await supabase.auth.signOut();

    if (signOutError) {
      setError(signOutError.message);
      return;
    }

    setStatus('Berhasil keluar.');
  };

  const handleCreatePlot = async (event) => {
    event.preventDefault();
    resetMessages();

    if (!session?.user?.id) {
      setError('Sesi login tidak ditemukan.');
      return;
    }

    const { error: insertError } = await supabase
      .from('plots')
      .insert({
        owner_id: session.user.id,
        plot_name: plotForm.plotName,
        komoditas_id: plotForm.komoditasId || null,
        location: plotForm.location,
        planting_date: plotForm.plantingDate,
        latitude: deviceCoordinates.latitude || null,
        longitude: deviceCoordinates.longitude || null,
        estimated_harvest_date: estimatedHarvestDate || null,
        current_growth_stage: currentGrowthStage,
        initial_recommendation: initialRecommendation,
      });

    if (insertError) {
      setError(insertError.message);
      return;
    }

    setStatus('Plot tersimpan.');
    setPlotForm(emptyPlotForm);

    const { data } = await supabase
      .from('plots')
      .select('id, plot_name, location, planting_date, komoditas_id, latitude, longitude, estimated_harvest_date, current_growth_stage, initial_recommendation, is_active, created_at')
      .order('created_at', { ascending: false });

    setPlots(data ?? []);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f3efe7] text-slate-900 flex items-center justify-center px-4">
        <div className="text-sm font-medium text-slate-500">Menyiapkan sesi...</div>
      </div>
    );
  }

  if (!isSupabaseConfigured || !supabase) {
    return (
      <div className="min-h-screen bg-[#f3efe7] text-slate-900 flex items-center justify-center px-4">
        <div className="w-full max-w-xl rounded-3xl border border-amber-200 bg-white p-6 shadow-lg">
          <p className="text-sm font-semibold text-amber-700">Supabase belum siap</p>
          <p className="mt-2 text-sm text-slate-600">Isi variabel env VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY, lalu reload aplikasi.</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#f7f2e8_0%,_#efe6d4_45%,_#e8dcc5_100%)] text-slate-900 px-4 py-10">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 lg:flex-row lg:items-stretch">
          <section className="flex-1 rounded-[2rem] border border-white/60 bg-white/80 p-8 shadow-[0_20px_80px_rgba(74,54,23,0.12)] backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700">Gora prototype</p>
            <h1 className="mt-3 max-w-md text-4xl font-semibold leading-tight text-slate-900">Akun, plot, dan progres tanaman yang tersimpan per user.</h1>
            <p className="mt-4 max-w-lg text-sm leading-6 text-slate-600">Login dulu, lalu setiap user punya plot sendiri seperti save file game. Setelah ini kamu bisa lanjut ke tanaman, log aktivitas, dan progress harian.</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                ['Auth', 'Email dan password sebagai pintu masuk.'],
                ['Plot', 'Milik user, tidak bercampur dengan user lain.'],
                ['RLS', 'Pembatasan database supaya data benar-benar per user.'],
              ].map(([title, desc]) => (
                <div key={title} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-800">{title}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-500">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="w-full max-w-xl rounded-[2rem] border border-white/60 bg-slate-950 p-6 text-white shadow-[0_20px_80px_rgba(15,23,42,0.22)]">
            <div className="flex gap-2 rounded-full bg-white/10 p-1 text-sm">
              <button
                type="button"
                onClick={() => setAuthMode('login')}
                className={`flex-1 rounded-full px-4 py-2 font-medium transition ${authMode === 'login' ? 'bg-white text-slate-950' : 'text-white/70'}`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => setAuthMode('register')}
                className={`flex-1 rounded-full px-4 py-2 font-medium transition ${authMode === 'register' ? 'bg-white text-slate-950' : 'text-white/70'}`}
              >
                Register
              </button>
            </div>

            <form onSubmit={authMode === 'register' ? handleRegister : handleLogin} className="mt-6 space-y-4">
              {authMode === 'register' && (
                <label className="block">
                  <span className="mb-2 block text-sm text-white/70">Nama tampilan</span>
                  <input
                    name="displayName"
                    value={authForm.displayName}
                    onChange={handleAuthInput}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none ring-0 placeholder:text-white/30 focus:border-emerald-300"
                    placeholder="Misal: Raka"
                  />
                </label>
              )}

              <label className="block">
                <span className="mb-2 block text-sm text-white/70">Email</span>
                <input
                  type="email"
                  name="email"
                  value={authForm.email}
                  onChange={handleAuthInput}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none ring-0 placeholder:text-white/30 focus:border-emerald-300"
                  placeholder="nama@email.com"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm text-white/70">Password</span>
                <input
                  type="password"
                  name="password"
                  value={authForm.password}
                  onChange={handleAuthInput}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none ring-0 placeholder:text-white/30 focus:border-emerald-300"
                  placeholder="Minimal 6 karakter"
                />
              </label>

              <button type="submit" className="w-full rounded-2xl bg-emerald-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300">
                {authMode === 'register' ? 'Buat akun' : 'Masuk'}
              </button>
            </form>

            {(error || status) && (
              <div className={`mt-4 rounded-2xl border px-4 py-3 text-sm ${error ? 'border-red-500/30 bg-red-500/10 text-red-100' : 'border-emerald-400/30 bg-emerald-400/10 text-emerald-100'}`}>
                {error || status}
              </div>
            )}
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4efe5] text-slate-900 px-4 py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <header className="flex flex-col gap-3 rounded-[2rem] border border-white/70 bg-white/80 px-6 py-5 shadow-[0_20px_80px_rgba(74,54,23,0.08)] backdrop-blur sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700">Dashboard awal</p>
            <h2 className="mt-1 text-2xl font-semibold">Halo, {session.user.email}</h2>
            <p className="mt-1 text-sm text-slate-500">Ini area test untuk memastikan akun dan plot tersimpan per user.</p>
          </div>
          <button onClick={handleSignOut} className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
            Logout
          </button>
        </header>

        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <section className="rounded-[2rem] border border-white/70 bg-slate-950 p-6 text-white shadow-[0_20px_80px_rgba(15,23,42,0.18)]">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300">Add new plot</p>
            <h3 className="mt-2 text-2xl font-semibold">Buat plot baru</h3>
            <p className="mt-2 text-sm text-white/60">Required: plot name, crop type, location, planting date. Sisanya bisa digenerate dari data tanaman.</p>

            <form onSubmit={handleCreatePlot} className="mt-6 space-y-5">
              <label className="block">
                <span className="mb-2 block text-sm text-white/70">Plot name</span>
                <input
                  name="plotName"
                  value={plotForm.plotName}
                  onChange={handlePlotInput}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-white/30 focus:border-emerald-300"
                  placeholder="e.g. Lahan Utara"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm text-white/70">Crop type</span>
                <select
                  name="komoditasId"
                  value={plotForm.komoditasId}
                  onChange={handlePlotInput}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-emerald-300"
                >
                  <option value="">Select crop</option>
                  {komoditas.map((item) => (
                    <option key={item.id} value={item.id}>
                      {getCommodityLabel(item)}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm text-white/70">Location</span>
                <input
                  name="location"
                  value={plotForm.location}
                  onChange={handlePlotInput}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-white/30 focus:border-emerald-300"
                  placeholder="Search location"
                />
              </label>

              <div className="space-y-2 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
                <p className="font-medium text-white/90">Selected location</p>
                <p>{plotForm.location || 'Belum dipilih'}</p>
                <div className="grid gap-2 text-xs sm:grid-cols-2">
                  <p>Latitude: {deviceCoordinates.latitude || 'Auto-generated'}</p>
                  <p>Longitude: {deviceCoordinates.longitude || 'Auto-generated'}</p>
                </div>
              </div>

              <label className="block">
                <span className="mb-2 block text-sm text-white/70">Planting date</span>
                <input
                  type="date"
                  name="plantingDate"
                  value={plotForm.plantingDate}
                  onChange={handlePlotInput}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-emerald-300"
                />
              </label>

              <button type="submit" className="w-full rounded-2xl bg-emerald-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300">
                Add Plot
              </button>
            </form>

            {(error || status) && (
              <div className={`mt-4 rounded-2xl border px-4 py-3 text-sm ${error ? 'border-red-500/30 bg-red-500/10 text-red-100' : 'border-emerald-400/30 bg-emerald-400/10 text-emerald-100'}`}>
                {error || status}
              </div>
            )}
          </section>

          <section className="rounded-[2rem] border border-white/70 bg-white p-6 shadow-[0_20px_80px_rgba(74,54,23,0.08)]">
            <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-semibold">Auto-generated preview</h3>
                <p className="text-sm text-slate-500">Data ini dibentuk dari crop type dan planting date.</p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">{plots.length} plot</span>
            </div>

            <div className="mt-4 grid gap-3 rounded-3xl bg-slate-50 p-4">
              <div className="rounded-2xl border border-slate-100 bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Crop</p>
                <p className="mt-2 text-sm font-semibold text-slate-800">{selectedCommodityLabel}</p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-100 bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Estimated harvest date</p>
                  <p className="mt-2 text-sm font-semibold text-slate-800">{formatDateLabel(estimatedHarvestDate)}</p>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Current growth stage</p>
                  <p className="mt-2 text-sm font-semibold text-slate-800">{currentGrowthStage}</p>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Initial recommendation</p>
                <p className="mt-2 text-sm leading-6 text-slate-700">{initialRecommendation}</p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-slate-800">Saved plots</h4>
                <span className="text-xs text-slate-500">Per user only</span>
              </div>

              {plots.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-5 text-sm text-slate-500">Belum ada plot. Tambahkan satu untuk mulai test save per user.</div>
              ) : (
                plots.map((plot) => (
                  <article key={plot.id} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h4 className="font-semibold text-slate-800">{plot.plot_name}</h4>
                        <p className="mt-1 text-sm text-slate-500">{plot.location || 'Lokasi belum diisi'}</p>
                      </div>
                      {plot.is_active && <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">Aktif</span>}
                    </div>

                    <div className="mt-4 grid gap-2 text-xs text-slate-500 sm:grid-cols-2">
                      <p>Planting date: {formatDateLabel(plot.planting_date)}</p>
                      <p>Harvest: {formatDateLabel(plot.estimated_harvest_date)}</p>
                      <p>Stage: {plot.current_growth_stage || '-'}</p>
                      <p>Crop ID: {plot.komoditas_id || '-'}</p>
                    </div>
                  </article>
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}