'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { Mod } from '@/data/mods';

export default function AddonDetailClient({ mod }: { mod: Mod }) {
  const [activeTab, setActiveTab] = useState<'description' | 'files'>('description');
  const filePath = `/files/${mod.fileName}`;

  // Membuat link WhatsApp otomatis dengan pesan pre-filled
  const waMessage = encodeURIComponent(`Halo min, saya mau beli addon: ${mod.title} seharga ${mod.price}`);
  const waLink = `https://wa.me/6287815448792?text=${waMessage}`;

  return (
    <div className="container" style={{ display: 'block' }}>
      {/* Breadcrumbs */}
      <nav className="breadcrumbs">
        <Link href="/">Home</Link> <span>/</span> 
        <span style={{ color: '#fff' }}>{mod.title}</span>
      </nav>

      {/* Project Header */}
      <div className="project-header">
        <div className="project-header-img">
           {mod.image ? (
              <img src={`/images/${mod.image}`} alt={mod.title} onError={(e) => ((e.target as HTMLElement).style.display = 'none')} />
           ) : (
              <div style={{ width: '100%', height: '100%', background: 'linear-gradient(45deg, #2563eb, #1e40af)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'32px', fontWeight:'bold', color:'white' }}>
                  {mod.title.charAt(0)}
              </div>
           )}
        </div>
        <div className="project-header-info">
          <h1>
            {mod.title} 
            {/* Badge Premium di Header */}
            {mod.isPremium && <span style={{fontSize: '14px', background: '#eab308', color: '#000', padding: '2px 8px', borderRadius: '4px', marginLeft: '10px', verticalAlign: 'middle'}}>PREMIUM</span>}
          </h1>
          <div className="card-author">By <span>{mod.author}</span></div>
          <div className="categories-tags">
            {mod.tags.map((tag, index) => (
              <span key={index} className="tag">{tag}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <div className={`tab-item ${activeTab === 'description' ? 'active' : ''}`} onClick={() => setActiveTab('description')}>Description</div>
        <div className={`tab-item ${activeTab === 'files' ? 'active' : ''}`} onClick={() => setActiveTab('files')}>Files</div>
      </div>

      {/* --- CONTENT: DESCRIPTION --- */}
      {activeTab === 'description' && (
        <div className="detail-layout">
          <div className="detail-main">
            <div className="description-box markdown-content">
              <ReactMarkdown>{mod.fullDescription}</ReactMarkdown>
            </div>
          </div>

          {/* SIDEBAR ABOUT PROJECT */}
          <div className="detail-aside">
            <div className="aside-box">
              <div className="aside-title">About Project</div>
              <div className="detail-list">
                
                <div className="detail-row">
                  <span className="detail-label">Version</span>
                  <span style={{ fontWeight: 'bold', color: '#fff' }}>{mod.version}</span>
                </div>

                <div className="detail-row">
                  <span className="detail-label">License</span>
                  {/* Cek License */}
                  {mod.isPremium ? (
                    <span style={{ color: '#eab308', fontWeight: 'bold' }}>Premium ({mod.price})</span>
                  ) : (
                    <span>Free</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- CONTENT: FILES --- */}
      {activeTab === 'files' && (
        <div className="files-container">
          <div className="file-row" style={mod.isPremium ? {borderColor: '#eab308', borderLeftWidth: '4px'} : {}}>
            <div className="file-info">
              <h3>{mod.fileName}</h3>
              <div className="file-meta">
                <span>Version: <strong>{mod.version}</strong></span>
                <span>Type: <strong>Release</strong></span>
                {mod.isPremium && <span style={{color: '#eab308'}}>Harga: <strong>{mod.price}</strong></span>}
              </div>
            </div>
            <div className="file-action">
              {mod.isPremium ? (
                // Tombol Beli WhatsApp
                <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-download-cool" style={{background: 'linear-gradient(135deg, #16a34a, #15803d)'}}>
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01C17.18 3.03 14.69 2 12.04 2zM12.05 20.21c-1.5 0-2.97-.39-4.26-1.15l-.3-.18-3.11.82.83-3.04-.2-.32a8.124 8.124 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.183 8.183 0 0 1 2.41 5.83c.02 4.54-3.68 8.24-8.17 8.24zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.24.25-.4.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.39 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.25 1.05.4 1.41.52.61.19 1.16.16 1.6.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.07-.11-.24-.18-.49-.3z"/>
                  </svg>
                  Beli ({mod.price})
                </a>
              ) : (
                // Tombol Download Biasa
                <a href={filePath} download className="btn-download-cool">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
                  Download
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}