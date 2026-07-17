import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function useAuth() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    if (supabase) await supabase.auth.signOut();
    setSession(null);
  };

  return { session, loading, signOut };
}
