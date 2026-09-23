import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { to: '/marketplace', label: 'Marketplace' },
    { to: '/docs', label: 'Docs' },
    { to: '/commands', label: 'Commands' },
    { to: '/create-plugin', label: 'Create Plugin' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/95 backdrop-blur-sm border-b border-slate-700">
      <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="font-sans font-bold text-[15px] tracking-tight text-slate-100 hover:text-emerald-400 transition-colors">
          avm
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-[13px] text-slate-300">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                isActive ? 'text-emerald-400' : 'text-slate-300 hover:text-slate-100 transition-colors'
              }
            >
              {item.label}
            </NavLink>
          ))}
          <a
            href="https://github.com/PrajaNova/avm"
            target="_blank"
            rel="noreferrer"
            className="text-slate-300 hover:text-slate-100 transition-colors"
          >
            GitHub ↗
          </a>
        </nav>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 -mr-2 text-slate-300"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-700 px-6 py-4 flex flex-col gap-4 text-sm">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) => (isActive ? 'text-emerald-400' : 'text-slate-300')}
            >
              {item.label}
            </NavLink>
          ))}
          <a href="https://github.com/PrajaNova/avm" target="_blank" rel="noreferrer" className="text-slate-300">
            GitHub ↗
          </a>
        </div>
      )}
    </header>
  );
};
