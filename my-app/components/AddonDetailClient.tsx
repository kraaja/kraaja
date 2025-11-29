'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { Mod } from '@/data/mods';

export default function AddonDetailClient({ mod }: { mod: Mod }) {
  const [activeTab, setActiveTab] = useState<'description' | 'files'>('description');
  const filePath = `/files/${mod.fileName}`;

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
          <h1>{mod.title}</h1>
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

          {/* SIDEBAR ABOUT PROJECT (Hanya Version & License) */}
          <div className="detail-aside">
            <div className="aside-box">
              <div className="aside-title">About Project</div>
              <div className="detail-list">
                
                {/* Menampilkan Versi dari data/mods.ts */}
                <div className="detail-row">
                  <span className="detail-label">Version</span>
                  <span style={{ fontWeight: 'bold', color: '#fff' }}>{mod.version}</span>
                </div>

                <div className="detail-row">
                  <span className="detail-label">License</span>
                  <span>Free</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- CONTENT: FILES --- */}
      {activeTab === 'files' && (
        <div className="files-container">
          <div className="file-row">
            <div className="file-info">
              <h3>{mod.fileName}</h3>
              <div className="file-meta">
                {/* Menampilkan Versi di sini juga */}
                <span>Version: <strong>{mod.version}</strong></span>
                <span>Type: <strong>Release</strong></span>
              </div>
            </div>
            <div className="file-action">
              <a href={filePath} download className="btn-download-cool">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
                Download
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}