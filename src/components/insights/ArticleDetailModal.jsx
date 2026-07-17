import React from 'react';
import { RiCalendar2Line, RiTimeLine } from 'react-icons/ri';

export default function ArticleDetailModal({ article, isOpen, onClose }) {
  if (!isOpen || !article) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
      <div 
        className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto"
        style={{ paddingBottom: 'calc(1.5rem + var(--sab, 0px))' }}
      >
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            {article.category}
          </span>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center font-bold"
          >
            ✕
          </button>
        </div>

        <div className="w-full h-48 rounded-2xl overflow-hidden mb-4 bg-slate-100">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        <h1 className="text-lg font-black text-slate-900 font-['Montserrat_Alternates',sans-serif] leading-tight mb-2">
          {article.title}
        </h1>

        <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-4 pb-4 border-b border-slate-100">
          <span className="flex items-center gap-1"><RiCalendar2Line /> {article.date}</span>
          <span>•</span>
          <span className="flex items-center gap-1"><RiTimeLine /> {article.readTime} dibaca</span>
        </div>

        <div className="text-xs text-slate-700 leading-relaxed whitespace-pre-line space-y-3 font-medium">
          {article.content}
        </div>

        {article.link && (
          <a
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 w-full block text-center bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold py-3 rounded-2xl text-xs active:scale-95 transition-all"
          >
            Baca Artikel Lengkap di Jakarta Post ↗
          </a>
        )}

        <button
          onClick={onClose}
          className="mt-6 w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-2xl text-xs active:scale-95 transition-all shadow-md"
        >
          Tutup Artikel
        </button>
      </div>
    </div>
  );
}
