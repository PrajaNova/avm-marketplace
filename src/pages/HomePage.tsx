import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Terminal, 
  ShieldCheck, 
  Sparkles, 
  FolderGit2, 
  CheckCircle2, 
  ArrowRight, 
  Copy, 
  Check, 
  Package, 
  AlertTriangle, 
  Zap, 
  Share2, 
  Workflow, 
  FileJson,
  BookOpen
} from 'lucide-react';
import { INSTALL_METHODS, COMPARISONS } from '../data/guideData';

interface HomePageProps {
  onCopy: (text: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onCopy }) => {
  const [selectedMethod, setSelectedMethod] = useState(INSTALL_METHODS[0].id);
  const [copied, setCopied] = useState(false);
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  const currentMethod = INSTALL_METHODS.find((m) => m.id === selectedMethod) || INSTALL_METHODS[0];

  const handleCopyInstall = () => {
    onCopy(currentMethod.command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyText = (id: string, text: string) => {
    onCopy(text);
    setCopiedSnippet(id);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  const threeProblems = [
    {
      num: '01',
      title: 'Command Drift Across Projects',
      problem: 'Different team members run slightly different commands, forgotten flags, or outdated scripts.',
      solution: 'avm anchors project-specific aliases inside a version-controlled .avm.json, guaranteeing everyone executes identical workflows.'
    },
    {
      num: '02',
      title: 'Manual Setup of Project Runtime Versions',
      problem: 'Juggling conflicting versions of Node, OpenJDK, Android SDK across projects requires brittle environment switches.',
      solution: 'avm provides directory-aware runtime selection with local-first precedence. As you navigate projects, your tools switch automatically.'
    },
    {
      num: '03',
      title: 'Repetitive Shell Configuration for Ad Hoc Aliases',
      problem: 'Shell files (.bashrc, .zshrc) become dumping grounds for fragmented aliases and machine-specific PATH adjustments.',
      solution: 'avm keeps aliases scoped to the project or managed cleanly globally, injecting PATH and environment variables only when needed.'
    }
  ];

  const corePillars = [
    {
      icon: FileJson,
      title: 'Project & Global Alias Resolution',
      desc: 'Aliases defined in .avm.json execute with injected environment variables and tool versions.'
    },
    {
      icon: FolderGit2,
      title: 'Directory-Aware Local Precedence',
      desc: 'Local project configurations take immediate precedence over global ~/.avm.json settings.'
    },
    {
      icon: Zap,
      title: 'Sub-Millisecond Native Execution',
      desc: 'Built in pure Rust (<1ms overhead). No heavy Ruby, Python, or bash subshells slowing down your terminal.'
    },
    {
      icon: Package,
      title: 'Runtime Plugin Marketplace',
      desc: 'avm plugin add fetches precompiled native binaries on-demand from GitHub Releases. Never built from source.'
    },
    {
      icon: Sparkles,
      title: 'Automatic package.json Discovery',
      desc: 'Scripts in package.json become instant avm <script> commands using your detected package manager (pnpm/npm/yarn/bun).'
    },
    {
      icon: Share2,
      title: 'Global Package Sharing Across Versions',
      desc: 'Global tools (like npm -g) pinned globally stay reachable even when a different local version is active.'
    },
    {
      icon: ShieldCheck,
      title: 'Isolated Subprocess Wire Protocol',
      desc: 'Plugins run as standalone OS processes speaking a typed JSON-over-stdio contract, isolating failures completely.'
    },
    {
      icon: Workflow,
      title: 'Plugin Project Scaffolding',
      desc: 'avm create <name> bootstraps a complete Rust plugin crate with ToolProvider skeleton and release workflows.'
    },
    {
      icon: AlertTriangle,
      title: 'Safe Host Fallback Behavior',
      desc: 'If a managed version is not installed, avm safely falls back to host/system tools with an informative warning.'
    }
  ];

  const workspaceCrates = [
    {
      name: 'crates/avm-cli',
      desc: 'Clap-based binary entrypoint (avm-bin), command routing, shell protocol, avm create scaffolding.'
    },
    {
      name: 'crates/avm-core',
      desc: 'Config parsing (.avm.json), local/global merge rules, alias/env/tool resolution.'
    },
    {
      name: 'crates/avm-shims',
      desc: 'Shim directory management (~/.avm/shims) and executable shim generation.'
    },
    {
      name: 'crates/avm-plugin-api',
      desc: 'The ToolProvider trait, the plugin wire-protocol types, and the runner module plugins call.'
    },
    {
      name: 'crates/avm-runtime',
      desc: 'Plugin discovery, the protocol host runner (PluginProcess), marketplace installer, and legacy asdf adapter.'
    }
  ];

  return (
    <div className="space-y-24 py-10">
      
      {/* ===================== HERO SECTION ===================== */}
      <section className="relative pt-6 pb-12 overflow-hidden text-center">
        {/* Ambient glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-emerald-600/20 via-teal-500/10 to-indigo-500/10 blur-[140px] -z-10 pointer-events-none rounded-full" />
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-700/80 shadow-inner mb-6">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono text-slate-300">
              Rust-Native &bull; Monorepo-Based Tooling Layer &bull; Zero Background Daemon
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
            avm &mdash; <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">Any Version Manager</span>
          </h1>

          {/* Subtitle based on avm/README.md */}
          <p className="max-w-3xl mx-auto text-lg sm:text-xl text-slate-300 font-normal leading-relaxed mb-10">
            A Rust-native tooling layer for <strong className="text-white">local command aliases</strong>, 
            <strong className="text-white"> project-level runtime selection</strong>, and 
            <strong className="text-white"> plugin-driven command discovery</strong>.
          </p>

          {/* Install Bar (brew.sh style) */}
          <div className="max-w-3xl mx-auto mb-10">
            <div className="flex items-center justify-center gap-2 mb-3">
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

            <div className="relative group rounded-2xl bg-slate-900/90 border border-slate-700/80 p-2 sm:p-3 shadow-2xl backdrop-blur-xl transition-all hover:border-emerald-500/50">
              <div className="flex items-center justify-between gap-3 px-3 py-2 font-mono text-sm sm:text-base text-left overflow-x-auto">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-emerald-500 select-none font-bold">$</span>
                  <span className="text-emerald-300 font-medium whitespace-nowrap select-all">
                    {currentMethod.command}
                  </span>
                </div>
                <button
                  onClick={handleCopyInstall}
                  className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-sans font-semibold text-xs hover:bg-emerald-400 active:scale-95 transition-all shadow-md shadow-emerald-500/20"
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
              <div className="text-left px-3 pt-2 pb-1 border-t border-slate-800/80 mt-1 flex items-center justify-between text-xs text-slate-400">
                <span>{currentMethod.description}</span>
                <span className="font-mono text-[11px] text-emerald-400/80">{currentMethod.tag}</span>
              </div>
            </div>
          </div>

          {/* Quick Navigation to other routed pages */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/marketplace"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/25 active:scale-95 transition-all"
            >
              <Package className="w-4 h-4" />
              <span>Explore Marketplace</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/docs"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm border border-slate-700/80 hover:border-slate-600 active:scale-95 transition-all"
            >
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <span>Setup & Docs</span>
            </Link>
            <Link
              to="/commands"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm border border-slate-700/80 hover:border-slate-600 active:scale-95 transition-all"
            >
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span>Command Cheat Sheet</span>
            </Link>
          </div>

        </div>
      </section>

      {/* ===================== THE THREE PROBLEMS IT SOLVES ===================== */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase mb-2">
            The Purpose
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Three Practical Problems avm Solves
          </p>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Every feature in avm is designed to solve one of these three real daily engineering pain points:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {threeProblems.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6 flex flex-col justify-between hover:border-emerald-500/40 transition-all"
            >
              <div>
                <div className="font-mono text-3xl font-extrabold text-emerald-500/40 mb-3">
                  {item.num}
                </div>
                <h3 className="text-lg font-bold text-white mb-3">
                  {item.title}
                </h3>
                <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-900/30 text-rose-300 text-xs mb-4 leading-relaxed">
                  <span className="font-bold block mb-1">Pain Point:</span>
                  {item.problem}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-900/30 text-emerald-300 text-xs leading-relaxed">
                <span className="font-bold block mb-1">avm Solution:</span>
                {item.solution}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== WHAT AVM HANDLES TODAY ===================== */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase mb-2">
            Core Capabilities
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            What avm Handles Today
          </p>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Comprehensive tooling designed for modern polyglot projects without cognitive overhead.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {corePillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-xl bg-slate-900/40 border border-slate-800/80 hover:border-slate-700 transition-all"
              >
                <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3">
                  <Icon className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-white mb-1.5">{pillar.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{pillar.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ===================== QUICK START & SHELL INTEGRATION ===================== */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 p-6 sm:p-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 text-center">
              Quick Start in 60 Seconds
            </h2>
            <p className="text-slate-400 text-sm text-center mb-8">
              From an empty project to pinned runtime versions and project aliases in 5 commands.
            </p>

            {/* Quickstart Code Block */}
            <div className="relative rounded-xl bg-slate-950 border border-slate-800 p-5 font-mono text-xs sm:text-sm text-slate-200 mb-8 overflow-x-auto">
              <div className="text-slate-500 mb-2"># 1. Initialize .avm.json in current directory</div>
              <div className="text-emerald-300 font-semibold mb-3">avm init</div>

              <div className="text-slate-500 mb-2"># 2. Add a project-scoped alias</div>
              <div className="text-emerald-300 font-semibold mb-3">avm add dev "pnpm run dev"</div>

              <div className="text-slate-500 mb-2"># 3. Install native runtime plugin on-demand</div>
              <div className="text-emerald-300 font-semibold mb-3">avm plugin add node</div>

              <div className="text-slate-500 mb-2"># 4. Pin project runtime version</div>
              <div className="text-emerald-300 font-semibold mb-3">avm node use 20.11.1</div>

              <div className="text-slate-500 mb-2"># 5. Execute with full environment injection</div>
              <div className="text-emerald-300 font-semibold">avm run dev</div>

              <button
                onClick={() => handleCopyText('quickstart', 'avm init\navm add dev "pnpm run dev"\navm plugin add node\navm node use 20.11.1\navm run dev')}
                className="absolute top-4 right-4 p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                title="Copy Quickstart"
              >
                {copiedSnippet === 'quickstart' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Shell Setup Note */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="font-bold text-white block mb-0.5">Shell Setup (for plain command interception):</span>
                <span className="text-slate-400">Enables direct resolution through shims (e.g. running plain <code className="text-emerald-300 font-mono">node</code> resolves via avm).</span>
              </div>
              <div className="relative shrink-0 bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-lg font-mono text-emerald-300 flex items-center gap-2">
                <span>eval "$(avm shell-init)"</span>
                <button
                  onClick={() => handleCopyText('shell', 'eval "$(avm shell-init)"')}
                  className="p-1 hover:text-white"
                >
                  {copiedSnippet === 'shell' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ===================== .AVM.JSON FORMAT & PRECEDENCE ===================== */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase mb-2">
            Configuration Model
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            The .avm.json Specification
          </p>
          <p className="mt-2 text-slate-400 text-sm">
            Clean, human-readable structure replacing multiple fragmented configuration dotfiles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* JSON sample */}
          <div className="relative rounded-2xl bg-slate-950 border border-slate-800 p-5 font-mono text-xs text-slate-300 shadow-xl overflow-x-auto">
{`{
  "aliases": {
    "dev": "pnpm run dev",
    "release": "npm run release $1"
  },
  "env": {
    "NODE_ENV": "development",
    "API_URL": "https://api.local"
  },
  "tools": {
    "node": "20.11.1"
  }
}`}
            <button
              onClick={() => handleCopyText('config', '{\n  "aliases": {\n    "dev": "pnpm run dev",\n    "release": "npm run release $1"\n  },\n  "env": {\n    "NODE_ENV": "development",\n    "API_URL": "https://api.local"\n  },\n  "tools": {\n    "node": "20.11.1"\n  }\n}')}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
            >
              {copiedSnippet === 'config' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* Precedence rules */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Precedence Rules</h3>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="font-bold text-emerald-400 block mb-1">1. Local Overrides Global</span>
                <span>Local <code className="text-emerald-300 font-mono">./.avm.json</code> overrides machine-wide <code className="text-emerald-300 font-mono">~/.avm.json</code> settings.</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="font-bold text-emerald-400 block mb-1">2. Environment Merging</span>
                <span>Environment variables are merged transparently, with local values overriding global values.</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="font-bold text-emerald-400 block mb-1">3. Tool Version Lookup</span>
                <span>Tool version lookup checks local first, then global, then system binary with a warning.</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="font-bold text-emerald-400 block mb-1">4. Legacy Flat-Map Compatibility</span>
                <span>avm automatically reads legacy flat-map files and migrates them into the structured object form.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== COMPARISON WITH ASDF & VFOX ===================== */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase mb-2">
            Ecosystem Comparison
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Comparison with asdf and vfox
          </p>
          <p className="mt-2 text-slate-400 text-sm">
            Directly from avm's design specification and benchmark matrix.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 overflow-hidden bg-slate-900/60 shadow-xl overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/80 font-mono text-slate-300">
                <th className="p-4 font-semibold">Capability</th>
                <th className="p-4 font-bold text-emerald-400 bg-emerald-500/10">avm (this project)</th>
                <th className="p-4 font-semibold text-slate-400">asdf</th>
                <th className="p-4 font-semibold text-slate-400">vfox</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {COMPARISONS.map((comp, idx) => (
                <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-4 font-mono font-medium text-slate-200 whitespace-nowrap">
                    {comp.feature}
                  </td>
                  <td className="p-4 font-medium text-emerald-300 bg-emerald-500/5">
                    {comp.avm}
                  </td>
                  <td className="p-4 text-slate-400">
                    {comp.asdf}
                  </td>
                  <td className="p-4 text-slate-400">
                    {comp.vfox}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ===================== PACKAGE LAYOUT (WORKSPACE CRATES) ===================== */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase mb-2">
            Rust Monorepo Structure
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Workspace Crates Layout
          </p>
          <p className="mt-2 text-slate-400 text-sm">
            Nothing else is compiled into <code className="text-emerald-400 font-mono text-xs">avm-bin</code>. 
            node, java, and android are independent standalone repos.
          </p>
        </div>

        <div className="space-y-3">
          {workspaceCrates.map((crate, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
            >
              <div className="flex items-center gap-3">
                <span className="text-emerald-400 font-mono font-bold text-xs bg-slate-950 px-2.5 py-1 rounded border border-slate-800">
                  {crate.name}
                </span>
                <span className="text-xs text-slate-300">{crate.desc}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 rounded-xl bg-slate-900/40 border border-slate-800 text-xs text-slate-400 flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>
            node/java/android are separate repos (<code className="text-emerald-300 font-mono">avm-plugin-node</code>, <code className="text-emerald-300 font-mono">avm-plugin-java</code>, <code className="text-emerald-300 font-mono">avm-plugin-android</code>), fetched on-demand at runtime via <code className="text-emerald-300 font-mono">avm plugin add</code>.
          </span>
        </div>
      </section>

      {/* ===================== BOTTOM CTA BANNER ===================== */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-emerald-950/40 border border-emerald-500/30 p-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-white mb-2">
              Ready to explore available plugins?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Browse Node.js, OpenJDK Temurin, and Android SDK in the registry, or create your own plugin.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/marketplace"
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold font-mono text-xs transition-all shadow-md shadow-emerald-500/20"
            >
              Browse Marketplace &rarr;
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
