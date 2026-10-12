"use client";
import { useEffect, useRef } from "react";
import { createChart, CandlestickSeries, ColorType } from "lightweight-charts";

interface TradingChartProps {
  currentPrice: number;
  priceChange24h: { amount: number; percent: number };
}

export default function TradingChart({ currentPrice, priceChange24h }: TradingChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);

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
      height: isMobile ? 300 : 400,
      timeScale: { timeVisible: true, secondsVisible: false },
    });

    const candlestickSeries = chart.addSeries(CandlestickSeries, {
      upColor: "#3B82F6",
      downColor: "#F43F5E",
      borderVisible: false,
      wickUpColor: "#3B82F6",
      wickDownColor: "#F43F5E",
    });

    candlestickSeries.setData([
      { time: "2026-10-01", open: 65000, high: 65500, low: 64000, close: 64500 },
      { time: "2026-10-02", open: 64500, high: 66000, low: 64200, close: 65800 },
      { time: "2026-10-03", open: 65800, high: 67000, low: 65500, close: 66800 },
      { time: "2026-10-04", open: 66800, high: 67200, low: 66000, close: 66200 },
      { time: "2026-10-05", open: 66200, high: 68000, low: 66000, close: 67900 },
      { time: "2026-10-06", open: 67900, high: 69500, low: 67500, close: 69200 },
      { time: "2026-10-07", open: 69200, high: 71000, low: 68500, close: 70500 },
    ]);

    const handleResize = () => {
      chart.applyOptions({ 
        width: chartContainerRef.current?.clientWidth,
        height: window.innerWidth < 768 ? 300 : 400
      });
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, []);

  return (
    <div className="w-full bg-slate-900/90 rounded-xl border border-slate-800/80 overflow-hidden shadow-xl">
      <div className="p-3 border-b border-slate-800/80 flex items-center justify-between flex-wrap gap-2 bg-slate-950/30">
        <div className="flex items-center gap-3">
          <h2 className="text-lg sm:text-xl font-black text-white font-mono">
            BTC<span className="text-slate-500 text-xs">/USDT</span>
          </h2>
          <div>
            <p className="text-base font-bold text-blue-400 font-mono">
              {currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </p>
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