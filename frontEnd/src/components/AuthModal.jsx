import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Lock, Mail, User, AlertCircle, Briefcase } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, onNavigate }) {
  const { login, register, loginWithGoogle } = useAuth();

  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('ACTOR');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleGoogleSignIn = async () => {
    setError('');
    setSubmitting(true);
    try {
      await loginWithGoogle(role, email, name);
      onClose();
      onNavigate?.('dashboard');
    } catch (err) {
      setError(err.message || 'Google Authentication failed');
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const roles = [
    { value: 'ACTOR', label: 'Actor (Auditions, Showreels)' },
    { value: 'MUSICIAN', label: 'Musician (Songs, Compositions)' },
    { value: 'MODEL', label: 'Model (Photoshoots, Visuals)' },
    { value: 'DIRECTOR', label: 'Director (Casting Calls, Projects)' },
    { value: 'PRODUCER', label: 'Producer (Production, Hiring)' },
    { value: 'WRITER', label: 'Script Writer (Screenplays, Story)' },
    { value: 'CREW', label: 'Crew (Editors, DPs, Sound, VFX)' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      if (isRegister) {
        if (!name.trim()) throw new Error('Please enter your full name.');
        await register(name, email, password, role);
      } else {
        await login(email, password);
      }
      onClose();
      onNavigate?.('dashboard');
    } catch (err) {
      setError(err.message || 'Authentication failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '700' }}>
              {isRegister ? 'Join FlowStudio Platform' : 'Welcome Back'}
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              {isRegister ? 'Select your role & showcase your creative portfolio' : 'Sign in to access your projects & messages'}
            </p>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>
        </div>

        {error && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: '#f87171',
            padding: '10px 14px',
            borderRadius: 'var(--radius-md)',
            fontSize: '13px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '16px'
          }}>
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <div style={{ position: 'relative' }}>
                  <User size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                  <input
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-input"
                    style={{ paddingLeft: '38px', width: '100%' }}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Industry Role</label>
                <div style={{ position: 'relative' }}>
                  <Briefcase size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="form-input"
                    style={{ paddingLeft: '38px', width: '100%' }}
                  >
                    {roles.map(r => (
                      <option key={r.value} value={r.value}>{r.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </>
          )}

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
              <input
                type="email"
                required
                placeholder="jane@flowstudio.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                style={{ paddingLeft: '38px', width: '100%' }}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                style={{ paddingLeft: '38px', width: '100%' }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '12px', padding: '12px', justifyContent: 'center' }}
          >
            {submitting ? 'Please wait...' : isRegister ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '20px 0' }}>
          <div style={{ flex: 1, height: '1px', background: '#cbd5e1' }} />
          <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '700', textTransform: 'uppercase' }}>or continue with</span>
          <div style={{ flex: 1, height: '1px', background: '#cbd5e1' }} />
        </div>

        {/* Google SSO Button */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={submitting}
          className="btn"
          style={{
            width: '100%',
            background: '#ffffff',
            border: '1px solid #cbd5e1',
            color: '#0f172a',
            fontWeight: '700',
            padding: '11px',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-sm)',
            cursor: 'pointer'
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" style={{ marginRight: '6px' }}>
            <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
            <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.29v3.15C3.26 21.3 7.31 24 12 24z"/>
            <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.29C.47 8.21 0 10.05 0 12s.47 3.79 1.29 5.42l3.99-3.15z"/>
            <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.58l3.99 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
          </svg>
          <span>Continue with Google</span>
        </button>

        <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '13px', color: 'var(--text-secondary)' }}>
          {isRegister ? 'Already have an account?' : "Don't have an account yet?"}{' '}
          <button
            onClick={() => { setIsRegister(!isRegister); setError(''); }}
            style={{ background: 'transparent', border: 'none', color: 'var(--accent-primary)', fontWeight: '600', cursor: 'pointer' }}
          >
            {isRegister ? 'Sign In' : 'Register Here'}
          </button>
        </div>
      </div>
    </div>
  );
}
