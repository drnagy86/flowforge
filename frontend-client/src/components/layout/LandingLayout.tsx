import Footer from './Footer';

const LandingLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen flex flex-col bg-zinc-900 text-white">
    <main className="flex-grow">{children}</main>
    <Footer />
  </div>
);

export default LandingLayout;
