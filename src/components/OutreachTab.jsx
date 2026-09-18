import React, { useState } from 'react';
import { Mail, Send, Copy, Check, ShieldAlert, Sparkles, MessageSquare } from 'lucide-react';
import { generatePersonalizedOutreachEmail } from '../services/aiStrategyAgent';

export function OutreachTab({ project, selectedOpportunity }) {
  const [angleType, setAngleType] = useState('resource');
  const [copied, setCopied] = useState(false);
  const [userApproved, setUserApproved] = useState(false);
  const [emailStatus, setEmailStatus] = useState('DRAFT');

  if (!project) return null;

  const { domain, targetKeywords, industry, backlinkData } = project;
  const opp = selectedOpportunity || backlinkData.linkOpportunities[0];

  if (!opp) return <div style={{ color: 'var(--text-muted)' }}>No opportunity selected for outreach.</div>;

  const emailData = generatePersonalizedOutreachEmail(opp, domain, angleType, targetKeywords, industry);

  const handleCopy = () => {
    navigator.clipboard.writeText(`Subject: ${emailData.subject}\n\n${emailData.body}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendOrSave = () => {
    if (!userApproved) return;
    setEmailStatus('APPROVED_AND_QUEUED');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Strict Anti-Spam Safety Banner */}
      <div className="glass-panel" style={{
        padding: '16px 24px',
        borderLeft: '4px solid var(--accent-amber)',
        background: 'rgba(245, 158, 11, 0.05)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <ShieldAlert size={22} color="var(--accent-amber)" />
          <div>
            <div style={{ fontWeight: 600, fontSize: '0.95rem', color: '#fff' }}>Human-in-the-Loop Outreach Approval Required</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              AuthorityPulse never sends automated mass emails or creates comment spam. All messages require explicit user approval.
            </div>
          </div>
        </div>
        <span className="badge badge-warning">Zero Automated Spam Guarantee</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        
        {/* Left Column: Target & Angle Selection */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 style={{ fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MessageSquare size={18} color="var(--primary)" />
            Outreach Target Context
          </h3>

          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '10px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
            <div><strong style={{ color: 'var(--text-muted)' }}>Target Domain:</strong> <span style={{ color: '#fff', fontWeight: 600 }}>{opp.referringDomain}</span></div>
            <div><strong style={{ color: 'var(--text-muted)' }}>Target Article:</strong> <span style={{ color: 'var(--primary)', wordBreak: 'break-all' }}>{opp.sourceUrl}</span></div>
            <div><strong style={{ color: 'var(--text-muted)' }}>Contact Email:</strong> <span style={{ color: 'var(--accent-purple)' }}>{opp.outreachEmail || 'editor@domain.com'}</span></div>
            <div><strong style={{ color: 'var(--text-muted)' }}>Opportunity Type:</strong> <span className="badge badge-info">{opp.opportunityType}</span></div>
          </div>

          <div>
            <label className="input-label" style={{ fontWeight: 600, color: '#fff', marginBottom: '8px' }}>Select Pitch Angle / Hook</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button
                type="button"
                className={`tab-btn ${angleType === 'resource' ? 'active' : ''}`}
                onClick={() => setAngleType('resource')}
                style={{ width: '100%', justifyContent: 'flex-start' }}
              >
                1. Skyscraper / Value Resource Pitch (Recommended)
              </button>
              <button
                type="button"
                className={`tab-btn ${angleType === 'broken' ? 'active' : ''}`}
                onClick={() => setAngleType('broken')}
                style={{ width: '100%', justifyContent: 'flex-start' }}
              >
                2. Outdated / Broken Link Citation Swap
              </button>
              <button
                type="button"
                className={`tab-btn ${angleType === 'unlinked' ? 'active' : ''}`}
                onClick={() => setAngleType('unlinked')}
                style={{ width: '100%', justifyContent: 'flex-start' }}
              >
                3. Unlinked Brand Mention Claim
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: AI Email Composer & Approval Controls */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.1rem', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={18} color="var(--primary)" />
                Personalized Email Draft
              </h3>
              <button onClick={handleCopy} className="btn-secondary btn-sm">
                {copied ? <Check size={14} color="var(--accent-emerald)" /> : <Copy size={14} />}
                {copied ? 'Copied!' : 'Copy Email'}
              </button>
            </div>

            {/* Email Subject Box */}
            <div style={{ marginBottom: '16px' }}>
              <label className="input-label">Subject Line</label>
              <input type="text" readOnly value={emailData.subject} className="input-field" style={{ fontWeight: 600, color: 'var(--primary)' }} />
            </div>

            {/* Email Body Textarea */}
            <div>
              <label className="input-label">Email Content</label>
              <textarea
                rows={10}
                readOnly
                value={emailData.body}
                className="input-field"
                style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', lineHeight: 1.6 }}
              />
            </div>
          </div>

          {/* Approval Checkbox & Export Action */}
          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px', marginTop: '16px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', cursor: 'pointer', marginBottom: '16px', color: '#fff' }}>
              <input
                type="checkbox"
                checked={userApproved}
                onChange={(e) => setUserApproved(e.target.checked)}
                style={{ width: '18px', height: '18px', accentColor: 'var(--accent-emerald)' }}
              />
              <span>I review and approve this outreach message for compliance.</span>
            </label>

            <button
              onClick={handleSendOrSave}
              disabled={!userApproved}
              className="btn-emerald"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <Send size={16} />
              {emailStatus === 'APPROVED_AND_QUEUED' ? 'Approved & Prepared for Sending!' : 'Approve & Prepare Outreach'}
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
