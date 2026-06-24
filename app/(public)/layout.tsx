import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';
import IntroLoader from '@/components/IntroLoader';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <IntroLoader />
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
