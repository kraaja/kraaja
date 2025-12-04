// data/mods.ts

export interface Mod {
  id: string;
  title: string;
  author: string;
  summary: string;
  fullDescription: string;
  fileName: string; 
  image: string; 
  tags: string[];
  version: string;
  isPremium?: boolean; // <--- Field Baru (Optional)
  price?: string;      // <--- Field Baru (Optional)
}

export const modsList: Mod[] = [
  {
    id: "kra-custom-shop",
    title: "KRA CUSTOM SHOP",
    author: "Kraa",
    summary: "Addon toko fisik (NPC) dengan UI modern, sistem preset, dan manajemen item lengkap.",
    fileName: "KRA_Custom_Shop_v2.mcaddon", // Nama file dummy
    image: "", // Kosongkan jika belum ada gambar, akan muncul inisial "K"
    tags: ["premium", "addons", "utility"], // Tag 'premium' agar muncul di filter
    version: "v2.0",
    isPremium: true, // Menandakan ini barang berbayar
    price: "Rp 10.000",
    
    fullDescription: `
🛒 **KRA CUSTOM SHOP - PANDUAN & FITUR**

**Versi Script:** 2.0 (Update Preset & Item Management)  
**Author:** Kraa

Addon ini memungkinkan admin untuk membuat toko (shop) fisik menggunakan NPC/Entity yang bisa berinteraksi dengan UI (Form). Mendukung sistem uang scoreboard, penyimpanan preset (copas toko), dan manajemen item yang detail.

✨ **FITUR UTAMA**

**UI Modern**  
Menggunakan form server-ui (bukan command block) yang bersih dan mudah digunakan.

**Sistem Preset (BARU)**  
- Simpan konfigurasi toko yang sudah jadi ke database dunia.
- Spawn toko yang sama persis di lokasi lain tanpa menyusun ulang item satu per satu.
- Cocok untuk membuat cabang toko atau backup.

**Manajemen Item Detail (BARU)**  
- Edit harga, nama tampilan, atau icon item kapan saja.
- Hapus satu item spesifik tanpa perlu mereset seluruh isi toko.

**Fleksibel**  
- Support item custom (addon lain).
- Support custom texture path.
- Bisa ganti nama toko sesuka hati.

**Sistem Belanja**  
- Support beli banyak sekaligus (Slider quantity).
- Cek saldo otomatis.
- Cek slot inventory penuh.

---

🛠️ **PERSIAPAN (Wajib Dibaca)**

Sebelum menggunakan, pastikan hal berikut sudah aktif di world:

1. **Experimental Features:** Aktifkan Beta APIs.
2. **Entity:** Pastikan Behavior/Resource pack sudah memiliki definisi entity dengan identifier \`kra:cshop\`.
3. **Scoreboard:** Buat objective money.
   \`\`\`
   /scoreboard objectives add money dummy
   \`\`\`
4. **Tag Admin:** Hanya pemain dengan tag ini yang bisa membuka menu edit.
   \`\`\`
   /tag @s add admin
   \`\`\`

---

📖 **CARA PENGGUNAAN (ADMIN)**

1. **Membuka Menu Utama**  
   Ketik command berikut di chat:
   \`/kra:cshop\`

2. **Membuat Toko Baru**  
   Jika kamu tidak menatap entity shop, command di atas akan membuka menu Creation. Pilih "Buat Shop Kosong" untuk memunculkan toko baru.

3. **Mengisi Barang Dagangan**  
   Pegang item yang ingin dijual di tangan, dekati toko, lalu ketik \`/kra:cshop\`. Pilih "Tambah Item (Dari Tangan)".

4. **Menggunakan Preset**  
   Simpan toko yang sudah jadi sebagai preset, lalu spawn di lokasi lain dengan menu "Spawn dari Preset".

---

👤 **CARA PENGGUNAAN (PLAYER)**

- Pastikan pemain memiliki uang di scoreboard money.
- Pukul atau Interaksi pada entity Toko.
- Pilih barang -> Tentukan jumlah -> Klik Kirim.

**Note:** Dibuat dengan ❤️ oleh Kraa.
   `
  },
  {
    id: "1",
    title: "KraaUI",
    author: "KraaDev",
    summary: "Addon Untuk Server Bedrock.",
    fileName: "KraaUI.mcaddon",
    image: "kraaui.png",
    tags: ["addons", "utility"],
    version: "v1.2.2-beta",
    fullDescription: `
## Apa itu KraaUI?
Addon Yang Cocok Untuk Server Kalian **Mcpe** Cihuyy. Addon Server UI Untuk Setup Server Mu!

### Fitur Utama:
- **Admin Menu:** Menu Admin Untuk Setting Sistem Server
- **Member Menu:** Menu Untuk Member Di Server Kalian Seperti *Warp,Sethome,Clan,Dll.*
- **Npc UI:** Fitur Npc UI One Click Untuk Membuat server Mu *Keren*.

### Cara Pakai:
1. Pasang addon.
2. Aktifkan **Api Beta**.
3. Enjoy!
   `
  },
  {
    id: "2",
    title: "SEASONS Add-On: Biomes, Animals & More!",
    author: "Glorious Studios",
    summary: "This is the only Seasons Add-On you’ll ever need!",
    fileName: "SEASONS Add-On Biomes, Animals More! (addon)",
    image: "seasons.jpg",
    tags: ["addons", "dlc"],
    version: "New",
    fullDescription: `
### Seasons Add-On has everything you can dream of… and more!

• Dynamic Seasons
• New Biomes & Structures
• Animals
• Realistic VFX & Sounds
• Fully compatible with Vibrant Visuals

**This is the only Seasons Add-On you’ll ever need!**
   `
  },
];