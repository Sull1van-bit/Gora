import React, { useState, useEffect } from 'react';
import AppLayout from './components/layout/AppLayout';
import HomePage from './pages/HomePage';
import PlotsPage from './pages/PlotsPage';
import PlotDetailPage from './pages/PlotDetailPage';
import InsightsPage from './pages/InsightsPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import VerifyOtpPage from './pages/VerifyOtpPage';
import WelcomePage from './pages/WelcomePage';
import SplashPage from './pages/SplashPage';
import AddPlotModal from './components/plots/AddPlotModal';
import useGoraData from './hooks/useGoraData';
import useAuth from './hooks/useAuth';
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
    addActions,
    addPlot,
    logActivity,
    reportIssue,
    resetDemoData,
  } = useGoraData();

  const { latitude, longitude, provinsi, kecamatan, loading: locLoading, refetch: refetchLocation } = useUserLocation();
  const { weatherData: weather, loading: weatherLoading, hourlyForecast, weeklyForecast } = useWeather();
  const { newsList, loading: newsLoading } = useNews();
  const locationLabel = kecamatan && provinsi ? `${kecamatan}, ${provinsi}` : null;

  const [activeTab, setActiveTab] = useState('home');
  const [selectedPlotId, setSelectedPlotId] = useState(null);
  const [insightsTab, setInsightsTab] = useState('weather');
  const [isAddPlotModalOpen, setIsAddPlotModalOpen] = useState(false);
  const [authView, setAuthView] = useState('welcome'); // welcome | login | register | verify
  const [registeredEmail, setRegisteredEmail] = useState('');
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

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

  if (showSplash || authLoading) {
    return <SplashPage />;
  }

  if (!session) {
    if (authView === 'welcome') {
      return (
        <WelcomePage 
          onNavigateLogin={() => setAuthView('login')}
          onNavigateRegister={() => setAuthView('register')}
        />
      );
    }
    if (authView === 'register') {
      return (
        <RegisterPage 
          onBackToLogin={() => setAuthView('login')} 
          onRegisterSuccess={(email) => {
            setRegisteredEmail(email);
            setAuthView('verify');
          }} 
        />
      );
    }
    if (authView === 'verify') {
      return (
        <VerifyOtpPage 
          email={registeredEmail}
          onBack={() => setAuthView('login')}
          onVerifySuccess={(s) => {
            setAuthView('login'); // Will trigger re-render and session will be valid
          }}
        />
      );
    }
    return (
      <LoginPage 
        onLoginSuccess={(s) => {}} 
        onNavigateRegister={() => setAuthView('register')} 
        onBack={() => setAuthView('welcome')}
      />
    );
  }

  return (
    <>
      <AppLayout
        activeTab={activeTab === 'plot-detail' ? 'plots' : activeTab}
        currentRoute={activeTab}
        onTabChange={(tab) => {
          if (tab === 'add-plot') {
            setIsAddPlotModalOpen(true);
          } else {
            navigateTo(tab);
          }
        }}
        onOpenAddPlot={() => setIsAddPlotModalOpen(true)}
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
            onAddActions={addActions}
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
    </>
  );
}