"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import TradingChart from "@/components/TradingChart";
import TradePanel from "@/components/TradePanel";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"openOrders" | "orderHistory" | "tradeHistory" | "funds">("openOrders");
  const [selectedPrice, setSelectedPrice] = useState<number>(70500);

  // Order Book & Riwayat Trade Data (Statis/Dummy)
  const sellOrders = [
    { price: 70550, amount: "1.245", total: "87,834" },
    { price: 70540, amount: "0.892", total: "62,921" },
    { price: 70520, amount: "2.450", total: "172,774" },
    { price: 70510, amount: "0.120", total: "8,461" },
    { price: 70505, amount: "0.450", total: "31,727" },
  ];

  const buyOrders = [
    { price: 70495, amount: "0.750", total: "52,871" },
    { price: 70480, amount: "1.120", total: "78,937" },
    { price: 70475, amount: "3.335", total: "235,033" },
    { price: 70460, amount: "0.200", total: "14,092" },
    { price: 70450, amount: "0.950", total: "66,927" },
  ];

  return (
    <main className="min-h-screen bg-slate-950 font-sans selection:bg-blue-500/30 text-sm flex flex-col">
      <Navbar />
      
      {/* 
        Sistem Pro Grid:
        Kiri: Order Book
        Tengah: Chart & Open Orders
        Kanan: Trade Panel
      */}
      <div className="flex-1 w-full p-2.5 grid grid-cols-1 lg:grid-cols-12 gap-2.5 max-w-[1920px] mx-auto">
        
        {/* KOLOM KIRI (Order Book) */}
        <div className="lg:col-span-3 xl:col-span-2 bg-slate-900/90 backdrop-blur-md rounded-xl border border-slate-800/80 shadow-xl p-3 flex flex-col h-[calc(100vh-85px)]">
           <h3 className="text-xs font-bold text-slate-300 mb-3 uppercase tracking-wider flex items-center justify-between">
             <span>Order Book</span>
             <span className="text-[10px] text-blue-400 font-normal">Klik harga untuk isi</span>
           </h3>
           
           <div className="flex justify-between text-[11px] text-slate-500 mb-2 px-1 font-medium">
             <span>Harga (USDT)</span>
             <span>Jml (BTC)</span>
           </div>
           
           {/* Sell (Rose) */}
           <div className="space-y-[2px] flex-1 overflow-hidden">
             {[...sellOrders].reverse().map((order, i) => (
               <div 
                 key={`sell-${i}`} 
                 onClick={() => setSelectedPrice(order.price)}
                 className="flex justify-between text-xs cursor-pointer hover:bg-slate-800/80 px-1.5 py-1 rounded transition relative group overflow-hidden"
               >
                 <div className="absolute right-0 top-0 h-full bg-rose-500/10 group-hover:bg-rose-500/20 transition" style={{ width: `${Math.min((Number(order.amount) / 3) * 100, 100)}%` }}></div>
                 <span className="text-rose-400 font-mono relative z-10 font-medium">{order.price.toLocaleString()}</span>
                 <span className="text-slate-300 font-mono relative z-10">{order.amount}</span>
               </div>
             ))}
           </div>
           
           <div className="my-2.5 py-2.5 border-y border-slate-800/80 flex items-center justify-center gap-3 bg-slate-950/40 rounded-lg">
             <span className="text-base font-black text-blue-400 font-mono">70,500.00</span>
             <span className="text-xs text-slate-400 font-mono">$70,500.00</span>
           </div>
           
           {/* Buy (Blue) */}
           <div className="space-y-[2px] flex-1 overflow-hidden">
             {buyOrders.map((order, i) => (
               <div 
                 key={`buy-${i}`} 
                 onClick={() => setSelectedPrice(order.price)}
                 className="flex justify-between text-xs cursor-pointer hover:bg-slate-800/80 px-1.5 py-1 rounded transition relative group overflow-hidden"
               >
                 <div className="absolute right-0 top-0 h-full bg-blue-500/10 group-hover:bg-blue-500/20 transition" style={{ width: `${Math.min((Number(order.amount) / 3) * 100, 100)}%` }}></div>
                 <span className="text-blue-400 font-mono relative z-10 font-medium">{order.price.toLocaleString()}</span>
                 <span className="text-slate-300 font-mono relative z-10">{order.amount}</span>
               </div>
             ))}
           </div>
        </div>

        {/* KOLOM TENGAH (Chart & Tables) */}
        <div className="lg:col-span-6 xl:col-span-7 flex flex-col gap-2.5 h-[calc(100vh-85px)] overflow-hidden">
          {/* Bagian Atas: Chart */}
          <div className="flex-none">
            <TradingChart />
          </div>
          
          {/* Bagian Bawah: Tabs Panel Interaktif */}
          <div className="flex-1 bg-slate-900/90 backdrop-blur-md rounded-xl border border-slate-800/80 shadow-xl flex flex-col overflow-hidden">
            <div className="flex gap-6 px-4 pt-3 border-b border-slate-800/80 text-sm font-medium bg-slate-950/30">
              {[
                { id: "openOrders", label: "Open Orders (1)" },
                { id: "orderHistory", label: "Order History" },
                { id: "tradeHistory", label: "Trade History" },
                { id: "funds", label: "Funds" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`pb-2.5 transition relative text-xs sm:text-sm ${
                    activeTab === tab.id 
                      ? "text-blue-400 font-semibold border-b-2 border-blue-400" 
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-4 overflow-auto flex-1">
              {activeTab === "openOrders" && (
                <table className="w-full text-left text-xs">
                  <thead className="text-slate-500 border-b border-slate-800/60">
                    <tr>
                      <th className="pb-3 font-medium">Tanggal</th>
                      <th className="pb-3 font-medium">Pair</th>
                      <th className="pb-3 font-medium">Tipe</th>
                      <th className="pb-3 font-medium">Sisi</th>
                      <th className="pb-3 font-medium">Harga</th>
                      <th className="pb-3 font-medium">Jumlah</th>
                      <th className="pb-3 font-medium text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-300 divide-y divide-slate-800/40">
                    <tr className="hover:bg-slate-800/40 transition">
                      <td className="py-3 font-mono text-slate-400">2026-10-13 14:30</td>
                      <td className="font-bold text-white">BTC/USDT</td>
                      <td>Limit</td>
                      <td className="text-blue-400 font-bold">Buy</td>
                      <td className="font-mono">70,000.00</td>
                      <td className="font-mono">0.500 BTC</td>
                      <td className="text-right">
                        <button 
                          onClick={() => alert("Order dibatalkan!")}
                          className="px-2.5 py-1 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 rounded transition font-medium"
                        >
                          Batalkan
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              )}

              {activeTab === "orderHistory" && (
                <div className="flex flex-col items-center justify-center h-full text-slate-500 py-8">
                  <p>Belum ada riwayat order aktif.</p>
                </div>
              )}

              {activeTab === "tradeHistory" && (
                <div className="flex flex-col items-center justify-center h-full text-slate-500 py-8">
                  <p>Belum ada riwayat transaksi.</p>
                </div>
              )}

              {activeTab === "funds" && (
                <div className="flex flex-col gap-2 text-slate-300">
                  <div className="flex justify-between p-2.5 bg-slate-950/60 rounded-lg border border-slate-800/60">
                    <span className="text-slate-400">USDT Balance</span>
                    <span className="font-mono font-bold text-white">12,450.00 USDT</span>
                  </div>
                  <div className="flex justify-between p-2.5 bg-slate-950/60 rounded-lg border border-slate-800/60">
                    <span className="text-slate-400">BTC Balance</span>
                    <span className="font-mono font-bold text-white">0.8540 BTC</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* KOLOM KANAN (Trade Panel) */}
        <div className="lg:col-span-3 xl:col-span-3 h-[calc(100vh-85px)]">
          <TradePanel />
        </div>

      </div>
    </main>
  );
}