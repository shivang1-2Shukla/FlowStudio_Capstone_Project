import React from 'react';
import { X, Bell, CheckCircle, MessageSquare, Award, Star } from 'lucide-react';

export default function NotificationsModal({ isOpen, onClose }) {
  const notifications = [
    { id: 1, type: 'SHORTLIST', title: 'You were Shortlisted!', desc: 'Elena Rostova shortlisted your showreel for "The Silent Frequency".', time: '10m ago', icon: Award, color: '#d97706' },
    { id: 2, type: 'MESSAGE', title: 'New Direct Message', desc: 'Aria Sterling sent you a audio feedback message.', time: '1h ago', icon: MessageSquare, color: '#4f46e5' },
    { id: 3, type: 'VERIFICATION', title: 'Profile Badge Verified', desc: 'Your Actor Showreel portfolio has been verified by FlowStudio system.', time: '1d ago', icon: CheckCircle, color: '#10b981' }
  ];

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '440px' }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Bell size={20} color="var(--accent-primary)" />
            <h3 style={{ fontSize: '16px', fontWeight: '800' }}>Industry Notifications</h3>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={18} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '360px', overflowY: 'auto' }}>
          {notifications.map(item => {
            const IconComp = item.icon;
            return (
              <div key={item.id} style={{
                background: 'var(--bg-tertiary)',
                padding: '12px 14px',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                display: 'flex',
                gap: '12px'
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: item.color + '15',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <IconComp size={16} color={item.color} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                    <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)' }}>{item.title}</div>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{item.time}</span>
                  </div>
                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
