'use client';

import React, { useState } from 'react';
import ModCard from '@/components/ModCard';
import LogoDropdown from '@/components/LogoDropdown';
import { Mod } from '@/data/mods';
import { Category } from '@/data/categories'; // Import tipe data saja

// Terima props 'categories'
export default function MainPage({ mods, pageTitle, categories }: { mods: Mod[], pageTitle: string, categories: Category[] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredMods = mods.filter((mod) => {
    const matchesSearch = mod.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          mod.summary.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'all' 
      ? true 
      : mod.tags.some(tag => tag.toLowerCase() === selectedCategory.toLowerCase());

    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <header>
        <div className="header-left">
          <LogoDropdown />
        </div>
        
        <div className="search-bar">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
          </svg>
          <input 
            type="text" 
            placeholder={`Search ${pageTitle}...`} 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="header-right"></div>
      </header>

      <div className="hero">
        <h1>{pageTitle}</h1>
        <p>Temukan repositori mod terbesar di KraaDev.</p>
      </div>

      <div className="container">
        <aside>
          <div className="filter-group">
            <h3>Categories</h3>
            <ul className="category-list">
              {/* Render kategori dari Props */}
              {categories.map((cat) => (
                <li key={cat.id}>
                  <button 
                    onClick={() => setSelectedCategory(cat.id)}
                    className={selectedCategory === cat.id ? 'active' : ''}
                  >
                    <span className="category-icon">{cat.icon}</span>
                    {cat.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <main>
          <div className="controls-bar">
            <span className="result-count">
              Found {filteredMods.length} results
            </span>
          </div>

          {filteredMods.length > 0 ? (
            filteredMods.map((mod) => (
              <ModCard key={mod.id} mod={mod} />
            ))
          ) : (
            <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
              <h3>No mods found.</h3>
            </div>
          )}
        </main>
      </div>

      <footer>
        <p>&copy; 2025 KraaDev.</p>
      </footer>
    </>
  );
}