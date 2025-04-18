// src/pages/LandingPage.tsx

import LandingLayout from '@/components/layout/LandingLayout';
import HeroSection from '@/components/landing/HeroSection';
import FeatureCards from '@/components/landing/FeatureCards';
import ArchitectureShowcase from '@/components/landing/ArchitectureShowcase';
import UserWorkflow from '@/components/landing/UserWorkflow';
import Footer from '@/components/layout/Footer';

const LandingPage = () => (
  <div className="min-h-screen bg-forge-landing text-white">
    <main className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-24 pt-24">
      <HeroSection />
      <FeatureCards />
      <ArchitectureShowcase />
      <UserWorkflow />
      <Footer variant="transparent" />
    </main>
  </div>
);

export default LandingPage;
