import { supabase } from '../lib/supabaseClient';

export async function fetchAIRecommendations(weather, plots, actions) {
  if (!supabase) {
    throw new Error('Supabase client not initialized');
  }

  // Optimize payload size by stripping out unnecessary data
  const payload = {
    weather: {
      temp: weather?.temp,
      condition: weather?.condition,
      humidity: weather?.humidity,
      rainChance: weather?.rainChance,
    },
    plots: plots.map(p => ({
      id: p.id,
      name: p.plot_name,
      komoditas: p.komoditas_nama,
      status: p.status_text,
      last_watered: p.last_watered,
    })),
    actions: actions.map(a => ({
      id: a.id,
      title: a.title,
      status: a.status,
      due: a.due_text,
    })),
  };

  const { data, error } = await supabase.functions.invoke('ai-recommendation', {
    body: payload,
  });

  if (error) {
    console.error('Error fetching AI recommendations:', error);
    throw error;
  }

  return data;
}
