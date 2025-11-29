'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // <--- Import ini

export default function LogoDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname(); // <--- Ambil URL saat ini

  // Cek apakah sedang di halaman Java
  const isJava = pathname === '/java';

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="logo-container" ref={dropdownRef}>
      <div className="logo-wrapper" onClick={() => setIsOpen(!isOpen)}>
        <div className="logo-icon">K</div>
        <div className="logo-text">
          Kraa<span>Dev</span>
          <svg 
            className={`arrow-icon ${isOpen ? 'rotate' : ''}`} 
            viewBox="0 0 24 24" width="16" height="16" fill="currentColor"
          >
            <path d="M7 10l5 5 5-5z"/>
          </svg>
        </div>
      </div>

      {isOpen && (
        <div className="game-menu-dropdown">
          <div className="menu-header">Select Game Version</div>
          
          {/* BEDROCK LINK */}
          <Link href="/" className={`menu-item ${!isJava ? 'active' : ''}`} onClick={() => setIsOpen(false)}>
            <div className="menu-icon">🪨</div>
            <div className="menu-info">
              <span className="game-title">Minecraft Bedrock</span>
              <span className="game-desc">Addons & Texture Packs</span>
            </div>
            {/* Munculkan centang jika BUKAN di halaman Java */}
            {!isJava && <div className="check-icon">✓</div>}
          </Link>

          {/* JAVA LINK */}
          <Link href="/java" className={`menu-item ${isJava ? 'active' : ''}`} onClick={() => setIsOpen(false)}>
            <div className="menu-icon">☕</div>
            <div className="menu-info">
              <span className="game-title">Minecraft Java</span>
              <span className="game-desc">Mods & Shaders</span>
            </div>
            {/* Munculkan centang jika DI halaman Java */}
            {isJava && <div className="check-icon">✓</div>}
          </Link>
        </div>
      )}
    </div>
  );
}