import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StartupPortal from '../components/StartupPortal';
import { TOP_STARTUPS } from '../data/mockData';

export default function StartupPortalPage() {
  const navigate = useNavigate();
  const [userSession, setUserSession] = useState(() => {
    const saved = localStorage.getItem('bhv_startup_user');
    return saved ? JSON.parse(saved) : null;
  });

  const startup = TOP_STARTUPS.find(s => String(s.id) === String(userSession?.startupId)) || TOP_STARTUPS[0];

  return (
    <div className="min-h-screen bg-bio-cream py-8">
      <StartupPortal 
        isOpen={true} 
        onClose={() => navigate('/startups')} 
        startup={startup}
        userSession={userSession}
      />
    </div>
  );
}
