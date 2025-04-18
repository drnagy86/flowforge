// src/components/landing/HeroSection.tsx
import { useNavigate } from 'react-router-dom';
import { externalLinks } from '@/config';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section
      id="hero"
      className="scroll-mt-20 pt-24 grid grid-cols-1 md:grid-cols-2 items-center gap-12"
    >
      <div>
        <h1 className="text-4xl font-bold text-white mb-4">
          FlowForge is a Demo Project.
        </h1>
        <p className="text-forge-heat text-lg mb-6">
          Built by Derrick Nagy to showcase full-stack architecture, AWS infrastructure, 
          role-based auth, and AI-powered support workflows. This is a work in progress.
        </p>
        <p className="text-slate-400 text-sm mb-6">
          This project is a developer portfolio piece to demonstrate real-world architecture and implementation.
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => navigate('/login')}
            className="bg-forge-ember hover:bg-orange-600 text-white px-4 py-2 rounded shadow transition"
          >
            Explore the Demo
          </button>
          <a
            className="border border-forge-ember text-forge-ember px-4 py-2 rounded hover:bg-forge-ember hover:text-white transition"
            href={externalLinks.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            View on GitHub
          </a>
        </div>
      </div>
      <div className="w-full h-64 rounded-lg flex items-center justify-center">
        <img
          src="/images/flowforge-logo-with-name.png"
          alt="FlowForge Logo"
          className="h-full w-auto object-contain"
        />
      </div>
    </section>
  );
};

export default HeroSection;
