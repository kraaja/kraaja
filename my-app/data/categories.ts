// data/categories.ts

export interface Category {
  id: string; // ID unik untuk logika filter (harus huruf kecil, tanpa spasi)
    label: string; // Nama yang tampil di layar
      icon: string; // Emoji atau path SVG
      }

      export const categoryList: Category[] = [
        { id: 'all', label: 'All Files', icon: '📂' },
          { id: 'addons', label: 'Addons', icon: '🧩' },
            { id: 'maps', label: 'Maps', icon: '🗺️' },
              { id: 'texture', label: 'Texture Packs', icon: '🎨' },
                { id: 'skin', label: 'Skins', icon: '👕' },
                  // Tambah kategori baru di bawah ini:
                    { id: 'magic', label: 'Magic', icon: '🔮' },
                      { id: 'tech', label: 'Technology', icon: '🛠️' },
                      ];