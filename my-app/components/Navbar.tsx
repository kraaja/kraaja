"use client";
import { Activity, User, ArrowDownRight, ArrowUpRight, ChevronDown, Settings, LogOut } from "lucide-react";

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
    <nav className="flex items-center justify-between px-3 py-2.5 bg-slate-950 border-b border-slate-800/80 text-white text-sm sticky top-0 z-40 overflow-x-auto whitespace-nowrap scrollbar-none">
      {/* SISI KIRI: Logo KRAATRADE Lengkap & Market Selector */}
      <div className="flex items-center gap-3 flex-shrink-0 mr-4">
        <div className="flex items-center gap-2">
          <Activity className="text-blue-500" size={20} />
          <span className="text-base sm:text-xl font-bold tracking-wider">
            KRAA<span className="text-blue-500">TRADE</span>
          </span>
        </div>

        <button 
          onClick={onOpenMarketModal}
          className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 hover:border-slate-700 px-2.5 py-1.5 rounded-lg transition text-xs font-bold"
          title="Pilih Pasangan Market"
        >
          <span className="text-blue-400 font-mono text-xs">{currentPair}</span>
          <ChevronDown size={13} className="text-slate-400" />
        </button>
      </div>

      {/* SISI KANAN: Menu / Aksi Cepat & Profil (Bisa digeser horizontal agar tidak sempit/nempel) */}
      <div className="flex items-center gap-2.5 flex-shrink-0">
        <button 
          onClick={() => onOpenWalletModal('deposit')}
          className="flex items-center gap-1 px-2.5 py-1.5 bg-blue-600/20 text-blue-400 border border-blue-500/30 rounded-lg text-xs font-semibold transition active:scale-95"
        >
          <ArrowDownRight size={14} /> 
          <span>Deposit</span>
        </button>

        <button 
          onClick={() => onOpenWalletModal('withdraw')}
          className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-800 text-slate-300 border border-slate-700 rounded-lg text-xs font-semibold transition active:scale-95"
        >
          <ArrowUpRight size={14} /> 
          <span>Withdraw</span>
        </button>

        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg shadow-sm">
          <div className="flex items-center gap-1.5 cursor-pointer max-w-[120px] truncate" onClick={onOpenProfile} title="Edit Profil">
            <User size={14} className="text-blue-400 flex-shrink-0" />
            <span className="font-semibold text-slate-200 text-xs truncate">{username}</span>
          </div>
          
          <button onClick={onOpenProfile} className="text-slate-400 hover:text-blue-400 transition" title="Pengaturan">
            <Settings size={13} />
          </button>
          
          <div className="h-4 w-[1px] bg-slate-700 mx-0.5"></div>
          
          <button onClick={onLogout} className="text-rose-400 hover:text-rose-300 transition" title="Keluar">
            <LogOut size={13} />
          </button>
        </div>
      </div>
    </nav>
  );
}