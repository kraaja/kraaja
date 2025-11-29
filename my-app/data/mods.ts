// data/mods.ts

export interface Mod {
  id: string;
    title: string;
      author: string;
        summary: string; // Deskripsi pendek untuk kartu
          fullDescription: string; // Deskripsi panjang untuk halaman detail (Bisa HTML)
            fileName: string; 
              image: string; // Nama file gambar di public/images
                downloads: string;
                  date: string;
                    tags: string[];
                    }

                    export const modsList: Mod[] = [
                      {
                          id: "1",
                              title: "Kraa Essentials +",
                                  author: "KraaDevTeam",
                                      summary: "Addon utilitas terbaik. Menambahkan fitur waypoints dan vein miner.",
                                          fullDescription: `
                                                <h2>Fitur Utama</h2>
                                                      <p>Kraa Essentials membawa pengalaman Java Edition ke Bedrock. Fitur mencakup:</p>
                                                            <ul>
                                                                    <li>Vein Miner (Hancurkan ore sekaligus)</li>
                                                                            <li>Waypoints System</li>
                                                                                    <li>Tree Capitator</li>
                                                                                          </ul>
                                                                                                <p>Kompatibel dengan Minecraft 1.21+</p>
                                                                                                    `,
                                                                                                        fileName: "addon_v1.zip",
                                                                                                            image: "addon1.jpg", // Pastikan ada file public/images/addon1.jpg (jika tidak ada, akan pakai placeholder)
                                                                                                                downloads: "2.4M",
                                                                                                                    date: "2 days ago",
                                                                                                                        tags: ["Utility", "Addons"]
                                                                                                                          },
                                                                                                                            {
                                                                                                                                id: "2",
                                                                                                                                    title: "Realistic Shaders Blue",
                                                                                                                                        author: "SkyWalker99",
                                                                                                                                            summary: "Ubah tampilan dunia Minecraft Anda dengan pencahayaan dinamis.",
                                                                                                                                                fullDescription: `
                                                                                                                                                      <p>Shader paling ringan untuk HP kentang! Membuat air jernih dan langit biru cerah.</p>
                                                                                                                                                            <img src="/images/shader_demo.jpg" alt="Demo" style="width:100%; border-radius:8px; margin-top:10px;">
                                                                                                                                                                `,
                                                                                                                                                                    fileName: "shader_keren.mcpack",
                                                                                                                                                                        image: "shader.jpg", 
                                                                                                                                                                            downloads: "1.1M",
                                                                                                                                                                                date: "1 week ago",
                                                                                                                                                                                    tags: ["Texture Packs", "Realistic"]
                                                                                                                                                                                      },
                                                                                                                                                                                      ];