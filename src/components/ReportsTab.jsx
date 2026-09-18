import React from 'react';
import { Download, FileText, Printer, ShieldCheck, Sparkles, CheckCircle } from 'lucide-react';

export function ReportsTab({ project }) {
  if (!project) return null;

  const { domain, crawlData, backlinkData, techSeo, actionPlan } = project;

  const handlePrintReport = () => {
    window.print();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Action Header */}
      <div className="glass-panel" style={{ padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h3 style={{ fontSize: '1.1rem', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText size={18} color="var(--primary)" />
            Client Executive SEO & Growth Audit Report
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Exportable white-label agency report formatted for client presentation and PDF download.
          </p>
        </div>

        <button onClick={handlePrintReport} className="btn-primary">
          <Printer size={16} />
          Print / Export PDF Report
        </button>
      </div>

      {/* Printable Report Document Container */}
      <div className="glass-panel" style={{ padding: '40px', background: '#0e1424', border: '1px solid var(--border-color-glow)' }}>
        
        {/* Report Header */}
        <div style={{ borderBottom: '2px solid var(--primary)', paddingBottom: '24px', marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 style={{ fontSize: '2rem', color: '#fff', marginBottom: '4px' }}>Domain Authority Growth Report</h1>
            <div style={{ fontSize: '1.1rem', color: 'var(--primary)', fontWeight: 600 }}>{domain}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Generated on {new Date(project.updatedAt).toLocaleDateString()} | AuthorityPulse AI Platform
            </div>
          </div>
          <div className="badge badge-attribution" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>
            White-Hat SEO Agency Report
          </div>
        </div>

        {/* Executive Summary */}
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '12px', borderBottom: '1px solid var(--border-color)', paddingBottom: '6px' }}>
            1. Executive Summary & Core Metrics
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginTop: '16px' }}>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Estimated Authority</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary)' }}>{backlinkData.metrics.estimatedDomainAuthority} / 100</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Technical Health Score</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>{techSeo.score}%</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Discovered Backlinks</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff' }}>{backlinkData.metrics.totalBacklinksDiscovered}</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Referring Domains</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff' }}>{backlinkData.metrics.referringDomainsCount}</div>
            </div>
          </div>
        </div>

        {/* Action Plan Section */}
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '6px' }}>
            2. Prioritized 30 / 60 / 90 Day Growth Roadmap
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '8px', borderLeft: '4px solid var(--primary)' }}>
              <div style={{ fontWeight: 700, color: 'var(--primary)', marginBottom: '4px' }}>{actionPlan.phase30Days.title}</div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{actionPlan.phase30Days.focus}</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '8px', borderLeft: '4px solid var(--accent-emerald)' }}>
              <div style={{ fontWeight: 700, color: 'var(--accent-emerald)', marginBottom: '4px' }}>{actionPlan.phase60Days.title}</div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{actionPlan.phase60Days.focus}</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '8px', borderLeft: '4px solid var(--accent-purple)' }}>
              <div style={{ fontWeight: 700, color: 'var(--accent-purple)', marginBottom: '4px' }}>{actionPlan.phase90Days.title}</div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{actionPlan.phase90Days.focus}</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
