import React from 'react';
import { Sparkles, FileText, Zap, Wrench, Layers, TrendingUp } from 'lucide-react';
import { generateContentOpportunities } from '../services/aiStrategyAgent';

export function ContentOpportunitiesTab({ project }) {
  if (!project) return null;

  const { domain, industry, targetKeywords } = project;
  const contentOpportunities = generateContentOpportunities(domain, industry, targetKeywords);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header Banner */}
      <div className="glass-panel" style={{ padding: '24px', background: 'linear-gradient(135deg, rgba(14,20,36,0.9) 0%, rgba(26,38,66,0.9) 100%)' }}>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={20} color="var(--primary)" />
          AI Link-Bait & Skyscraper Content Strategy Generator
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          High-performing assets tailored for <strong>{domain}</strong> to naturally attract high-authority editorial links, data citations, and organic referral traffic.
        </p>
      </div>

      {/* Grid of Content Opportunities */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
        {contentOpportunities.map((content) => (
          <div key={content.id} className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span className="badge badge-info">{content.category}</span>
                <span className="badge badge-dofollow">{content.priority} PRIORITY</span>
              </div>

              <h4 style={{ fontSize: '1.15rem', color: '#fff', marginBottom: '12px', lineHeight: 1.3 }}>
                {content.title}
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem', marginBottom: '16px' }}>
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                  <strong style={{ color: 'var(--text-muted)' }}>Target Audience:</strong>
                  <div style={{ color: '#fff', marginTop: '2px' }}>{content.targetAudience}</div>
                </div>

                <div style={{ background: 'rgba(56, 189, 248, 0.05)', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
                  <strong style={{ color: 'var(--primary)' }}>Link-Bait Hook:</strong>
                  <div style={{ color: 'var(--text-main)', marginTop: '2px' }}>{content.linkBaitHook}</div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                  <span>Suggested Format:</span>
                  <span style={{ color: '#fff', fontWeight: 600 }}>{content.suggestedFormat}</span>
                </div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--accent-emerald)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <TrendingUp size={14} />
                {content.estimatedBacklinkPotential}
              </span>
              <span className="badge badge-attribution">{content.status}</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
