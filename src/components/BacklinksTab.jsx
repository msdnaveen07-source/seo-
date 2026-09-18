import React, { useState } from 'react';
import { ExternalLink, Filter, ShieldCheck, Tag, Anchor } from 'lucide-react';

export function BacklinksTab({ project }) {
  const [filterType, setFilterType] = useState('ALL');
  if (!project) return null;

  const { backlinkData } = project;
  const { anchors, metrics } = backlinkData;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Overview Stats Bar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        <div className="glass-panel" style={{ padding: '16px 20px' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Discovered Backlinks</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#fff' }}>
            {metrics.totalBacklinksDiscovered.toLocaleString()}
          </div>
        </div>
        <div className="glass-panel" style={{ padding: '16px 20px' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Dofollow Links</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--accent-emerald)' }}>
            {metrics.dofollowPercentage}%
          </div>
        </div>
        <div className="glass-panel" style={{ padding: '16px 20px' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Nofollow Links</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--accent-amber)' }}>
            {metrics.nofollowPercentage}%
          </div>
        </div>
        <div className="glass-panel" style={{ padding: '16px 20px' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Internal Outbound Links</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--primary)' }}>
            {metrics.internalLinksCount}
          </div>
        </div>
      </div>

      {/* Anchor Text Distribution Table & Chart */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Anchor size={18} color="var(--primary)" />
            Anchor Text Distribution Profile
          </h3>
          <span className="badge badge-info">Normalized Anchor Ratios</span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '12px' }}>Anchor Text String</th>
                <th style={{ padding: '12px' }}>Category Type</th>
                <th style={{ padding: '12px' }}>Frequency</th>
                <th style={{ padding: '12px' }}>Proportion %</th>
                <th style={{ padding: '12px' }}>Visual Bar</th>
              </tr>
            </thead>
            <tbody>
              {anchors.map((anc, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                  <td style={{ padding: '12px', fontWeight: 600, color: '#fff' }}>"{anc.anchorText}"</td>
                  <td style={{ padding: '12px' }}>
                    <span className="badge badge-attribution">{anc.type}</span>
                  </td>
                  <td style={{ padding: '12px', color: 'var(--text-muted)' }}>{anc.count}</td>
                  <td style={{ padding: '12px', fontWeight: 600, color: 'var(--primary)' }}>{anc.percentage}%</td>
                  <td style={{ padding: '12px', width: '220px' }}>
                    <div style={{ background: 'rgba(255,255,255,0.05)', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: `${anc.percentage}%`, background: 'var(--primary)', height: '100%' }} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
