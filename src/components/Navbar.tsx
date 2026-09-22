import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Terminal, Package, BookOpen, Layers, GitPullRequest, Github, Menu, X, ExternalLink } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { to: '/', label: 'Intro & Overview', icon: Terminal, end: true },
    { to: '/marketplace', label: 'Marketplace', icon: Package, end: false },
    { to: '/docs', label: 'Documentation', icon: BookOpen, end: false },
    { to: '/commands', label: 'Commands', icon: Layers, end: false },
    { to: '/create-plugin', label: 'Create Plugin', icon: GitPullRequest, end: false },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-slate-950/85 border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center gap-3 group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center font-mono font-bold text-white shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            ⚡
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                avm
              </span>
              <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                v1.0
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono tracking-wide -mt-0.5">
              Any Version Manager
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/70 p-1.5 rounded-full border border-slate-800">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-emerald-500/20 text-emerald-300 shadow-sm border border-emerald-500/40 font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`
                }
              >
                <Icon className="w-3.5 h-3.5" />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        {/* GitHub link */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="https://github.com/PrajaNova/avm"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-mono font-medium rounded-lg text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition-all"
          >
            <Github className="w-4 h-4" />
            <span>PrajaNova/avm</span>
            <ExternalLink className="w-3 h-3 text-slate-500" />
          </a>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950 px-4 pt-2 pb-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-sm font-medium ${
                    isActive
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                      : 'text-slate-300 hover:bg-slate-900'
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </NavLink>
            );
          })}
          <div className="pt-2 border-t border-slate-800">
            <a
              href="https://github.com/PrajaNova/avm"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between px-4 py-2 rounded-lg text-xs font-mono text-slate-400 hover:text-white bg-slate-900"
            >
              <span className="flex items-center gap-2">
                <Github className="w-4 h-4" /> PrajaNova/avm
              </span>
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
