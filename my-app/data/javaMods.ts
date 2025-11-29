import { Mod } from './mods';

export const javaModsList: Mod[] = [
  {
    id: "java-1",
    title: "OptiFine HD",
    author: "sp614x",
    summary: "FPS Boost dan Shaders support.",
    fileName: "OptiFine_1.20.1.jar",
    image: "optifine.jpg",
    tags: ["shaders", "forge"], // Sesuai kategori Java
    version: "HD U I5",
    fullDescription: `
## OptiFine HD
Optimasi performa Minecraft Java Edition.
    `
  },
  {
    id: "java-2",
    title: "Sodium",
    author: "jellysquid3",
    summary: "Modern rendering engine untuk Fabric.",
    fileName: "sodium.jar",
    image: "sodium.jpg",
    tags: ["fabric"], // Sesuai kategori Java
    version: "0.5.8",
    fullDescription: `
## Sodium
Meningkatkan FPS secara drastis untuk pengguna Fabric.
    `
  }
];