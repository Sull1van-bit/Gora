import { useState, useCallback } from 'react';
import { fetchAIRecommendations } from '../services/aiService';

export default function useAIRecommendations(weather, plots, actions, addActions) {
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState(null);
  const [error, setError] = useState(null);

  const getRecommendations = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAIRecommendations(weather, plots, actions);
      setRecommendation(data);
    } catch (err) {
      setError(err.message || 'Gagal memuat rekomendasi');
    } finally {
      setLoading(false);
    }
  }, [weather, plots, actions]);

  const applySuggestedTasks = useCallback(() => {
    if (!recommendation?.suggested_tasks || recommendation.suggested_tasks.length === 0) return;
    
    const newTasks = recommendation.suggested_tasks.map(task => ({
      id: crypto.randomUUID(),
      plot_id: task.plot_id || null,
      plot_name: task.plot_name || 'Semua Lahan',
      komoditas_icon: task.komoditas_icon || 'leaf',
      title: task.title,
      description: task.description,
      status: 'today',
      due_text: 'Hari ini (Saran AI)',
      priority: task.priority || 'medium',
      activity_type: task.activity_type || 'General Task',
      is_ai_generated: true,
    }));

    addActions(newTasks);
    
    // Clear recommendation after applying to hide the button or refresh UI
    setRecommendation(prev => ({
      ...prev,
      suggested_tasks: []
    }));

  }, [recommendation, addActions]);

  return {
    loading,
    recommendation,
    error,
    getRecommendations,
    applySuggestedTasks
  };
}
