import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function usePlots(userId = null) {
  const [plots, setPlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPlots = useCallback(async () => {
    setLoading(true);
    setError(null);

    if (!supabase) {
      setPlots([]);
      setLoading(false);
      return;
    }

    try {
      let query = supabase
        .from('plots')
        .select('id, name, crop, phase, progress, harvest_days, status, cover_url, emoji')
        .order('created_at', { ascending: true });

      if (userId) {
        query = query.eq('user_id', userId);
      }

      const { data, error: fetchError } = await query;
      if (fetchError) throw fetchError;

      setPlots(data ?? []);
    } catch (err) {
      console.error('[usePlots] Error:', err.message);
      setError(err.message);
      setPlots([]);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchPlots();
  }, [fetchPlots]);

  return { plots, loading, error, refetch: fetchPlots };
}
