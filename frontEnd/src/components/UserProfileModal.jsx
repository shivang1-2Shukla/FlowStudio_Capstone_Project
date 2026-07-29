import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, User, Video, Music, Image as ImageIcon, Plus, CheckCircle, Trash2 } from 'lucide-react';

export default function UserProfileModal({ isOpen, onClose }) {
  const { user, profile, updateUserProfile, token } = useAuth();
  
  const [activeTab, setActiveTab] = useState('info'); // 'info' | 'portfolio'
  const [bio, setBio] = useState('');
  const [skills, setSkills] = useState('');
  const [location, setLocation] = useState('');
  const [creativeField, setCreativeField] = useState('');
  const [availability, setAvailability] = useState('Full Time');
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // Portfolio items state
  const [portfolioItems, setPortfolioItems] = useState([
    { id: 1, title: 'Audition Reel 2026', mediaType: 'VIDEO', mediaUrl: 'https://youtube.com/watch?v=sample1', description: 'Monologue from Hamlet' },
    { id: 2, title: 'Orchestral Theme', mediaType: 'AUDIO', mediaUrl: 'https://soundcloud.com/sample2', description: 'Original film score' }
  ]);
  const [newTitle, setNewTitle] = useState('');
  const [newMediaType, setNewMediaType] = useState('VIDEO');
  const [newMediaUrl, setNewMediaUrl] = useState('');
  const [newDesc, setNewDesc] = useState('');

  useEffect(() => {
    if (profile) {
      setBio(profile.bio || '');
      setSkills(profile.skills || '');
      setLocation(profile.location || '');
      setCreativeField(profile.creativeField || '');
      setAvailability(profile.availability || 'Full Time');
    }
  }, [profile]);

  if (!isOpen || !user) return null;

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg('');
    try {
      await updateUserProfile({
        bio,
        skills,
        location,
        creativeField,
        availability
      });
      setSuccessMsg('Profile updated successfully!');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      alert('Failed to update profile: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleAddPortfolio = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newMediaUrl.trim()) return;
    setPortfolioItems(prev => [
      ...prev,
      {
        id: Date.now(),
        title: newTitle,
        mediaType: newMediaType,
        mediaUrl: newMediaUrl,
        description: newDesc
      }
    ]);
    setNewTitle('');
    setNewMediaUrl('');
    setNewDesc('');
  };

  const handleDeletePortfolio = (id) => {
    setPortfolioItems(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '640px' }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: 'var(--accent-gradient)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              fontWeight: '700'
            }}>
              {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div>
              <h2 style={{ fontSize: '19px', fontWeight: '800', color: '#0f172a' }}>{user.name}</h2>
              <p style={{ fontSize: '12.5px', color: '#334155', fontWeight: '600' }}>{user.email} • Role: <strong>{user.role || 'ACTOR'}</strong></p>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#334155', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {/* Tab switcher */}
        <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border-color)', marginBottom: '16px', paddingBottom: '8px' }}>
          <button
            onClick={() => setActiveTab('info')}
            style={{
              background: activeTab === 'info' ? 'rgba(79, 70, 229, 0.1)' : 'transparent',
              border: 'none',
              borderBottom: activeTab === 'info' ? '2px solid #4f46e5' : '2px solid transparent',
              color: activeTab === 'info' ? '#4f46e5' : '#334155',
              padding: '8px 16px',
              borderRadius: '6px 6px 0 0',
              cursor: 'pointer',
              fontSize: '13.5px',
              fontWeight: '700'
            }}
          >
            Profile Details
          </button>

          <button
            onClick={() => setActiveTab('portfolio')}
            style={{
              background: activeTab === 'portfolio' ? 'rgba(79, 70, 229, 0.1)' : 'transparent',
              border: 'none',
              borderBottom: activeTab === 'portfolio' ? '2px solid #4f46e5' : '2px solid transparent',
              color: activeTab === 'portfolio' ? '#4f46e5' : '#334155',
              padding: '8px 16px',
              borderRadius: '6px 6px 0 0',
              cursor: 'pointer',
              fontSize: '13.5px',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Video size={15} color="#4f46e5" />
            <span>Multi-Format Portfolio ({portfolioItems.length})</span>
          </button>
        </div>

        {successMsg && (
          <div style={{
            background: '#ecfdf5',
            border: '1px solid #a7f3d0',
            color: '#059669',
            padding: '10px 14px',
            borderRadius: 'var(--radius-md)',
            fontSize: '13px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '16px'
          }}>
            <CheckCircle size={16} />
            <span>{successMsg}</span>
          </div>
        )}

        {activeTab === 'info' ? (
          <form onSubmit={handleSave}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div className="form-group">
                <label className="form-label">Creative Specialization</label>
                <input
                  type="text"
                  placeholder="Acting, Cinematography, Composition"
                  value={creativeField}
                  onChange={(e) => setCreativeField(e.target.value)}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Location</label>
                <input
                  type="text"
                  placeholder="Los Angeles, CA"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Skills & Equipment</label>
              <input
                type="text"
                placeholder="ARRI Alexa, Screenwriting, Logic Pro, Method Acting"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Bio & Experience</label>
              <textarea
                rows="3"
                placeholder="Tell directors & producers about your creative background..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="form-input"
                style={{ resize: 'vertical' }}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Availability</label>
              <select
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                className="form-input"
              >
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
                <option value="Freelance">Freelance</option>
                <option value="Open for Collaboration">Open for Collaboration</option>
              </select>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
              <button type="button" onClick={onClose} className="btn btn-secondary">Cancel</button>
              <button type="submit" disabled={saving} className="btn btn-primary">
                {saving ? 'Saving...' : 'Save Profile'}
              </button>
            </div>
          </form>
        ) : (
          /* Multi-Format Portfolio Tab (FR-6, FR-7) */
          <div>
            <form onSubmit={handleAddPortfolio} style={{ background: '#f8fafc', border: '1px solid #cbd5e1', padding: '16px', borderRadius: '10px', marginBottom: '16px' }}>
              <div style={{ fontWeight: '800', fontSize: '13.5px', marginBottom: '10px', color: '#4f46e5', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Add Media Portfolio Item</div>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '8px', marginBottom: '8px' }}>
                <input
                  type="text"
                  required
                  placeholder="Title (e.g., Audition Clip 2026)"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="form-input"
                />
                <select
                  value={newMediaType}
                  onChange={(e) => setNewMediaType(e.target.value)}
                  className="form-input"
                >
                  <option value="VIDEO">Video</option>
                  <option value="AUDIO">Audio</option>
                  <option value="IMAGE">Image</option>
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr auto', gap: '8px' }}>
                <input
                  type="text"
                  required
                  placeholder="Media URL (YouTube, Vimeo, SoundCloud, Image link)"
                  value={newMediaUrl}
                  onChange={(e) => setNewMediaUrl(e.target.value)}
                  className="form-input"
                />
                <input
                  type="text"
                  placeholder="Short Description"
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="form-input"
                />
                <button type="submit" className="btn btn-primary" style={{ padding: '0 12px' }}>
                  <Plus size={16} />
                </button>
              </div>
            </form>

            {/* Portfolio List */}
            <div style={{ maxHeight: '240px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {portfolioItems.map(p => (
                <div key={p.id} style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '6px',
                  padding: '10px 14px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {p.mediaType === 'VIDEO' && <Video size={18} color="#ef4444" />}
                    {p.mediaType === 'AUDIO' && <Music size={18} color="#f59e0b" />}
                    {p.mediaType === 'IMAGE' && <ImageIcon size={18} color="#3b82f6" />}
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: '700' }}>{p.title}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{p.mediaUrl} • {p.description}</div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeletePortfolio(p.id)}
                    style={{ background: 'transparent', border: 'none', color: 'var(--error)', cursor: 'pointer' }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
