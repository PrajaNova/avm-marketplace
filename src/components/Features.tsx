import React from 'react';
import { Cpu, FileJson, Layers, Share2, Sparkles, TerminalSquare } from 'lucide-react';

export const Features: React.FC = () => {
  const features = [
    {
      icon: Cpu,
      title: 'Rust-Native Speed',
      description: 'Zero runtime startup penalty (<1ms overhead). No Ruby, Python, or heavy bash script subshell traps.',
      tag: 'Performance'
    },
    {
      icon: FileJson,
      title: 'Unified .avm.json Config',
      description: 'One single file handles project aliases, runtime versions, and environment variables with clean local-over-global precedence.',
      tag: 'Simplicity'
    },
    {
      icon: Layers,
      title: 'On-Demand Binary Plugins',
      description: 'avm plugin add fetches precompiled native binaries directly from GitHub Releases. Never compiles from source on your machine.',
      tag: 'Modularity'
    },
    {
      icon: TerminalSquare,
      title: 'Transparent PATH Shims',
      description: 'Shims in ~/.avm/shims seamlessly route calls to active versions while falling back gracefully to host tools if unpinned.',
      tag: 'Isolation'
    },
    {
      icon: Share2,
      title: 'Global Package Sharing',
      description: 'Global tools (like npm -g) pinned to a global version remain callable even when a different local version is active.',
      tag: 'Workflow'
    },
    {
      icon: Sparkles,
      title: 'Package Script Auto-Discovery',
      description: 'Scripts in package.json become instantly executable as avm <script> using your detected package manager (pnpm/npm/yarn/bun).',
      tag: 'Productivity'
    }
  ];

  return (
    <section className="py-16 md:py-24 border-t border-slate-900 bg-slate-950/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase mb-3">
            Architected for Developer Flow
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Why engineers choose avm
          </p>
          <p className="mt-4 text-slate-400 text-base">
            Modern projects are polyglot and multifaceted. AVM simplifies setup without hiding how things run.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-2xl bg-slate-900/50 border border-slate-800/80 p-6 hover:border-emerald-500/40 hover:bg-slate-900/80 transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 group-hover:bg-emerald-500/20 transition-all">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700/60">
                    {feature.tag}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
