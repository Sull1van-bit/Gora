import React, { useState, useEffect } from 'react';
import WeatherDetailView from '../components/insights/WeatherDetailView';
import HargaKomoditas from '../components/HargaTanaman';
import ArticlesView from '../components/insights/ArticlesView';
import ArticleDetailModal from '../components/insights/ArticleDetailModal';

export default function InsightsPage({ weather, newsList, initialTab = 'weather' }) {
  const [activeSubTab, setActiveSubTab] = useState(initialTab); // 'weather' | 'market' | 'articles'
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    if (initialTab) {
      setActiveSubTab(initialTab);
    }
  }, [initialTab]);

  const tabs = [
    { id: 'weather', label: '🌤️ Cuaca & Advisory' },
    { id: 'market', label: '📈 Harga Pasar' },
    { id: 'articles', label: '📰 Berita Tani' },
  ];

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Page Header */}
      <div>
        <h1 className="text-xl font-extrabold text-slate-900 font-['Montserrat_Alternates',sans-serif]">
          Wawasan Pertanian (Insights)
        </h1>
        <p className="text-xs text-slate-500 font-medium">
          Prakiraan cuaca, fluktuasi harga pasar, dan edukasi agronomi
        </p>
      </div>

      {/* Sub-Navigation Pill Tabs */}
      <div className="flex bg-slate-200/70 p-1 rounded-2xl">
        {tabs.map((tab) => {
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                isActive
                  ? 'bg-white text-slate-900 shadow-sm scale-[1.01]'
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Contents */}
      <div className="pt-1">
        {activeSubTab === 'weather' && (
          <WeatherDetailView weather={weather} />
        )}

        {activeSubTab === 'market' && (
          <HargaKomoditas />
        )}

        {activeSubTab === 'articles' && (
          <ArticlesView
            newsList={newsList}
            onSelectArticle={(art) => setSelectedArticle(art)}
          />
        )}
      </div>

      {/* Article Reader Modal */}
      <ArticleDetailModal
        article={selectedArticle}
        isOpen={Boolean(selectedArticle)}
        onClose={() => setSelectedArticle(null)}
      />
    </div>
  );
}
