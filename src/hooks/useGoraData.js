import { useState, useEffect, useCallback } from 'react';
import { 
  INITIAL_PLOTS, 
  INITIAL_KOMODITAS, 
  INITIAL_ACTIONS, 
  INITIAL_ACTIVITIES, 
  INITIAL_NEWS,
  WEATHER_PREVIEW 
} from '../services/dataStore';
import { supabase } from '../lib/supabaseClient';

async function fireIncrementStreak() {
  if (!supabase) return;
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user?.id) {
      await supabase.rpc('increment_streak', { p_user_id: session.user.id });
    }
  } catch (err) {
    console.warn('[streak] increment failed:', err.message);
  }
}

export default function useGoraData() {
  const [plots, setPlots] = useState(() => {
    const saved = localStorage.getItem('gora_plots');
    return saved ? JSON.parse(saved) : INITIAL_PLOTS;
  });

  const [actions, setActions] = useState(() => {
    const saved = localStorage.getItem('gora_actions');
    return saved ? JSON.parse(saved) : INITIAL_ACTIONS;
  });

  const [activities, setActivities] = useState(() => {
    const saved = localStorage.getItem('gora_activities');
    return saved ? JSON.parse(saved) : INITIAL_ACTIVITIES;
  });

  const [komoditasList, setKomoditasList] = useState(INITIAL_KOMODITAS);
  const [newsList] = useState(INITIAL_NEWS);
  const [weather] = useState(WEATHER_PREVIEW);

  const [streakInfo, setStreakInfo] = useState(() => {
    const saved = localStorage.getItem('gora_streak_info');
    if (saved) {
      try { return JSON.parse(saved); } catch(e) {}
    }
    return { count: 3, lastActivityDate: null };
  });

  const syncStreakFromProfile = useCallback((profileData) => {
    if (!profileData) return;
    setStreakInfo(prev => {
      const updated = {
        count: profileData.streak_count ?? prev.count,
        lastActivityDate: profileData.last_activity_date ?? prev.lastActivityDate
      };
      localStorage.setItem('gora_streak_info', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Keep local storage strictly as a fast offline fallback cache
  useEffect(() => {
    localStorage.setItem('gora_plots', JSON.stringify(plots));
  }, [plots]);

  useEffect(() => {
    localStorage.setItem('gora_actions', JSON.stringify(actions));
  }, [actions]);

  useEffect(() => {
    localStorage.setItem('gora_activities', JSON.stringify(activities));
  }, [activities]);

  // Fetch live Supabase data on mount
  useEffect(() => {
    async function fetchSupabaseData() {
      if (!supabase) return;
      try {
        // 1. Fetch Komoditas
        const { data: komData } = await supabase.from('komoditas').select('*');
        if (komData && komData.length > 0) {
          setKomoditasList(komData);
        }

        // 2. Fetch Plots with joined Komoditas info
        const { data: plotsData, error: plotsErr } = await supabase
          .from('plots')
          .select('*, komoditas(*)')
          .order('created_at', { ascending: false });

        if (!plotsErr && plotsData) {
          const mappedPlots = plotsData.map(p => ({
            ...p,
            komoditas_nama: p.komoditas?.nama || p.komoditas_nama || 'Tanaman',
            komoditas_icon: p.komoditas?.icon || p.komoditas_icon || '🌱',
            growth_progress: p.growth_progress ?? 15,
            status: p.status || 'ontrack',
            priority_score: p.priority_score ?? 30,
            last_watered: p.last_watered || 'Belum dilakukan',
            last_fertilized: p.last_fertilized || 'Belum dilakukan'
          }));
          if (mappedPlots.length > 0) {
            setPlots(mappedPlots);
          }
        }

        // 3. Fetch Actions
        const { data: actionsData, error: actionsErr } = await supabase
          .from('actions')
          .select('*')
          .order('created_at', { ascending: false });

        let finalActions = actionsData || [];
        if (!actionsErr && actionsData && actionsData.length === 0) {
          await supabase.from('actions').insert(INITIAL_ACTIONS);
          finalActions = INITIAL_ACTIONS;
        }

        // Ensure every plot has daily actions in Supabase actions table
        if (plotsData && plotsData.length > 0) {
          const missingActions = [];
          plotsData.forEach(p => {
            const hasAct = finalActions.some(a => a.plot_id === p.id);
            if (!hasAct) {
              missingActions.push({
                id: crypto.randomUUID(),
                plot_id: p.id,
                plot_name: p.plot_name,
                komoditas_icon: p.komoditas?.icon || p.komoditas_icon || '🌱',
                title: 'Penyiraman & Pengecekan Kelembaban',
                description: 'Periksa kelembaban tanah dan lakukan penyiraman pagi/sore hari.',
                status: 'today',
                due_text: 'Hari ini (Due Today)',
                priority: 'high',
                activity_type: 'Watering'
              }, {
                id: crypto.randomUUID(),
                plot_id: p.id,
                plot_name: p.plot_name,
                komoditas_icon: p.komoditas?.icon || p.komoditas_icon || '🌱',
                title: 'Inspeksi Hama & Daun Tanaman',
                description: 'Periksa bagian bawah daun terhadap serangan kutu kebul atau gulma musiman.',
                status: 'today',
                due_text: 'Hari ini (Due Today)',
                priority: 'medium',
                activity_type: 'Pest Inspection'
              });
            }
          });
          if (missingActions.length > 0) {
            await supabase.from('actions').insert(missingActions);
            finalActions = [...finalActions, ...missingActions];
          }
        }
        if (finalActions.length > 0) {
          setActions(finalActions);
        }

        // 4. Fetch Activities (from plot_activities)
        const { data: activitiesData, error: actErr } = await supabase
          .from('plot_activities')
          .select('*, plots(plot_name, komoditas_id)')
          .order('created_at', { ascending: false });

        if (!actErr && activitiesData && activitiesData.length > 0) {
          const mappedActivities = activitiesData.map(d => ({
            id: d.id,
            plot_id: d.plot_id,
            plot_name: d.plots?.plot_name || 'Lahan',
            activity_type: d.activity_type,
            title: `Aktivitas ${d.activity_type}`,
            notes: d.description || '-',
            date: new Date(d.created_at || Date.now()).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'short',
              hour: '2-digit',
              minute: '2-digit'
            }) + ' WIB',
            timestamp: d.created_at || new Date().toISOString()
          }));
          setActivities(mappedActivities);
        }
      } catch (err) {
        console.warn('[useGoraData] Supabase sync fallback to offline store:', err);
      }
    }
    fetchSupabaseData();
  }, []);

  const completeAction = useCallback(async (actionId) => {
    const targetAction = actions.find(a => a.id === actionId);
    if (!targetAction) return;

    if (targetAction.status === 'completed') {
      setActions(prev => prev.map(a => a.id === actionId ? { ...a, status: 'today' } : a));
      if (supabase) {
        supabase.from('actions').update({ status: 'today' }).eq('id', actionId).then(({ error }) => {
          if (error) console.warn('[completeAction] Supabase uncheck update error:', error);
        });
      }
      return;
    }

    const now = new Date();
    const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

    // 1. Update action status to completed
    setActions(prev => prev.map(a => a.id === actionId ? { ...a, status: 'completed' } : a));
    if (supabase) {
      supabase.from('actions').update({ status: 'completed' }).eq('id', actionId).then(({ error }) => {
        if (error) console.warn('[completeAction] Supabase update error:', error);
      });
    }

    // 2. Log activity
    const newActivityUI = {
      id: `hist-${Date.now()}`,
      plot_id: targetAction.plot_id,
      plot_name: targetAction.plot_name,
      komoditas_icon: targetAction.komoditas_icon,
      activity_type: targetAction.activity_type || 'General Task',
      title: `${targetAction.title} (Selesai)`,
      notes: targetAction.description || 'Tindakan diselesaikan melalui daftar tugas harian.',
      date: `Hari ini, ${timeStr} WIB`,
      timestamp: now.toISOString(),
    };
    setActivities(prev => [newActivityUI, ...prev]);

    if (supabase) {
      const { data: { session } } = await supabase.auth.getSession();
      supabase.from('plot_activities').insert({
        plot_id: targetAction.plot_id,
        activity_type: targetAction.activity_type || 'General Task',
        description: targetAction.description || 'Tindakan diselesaikan melalui daftar tugas harian.',
        created_by: session?.user?.id
      }).then(({ error }) => {
        if (error) console.warn('[completeAction] Supabase insert activity error:', error);
      });
    }

    fireIncrementStreak();

    // 3. Update target plot status & priority
    const targetPlot = plots.find(p => p.id === targetAction.plot_id);
    if (targetPlot) {
      const remainingActions = actions.filter(
        a => a.plot_id === targetPlot.id && a.id !== actionId && a.status !== 'completed'
      );
      const hasUrgent = remainingActions.some(a => a.status === 'overdue');
      const hasAttention = remainingActions.some(a => a.status === 'today' || a.status === 'soon');
      
      let newStatus = 'ontrack';
      let newStatusText = 'Semua aksi rutin selesai (On Track)';
      let newPriority = 25;

      if (hasUrgent) {
        newStatus = 'urgent';
        newStatusText = 'Masih ada aksi tertunda';
        newPriority = 85;
      } else if (hasAttention) {
        newStatus = 'attention';
        newStatusText = 'Aksi lanjutan terjadwal segera';
        newPriority = 60;
      }

      const updatedLastWatered = targetAction.activity_type === 'Watering' ? 'Baru saja (Hari ini)' : targetPlot.last_watered;
      const updatedLastFertilized = targetAction.activity_type === 'Fertilizing' ? 'Baru saja (Hari ini)' : targetPlot.last_fertilized;
      const updatedAt = now.toISOString();

      setPlots(prevPlots => prevPlots.map(p => {
        if (p.id === targetPlot.id) {
          return {
            ...p,
            status: newStatus,
            status_text: newStatusText,
            priority_score: newPriority,
            last_watered: updatedLastWatered,
            last_fertilized: updatedLastFertilized,
            updated_at: updatedAt,
          };
        }
        return p;
      }));

      if (supabase) {
        supabase.from('plots').update({
          status: newStatus,
          status_text: newStatusText,
          priority_score: newPriority,
          last_watered: updatedLastWatered,
          last_fertilized: updatedLastFertilized,
          updated_at: updatedAt,
        }).eq('id', targetPlot.id).then(({ error }) => {
          if (error) console.warn('[completeAction] Supabase update plot error:', error);
        });
      }
    }
  }, [actions, plots]);

  const addActions = useCallback((newActions) => {
    setActions(prev => [...newActions, ...prev]);
    if (supabase) {
      supabase.from('actions').insert(newActions).then(({ error }) => {
        if (error) console.warn('[addActions] Supabase insert error:', error);
      });
    }
  }, []);

  const addPlot = useCallback(async (newPlotData) => {
    const kom = komoditasList.find(k => k.id === newPlotData.komoditas_id) || komoditasList[0];
    
    let userId = null;
    if (supabase) {
      const { data: { session } } = await supabase.auth.getSession();
      userId = session?.user?.id || null;
    }

    const dbPlot = {
      plot_name: newPlotData.plot_name || 'Plot Baru',
      komoditas_id: kom?.id || null,
      area: Number(newPlotData.area) || 500,
      area_unit: newPlotData.unit || 'm²',
      location: newPlotData.location || 'Lokasi Terdeteksi',
      planting_date: newPlotData.planting_date || new Date().toISOString().split('T')[0],
      estimated_harvest_date: newPlotData.estimated_harvest_date || '2026-10-01',
      current_growth_stage: newPlotData.current_growth_stage || 'Seedling (Pembibitan)',
      growth_progress: 15,
      status: 'ontrack',
      status_text: 'Plot baru dibuat, masa pembibitan berjalan',
      priority_score: 30,
      last_watered: 'Hari ini',
      last_fertilized: 'Belum dilakukan',
      updated_at: new Date().toISOString(),
      owner_id: userId,
    };

    const createAndStorePlotActions = (plotObj) => {
      const newPlotActions = [
        {
          id: crypto.randomUUID(),
          plot_id: plotObj.id,
          plot_name: plotObj.plot_name,
          komoditas_icon: plotObj.komoditas_icon || '🌱',
          title: 'Penyiraman & Pengecekan Kelembaban',
          description: 'Periksa kelembaban tanah dan lakukan penyiraman pagi/sore hari.',
          status: 'today',
          due_text: 'Hari ini (Due Today)',
          priority: 'high',
          activity_type: 'Watering'
        },
        {
          id: crypto.randomUUID(),
          plot_id: plotObj.id,
          plot_name: plotObj.plot_name,
          komoditas_icon: plotObj.komoditas_icon || '🌱',
          title: 'Inspeksi Hama & Daun Tanaman',
          description: 'Periksa daun dari gejala serangan hama atau gulma musiman.',
          status: 'today',
          due_text: 'Hari ini (Due Today)',
          priority: 'medium',
          activity_type: 'Pest Inspection'
        }
      ];
      if (supabase) {
        supabase.from('actions').insert(newPlotActions).then(({ error }) => {
          if (error) console.warn('[addPlot] Supabase insert actions error:', error);
        });
      }
      setActions(prev => [...newPlotActions, ...prev]);
    };

    if (supabase) {
      const { data, error } = await supabase.from('plots').insert(dbPlot).select('*, komoditas(*)').single();
      if (!error && data) {
        const enrichedPlot = {
          ...data,
          komoditas_nama: data.komoditas?.nama || kom?.nama || 'Tanaman',
          komoditas_icon: data.komoditas?.icon || kom?.icon || '🌱',
          growth_progress: data.growth_progress ?? 15,
          status: data.status || 'ontrack',
          priority_score: data.priority_score ?? 30,
          last_watered: data.last_watered || 'Hari ini',
          last_fertilized: data.last_fertilized || 'Belum dilakukan',
        };
        setPlots(prev => [enrichedPlot, ...prev]);
        createAndStorePlotActions(enrichedPlot);
        return enrichedPlot;
      }
    }

    // Fallback if offline
    const tempPlot = {
      ...dbPlot,
      id: `temp-${Date.now()}`,
      komoditas_nama: kom?.nama || 'Tanaman',
      komoditas_icon: kom?.icon || '🌱',
    };
    setPlots(prev => [tempPlot, ...prev]);
    createAndStorePlotActions(tempPlot);
    return tempPlot;
  }, [komoditasList]);

  const logActivity = useCallback(async (activityData) => {
    const targetPlot = plots.find(p => p.id === activityData.plot_id);
    if (!targetPlot) return { isFirstToday: false, previousCount: streakInfo.count, newCount: streakInfo.count };
    
    const now = new Date();
    const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

    let userId = null;
    if (supabase) {
      const { data: { session } } = await supabase.auth.getSession();
      userId = session?.user?.id || null;
      
      const { data, error } = await supabase.from('plot_activities').insert({
        plot_id: targetPlot.id,
        activity_type: activityData.activity_type,
        description: activityData.notes || '',
        created_by: userId
      }).select().single();

      if (!error && data) {
        const newActivity = {
          id: data.id,
          plot_id: targetPlot.id,
          plot_name: targetPlot.plot_name,
          activity_type: data.activity_type,
          title: activityData.title || `Aktivitas ${data.activity_type}`,
          notes: data.description || '-',
          date: `Hari ini, ${timeStr} WIB`,
          timestamp: data.created_at,
        };
        setActivities(prev => [newActivity, ...prev]);
      }
    } else {
      const newActivity = {
        id: `hist-${Date.now()}`,
        plot_id: targetPlot.id,
        plot_name: targetPlot.plot_name,
        activity_type: activityData.activity_type,
        title: activityData.title || `Aktivitas ${activityData.activity_type}`,
        notes: activityData.notes || '-',
        date: `Hari ini, ${timeStr} WIB`,
        timestamp: now.toISOString(),
      };
      setActivities(prev => [newActivity, ...prev]);
    }

    const today = new Date().toISOString().split('T')[0];
    const isFirstToday = streakInfo.lastActivityDate !== today;
    const previousCount = streakInfo.count;
    let newCount = previousCount;

    if (isFirstToday) {
      newCount = previousCount + 1;
      const updatedStreak = { count: newCount, lastActivityDate: today };
      setStreakInfo(updatedStreak);
      localStorage.setItem('gora_streak_info', JSON.stringify(updatedStreak));
      fireIncrementStreak();
    }

    setActions(prev => prev.map(a => {
      if (a.plot_id === targetPlot.id && a.activity_type === activityData.activity_type && a.status !== 'completed') {
        return { ...a, status: 'completed' };
      }
      return a;
    }));

    if (supabase) {
      supabase.from('actions')
        .update({ status: 'completed' })
        .eq('plot_id', targetPlot.id)
        .eq('activity_type', activityData.activity_type)
        .neq('status', 'completed')
        .then(({ error }) => {
          if (error) console.warn('[logActivity] Supabase update actions error:', error);
        });
    }

    const updatedLastWatered = activityData.activity_type === 'Watering' ? 'Baru saja (Hari ini)' : targetPlot.last_watered;
    const updatedLastFertilized = activityData.activity_type === 'Fertilizing' ? 'Baru saja (Hari ini)' : targetPlot.last_fertilized;
    const updatedPriorityScore = Math.max(10, targetPlot.priority_score - 30);
    const updatedAt = now.toISOString();

    setPlots(prev => prev.map(p => {
      if (p.id === targetPlot.id) {
        return {
          ...p,
          last_watered: updatedLastWatered,
          last_fertilized: updatedLastFertilized,
          status: 'ontrack',
          status_text: `${activityData.activity_type} selesai tercatat`,
          priority_score: updatedPriorityScore,
          updated_at: updatedAt,
        };
      }
      return p;
    }));

    if (supabase) {
      supabase.from('plots').update({
        last_watered: updatedLastWatered,
        last_fertilized: updatedLastFertilized,
        status: 'ontrack',
        status_text: `${activityData.activity_type} selesai tercatat`,
        priority_score: updatedPriorityScore,
        updated_at: updatedAt,
      }).eq('id', targetPlot.id).then(({ error }) => {
        if (error) console.warn('[logActivity] Supabase update plot error:', error);
      });
    }

    return {
      isFirstToday,
      previousCount,
      newCount
    };
  }, [plots, streakInfo]);

  const reportIssue = useCallback(async (issueData) => {
    const targetPlot = plots.find(p => p.id === issueData.plot_id);
    if (!targetPlot) return;

    const now = new Date();
    const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    const isUrgent = issueData.severity === 'High';

    let userId = null;
    if (supabase) {
      const { data: { session } } = await supabase.auth.getSession();
      userId = session?.user?.id || null;
      
      const { data } = await supabase.from('plot_activities').insert({
        plot_id: targetPlot.id,
        activity_type: 'Issue Reported',
        description: `Tingkat Keparahan: ${issueData.severity}. ${issueData.notes || ''}`,
        created_by: userId
      }).select().single();

      if (data) {
        setActivities(prev => [{
          id: data.id,
          plot_id: targetPlot.id,
          plot_name: targetPlot.plot_name,
          activity_type: 'Issue Reported',
          title: `Laporan Masalah: ${issueData.title}`,
          notes: `Tingkat Keparahan: ${issueData.severity}. ${issueData.notes || ''}`,
          date: `Hari ini, ${timeStr} WIB`,
          timestamp: data.created_at,
        }, ...prev]);
      }
    } else {
      setActivities(prev => [{
        id: `hist-${Date.now()}`,
        plot_id: targetPlot.id,
        plot_name: targetPlot.plot_name,
        activity_type: 'Issue Reported',
        title: `Laporan Masalah: ${issueData.title}`,
        notes: `Tingkat Keparahan: ${issueData.severity}. ${issueData.notes || ''}`,
        date: `Hari ini, ${timeStr} WIB`,
        timestamp: now.toISOString(),
      }, ...prev]);
    }

    if (isUrgent) {
      const newAction = {
        plot_id: targetPlot.id,
        plot_name: targetPlot.plot_name,
        komoditas_icon: targetPlot.komoditas_icon,
        title: `Tindak Lanjut Masalah: ${issueData.title}`,
        description: issueData.notes || 'Perlu intervensi segera untuk mengatasi masalah yang dilaporkan.',
        status: 'overdue',
        due_text: 'Segera (Mendesak)',
        priority: 'high',
        activity_type: 'Issue Handling',
      };
      if (supabase) {
        const { data: actData } = await supabase.from('actions').insert(newAction).select().single();
        if (actData) setActions(prev => [actData, ...prev]);
      } else {
        setActions(prev => [{ ...newAction, id: crypto.randomUUID() }, ...prev]);
      }
    }

    const updatedStatus = isUrgent ? 'urgent' : 'attention';
    const updatedStatusText = `Masalah dilaporkan: ${issueData.title}`;
    const updatedPriorityScore = isUrgent ? 98 : 75;
    const updatedAt = now.toISOString();

    setPlots(prev => prev.map(p => {
      if (p.id === targetPlot.id) {
        return {
          ...p,
          status: updatedStatus,
          status_text: updatedStatusText,
          priority_score: updatedPriorityScore,
          updated_at: updatedAt,
        };
      }
      return p;
    }));

    if (supabase) {
      supabase.from('plots').update({
        status: updatedStatus,
        status_text: updatedStatusText,
        priority_score: updatedPriorityScore,
        updated_at: updatedAt,
      }).eq('id', targetPlot.id).then(({ error }) => {
        if (error) console.warn('[reportIssue] Supabase update plot error:', error);
      });
    }
  }, [plots]);

  const resetDemoData = useCallback(async () => {
    localStorage.clear();
    setPlots([...INITIAL_PLOTS]);
    setActions([...INITIAL_ACTIONS]);
    setActivities([...INITIAL_ACTIVITIES]);

    if (supabase) {
      try {
        await supabase.from('actions').delete().neq('id', 'placeholder');
        await supabase.from('actions').insert(INITIAL_ACTIONS);
      } catch (err) {
        console.warn('[resetDemoData] Supabase reset error:', err);
      }
    }
  }, []);

  return {
    plots,
    komoditasList,
    actions,
    activities,
    newsList,
    weather,
    streakInfo,
    syncStreakFromProfile,
    addPlot,
    completeAction,
    addActions,
    logActivity,
    reportIssue,
    resetDemoData,
  };
}