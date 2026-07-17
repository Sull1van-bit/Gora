import React, { useState, useEffect } from 'react';
import useUserLocation from '../hooks/useUserLocation';
import useProfile from '../hooks/useProfile';
import useStreak from '../hooks/useStreak';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileStreak from '../components/profile/ProfileStreak';
import ProfileLocation from '../components/profile/ProfileLocation';
import ProfilePreferences from '../components/profile/ProfilePreferences';
import ProfileAbout from '../components/profile/ProfileAbout';

export default function ProfilePage({ plots, onSignOut }) {
  const { kecamatan, kota, provinsi, refetch: refetchLocation } = useUserLocation();
  const { profile, loading: profileLoading, updateProfile } = useProfile();
  const { streakCount, longestStreak, lastActivityDate, isActiveToday, streakStatus, syncFromProfile } = useStreak(profile);

  const [notifEnabled, setNotifEnabled] = useState(true);
  const [offlineSync, setOfflineSync]   = useState(true);
  const [language, setLanguage]         = useState('id');
  
  useEffect(() => {
    if (profile) {
      syncFromProfile(profile);
    }
  }, [profile]);

  return (
    <div className="space-y-4 animate-fade-in pb-6">
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

      <ProfileStreak 
        streakCount={streakCount} 
        streakStatus={streakStatus} 
        longestStreak={longestStreak} 
        isActiveToday={isActiveToday} 
        lastActivityDate={lastActivityDate} 
      />

      <ProfileLocation 
        kecamatan={kecamatan} 
        kota={kota} 
        provinsi={provinsi} 
        refetchLocation={refetchLocation} 
      />

      <ProfilePreferences 
        notifEnabled={notifEnabled} 
        setNotifEnabled={setNotifEnabled} 
        offlineSync={offlineSync} 
        setOfflineSync={setOfflineSync} 
        language={language} 
        setLanguage={setLanguage} 
      />

      <ProfileAbout onSignOut={onSignOut} />
    </div>
  );
}
