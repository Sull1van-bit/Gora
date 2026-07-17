import React, { useState, useEffect } from 'react';
import WeatherDetailView from '../components/insights/WeatherDetailView';
import HargaKomoditas from '../components/HargaTanaman';
import ArticlesView from '../components/insights/ArticlesView';
import ArticleDetailModal from '../components/insights/ArticleDetailModal';
import { RiSunCloudyLine, RiLineChartLine, RiNewspaperLine } from 'react-icons/ri';

export default function InsightsPage({ weather, newsList, newsLoading, initialTab = 'weather' }) {
  const [activeSubTab, setActiveSubTab] = useState(initialTab);
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    if (initialTab) {
      setActiveSubTab(initialTab);
    }
  }, [initialTab]);

  const tabs = [
    { id: 'weather', label: <><RiSunCloudyLine className="inline-block mr-1.5 text-base" /> Cuaca & Advisory</> },
    { id: 'market', label: <><RiLineChartLine className="inline-block mr-1.5 text-base" /> Harga Pasar</> },
    { id: 'articles', label: <><RiNewspaperLine className="inline-block mr-1.5 text-base" /> Berita Tani</> },
  ];

  return (
    <div className="space-y-4 pt-4 pb-24 px-4 sm:px-5 animate-fade-in text-[#3c3b3b]">
      
      <div className="text-center">
        <h1 className="font-['Montserrat_Alternates',sans-serif] font-bold text-[#28502d] text-[20px] sm:text-[22px] tracking-tight">
          Wawasan Pertanian
        </h1>
        <p className="text-xs text-[#6f6e72] font-medium mt-1">
          Prakiraan cuaca, fluktuasi harga pasar, dan edukasi agronomi
        </p>
      </div>

      
      <div className="flex bg-[#c6d5a2]/35 p-1 rounded-[20px] border border-[#c6d5a2]/50 shadow-2xs mt-4">
        {tabs.map((tab) => {
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`flex-1 py-2 rounded-[16px] text-[11px] sm:text-xs font-['Montserrat_Alternates',sans-serif] font-bold transition-all ${
                isActive
                  ? 'bg-[#28502d] text-white shadow-2xs scale-[1.02]'
                  : 'text-[#3c3b3b] hover:text-[#28502d]'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      
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
            newsLoading={newsLoading}
            onSelectArticle={(art) => setSelectedArticle(art)}
          />
        )}
      </div>

      
      <ArticleDetailModal
        article={selectedArticle}
        isOpen={Boolean(selectedArticle)}
        onClose={() => setSelectedArticle(null)}
      />
    </div>
  );
}
