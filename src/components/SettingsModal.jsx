import React, { useState, useEffect } from 'react';
import { X, Key, ShieldCheck, Check, Save } from 'lucide-react';
import { storageService } from '../services/storage';

export function SettingsModal({ isOpen, onClose }) {
  const [geminiKey, setGeminiKey] = useState('');
  const [dataForSeoKey, setDataForSeoKey] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const keys = storageService.getApiKeys();
      setGeminiKey(keys.geminiKey || '');
      setDataForSeoKey(keys.dataForSeoKey || '');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    storageService.saveApiKeys({
      geminiKey: geminiKey.trim(),
      dataForSeoKey: dataForSeoKey.trim()
    });
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1200);
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
        maxWidth: '540px',
        padding: '28px',
        border: '1px solid rgba(56, 189, 248, 0.3)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Key size={18} color="var(--primary)" />
            API Keys & Integrations Configuration
          </h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSave}>
          <div style={{ marginBottom: '16px' }}>
            <label className="input-label">Gemini / OpenAI API Key (Optional AI Enhancement)</label>
            <input
              type="password"
              placeholder="AI Key..."
              value={geminiKey}
              onChange={(e) => setGeminiKey(e.target.value)}
              className="input-field"
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label className="input-label">DataForSEO / Ahrefs API Key (Optional Raw Metric Sync)</label>
            <input
              type="password"
              placeholder="SEO Provider Key..."
              value={dataForSeoKey}
              onChange={(e) => setDataForSeoKey(e.target.value)}
              className="input-field"
            />
            <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', marginTop: '4px', display: 'block' }}>
              If left blank, AuthorityPulse automatically defaults to real-time live site crawling + web signal analysis without inventing fake data.
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
            <button type="button" onClick={onClose} className="btn-secondary">Cancel</button>
            <button type="submit" className="btn-primary">
              {saved ? <Check size={16} color="var(--accent-emerald)" /> : <Save size={16} />}
              {saved ? 'Saved!' : 'Save Settings'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
