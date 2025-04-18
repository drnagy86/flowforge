// src/components/layout/Footer.tsx
import { externalLinks } from '@/config';


interface FooterProps {
  variant?: 'default' | 'transparent';
}

const Footer = ({ variant = 'default' }: FooterProps) => {
  const isTransparent = variant === 'transparent';

  return (
    <footer
      className={`w-full py-6 px-4 text-center text-sm border-t mt-12 transition-colors ${
        isTransparent
          ? 'text-slate-300 border-white/10 bg-transparent'
          : 'text-gray-400 border-gray-700 bg-zinc-900'
      }`}
    >
      <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
        <span>© {new Date().getFullYear()} FlowForge</span>
        <div className="flex gap-4">
          <a
            href={externalLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline hover:text-white transition"
          >
            GitHub
          </a>
          <a
            href={externalLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline hover:text-white transition"
          >
            LinkedIn
          </a>
          {/* <a href="/contact" className="hover:underline hover:text-white transition">
            Contact
          </a> */}
          {/* <a
            href="https://opensource.org/licenses/MIT"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline hover:text-white transition"
          >
            MIT License
          </a> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
