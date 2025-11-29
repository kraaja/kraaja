import MainPage from '@/components/MainPage';
import { modsList } from '@/data/mods';
import { bedrockCategories } from '@/data/categories'; // Import kategori Bedrock

export default function Home() {
  return (
    <MainPage 
      mods={modsList} 
      pageTitle="Minecraft Bedrock Mods" 
      categories={bedrockCategories} // Kirim kategori Bedrock
    />
  );
}