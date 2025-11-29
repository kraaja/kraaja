import { modsList } from '@/data/mods';
import { javaModsList } from '@/data/javaMods'; // Import data Java
import { notFound } from 'next/navigation';
import AddonDetailClient from '@/components/AddonDetailClient';
import LogoDropdown from '@/components/LogoDropdown';

export default async function AddonDetail({ params }: { params: Promise<{ id: string }> }) {
  
  const { id } = await params;

  // Gabungkan kedua list untuk pencarian
  const allMods = [...modsList, ...javaModsList];
  
  // Cari mod di kedua list
  const mod = allMods.find((m) => m.id === id);

  if (!mod) {
    return notFound();
  }

  return (
    <>
      <header>
        <div className="header-left">
          <LogoDropdown />
        </div>
        <div className="search-bar" style={{visibility: 'hidden'}}></div>
      </header>

      <AddonDetailClient mod={mod} />

      <footer>
        <p>&copy; 2025 KraaDev.</p>
      </footer>
    </>
  );
}