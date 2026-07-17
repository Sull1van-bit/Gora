import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function useTasks(userId = null) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);

    if (!supabase) {
      setTasks([]);
      setLoading(false);
      return;
    }

    try {
      const today = new Date().toISOString().split('T')[0];
      let query = supabase
        .from('tasks')
        .select('id, title, subtitle, icon, is_done')
        .eq('date', today)
        .order('created_at', { ascending: true });

      if (userId) {
        query = query.eq('user_id', userId);
      }

      const { data, error: fetchError } = await query;
      if (fetchError) throw fetchError;

      setTasks(data ?? []);
    } catch (err) {
      console.error('[useTasks] Error:', err.message);
      setError(err.message);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const toggleTask = useCallback(async (taskId, currentValue) => {
    if (!supabase) return;
    const { error: updateError } = await supabase
      .from('tasks')
      .update({ is_done: !currentValue })
      .eq('id', taskId);

    if (!updateError) {
      setTasks((prev) =>
        prev.map((t) => (t.id === taskId ? { ...t, is_done: !currentValue } : t))
      );
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return { tasks, loading, error, refetch: fetchTasks, toggleTask };
}
