import { Github, ExternalLink } from 'lucide-react';

interface FooterProps {
  onNavClick: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick }) => {
  return (
    <footer className="border-t border-slate-900 bg-slate-950 text-slate-400 text-xs font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          
          {/* Brand Col */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <span className="text-emerald-400 font-mono text-xl">⚡</span>
              <span>avm</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Any Version Manager &mdash; the Rust-native monorepo tooling layer for command aliases, runtime selection, and plugin discovery.
            </p>
            <div className="text-[11px] text-slate-500 font-mono">
              Designed by PrajaNova &bull; MIT Licensed
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <div className="font-mono text-slate-200 font-semibold uppercase tracking-wider text-[11px]">
              Navigation
            </div>
            <ul className="space-y-1.5 font-mono text-xs">
              <li>
                <button onClick={() => onNavClick('overview')} className="hover:text-emerald-400 transition-colors">
                  Overview & Hero
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('marketplace')} className="hover:text-emerald-400 transition-colors">
                  Plugin Marketplace
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('docs')} className="hover:text-emerald-400 transition-colors">
                  Documentation & Setup
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('commands')} className="hover:text-emerald-400 transition-colors">
                  Command Reference
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('author')} className="hover:text-emerald-400 transition-colors">
                  Build a Plugin
                </button>
              </li>
            </ul>
          </div>

          {/* Ecosystem Repos */}
          <div className="space-y-2">
            <div className="font-mono text-slate-200 font-semibold uppercase tracking-wider text-[11px]">
              Repositories
            </div>
            <ul className="space-y-1.5 font-mono text-xs">
              <li>
                <a href="https://github.com/PrajaNova/avm" target="_blank" rel="noreferrer" className="hover:text-white flex items-center gap-1">
                  <span>PrajaNova/avm</span>
                  <ExternalLink className="w-3 h-3 text-slate-600" />
                </a>
              </li>
              <li>
                <a href="https://github.com/PrajaNova/avm-marketplace" target="_blank" rel="noreferrer" className="hover:text-white flex items-center gap-1">
                  <span>PrajaNova/avm-marketplace</span>
                  <ExternalLink className="w-3 h-3 text-slate-600" />
                </a>
              </li>
              <li>
                <a href="https://github.com/PrajaNova/avm-plugin-node" target="_blank" rel="noreferrer" className="hover:text-white flex items-center gap-1">
                  <span>avm-plugin-node</span>
                  <ExternalLink className="w-3 h-3 text-slate-600" />
                </a>
              </li>
              <li>
                <a href="https://github.com/PrajaNova/avm-plugin-java" target="_blank" rel="noreferrer" className="hover:text-white flex items-center gap-1">
                  <span>avm-plugin-java</span>
                  <ExternalLink className="w-3 h-3 text-slate-600" />
                </a>
              </li>
              <li>
                <a href="https://github.com/PrajaNova/avm-plugin-android" target="_blank" rel="noreferrer" className="hover:text-white flex items-center gap-1">
                  <span>avm-plugin-android</span>
                  <ExternalLink className="w-3 h-3 text-slate-600" />
                </a>
              </li>
            </ul>
          </div>

          {/* Registry info */}
          <div className="space-y-2">
            <div className="font-mono text-slate-200 font-semibold uppercase tracking-wider text-[11px]">
              Registry Endpoint
            </div>
            <p className="text-[11px] text-slate-400">
              avm CLI fetches plugins on-demand directly from raw GitHub file:
            </p>
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 font-mono text-[10px] text-emerald-400 break-all select-all">
              https://raw.githubusercontent.com/PrajaNova/avm-marketplace/main/registry.json
            </div>
          </div>

        </div>

        {/* Bottom banner */}
        <div className="border-t border-slate-900 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-mono">
          <div>
            &copy; {new Date().getFullYear()} PrajaNova. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <a href="https://github.com/PrajaNova/avm" target="_blank" rel="noreferrer" className="hover:text-slate-300 flex items-center gap-1">
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <span className="text-slate-800">&bull;</span>
            <span>MIT License</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
