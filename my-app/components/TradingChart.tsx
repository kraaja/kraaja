"use client";
import { useEffect, useRef } from "react";
import { createChart, CandlestickSeries, ColorType } from "lightweight-charts";

export default function TradingChart() {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: "#0F172A" }, // tailwind slate-900
        textColor: "#94A3B8", // slate-400
      },
      grid: {
        vertLines: { color: "#1E293B" }, // slate-800
        horzLines: { color: "#1E293B" },
      },
      width: chartContainerRef.current.clientWidth,
      height: 450,
      timeScale: { timeVisible: true, secondsVisible: false },
    });

    const candlestickSeries = chart.addSeries(CandlestickSeries, {
      upColor: "#3B82F6", // Blue 500
      downColor: "#F43F5E", // Rose 500
      borderVisible: false,
      wickUpColor: "#3B82F6",
      wickDownColor: "#F43F5E",
    });

    // Dummy Data dengan trend
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
      chart.applyOptions({ width: chartContainerRef.current?.clientWidth });
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, []);

  return (
    <div className="w-full h-full bg-slate-900 rounded-lg border border-slate-800 flex flex-col">
      {/* Market Stats Header */}
      <div className="flex flex-wrap items-center gap-6 p-4 border-b border-slate-800">
        <div>
          <h2 className="text-2xl font-black text-white flex items-center gap-2">
            BTC<span className="text-slate-500 text-lg">/USDT</span>
          </h2>
          <p className="text-blue-500 hover:underline cursor-pointer text-xs">Bitcoin</p>
        </div>
        <div>
          <p className="text-slate-400 text-xs">Harga Terakhir</p>
          <p className="text-lg font-bold text-blue-500">70,500.00</p>
        </div>
        <div>
          <p className="text-slate-400 text-xs">Perubahan 24j</p>
          <p className="text-sm font-bold text-blue-500">+1,300.00 (+1.87%)</p>
        </div>
        <div className="hidden sm:block">
          <p className="text-slate-400 text-xs">Tertinggi 24j</p>
          <p className="text-sm font-medium text-slate-200">71,000.00</p>
        </div>
        <div className="hidden sm:block">
          <p className="text-slate-400 text-xs">Terendah 24j</p>
          <p className="text-sm font-medium text-slate-200">67,500.00</p>
        </div>
        <div className="hidden md:block">
          <p className="text-slate-400 text-xs">Volume 24j (BTC)</p>
          <p className="text-sm font-medium text-slate-200">45,231.84</p>
        </div>
      </div>
      
      {/* Area Chart */}
      <div className="flex-1 p-2">
        <div ref={chartContainerRef} className="w-full h-[450px]" />
      </div>
    </div>
  );
}