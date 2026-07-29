import React, { useState } from 'react';
import { X, Send, MessageSquare } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function MessagingDrawer({ isOpen, onClose, targetUser }) {
  const { user } = useAuth();
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Elena Rostova', content: 'Hi! Loved your portfolio showreel for sci-fi DP work.', time: '10:14 AM' },
    { id: 2, sender: 'You', content: 'Thank you! Would love to collaborate on your upcoming project.', time: '10:16 AM' }
  ]);
  const [inputText, setInputText] = useState('');

  if (!isOpen) return null;

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    setMessages(prev => [
      ...prev,
      {
        id: Date.now(),
        sender: 'You',
        content: inputText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setInputText('');
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: 0,
      width: '400px',
      height: '100vh',
      background: '#ffffff',
      borderLeft: '1px solid var(--border-color)',
      boxShadow: '-10px 0 30px rgba(0,0,0,0.1)',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Drawer Header */}
      <div style={{
        padding: '18px 20px',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'var(--bg-tertiary)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <MessageSquare size={18} color="var(--accent-primary)" />
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text-primary)' }}>
              {targetUser ? targetUser.name : 'Industry Messages'}
            </h3>
            <span style={{ fontSize: '11px', color: 'var(--success)', fontWeight: '600' }}>● Active Now</span>
          </div>
        </div>
        <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
          <X size={18} />
        </button>
      </div>

      {/* Messages Feed */}
      <div style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '14px', background: 'var(--bg-primary)' }}>
        {messages.map(msg => {
          const isMe = msg.sender === 'You';
          return (
            <div key={msg.id} style={{
              alignSelf: isMe ? 'flex-end' : 'flex-start',
              maxWidth: '82%'
            }}>
              <div style={{
                background: isMe ? 'var(--accent-primary)' : '#ffffff',
                color: isMe ? '#ffffff' : 'var(--text-primary)',
                border: isMe ? 'none' : '1px solid var(--border-color)',
                padding: '10px 14px',
                borderRadius: isMe ? '14px 14px 0 14px' : '14px 14px 14px 0',
                fontSize: '13.5px',
                lineHeight: '1.4',
                boxShadow: 'var(--shadow-sm)'
              }}>
                {msg.content}
              </div>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px', textAlign: isMe ? 'right' : 'left', fontWeight: '500' }}>
                {msg.sender} • {msg.time}
              </div>
            </div>
          );
        })}
      </div>

      {/* Message Input */}
      <form onSubmit={handleSend} style={{ padding: '16px', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '10px', background: '#ffffff' }}>
        <input
          type="text"
          placeholder="Type a message..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="form-input"
          style={{ flex: 1 }}
        />
        <button type="submit" className="btn btn-primary" style={{ padding: '0 16px', borderRadius: 'var(--radius-md)' }}>
          <Send size={15} />
        </button>
      </form>
    </div>
  );
}
