import { modsList } from '@/data/mods';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import AddonDetailClient from '@/components/AddonDetailClient';

export default async function AddonDetail({ params }: { params: Promise<{ id: string }> }) {
  
  const { id } = await params;
  const mod = modsList.find((m) => m.id === id);

  if (!mod) {
    return notFound();
  }

  return (
    <>
      <header>
        <div className="header-left">
          <Link href="/" className="logo">
            <div className="logo-icon">K</div>
            Kraa<span>Dev</span>
          </Link>
        </div>
        <div className="search-bar" style={{visibility: 'hidden'}}></div>
      </header>

      {/* Panggil Component Client */}
      <AddonDetailClient mod={mod} />

      <footer>
        <p>&copy; 2025 KraaDev.</p>
      </footer>
    </>
  );
}