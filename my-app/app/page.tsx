"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import TradingChart from "@/components/TradingChart";
import TradePanel from "@/components/TradePanel";
import { BarChart2, BookOpen, ArrowLeftRight, Clock } from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"openOrders" | "orderHistory" | "tradeHistory" | "funds">("openOrders");
  // Mobile main tab: 'chart' | 'orderbook' | 'trade'
  const [mobileTab, setMobileTab] = useState<"chart" | "orderbook" | "trade">("chart");

  // Order Book Data
  const sellOrders = [
    { price: 70550, amount: "1.245" },
    { price: 70540, amount: "0.892" },
    { price: 70520, amount: "2.450" },
    { price: 70510, amount: "0.120" },
    { price: 70505, amount: "0.450" },
  ];

  const buyOrders = [
    { price: 70495, amount: "0.750" },
    { price: 70480, amount: "1.120" },
    { price: 70475, amount: "3.335" },
    { price: 70460, amount: "0.200" },
    { price: 70450, amount: "0.950" },
  ];

  return (
    <main className="min-h-screen bg-slate-950 font-sans text-slate-100 flex flex-col pb-16 lg:pb-0">
      <Navbar />
      
      {/* Container Utam (Desktop Grid / Mobile Tabbed) */}
      <div className="flex-1 w-full p-2 sm:p-3 grid grid-cols-1 lg:grid-cols-12 gap-2.5 max-w-[1920px] mx-auto">
        
        {/* ORDER BOOK (Mobile: Muncul saat tab Order Book aktif | Desktop: Kolom Kiri) */}
        <div className={`lg:col-span-3 xl:col-span-2 bg-slate-900/90 rounded-xl border border-slate-800/80 p-3 flex flex-col min-h-[450px] lg:h-[calc(100vh-85px)] ${
          mobileTab === "orderbook" ? "flex" : "hidden lg:flex"
        }`}>
           <h3 className="text-xs font-bold text-slate-300 mb-3 uppercase tracking-wider flex items-center justify-between">
             <span>Order Book</span>
             <span className="text-[10px] text-blue-400 font-normal">BTC/USDT</span>
           </h3>
           
           <div className="flex justify-between text-[11px] text-slate-500 mb-2 px-1 font-medium">
             <span>Harga (USDT)</span>
             <span>Jml (BTC)</span>
           </div>
           
           {/* Sell (Rose) */}
           <div className="space-y-[2px] flex-1 overflow-hidden">
             {[...sellOrders].reverse().map((order, i) => (
               <div key={`sell-${i}`} className="flex justify-between text-xs hover:bg-slate-800/80 px-1.5 py-1 rounded transition relative group overflow-hidden">
                 <div className="absolute right-0 top-0 h-full bg-rose-500/10 group-hover:bg-rose-500/20" style={{ width: `${Math.min((Number(order.amount) / 3) * 100, 100)}%` }}></div>
                 <span className="text-rose-400 font-mono relative z-10 font-medium">{order.price.toLocaleString()}</span>
                 <span className="text-slate-300 font-mono relative z-10">{order.amount}</span>
               </div>
             ))}
           </div>
           
           <div className="my-2 py-2 border-y border-slate-800/80 flex items-center justify-center gap-3 bg-slate-950/40 rounded-lg">
             <span className="text-base font-black text-blue-400 font-mono">70,500.00</span>
             <span className="text-xs text-slate-400 font-mono">$70,500.00</span>
           </div>
           
           {/* Buy (Blue) */}
           <div className="space-y-[2px] flex-1 overflow-hidden">
             {buyOrders.map((order, i) => (
               <div key={`buy-${i}`} className="flex justify-between text-xs hover:bg-slate-800/80 px-1.5 py-1 rounded transition relative group overflow-hidden">
                 <div className="absolute right-0 top-0 h-full bg-blue-500/10 group-hover:bg-blue-500/20" style={{ width: `${Math.min((Number(order.amount) / 3) * 100, 100)}%` }}></div>
                 <span className="text-blue-400 font-mono relative z-10 font-medium">{order.price.toLocaleString()}</span>
                 <span className="text-slate-300 font-mono relative z-10">{order.amount}</span>
               </div>
             ))}
           </div>
        </div>

        {/* CHART & ORDERS (Mobile: Muncul saat tab Chart aktif | Desktop: Kolom Tengah) */}
        <div className={`lg:col-span-6 xl:col-span-7 flex-col gap-2.5 lg:h-[calc(100vh-85px)] overflow-hidden ${
          mobileTab === "chart" ? "flex" : "hidden lg:flex"
        }`}>
          {/* Chart */}
          <div className="flex-none">
            <TradingChart />
          </div>
          
          {/* Orders Panel */}
          <div className="flex-1 bg-slate-900/90 backdrop-blur-md rounded-xl border border-slate-800/80 shadow-xl flex flex-col overflow-hidden min-h-[250px]">
            <div className="flex gap-4 sm:gap-6 px-3 sm:px-4 pt-3 border-b border-slate-800/80 text-xs sm:text-sm font-medium bg-slate-950/30 overflow-x-auto whitespace-nowrap">
              {[
                { id: "openOrders", label: "Open Orders (1)" },
                { id: "orderHistory", label: "Order History" },
                { id: "tradeHistory", label: "Trade History" },
                { id: "funds", label: "Funds" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`pb-2.5 transition relative ${
                    activeTab === tab.id 
                      ? "text-blue-400 font-semibold border-b-2 border-blue-400" 
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-3 sm:p-4 overflow-x-auto flex-1">
              {activeTab === "openOrders" && (
                <table className="w-full text-left text-xs min-w-[500px]">
                  <thead className="text-slate-500 border-b border-slate-800/60">
                    <tr>
                      <th className="pb-2 font-medium">Tanggal</th>
                      <th className="pb-2 font-medium">Pair</th>
                      <th className="pb-2 font-medium">Tipe</th>
                      <th className="pb-2 font-medium">Sisi</th>
                      <th className="pb-2 font-medium">Harga</th>
                      <th className="pb-2 font-medium">Jumlah</th>
                      <th className="pb-2 font-medium text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-300 divide-y divide-slate-800/40">
                    <tr className="hover:bg-slate-800/40 transition">
                      <td className="py-2.5 font-mono text-slate-400">14:30:22</td>
                      <td className="font-bold text-white">BTC/USDT</td>
                      <td>Limit</td>
                      <td className="text-blue-400 font-bold">Buy</td>
                      <td className="font-mono">70,000.00</td>
                      <td className="font-mono">0.500 BTC</td>
                      <td className="text-right">
                        <button 
                          onClick={() => alert("Order dibatalkan!")}
                          className="px-2 py-0.5 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 rounded transition font-medium"
                        >
                          Batalkan
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              )}

              {activeTab === "orderHistory" && (
                <p className="text-slate-500 text-xs text-center py-6">Belum ada riwayat order.</p>
              )}
              {activeTab === "tradeHistory" && (
                <p className="text-slate-500 text-xs text-center py-6">Belum ada riwayat eksekusi trade.</p>
              )}
              {activeTab === "funds" && (
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between p-2 bg-slate-950/60 rounded border border-slate-800">
                    <span className="text-slate-400">USDT Available</span>
                    <span className="font-mono font-bold text-white">12,450.00 USDT</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* TRADE PANEL (Mobile: Muncul saat tab Trade aktif | Desktop: Kolom Kanan) */}
        <div className={`lg:col-span-3 xl:col-span-3 lg:h-[calc(100vh-85px)] ${
          mobileTab === "trade" ? "block" : "hidden lg:block"
        }`}>
          <TradePanel />
        </div>

      </div>

      {/* MOBILE BOTTOM NAVIGATION BAR (Khusus Tampilan HP) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-lg border-t border-slate-800/80 flex items-center justify-around py-2 px-1 lg:hidden">
        <button
          onClick={() => setMobileTab("chart")}
          className={`flex flex-col items-center gap-1 text-[11px] transition ${
            mobileTab === "chart" ? "text-blue-400 font-semibold" : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <BarChart2 size={18} />
          <span>Chart</span>
        </button>

        <button
          onClick={() => setMobileTab("orderbook")}
          className={`flex flex-col items-center gap-1 text-[11px] transition ${
            mobileTab === "orderbook" ? "text-blue-400 font-semibold" : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <BookOpen size={18} />
          <span>Order Book</span>
        </button>

        <button
          onClick={() => setMobileTab("trade")}
          className={`flex flex-col items-center gap-1 text-[11px] transition ${
            mobileTab === "trade" ? "text-blue-400 font-semibold" : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <ArrowLeftRight size={18} />
          <span>Trade</span>
        </button>
      </div>
    </main>
  );
}