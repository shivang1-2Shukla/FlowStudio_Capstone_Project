import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Film, Clapperboard, Users, FileText, User, LogOut, Bell, Search, Sparkles, Home } from 'lucide-react';

export default function Navbar({
  activeNav,
  onNavChange,
  onOpenAuth,
  onOpenProfile,
  onOpenNotifications
}) {
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header style={{
      height: '68px',
      padding: '0 28px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: '1px solid var(--border-color)',
      background: '#ffffff',
      boxShadow: 'var(--shadow-sm)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      {/* Left Brand & Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
        <div
          onClick={() => onNavChange('landing')}
          style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
        >
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'var(--accent-gradient)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(79, 70, 229, 0.3)'
          }}>
            <Film size={22} color="#ffffff" />
          </div>
          <div>
            <span style={{ fontWeight: '800', fontSize: '20px', letterSpacing: '-0.5px', color: '#0f172a' }}>
              Flow<span style={{ color: 'var(--accent-primary)' }}>Studio</span>
            </span>
            <div style={{ fontSize: '10px', color: '#475569', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.8px', marginTop: '-2px' }}>
              Entertainment Platform
            </div>
          </div>
        </div>

        <div style={{ height: '24px', width: '1px', background: 'var(--border-color)' }} />

        {/* Core Nav Links */}
        <nav style={{ display: 'flex', gap: '6px' }}>
          <button
            onClick={() => onNavChange('landing')}
            style={{
              background: activeNav === 'landing' ? 'rgba(79, 70, 229, 0.08)' : 'transparent',
              border: 'none',
              color: activeNav === 'landing' ? 'var(--accent-primary)' : '#334155',
              padding: '8px 16px',
              borderRadius: 'var(--radius-md)',
              fontSize: '13.5px',
              fontWeight: activeNav === 'landing' ? '800' : '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Home size={16} />
            <span>Home</span>
          </button>
          <button
            onClick={() => onNavChange('talent')}
            style={{
              background: activeNav === 'talent' ? 'rgba(79, 70, 229, 0.08)' : 'transparent',
              border: 'none',
              color: activeNav === 'talent' ? 'var(--accent-primary)' : '#334155',
              padding: '8px 16px',
              borderRadius: 'var(--radius-md)',
              fontSize: '13.5px',
              fontWeight: activeNav === 'talent' ? '800' : '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Users size={16} />
            <span>Talent Directory</span>
          </button>

          <button
            onClick={() => onNavChange('projects')}
            style={{
              background: activeNav === 'projects' ? 'rgba(79, 70, 229, 0.08)' : 'transparent',
              border: 'none',
              color: activeNav === 'projects' ? 'var(--accent-primary)' : '#334155',
              padding: '8px 16px',
              borderRadius: 'var(--radius-md)',
              fontSize: '13.5px',
              fontWeight: activeNav === 'projects' ? '800' : '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Clapperboard size={16} />
            <span>Opportunity Board</span>
          </button>

          <button
            onClick={() => onNavChange('studio')}
            style={{
              background: activeNav === 'studio' ? 'rgba(79, 70, 229, 0.08)' : 'transparent',
              border: 'none',
              color: activeNav === 'studio' ? 'var(--accent-primary)' : '#334155',
              padding: '8px 16px',
              borderRadius: 'var(--radius-md)',
              fontSize: '13.5px',
              fontWeight: activeNav === 'studio' ? '800' : '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <FileText size={16} />
            <span>Creative Workspace</span>
          </button>
        </nav>
      </div>

      {/* Right Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        {/* Notifications Button */}
        <button
          onClick={onOpenNotifications}
          style={{
            position: 'relative',
            background: 'var(--bg-tertiary)',
            border: '1px solid var(--border-color)',
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#334155'
          }}
        >
          <Bell size={18} />
          <span style={{
            position: 'absolute',
            top: '2px',
            right: '2px',
            width: '9px',
            height: '9px',
            background: 'var(--accent-gold)',
            borderRadius: '50%',
            border: '2px solid #ffffff'
          }} />
        </button>

        {user ? (
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="btn btn-secondary"
              style={{ borderRadius: 'var(--radius-full)', padding: '4px 14px 4px 5px', color: '#0f172a' }}
            >
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'var(--accent-gradient)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: '800',
                color: '#ffffff'
              }}>
                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <span style={{ fontSize: '13.5px', fontWeight: '800', color: '#0f172a' }}>{user.name}</span>
            </button>

            {showUserMenu && (
              <div style={{
                position: 'absolute',
                top: '48px',
                right: 0,
                width: '230px',
                background: '#ffffff',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: '8px',
                boxShadow: 'var(--shadow-lg)',
                zIndex: 1000
              }}>
                <button
                  onClick={() => { setShowUserMenu(false); onOpenProfile(); }}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    background: 'transparent',
                    border: 'none',
                    color: '#0f172a',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '13.5px',
                    fontWeight: '700'
                  }}
                >
                  <User size={15} color="var(--accent-primary)" />
                  <span>My Profile & Portfolios</span>
                </button>

                <div style={{ height: '1px', background: 'var(--border-color)', margin: '6px 0' }} />

                <button
                  onClick={() => { setShowUserMenu(false); logout(); }}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--error)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '13.5px',
                    fontWeight: '700'
                  }}
                >
                  <LogOut size={15} />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={onOpenAuth}
            className="btn btn-primary"
            style={{ padding: '9px 20px', borderRadius: 'var(--radius-md)' }}
          >
            <User size={15} />
            <span>Sign In / Register</span>
          </button>
        )}
      </div>
    </header>
  );
}
