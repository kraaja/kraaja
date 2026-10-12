"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import TradingChart from "@/components/TradingChart";
import TradePanel from "@/components/TradePanel";
import { BarChart2, BookOpen, ArrowLeftRight, Lock, Mail, User as UserIcon, ShieldCheck, X, CheckCircle2, AlertCircle, Search, ArrowDownRight, ArrowUpRight } from "lucide-react";

interface Order {
  id: string;
  time: string;
  pair: string;
  type: string;
  side: "Buy" | "Sell";
  price: number;
  amount: number;
}

interface PublicTrade {
  id: string;
  time: string;
  price: number;
  amount: string;
  side: "Buy" | "Sell";
}

const MARKET_PAIRS = [
  { pair: "BTC/USDT", price: 70500.00, change: 1.87 },
  { pair: "ETH/USDT", price: 3850.50, change: 2.45 },
  { pair: "SOL/USDT", price: 185.20, change: -0.92 },
  { pair: "XRP/USDT", price: 2.45, change: 4.12 },
  { pair: "ADA/USDT", price: 0.85, change: 1.10 },
];

export default function Home() {
  // Toast Notification State
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  // Auth & Profile State
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("KraaTrader");
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [newUsername, setNewUsername] = useState<string>("");

  // Modals State
  const [isMarketModalOpen, setIsMarketModalOpen] = useState<boolean>(false);
  const [walletModalType, setWalletModalType] = useState<'deposit' | 'withdraw' | null>(null);
  const [walletAmount, setWalletAmount] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Market & Trading State
  const [currentPair, setCurrentPair] = useState<string>("BTC/USDT");
  const [currentPrice, setCurrentPrice] = useState<number>(70500.00);
  const [priceChange, setPriceChange] = useState({ amount: 1300.00, percent: 1.87 });

  const [balanceUSDT, setBalanceUSDT] = useState<number>(12450.00);
  const [balanceBTC, setBalanceBTC] = useState<number>(0.5420);

  const [selectedPrice, setSelectedPrice] = useState<number>(70500);
  const [openOrders, setOpenOrders] = useState<Order[]>([]);
  const [orderHistory, setOrderHistory] = useState<Order[]>([]);
  const [tradeHistory, setTradeHistory] = useState<Order[]>([]);
  const [recentTrades, setRecentTrades] = useState<PublicTrade[]>([]);

  const [activeTab, setActiveTab] = useState<"openOrders" | "orderHistory" | "tradeHistory" | "funds">("openOrders");
  const [leftTab, setLeftTab] = useState<"orderbook" | "trades">("orderbook");
  const [mobileTab, setMobileTab] = useState<"chart" | "orderbook" | "trade">("chart");

  // Cek Sesi Sembunyian Lokal
  useEffect(() => {
    const savedSession = localStorage.getItem("kraa_session");
    if (savedSession) {
      const userData = JSON.parse(savedSession);
      setEmail(userData.email);
      setUsername(userData.username);
      setIsLoggedIn(true);
      setNewUsername(userData.username);
    }
  }, []);

  // Auth Handler
  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      showNotification("Harap masukkan email dan password!", "error");
      return;
    }

    const storedUsers = JSON.parse(localStorage.getItem("kraa_users") || "[]");

    if (authMode === "register") {
      const existingUser = storedUsers.find((u: any) => u.email === email);
      if (existingUser) {
        showNotification("Email sudah terdaftar! Silakan masuk.", "error");
        setAuthMode("login");
        return;
      }

      const defaultUsername = email.split("@")[0];
      const newUser = { email, password, username: defaultUsername };
      storedUsers.push(newUser);
      localStorage.setItem("kraa_users", JSON.stringify(storedUsers));
      
      localStorage.setItem("kraa_session", JSON.stringify(newUser));
      setUsername(defaultUsername);
      setNewUsername(defaultUsername);
      setIsLoggedIn(true);
      showNotification("Registrasi berhasil! Selamat datang.", "success");
    } else {
      const foundUser = storedUsers.find((u: any) => u.email === email && u.password === password);
      if (!foundUser) {
        showNotification("Email atau password salah!", "error");
        return;
      }

      localStorage.setItem("kraa_session", JSON.stringify(foundUser));
      setUsername(foundUser.username);
      setNewUsername(foundUser.username);
      setIsLoggedIn(true);
      showNotification("Login berhasil!", "success");
    }
  };

  const handleDemoLogin = () => {
    const demoUser = { email: "demo@kraa.com", password: "123", username: "KraaPro" };
    const storedUsers = JSON.parse(localStorage.getItem("kraa_users") || "[]");
    if (!storedUsers.some((u: any) => u.email === demoUser.email)) {
      storedUsers.push(demoUser);
      localStorage.setItem("kraa_users", JSON.stringify(storedUsers));
    }
    localStorage.setItem("kraa_session", JSON.stringify(demoUser));
    setEmail(demoUser.email);
    setUsername(demoUser.username);
    setNewUsername(demoUser.username);
    setIsLoggedIn(true);
    showNotification("Masuk mode demo berhasil!", "success");
  };

  const handleLogout = () => {
    localStorage.removeItem("kraa_session");
    setIsLoggedIn(false);
    setEmail("");
    setPassword("");
    showNotification("Berhasil keluar dari akun.", "info");
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUsername.trim()) {
      showNotification("Username tidak boleh kosong!", "error");
      return;
    }
    setUsername(newUsername);
    const session = JSON.parse(localStorage.getItem("kraa_session") || "{}");
    session.username = newUsername;
    localStorage.setItem("kraa_session", JSON.stringify(session));
    setIsProfileOpen(false);
    showNotification("Profil berhasil diperbarui!", "success");
  };

  // Wallet Deposit & Withdraw Handler
  const handleWalletSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(walletAmount);
    if (!amt || amt <= 0) {
      showNotification("Masukkan nominal yang valid!", "error");
      return;
    }

    if (walletModalType === 'deposit') {
      setBalanceUSDT(b => b + amt);
      showNotification(`Berhasil deposit $${amt.toLocaleString()} USDT ke wallet!`, "success");
    } else {
      if (amt > balanceUSDT) {
        showNotification("Saldo USDT tidak mencukupi untuk penarikan!", "error");
        return;
      }
      setBalanceUSDT(b => b - amt);
      showNotification(`Berhasil menarik $${amt.toLocaleString()} USDT!`, "success");
    }

    setWalletModalType(null);
    setWalletAmount("");
  };

  // Simulasi Market Live Price Ticker & Matching Engine
  useEffect(() => {
    if (!isLoggedIn) return;

    const interval = setInterval(() => {
      setCurrentPrice((prevPrice) => {
        const fluctuation = (Math.random() - 0.49) * (prevPrice * 0.0004);
        const newPrice = Number((prevPrice + fluctuation).toFixed(2));
        
        setPriceChange(pc => ({
          amount: pc.amount + fluctuation,
          percent: Number(((pc.amount + fluctuation) / (prevPrice - pc.amount) * 100).toFixed(2))
        }));

        // Tambah Recent Public Trades secara live
        const nowStr = new Date().toLocaleTimeString();
        const sideRandom: "Buy" | "Sell" = Math.random() > 0.5 ? "Buy" : "Sell";
        const amtRandom = (Math.random() * 0.8 + 0.05).toFixed(4);
        setRecentTrades(rt => [{
          id: Math.random().toString(),
          time: nowStr,
          price: newPrice,
          amount: amtRandom,
          side: sideRandom
        }, ...rt.slice(0, 19)]);

        // Match Open Orders
        setOpenOrders((currentOrders) => {
          const remainingOrders: Order[] = [];
          currentOrders.forEach((order) => {
            let executed = false;
            if (order.side === "Buy" && newPrice <= order.price) executed = true;
            if (order.side === "Sell" && newPrice >= order.price) executed = true;

            if (executed) {
              if (order.side === "Buy") {
                setBalanceBTC(b => b + order.amount);
              } else {
                setBalanceUSDT(u => u + (order.amount * order.price));
              }
              setTradeHistory(th => [order, ...th]);
              showNotification(`Limit Order ${order.side} ${order.amount} tereksekusi!`, "success");
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

  const handlePlaceOrder = (type: "buy" | "sell", mode: "limit" | "market" | "stop", price: number, amount: number) => {
    const side = type === "buy" ? "Buy" : "Sell";
    const now = new Date().toLocaleTimeString();
    
    if (mode === "market") {
      const cost = price * amount;
      if (side === "Buy") {
        if (cost > balanceUSDT) {
          showNotification("Saldo USDT tidak cukup!", "error");
          return;
        }
        setBalanceUSDT(u => u - cost);
        setBalanceBTC(b => b + amount);
      } else {
        if (amount > balanceBTC) {
          showNotification("Saldo aset tidak cukup!", "error");
          return;
        }
        setBalanceBTC(b => b - amount);
        setBalanceUSDT(u => u + cost);
      }

      const executedOrder: Order = {
        id: Math.random().toString(36).substring(2, 9),
        time: now,
        pair: currentPair,
        type: "Market",
        side,
        price,
        amount
      };

      setTradeHistory(th => [executedOrder, ...th]);
      showNotification(`Order Market ${side} ${amount} berhasil dieksekusi!`, "success");
    } else {
      const cost = price * amount;
      if (side === "Buy" && cost > balanceUSDT) {
        showNotification("Saldo USDT tidak cukup untuk Limit Order!", "error");
        return;
      }
      if (side === "Sell" && amount > balanceBTC) {
        showNotification("Saldo aset tidak cukup untuk Limit Order!", "error");
        return;
      }

      if (side === "Buy") setBalanceUSDT(u => u - cost);
      else setBalanceBTC(b => b - amount);

      const newOrder: Order = {
        id: Math.random().toString(36).substring(2, 9),
        time: now,
        pair: currentPair,
        type: "Limit",
        side,
        price,
        amount
      };

      setOpenOrders(o => [newOrder, ...o]);
      setOrderHistory(oh => [newOrder, ...oh]);
      showNotification(`Limit Order ${side} dipasang di harga ${price.toLocaleString()} USDT`, "success");
    }
  };

  const handleCancelOrder = (order: Order) => {
    setOpenOrders(o => o.filter(item => item.id !== order.id));
    if (order.side === "Buy") setBalanceUSDT(u => u + (order.price * order.amount));
    else setBalanceBTC(b => b + order.amount);
    showNotification("Order dibatalkan & dana dikembalikan.", "info");
  };

  const sellOrders = [
    { price: currentPrice + 45, amount: "1.245" },
    { price: currentPrice + 30, amount: "0.892" },
    { price: currentPrice + 18, amount: "2.450" },
    { price: currentPrice + 8, amount: "0.120" },
    { price: currentPrice + 3, amount: "0.450" },
  ];

  const buyOrders = [
    { price: currentPrice - 3, amount: "0.750" },
    { price: currentPrice - 10, amount: "1.120" },
    { price: currentPrice - 20, amount: "3.335" },
    { price: currentPrice - 35, amount: "0.200" },
    { price: currentPrice - 50, amount: "0.950" },
  ];

  // HALAMAN LOGIN / REGISTER
  if (!isLoggedIn) {
    return (
      <main className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 selection:bg-blue-500/30">
        {notification && (
          <div className="fixed top-5 right-5 z-50 flex items-center gap-3 bg-slate-900/95 backdrop-blur-md border border-slate-800 shadow-2xl px-4 py-3 rounded-xl animate-in fade-in slide-in-from-top-5 duration-200">
            {notification.type === 'success' && <CheckCircle2 size={16} className="text-blue-400" />}
            {notification.type === 'error' && <AlertCircle size={16} className="text-rose-400" />}
            {notification.type === 'info' && <AlertCircle size={16} className="text-amber-400" />}
            <span className="text-xs font-medium text-slate-200">{notification.message}</span>
          </div>
        )}

        <div className="w-full max-w-md bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl p-8 space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-black tracking-wider text-white">
              KRAA<span className="text-blue-500">TRADE</span>
            </h1>
            <p className="text-xs text-slate-400">Platform Bursa Kripto Profesional & Real-time Simulasi</p>
          </div>

          <div className="grid grid-cols-2 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
            <button onClick={() => setAuthMode("login")} className={`py-2 rounded-lg transition ${authMode === "login" ? "bg-blue-600 text-white shadow-md" : "text-slate-400 hover:text-white"}`}>Masuk</button>
            <button onClick={() => setAuthMode("register")} className={`py-2 rounded-lg transition ${authMode === "register" ? "bg-blue-600 text-white shadow-md" : "text-slate-400 hover:text-white"}`}>Daftar Baru</button>
          </div>

          <form onSubmit={handleAuthSubmit} className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="text-slate-400">Email</label>
              <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 focus-within:border-blue-500 transition">
                <Mail size={16} className="text-slate-500 mr-2.5" />
                <input type="email" placeholder="nama@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-transparent outline-none w-full text-white text-sm" required />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-slate-400">Password</label>
              <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 focus-within:border-blue-500 transition">
                <Lock size={16} className="text-slate-500 mr-2.5" />
                <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-transparent outline-none w-full text-white text-sm" required />
              </div>
            </div>

            <button type="submit" className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold text-sm shadow-lg shadow-blue-500/25 transition active:scale-[0.98]">
              {authMode === "login" ? "Masuk ke Akun" : "Buat Akun Baru"}
            </button>
          </form>

          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-slate-800"></div>
            <span className="flex-shrink mx-4 text-slate-500 text-[11px]">ATAU</span>
            <div className="flex-grow border-t border-slate-800"></div>
          </div>

          <button onClick={handleDemoLogin} className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition flex items-center justify-center gap-2">
            <ShieldCheck size={16} className="text-blue-400" /> Masuk Mode Demo Instan
          </button>
        </div>
      </main>
    );
  }

  // APLIKASI TRADING UTAMA
  return (
    <main className="min-h-screen bg-slate-950 font-sans text-slate-100 flex flex-col pb-16 lg:pb-0">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-3 bg-slate-900/95 backdrop-blur-md border border-slate-800 shadow-2xl px-4 py-3 rounded-xl animate-in fade-in slide-in-from-top-5 duration-200">
          {notification.type === 'success' && <CheckCircle2 size={16} className="text-blue-400" />}
          {notification.type === 'error' && <AlertCircle size={16} className="text-rose-400" />}
          {notification.type === 'info' && <AlertCircle size={16} className="text-amber-400" />}
          <span className="text-xs font-medium text-slate-200">{notification.message}</span>
        </div>
      )}

      {/* MODAL MARKET / PAIR SELECTOR */}
      {isMarketModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base">Pilih Pasangan Pasar (Market)</h3>
              <button onClick={() => setIsMarketModalOpen(false)} className="text-slate-400 hover:text-white"><X size={18} /></button>
            </div>
            
            <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl px-3 py-2">
              <Search size={16} className="text-slate-500 mr-2" />
              <input type="text" placeholder="Cari koin (cth: BTC, ETH)..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-transparent outline-none w-full text-xs text-white" />
            </div>

            <div className="space-y-1 max-h-60 overflow-y-auto">
              {MARKET_PAIRS.filter(m => m.pair.toLowerCase().includes(searchQuery.toLowerCase())).map((m) => (
                <div 
                  key={m.pair}
                  onClick={() => {
                    setCurrentPair(m.pair);
                    setCurrentPrice(m.price);
                    setIsMarketModalOpen(false);
                    showNotification(`Beralih ke market ${m.pair}`, "info");
                  }}
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-800/80 cursor-transition cursor-pointer text-xs font-mono"
                >
                  <span className="font-bold text-white">{m.pair}</span>
                  <span className="text-slate-300">${m.price.toLocaleString()}</span>
                  <span className={m.change >= 0 ? "text-blue-400" : "text-rose-400"}>{m.change >= 0 ? `+${m.change}%` : `${m.change}%`}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODAL DEPOSIT / WITHDRAW */}
      {walletModalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-sm p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base capitalize">{walletModalType} USDT</h3>
              <button onClick={() => setWalletModalType(null)} className="text-slate-400 hover:text-white"><X size={18} /></button>
            </div>

            <form onSubmit={handleWalletSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-slate-400">Nominal USDT</label>
                <input type="number" placeholder="1000" value={walletAmount} onChange={(e) => setWalletAmount(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white font-mono outline-none focus:border-blue-500" required />
              </div>
              <button type="submit" className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition">Konfirmasi {walletModalType}</button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL EDIT PROFIL */}
      {isProfileOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-sm p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base">Edit Profil Akun</h3>
              <button onClick={() => setIsProfileOpen(false)} className="text-slate-400 hover:text-white"><X size={18} /></button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-slate-400">Username</label>
                <input type="text" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white outline-none focus:border-blue-500" required />
              </div>
              <button type="submit" className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition">Simpan Perubahan</button>
            </form>
          </div>
        </div>
      )}

      <Navbar 
        balanceUSDT={balanceUSDT} 
        balanceBTC={balanceBTC} 
        currentPair={currentPair}
        currentPrice={currentPrice} 
        username={username}
        onOpenMarketModal={() => setIsMarketModalOpen(true)}
        onOpenWalletModal={(type) => setWalletModalType(type)}
        onLogout={handleLogout}
        onOpenProfile={() => setIsProfileOpen(true)}
      />

      <div className="flex-1 w-full p-2 sm:p-3 grid grid-cols-1 lg:grid-cols-12 gap-2.5 max-w-[1920px] mx-auto">
        
        {/* KOLOM KIRI (Order Book & Recent Public Trades Tab) */}
        <div className={`lg:col-span-3 xl:col-span-2 bg-slate-900/90 rounded-xl border border-slate-800/80 p-3 flex flex-col min-h-[450px] lg:h-[calc(100vh-85px)] ${
          mobileTab === "orderbook" ? "flex" : "hidden lg:flex"
        }`}>
           <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
             <button onClick={() => setLeftTab("orderbook")} className={`text-xs font-bold ${leftTab === 'orderbook' ? 'text-blue-400 border-b-2 border-blue-400 pb-1' : 'text-slate-400'}`}>Order Book</button>
             <button onClick={() => setLeftTab("trades")} className={`text-xs font-bold ${leftTab === 'trades' ? 'text-blue-400 border-b-2 border-blue-400 pb-1' : 'text-slate-400'}`}>Trade Pasar</button>
           </div>

           {leftTab === 'orderbook' ? (
             <>
               <div className="flex justify-between text-[11px] text-slate-500 mb-2 px-1 font-medium">
                 <span>Harga (USDT)</span>
                 <span>Jml</span>
               </div>
               
               <div className="space-y-[2px] flex-1 overflow-hidden">
                 {[...sellOrders].reverse().map((order, i) => (
                   <div key={`sell-${i}`} onClick={() => setSelectedPrice(order.price)} className="flex justify-between text-xs cursor-pointer hover:bg-slate-800/80 px-1.5 py-1 rounded transition relative group overflow-hidden">
                     <span className="text-rose-400 font-mono relative z-10 font-medium">{order.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                     <span className="text-slate-300 font-mono relative z-10">{order.amount}</span>
                   </div>
                 ))}
               </div>
               
               <div className="my-2 py-2 border-y border-slate-800/80 flex items-center justify-center gap-3 bg-slate-950/40 rounded-lg">
                 <span className="text-sm font-black text-blue-400 font-mono">{currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
               </div>
               
               <div className="space-y-[2px] flex-1 overflow-hidden">
                 {buyOrders.map((order, i) => (
                   <div key={`buy-${i}`} onClick={() => setSelectedPrice(order.price)} className="flex justify-between text-xs cursor-pointer hover:bg-slate-800/80 px-1.5 py-1 rounded transition relative group overflow-hidden">
                     <span className="text-blue-400 font-mono relative z-10 font-medium">{order.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                     <span className="text-slate-300 font-mono relative z-10">{order.amount}</span>
                   </div>
                 ))}
               </div>
             </>
           ) : (
             <div className="flex-1 overflow-y-auto space-y-1 text-xs font-mono">
               <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                 <span>Harga</span>
                 <span>Jumlah</span>
                 <span>Waktu</span>
               </div>
               {recentTrades.map((t) => (
                 <div key={t.id} className="flex justify-between py-0.5">
                   <span className={t.side === 'Buy' ? 'text-blue-400' : 'text-rose-400'}>{t.price.toLocaleString()}</span>
                   <span className="text-slate-300">{t.amount}</span>
                   <span className="text-slate-500">{t.time}</span>
                 </div>
               ))}
             </div>
           )}
        </div>

        {/* KOLOM TENGAH (Chart & Tab Manajemen Order) */}
        <div className={`lg:col-span-6 xl:col-span-7 flex-col gap-2.5 lg:h-[calc(100vh-85px)] overflow-hidden ${
          mobileTab === "chart" ? "flex" : "hidden lg:flex"
        }`}>
          <div className="flex-none">
            <TradingChart currentPair={currentPair} currentPrice={currentPrice} priceChange24h={priceChange} />
          </div>
          
          <div className="flex-1 bg-slate-900/95 backdrop-blur-md rounded-xl border border-slate-800/80 shadow-xl flex flex-col overflow-hidden min-h-[250px]">
            <div className="flex gap-4 sm:gap-6 px-3 sm:px-4 pt-3 border-b border-slate-800/80 text-xs sm:text-sm font-medium bg-slate-950/30 overflow-x-auto whitespace-nowrap">
              {[
                { id: "openOrders", label: `Open Orders (${openOrders.length})` },
                { id: "orderHistory", label: "Order History" },
                { id: "tradeHistory", label: `Trade History (${tradeHistory.length})` },
                { id: "funds", label: "Assets" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`pb-2.5 transition relative ${activeTab === tab.id ? "text-blue-400 font-semibold border-b-2 border-blue-400" : "text-slate-400 hover:text-slate-200"}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-3 sm:p-4 overflow-x-auto flex-1">
              {activeTab === "openOrders" && (
                openOrders.length === 0 ? <p className="text-slate-500 text-xs text-center py-6">Tidak ada open order aktif.</p> : (
                  <table className="w-full text-left text-xs min-w-[500px]">
                    <thead className="text-slate-500 border-b border-slate-800/60">
                      <tr>
                        <th className="pb-2">Waktu</th>
                        <th className="pb-2">Pair</th>
                        <th className="pb-2">Sisi</th>
                        <th className="pb-2">Harga</th>
                        <th className="pb-2">Jumlah</th>
                        <th className="pb-2 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-300 divide-y divide-slate-800/40">
                      {openOrders.map((ord) => (
                        <tr key={ord.id} className="hover:bg-slate-800/40">
                          <td className="py-2 font-mono text-slate-400">{ord.time}</td>
                          <td className="font-bold">{ord.pair}</td>
                          <td className={ord.side === "Buy" ? "text-blue-400" : "text-rose-400"}>{ord.side}</td>
                          <td className="font-mono">{ord.price.toLocaleString()}</td>
                          <td className="font-mono">{ord.amount}</td>
                          <td className="text-right">
                            <button onClick={() => handleCancelOrder(ord)} className="px-2 py-0.5 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 rounded font-medium">Batalkan</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )
              )}

              {activeTab === "orderHistory" && (
                <p className="text-slate-500 text-xs text-center py-6">Belum ada riwayat order.</p>
              )}

              {activeTab === "tradeHistory" && (
                tradeHistory.length === 0 ? <p className="text-slate-500 text-xs text-center py-6">Belum ada riwayat tereksekusi.</p> : (
                  <table className="w-full text-left text-xs min-w-[500px]">
                    <thead className="text-slate-500 border-b border-slate-800/60">
                      <tr>
                        <th className="pb-2">Waktu</th>
                        <th className="pb-2">Sisi</th>
                        <th className="pb-2">Harga Eksekusi</th>
                        <th className="pb-2">Jumlah</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-300 divide-y divide-slate-800/40">
                      {tradeHistory.map((ord) => (
                        <tr key={ord.id}>
                          <td className="py-2 font-mono text-slate-400">{ord.time}</td>
                          <td className={ord.side === "Buy" ? "text-blue-400 font-bold" : "text-rose-400 font-bold"}>{ord.side} Tereksekusi</td>
                          <td className="font-mono">{ord.price.toLocaleString()} USDT</td>
                          <td className="font-mono">{ord.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )
              )}

              {activeTab === "funds" && (
                <div className="space-y-2 text-xs">
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

        {/* KOLOM KANAN (Panel Trading Lengkap) */}
        <div className={`lg:col-span-3 xl:col-span-3 lg:h-[calc(100vh-85px)] ${
          mobileTab === "trade" ? "block" : "hidden lg:block"
        }`}>
          <TradePanel 
            balanceUSDT={balanceUSDT}
            balanceBTC={balanceBTC}
            currentPrice={currentPrice}
            selectedPrice={selectedPrice}
            currentPair={currentPair}
            onPlaceOrder={handlePlaceOrder}
            onNotify={showNotification}
          />
        </div>

      </div>

      {/* MOBILE BOTTOM NAVIGATION */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-lg border-t border-slate-800/80 flex items-center justify-around py-2 px-1 lg:hidden">
        <button onClick={() => setMobileTab("chart")} className={`flex flex-col items-center gap-1 text-[11px] transition ${mobileTab === "chart" ? "text-blue-400 font-semibold" : "text-slate-400"}`}>
          <BarChart2 size={18} /><span>Chart</span>
        </button>
        <button onClick={() => setMobileTab("orderbook")} className={`flex flex-col items-center gap-1 text-[11px] transition ${mobileTab === "orderbook" ? "text-blue-400 font-semibold" : "text-slate-400"}`}>
          <BookOpen size={18} /><span>Order</span>
        </button>
        <button onClick={() => setMobileTab("trade")} className={`flex flex-col items-center gap-1 text-[11px] transition ${mobileTab === "trade" ? "text-blue-400 font-semibold" : "text-slate-400"}`}>
          <ArrowLeftRight size={18} /><span>Trade</span>
        </button>
      </div>
    </main>
  );
}