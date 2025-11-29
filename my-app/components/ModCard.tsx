'use client'; // <--- TAMBAHKAN INI DI BARIS PERTAMA

import React from 'react';
import Link from 'next/link';
import { Mod } from '@/data/mods';

export default function ModCard({ mod }: { mod: Mod }) {
  return (
    <Link href={`/addon/${mod.id}`} className="project-card">
      <div className="card-img">
        {/* Logika: Jika ada gambar, tampilkan. Jika tidak, pakai placeholder inisial */}
        {mod.image ? (
          <img 
            src={`/images/${mod.image}`} 
            alt={mod.title} 
            onError={(e) => {
              // Fallback jika gambar error/tidak ketemu
              const img = e.target as HTMLImageElement;
              img.style.display = 'none';
              // Cari div placeholder di sebelahnya dan tampilkan
              const placeholder = img.nextElementSibling as HTMLElement;
              if (placeholder) placeholder.hidden = false;
            }} 
          />
        ) : null}
        
        {/* Placeholder (Hidden defaultnya jika ada gambar) */}
        <div hidden={!!mod.image} style={{ 
          width: '100%', height: '100%', 
          background: 'linear-gradient(45deg, #2563eb, #1e40af)', 
          display: 'flex', alignItems: 'center', justifyContent: 'center', 
          color: 'white', fontWeight: 'bold', fontSize: '24px' 
        }}>
          {mod.title.charAt(0)}
        </div>
      </div>
      
      <div className="card-content">
        <div className="card-title">{mod.title}</div>
        <div className="card-author">By <span>{mod.author}</span></div>
        <div className="card-desc">
          {mod.summary}
        </div>
        <div className="categories-tags">
          {mod.tags.map((tag, index) => (
            <span key={index} className="tag">{tag}</span>
          ))}
        </div>
      </div>
    </Link>
  );
}