import React, { useState } from 'react';
import { X, Search, Sparkles, Globe, MapPin, Tag, Target, Users } from 'lucide-react';

export function NewAuditModal({ isOpen, onClose, onSubmit, isLoading }) {
  const [url, setUrl] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [targetKeywords, setTargetKeywords] = useState('');
  const [targetCountry, setTargetCountry] = useState('United States');
  const [targetCity, setTargetCity] = useState('');
  const [industry, setIndustry] = useState('');
  const [competitorUrls, setCompetitorUrls] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url.trim()) return;

    const competitors = competitorUrls
      .split(',')
      .map(c => c.trim())
      .filter(Boolean);

    onSubmit({
      url: url.trim(),
      contactEmail: contactEmail.trim(),
      targetCountry,
      targetCity,
      industry,
      targetKeywords: targetKeywords.trim(),
      competitorUrls: competitors
    });
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(5, 8, 16, 0.8)',
      backdropFilter: 'blur(10px)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div className="glass-panel" style={{
        width: '100%',
        maxWidth: '640px',
        padding: '32px',
        border: '1px solid rgba(56, 189, 248, 0.3)',
        boxShadow: '0 20px 50px rgba(0,0,0,0.8)'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h2 style={{ fontSize: '1.4rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={20} color="var(--primary)" />
              Start Fresh Website Audit
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Executes a real-time live site crawl & backlink signal audit. No cached data used.
            </p>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Core Input 1: Website URL */}
          <div style={{ marginBottom: '16px' }}>
            <label className="input-label" style={{ color: '#fff', fontWeight: 600 }}>
              1. Website URL (Core Input) *
            </label>
            <div style={{ position: 'relative' }}>
              <Globe size={18} color="var(--primary)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
              <input
                type="text"
                required
                placeholder="e.g. fairepairs.com or stripe.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="input-field"
                style={{ paddingLeft: '40px', fontSize: '0.95rem', fontWeight: 500 }}
              />
            </div>
          </div>

          {/* Core Input 2: Target Keywords */}
          <div style={{ marginBottom: '16px' }}>
            <label className="input-label" style={{ color: '#fff', fontWeight: 600 }}>
              2. Target Keywords (Comma Separated) *
            </label>
            <div style={{ position: 'relative' }}>
              <Target size={18} color="var(--accent-emerald)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
              <input
                type="text"
                required
                placeholder="e.g. Auto Repair Irving, Brake Replacement, Auto Service"
                value={targetKeywords}
                onChange={(e) => setTargetKeywords(e.target.value)}
                className="input-field"
                style={{ paddingLeft: '40px', fontSize: '0.95rem', fontWeight: 500 }}
              />
            </div>
          </div>

          {/* Core Input 3: Sender Contact Email */}
          <div style={{ marginBottom: '20px' }}>
            <label className="input-label" style={{ color: '#fff', fontWeight: 600 }}>
              3. Outreach Sender Email Address *
            </label>
            <div style={{ position: 'relative' }}>
              <Tag size={18} color="var(--accent-purple)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
              <input
                type="email"
                required
                placeholder="e.g. contact@fairepairs.com or support@domain.com"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="input-field"
                style={{ paddingLeft: '40px', fontSize: '0.95rem', fontWeight: 500 }}
              />
            </div>
          </div>

          <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '12px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Optional Geographic & Industry Context
          </div>

          {/* Location & City Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label className="input-label">Target Country</label>
              <div style={{ position: 'relative' }}>
                <MapPin size={16} color="var(--text-subtle)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                <input
                  type="text"
                  placeholder="United States, UK, etc."
                  value={targetCountry}
                  onChange={(e) => setTargetCountry(e.target.value)}
                  className="input-field"
                  style={{ paddingLeft: '36px' }}
                />
              </div>
            </div>
            <div>
              <label className="input-label">Target City (Local SEO)</label>
              <input
                type="text"
                placeholder="e.g. New York, Austin"
                value={targetCity}
                onChange={(e) => setTargetCity(e.target.value)}
                className="input-field"
              />
            </div>
          </div>

          {/* Industry & Competitors Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
            <div>
              <label className="input-label">Industry Sector</label>
              <div style={{ position: 'relative' }}>
                <Tag size={16} color="var(--text-subtle)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                <input
                  type="text"
                  placeholder="Auto Repair, SaaS, E-commerce, Legal"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="input-field"
                  style={{ paddingLeft: '36px' }}
                />
              </div>
            </div>
            <div>
              <label className="input-label">Known Competitor URLs</label>
              <div style={{ position: 'relative' }}>
                <Users size={16} color="var(--text-subtle)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                <input
                  type="text"
                  placeholder="competitor1.com, competitor2.com"
                  value={competitorUrls}
                  onChange={(e) => setCompetitorUrls(e.target.value)}
                  className="input-field"
                  style={{ paddingLeft: '36px' }}
                />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
            <button type="button" onClick={onClose} className="btn-secondary" disabled={isLoading}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={isLoading || !url.trim()} style={{ minWidth: '180px' }}>
              {isLoading ? (
                <>Scanning Live Website...</>
              ) : (
                <>
                  <Search size={16} />
                  Start Fresh Audit
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
