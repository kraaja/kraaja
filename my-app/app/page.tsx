import MainPage from '@/components/MainPage';
import { modsList } from '@/data/mods';

export default function Home() {
  return (
    <MainPage mods={modsList} />
  );
}