import React from 'react';
import { Film, Shield, Globe, Award, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{
      background: '#ffffff',
      borderTop: '1px solid #cbd5e1',
      padding: '36px 32px 24px 32px',
      color: '#334155',
      fontSize: '13px',
      marginTop: 'auto'
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', gap: '32px', marginBottom: '32px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <div style={{
                width: '34px',
                height: '34px',
                borderRadius: '8px',
                background: 'var(--accent-gradient)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Film size={18} color="#ffffff" />
              </div>
              <span style={{ fontWeight: '800', fontSize: '18px', color: '#0f172a' }}>
                Flow<span style={{ color: '#4f46e5' }}>Studio</span>
              </span>
            </div>
            <p style={{ fontSize: '13px', color: '#475569', lineHeight: '1.6', maxWidth: '320px', fontWeight: '500' }}>
              The unified web-based collaboration & talent management platform for the global entertainment industry.
            </p>
          </div>

          <div>
            <div style={{ fontWeight: '800', color: '#0f172a', marginBottom: '12px', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Platform
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontWeight: '600' }}>
              <a href="#" style={{ color: '#334155', textDecoration: 'none' }}>Talent Directory</a>
              <a href="#" style={{ color: '#334155', textDecoration: 'none' }}>Opportunity Board</a>
              <a href="#" style={{ color: '#334155', textDecoration: 'none' }}>Screenplay Workspace</a>
              <a href="#" style={{ color: '#334155', textDecoration: 'none' }}>Multi-Media Portfolios</a>
            </div>
          </div>

          <div>
            <div style={{ fontWeight: '800', color: '#0f172a', marginBottom: '12px', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Talent Roles
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontWeight: '600' }}>
              <a href="#" style={{ color: '#334155', textDecoration: 'none' }}>Actors & Showreels</a>
              <a href="#" style={{ color: '#334155', textDecoration: 'none' }}>Musicians & Composers</a>
              <a href="#" style={{ color: '#334155', textDecoration: 'none' }}>Models & Editorial</a>
              <a href="#" style={{ color: '#334155', textDecoration: 'none' }}>Directors & Producers</a>
              <a href="#" style={{ color: '#334155', textDecoration: 'none' }}>Screenwriters</a>
            </div>
          </div>

          <div>
            <div style={{ fontWeight: '800', color: '#0f172a', marginBottom: '12px', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Resources
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontWeight: '600' }}>
              <a href="#" style={{ color: '#334155', textDecoration: 'none' }}>SRS Documentation</a>
              <a href="#" style={{ color: '#334155', textDecoration: 'none' }}>API Reference</a>
              <a href="#" style={{ color: '#334155', textDecoration: 'none' }}>Community Guidelines</a>
              <a href="#" style={{ color: '#334155', textDecoration: 'none' }}>Trust & Safety</a>
            </div>
          </div>

          <div>
            <div style={{ fontWeight: '800', color: '#0f172a', marginBottom: '12px', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Legal & Privacy
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontWeight: '600' }}>
              <a href="#" style={{ color: '#334155', textDecoration: 'none' }}>Terms of Service</a>
              <a href="#" style={{ color: '#334155', textDecoration: 'none' }}>Privacy Policy</a>
              <a href="#" style={{ color: '#334155', textDecoration: 'none' }}>Copyright Protection</a>
              <a href="#" style={{ color: '#334155', textDecoration: 'none' }}>Security Specs</a>
            </div>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid #cbd5e1',
          paddingTop: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          fontSize: '12.5px',
          color: '#475569',
          fontWeight: '600'
        }}>
          <div>
            © 2026 FlowStudio Inc. Unified Entertainment Industry Platform. All rights reserved.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Shield size={14} color="#059669" /> SSL Encrypted</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Globe size={14} color="#334155" /> English (US)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
