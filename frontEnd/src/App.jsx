import React, { useState } from 'react';
import Navbar from './components/Navbar';
import AuthModal from './components/AuthModal';
import UserProfileModal from './components/UserProfileModal';
import NotificationsModal from './components/film/NotificationsModal';
import LandingPage from './components/LandingPage';
import TalentDirectory from './components/film/TalentDirectory';
import FilmProjectsHub from './components/film/FilmProjectsHub';
import CreativeStudio from './components/film/CreativeStudio';
import MessagingDrawer from './components/film/MessagingDrawer';
import ProjectDrawer from './components/workspace/ProjectDrawer';
import Footer from './components/Footer';
import { useAuth } from './context/AuthContext';

export default function App() {
  const { user, token } = useAuth();
  
  const [activeNav, setActiveNav] = useState('landing'); // 'landing' | 'talent' | 'projects' | 'studio'
  const [currentProject, setCurrentProject] = useState(null);
  
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);

  // Messaging drawer state
  const [isMessagingOpen, setIsMessagingOpen] = useState(false);
  const [targetUser, setTargetUser] = useState(null);

  const handleSelectArtist = (artist) => {
    if (!user) {
      setIsAuthOpen(true);
      return;
    }
    setTargetUser(artist);
    setIsMessagingOpen(true);
  };

  const handleNewOpportunityClick = () => {
    if (!user) {
      setIsAuthOpen(true);
      return;
    }
    const title = prompt('Enter New Opportunity Title / Casting Call:', 'Untitled Feature Audition');
    if (!title) return;
    alert(`Opportunity "${title}" created! You can view candidate applications on the Opportunity Board.`);
    setActiveNav('projects');
  };

  const handleSaveScript = async (scriptContent) => {
    if (!user) {
      setIsAuthOpen(true);
      return;
    }

    try {
      const payload = {
        title: currentProject?.title || 'Screenplay Draft',
        description: 'Film Screenplay Draft',
        htmlCode: scriptContent,
        cssCode: '',
        jsCode: '',
        language: 'screenplay'
      };

      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch(`/api/projects/user/${user.id || 1}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        alert('Screenplay draft saved to your FlowStudio cloud workspace!');
      } else {
        // Local state save fallback
        localStorage.setItem(`flowstudio_script_${user.id || 'draft'}`, scriptContent);
        alert('Screenplay draft saved locally to your FlowStudio workspace!');
      }
    } catch (err) {
      localStorage.setItem('flowstudio_script_draft', scriptContent);
      alert('Screenplay draft saved locally to your workspace!');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw', overflow: 'hidden', background: '#f8fafc' }}>
      {/* Sticky Header Navbar */}
      <Navbar
        activeNav={activeNav}
        onNavChange={setActiveNav}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
      />

      {/* Main View Router */}
      <main style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', position: 'relative', background: '#f8fafc' }}>
        <div style={{ flex: 1 }}>
          {activeNav === 'landing' && (
            <LandingPage
              onNavigate={setActiveNav}
              onOpenAuth={() => setIsAuthOpen(true)}
            />
          )}

          {activeNav === 'talent' && (
            <TalentDirectory
              onSelectArtist={handleSelectArtist}
            />
          )}

          {activeNav === 'projects' && (
            <FilmProjectsHub
              onNewOpportunityClick={handleNewOpportunityClick}
            />
          )}

          {activeNav === 'studio' && (
            <CreativeStudio
              onSaveScript={handleSaveScript}
              currentTitle={currentProject?.title}
            />
          )}
        </div>

        {/* Footer shown on non-studio views for a full website layout */}
        {activeNav !== 'studio' && <Footer />}
      </main>

      {/* Modals & Sidebar Drawers */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      <UserProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
      <NotificationsModal isOpen={isNotificationsOpen} onClose={() => setIsNotificationsOpen(false)} />
      <MessagingDrawer
        isOpen={isMessagingOpen}
        onClose={() => setIsMessagingOpen(false)}
        targetUser={targetUser}
      />
      <ProjectDrawer
        isOpen={isProjectsOpen}
        onClose={() => setIsProjectsOpen(false)}
        onSelectProject={(proj) => { setCurrentProject(proj); setActiveNav('studio'); }}
        onNewProject={handleNewOpportunityClick}
        currentProjectId={currentProject?.id}
      />
    </div>
  );
}
