import React, { useState } from 'react';
import { Copy, Check, Terminal, Zap, ShieldCheck, Box, FolderCode, ArrowRight } from 'lucide-react';
import { INSTALL_METHODS } from '../data/guideData';

interface HeroProps {
  onCopy: (text: string) => void;
  onExploreMarketplace: () => void;
  onViewDocs: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onCopy, onExploreMarketplace, onViewDocs }) => {
  const [selectedMethod, setSelectedMethod] = useState(INSTALL_METHODS[0].id);
  const [copied, setCopied] = useState(false);

  const currentMethod = INSTALL_METHODS.find((m) => m.id === selectedMethod) || INSTALL_METHODS[0];

  const handleCopy = () => {
    onCopy(currentMethod.command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-emerald-600/20 via-teal-500/10 to-indigo-500/10 blur-[130px] -z-10 pointer-events-none rounded-full" />
      <div className="absolute top-1/2 -left-20 w-80 h-80 bg-emerald-500/5 blur-[100px] -z-10 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Release Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-700/60 shadow-inner mb-6">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-mono text-slate-300">
            Rust-native &bull; Zero background daemon &bull; Modular plugins
          </span>
        </div>

        {/* Main Headline (Homebrew brew.sh spirit) */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
          The Missing Runtime & Alias Manager for <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">Developers</span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-3xl mx-auto text-lg sm:text-xl text-slate-300 font-normal leading-relaxed mb-10">
          <strong className="text-white font-semibold">avm (Any Version Manager)</strong> eliminates command drift and version headaches. 
          Manage project aliases, runtime versions (<code className="text-emerald-400 font-mono text-sm bg-slate-900 px-1.5 py-0.5 rounded">Node</code>, <code className="text-emerald-400 font-mono text-sm bg-slate-900 px-1.5 py-0.5 rounded">Java</code>, <code className="text-emerald-400 font-mono text-sm bg-slate-900 px-1.5 py-0.5 rounded">Android</code>), 
          environment variables, and shell shims seamlessly in a single <code className="text-emerald-300 font-mono text-sm bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800/50">.avm.json</code>.
        </p>

        {/* Install Box (Homebrew-like centerpiece) */}
        <div className="max-w-3xl mx-auto mb-10">
          {/* Method Selector Tabs */}
          <div className="flex items-center justify-center gap-1 sm:gap-2 mb-3">
            {INSTALL_METHODS.map((m) => (
              <button
                key={m.id}
                onClick={() => setSelectedMethod(m.id)}
                className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                  selectedMethod === m.id
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 bg-slate-900/40 border border-slate-800/80 hover:border-slate-700'
                }`}
              >
                {m.name}
              </button>
            ))}
          </div>

          {/* Code Bar */}
          <div className="relative group rounded-2xl bg-slate-900/90 border border-slate-700/80 p-2 sm:p-3 shadow-2xl backdrop-blur-xl transition-all hover:border-emerald-500/50">
            <div className="flex items-center justify-between gap-3 px-3 py-2 font-mono text-sm sm:text-base text-left overflow-x-auto">
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-emerald-500 select-none font-bold">$</span>
                <span className="text-emerald-300 font-medium whitespace-nowrap select-all">
                  {currentMethod.command}
                </span>
              </div>
              <button
                onClick={handleCopy}
                className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-sans font-semibold text-xs hover:bg-emerald-400 active:scale-95 transition-all shadow-md shadow-emerald-500/20"
                title="Copy to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            
            {/* Install method hint */}
            <div className="text-left px-3 pt-2 pb-1 border-t border-slate-800/80 mt-1 flex items-center justify-between text-xs text-slate-400">
              <span>{currentMethod.description}</span>
              <span className="font-mono text-[11px] text-emerald-400/80">{currentMethod.tag}</span>
            </div>
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
          <button
            onClick={onExploreMarketplace}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/25 active:scale-95 transition-all"
          >
            <Box className="w-4 h-4" />
            <span>Browse Plugin Marketplace</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={onViewDocs}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm border border-slate-700/80 hover:border-slate-600 active:scale-95 transition-all"
          >
            <FolderCode className="w-4 h-4 text-emerald-400" />
            <span>Documentation & Setup</span>
          </button>
        </div>

        {/* Feature Pills */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6 border-t border-slate-800/60">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/40 border border-slate-800/60 text-left">
            <Zap className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <div className="text-xs font-semibold text-white font-mono">&lt; 1ms Startup</div>
              <div className="text-[11px] text-slate-400">Native Rust speed</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/40 border border-slate-800/60 text-left">
            <Box className="w-5 h-5 text-teal-400 shrink-0" />
            <div>
              <div className="text-xs font-semibold text-white font-mono">Zero Compiles</div>
              <div className="text-[11px] text-slate-400">Prebuilt plugin binaries</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/40 border border-slate-800/60 text-left">
            <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0" />
            <div>
              <div className="text-xs font-semibold text-white font-mono">Safe Subprocesses</div>
              <div className="text-[11px] text-slate-400">JSON wire protocol</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/40 border border-slate-800/60 text-left">
            <Terminal className="w-5 h-5 text-indigo-400 shrink-0" />
            <div>
              <div className="text-xs font-semibold text-white font-mono">Transparent Shims</div>
              <div className="text-[11px] text-slate-400">Direct shell hooks</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
