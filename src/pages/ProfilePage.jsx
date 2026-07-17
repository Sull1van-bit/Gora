import React, { useEffect } from 'react';
import useUserLocation from '../hooks/useUserLocation';
import useProfile from '../hooks/useProfile';
import useStreak from '../hooks/useStreak';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileStatsRow from '../components/profile/ProfileStatsRow';
import ProfileWeeklyAndRecords from '../components/profile/ProfileWeeklyAndRecords';
import ProfileBadges from '../components/profile/ProfileBadges';
import ProfileMenu from '../components/profile/ProfileMenu';

export default function ProfilePage({ 
  plots = [], 
  activities = [],
  actions = [],
  onSignOut, 
  onResetDemoData,
  provinsi: propProvinsi,
  kecamatan: propKecamatan,
  refetchLocation
}) {
  const { kecamatan: locKecamatan, kota: locKota, provinsi: locProvinsi, refetch: locRefetch } = useUserLocation();
  const { profile, loading: profileLoading, updateProfile } = useProfile();
  const { streakCount, longestStreak, syncFromProfile } = useStreak(profile);

  const kecamatan = propKecamatan || locKecamatan;
  const provinsi = propProvinsi || locProvinsi;
  const kota = locKota;

  useEffect(() => {
    if (profile) {
      syncFromProfile(profile);
    }
  }, [profile, syncFromProfile]);

  return (
    <div className="pt-2 pb-24 px-4 sm:px-5 animate-fade-in text-[#3c3b3b] font-['Manrope',sans-serif] selection:bg-emerald-500 selection:text-white">
      {/* 1. Header Section: Avatar, Name, Location, Member Since, Edit Profil, Streak & Level */}
      <ProfileHeader 
        profile={profile} 
        profileLoading={profileLoading} 
        plots={plots} 
        streakCount={streakCount} 
        kecamatan={kecamatan} 
        kota={kota} 
        provinsi={provinsi} 
        updateProfile={updateProfile} 
      />

      {/* 2. 4-Column Stats Row: Log Bulan Ini, Total Lahan, Tanaman Aktif, Selesai Panen */}
      <ProfileStatsRow 
        plots={plots} 
        activities={activities} 
      />

      {/* 3. Two Side-by-Side Cards: Statistik Minggu Ini & Rekor */}
      <ProfileWeeklyAndRecords 
        longestStreak={longestStreak} 
        activities={activities} 
        actions={actions} 
      />

      {/* 4. Pencapaian Section: 6 Badges + Progress Bar */}
      <ProfileBadges />

      {/* 5. Menu Section: Bantuan & Dukungan, Tentang Aplikasi, Keluar */}
      <ProfileMenu 
        onSignOut={onSignOut} 
        onResetDemoData={onResetDemoData} 
      />
    </div>
  );
}