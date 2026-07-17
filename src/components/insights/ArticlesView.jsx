import React from 'react';
import { RiNewspaperLine } from 'react-icons/ri';

export default function ArticlesView({ newsList, newsLoading, onSelectArticle }) {
  const renderSkeletons = () => (
    <div className="space-y-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-xs flex gap-3.5 animate-pulse">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-slate-200 shrink-0"></div>
          <div className="flex-1 flex flex-col justify-between py-1">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="h-4 w-16 bg-emerald-100 rounded-full"></div>
                <div className="h-3 w-12 bg-slate-200 rounded"></div>
              </div>
              <div className="h-4 w-full bg-slate-200 rounded mb-1.5"></div>
              <div className="h-4 w-3/4 bg-slate-200 rounded"></div>
            </div>
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100">
              <div className="h-3 w-16 bg-slate-200 rounded"></div>
              <div className="h-3 w-20 bg-emerald-100 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-3.5 animate-fade-in">
      <div className="flex items-center justify-between px-1">
        <div>
          <h2 className="text-base font-extrabold text-slate-800 font-['Montserrat_Alternates',sans-serif] flex items-center gap-1.5">
            <RiNewspaperLine /> Berita & Panduan Tani
          </h2>
          <p className="text-xs text-slate-500">Tips agronomi & perkembangan pasar pertanian</p>
        </div>
      </div>

      <div className="space-y-3">
        {newsLoading ? renderSkeletons() : newsList?.length > 0 ? newsList.map((article) => (
          <div
            key={article.id}
            onClick={() => onSelectArticle(article)}
            className="bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all cursor-pointer flex gap-3.5 active:scale-[0.99] group"
          >
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-slate-100 shrink-0 relative">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="flex-1 min-w-0 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                    {article.category}
                  </span>
                  <span className="text-[10px] text-slate-400 font-semibold shrink-0">
                    {article.readTime}
                  </span>
                </div>

                <h3 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2 leading-tight">
                  {article.title}
                </h3>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 pt-2 border-t border-slate-100">
                <span>{article.date}</span>
                <span className="text-emerald-600 font-bold group-hover:translate-x-0.5 transition-transform">
                  Baca Artikel →
                </span>
              </div>
            </div>
          </div>
        )) : (
          <div className="text-center py-8 text-slate-500 text-sm">
            Belum ada berita terbaru.
          </div>
        )}
      </div>
    </div>
  );
}
