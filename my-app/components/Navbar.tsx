"use client";
import { Activity, User, LogOut, Settings } from "lucide-react";

interface NavbarProps {
  balanceUSDT: number;
  balanceBTC: number;
  currentPrice: number;
  username: string;
  onLogout: () => void;
  onOpenProfile: () => void;
}

export default function Navbar({ balanceUSDT, balanceBTC, currentPrice, username, onLogout, onOpenProfile }: NavbarProps) {
  const totalPortfolio = balanceUSDT + (balanceBTC * currentPrice);

  return (
    <nav className="flex items-center justify-between px-3 sm:px-4 py-2.5 bg-slate-950 border-b border-slate-800/80 text-white text-sm sticky top-0 z-40">
      <div className="flex items-center gap-3 sm:gap-6">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <Activity className="text-blue-500" size={20} />
          <span className="text-base sm:text-xl font-bold tracking-wider">
            KRAA<span className="text-blue-500">TRADE</span>
          </span>
        </div>
        <div className="hidden md:flex items-center gap-4 text-xs sm:text-sm font-medium text-slate-300">
          <button className="text-blue-400 transition">Spot</button>
          <button className="hover:text-blue-400 transition">Derivatives</button>
          <button className="hover:text-blue-400 transition">Markets</button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-right hidden sm:block">
          <p className="text-[10px] text-slate-400 leading-tight">Total Portofolio</p>
          <p className="text-xs sm:text-sm font-bold text-white font-mono">
            ${totalPortfolio.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>

        {/* Profil Pengguna di Pojok Kanan Atas */}
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg shadow-sm">
          <div className="flex items-center gap-2 cursor-pointer" onClick={onOpenProfile} title="Edit Profil">
            <User size={16} className="text-blue-400" />
            <span className="font-semibold text-slate-200 text-xs max-w-[100px] truncate">{username}</span>
          </div>
          <button 
            onClick={onOpenProfile} 
            className="text-slate-400 hover:text-blue-400 transition ml-1"
            title="Edit Profil"
          >
            <Settings size={14} />
          </button>
          <div className="h-4 w-[1px] bg-slate-700 mx-1"></div>
          <button 
            onClick={onLogout} 
            className="text-rose-400 hover:text-rose-300 transition"
            title="Keluar"
          >
            <LogOut size={14} />
          </button>
        </div>
      </div>
    </nav>
  );
}