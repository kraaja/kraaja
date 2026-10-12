"use client";
import { Activity, User, Wallet, ArrowDownRight, ArrowUpRight, ChevronDown, Settings, LogOut } from "lucide-react";

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
    <nav className="flex items-center justify-between px-3 sm:px-4 py-2.5 bg-slate-950 border-b border-slate-800/80 text-white text-sm sticky top-0 z-40">
      <div className="flex items-center gap-3 sm:gap-6">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <Activity className="text-blue-500" size={20} />
          <span className="text-base sm:text-xl font-bold tracking-wider">
            KRAA<span className="text-blue-500">TRADE</span>
          </span>
        </div>

        {/* Market Selector Dropdown Button */}
        <button 
          onClick={onOpenMarketModal}
          className="flex items-center gap-2 bg-slate-900 border border-slate-800 hover:border-slate-700 px-3 py-1.5 rounded-lg transition text-xs font-bold"
        >
          <span className="text-blue-400 font-mono">{currentPair}</span>
          <ChevronDown size={14} className="text-slate-400" />
        </button>

        <div className="hidden md:flex items-center gap-4 text-xs font-medium text-slate-300">
          <button className="text-blue-400 transition">Spot</button>
          <button className="hover:text-blue-400 transition">Futures</button>
          <button className="hover:text-blue-400 transition">Earn</button>
        </div>
      </div>

      <div className="flex items-center gap-2.5 sm:gap-4">
        {/* Tombol Cepat Deposit & Withdraw */}
        <div className="hidden sm:flex items-center gap-2">
          <button 
            onClick={() => onOpenWalletModal('deposit')}
            className="flex items-center gap-1 px-3 py-1.5 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 rounded-lg text-xs font-semibold transition"
          >
            <ArrowDownRight size={14} /> Deposit
          </button>
          <button 
            onClick={() => onOpenWalletModal('withdraw')}
            className="flex items-center gap-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 rounded-lg text-xs font-semibold transition"
          >
            <ArrowUpRight size={14} /> Withdraw
          </button>
        </div>

        <div className="text-right hidden xl:block">
          <p className="text-[10px] text-slate-400 leading-tight">Total Portofolio</p>
          <p className="text-xs font-bold text-white font-mono">
            ${totalPortfolio.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>

        {/* Profil Pengguna */}
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg shadow-sm">
          <div className="flex items-center gap-2 cursor-pointer" onClick={onOpenProfile} title="Edit Profil">
            <User size={15} className="text-blue-400" />
            <span className="font-semibold text-slate-200 text-xs max-w-[90px] truncate">{username}</span>
          </div>
          <button onClick={onOpenProfile} className="text-slate-400 hover:text-blue-400 transition" title="Pengaturan">
            <Settings size={13} />
          </button>
          <div className="h-3.5 w-[1px] bg-slate-700"></div>
          <button onClick={onLogout} className="text-rose-400 hover:text-rose-300 transition" title="Keluar">
            <LogOut size={13} />
          </button>
        </div>
      </div>
    </nav>
  );
}