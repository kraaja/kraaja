// data/categories.ts

export interface Category {
  id: string;
  label: string;
  icon: string;
}

// Kategori Khusus Bedrock
export const bedrockCategories: Category[] = [
  { id: 'all', label: 'All Files', icon: '📂' },
  { id: 'premium', label: 'Premium', icon: '💎' }, // <--- Kategori Baru
  { id: 'addons', label: 'Addons', icon: '🧩' },
  { id: 'maps', label: 'Maps', icon: '🗺️' },
  { id: 'texture', label: 'Texture Packs', icon: '🎨' },
  { id: 'skin', label: 'Skins', icon: '👕' },
  { id: 'dlc', label: 'Dlc', icon: '💽' },
];

// Kategori Khusus Java
export const javaCategories: Category[] = [
  { id: 'all', label: 'All Mods', icon: '☕' },
  { id: 'forge', label: 'Forge', icon: '🔨' },
  { id: 'fabric', label: 'Fabric', icon: '🧵' },
  { id: 'shaders', label: 'Shaders', icon: '💡' },
  { id: 'resourcepack', label: 'Resource/3D Model', icon: '📦' },
  { id: 'plugin', label: 'Plugins', icon: '⛄' },
];