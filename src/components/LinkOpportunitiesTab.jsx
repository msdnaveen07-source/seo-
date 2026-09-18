import React, { useState } from 'react';
import { Target, ExternalLink, Mail, CheckCircle, Filter, ArrowUpRight } from 'lucide-react';

export function LinkOpportunitiesTab({ project, onSelectOutreach }) {
  const [filterPriority, setFilterPriority] = useState('ALL');
  const [selectedOpp, setSelectedOpp] = useState(null);

  if (!project) return null;

  const { backlinkData } = project;
  const { linkOpportunities } = backlinkData;

  const filtered = linkOpportunities.filter(opp => {
    if (filterPriority === 'ALL') return true;
    return opp.priority === filterPriority;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header Filter Controls */}
      <div className="glass-panel" style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h3 style={{ fontSize: '1.1rem', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Target size={18} color="var(--primary)" />
            High-Authority Link Acquisition Opportunities
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            15+ structured metrics collected per opportunity. Legitimate white-hat outreach ready.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Filter size={16} color="var(--text-subtle)" />
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="input-field"
            style={{ width: '160px', padding: '6px 12px' }}
          >
            <option value="ALL">All Priorities</option>
            <option value="HIGH">High Priority</option>
            <option value="MEDIUM">Medium Priority</option>
          </select>
        </div>
      </div>

      {/* Grid of Opportunity Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
        {filtered.map((opp) => (
          <div key={opp.id} className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              {/* Header Badge */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span className="badge badge-info" style={{ fontWeight: 700 }}>
                  DR {opp.dr} | Traffic {opp.organicTraffic}
                </span>
                <span className={`badge ${opp.priority === 'HIGH' ? 'badge-dofollow' : 'badge-attribution'}`}>
                  {opp.priority} PRIORITY
                </span>
              </div>

              {/* Referring Domain Title */}
              <h4 style={{ fontSize: '1.1rem', marginBottom: '6px', color: '#fff' }}>
                {opp.referringDomain}
              </h4>
              <div style={{ fontSize: '0.8rem', color: 'var(--primary)', marginBottom: '12px', wordBreak: 'break-all' }}>
                <a href={opp.sourceUrl} target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  {opp.sourceUrl}
                  <ExternalLink size={12} />
                </a>
              </div>

              {/* Attributes List */}
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8rem', marginBottom: '16px' }}>
                <div><strong style={{ color: 'var(--text-muted)' }}>Opportunity Type:</strong> <span style={{ color: '#fff' }}>{opp.opportunityType}</span></div>
                <div><strong style={{ color: 'var(--text-muted)' }}>Link Type:</strong> <span style={{ color: '#fff' }}>{opp.linkType}</span> ({opp.dofollow ? 'Dofollow' : 'Nofollow'})</div>
                <div><strong style={{ color: 'var(--text-muted)' }}>Suggested Anchor:</strong> <span style={{ color: 'var(--accent-emerald)', fontWeight: 600 }}>"{opp.suggestedAnchor}"</span></div>
                <div><strong style={{ color: 'var(--text-muted)' }}>Content Angle:</strong> <span style={{ color: 'var(--text-main)' }}>{opp.suggestedContentAngle}</span></div>
                {opp.outreachEmail && (
                  <div><strong style={{ color: 'var(--text-muted)' }}>Outreach Contact:</strong> <span style={{ color: 'var(--accent-purple)' }}>{opp.outreachEmail}</span></div>
                )}
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={() => onSelectOutreach(opp)}
              className="btn-emerald"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <Mail size={16} />
              Draft Personalized Outreach
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}
