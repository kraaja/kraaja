"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import TradingChart from "@/components/TradingChart";
import TradePanel from "@/components/TradePanel";
import { BarChart2, BookOpen, ArrowLeftRight, Lock, Mail, User as UserIcon, LogOut, ShieldCheck } from "lucide-react";

interface Order {
  id: string;
  time: string;
  pair: string;
  type: string;
  side: "Buy" | "Sell";
  price: number;
  amount: number;
}

export default function Home() {
  // Sistem Auth State
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("Kraa");

  // Saldo & Market State
  const [balanceUSDT, setBalanceUSDT] = useState<number>(12450.00);
  const [balanceBTC, setBalanceBTC] = useState<number>(0.5420);
  const [currentPrice, setCurrentPrice] = useState<number>(70500.00);
  const [priceChange, setPriceChange] = useState({ amount: 1300.00, percent: 1.87 });

  // Order Book & Engine Lists
  const [selectedPrice, setSelectedPrice] = useState<number>(70500);
  const [openOrders, setOpenOrders] = useState<Order[]>([]);
  const [orderHistory, setOrderHistory] = useState<Order[]>([]);
  const [tradeHistory, setTradeHistory] = useState<Order[]>([]);

  // Navigation Tabs
  const [activeTab, setActiveTab] = useState<"openOrders" | "orderHistory" | "tradeHistory" | "funds">("openOrders");
  const [mobileTab, setMobileTab] = useState<"chart" | "orderbook" | "trade">("chart");

  // Handler Login / Register
  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Harap masukkan email dan password!");
      return;
    }
    setIsLoggedIn(true);
    if (authMode === "register") {
      alert("Akun berhasil didaftarkan! Selamat datang di KraaTrade.");
    } else {
      alert("Login berhasil!");
    }
  };

  const handleDemoLogin = () => {
    setEmail("kraa@trader.com");
    setPassword("password123");
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail("");
    setPassword("");
  };

  // Simulasi WebSocket Live Price Ticker & Order Matching Engine
  useEffect(() => {
    if (!isLoggedIn) return;

    const interval = setInterval(() => {
      setCurrentPrice((prevPrice) => {
        const fluctuation = (Math.random() - 0.48) * 30;
        const newPrice = Number((prevPrice + fluctuation).toFixed(2));
        
        setPriceChange(pc => ({
          amount: pc.amount + fluctuation,
          percent: Number(((pc.amount + fluctuation) / 70000 * 100).toFixed(2))
        }));

        setOpenOrders((currentOrders) => {
          const remainingOrders: Order[] = [];
          
          currentOrders.forEach((order) => {
            let executed = false;
            if (order.side === "Buy" && newPrice <= order.price) {
              executed = true;
            } else if (order.side === "Sell" && newPrice >= order.price) {
              executed = true;
            }

            if (executed) {
              if (order.side === "Buy") {
                setBalanceBTC(b => b + order.amount);
              } else {
                setBalanceUSDT(u => u + (order.amount * order.price));
              }
              setTradeHistory(th => [order, ...th]);
            } else {
              remainingOrders.push(order);
            }
          });

          return remainingOrders;
        });

        return newPrice;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [isLoggedIn]);

  // Fungsi Place Order
  const handlePlaceOrder = (type: "buy" | "sell", mode: "limit" | "market" | "stop", price: number, amount: number) => {
    const side = type === "buy" ? "Buy" : "Sell";
    const now = new Date().toLocaleTimeString();
    
    if (mode === "market") {
      if (side === "Buy") {
        const cost = price * amount;
        if (cost > balanceUSDT) {
          alert("Saldo USDT tidak cukup!");
          return;
        }
        setBalanceUSDT(u => u - cost);
        setBalanceBTC(b => b + amount);
      } else {
        if (amount > balanceBTC) {
          alert("Saldo BTC tidak cukup!");
          return;
        }
        setBalanceBTC(b => b - amount);
        setBalanceUSDT(u => u + (amount * price));
      }

      const executedOrder: Order = {
        id: Math.random().toString(36).substring(2, 9),
        time: now,
        pair: "BTC/USDT",
        type: "Market",
        side,
        price,
        amount
      };

      setTradeHistory(th => [executedOrder, ...th]);
      alert(`Order Market ${side} ${amount} BTC berhasil dieksekusi instan!`);
    } else {
      if (side === "Buy") {
        const cost = price * amount;
        if (cost > balanceUSDT) {
          alert("Saldo USDT tidak cukup untuk pasang Limit Order!");
          return;
        }
        setBalanceUSDT(u => u - cost);
      } else {
        if (amount > balanceBTC) {
          alert("Saldo BTC tidak cukup untuk pasang Limit Order!");
          return;
        }
        setBalanceBTC(b => b - amount);
      }

      const newOrder: Order = {
        id: Math.random().toString(36).substring(2, 9),
        time: now,
        pair: "BTC/USDT",
        type: "Limit",
        side,
        price,
        amount
      };

      setOpenOrders(o => [newOrder, ...o]);
      setOrderHistory(oh => [newOrder, ...oh]);
      alert(`Limit Order ${side} berhasil dipasang di harga ${price.toLocaleString()} USDT!`);
    }
  };

  const handleCancelOrder = (order: Order) => {
    setOpenOrders(o => o.filter(item => item.id !== order.id));
    if (order.side === "Buy") {
      setBalanceUSDT(u => u + (order.price * order.amount));
    } else {
      setBalanceBTC(b => b + order.amount);
    }
    alert("Order berhasil dibatalkan dan dana dikembalikan.");
  };

  const sellOrders = [
    { price: currentPrice + 50, amount: "1.245" },
    { price: currentPrice + 40, amount: "0.892" },
    { price: currentPrice + 25, amount: "2.450" },
    { price: currentPrice + 10, amount: "0.120" },
    { price: currentPrice + 5, amount: "0.450" },
  ];

  const buyOrders = [
    { price: currentPrice - 5, amount: "0.750" },
    { price: currentPrice - 15, amount: "1.120" },
    { price: currentPrice - 25, amount: "3.335" },
    { price: currentPrice - 40, amount: "0.200" },
    { price: currentPrice - 55, amount: "0.950" },
  ];

  // JIKA BELUM LOGIN: TAMPILKAN HALAMAN LOGIN / REGISTER EKSKLUSIF
  if (!isLoggedIn) {
    return (
      <main className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 selection:bg-blue-500/30">
        <div className="w-full max-w-md bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl p-8 space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-black tracking-wider text-white">
              KRAA<span className="text-blue-500">TRADE</span>
            </h1>
            <p className="text-xs text-slate-400">Platform Bursa Kripto Profesional & Real-time Simulasi</p>
          </div>

          {/* Toggle Login / Register */}
          <div className="grid grid-cols-2 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
            <button
              onClick={() => setAuthMode("login")}
              className={`py-2 rounded-lg transition ${authMode === "login" ? "bg-blue-600 text-white shadow-md" : "text-slate-400 hover:text-white"}`}
            >
              Masuk
            </button>
            <button
              onClick={() => setAuthMode("register")}
              className={`py-2 rounded-lg transition ${authMode === "register" ? "bg-blue-600 text-white shadow-md" : "text-slate-400 hover:text-white"}`}
            >
              Daftar
            </button>
          </div>

          <form onSubmit={handleAuthSubmit} className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="text-slate-400">Email</label>
              <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 focus-within:border-blue-500 transition">
                <Mail size={16} className="text-slate-500 mr-2.5" />
                <input 
                  type="email" 
                  placeholder="nama@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent outline-none w-full text-white text-sm"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-slate-400">Password</label>
              <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 focus-within:border-blue-500 transition">
                <Lock size={16} className="text-slate-500 mr-2.5" />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-transparent outline-none w-full text-white text-sm"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold text-sm shadow-lg shadow-blue-500/25 transition active:scale-[0.98]"
            >
              {authMode === "login" ? "Masuk ke Akun" : "Buat Akun Baru"}
            </button>
          </form>

          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-slate-800"></div>
            <span className="flex-shrink mx-4 text-slate-500 text-[11px]">ATAU</span>
            <div className="flex-grow border-t border-slate-800"></div>
          </div>

          <button
            onClick={handleDemoLogin}
            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition flex items-center justify-center gap-2"
          >
            <ShieldCheck size={16} className="text-blue-400" />
            Masuk Cepat Mode Demo (Instan)
          </button>
        </div>
      </main>
    );
  }

  // JIKA SUDAH LOGIN: TAMPILKAN TERMINAL TRADING UTAMA
  return (
    <main className="min-h-screen bg-slate-950 font-sans text-slate-100 flex flex-col pb-16 lg:pb-0">
      <Navbar balanceUSDT={balanceUSDT} balanceBTC={balanceBTC} currentPrice={currentPrice} />
      
      <div className="flex justify-end px-4 pt-2 bg-slate-950">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 bg-slate-900 border border-slate-800 px-3 py-1 rounded-lg transition"
        >
          <LogOut size={14} />
          <span>Keluar ({email || username})</span>
        </button>
      </div>

      <div className="flex-1 w-full p-2 sm:p-3 grid grid-cols-1 lg:grid-cols-12 gap-2.5 max-w-[1920px] mx-auto">
        
        {/* ORDER BOOK */}
        <div className={`lg:col-span-3 xl:col-span-2 bg-slate-900/90 rounded-xl border border-slate-800/80 p-3 flex flex-col min-h-[450px] lg:h-[calc(100vh-120px)] ${
          mobileTab === "orderbook" ? "flex" : "hidden lg:flex"
        }`}>
           <h3 className="text-xs font-bold text-slate-300 mb-3 uppercase tracking-wider flex items-center justify-between">
             <span>Order Book</span>
             <span className="text-[10px] text-blue-400 font-normal">Klik harga isi otomatis</span>
           </h3>
           
           <div className="flex justify-between text-[11px] text-slate-500 mb-2 px-1 font-medium">
             <span>Harga (USDT)</span>
             <span>Jml (BTC)</span>
           </div>
           
           <div className="space-y-[2px] flex-1 overflow-hidden">
             {[...sellOrders].reverse().map((order, i) => (
               <div 
                 key={`sell-${i}`} 
                 onClick={() => setSelectedPrice(order.price)}
                 className="flex justify-between text-xs cursor-pointer hover:bg-slate-800/80 px-1.5 py-1 rounded transition relative group overflow-hidden"
               >
                 <div className="absolute right-0 top-0 h-full bg-rose-500/10 group-hover:bg-rose-500/20" style={{ width: `${Math.min((Number(order.amount) / 3) * 100, 100)}%` }}></div>
                 <span className="text-rose-400 font-mono relative z-10 font-medium">{order.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                 <span className="text-slate-300 font-mono relative z-10">{order.amount}</span>
               </div>
             ))}
           </div>
           
           <div className="my-2 py-2.5 border-y border-slate-800/80 flex items-center justify-center gap-3 bg-slate-950/40 rounded-lg">
             <span className="text-base font-black text-blue-400 font-mono">
               {currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}
             </span>
           </div>
           
           <div className="space-y-[2px] flex-1 overflow-hidden">
             {buyOrders.map((order, i) => (
               <div 
                 key={`buy-${i}`} 
                 onClick={() => setSelectedPrice(order.price)}
                 className="flex justify-between text-xs cursor-pointer hover:bg-slate-800/80 px-1.5 py-1 rounded transition relative group overflow-hidden"
               >
                 <div className="absolute right-0 top-0 h-full bg-blue-500/10 group-hover:bg-blue-500/20" style={{ width: `${Math.min((Number(order.amount) / 3) * 100, 100)}%` }}></div>
                 <span className="text-blue-400 font-mono relative z-10 font-medium">{order.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                 <span className="text-slate-300 font-mono relative z-10">{order.amount}</span>
               </div>
             ))}
           </div>
        </div>

        {/* CHART & TABLES */}
        <div className={`lg:col-span-6 xl:col-span-7 flex-col gap-2.5 lg:h-[calc(100vh-120px)] overflow-hidden ${
          mobileTab === "chart" ? "flex" : "hidden lg:flex"
        }`}>
          <div className="flex-none">
            <TradingChart currentPrice={currentPrice} priceChange24h={priceChange} />
          </div>
          
          <div className="flex-1 bg-slate-900/95 backdrop-blur-md rounded-xl border border-slate-800/80 shadow-xl flex flex-col overflow-hidden min-h-[250px]">
            <div className="flex gap-4 sm:gap-6 px-3 sm:px-4 pt-3 border-b border-slate-800/80 text-xs sm:text-sm font-medium bg-slate-950/30 overflow-x-auto whitespace-nowrap">
              {[
                { id: "openOrders", label: `Open Orders (${openOrders.length})` },
                { id: "orderHistory", label: "Order History" },
                { id: "tradeHistory", label: `Trade History (${tradeHistory.length})` },
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
                openOrders.length === 0 ? (
                  <p className="text-slate-500 text-xs text-center py-6">Tidak ada open order aktif.</p>
                ) : (
                  <table className="w-full text-left text-xs min-w-[500px]">
                    <thead className="text-slate-500 border-b border-slate-800/60">
                      <tr>
                        <th className="pb-2 font-medium">Waktu</th>
                        <th className="pb-2 font-medium">Pair</th>
                        <th className="pb-2 font-medium">Tipe</th>
                        <th className="pb-2 font-medium">Sisi</th>
                        <th className="pb-2 font-medium">Harga</th>
                        <th className="pb-2 font-medium">Jumlah</th>
                        <th className="pb-2 font-medium text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-300 divide-y divide-slate-800/40">
                      {openOrders.map((ord) => (
                        <tr key={ord.id} className="hover:bg-slate-800/40 transition">
                          <td className="py-2.5 font-mono text-slate-400">{ord.time}</td>
                          <td className="font-bold text-white">{ord.pair}</td>
                          <td>{ord.type}</td>
                          <td className={`font-bold ${ord.side === "Buy" ? "text-blue-400" : "text-rose-400"}`}>{ord.side}</td>
                          <td className="font-mono">{ord.price.toLocaleString()}</td>
                          <td className="font-mono">{ord.amount} BTC</td>
                          <td className="text-right">
                            <button 
                              onClick={() => handleCancelOrder(ord)}
                              className="px-2 py-0.5 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 rounded transition font-medium"
                            >
                              Batalkan
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )
              )}

              {activeTab === "orderHistory" && (
                orderHistory.length === 0 ? (
                  <p className="text-slate-500 text-xs text-center py-6">Belum ada riwayat order.</p>
                ) : (
                  <table className="w-full text-left text-xs min-w-[500px]">
                    <thead className="text-slate-500 border-b border-slate-800/60">
                      <tr>
                        <th className="pb-2 font-medium">Waktu</th>
                        <th className="pb-2 font-medium">Pair</th>
                        <th className="pb-2 font-medium">Sisi</th>
                        <th className="pb-2 font-medium">Harga</th>
                        <th className="pb-2 font-medium">Jumlah</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-300 divide-y divide-slate-800/40">
                      {orderHistory.map((ord) => (
                        <tr key={ord.id}>
                          <td className="py-2 font-mono text-slate-400">{ord.time}</td>
                          <td>{ord.pair}</td>
                          <td className={ord.side === "Buy" ? "text-blue-400" : "text-rose-400"}>{ord.side}</td>
                          <td className="font-mono">{ord.price.toLocaleString()}</td>
                          <td className="font-mono">{ord.amount} BTC</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )
              )}

              {activeTab === "tradeHistory" && (
                tradeHistory.length === 0 ? (
                  <p className="text-slate-500 text-xs text-center py-6">Belum ada transaksi tereksekusi.</p>
                ) : (
                  <table className="w-full text-left text-xs min-w-[500px]">
                    <thead className="text-slate-500 border-b border-slate-800/60">
                      <tr>
                        <th className="pb-2 font-medium">Waktu</th>
                        <th className="pb-2 font-medium">Sisi</th>
                        <th className="pb-2 font-medium">Harga Eksekusi</th>
                        <th className="pb-2 font-medium">Jumlah</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-300 divide-y divide-slate-800/40">
                      {tradeHistory.map((ord) => (
                        <tr key={ord.id}>
                          <td className="py-2 font-mono text-slate-400">{ord.time}</td>
                          <td className={`font-bold ${ord.side === "Buy" ? "text-blue-400" : "text-rose-400"}`}>{ord.side} Tereksekusi</td>
                          <td className="font-mono">{ord.price.toLocaleString()} USDT</td>
                          <td className="font-mono">{ord.amount} BTC</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )
              )}

              {activeTab === "funds" && (
                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between p-3 bg-slate-950/60 rounded-lg border border-slate-800">
                    <span className="text-slate-400">USDT Balance</span>
                    <span className="font-mono font-bold text-white text-sm">{balanceUSDT.toLocaleString(undefined, { minimumFractionDigits: 2 })} USDT</span>
                  </div>
                  <div className="flex justify-between p-3 bg-slate-950/60 rounded-lg border border-slate-800">
                    <span className="text-slate-400">BTC Balance</span>
                    <span className="font-mono font-bold text-white text-sm">{balanceBTC.toFixed(4)} BTC</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* TRADE PANEL */}
        <div className={`lg:col-span-3 xl:col-span-3 lg:h-[calc(100vh-120px)] ${
          mobileTab === "trade" ? "block" : "hidden lg:block"
        }`}>
          <TradePanel 
            balanceUSDT={balanceUSDT}
            balanceBTC={balanceBTC}
            currentPrice={currentPrice}
            selectedPrice={selectedPrice}
            onPlaceOrder={handlePlaceOrder}
          />
        </div>

      </div>

      {/* MOBILE BOTTOM NAVIGATION */}
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