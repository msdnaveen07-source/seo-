import React, { useState } from 'react';
import { ShieldCheck, ExternalLink, Filter, Search, Globe } from 'lucide-react';

export function ReferringDomainsTab({ project }) {
  const [searchQuery, setSearchQuery] = useState('');
  if (!project) return null;

  const { backlinkData } = project;
  const { referringDomains } = backlinkData;

  const filtered = referringDomains.filter(rd => 
    rd.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rd.linkType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Search & Filter Header */}
      <div className="glass-panel" style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ position: 'relative', width: '320px' }}>
          <Search size={16} color="var(--text-subtle)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
          <input
            type="text"
            placeholder="Search referring domain..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field"
            style={{ paddingLeft: '36px' }}
          />
        </div>

        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Showing <strong>{filtered.length}</strong> of <strong>{referringDomains.length}</strong> Referring Domains
        </div>
      </div>

      {/* Table */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '12px' }}>Referring Domain</th>
                <th style={{ padding: '12px' }}>Domain Authority / DR</th>
                <th style={{ padding: '12px' }}>Est. Organic Traffic</th>
                <th style={{ padding: '12px' }}>Dofollow Links</th>
                <th style={{ padding: '12px' }}>Link Category</th>
                <th style={{ padding: '12px' }}>Relevance</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((rd, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                  <td style={{ padding: '12px', fontWeight: 600 }}>
                    <a href={`https://${rd.domain}`} target="_blank" rel="noreferrer" style={{ color: 'var(--primary)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      <Globe size={14} />
                      {rd.domain}
                      <ExternalLink size={12} />
                    </a>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <span className="badge badge-info" style={{ fontWeight: 700 }}>DR {rd.dr}</span>
                  </td>
                  <td style={{ padding: '12px', color: '#fff', fontWeight: 500 }}>{rd.organicTraffic}</td>
                  <td style={{ padding: '12px' }}>
                    <span className="badge badge-dofollow">{rd.dofollowCount} Dofollow</span>
                  </td>
                  <td style={{ padding: '12px', color: 'var(--text-muted)' }}>{rd.linkType}</td>
                  <td style={{ padding: '12px' }}>
                    <span className={`badge ${rd.relevance === 'High' ? 'badge-dofollow' : 'badge-info'}`}>
                      {rd.relevance}
                    </span>
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
