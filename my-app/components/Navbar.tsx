import { Activity, Wallet, User, Bell, Globe, ChevronDown } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-4 py-3 bg-slate-950 border-b border-slate-800 text-white text-sm">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 mr-4">
          <Activity className="text-blue-500" size={24} />
          <span className="text-xl font-bold tracking-wider">
            KRAA<span className="text-blue-500">TRADE</span>
          </span>
        </div>
        <div className="hidden md:flex items-center gap-4 font-medium text-slate-300">
          <button className="hover:text-blue-400 transition">Pasar</button>
          <button className="text-blue-400 transition">Spot</button>
          <button className="hover:text-blue-400 transition flex items-center gap-1">Derivatives <ChevronDown size={14}/></button>
          <button className="hover:text-blue-400 transition">Copy Trading</button>
          <button className="hover:text-blue-400 transition">Bot & Web3</button>
        </div>
      </div>
      <div className="flex items-center gap-5">
        <div className="hidden md:flex items-center gap-4 text-slate-400">
          <Globe size={18} className="hover:text-white cursor-pointer" />
          <Bell size={18} className="hover:text-white cursor-pointer" />
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-xs text-slate-400">Total Saldo</p>
            <p className="font-bold text-white">12,450.00 <span className="text-blue-400 text-xs">USDT</span></p>
          </div>
          <div className="flex items-center gap-2 bg-slate-800/80 border border-slate-700 px-3 py-1.5 rounded-lg cursor-pointer hover:bg-slate-700 transition">
            <User size={16} className="text-blue-400" />
            <span className="font-semibold text-slate-200">Kraa</span>
          </div>
        </div>
      </div>
    </nav>
  );
}