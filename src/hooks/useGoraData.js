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

  const [komoditasList] = useState(INITIAL_KOMODITAS);
  const [newsList] = useState(INITIAL_NEWS);
  const [weather] = useState(WEATHER_PREVIEW);

  useEffect(() => {
    localStorage.setItem('gora_plots', JSON.stringify(plots));
  }, [plots]);

  useEffect(() => {
    localStorage.setItem('gora_actions', JSON.stringify(actions));
  }, [actions]);

  useEffect(() => {
    localStorage.setItem('gora_activities', JSON.stringify(activities));
  }, [activities]);

  useEffect(() => {
    async function fetchSupabasePlots() {
      if (!supabase) return;
      try {
        const { data, error } = await supabase.from('plots').select('*');
        if (!error && data && data.length > 0) {
        }
      } catch (err) {
        console.warn('[useGoraData] Supabase sync fallback to local store:', err);
      }
    }
    fetchSupabasePlots();
  }, []);

  const completeAction = useCallback((actionId) => {
    const targetAction = actions.find(a => a.id === actionId);
    if (!targetAction) return;

    setActions(prev => prev.map(a => a.id === actionId ? { ...a, status: 'completed' } : a));

    const now = new Date();
    const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    const newActivity = {
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
    setActivities(prev => [newActivity, ...prev]);
    fireIncrementStreak();

    setPlots(prevPlots => prevPlots.map(p => {
      if (p.id === targetAction.plot_id) {
        const remainingActions = actions.filter(
          a => a.plot_id === p.id && a.id !== actionId && a.status !== 'completed'
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

        return {
          ...p,
          status: newStatus,
          status_text: newStatusText,
          priority_score: newPriority,
          last_watered: targetAction.activity_type === 'Watering' ? 'Baru saja (Hari ini)' : p.last_watered,
          last_fertilized: targetAction.activity_type === 'Fertilizing' ? 'Baru saja (Hari ini)' : p.last_fertilized,
          updated_at: now.toISOString(),
        };
      }
      return p;
    }));
  }, [actions]);

  const addPlot = useCallback((newPlotData) => {
    const kom = komoditasList.find(k => k.id === newPlotData.komoditas_id) || komoditasList[0];
    const newPlot = {
      id: `plot-${Date.now()}`,
      plot_name: newPlotData.plot_name || 'Plot Baru',
      komoditas_id: kom.id,
      komoditas_nama: kom.nama,
      komoditas_icon: kom.icon,
      area: Number(newPlotData.area) || 500,
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
    };

    setPlots(prev => [newPlot, ...prev]);
    return newPlot;
  }, [komoditasList]);

  const logActivity = useCallback((activityData) => {
    const targetPlot = plots.find(p => p.id === activityData.plot_id);
    if (!targetPlot) return;

    const now = new Date();
    const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    
    const newActivity = {
      id: `hist-${Date.now()}`,
      plot_id: targetPlot.id,
      plot_name: targetPlot.plot_name,
      komoditas_icon: targetPlot.komoditas_icon,
      activity_type: activityData.activity_type,
      title: activityData.title || `Aktivitas ${activityData.activity_type}`,
      notes: activityData.notes || '-',
      date: `Hari ini, ${timeStr} WIB`,
      timestamp: now.toISOString(),
    };

    setActivities(prev => [newActivity, ...prev]);
    fireIncrementStreak();

    setActions(prev => prev.map(a => {
      if (a.plot_id === targetPlot.id && a.activity_type === activityData.activity_type && a.status !== 'completed') {
        return { ...a, status: 'completed' };
      }
      return a;
    }));

    setPlots(prev => prev.map(p => {
      if (p.id === targetPlot.id) {
        return {
          ...p,
          last_watered: activityData.activity_type === 'Watering' ? 'Baru saja (Hari ini)' : p.last_watered,
          last_fertilized: activityData.activity_type === 'Fertilizing' ? 'Baru saja (Hari ini)' : p.last_fertilized,
          status: 'ontrack',
          status_text: `${activityData.activity_type} selesai tercatat`,
          priority_score: Math.max(10, p.priority_score - 30),
          updated_at: now.toISOString(),
        };
      }
      return p;
    }));
  }, [plots]);

  const reportIssue = useCallback((issueData) => {
    const targetPlot = plots.find(p => p.id === issueData.plot_id);
    if (!targetPlot) return;

    const now = new Date();
    const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

    const isUrgent = issueData.severity === 'High';

    const newActivity = {
      id: `hist-${Date.now()}`,
      plot_id: targetPlot.id,
      plot_name: targetPlot.plot_name,
      komoditas_icon: 'alert',
      activity_type: 'Issue Reported',
      title: `Laporan Masalah: ${issueData.title}`,
      notes: `Tingkat Keparahan: ${issueData.severity}. ${issueData.notes || ''}`,
      date: `Hari ini, ${timeStr} WIB`,
      timestamp: now.toISOString(),
    };

    setActivities(prev => [newActivity, ...prev]);

    if (isUrgent) {
      const newAction = {
        id: `act-${Date.now()}`,
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
      setActions(prev => [newAction, ...prev]);
    }

    setPlots(prev => prev.map(p => {
      if (p.id === targetPlot.id) {
        return {
          ...p,
          status: isUrgent ? 'urgent' : 'attention',
          status_text: `Masalah dilaporkan: ${issueData.title}`,
          priority_score: isUrgent ? 98 : 75,
          updated_at: now.toISOString(),
        };
      }
      return p;
    }));
  }, [plots]);

  // Reset all demo data back to the initial seed state.
  // Use this before a live demo to clear out any leftover test data.
  const resetDemoData = useCallback(() => {
    localStorage.clear();
    localStorage.setItem('gora_plots', JSON.stringify(INITIAL_PLOTS));
    localStorage.setItem('gora_actions', JSON.stringify(INITIAL_ACTIONS));
    localStorage.setItem('gora_activities', JSON.stringify(INITIAL_ACTIVITIES));
    setPlots([...INITIAL_PLOTS]);
    setActions([...INITIAL_ACTIONS]);
    setActivities([...INITIAL_ACTIVITIES]);
  }, []);

  return {
    plots,
    komoditasList,
    actions,
    activities,
    newsList,
    weather,
    addPlot,
    completeAction,
    logActivity,
    reportIssue,
    resetDemoData,
  };
}