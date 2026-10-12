import { Activity, User, Bell, Globe, Menu } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-3 sm:px-4 py-2.5 bg-slate-950 border-b border-slate-800/80 text-white text-sm sticky top-0 z-40">
      <div className="flex items-center gap-3 sm:gap-6">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <Activity className="text-blue-500" size={20} />
          <span className="text-base sm:text-xl font-bold tracking-wider">
            KRAA<span className="text-blue-500">TRADE</span>
          </span>
        </div>
        
        {/* Navigasi Desktop */}
        <div className="hidden md:flex items-center gap-4 text-xs sm:text-sm font-medium text-slate-300">
          <button className="text-blue-400 transition">Spot</button>
          <button className="hover:text-blue-400 transition">Derivatives</button>
          <button className="hover:text-blue-400 transition">Markets</button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Info Saldo Singkat */}
        <div className="text-right">
          <p className="text-[10px] text-slate-400 leading-tight">Saldo</p>
          <p className="text-xs sm:text-sm font-bold text-white font-mono">12,450 <span className="text-blue-400 text-[10px]">USDT</span></p>
        </div>

        {/* Profil User */}
        <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-lg">
          <User size={14} className="text-blue-400" />
          <span className="font-semibold text-slate-200 text-xs hidden sm:inline">Kraa</span>
        </div>
      </div>
    </nav>
  );
}