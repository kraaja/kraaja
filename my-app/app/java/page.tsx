import MainPage from '@/components/MainPage';
import { javaModsList } from '@/data/javaMods';
import { javaCategories } from '@/data/categories'; // Import kategori Java

export default function JavaPage() {
  return (
    <MainPage 
      mods={javaModsList} 
      pageTitle="Minecraft Java Mods" 
      categories={javaCategories} // Kirim kategori Java
    />
  );
}