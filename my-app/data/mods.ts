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
  version: string; // <--- Field Baru: Versi
}

export const modsList: Mod[] = [
  {
    id: "1",
    title: "KraaUI",
    author: "KraaDev",
    summary: "Addon Untuk Server Bedrock.",
    fileName: "KraaUI.mcaddon",
    image: "kraaui.png",
    tags: ["addons", "utility"],
    version: "v1.2.2-beta", // <--- Ganti versi di sini dengan mudah!
    
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
    version: "New", // <--- Ganti versi di sini dengan mudah!
    
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