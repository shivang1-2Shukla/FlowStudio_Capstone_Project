import React, { useState } from 'react';
import { Save, Play, FileText, Download, Sparkles, Layout, Code, Eye } from 'lucide-react';

const INITIAL_SCREENPLAY_SAMPLE = `SCENE 1 - EXT. ARCTIC WEATHER STATION - NIGHT

Heavy snowfall sweeps across the rusted antenna towers. The wind HOWLS violently.

ELENA (30s), wearing a weather-beaten thermal parka, inspects a flashing signal monitor inside the frozen glass outpost.

ELENA
(into comms headset)
Station Alpha to Base Command. We have an unflagged frequency coming through...

Static crackles. A distorted voice responds through the radio receiver.

VOICE (O.S.)
(filtered)
Elena... Do not log off. The sequence begins tomorrow at dawn.`;

export default function CreativeStudio({ onSaveScript, currentTitle }) {
  const [scriptContent, setScriptContent] = useState(INITIAL_SCREENPLAY_SAMPLE);
  const [activeTab, setActiveTab] = useState('editor'); // 'editor' | 'preview' | 'breakdown'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--bg-primary)' }}>
      {/* Workspace Toolbar */}
      <div style={{
        height: '52px',
        padding: '0 20px',
        background: '#ffffff',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '800', fontSize: '15px', color: 'var(--text-primary)' }}>
            <FileText size={18} color="var(--accent-primary)" />
            <span>{currentTitle || 'Screenplay & Treatment Editor'}</span>
          </div>

          <div style={{ height: '18px', width: '1px', background: 'var(--border-color)' }} />

          {/* Editor Mode Tabs */}
          <div style={{ display: 'flex', gap: '4px' }}>
            <button
              onClick={() => setActiveTab('editor')}
              style={{
                background: activeTab === 'editor' ? 'rgba(79, 70, 229, 0.08)' : 'transparent',
                border: 'none',
                color: activeTab === 'editor' ? 'var(--accent-primary)' : 'var(--text-secondary)',
                padding: '5px 12px',
                borderRadius: '6px',
                fontSize: '12.5px',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              Industry Formatting Editor
            </button>

            <button
              onClick={() => setActiveTab('breakdown')}
              style={{
                background: activeTab === 'breakdown' ? 'rgba(79, 70, 229, 0.08)' : 'transparent',
                border: 'none',
                color: activeTab === 'breakdown' ? 'var(--accent-primary)' : 'var(--text-secondary)',
                padding: '5px 12px',
                borderRadius: '6px',
                fontSize: '12.5px',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              Scene Breakdown & Shot List
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={() => {
              onSaveScript(scriptContent);
              alert('Screenplay draft converted to casting call & published to Opportunity Board!');
            }}
            className="btn btn-gold"
            style={{ padding: '7px 16px', fontSize: '13px', borderRadius: 'var(--radius-md)' }}
          >
            <Sparkles size={14} />
            <span>Publish as Opportunity</span>
          </button>

          <button
            onClick={() => onSaveScript(scriptContent)}
            className="btn btn-primary"
            style={{ padding: '7px 16px', fontSize: '13px', borderRadius: 'var(--radius-md)' }}
          >
            <Save size={14} />
            <span>Save Cloud Script Draft</span>
          </button>
        </div>
      </div>

      {/* Editor & Preview Content Area */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: activeTab === 'breakdown' ? '1fr' : '1fr 1fr', gap: '1px', background: 'var(--border-color)' }}>
        {activeTab !== 'breakdown' && (
          /* Screenplay Text Editor */
          <div style={{ background: '#ffffff', padding: '24px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: '12px', fontWeight: '800', color: '#0f172a', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Standard Script Input (Courier Prime Format)
            </div>
            <textarea
              value={scriptContent}
              onChange={(e) => setScriptContent(e.target.value)}
              style={{
                flex: 1,
                width: '100%',
                background: '#fafafa',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                padding: '20px',
                fontFamily: "'Courier Prime', monospace",
                fontSize: '14px',
                lineHeight: '1.6',
                color: '#1e293b',
                resize: 'none',
                outline: 'none'
              }}
            />
          </div>
        )}

        {/* Studio Formatted Screenplay Page Preview */}
        {activeTab !== 'breakdown' && (
          <div style={{ background: '#f1f5f9', padding: '28px', overflowY: 'auto', display: 'flex', justifyContent: 'center' }}>
            <div style={{
              width: '100%',
              maxWidth: '620px',
              minHeight: '720px',
              background: '#ffffff',
              boxShadow: 'var(--shadow-md)',
              borderRadius: '4px',
              padding: '48px 56px',
              fontFamily: "'Courier Prime', monospace",
              fontSize: '13px',
              lineHeight: '1.6',
              color: '#0f172a',
              whiteSpace: 'pre-wrap'
            }}>
              <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '15px', marginBottom: '24px', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '2px solid #0f172a', paddingBottom: '8px' }}>
                {currentTitle || 'THE SILENT FREQUENCY'}
              </div>
              {scriptContent}
            </div>
          </div>
        )}

        {/* Scene Breakdown Table Mode */}
        {activeTab === 'breakdown' && (
          <div style={{ background: '#ffffff', padding: '32px', overflowY: 'auto' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '16px', color: 'var(--text-primary)' }}>
              Scene Breakdown & Production Shot List
            </h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13.5px' }}>
              <thead>
                <tr style={{ background: 'var(--bg-tertiary)', borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>
                  <th style={{ padding: '12px' }}>Scene #</th>
                  <th style={{ padding: '12px' }}>Heading / Location</th>
                  <th style={{ padding: '12px' }}>Time</th>
                  <th style={{ padding: '12px' }}>Cast Needed</th>
                  <th style={{ padding: '12px' }}>Camera Setup</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '12px', fontWeight: '700' }}>1</td>
                  <td style={{ padding: '12px' }}>EXT. ARCTIC WEATHER STATION</td>
                  <td style={{ padding: '12px', color: 'var(--accent-gold)', fontWeight: '600' }}>NIGHT</td>
                  <td style={{ padding: '12px' }}>Elena (Lead)</td>
                  <td style={{ padding: '12px' }}>Wide Tracking Shot (ARRI 35mm)</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '12px', fontWeight: '700' }}>2</td>
                  <td style={{ padding: '12px' }}>INT. RADIO CONTROL OUTPOST</td>
                  <td style={{ padding: '12px', color: 'var(--accent-gold)', fontWeight: '600' }}>NIGHT</td>
                  <td style={{ padding: '12px' }}>Elena, Radio Voice</td>
                  <td style={{ padding: '12px' }}>Close-Up Monitor & Key Light</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
