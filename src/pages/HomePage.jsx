import React from 'react';
import useUserLocation from '../hooks/useUserLocation';
import useProfile from '../hooks/useProfile';
import HomeHero from '../components/home/HomeHero';
import HomeWeatherCard from '../components/home/HomeWeatherCard';
import HomePlotsSlider from '../components/home/HomePlotsSlider';
import HomePriorities from '../components/home/HomePriorities';
import HomeInsightsCard from '../components/home/HomeInsightsCard';
import HomeInfoMarket from '../components/home/HomeInfoMarket';

export default function HomePage({ 
  plots, 
  actions, 
  weather, 
  komoditasList, 
  newsList,
  onCompleteAction, 
  onSelectPlot, 
  onNavigateTab,
  onOpenAddPlot,
  weatherLoading
}) {
  const { provinsi, kecamatan, loading: locLoading } = useUserLocation();
  const { profile, loading: profileLoading } = useProfile();
  
  const displayName = profile?.full_name || profile?.username || 'Pengguna';

  const sortedPlots = [...plots].sort((a, b) => {
    if (b.priority_score !== a.priority_score) {
      return b.priority_score - a.priority_score;
    }
    return new Date(b.updated_at) - new Date(a.updated_at);
  }).slice(0, 8);

  const pendingActions = actions.filter(a => a.status !== 'completed');
  const completedActions = actions.filter(a => a.status === 'completed');
  const totalActionsCount = actions.length || 2;
  const completedActionsCount = completedActions.length;

  return (
    <div className="animate-fade-in space-y-0 bg-[#f5f9ed] min-h-screen pb-[80px] relative">
      <HomeHero 
        profileLoading={profileLoading} 
        displayName={displayName} 
        streakCount={profile?.streak_count || 0}
      />

      <HomeWeatherCard 
        locLoading={locLoading} 
        kecamatan={kecamatan} 
        provinsi={provinsi} 
        onNavigateTab={onNavigateTab} 
        weatherLoading={weatherLoading} 
        weather={weather} 
      />

      <HomePlotsSlider 
        onNavigateTab={onNavigateTab} 
        sortedPlots={sortedPlots} 
        onSelectPlot={onSelectPlot} 
        onOpenAddPlot={onOpenAddPlot} 
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-4 mt-3 pb-2">
        <HomePriorities 
          pendingActions={pendingActions} 
          onCompleteAction={onCompleteAction} 
          completedActionsCount={completedActionsCount} 
          totalActionsCount={totalActionsCount} 
        />
        <HomeInsightsCard onNavigateTab={onNavigateTab} />
      </div>

      <HomeInfoMarket 
        onNavigateTab={onNavigateTab} 
        komoditasList={komoditasList}
        newsList={newsList} 
      />
    </div>
  );
}
