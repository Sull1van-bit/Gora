import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabaseClient';
import useAuth from './useAuth';

export default function useProfile() {
  const { session } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = session?.user?.id;
  const userEmail = session?.user?.email ?? '';
  const userMeta = session?.user?.user_metadata ?? {};

  const fetchProfile = useCallback(async () => {
    if (!supabase || !userId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data, error: fetchErr } = await supabase
        .from('profile')
        .select('*')
        .eq('id', userId)
        .single();

      if (fetchErr && fetchErr.code === 'PGRST116') {
        const { data: inserted, error: insertErr } = await supabase
          .from('profile')
          .insert({ 
            id: userId, 
            full_name: userMeta.full_name ?? '', 
            username: userMeta.username ?? userEmail.split('@')[0],
            phone_number: '' 
          })
          .select()
          .single();

        if (insertErr) throw insertErr;
        setProfile({ ...inserted, email: userEmail });
      } else if (fetchErr) {
        throw fetchErr;
      } else {
        setProfile({ ...data, email: userEmail });
      }
    } catch (err) {
      console.error('[useProfile]', err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [userId, userEmail]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const updateProfile = useCallback(async (updates) => {
    if (!supabase || !userId) return { error: 'Not authenticated' };

    const { data, error: updateErr } = await supabase
      .from('profile')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', userId)
      .select()
      .single();

    if (!updateErr) {
      setProfile((prev) => ({ ...prev, ...data, email: userEmail }));
    }
    return { data, error: updateErr };
  }, [userId, userEmail]);

  return { profile, loading, error, refetch: fetchProfile, updateProfile };
}
