import React from 'react';
import { ShieldCheck, Calendar, Server, Zap, AlertTriangle, CheckCircle2, TrendingUp, Sparkles, FileText } from 'lucide-react';

export function OverviewTab({ project }) {
  if (!project) return null;

  const { crawlData, backlinkData, techSeo, actionPlan } = project;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Fresh Data Attribution Banner */}
      <div className="glass-panel" style={{
        padding: '16px 24px',
        borderLeft: '4px solid var(--primary)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <ShieldCheck size={24} color="var(--primary)" />
          <div>
            <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>Fresh Audit Data Attribution</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Source: <span style={{ color: '#fff' }}>{backlinkData.dataSourceAttribution.crawlSource}</span> | Freshness: <span style={{ color: 'var(--accent-emerald)' }}>{backlinkData.dataSourceAttribution.dataFreshness}</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          <div>
            <Calendar size={14} style={{ display: 'inline', marginRight: '4px' }} />
            Last Checked: <strong style={{ color: '#fff' }}>{new Date(project.updatedAt).toLocaleString()}</strong>
          </div>
          <span className="badge badge-attribution">No Cached / Fabricated Data</span>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
        
        {/* Domain Authority Score Card */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '8px' }}>
            <span>Estimated Domain Authority</span>
            <TrendingUp size={16} color="var(--primary)" />
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: 'var(--font-heading)', color: 'var(--primary)' }}>
            {backlinkData.metrics.estimatedDomainAuthority}
            <span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 400 }}> / 100</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', marginTop: '4px' }}>
            {backlinkData.metrics.drStatusLabel}
          </div>
        </div>

        {/* Technical SEO Health Score Card */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '8px' }}>
            <span>Technical SEO Score</span>
            <Zap size={16} color="var(--accent-emerald)" />
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: 'var(--font-heading)', color: techSeo.score > 70 ? 'var(--accent-emerald)' : 'var(--accent-amber)' }}>
            {techSeo.score}%
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', marginTop: '4px' }}>
            {techSeo.issues.length} issue(s) detected across crawl
          </div>
        </div>

        {/* Backlinks Count */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '8px' }}>
            <span>Discovered Backlinks</span>
            <Server size={16} color="var(--accent-purple)" />
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: 'var(--font-heading)', color: '#ffffff' }}>
            {backlinkData.metrics.totalBacklinksDiscovered.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', marginTop: '4px' }}>
            {backlinkData.metrics.dofollowPercentage}% Dofollow Ratio
          </div>
        </div>

        {/* Referring Domains */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '8px' }}>
            <span>Referring Domains</span>
            <ShieldCheck size={16} color="var(--accent-emerald)" />
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: 'var(--font-heading)', color: '#ffffff' }}>
            {backlinkData.metrics.referringDomainsCount}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', marginTop: '4px' }}>
            Across {backlinkData.competitors.length} competitor index matrices
          </div>
        </div>
      </div>

      {/* AI Strategy Summary & Technical Health Split Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        
        {/* Technical SEO Highlights */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertTriangle size={18} color="var(--accent-amber)" />
            Top Technical SEO Issues to Fix
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {techSeo.issues.slice(0, 4).map((issue, idx) => (
              <div key={idx} style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--border-color)',
                padding: '12px 16px',
                borderRadius: '8px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{issue.title}</span>
                  <span className={`badge ${issue.severity === 'CRITICAL' || issue.severity === 'HIGH' ? 'badge-warning' : 'badge-nofollow'}`}>
                    {issue.severity}
                  </span>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{issue.desc}</p>
              </div>
            ))}
            {techSeo.issues.length === 0 && (
              <div style={{ color: 'var(--accent-emerald)', fontSize: '0.9rem' }}>
                <CheckCircle2 size={18} style={{ display: 'inline', marginRight: '6px' }} />
                No critical technical issues found! Excellent codebase health.
              </div>
            )}
          </div>
        </div>

        {/* AI Executive Strategy Summary */}
        <div className="glass-panel" style={{ padding: '24px', background: 'linear-gradient(135deg, rgba(14,20,36,0.9) 0%, rgba(20,30,55,0.9) 100%)' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={18} color="var(--primary)" />
            AI Domain Authority Growth Roadmap
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ borderLeft: '3px solid var(--primary)', paddingLeft: '12px' }}>
              <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--primary)' }}>Phase 1 (Days 1–30)</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{actionPlan.phase30Days.focus}</div>
            </div>
            <div style={{ borderLeft: '3px solid var(--accent-emerald)', paddingLeft: '12px' }}>
              <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--accent-emerald)' }}>Phase 2 (Days 31–60)</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{actionPlan.phase60Days.focus}</div>
            </div>
            <div style={{ borderLeft: '3px solid var(--accent-purple)', paddingLeft: '12px' }}>
              <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--accent-purple)' }}>Phase 3 (Days 61–90)</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{actionPlan.phase90Days.focus}</div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
