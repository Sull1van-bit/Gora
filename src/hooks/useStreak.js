import { useState, useCallback } from 'react';
import { supabase } from '../lib/supabaseClient';
import useAuth from './useAuth';

export default function useStreak(profileData) {
  const { session } = useAuth();
  const [streakCount, setStreakCount] = useState(profileData?.streak_count ?? 0);
  const [longestStreak, setLongestStreak] = useState(profileData?.longest_streak ?? 0);
  const [lastActivityDate, setLastActivityDate] = useState(profileData?.last_activity_date ?? null);
  const [incrementing, setIncrementing] = useState(false);

  const syncFromProfile = useCallback((p) => {
    if (!p) return;
    setStreakCount(p.streak_count ?? 0);
    setLongestStreak(p.longest_streak ?? 0);
    setLastActivityDate(p.last_activity_date ?? null);
  }, []);

  const incrementStreak = useCallback(async () => {
    if (!supabase || !session?.user?.id || incrementing) return;

    setIncrementing(true);
    try {
      const { data, error } = await supabase
        .rpc('increment_streak', { p_user_id: session.user.id });

      if (error) throw error;

      if (data && data.length > 0) {
        const result = data[0];
        setStreakCount(result.streak_count);
        setLongestStreak(result.longest_streak);
        setLastActivityDate(result.last_activity_date);
      }
    } catch (err) {
      console.warn('[useStreak] increment failed:', err.message);
    } finally {
      setIncrementing(false);
    }
  }, [session?.user?.id, incrementing]);

  
  const isActiveToday = lastActivityDate === new Date().toISOString().split('T')[0];

  
  const streakStatus =
    streakCount >= 7 ? 'hot' :
    streakCount >= 3 ? 'warm' : 'cold';

  return {
    streakCount,
    longestStreak,
    lastActivityDate,
    isActiveToday,
    streakStatus,
    incrementStreak,
    syncFromProfile,
  };
}
