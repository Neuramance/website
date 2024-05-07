import HomepageNav from '@/components/nav';
import '@/styles/global.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="">
      <HomepageNav />
      {children}
    </div>
  );
}
