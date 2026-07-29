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
      background: 'rgba(255,255,255,0.82)',
      backdropFilter: 'blur(18px)',
      WebkitBackdropFilter: 'blur(18px)',
      boxShadow: '0 8px 30px rgba(15,23,42,.08)',
      transition: 'all .3s ease',
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
          <div className="hover-lift" style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'var(--accent-gradient)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 10px 24px rgba(99,102,241,.35)',
            transition: 'transform .25s ease, box-shadow .25s ease',
          }}>
            <Film size={22} color="#ffffff" />
          </div>
          <div> 
            <span style={{ fontWeight: '800', fontSize: '20px', letterSpacing: '-0.5px', color:"#1E40AF" }}>
              Flow<span style={{ color:"#8B5CF6" }}>Studio</span>
            </span>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.8px', marginTop: '-2px' }}>
              Entertainment Platform
            </div>
          </div>
        </div>

        <div style={{ height: '24px', width: '1px', background: 'var(--border-color)' }} />

        {/* Core Nav Links */}
        <nav style={{ display: 'flex', gap: '6px' }}>
          <button className="nav-item"
            onClick={() => onNavChange('landing')}
            style={{
              background: activeNav === 'landing' ? 'rgba(79, 70, 229, 0.08)' : 'transparent',
              border: 'none',
              color: activeNav === 'landing' ? 'var(--accent-primary)' : 'var(--text-secondary)',
              padding: '8px 16px',
              borderRadius: 'var(--radius-md)',
              fontSize: '13.5px',
              fontWeight: activeNav === 'landing' ? '700' : '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all .25s ease',
              boxShadow: activeNav === 'landing'
                ? '0 6px 16px rgba(99,102,241,.15)'
                : 'none'
            }}
          >
            <Home size={16} />
            <span>Home</span>
          </button>
          <button className="nav-item"
            onClick={() => onNavChange('talent')}
            style={{
              background: activeNav === 'projects' ? 'rgba(79, 70, 229, 0.08)' : 'transparent',
              border: 'none',
              color: activeNav === 'projects' ? 'var(--accent-primary)' : 'var(--text-secondary)',
              padding: '8px 16px',
              borderRadius: 'var(--radius-md)',
              fontSize: '13.5px',
              fontWeight: activeNav === 'projects' ? '700' : '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all .25s ease',
              boxShadow: activeNav === 'projects'
                ? '0 6px 16px rgba(99,102,241,.15)'
                : 'none'
            }}
          >
            <Users size={16} />
            <span>Talent Directory</span>
          </button>

          <button className="nav-item"
            onClick={() => onNavChange('projects')}
            style={{
              background: activeNav === 'projects' ? 'rgba(79, 70, 229, 0.08)' : 'transparent',
              border: 'none',
              color: activeNav === 'projects' ? 'var(--accent-primary)' : 'var(--text-secondary)',
              padding: '8px 16px',
              borderRadius: 'var(--radius-md)',
              fontSize: '13.5px',
              fontWeight: activeNav === 'projects' ? '700' : '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all .25s ease',
              boxShadow: activeNav === 'projects'
                ? '0 6px 16px rgba(99,102,241,.15)'
                : 'none'
            }}
          >
            <Clapperboard size={16} />
            <span>Opportunity Board</span>
          </button>

          <button className="nav-item"
            onClick={() => onNavChange('studio')}
            style={{
              background: activeNav === 'studio' ? 'rgba(79, 70, 229, 0.08)' : 'transparent',
              border: 'none',
              color: activeNav === 'studio' ? 'var(--accent-primary)' : 'var(--text-secondary)',
              padding: '8px 16px',
              borderRadius: 'var(--radius-md)',
              fontSize: '13.5px',
              fontWeight: activeNav === 'studio' ? '700' : '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all .25s ease',
              boxShadow: activeNav === 'studio'
                ? '0 6px 16px rgba(99,102,241,.15)'
                : 'none'
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
            background:'rgba(255,255,255,.75)',
            backdropFilter:'blur(12px)',
            border: '1px solid var(--border-color)',
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color:'var(--accent-primary)',
            transition:'all .25s ease',
          }}
        >
          <Bell size={18} />
          <span style={{
            position: 'absolute',
            top: '2px',
            right: '2px',
            width: '9px',
            height: '9px',
            background:'var(--warning)',
            borderRadius: '50%',
            border: '2px solid #ffffff'
          }} />
        </button>

        {user ? (
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="btn btn-secondary"
              style={{ borderRadius: 'var(--radius-full)', padding: '4px 14px 4px 5px' }}
            >
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background:'linear-gradient(135deg,#6366F1,#8B5CF6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: '700',
                color: '#ffffff'
              }}>
                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <span style={{ fontSize: '13.5px', fontWeight: '700', color: '#8b8392' }}>{user.name}</span>
            </button>

            {showUserMenu && (
              <div className="dropdown-menu" style={{
                position: 'absolute',
                top: '48px',
                right: 0,
                width: '230px',
                background:'rgba(255,255,255,.95)',
                backdropFilter:'blur(18px)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                padding: '10px',
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
                    color: '#8b8392',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: '600'
                  }}
                >
                  <User size={15} color="#A855F7" />
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
                    fontSize: '13px',
                    fontWeight: '600'
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
