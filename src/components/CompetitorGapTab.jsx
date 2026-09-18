import React from 'react';
import { Target, Users, ExternalLink, Zap, ArrowRight, CheckCircle2, ShieldAlert } from 'lucide-react';

export function CompetitorGapTab({ project }) {
  if (!project) return null;

  const { backlinkData, domain } = project;
  const { competitors, competitorGap } = backlinkData;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Competitor Overview Bar */}
      <div className="glass-panel" style={{ padding: '20px 24px' }}>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
          Identified Competitor Domains Matrix
        </div>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {competitors.map((comp, idx) => (
            <div key={idx} style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid var(--border-color)',
              padding: '8px 14px',
              borderRadius: '8px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontWeight: 600,
              fontSize: '0.9rem',
              color: '#fff'
            }}>
              <Users size={14} color="var(--accent-purple)" />
              {comp}
            </div>
          ))}
        </div>
      </div>

      {/* Competitor Backlink Gap Matrix */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Target size={18} color="var(--accent-rose)" />
            Competitor Backlink Gap Matrix
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            High-authority domains that currently link to your competitors but DO NOT link to <strong>{domain}</strong> yet.
          </p>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '12px' }}>Gap Referring Domain</th>
                <th style={{ padding: '12px' }}>Authority / DR</th>
                <th style={{ padding: '12px' }}>Est. Monthly Traffic</th>
                <th style={{ padding: '12px' }}>Linked Competitor(s)</th>
                <th style={{ padding: '12px' }}>Target Link Status</th>
                <th style={{ padding: '12px' }}>Opportunity Score</th>
                <th style={{ padding: '12px' }}>Recommended Strategy</th>
              </tr>
            </thead>
            <tbody>
              {competitorGap.map((gap, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                  <td style={{ padding: '12px', fontWeight: 600, color: '#fff' }}>
                    {gap.referringDomain}
                  </td>
                  <td style={{ padding: '12px' }}>
                    <span className="badge badge-info">DR {gap.dr}</span>
                  </td>
                  <td style={{ padding: '12px', color: 'var(--text-muted)' }}>{gap.organicTraffic}</td>
                  <td style={{ padding: '12px' }}>
                    {gap.linksToCompetitors.map((c, cIdx) => (
                      <span key={cIdx} className="badge badge-attribution" style={{ marginRight: '4px' }}>
                        {c.competitor}
                      </span>
                    ))}
                  </td>
                  <td style={{ padding: '12px' }}>
                    <span className="badge badge-warning" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <ShieldAlert size={12} />
                      Missing Link
                    </span>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <span style={{ fontWeight: 800, color: 'var(--accent-emerald)', fontSize: '1rem' }}>
                      {gap.opportunityScore}%
                    </span>
                  </td>
                  <td style={{ padding: '12px', fontWeight: 500, color: 'var(--primary)' }}>
                    {gap.action}
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
