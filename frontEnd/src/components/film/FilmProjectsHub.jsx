import React, { useState } from 'react';
import { Clapperboard, Plus, Users, MapPin, Send } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import PostOpportunityModal from './PostOpportunityModal';

const INITIAL_OPPORTUNITIES = [
  {
    id: 201,
    title: 'The Silent Frequency',
    category: 'FILM',
    type: 'Casting Call & Crew Call',
    roleRequired: 'Lead Actor & Cinematographer',
    description: 'An isolated radio operator in the Arctic intercepts an encrypted broadcast that predicts events 24 hours into the future. Audition clips and showreels required.',
    creator: 'Elena Rostova (Director)',
    seeking: ['Lead Actor (Marcus - Male 30s)', 'Cinematographer (ARRI systems)', 'Sound Designer'],
    status: 'OPEN',
    location: 'Iceland / Remote',
    cardBg: '#ffffff'
  },
  {
    id: 202,
    title: 'Neon Requiem Soundtrack',
    category: 'MUSIC',
    type: 'Music Collaboration',
    roleRequired: 'Cellist & Vocalist',
    description: 'Seeking expressive cellist and ethereal vocalist for synth-wave orchestral feature film soundtrack recording.',
    creator: 'Aria Sterling (Composer)',
    seeking: ['Cellist (Logic Pro X)', 'Female Vocalist (Ethereal Ambient)'],
    status: 'OPEN',
    location: 'London Studio / Remote Audio',
    cardBg: '#ffffff'
  },
  {
    id: 203,
    title: 'Vogue Cyber-Chic Editorial',
    category: 'MODELING',
    type: 'Modeling Photoshoot Gigs',
    roleRequired: 'Fashion Models',
    description: 'High-fashion editorial photoshoot featuring futuristic neon wardrobe. Portfolio lookbook required.',
    creator: 'Chloe Monet (Creative Director)',
    seeking: ['Female Model (5\'9"+)', 'Male Model (6\'0"+)'],
    status: 'URGENT',
    location: 'Paris, France',
    cardBg: '#ffffff'
  }
];

export default function FilmProjectsHub() {
  const { user } = useAuth();
  const [opportunities, setOpportunities] = useState(INITIAL_OPPORTUNITIES);
  const [activeCategory, setActiveCategory] = useState('ALL');
  
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [applyingOpportunity, setApplyingOpportunity] = useState(null);
  const [applyRole, setApplyRole] = useState('');
  const [coverNote, setCoverNote] = useState('');
  const [portfolioLink, setPortfolioLink] = useState('');

  const isDirectorOrProducer = user && (user.role === 'DIRECTOR' || user.role === 'PRODUCER');

  const categories = [
    { value: 'ALL', label: 'All Opportunities' },
    { value: 'FILM', label: 'Film & Theatre' },
    { value: 'MUSIC', label: 'Music & Audio' },
    { value: 'MODELING', label: 'Modeling & Fashion' }
  ];

  const filteredOpportunities = activeCategory === 'ALL'
    ? opportunities
    : opportunities.filter(o => o.category === activeCategory);

  const handleApplySubmit = (e) => {
    e.preventDefault();
    alert(`Application submitted for "${applyingOpportunity.title}" as ${applyRole}! The recruiter will review your profile and portfolio.`);
    setApplyingOpportunity(null);
    setApplyRole('');
    setCoverNote('');
    setPortfolioLink('');
  };

  const handleOpportunityCreated = (newOpp) => {
    setOpportunities(prev => [newOpp, ...prev]);
  };

  return (
    <div style={{ padding: '32px 24px', maxWidth: '1280px', margin: '0 auto', overflowY: 'auto', height: '100%' }}>
      {/* Light Theme Banner */}
      <div className="glass-card" style={{
        padding: '32px',
        marginBottom: '28px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #e0e7ff 0%, #fae8ff 100%)',
        border: '1px solid #c7d2fe'
      }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#ffffff', color: '#4f46e5', padding: '4px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: '800', marginBottom: '10px', boxShadow: 'var(--shadow-sm)' }}>
            <Clapperboard size={14} />
            <span>ENTERTAINMENT OPPORTUNITIES BOARD</span>
          </div>
          <h1 style={{ fontSize: '30px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
            Casting Calls, Gigs & Production Projects
          </h1>
          <p style={{ color: '#1e293b', fontSize: '15px', maxWidth: '720px', fontWeight: '500' }}>
            Browse open audition calls, musical collaborations, modeling photoshoots, and post-production crew positions.
          </p>
        </div>

        {/* Render Post button EXCLUSIVELY for Director & Producer roles */}
        {isDirectorOrProducer ? (
          <button
            onClick={() => setIsPostModalOpen(true)}
            className="btn btn-gold"
            style={{ padding: '12px 24px', borderRadius: 'var(--radius-md)' }}
          >
            <Plus size={16} />
            <span>Post Casting Call / Gig</span>
          </button>
        ) : (
          <div style={{
            background: '#ffffff',
            border: '1px solid #cbd5e1',
            padding: '10px 16px',
            borderRadius: 'var(--radius-md)',
            fontSize: '12.5px',
            color: '#334155',
            fontWeight: '600',
            maxWidth: '240px',
            textAlign: 'center',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <span>💡 Log in as <strong>Director</strong> or <strong>Producer</strong> to post casting calls.</span>
          </div>
        )}
      </div>

      <PostOpportunityModal
        isOpen={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
        onOpportunityCreated={handleOpportunityCreated}
      />

      {/* Category Pills */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', overflowX: 'auto' }}>
        {categories.map(c => (
          <button
            key={c.value}
            onClick={() => setActiveCategory(c.value)}
            style={{
              background: activeCategory === c.value ? '#4f46e5' : '#ffffff',
              border: '1px solid ' + (activeCategory === c.value ? 'transparent' : 'var(--border-color)'),
              color: activeCategory === c.value ? '#ffffff' : '#334155',
              padding: '9px 20px',
              borderRadius: 'var(--radius-md)',
              fontSize: '13.5px',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: activeCategory === c.value ? '0 4px 12px rgba(79, 70, 229, 0.25)' : 'var(--shadow-sm)'
            }}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '24px', marginBottom: '40px' }}>
        {filteredOpportunities.map(opp => (
          <div key={opp.id} className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#ffffff', border: '1px solid var(--border-color)' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <span style={{
                  fontSize: '11.5px',
                  fontWeight: '800',
                  color: '#4f46e5',
                  background: 'rgba(79, 70, 229, 0.08)',
                  padding: '3px 10px',
                  borderRadius: '999px',
                  border: '1px solid rgba(79, 70, 229, 0.2)'
                }}>
                  {opp.type}
                </span>
                <span style={{
                  fontSize: '11.5px',
                  fontWeight: '700',
                  color: opp.status === 'URGENT' ? '#ef4444' : '#059669',
                  background: opp.status === 'URGENT' ? '#fef2f2' : '#ecfdf5',
                  padding: '3px 10px',
                  borderRadius: '4px'
                }}>
                  ● {opp.status}
                </span>
              </div>

              <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a', marginBottom: '6px' }}>{opp.title}</h2>
              <div style={{ fontSize: '12.5px', color: '#64748b', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '600' }}>
                <span>Posted by <strong style={{ color: '#0f172a' }}>{opp.creator}</strong></span>
                <span>•</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><MapPin size={13} /> {opp.location}</span>
              </div>

              <p style={{
                background: '#f8fafc',
                padding: '12px 14px',
                borderRadius: '8px',
                borderLeft: '3px solid #4f46e5',
                fontSize: '13.5px',
                color: '#334155',
                marginBottom: '18px',
                lineHeight: '1.5'
              }}>
                {opp.description}
              </p>

              {/* Seeking Roles */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{ fontSize: '11.5px', fontWeight: '800', color: '#475569', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Users size={13} />
                  <span>Roles Needed:</span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {opp.seeking.map((r, i) => (
                    <span key={i} style={{
                      fontSize: '11.5px',
                      background: '#e0e7ff',
                      color: '#4f46e5',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontWeight: '700'
                    }}>
                      + {r}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => setApplyingOpportunity(opp)}
              className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'center', padding: '11px', borderRadius: 'var(--radius-md)' }}
            >
              <Send size={15} />
              <span>Apply for Role</span>
            </button>
          </div>
        ))}
      </div>

      {/* Application Modal */}
      {applyingOpportunity && (
        <div className="modal-overlay" onClick={() => setApplyingOpportunity(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '4px', color: '#0f172a' }}>
              Submit Application: {applyingOpportunity.title}
            </h2>
            <p style={{ fontSize: '12.5px', color: '#475569', marginBottom: '16px' }}>
              Posted by {applyingOpportunity.creator}
            </p>

            <form onSubmit={handleApplySubmit}>
              <div className="form-group">
                <label className="form-label">Target Role</label>
                <select
                  required
                  value={applyRole}
                  onChange={(e) => setApplyRole(e.target.value)}
                  className="form-input"
                >
                  <option value="">-- Choose Role --</option>
                  {applyingOpportunity.seeking.map((r, idx) => (
                    <option key={idx} value={r}>{r}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Portfolio / Showreel URL</label>
                <input
                  type="text"
                  required
                  placeholder="https://vimeo.com/your-showreel or SoundCloud link"
                  value={portfolioLink}
                  onChange={(e) => setPortfolioLink(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Cover Note / Pitch</label>
                <textarea
                  rows="3"
                  required
                  placeholder="Briefly explain your experience and why you are suitable for this opportunity..."
                  value={coverNote}
                  onChange={(e) => setCoverNote(e.target.value)}
                  className="form-input"
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                <button type="button" onClick={() => setApplyingOpportunity(null)} className="btn btn-secondary">Cancel</button>
                <button type="submit" className="btn btn-primary">Submit Application</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
