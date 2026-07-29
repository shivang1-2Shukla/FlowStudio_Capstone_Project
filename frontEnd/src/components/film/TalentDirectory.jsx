import React, { useState } from 'react';
import { Search, MapPin, Video, Music, Image as ImageIcon, Sparkles, CheckCircle2, Award } from 'lucide-react';

const SRS_TALENTS = [
  {
    id: 1,
    name: 'Elena Rostova',
    role: 'DIRECTOR',
    roleLabel: 'Director',
    location: 'Los Angeles, CA',
    bio: 'Award-winning narrative feature director. Sundance Lab Alum. Specializing in sci-fi thrillers and high-concept drama.',
    skills: ['Directing', 'Script Analysis', 'Scene Blocking', 'ARRI Alexa'],
    portfolioType: 'VIDEO',
    portfolioTitle: 'Showreel 2026 - Sci-Fi & Drama',
    portfolioUrl: 'https://vimeo.com/sample-showreel',
    avatarBg: '#fee2e2',
    avatarColor: '#dc2626',
    badgeBg: '#fef2f2',
    badgeColor: '#dc2626'
  },
  {
    id: 2,
    name: 'Marcus Vance',
    role: 'ACTOR',
    roleLabel: 'Actor',
    location: 'New York, NY',
    bio: 'Method actor with extensive theatre and feature film credentials. Fluent in English & French.',
    skills: ['Method Acting', 'Stage Combat', 'Voice Acting', 'Improv'],
    portfolioType: 'VIDEO',
    portfolioTitle: 'Monologue Audition Reel (Hamlet & Indie Drama)',
    portfolioUrl: 'https://youtube.com/watch?v=sample-actor',
    avatarBg: '#e0e7ff',
    avatarColor: '#4f46e5',
    badgeBg: '#e0e7ff',
    badgeColor: '#4f46e5'
  },
  {
    id: 3,
    name: 'Aria Sterling',
    role: 'MUSICIAN',
    roleLabel: 'Musician / Composer',
    location: 'London, UK',
    bio: 'Film composer & multi-instrumentalist crafting ambient synth soundscapes and full orchestral film scores.',
    skills: ['Logic Pro X', 'Orchestral Scoring', 'Cellist', 'Dolby Atmos'],
    portfolioType: 'AUDIO',
    portfolioTitle: 'Neon Requiem Soundtrack (Original Score)',
    portfolioUrl: 'https://soundcloud.com/aria-sterling',
    avatarBg: '#fef3c7',
    avatarColor: '#d97706',
    badgeBg: '#fef3c7',
    badgeColor: '#d97706'
  },
  {
    id: 4,
    name: 'Chloe Monet',
    role: 'MODEL',
    roleLabel: 'Model',
    location: 'Paris, France',
    bio: 'High-fashion and editorial model featured in Vogue & Harper’s Bazaar campaigns.',
    skills: ['High Fashion', 'Runway', 'Commercial', 'Editorial Photoshoots'],
    portfolioType: 'IMAGE',
    portfolioTitle: 'Paris Fashion Week & Campaign Lookbook',
    portfolioUrl: 'https://instagram.com/chloemonet',
    avatarBg: '#fce7f3',
    avatarColor: '#db2777',
    badgeBg: '#fce7f3',
    badgeColor: '#db2777'
  },
  {
    id: 5,
    name: 'David K. Miller',
    role: 'CREW',
    roleLabel: 'VFX Supervisor & DP',
    location: 'Vancouver, BC',
    bio: 'DP & 3D Generalist specializing in Unreal Engine 5 virtual production & anamorphic camera lighting.',
    skills: ['Unreal Engine 5', 'RED V-Raptor', 'Color Grading', 'Nuke'],
    portfolioType: 'VIDEO',
    portfolioTitle: 'Virtual Production Cinematography Reel',
    portfolioUrl: 'https://vimeo.com/vfx-reel',
    avatarBg: '#d1fae5',
    avatarColor: '#059669',
    badgeBg: '#d1fae5',
    badgeColor: '#059669'
  },
  {
    id: 6,
    name: 'Sophia Chen',
    role: 'WRITER',
    roleLabel: 'Script Writer',
    location: 'Toronto, ON',
    bio: 'Screenwriter for speculative sci-fi and historical fiction. Winner of Nicholl Fellowship in Screenwriting.',
    skills: ['Screenwriting', 'Dialogue', 'World Building', 'Final Draft'],
    portfolioType: 'VIDEO',
    portfolioTitle: 'The Silent Frequency - Screenplay Excerpt',
    portfolioUrl: 'https://flowstudio.com/script/101',
    avatarBg: '#ede9fe',
    avatarColor: '#7c3aed',
    badgeBg: '#ede9fe',
    badgeColor: '#7c3aed'
  }
];

export default function TalentDirectory({ onSelectArtist }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('ALL');

  const roles = [
    { value: 'ALL', label: 'All Roles' },
    { value: 'ACTOR', label: 'Actors' },
    { value: 'MUSICIAN', label: 'Musicians' },
    { value: 'MODEL', label: 'Models' },
    { value: 'DIRECTOR', label: 'Directors' },
    { value: 'PRODUCER', label: 'Producers' },
    { value: 'WRITER', label: 'Script Writers' },
    { value: 'CREW', label: 'Crew & Technical' }
  ];

  const filteredTalents = SRS_TALENTS.filter(artist => {
    const matchesSearch = artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          artist.skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          artist.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          artist.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'ALL' || artist.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div style={{ padding: '32px 24px', maxWidth: '1280px', margin: '0 auto', overflowY: 'auto', height: '100%' }}>
      {/* Light Theme Hero Banner */}
      <div className="glass-card" style={{
        padding: '36px',
        marginBottom: '32px',
        background: 'linear-gradient(135deg, #e0e7ff 0%, #f3e8ff 100%)',
        border: '1px solid #c7d2fe',
        boxShadow: 'var(--shadow-md)'
      }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#ffffff', border: '1px solid #c7d2fe', color: '#4f46e5', padding: '4px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: '800', marginBottom: '14px', boxShadow: 'var(--shadow-sm)' }}>
          <Sparkles size={14} />
          <span>ENTERTAINMENT INDUSTRY TALENT NETWORK</span>
        </div>
        <h1 style={{ fontSize: '34px', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.5px', marginBottom: '10px' }}>
          Discover Verified Industry Talent & Multi-Format Portfolios
        </h1>
        <p style={{ color: '#334155', fontSize: '15.5px', maxWidth: '780px', lineHeight: '1.6' }}>
          Connect with professional Actors, Musicians, Models, Directors, Producers, Screenwriters, and Technical Crew. Explore audition showreels, audio compositions, and photo portfolios.
        </p>

        {/* Stats Section */}
        <div style={{ display: 'flex', gap: '40px', marginTop: '28px', flexWrap: 'wrap' }}>
          <div style={{ background: '#ffffff', padding: '12px 20px', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ fontSize: '24px', fontWeight: '800', color: '#4f46e5' }}>12,400+</div>
            <div style={{ fontSize: '12px', color: '#475569', fontWeight: '700' }}>Verified Creators</div>
          </div>
          <div style={{ background: '#ffffff', padding: '12px 20px', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ fontSize: '24px', fontWeight: '800', color: '#d97706' }}>1,850+</div>
            <div style={{ fontSize: '12px', color: '#475569', fontWeight: '700' }}>Active Casting Calls</div>
          </div>
          <div style={{ background: '#ffffff', padding: '12px 20px', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ fontSize: '24px', fontWeight: '800', color: '#db2777' }}>950+</div>
            <div style={{ fontSize: '12px', color: '#475569', fontWeight: '700' }}>Films & Shows Produced</div>
          </div>
        </div>
      </div>

      {/* Search Bar & Role Tabs */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '28px' }}>
        <div style={{ position: 'relative', width: '100%' }}>
          <Search size={18} color="#64748b" style={{ position: 'absolute', left: '16px', top: '15px' }} />
          <input
            type="text"
            placeholder="Search by talent name, role, location (e.g. Los Angeles, Paris), or skills (e.g. ARRI Alexa, Logic Pro)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-input"
            style={{ paddingLeft: '44px', paddingRight: '16px', height: '48px', fontSize: '14.5px', borderRadius: 'var(--radius-lg)', color: '#0f172a', background: '#ffffff' }}
          />
        </div>

        {/* Role Pills */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
          {roles.map(r => (
            <button
              key={r.value}
              onClick={() => setSelectedRole(r.value)}
              style={{
                background: selectedRole === r.value ? '#4f46e5' : '#ffffff',
                border: '1px solid ' + (selectedRole === r.value ? 'transparent' : 'var(--border-color)'),
                color: selectedRole === r.value ? '#ffffff' : '#334155',
                padding: '9px 20px',
                borderRadius: 'var(--radius-md)',
                fontSize: '13.5px',
                fontWeight: '700',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease',
                boxShadow: selectedRole === r.value ? '0 4px 12px rgba(79, 70, 229, 0.25)' : 'var(--shadow-sm)'
              }}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Talent Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(370px, 1fr))', gap: '24px', marginBottom: '40px' }}>
        {filteredTalents.map(artist => (
          <div key={artist.id} className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#ffffff', border: '1px solid var(--border-color)' }}>
            <div>
              {/* Profile Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: artist.avatarBg,
                  color: artist.avatarColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '800',
                  fontSize: '22px'
                }}>
                  {artist.name.charAt(0)}
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>{artist.name}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                    <span style={{
                      fontSize: '11.5px',
                      fontWeight: '700',
                      color: artist.badgeColor,
                      background: artist.badgeBg,
                      padding: '2px 8px',
                      borderRadius: '4px'
                    }}>
                      {artist.roleLabel}
                    </span>
                    <span style={{ fontSize: '12px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '600' }}>
                      <MapPin size={12} />
                      {artist.location}
                    </span>
                  </div>
                </div>
              </div>

              <p style={{ fontSize: '13.5px', color: '#334155', lineHeight: '1.5', marginBottom: '16px' }}>
                {artist.bio}
              </p>

              {/* Portfolio Highlight Badge Card */}
              <div style={{
                background: '#f8fafc',
                border: '1px solid var(--border-color)',
                padding: '12px 14px',
                borderRadius: '8px',
                marginBottom: '16px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <div style={{ fontSize: '11px', fontWeight: '800', color: '#475569', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {artist.portfolioType === 'VIDEO' && <Video size={13} color="#ef4444" />}
                    {artist.portfolioType === 'AUDIO' && <Music size={13} color="#d97706" />}
                    {artist.portfolioType === 'IMAGE' && <ImageIcon size={13} color="#db2777" />}
                    <span>{artist.portfolioType} Portfolio</span>
                  </div>
                  <span style={{ fontSize: '11px', color: '#d97706', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <Award size={12} /> Featured
                  </span>
                </div>
                <div style={{ fontSize: '13.5px', fontWeight: '800', color: '#0f172a' }}>
                  {artist.portfolioTitle}
                </div>
              </div>

              {/* Skills Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                {artist.skills.map((skill, idx) => (
                  <span key={idx} style={{
                    fontSize: '11.5px',
                    background: '#f1f5f9',
                    border: '1px solid var(--border-color)',
                    padding: '3px 10px',
                    borderRadius: '6px',
                    color: '#334155',
                    fontWeight: '600'
                  }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => onSelectArtist(artist)}
              className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'center', padding: '11px', borderRadius: 'var(--radius-md)' }}
            >
              <CheckCircle2 size={15} />
              <span>Connect & View Portfolio</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
