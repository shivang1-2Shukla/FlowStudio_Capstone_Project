import React, { useState } from 'react';
import { X, Clapperboard, MapPin, Users, DollarSign, Send, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function PostOpportunityModal({ isOpen, onClose, onOpportunityCreated }) {
  const { user, token } = useAuth();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('FILM');
  const [type, setType] = useState('Casting Call & Crew Call');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [rolesInput, setRolesInput] = useState('');
  const [budget, setBudget] = useState('Paid / Industry Scale');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!title.trim() || !description.trim() || !location.trim()) {
      setError('Please fill in all required fields.');
      return;
    }

    setSubmitting(true);
    const seekingRoles = rolesInput
      ? rolesInput.split(',').map(r => r.trim()).filter(Boolean)
      : ['Lead Role', 'Crew Member'];

    const newOpp = {
      id: Date.now(),
      title,
      category,
      type,
      roleRequired: seekingRoles[0] || 'Casting Call',
      description,
      creator: `${user?.name || 'Recruiter'} (${user?.role || 'DIRECTOR'})`,
      seeking: seekingRoles,
      status: 'OPEN',
      location,
      budget,
      cardBg: '#ffffff'
    };

    try {
      // Attempt backend API save if token exists
      if (token) {
        const res = await fetch('/api/opportunities', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(newOpp)
        });

        if (!res.ok) {
          console.warn('Backend API returned non-OK status, proceeding with state fallback');
        }
      }
    } catch (err) {
      console.warn('Backend posting fallback:', err.message);
    } finally {
      onOpportunityCreated(newOpp);
      setSubmitting(false);
      onClose();
      // Reset form
      setTitle('');
      setLocation('');
      setDescription('');
      setRolesInput('');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '600px' }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(180, 83, 9, 0.3)'
            }}>
              <Clapperboard size={20} color="#ffffff" />
            </div>
            <div>
              <h2 style={{ fontSize: '19px', fontWeight: '800', color: '#0f172a' }}>
                Post Casting Call or Production Opportunity
              </h2>
              <p style={{ fontSize: '12px', color: '#475569', fontWeight: '600' }}>
                Exclusive Director & Producer Project Publishing
              </p>
            </div>
          </div>

          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#475569', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {error && (
          <div style={{
            background: '#fef2f2',
            border: '1px solid #fecaca',
            color: '#dc2626',
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
          <div className="form-group">
            <label className="form-label">Project / Casting Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. The Silent Frequency Feature Audition"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-input"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label className="form-label">Industry Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="form-input"
              >
                <option value="FILM">Film & Theatre</option>
                <option value="MUSIC">Music & Audio Score</option>
                <option value="MODELING">Modeling & Editorial</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Opportunity Type *</label>
              <input
                type="text"
                required
                placeholder="e.g. Casting Call, Sound Scoring, Lookbook"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label className="form-label">Location / Work Mode *</label>
              <div style={{ position: 'relative' }}>
                <MapPin size={16} color="#64748b" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                <input
                  type="text"
                  required
                  placeholder="e.g. Los Angeles, CA / Remote"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="form-input"
                  style={{ paddingLeft: '38px' }}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Budget / Compensation</label>
              <div style={{ position: 'relative' }}>
                <DollarSign size={16} color="#64748b" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                <input
                  type="text"
                  placeholder="e.g. $500/day or SAG-AFTRA Scale"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="form-input"
                  style={{ paddingLeft: '38px' }}
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Roles Needed (Comma separated) *</label>
            <div style={{ position: 'relative' }}>
              <Users size={16} color="#64748b" style={{ position: 'absolute', left: '12px', top: '12px' }} />
              <input
                type="text"
                required
                placeholder="e.g. Lead Actor (Male 30s), Cinematographer, Cellist"
                value={rolesInput}
                onChange={(e) => setRolesInput(e.target.value)}
                className="form-input"
                style={{ paddingLeft: '38px' }}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Project Description & Audition Guidelines *</label>
            <textarea
              rows="3"
              required
              placeholder="Describe character requirements, scene context, submission deadlines..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-input"
              style={{ resize: 'vertical' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
            <button type="button" onClick={onClose} className="btn btn-secondary">Cancel</button>
            <button type="submit" disabled={submitting} className="btn btn-gold" style={{ padding: '10px 24px' }}>
              <Send size={15} />
              <span>{submitting ? 'Publishing...' : 'Publish Opportunity'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
