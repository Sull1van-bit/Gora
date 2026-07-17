import React from 'react';
import { RiRobot2Line, RiCheckDoubleLine, RiLoader4Line } from 'react-icons/ri';
import UniversalIcon from '../../utils/iconHelper';

export default function AIRecommendationCard({
  loading,
  recommendation,
  error,
  onGetRecommendations,
  onApplyTasks
}) {
  return (
    <div className="bg-gradient-to-br from-[#e9f2d6] to-[#fbf9f3] rounded-[20px] p-4 shadow-[0px_4px_20px_rgba(40,80,45,0.08)] border border-[#c6d5a2]/50 relative overflow-hidden transition-all mt-4 mx-4">
      <div className="flex items-center justify-between mb-3 relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-[#28502d] rounded-full flex items-center justify-center shadow-inner">
            <RiRobot2Line className="w-4 h-4 text-[#fbf9f3]" />
          </div>
          <h2 className="text-[14px] font-['Montserrat_Alternates',sans-serif] font-bold text-[#28502d]">
            Gora AI
          </h2>
        </div>
        {!loading && !recommendation && (
          <button
            onClick={onGetRecommendations}
            className="text-[10px] sm:text-[11px] font-['Montserrat_Alternates',sans-serif] font-bold text-white bg-[#3a6c3d] px-3 py-1.5 rounded-full hover:bg-[#28502d] transition-colors active:scale-95"
          >
            Minta Saran
          </button>
        )}
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center py-4 relative z-10">
          <RiLoader4Line className="w-6 h-6 text-[#3a6c3d] animate-spin mb-2" />
          <p className="text-[11px] font-medium text-[#6f6e72] animate-pulse">
            Menganalisis cuaca dan lahan...
          </p>
        </div>
      )}

      {error && (
        <div className="text-[11px] text-red-600 bg-red-50 p-2 rounded-lg relative z-10">
          {error}
        </div>
      )}

      {recommendation && !loading && (
        <div className="space-y-3 relative z-10 animate-fade-in">
          <p className="text-[11px] sm:text-[12px] font-medium text-[#3c3b3b] leading-relaxed">
            {recommendation.message}
          </p>

          {recommendation.suggested_tasks && recommendation.suggested_tasks.length > 0 && (
            <div className="bg-white/60 rounded-xl p-3 border border-white/80">
              <h3 className="text-[10px] font-bold text-[#6f6e72] mb-2 uppercase tracking-wider">
                Tugas yang disarankan ({recommendation.suggested_tasks.length})
              </h3>
              <div className="space-y-2">
                {recommendation.suggested_tasks.map((task, idx) => (
                  <div key={idx} className="flex gap-2 items-start">
                    <div className="mt-0.5">
                      <UniversalIcon icon={task.komoditas_icon || 'leaf'} className="w-4 h-4 text-[#3a6c3d]" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-[#3c3b3b]">{task.title}</p>
                      <p className="text-[10px] text-[#6f6e72] line-clamp-1">{task.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={onApplyTasks}
                className="mt-3 w-full flex items-center justify-center gap-1.5 bg-[#28502d] hover:bg-[#1a381e] text-white text-[11px] font-bold py-2 rounded-xl transition-all active:scale-[0.98]"
              >
                <RiCheckDoubleLine className="w-4 h-4" />
                Tambahkan ke To-Do List
              </button>
            </div>
          )}
        </div>
      )}

      {/* Decorative background circle */}
      <div className="absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br from-[#c6d5a2]/20 to-transparent rounded-full blur-xl pointer-events-none" />
    </div>
  );
}
