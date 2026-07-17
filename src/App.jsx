import React, { useState, useEffect } from 'react';
import AppLayout from './components/layout/AppLayout';
import HomePage from './pages/HomePage';
import PlotsPage from './pages/PlotsPage';
import PlotDetailPage from './pages/PlotDetailPage';
import InsightsPage from './pages/InsightsPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import AddPlotModal from './components/plots/AddPlotModal';
import LogObservationModal from './components/plots/LogObservationModal';
import useGoraData from './hooks/useGoraData';
import useAuth from './hooks/useAuth';
import useProfile from './hooks/useProfile';
import useUserLocation from './hooks/useUserLocation';
import useWeather from './hooks/useWeather';
import useNews from './hooks/useNews';
import { RiLoader4Line } from 'react-icons/ri';

export default function App() {
  const { session, loading: authLoading, signOut } = useAuth();

  const {
    plots,
    actions,
    activities,
    komoditasList,
    completeAction,
    addPlot,
    logActivity,
    reportIssue,
    resetDemoData,
    streakInfo,
    syncStreakFromProfile,
  } = useGoraData();

  const { latitude, longitude, provinsi, kecamatan, loading: locLoading, refetch: refetchLocation } = useUserLocation();
  const { weatherData: weather, loading: weatherLoading, hourlyForecast, weeklyForecast } = useWeather();
  const { newsList, loading: newsLoading } = useNews();
  const { profile } = useProfile();
  const locationLabel = kecamatan && provinsi ? `${kecamatan}, ${provinsi}` : null;

  const [activeTab, setActiveTab] = useState('home');
  const [selectedPlotId, setSelectedPlotId] = useState(null);
  const [insightsTab, setInsightsTab] = useState('weather');
  const [isAddPlotModalOpen, setIsAddPlotModalOpen] = useState(false);
  const [isLogObservationModalOpen, setIsLogObservationModalOpen] = useState(false);
  const [logObservationInitialPlotId, setLogObservationInitialPlotId] = useState(null);
  const [logObservationInitialStep, setLogObservationInitialStep] = useState(1);

  useEffect(() => {
    if (profile) {
      syncStreakFromProfile(profile);
    }
  }, [profile, syncStreakFromProfile]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') || 'home';
      if (hash.startsWith('plot/')) {
        const id = hash.split('/')[1];
        setSelectedPlotId(id);
        setActiveTab('plot-detail');
      } else if (hash.startsWith('insights/')) {
        const sub = hash.split('/')[1];
        setInsightsTab(sub || 'weather');
        setActiveTab('insights');
      } else if (hash === 'log-observation') {
        setIsLogObservationModalOpen(true);
      } else if (['home', 'plots', 'insights', 'profile'].includes(hash)) {
        setActiveTab(hash);
        setSelectedPlotId(null);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (tab, subParam = null) => {
    if (tab === 'log-observation') {
      setIsLogObservationModalOpen(true);
      return;
    }
    if (tab === 'add-plot') {
      setIsAddPlotModalOpen(true);
      return;
    }
    if (tab === 'plot-detail' && subParam) {
      window.location.hash = `plot/${subParam}`;
    } else if (tab === 'insights' && subParam) {
      window.location.hash = `insights/${subParam}`;
    } else {
      window.location.hash = tab;
    }
  };

  const urgentOrAttentionCount = plots.filter(p => p.status === 'urgent').length +
    actions.filter(a => a.status === 'overdue').length;

  const getHeaderProps = () => {
    switch (activeTab) {
      case 'plots':
        return { headerTitle: 'Lahan Saya', headerSubtitle: 'Manajemen Plot & Tanaman' };
      case 'insights':
        return { headerTitle: 'Wawasan Pertanian', headerSubtitle: 'Cuaca, Pasar & Edukasi' };
      case 'profile':
        return { headerTitle: 'Profil Pengguna', headerSubtitle: 'Pengaturan & Akun' };
      case 'plot-detail': {
        const p = plots.find(item => item.id === selectedPlotId);
        return {
          headerTitle: p ? p.plot_name : 'Detail Lahan',
          headerSubtitle: p ? `${p.komoditas_nama} • ${p.area} m²` : 'Informasi Lengkap',
          showBack: true,
          onBack: () => navigateTo('plots'),
        };
      }
      case 'home':
      default:
        return {
          headerTitle: null,
          headerSubtitle: 'Solusi Pintar Pertanian Nusantara',
        };
    }
  };

  if (authLoading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', fontFamily: 'sans-serif', color: '#555', gap: '8px' }}>
        <RiLoader4Line className="animate-spin text-xl" /> <p>Memuat...</p>
      </div>
    );
  }

  if (!session) {
    return <LoginPage onLoginSuccess={(s) => {  }} />;
  }

  return (
    <>
      <AppLayout
        activeTab={activeTab}
        currentRoute={activeTab}
        onTabChange={navigateTo}
        onOpenAddPlot={() => setIsAddPlotModalOpen(true)}
        onOpenLogObservation={() => {
          setLogObservationInitialPlotId(null);
          setLogObservationInitialStep(1);
          setIsLogObservationModalOpen(true);
        }}
        urgentCount={urgentOrAttentionCount}
        {...getHeaderProps()}
      >
        {activeTab === 'home' && (
          <HomePage
            plots={plots}
            actions={actions}
            activities={activities}
            weather={weather}
            weatherLoading={weatherLoading}
            komoditasList={komoditasList}
            newsList={newsList}
            onCompleteAction={completeAction}
            onSelectPlot={(id) => navigateTo('plot-detail', id)}
            onNavigateTab={navigateTo}
            onOpenAddPlot={() => setIsAddPlotModalOpen(true)}
            provinsi={provinsi}
            kecamatan={kecamatan}
            locLoading={locLoading}
          />
        )}

        {activeTab === 'plots' && (
          <PlotsPage
            plots={plots}
            komoditasList={komoditasList}
            onAddPlot={addPlot}
            onOpenAddPlot={() => setIsAddPlotModalOpen(true)}
            onLogActivity={logActivity}
            onReportIssue={reportIssue}
            onSelectPlot={(id) => navigateTo('plot-detail', id)}
          />
        )}

        {activeTab === 'plot-detail' && (
          <PlotDetailPage
            plotId={selectedPlotId}
            plots={plots}
            actions={actions}
            activities={activities}
            onCompleteAction={completeAction}
            onLogActivity={logActivity}
            onReportIssue={reportIssue}
            onBack={() => navigateTo('plots')}
            onOpenLogObservation={(plotId, step = 2) => {
              setLogObservationInitialPlotId(plotId);
              setLogObservationInitialStep(step);
              setIsLogObservationModalOpen(true);
            }}
          />
        )}

        {activeTab === 'insights' && (
          <InsightsPage
            weather={weather}
            hourlyForecast={hourlyForecast}
            weeklyForecast={weeklyForecast}
            locationLabel={locationLabel}
            newsList={newsList}
            newsLoading={newsLoading}
            initialTab={insightsTab}
          />
        )}

        {activeTab === 'profile' && (
          <ProfilePage 
            plots={plots} 
            onSignOut={signOut} 
            onResetDemoData={resetDemoData}
            provinsi={provinsi}
            kecamatan={kecamatan}
            refetchLocation={refetchLocation}
          />
        )}
      </AppLayout>

      <AddPlotModal
        isOpen={isAddPlotModalOpen}
        onClose={() => setIsAddPlotModalOpen(false)}
        onSave={addPlot}
        komoditasList={komoditasList}
        provinsi={provinsi}
        kecamatan={kecamatan}
      />

      <LogObservationModal
        isOpen={isLogObservationModalOpen}
        onClose={() => setIsLogObservationModalOpen(false)}
        plots={plots}
        onSaveObservation={logActivity}
        streakCount={streakInfo.count}
        initialPlotId={logObservationInitialPlotId}
        initialStep={logObservationInitialStep}
      />
    </>
  );
}