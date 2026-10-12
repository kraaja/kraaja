"use client";
import { useState } from "react";

export default function TradePanel() {
  const [orderType, setOrderType] = useState<"buy" | "sell">("buy");
  const [tradeMode, setTradeMode] = useState<"limit" | "market" | "stop">("limit");
  const [marginType, setMarginType] = useState<"spot" | "cross" | "isolated">("spot");
  
  const [price, setPrice] = useState<string>("70500");
  const [amount, setAmount] = useState<string>("");
  const [percentage, setPercentage] = useState<number>(0);

  const availableBalance = 12450.00; // Saldo USDT

  // Handler tombol persentase saldo (0%, 25%, 50%, 75%, 100%)
  const handlePercentageClick = (pct: number) => {
    setPercentage(pct);
    const numPrice = parseFloat(price) || 1;
    const calculatedAmount = ((availableBalance * (pct / 100)) / numPrice).toFixed(4);
    setAmount(calculatedAmount);
  };

  const totalValue = (parseFloat(price || "0") * parseFloat(amount || "0")).toFixed(2);

  return (
    <div className="bg-slate-900/90 backdrop-blur-md rounded-xl border border-slate-800/80 shadow-2xl h-full text-white flex flex-col text-sm overflow-hidden">
      
      {/* Tipe Margin & Order */}
      <div className="flex items-center justify-between p-3 border-b border-slate-800/80 bg-slate-950/40">
        <div className="flex gap-3 font-semibold text-xs">
          <button 
            onClick={() => setMarginType("spot")}
            className={`px-2.5 py-1 rounded-md transition ${marginType === "spot" ? "bg-blue-500/10 text-blue-400 border border-blue-500/30 shadow-sm" : "text-slate-400 hover:text-slate-200"}`}
          >
            Spot
          </button>
          <button 
            onClick={() => setMarginType("cross")}
            className={`px-2.5 py-1 rounded-md transition ${marginType === "cross" ? "bg-blue-500/10 text-blue-400 border border-blue-500/30 shadow-sm" : "text-slate-400 hover:text-slate-200"}`}
          >
            Cross 5x
          </button>
          <button 
            onClick={() => setMarginType("isolated")}
            className={`px-2.5 py-1 rounded-md transition ${marginType === "isolated" ? "bg-blue-500/10 text-blue-400 border border-blue-500/30 shadow-sm" : "text-slate-400 hover:text-slate-200"}`}
          >
            Isolated 10x
          </button>
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div className="space-y-4">
          {/* Limit / Market / Stop Limit */}
          <div className="flex gap-4 bg-slate-950/60 p-1.5 rounded-lg border border-slate-800/60 text-xs font-medium">
            {(["limit", "market", "stop"] as const).map((mode) => (
              <button 
                key={mode} 
                onClick={() => setTradeMode(mode)}
                className={`flex-1 py-1.5 rounded-md capitalize transition text-center ${
                  tradeMode === mode 
                    ? "bg-slate-800 text-blue-400 shadow-inner font-semibold border border-slate-700/50" 
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {mode === "stop" ? "Stop-Limit" : mode}
              </button>
            ))}
          </div>

          {/* Info Saldo */}
          <div className="flex justify-between items-center text-xs text-slate-400 px-1">
            <span>Tersedia</span>
            <span className="text-slate-200 font-mono font-medium">{availableBalance.toLocaleString()} USDT</span>
          </div>

          {/* Input Harga & Jumlah */}
          <div className="space-y-3">
            {tradeMode !== "market" && (
              <div className="flex items-center bg-slate-950/80 border border-slate-800 rounded-lg p-2.5 focus-within:border-blue-500/80 focus-within:ring-1 focus-within:ring-blue-500/30 transition">
                <span className="text-slate-500 w-16 text-xs">Harga</span>
                <input 
                  type="number" 
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="bg-transparent outline-none w-full text-right text-white font-mono text-sm" 
                />
                <span className="text-slate-400 ml-2 text-xs">USDT</span>
              </div>
            )}

            <div className="flex items-center bg-slate-950/80 border border-slate-800 rounded-lg p-2.5 focus-within:border-blue-500/80 focus-within:ring-1 focus-within:ring-blue-500/30 transition">
              <span className="text-slate-500 w-16 text-xs">Jumlah</span>
              <input 
                type="number" 
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  setPercentage(0);
                }}
                placeholder="0.00" 
                className="bg-transparent outline-none w-full text-right text-white font-mono text-sm" 
              />
              <span className="text-slate-400 ml-2 text-xs">BTC</span>
            </div>
          </div>

          {/* Slider Persentase Interaktif */}
          <div className="pt-2 px-1">
            <div className="h-1.5 bg-slate-800 rounded-full relative mb-3">
              <div className="absolute h-full bg-blue-500 rounded-full transition-all duration-150" style={{ width: `${percentage}%` }}></div>
              <div 
                className="absolute -top-1.5 w-4 h-4 bg-white rounded-full border-2 border-blue-500 shadow-md cursor-pointer transition-all"
                style={{ left: `calc(${percentage}% - 8px)` }}
              ></div>
            </div>
            <div className="grid grid-cols-5 text-[10px] text-slate-400 font-mono text-center">
              {[0, 25, 50, 75, 100].map((pct) => (
                <button 
                  key={pct}
                  onClick={() => handlePercentageClick(pct)}
                  className={`py-1 rounded transition hover:bg-slate-800 hover:text-white ${percentage === pct ? "text-blue-400 font-bold bg-slate-800/60" : ""}`}
                >
                  {pct}%
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Total & Action Buttons */}
        <div className="space-y-4 pt-4 border-t border-slate-800/80">
          <div className="flex items-center justify-between bg-slate-950/50 px-3 py-2 rounded-lg border border-slate-800/50">
            <span className="text-slate-400 text-xs">Total Estimasi</span>
            <span className="font-mono text-white font-semibold text-xs">{totalValue !== "NaN" ? totalValue : "0.00"} USDT</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => {
                setOrderType("buy");
                alert(`Order Beli berhasil dipasang untuk ${amount || 0} BTC!`);
              }}
              className="py-3 rounded-xl text-sm font-bold shadow-lg bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white shadow-blue-500/20 active:scale-[0.98] transition"
            >
              Beli BTC
            </button>
            <button
              onClick={() => {
                setOrderType("sell");
                alert(`Order Jual berhasil dipasang untuk ${amount || 0} BTC!`);
              }}
              className="py-3 rounded-xl text-sm font-bold shadow-lg bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white shadow-rose-500/20 active:scale-[0.98] transition"
            >
              Jual BTC
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}