"use client";
import { useEffect, useRef, useState } from "react";
import { createChart, CandlestickSeries, ColorType } from "lightweight-charts";

interface TradingChartProps {
  currentPair: string;
  currentPrice: number;
  priceChange24h: { amount: number; percent: number };
}

export default function TradingChart({ currentPair, currentPrice, priceChange24h }: TradingChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [timeframe, setTimeframe] = useState<string>("1H");

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const isMobile = window.innerWidth < 768;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: "#0F172A" },
        textColor: "#94A3B8",
      },
      grid: {
        vertLines: { color: "#1E293B" },
        horzLines: { color: "#1E293B" },
      },
      width: chartContainerRef.current.clientWidth,
      height: isMobile ? 280 : 380,
      timeScale: { timeVisible: true, secondsVisible: false },
    });

    const candlestickSeries = chart.addSeries(CandlestickSeries, {
      upColor: "#3B82F6",
      downColor: "#F43F5E",
      borderVisible: false,
      wickUpColor: "#3B82F6",
      wickDownColor: "#F43F5E",
    });

    // Dummy candlestick dataset
    candlestickSeries.setData([
      { time: "2026-10-01", open: currentPrice * 0.95, high: currentPrice * 0.98, low: currentPrice * 0.93, close: currentPrice * 0.96 },
      { time: "2026-10-02", open: currentPrice * 0.96, high: currentPrice * 1.01, low: currentPrice * 0.95, close: currentPrice * 0.99 },
      { time: "2026-10-03", open: currentPrice * 0.99, high: currentPrice * 1.02, low: currentPrice * 0.98, close: currentPrice * 1.01 },
      { time: "2026-10-04", open: currentPrice * 1.01, high: currentPrice * 1.03, low: currentPrice * 0.99, close: currentPrice * 1.00 },
      { time: "2026-10-05", open: currentPrice * 1.00, high: currentPrice * 1.04, low: currentPrice * 0.99, close: currentPrice * 1.02 },
      { time: "2026-10-06", open: currentPrice * 1.02, high: currentPrice * 1.05, low: currentPrice * 1.01, close: currentPrice * 1.03 },
      { time: "2026-10-07", open: currentPrice * 1.03, high: currentPrice * 1.06, low: currentPrice * 1.02, close: currentPrice },
    ]);

    const handleResize = () => {
      chart.applyOptions({ 
        width: chartContainerRef.current?.clientWidth,
        height: window.innerWidth < 768 ? 280 : 380
      });
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [currentPair]);

  return (
    <div className="w-full bg-slate-900/90 rounded-xl border border-slate-800/80 overflow-hidden shadow-xl">
      <div className="p-3 border-b border-slate-800/80 flex items-center justify-between flex-wrap gap-2 bg-slate-950/30">
        <div className="flex items-center gap-4">
          <div>
            <h2 className="text-base sm:text-lg font-black text-white font-mono">
              {currentPair}
            </h2>
            <p className="text-xs font-bold text-blue-400 font-mono">
              ${currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </p>
          </div>
          
          {/* Timeframe Bar */}
          <div className="hidden sm:flex items-center gap-1 bg-slate-950/60 p-1 rounded-lg border border-slate-800 text-[11px]">
            {["1S", "1M", "15M", "1H", "4H", "1D"].map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-2 py-0.5 rounded transition ${timeframe === tf ? "bg-blue-600 text-white font-bold" : "text-slate-400 hover:text-white"}`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-[10px] text-slate-400">Perubahan 24j</p>
            <p className={`text-xs font-bold font-mono ${priceChange24h.amount >= 0 ? 'text-blue-400' : 'text-rose-500'}`}>
              {priceChange24h.amount >= 0 ? '+' : ''}{priceChange24h.amount.toFixed(2)} ({priceChange24h.percent.toFixed(2)}%)
            </p>
          </div>
        </div>
      </div>
      
      <div className="p-1 sm:p-2">
        <div ref={chartContainerRef} className="w-full" />
      </div>
    </div>
  );
}