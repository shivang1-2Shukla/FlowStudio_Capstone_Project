import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { X, Plus, Folder, Trash2, Clock, FileCode } from 'lucide-react';

export default function ProjectDrawer({
  isOpen,
  onClose,
  onSelectProject,
  onNewProject,
  currentProjectId
}) {
  const { user, token } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && user) {
      fetchUserProjects();
    }
  }, [isOpen, user]);

  const fetchUserProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/projects/user/${user.id}`, {
        headers: { Authorization: token ? `Bearer ${token}` : '' }
      });
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch (err) {
      console.error('Failed to fetch projects:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (e, projectId) => {
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      const res = await fetch(`/api/projects/${projectId}`, {
        method: 'DELETE',
        headers: { Authorization: token ? `Bearer ${token}` : '' }
      });
      if (res.ok) {
        setProjects(prev => prev.filter(p => p.id !== projectId));
      }
    } catch (err) {
      alert('Failed to delete project');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" style={{ justifyContent: 'flex-start' }} onClick={onClose}>
      <div
        className="glass-panel"
        style={{
          width: '360px',
          height: '100vh',
          background: 'var(--bg-secondary)',
          borderRight: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '10px 0 30px rgba(0,0,0,0.5)',
          animation: 'slideUp 0.2s ease-out'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Folder size={18} color="var(--accent-primary)" />
            <h3 style={{ fontSize: '16px', fontWeight: '700' }}>My Workspace Projects</h3>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
            <X size={18} />
          </button>
        </div>

        {/* Action Button */}
        <div style={{ padding: '12px 16px' }}>
          <button
            onClick={() => { onNewProject(); onClose(); }}
            className="btn btn-primary"
            style={{ width: '100%' }}
          >
            <Plus size={16} />
            <span>Create New Sandbox</span>
          </button>
        </div>

        {/* Project List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 12px 16px 12px' }}>
          {!user ? (
            <div style={{ padding: '30px 16px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>
              Sign in to save and manage your project workspace.
            </div>
          ) : loading ? (
            <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>Loading projects...</div>
          ) : projects.length === 0 ? (
            <div style={{ padding: '30px 16px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>
              No projects saved yet. Create your first project!
            </div>
          ) : (
            projects.map(proj => (
              <div
                key={proj.id}
                onClick={() => { onSelectProject(proj); onClose(); }}
                className="glass-card"
                style={{
                  padding: '12px 14px',
                  marginBottom: '8px',
                  cursor: 'pointer',
                  borderColor: currentProjectId === proj.id ? 'var(--accent-primary)' : 'var(--border-color)',
                  background: currentProjectId === proj.id ? 'rgba(99, 102, 241, 0.15)' : 'var(--bg-tertiary)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FileCode size={16} color="var(--accent-primary)" />
                    <span style={{ fontWeight: '600', fontSize: '14px' }}>{proj.title}</span>
                  </div>
                  <button
                    onClick={(e) => handleDelete(e, proj.id)}
                    style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                    title="Delete project"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--text-muted)', marginTop: '8px' }}>
                  <Clock size={12} />
                  <span>Updated {new Date(proj.updatedAt || proj.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
