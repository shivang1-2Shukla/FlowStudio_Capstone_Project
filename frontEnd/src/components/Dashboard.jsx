import React, { useState } from 'react';
import {
  Film, Users, FileText, Clapperboard,
  MessageSquare, Send, Clock, ArrowRight, Sparkles,
  CheckCircle2, Folder, MapPin, Award, Zap, BarChart2,
  Eye, LayoutDashboard, User
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// ─── Shared light-mode card style ────────────────────────────────────────────
const card = {
  background: '#ffffff',
  border: '1px solid #e2e8f0',
  borderRadius: '16px',
  boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
};

// ─── Mock data – zero backend calls ──────────────────────────────────────────
const ROLE_CONFIG = {
  ACTOR:    { label: 'Actor',           color: '#4f46e5', bg: '#e0e7ff', emoji: '🎭' },
  MUSICIAN: { label: 'Musician',        color: '#d97706', bg: '#fef3c7', emoji: '🎵' },
  MODEL:    { label: 'Model',           color: '#db2777', bg: '#fce7f3', emoji: '📸' },
  DIRECTOR: { label: 'Director',        color: '#7c3aed', bg: '#ede9fe', emoji: '🎬' },
  PRODUCER: { label: 'Producer',        color: '#059669', bg: '#d1fae5', emoji: '🎥' },
  WRITER:   { label: 'Script Writer',   color: '#0891b2', bg: '#cffafe', emoji: '✍️'  },
  CREW:     { label: 'Crew/Technical',  color: '#10b981', bg: '#d1fae5', emoji: '🎞️'  },
  USER:     { label: 'Creative',        color: '#4f46e5', bg: '#e0e7ff', emoji: '✨' },
};

const RECENT_ACTIVITY = [
  { id: 1, icon: Send,          color: '#4f46e5', label: 'Applied to',        subject: 'The Silent Frequency — Lead Actor',    time: '2h ago'    },
  { id: 2, icon: Eye,           color: '#0891b2', label: 'Profile viewed by', subject: 'Elena Rostova (Director)',             time: '5h ago'    },
  { id: 3, icon: MessageSquare, color: '#059669', label: 'New message from',  subject: 'Aria Sterling',                       time: 'Yesterday' },
  { id: 4, icon: Award,         color: '#d97706', label: 'Saved opportunity', subject: 'Neon Requiem — Cellist',               time: 'Yesterday' },
  { id: 5, icon: FileText,      color: '#7c3aed', label: 'Saved screenplay',  subject: 'Arctic Signal Draft v2',              time: '2 days ago'},
];

const FEATURED_OPPS = [
  { id: 201, title: 'The Silent Frequency', type: 'Casting Call', role: 'Lead Actor', location: 'Iceland', status: 'OPEN',   accentColor: '#4f46e5' },
  { id: 202, title: 'Neon Requiem OST',     type: 'Music Collab', role: 'Cellist',    location: 'London',  status: 'OPEN',   accentColor: '#d97706' },
  { id: 203, title: 'Vogue Cyber-Chic',     type: 'Photoshoot',   role: 'Model',      location: 'Paris',   status: 'URGENT', accentColor: '#db2777' },
];

const SUGGESTED_TALENT = [
  { name: 'Elena Rostova', role: 'Director', location: 'Los Angeles', avatarBg: '#fee2e2', avatarColor: '#dc2626' },
  { name: 'Marcus Vance',  role: 'Actor',    location: 'New York',    avatarBg: '#e0e7ff', avatarColor: '#4f46e5' },
  { name: 'Aria Sterling', role: 'Musician', location: 'London',      avatarBg: '#fef3c7', avatarColor: '#d97706' },
];

const QUICK_ACTIONS = [
  { icon: Users,        label: 'Browse Talent',     sub: 'Find creatives',       view: 'talent',   gradient: 'linear-gradient(135deg,#4f46e5,#7c3aed)', glow: 'rgba(79,70,229,0.30)'   },
  { icon: Clapperboard, label: 'Opportunity Board', sub: 'Casting calls & gigs', view: 'projects', gradient: 'linear-gradient(135deg,#d97706,#b45309)', glow: 'rgba(180,83,9,0.30)'    },
  { icon: FileText,     label: 'Creative Studio',   sub: 'Write your screenplay', view: 'studio',   gradient: 'linear-gradient(135deg,#059669,#0d9488)', glow: 'rgba(5,150,105,0.30)'   },
  { icon: Folder,       label: 'My Projects',       sub: 'Open workspace drawer', view: null,       gradient: 'linear-gradient(135deg,#7c3aed,#db2777)', glow: 'rgba(124,58,237,0.30)'  },
];

const PLATFORM_STATS = [
  { label: 'Active Talent Online', value: '1,204', color: '#4f46e5' },
  { label: 'New Casting Calls',    value: '38',    color: '#d97706' },
  { label: 'Connections Made',     value: '512',   color: '#059669' },
];

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

function getProfileCompletion(user, profile) {
  const checks = [
    { label: 'Name set',       done: !!user?.name },
    { label: 'Email verified', done: !!user?.email },
    { label: 'Role selected',  done: !!user?.role && user.role !== 'USER' },
    { label: 'Bio added',      done: !!profile?.bio },
    { label: 'Skills listed',  done: !!profile?.skills },
    { label: 'Location added', done: !!profile?.location },
  ];
  const pct = Math.round((checks.filter(c => c.done).length / checks.length) * 100);
  return { checks, pct };
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ icon: Icon, label, value, delta, color, bg }) {
  return (
    <div style={{ ...card, padding: '20px 22px', display: 'flex', alignItems: 'center', gap: '14px' }}>
      <div style={{
        width: '46px', height: '46px', borderRadius: '12px', flexShrink: 0,
        background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon size={21} color={color} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: '24px', fontWeight: '900', color: '#0f172a', lineHeight: 1 }}>{value}</div>
        <div style={{ fontSize: '11.5px', fontWeight: '700', color: '#64748b', marginTop: '4px', lineHeight: 1.3 }}>{label}</div>
      </div>
      {delta && (
        <span style={{ fontSize: '11px', fontWeight: '800', color: '#059669', background: '#dcfce7', padding: '3px 9px', borderRadius: '999px', flexShrink: 0 }}>
          +{delta}
        </span>
      )}
    </div>
  );
}

// ─── Section Header ───────────────────────────────────────────────────────────
function SectionHeader({ icon: Icon, iconColor, title, actionLabel, onAction }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Icon size={17} color={iconColor} />
        <h2 style={{ fontSize: '15px', fontWeight: '800', color: '#0f172a' }}>{title}</h2>
      </div>
      {actionLabel && (
        <button onClick={onAction} style={{
          background: 'transparent', border: 'none', color: '#4f46e5',
          fontSize: '12.5px', fontWeight: '700', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: '4px'
        }}>
          {actionLabel} <ArrowRight size={13} />
        </button>
      )}
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────
export default function Dashboard({ onNavigate, onOpenProfile, onOpenProjects }) {
  const { user, profile } = useAuth();
  const roleCfg = ROLE_CONFIG[user?.role] || ROLE_CONFIG.USER;
  const { checks, pct } = getProfileCompletion(user, profile);

  const [showBanner, setShowBanner] = useState(
    () => localStorage.getItem(`fs_banner_${user?.id}`) !== 'true'
  );

  const dismissBanner = () => {
    localStorage.setItem(`fs_banner_${user?.id}`, 'true');
    setShowBanner(false);
  };

  const handleQuickAction = (a) => {
    if (!a.view) { onOpenProjects(); return; }
    onNavigate(a.view);
  };

  return (
    <div style={{ overflowY: 'auto', height: '100%', background: '#f1f5f9' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '28px 28px 64px' }}>

        {/* ── Welcome Banner ── */}
        {showBanner && (
          <div style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 55%, #312e81 100%)',
            borderRadius: '18px', padding: '32px 36px', marginBottom: '24px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px',
            boxShadow: '0 12px 40px rgba(79,70,229,0.22)', position: 'relative', overflow: 'hidden',
          }}>
            {/* glow orbs */}
            <div style={{ position:'absolute', top:'-40px', right:'160px', width:'200px', height:'200px', borderRadius:'50%', background:'rgba(124,58,237,0.18)', filter:'blur(40px)', pointerEvents:'none' }} />
            <div style={{ position:'absolute', bottom:'-30px', right:'40px', width:'150px', height:'150px', borderRadius:'50%', background:'rgba(79,70,229,0.12)', filter:'blur(30px)', pointerEvents:'none' }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'10px' }}>
                <span style={{ fontSize:'22px' }}>{roleCfg.emoji}</span>
                <span style={{
                  fontSize:'11.5px', fontWeight:'800', color:'#a5b4fc', textTransform:'uppercase', letterSpacing:'0.5px',
                  background:'rgba(99,102,241,0.2)', border:'1px solid rgba(129,140,248,0.3)', padding:'3px 12px', borderRadius:'999px',
                }}>{roleCfg.label}</span>
              </div>
              <h1 style={{ fontSize:'26px', fontWeight:'900', color:'#ffffff', marginBottom:'6px', lineHeight:1.2 }}>
                {getGreeting()}, {user?.name?.split(' ')[0] || 'Creative'}! 👋
              </h1>
              <p style={{ fontSize:'14px', color:'#c7d2fe', fontWeight:'500', maxWidth:'460px', lineHeight:1.6 }}>
                Your FlowStudio workspace is ready. Explore opportunities, connect with talent, and bring your creative vision to life.
              </p>
            </div>

            <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:'10px', position:'relative', zIndex:1, flexShrink:0 }}>
              <button
                onClick={() => onNavigate('talent')}
                className="btn btn-gold"
                style={{ padding:'10px 20px', whiteSpace:'nowrap' }}
              >
                <Sparkles size={14} /><span>Explore Platform</span>
              </button>
              <button onClick={dismissBanner} style={{ background:'transparent', border:'none', color:'#64748b', fontSize:'11.5px', cursor:'pointer', fontWeight:'600' }}>
                Dismiss
              </button>
            </div>
          </div>
        )}

        {/* ── Stats Row ── */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'14px', marginBottom:'22px' }}>
          <StatCard icon={Eye}           label="Profile Views This Week" value="142" delta="18" color="#4f46e5" bg="#ede9fe" />
          <StatCard icon={Send}          label="Applications Sent"        value="7"   delta="3"  color="#059669" bg="#dcfce7" />
          <StatCard icon={MessageSquare} label="Unread Messages"           value="4"              color="#d97706" bg="#fef9c3" />
          <StatCard icon={Folder}        label="Saved Projects"            value="12" delta="2"   color="#7c3aed" bg="#ede9fe" />
        </div>

        {/* ── Main 2-col Grid ── */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 320px', gap:'20px', alignItems:'start' }}>

          {/* LEFT COLUMN */}
          <div style={{ display:'flex', flexDirection:'column', gap:'20px' }}>

            {/* Quick Actions */}
            <div style={{ ...card, padding:'22px' }}>
              <SectionHeader icon={Zap} iconColor="#4f46e5" title="Quick Actions" />
              <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'12px' }}>
                {QUICK_ACTIONS.map((a, i) => {
                  const Icon = a.icon;
                  return (
                    <button
                      key={i}
                      onClick={() => handleQuickAction(a)}
                      style={{
                        background: a.gradient, border:'none', borderRadius:'14px',
                        padding:'18px 12px', cursor:'pointer', display:'flex',
                        flexDirection:'column', alignItems:'center', gap:'10px', textAlign:'center',
                        boxShadow:`0 4px 16px ${a.glow}`, transition:'transform 0.18s ease, box-shadow 0.18s ease',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.boxShadow=`0 10px 24px ${a.glow}`; }}
                      onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)';    e.currentTarget.style.boxShadow=`0 4px 16px ${a.glow}`;  }}
                    >
                      <div style={{ width:'40px', height:'40px', borderRadius:'11px', background:'rgba(255,255,255,0.2)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                        <Icon size={20} color="#ffffff" />
                      </div>
                      <div>
                        <div style={{ fontSize:'12.5px', fontWeight:'800', color:'#ffffff', marginBottom:'2px' }}>{a.label}</div>
                        <div style={{ fontSize:'10px', color:'rgba(255,255,255,0.7)', fontWeight:'600', lineHeight:1.3 }}>{a.sub}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Featured Opportunities */}
            <div style={{ ...card, padding:'22px' }}>
              <SectionHeader icon={Clapperboard} iconColor="#d97706" title="Featured Opportunities" actionLabel="View All" onAction={() => onNavigate('projects')} />
              <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
                {FEATURED_OPPS.map(opp => (
                  <div
                    key={opp.id}
                    onClick={() => onNavigate('projects')}
                    style={{
                      display:'flex', alignItems:'center', justifyContent:'space-between',
                      padding:'14px 16px', borderRadius:'10px', cursor:'pointer',
                      border:'1px solid #e2e8f0', background:'#f8fafc',
                      borderLeft:`4px solid ${opp.accentColor}`,
                      transition:'background 0.15s ease, box-shadow 0.15s ease',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background='#f1f5f9'; e.currentTarget.style.boxShadow='0 2px 8px rgba(0,0,0,0.07)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background='#f8fafc'; e.currentTarget.style.boxShadow='none'; }}
                  >
                    <div>
                      <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'4px' }}>
                        <span style={{ fontSize:'14.5px', fontWeight:'800', color:'#0f172a' }}>{opp.title}</span>
                        <span style={{
                          fontSize:'10.5px', fontWeight:'700', padding:'2px 7px', borderRadius:'4px',
                          color: opp.status === 'URGENT' ? '#ef4444' : '#059669',
                          background: opp.status === 'URGENT' ? '#fef2f2' : '#f0fdf4',
                        }}>● {opp.status}</span>
                      </div>
                      <div style={{ display:'flex', gap:'10px', fontSize:'12px', color:'#64748b', fontWeight:'600', alignItems:'center' }}>
                        <span style={{ color: opp.accentColor, fontWeight:'700' }}>{opp.type}</span>
                        <span>·</span><span>{opp.role}</span>
                        <span style={{ display:'flex', alignItems:'center', gap:'3px' }}><MapPin size={11} />{opp.location}</span>
                      </div>
                    </div>
                    <ArrowRight size={15} color="#94a3b8" style={{ flexShrink:0 }} />
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div style={{ ...card, padding:'22px' }}>
              <SectionHeader icon={Clock} iconColor="#7c3aed" title="Recent Activity" />
              <div style={{ display:'flex', flexDirection:'column' }}>
                {RECENT_ACTIVITY.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.id}
                      style={{
                        display:'flex', alignItems:'center', gap:'12px',
                        padding:'10px 8px', borderRadius:'9px',
                        borderBottom: idx < RECENT_ACTIVITY.length - 1 ? '1px solid #f1f5f9' : 'none',
                        transition:'background 0.12s ease', cursor:'default',
                      }}
                      onMouseEnter={e => e.currentTarget.style.background='#f8fafc'}
                      onMouseLeave={e => e.currentTarget.style.background='transparent'}
                    >
                      <div style={{
                        width:'34px', height:'34px', borderRadius:'9px', flexShrink:0,
                        background:`${item.color}12`, display:'flex', alignItems:'center', justifyContent:'center',
                      }}>
                        <Icon size={15} color={item.color} />
                      </div>
                      <div style={{ flex:1, fontSize:'13px', color:'#475569', fontWeight:'600', minWidth:0 }}>
                        {item.label}{' '}
                        <span style={{ color:'#0f172a', fontWeight:'800' }}>{item.subject}</span>
                      </div>
                      <span style={{ fontSize:'11px', color:'#94a3b8', fontWeight:'600', flexShrink:0 }}>{item.time}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div style={{ display:'flex', flexDirection:'column', gap:'18px' }}>

            {/* Profile Card */}
            <div style={{ ...card, padding:'22px', textAlign:'center' }}>
              <div style={{
                width:'66px', height:'66px', borderRadius:'50%', margin:'0 auto 12px',
                background:'linear-gradient(135deg,#4f46e5,#7c3aed)',
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:'26px', fontWeight:'900', color:'#ffffff',
                boxShadow:'0 6px 20px rgba(79,70,229,0.28)',
              }}>
                {user?.name ? user.name.charAt(0).toUpperCase() : '?'}
              </div>

              <div style={{ fontSize:'17px', fontWeight:'800', color:'#0f172a', marginBottom:'3px' }}>{user?.name || 'Creative User'}</div>
              <div style={{ fontSize:'12px', color:'#64748b', marginBottom:'10px' }}>{user?.email}</div>
              <span style={{
                display:'inline-block', fontSize:'11.5px', fontWeight:'800',
                color: roleCfg.color, background: roleCfg.bg,
                padding:'3px 12px', borderRadius:'999px',
              }}>
                {roleCfg.emoji} {roleCfg.label}
              </span>

              {/* Progress bar */}
              <div style={{ margin:'18px 0 12px' }}>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'6px' }}>
                  <span style={{ fontSize:'11.5px', fontWeight:'700', color:'#475569' }}>Profile Completion</span>
                  <span style={{ fontSize:'11.5px', fontWeight:'900', color: pct >= 80 ? '#059669' : '#d97706' }}>{pct}%</span>
                </div>
                <div style={{ height:'7px', background:'#e2e8f0', borderRadius:'999px', overflow:'hidden' }}>
                  <div style={{
                    height:'100%', borderRadius:'999px', width:`${pct}%`,
                    background: pct >= 80 ? 'linear-gradient(90deg,#059669,#34d399)' : 'linear-gradient(90deg,#d97706,#fbbf24)',
                    transition:'width 0.5s ease',
                  }} />
                </div>
              </div>

              {/* Checklist */}
              <div style={{ display:'flex', flexDirection:'column', gap:'6px', textAlign:'left', marginBottom:'16px' }}>
                {checks.map((c, i) => (
                  <div key={i} style={{ display:'flex', alignItems:'center', gap:'8px', fontSize:'12px' }}>
                    <CheckCircle2 size={13} color={c.done ? '#059669' : '#cbd5e1'} />
                    <span style={{ color: c.done ? '#334155' : '#94a3b8', fontWeight: c.done ? '600' : '500' }}>{c.label}</span>
                  </div>
                ))}
              </div>

              <button onClick={onOpenProfile} className="btn btn-primary" style={{ width:'100%', justifyContent:'center', padding:'10px' }}>
                <User size={14} /><span>Edit My Profile</span>
              </button>
            </div>

            {/* Suggested Talent */}
            <div style={{ ...card, padding:'20px' }}>
              <SectionHeader icon={Award} iconColor="#d97706" title="Suggested Talent" actionLabel="All" onAction={() => onNavigate('talent')} />
              <div style={{ display:'flex', flexDirection:'column', gap:'4px' }}>
                {SUGGESTED_TALENT.map((t, i) => (
                  <div
                    key={i}
                    onClick={() => onNavigate('talent')}
                    style={{
                      display:'flex', alignItems:'center', gap:'11px',
                      padding:'9px 8px', borderRadius:'9px', cursor:'pointer',
                      transition:'background 0.12s ease',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background='#f8fafc'}
                    onMouseLeave={e => e.currentTarget.style.background='transparent'}
                  >
                    <div style={{
                      width:'38px', height:'38px', borderRadius:'50%', flexShrink:0,
                      background: t.avatarBg, color: t.avatarColor,
                      display:'flex', alignItems:'center', justifyContent:'center',
                      fontWeight:'800', fontSize:'15px',
                    }}>
                      {t.name.charAt(0)}
                    </div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontSize:'13px', fontWeight:'800', color:'#0f172a' }}>{t.name}</div>
                      <div style={{ fontSize:'11px', color:'#64748b', fontWeight:'600', display:'flex', alignItems:'center', gap:'3px' }}>
                        {t.role} · <MapPin size={10} /> {t.location}
                      </div>
                    </div>
                    <ArrowRight size={13} color="#cbd5e1" />
                  </div>
                ))}
              </div>
            </div>

            {/* Platform Today — intentionally dark accent card */}
            <div style={{
              background:'linear-gradient(135deg,#0f172a,#1e1b4b)',
              border:'none', borderRadius:'16px', padding:'20px',
              boxShadow:'0 4px 20px rgba(15,23,42,0.2)',
            }}>
              <div style={{ display:'flex', alignItems:'center', gap:'6px', marginBottom:'14px' }}>
                <BarChart2 size={15} color="#a5b4fc" />
                <span style={{ fontSize:'12px', fontWeight:'800', color:'#a5b4fc', textTransform:'uppercase', letterSpacing:'0.5px' }}>Platform Today</span>
              </div>
              {PLATFORM_STATS.map((s, i) => (
                <div key={i} style={{
                  display:'flex', justifyContent:'space-between', alignItems:'center',
                  padding:'9px 0',
                  borderBottom: i < PLATFORM_STATS.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                }}>
                  <span style={{ fontSize:'12.5px', color:'#94a3b8', fontWeight:'600' }}>{s.label}</span>
                  <span style={{ fontSize:'16px', fontWeight:'900', color: s.color }}>{s.value}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
