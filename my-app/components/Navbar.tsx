"use client";
import { Activity, User, ArrowDownRight, ChevronDown, Settings, LogOut } from "lucide-react";

interface NavbarProps {
  balanceUSDT: number;
  balanceBTC: number;
  currentPair: string;
  currentPrice: number;
  username: string;
  onOpenMarketModal: () => void;
  onOpenWalletModal: (type: 'deposit' | 'withdraw') => void;
  onLogout: () => void;
  onOpenProfile: () => void;
}

export default function Navbar({
  balanceUSDT,
  balanceBTC,
  currentPair,
  currentPrice,
  username,
  onOpenMarketModal,
  onOpenWalletModal,
  onLogout,
  onOpenProfile
}: NavbarProps) {
  const totalPortfolio = balanceUSDT + (balanceBTC * currentPrice);

  return (
    <nav className="flex items-center justify-between px-2.5 sm:px-4 py-2.5 bg-slate-950 border-b border-slate-800/80 text-white text-sm sticky top-0 z-40">
      {/* SISI KIRI: Logo & Market Selector */}
      <div className="flex items-center gap-2 sm:gap-4 overflow-hidden">
        <div className="flex items-center gap-1 flex-shrink-0">
          <Activity className="text-blue-500" size={18} />
          <span className="text-sm sm:text-lg font-extrabold tracking-wider">
            KRAA<span className="text-blue-500">TRD</span>
          </span>
        </div>

        {/* Tombol Pemilih Market */}
        <button 
          onClick={onOpenMarketModal}
          className="flex items-center gap-1 bg-slate-900 border border-slate-800 hover:border-slate-700 px-2 py-1 rounded-lg transition text-xs font-bold flex-shrink-0"
        >
          <span className="text-blue-400 font-mono">{currentPair}</span>
          <ChevronDown size={12} className="text-slate-400" />
        </button>
      </div>

      {/* SISI KANAN: Aksi Cepat & Profil Pengguna */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {/* Tombol Deposit Cepat */}
        <button 
          onClick={() => onOpenWalletModal('deposit')}
          className="flex items-center gap-1 px-2 py-1 bg-blue-600/20 text-blue-400 border border-blue-500/30 rounded-lg text-[11px] font-semibold transition active:scale-95"
          title="Deposit"
        >
          <ArrowDownRight size={13} /> 
          <span className="hidden xs:inline">Deposit</span>
        </button>

        {/* Kartu Profil & Pengaturan */}
        <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-lg shadow-sm">
          <div className="flex items-center gap-1.5 cursor-pointer max-w-[90px] sm:max-w-[130px] truncate" onClick={onOpenProfile} title="Edit Profil">
            <User size={13} className="text-blue-400 flex-shrink-0" />
            <span className="font-semibold text-slate-200 text-xs truncate">{username}</span>
          </div>
          
          <button 
            onClick={onOpenProfile} 
            className="text-slate-400 hover:text-blue-400 transition p-0.5" 
            title="Pengaturan Profil"
          >
            <Settings size={12} />
          </button>
          
          <div className="h-3.5 w-[1px] bg-slate-700 mx-0.5"></div>
          
          <button 
            onClick={onLogout} 
            className="text-rose-400 hover:text-rose-300 transition p-0.5" 
            title="Keluar"
          >
            <LogOut size={12} />
          </button>
        </div>
      </div>
    </nav>
  );
}