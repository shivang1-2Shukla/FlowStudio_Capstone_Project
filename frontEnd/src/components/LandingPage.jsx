import React from 'react';
import { Film, Users, Clapperboard, FileText, ArrowRight, ShieldCheck, Sparkles, CheckCircle2, Star, PlayCircle, Globe, Video, Music, Camera } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LandingPage({ onNavigate, onOpenAuth }) {
  const { user, loginWithGoogle } = useAuth();

  const handleGoogleClick = async () => {
    if (user) {
      onNavigate('directory');
    } else {
      try {
        await loginWithGoogle('DIRECTOR');
        onNavigate('directory');
      } catch (err) {
        onOpenAuth();
      }
    }
  };

  const handleAction = (targetView) => {
    if (user) {
      onNavigate(targetView);
    } else {
      onOpenAuth();
    }
  };

  const rolesList = [
    { name: 'Actors & Performers', icon: Film, color: '#4f46e5', badge: 'Audition Reels', desc: 'Showcase monologues, video showreels, and headshots for film & TV casting calls.' },
    { name: 'Musicians & Composers', icon: Music, color: '#f59e0b', badge: 'Audio Scores', desc: 'Share soundtrack compositions, vocal tracks, and Logic/ProTools audio portfolios.' },
    { name: 'Models & Editorial', icon: Camera, color: '#ec4899', badge: 'Lookbooks', desc: 'Display editorial photoshoots, commercial runway portfolios, and high-fashion gigs.' },
    { name: 'Directors & Producers', icon: Clapperboard, color: '#8b5cf6', badge: 'Recruiter Controls', desc: 'Publish casting calls, hire crew talent, and manage production budgets.' },
    { name: 'Screenwriters', icon: FileText, color: '#06b6d4', badge: 'Screenplay Studio', desc: 'Draft screenplays with Courier Prime formatting and automated scene breakdown.' },
    { name: 'Crew & VFX Technicians', icon: Video, color: '#10b981', badge: 'DPs & Editors', desc: 'Connect with film productions seeking DPs, sound engineers, and VFX animators.' }
  ];

  return (
    <div style={{ overflowY: 'auto', height: '100%', background: '#f8fafc', color: '#0f172a' }}>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)',
        color: '#ffffff',
        padding: '64px 32px 80px 32px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '48px', alignItems: 'center' }}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(99, 102, 241, 0.2)',
              border: '1px solid rgba(129, 140, 248, 0.4)',
              padding: '6px 16px',
              borderRadius: '999px',
              fontSize: '13px',
              fontWeight: '700',
              color: '#a5b4fc',
              marginBottom: '20px'
            }}>
              <Sparkles size={16} color="#818cf8" />
              <span>THE UNIFIED ENTERTAINMENT INDUSTRY PLATFORM</span>
            </div>

            <h1 style={{
              fontSize: '44px',
              fontWeight: '900',
              lineHeight: '1.15',
              letterSpacing: '-1px',
              marginBottom: '20px',
              color: '#ffffff'
            }}>
              Connect, Audition & Produce <span style={{ background: 'linear-gradient(135deg, #818cf8 0%, #c084fc 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Global Entertainment</span>
            </h1>

            <p style={{
              fontSize: '17px',
              color: '#cbd5e1',
              lineHeight: '1.6',
              marginBottom: '32px',
              maxWidth: '620px'
            }}>
              FlowStudio empowers actors, musicians, models, directors, producers, screenwriters, and crew members to showcase multi-media portfolios, publish casting calls, and write screenplays in a single workspace.
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center' }}>
              <button
                onClick={() => handleAction('talent')}
                className="btn btn-gold"
                style={{ padding: '14px 28px', fontSize: '15px', borderRadius: '10px' }}
              >
                <span>Explore Talent Directory</span>
                <ArrowRight size={18} />
              </button>

              <button
                onClick={handleGoogleClick}
                className="btn"
                style={{
                  background: '#ffffff',
                  color: '#0f172a',
                  fontWeight: '800',
                  padding: '14px 24px',
                  borderRadius: '10px',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
                  fontSize: '14.5px'
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" style={{ marginRight: '6px' }}>
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.29v3.15C3.26 21.3 7.31 24 12 24z"/>
                  <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.29C.47 8.21 0 10.05 0 12s.47 3.79 1.29 5.42l3.99-3.15z"/>
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.58l3.99 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                </svg>
                <span>Continue with Google</span>
              </button>
            </div>

            {/* Micro Badges */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginTop: '36px', fontSize: '13px', color: '#94a3b8' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><ShieldCheck size={16} color="#34d399" /> Verified Profiles</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><CheckCircle2 size={16} color="#60a5fa" /> SAG-AFTRA Compatible</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Star size={16} color="#fbbf24" /> 4.9/5 Industry Rated</span>
            </div>
          </div>

          {/* Hero Banner Image Graphic */}
          <div style={{ position: 'relative' }}>
            <div style={{
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              border: '1px solid rgba(255, 255, 255, 0.15)'
            }}>
              <img
                src="/hero_banner.png"
                alt="FlowStudio Cinematic Entertainment Platform"
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section style={{ background: '#ffffff', borderBottom: '1px solid #e2e8f0', padding: '24px 32px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', textAlign: 'center' }}>
          <div>
            <div style={{ fontSize: '28px', fontWeight: '900', color: '#4f46e5' }}>10,000+</div>
            <div style={{ fontSize: '13px', color: '#475569', fontWeight: '700' }}>Verified Creative Talent</div>
          </div>
          <div>
            <div style={{ fontSize: '28px', fontWeight: '900', color: '#d97706' }}>2,500+</div>
            <div style={{ fontSize: '13px', color: '#475569', fontWeight: '700' }}>Casting Calls & Gigs</div>
          </div>
          <div>
            <div style={{ fontSize: '28px', fontWeight: '900', color: '#059669' }}>99.8%</div>
            <div style={{ fontSize: '13px', color: '#475569', fontWeight: '700' }}>Audition Match Accuracy</div>
          </div>
          <div>
            <div style={{ fontSize: '28px', fontWeight: '900', color: '#db2777' }}>$4.2M+</div>
            <div style={{ fontSize: '13px', color: '#475569', fontWeight: '700' }}>Production Budgets Posted</div>
          </div>
        </div>
      </section>

      {/* Industry Roles Showcase Section */}
      <section style={{ padding: '72px 32px', maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '52px' }}>
          <div style={{ fontSize: '13px', fontWeight: '800', color: '#4f46e5', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
            Built For All 7 Entertainment Roles
          </div>
          <h2 style={{ fontSize: '34px', fontWeight: '900', color: '#0f172a' }}>
            Tailored Workspaces for Every Creative Specialty
          </h2>
          <p style={{ color: '#475569', fontSize: '16px', maxWidth: '640px', margin: '12px auto 0 auto', fontWeight: '500' }}>
            Whether you are an actor uploading showreels, a composer sharing film scores, or a director casting a feature, FlowStudio fits your workflow.
          </p>
        </div>

        {/* Roles Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '24px', marginBottom: '48px' }}>
          {rolesList.map((r, i) => {
            const IconComponent = r.icon;
            return (
              <div key={i} className="glass-card" style={{ padding: '28px', background: '#ffffff', border: '1px solid #cbd5e1' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: `${r.color}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <IconComponent size={22} color={r.color} />
                  </div>

                  <span style={{
                    fontSize: '11.5px',
                    fontWeight: '800',
                    color: r.color,
                    background: `${r.color}10`,
                    padding: '4px 12px',
                    borderRadius: '999px',
                    border: `1px solid ${r.color}30`
                  }}>
                    {r.badge}
                  </span>
                </div>

                <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>{r.name}</h3>
                <p style={{ fontSize: '14px', color: '#334155', lineHeight: '1.6', fontWeight: '500', marginBottom: '20px' }}>{r.desc}</p>

                <button
                  onClick={() => handleAction('directory')}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: r.color,
                    fontWeight: '800',
                    fontSize: '13.5px',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <span>Explore Profiles</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            );
          })}
        </div>

        {/* Talent Graphic Banner */}
        <div className="glass-card" style={{
          borderRadius: '20px',
          overflow: 'hidden',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '0',
          background: '#ffffff',
          border: '1px solid #cbd5e1',
          boxShadow: 'var(--shadow-md)'
        }}>
          <div style={{ padding: '48px' }}>
            <span style={{ fontSize: '12px', fontWeight: '800', color: '#d97706', textTransform: 'uppercase', letterSpacing: '1px' }}>MULTI-MEDIA PORTFOLIOS</span>
            <h2 style={{ fontSize: '28px', fontWeight: '900', color: '#0f172a', margin: '12px 0 16px 0' }}>
              Showcase Audition Videos, Audio Scores & Fashion Lookbooks
            </h2>
            <p style={{ fontSize: '15px', color: '#334155', lineHeight: '1.6', marginBottom: '24px', fontWeight: '500' }}>
              Host all your creative assets in one verified profile. Embed YouTube showreels, SoundCloud compositions, Vimeo audition clips, and high-res photography portfolios.
            </p>

            <button
              onClick={() => handleAction('directory')}
              className="btn btn-primary"
              style={{ padding: '12px 24px' }}
            >
              <span>View Verified Talent Portfolios</span>
              <ArrowRight size={16} />
            </button>
          </div>

          <div style={{ background: '#f1f5f9', overflow: 'hidden' }}>
            <img
              src="/talent_grid.png"
              alt="FlowStudio Creative Talent Grid"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>

      {/* Platform Features Grid */}
      <section style={{ background: '#ffffff', borderTop: '1px solid #e2e8f0', padding: '72px 32px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: '32px', fontWeight: '900', color: '#0f172a' }}>
              Everything You Need to Connect & Produce
            </h2>
            <p style={{ color: '#475569', fontSize: '15px', marginTop: '8px', fontWeight: '500' }}>
              A single platform replacing disconnected audition emails, social links, and offline script files.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '28px' }}>
            {/* Feature 1 */}
            <div style={{ background: '#f8fafc', padding: '28px', borderRadius: '16px', border: '1px solid #cbd5e1' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(79, 70, 229, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <Users size={20} color="#4f46e5" />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>1. Verified Talent Directory</h3>
              <p style={{ fontSize: '14px', color: '#334155', lineHeight: '1.6', fontWeight: '500' }}>
                Filter candidates by role, location, availability, and skills. Connect directly with 1-to-1 messaging.
              </p>
            </div>

            {/* Feature 2 */}
            <div style={{ background: '#f8fafc', padding: '28px', borderRadius: '16px', border: '1px solid #cbd5e1' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(217, 119, 6, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <Clapperboard size={20} color="#d97706" />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>2. Casting Calls & Gigs Board</h3>
              <p style={{ fontSize: '14px', color: '#334155', lineHeight: '1.6', fontWeight: '500' }}>
                Directors and Producers publish casting notices with custom role requirements, compensation, and submission guidelines.
              </p>
            </div>

            {/* Feature 3 */}
            <div style={{ background: '#f8fafc', padding: '28px', borderRadius: '16px', border: '1px solid #cbd5e1' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(5, 150, 105, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <FileText size={20} color="#059669" />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>3. Screenplay Creative Studio</h3>
              <p style={{ fontSize: '14px', color: '#334155', lineHeight: '1.6', fontWeight: '500' }}>
                Write scripts using industry Courier Prime formatting, run scene breakdowns, and save drafts directly to the cloud.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section style={{
        background: 'linear-gradient(135deg, #4f46e5 0%, #312e81 100%)',
        color: '#ffffff',
        padding: '64px 32px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '34px', fontWeight: '900', marginBottom: '16px', color: '#ffffff' }}>
            Ready to Join the Entertainment Industry Network?
          </h2>
          <p style={{ fontSize: '16px', color: '#c7d2fe', marginBottom: '32px', fontWeight: '500' }}>
            Create your account in under 60 seconds with Email or Google SSO.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
            <button
              onClick={onOpenAuth}
              className="btn btn-gold"
              style={{ padding: '14px 32px', fontSize: '15px' }}
            >
              <span>Get Started Free</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
