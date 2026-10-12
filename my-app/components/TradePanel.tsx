"use client";
import { useState, useEffect } from "react";

interface TradePanelProps {
  balanceUSDT: number;
  balanceBTC: number;
  currentPrice: number;
  selectedPrice: number;
  onPlaceOrder: (type: "buy" | "sell", mode: "limit" | "market" | "stop", price: number, amount: number) => void;
  onNotify: (message: string, type: "success" | "error" | "info") => void;
}

export default function TradePanel({
  balanceUSDT,
  balanceBTC,
  currentPrice,
  selectedPrice,
  onPlaceOrder,
  onNotify
}: TradePanelProps) {
  const [orderType, setOrderType] = useState<"buy" | "sell">("buy");
  const [tradeMode, setTradeMode] = useState<"limit" | "market" | "stop">("limit");
  const [marginType, setMarginType] = useState<"spot" | "cross" | "isolated">("spot");
  
  const [price, setPrice] = useState<string>(selectedPrice.toString());
  const [amount, setAmount] = useState<string>("");
  const [percentage, setPercentage] = useState<number>(0);

  useEffect(() => {
    if (tradeMode !== "market") {
      setPrice(selectedPrice.toString());
    }
  }, [selectedPrice, tradeMode]);

  const handlePercentageClick = (pct: number) => {
    setPercentage(pct);
    const activePrice = tradeMode === "market" ? currentPrice : (parseFloat(price) || currentPrice);
    if (orderType === "buy") {
      const maxUSDT = balanceUSDT * (pct / 100);
      const calculatedAmount = (maxUSDT / activePrice).toFixed(4);
      setAmount(calculatedAmount);
    } else {
      const maxBTC = balanceBTC * (pct / 100);
      setAmount(maxBTC.toFixed(4));
    }
  };

  const effectivePrice = tradeMode === "market" ? currentPrice : (parseFloat(price) || currentPrice);
  const totalValue = (effectivePrice * (parseFloat(amount) || 0)).toFixed(2);

  const handleSubmit = () => {
    const numAmount = parseFloat(amount);
    if (!numAmount || numAmount <= 0) {
      onNotify("Masukkan jumlah yang valid!", "error");
      return;
    }

    if (orderType === "buy" && parseFloat(totalValue) > balanceUSDT) {
      onNotify("Saldo USDT tidak mencukupi!", "error");
      return;
    }

    if (orderType === "sell" && numAmount > balanceBTC) {
      onNotify("Saldo BTC tidak mencukupi!", "error");
      return;
    }

    onPlaceOrder(orderType, tradeMode, effectivePrice, numAmount);
    setAmount("");
    setPercentage(0);
  };

  return (
    <div className="bg-slate-900/90 backdrop-blur-md rounded-xl border border-slate-800/80 shadow-2xl h-full text-white flex flex-col text-sm overflow-hidden">
      <div className="flex items-center justify-between p-3 border-b border-slate-800/80 bg-slate-950/40">
        <div className="flex gap-2 font-semibold text-xs">
          {(["spot", "cross", "isolated"] as const).map((m) => (
            <button 
              key={m}
              onClick={() => setMarginType(m)}
              className={`px-2 py-1 rounded-md capitalize transition ${marginType === m ? "bg-blue-500/10 text-blue-400 border border-blue-500/30" : "text-slate-400 hover:text-slate-200"}`}
            >
              {m === "cross" ? "Cross 5x" : m === "isolated" ? "Isolated 10x" : "Spot"}
            </button>
          ))}
        </div>
      </div>

      <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-3">
          <div className="flex gap-2 bg-slate-950/60 p-1 rounded-lg border border-slate-800/60 text-xs font-medium">
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

          <div className="flex justify-between items-center text-xs text-slate-400 px-1">
            <span>Tersedia ({orderType === "buy" ? "USDT" : "BTC"})</span>
            <span className="text-slate-200 font-mono font-medium">
              {orderType === "buy" ? `${balanceUSDT.toLocaleString(undefined, { minimumFractionDigits: 2 })} USDT` : `${balanceBTC.toFixed(4)} BTC`}
            </span>
          </div>

          <div className="space-y-2.5">
            {tradeMode !== "market" && (
              <div className="flex items-center bg-slate-950/80 border border-slate-800 rounded-lg p-2 focus-within:border-blue-500/80 transition">
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

            <div className="flex items-center bg-slate-950/80 border border-slate-800 rounded-lg p-2 focus-within:border-blue-500/80 transition">
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

          <div className="pt-1 px-1">
            <div className="h-1.5 bg-slate-800 rounded-full relative mb-2.5">
              <div className="absolute h-full bg-blue-500 rounded-full transition-all duration-150" style={{ width: `${percentage}%` }}></div>
              <div 
                className="absolute -top-1.5 w-3.5 h-3.5 bg-white rounded-full border-2 border-blue-500 shadow cursor-pointer"
                style={{ left: `calc(${percentage}% - 7px)` }}
              ></div>
            </div>
            <div className="grid grid-cols-5 text-[10px] text-slate-400 font-mono text-center">
              {[0, 25, 50, 75, 100].map((pct) => (
                <button 
                  key={pct}
                  onClick={() => handlePercentageClick(pct)}
                  className={`py-0.5 rounded transition hover:bg-slate-800 hover:text-white ${percentage === pct ? "text-blue-400 font-bold bg-slate-800/60" : ""}`}
                >
                  {pct}%
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-3 pt-2 border-t border-slate-800/80">
          <div className="flex items-center justify-between bg-slate-950/50 px-2.5 py-1.5 rounded-lg border border-slate-800/50 text-xs">
            <span className="text-slate-400">Total Estimasi</span>
            <span className="font-mono text-white font-semibold">{totalValue} USDT</span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={() => {
                setOrderType("buy");
                handleSubmit();
              }}
              className="py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-lg bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white shadow-blue-500/20 active:scale-[0.98] transition"
            >
              Beli BTC
            </button>
            <button
              onClick={() => {
                setOrderType("sell");
                handleSubmit();
              }}
              className="py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-lg bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white shadow-rose-500/20 active:scale-[0.98] transition"
            >
              Jual BTC
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}