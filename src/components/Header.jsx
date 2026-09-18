import React from 'react';
import { Globe, Layers, PlusCircle, Settings, ShieldCheck, RefreshCw, Zap } from 'lucide-react';

export function Header({ projects, currentProject, onSelectProject, onOpenNewAudit, onOpenSettings }) {
  return (
    <header style={{
      background: 'rgba(14, 20, 36, 0.85)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border-color)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      padding: '12px 24px'
    }}>
      <div style={{
        maxWdith: '1400px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        {/* Brand Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 16px rgba(56, 189, 248, 0.4)'
          }}>
            <Zap size={22} color="#fff" />
          </div>
          <div>
            <h1 style={{ fontSize: '1.25rem', lineHeight: 1.2, margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              AuthorityPulse
              <span className="badge badge-info" style={{ fontSize: '0.65rem' }}>AI Agentic v2.5</span>
            </h1>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Universal AI Domain Authority Growth Platform
            </span>
          </div>
        </div>

        {/* Project Selector & Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          {/* Active Project Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.04)', padding: '4px 10px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <Globe size={16} color="var(--primary)" />
            <select
              value={currentProject ? currentProject.id : ''}
              onChange={(e) => onSelectProject(e.target.value)}
              style={{
                background: 'transparent',
                color: 'var(--text-main)',
                border: 'none',
                outline: 'none',
                fontFamily: 'var(--font-heading)',
                fontSize: '0.9rem',
                fontWeight: 600,
                cursor: 'pointer',
                maxWidth: '220px'
              }}
            >
              {projects.length === 0 && <option value="">No Websites Audited</option>}
              {projects.map(p => (
                <option key={p.id} value={p.id} style={{ background: '#0e1424', color: '#fff' }}>
                  {p.url} ({p.domain})
                </option>
              ))}
            </select>
          </div>

          {/* New Fresh Audit Button */}
          <button onClick={onOpenNewAudit} className="btn-primary">
            <PlusCircle size={16} />
            Start Fresh Audit
          </button>

          {/* API Settings Button */}
          <button onClick={onOpenSettings} className="btn-secondary" title="Configure API Keys">
            <Settings size={16} />
          </button>
        </div>
      </div>
    </header>
  );
}
