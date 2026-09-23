import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Play,
  Copy,
  Check,
  ArrowRight,
  FileJson,
  FolderGit2,
  Zap,
  Package,
  Sparkles,
  Share2,
  ShieldCheck,
  Workflow,
  AlertTriangle,
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

  const whyAvm = [
    {
      num: '01',
      title: 'Command drift across projects',
      body: 'Different teammates run slightly different commands, forgotten flags, or outdated scripts. avm anchors project-specific aliases inside a version-controlled .avm.json — everyone executes the identical workflow.',
    },
    {
      num: '02',
      title: 'Juggling tool versions per project',
      body: 'Conflicting Node, OpenJDK, and Android SDK versions across projects mean brittle manual environment switches. avm resolves the right version per directory, automatically, the moment you cd in.',
    },
    {
      num: '03',
      title: 'A shell rc file full of one-off hacks',
      body: '.bashrc/.zshrc become dumping grounds for fragmented aliases and machine-specific PATH edits. avm keeps aliases and env vars scoped to a project, or clean and global — never both, tangled.',
    },
  ];

  const useCases = [
    'Monorepos mixing multiple Node versions across packages',
    'Mobile teams juggling JDKs and Android SDK levels per project',
    'Teams done with fragile, hand-copied shell aliases',
  ];

  const corePillars = [
    { icon: FileJson, title: 'Project & global alias resolution', desc: 'Aliases in .avm.json execute with injected environment variables and tool versions.' },
    { icon: FolderGit2, title: 'Directory-aware local precedence', desc: 'Local project configuration takes immediate precedence over global ~/.avm.json settings.' },
    { icon: Zap, title: 'Sub-millisecond native execution', desc: 'Built in Rust (<1ms overhead) — no Ruby, Python, or bash subshells slowing down your terminal.' },
    { icon: Package, title: 'Runtime plugin marketplace', desc: 'avm plugin add fetches a precompiled native binary on demand from GitHub Releases — never built from source.' },
    { icon: Sparkles, title: 'Automatic package.json discovery', desc: 'Scripts in package.json become instant avm <script> commands, using your detected package manager.' },
    { icon: Share2, title: 'Global package sharing across versions', desc: 'A globally pinned tool (like npm -g packages) stays reachable even when a different local version is active.' },
    { icon: ShieldCheck, title: 'Isolated subprocess wire protocol', desc: 'Plugins run as standalone OS processes speaking a typed JSON-over-stdio contract — failures stay isolated.' },
    { icon: Workflow, title: 'Plugin project scaffolding', desc: 'avm create <name> bootstraps a full Rust plugin crate with a ToolProvider skeleton and release workflows.' },
    { icon: AlertTriangle, title: 'Safe host fallback', desc: "If a managed version isn't installed, avm falls back to the host/system tool with a clear warning." },
  ];

  const workspaceCrates = [
    { name: 'crates/avm-cli', desc: 'Clap-based binary entrypoint (avm-bin), command routing, shell protocol, avm create scaffolding.' },
    { name: 'crates/avm-core', desc: 'Config parsing (.avm.json), local/global merge rules, alias/env/tool resolution.' },
    { name: 'crates/avm-shims', desc: 'Shim directory management (~/.avm/shims) and executable shim generation.' },
    { name: 'crates/avm-plugin-api', desc: 'The ToolProvider trait, the plugin wire-protocol types, and the runner module plugins call.' },
    { name: 'crates/avm-runtime', desc: 'Plugin discovery, the protocol host runner (PluginProcess), the marketplace installer, and the legacy asdf adapter.' },
  ];

  return (
    <div className="flex flex-col items-center">

      {/* ===================== HERO ===================== */}
      <section className="w-full max-w-2xl px-6 pt-20 pb-16 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-slate-700 text-[11px] tracking-wide text-emerald-400 mb-7">
          RUST-NATIVE &middot; RUNTIME PLUGIN MARKETPLACE
        </div>

        <h1 className="font-sans font-bold text-4xl sm:text-5xl leading-[1.12] tracking-tight text-slate-100 mb-5">
          The version manager for your whole project.
        </h1>

        <p className="max-w-lg text-[15px] leading-relaxed text-slate-300 mb-10">
          One tool for project aliases, per-directory tool versions, and env vars —
          plugins fetched on demand, nothing to compile.
        </p>

        {/* Install tabs + terminal */}
        <div className="w-full max-w-lg mb-3">
          <div className="flex items-center justify-center gap-2 mb-3 flex-wrap">
            {INSTALL_METHODS.map((m) => (
              <button
                key={m.id}
                onClick={() => setSelectedMethod(m.id)}
                className={`px-3 py-1.5 rounded-md text-xs font-mono transition-colors ${
                  selectedMethod === m.id
                    ? 'bg-slate-800 text-emerald-400 border border-slate-600'
                    : 'text-slate-400 border border-transparent hover:text-slate-200'
                }`}
              >
                {m.name}
              </button>
            ))}
          </div>

          <div className="rounded-lg bg-slate-800 border border-slate-700 overflow-hidden text-left">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-slate-700">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-600" />
              <span className="w-2.5 h-2.5 rounded-full bg-slate-600" />
              <span className="w-2.5 h-2.5 rounded-full bg-slate-600" />
              <span className="ml-2 text-[11px] font-mono text-slate-500">zsh</span>
            </div>
            <div className="flex items-center justify-between gap-3 px-4 py-3.5 font-mono text-[13px] overflow-x-auto">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="text-emerald-400 select-none">$</span>
                <span className="text-slate-200 whitespace-nowrap select-all">{currentMethod.command}</span>
              </div>
              <button
                onClick={handleCopyInstall}
                className="shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-400 text-slate-950 text-[11px] font-sans font-semibold hover:bg-emerald-300 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>
        </div>
        <p className="text-[12px] text-slate-500 mb-9">{currentMethod.description}</p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/marketplace"
            className="px-5 py-2.5 rounded-md bg-emerald-400 text-slate-950 font-sans font-semibold text-[13px] hover:bg-emerald-300 transition-colors"
          >
            Explore the marketplace
          </Link>
          <Link
            to="/docs"
            className="px-5 py-2.5 rounded-md border border-slate-700 text-slate-100 font-sans font-semibold text-[13px] hover:border-slate-500 transition-colors"
          >
            Read the docs
          </Link>
        </div>
      </section>

      {/* ===================== VIDEO ===================== */}
      <section className="w-full max-w-lg px-6 pb-24 flex flex-col items-center">
        {/* TODO: replace with a real <video>/embed once the walkthrough is recorded. */}
        <div className="w-full aspect-video rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center">
            <Play className="w-5 h-5 text-emerald-400 fill-emerald-400 ml-0.5" />
          </div>
        </div>
        <p className="mt-3 text-[12px] text-slate-500">60 seconds: init → alias → plugin → pin → run.</p>
      </section>

      {/* ===================== WHY AVM ===================== */}
      <section className="w-full max-w-lg px-6 pb-24">
        <p className="text-[11px] tracking-widest text-emerald-400 text-center mb-8">WHY AVM</p>
        <div className="flex flex-col">
          {whyAvm.map((item, idx) => (
            <div
              key={idx}
              className={`flex gap-5 py-6 pl-5 border-l-2 border-slate-700 ${idx === whyAvm.length - 1 ? '' : ''}`}
            >
              <span className="font-mono text-xs text-slate-500 pt-0.5 shrink-0">{item.num}</span>
              <div>
                <p className="font-sans font-semibold text-[16px] text-slate-100 mb-1.5">{item.title}</p>
                <p className="text-[13px] leading-relaxed text-slate-300">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== COMPARISON ===================== */}
      {/* Wider than the rest of the page on purpose — a data table wants more
          room than prose measure; the surrounding sections stay narrow. */}
      <section className="w-full max-w-6xl px-6 pb-24 flex flex-col items-center">
        <p className="text-[11px] tracking-widest text-emerald-400 mb-2">HOW IT COMPARES</p>
        <p className="font-sans font-semibold text-2xl text-slate-100 mb-8">avm, next to asdf, vfox, and nvm</p>

        <div className="w-full max-w-4xl rounded-lg border border-slate-700 overflow-x-auto">
          <table className="w-full text-left text-[12px] border-collapse">
            <thead>
              <tr className="bg-slate-800">
                <th className="p-3.5 font-mono font-medium text-slate-500 whitespace-nowrap">Capability</th>
                <th className="p-3.5 font-mono font-semibold text-emerald-400 border-l border-slate-700">avm</th>
                <th className="p-3.5 font-mono font-medium text-slate-400 border-l border-slate-700">asdf</th>
                <th className="p-3.5 font-mono font-medium text-slate-400 border-l border-slate-700">vfox</th>
                <th className="p-3.5 font-mono font-medium text-slate-400 border-l border-slate-700">nvm</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISONS.map((comp, idx) => (
                <tr key={idx} className="border-t border-slate-700">
                  <td className="p-3.5 font-mono text-slate-300 whitespace-nowrap align-top">{comp.feature}</td>
                  <td className="p-3.5 text-slate-100 border-l border-slate-700 align-top">{comp.avm}</td>
                  <td className="p-3.5 text-slate-400 border-l border-slate-700 align-top">{comp.asdf}</td>
                  <td className="p-3.5 text-slate-400 border-l border-slate-700 align-top">{comp.vfox}</td>
                  <td className="p-3.5 text-slate-400 border-l border-slate-700 align-top">{comp.nvm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ===================== USE CASES ===================== */}
      <section className="w-full max-w-lg px-6 pb-24 flex flex-col items-center">
        <p className="text-[11px] tracking-widest text-emerald-400 mb-2">BUILT FOR</p>
        <p className="font-sans font-semibold text-2xl text-slate-100 mb-8 text-center">Real teams, real workflows</p>
        <div className="flex flex-col gap-2.5 w-full">
          {useCases.map((useCase, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between gap-4 px-5 py-4 rounded-lg bg-slate-800 border border-slate-700"
            >
              <span className="text-[13px] text-slate-100">{useCase}</span>
              <ArrowRight className="w-4 h-4 text-emerald-400 shrink-0" />
            </div>
          ))}
        </div>
      </section>

      {/* ===================== QUICK START ===================== */}
      <section className="w-full max-w-lg px-6 pb-24">
        <p className="font-sans font-semibold text-2xl text-slate-100 text-center mb-2">Quick start in 60 seconds</p>
        <p className="text-[13px] text-slate-400 text-center mb-8">
          From an empty project to pinned runtime versions and project aliases, in five commands.
        </p>

        <div className="relative rounded-lg bg-slate-800 border border-slate-700 p-5 font-mono text-[13px] text-slate-200 mb-6">
          <div className="text-slate-500 mb-1"># 1. Initialize .avm.json in the current directory</div>
          <div className="text-emerald-400 mb-3">avm init</div>
          <div className="text-slate-500 mb-1"># 2. Add a project-scoped alias</div>
          <div className="text-emerald-400 mb-3">avm alias add dev "pnpm run dev"</div>
          <div className="text-slate-500 mb-1"># 3. Install a runtime plugin on demand</div>
          <div className="text-emerald-400 mb-3">avm plugin add node</div>
          <div className="text-slate-500 mb-1"># 4. Pin the project's runtime version</div>
          <div className="text-emerald-400 mb-3">avm node use 20.11.1</div>
          <div className="text-slate-500 mb-1"># 5. Run it, with the environment fully injected</div>
          <div className="text-emerald-400">avm run dev</div>

          <button
            onClick={() =>
              handleCopyText(
                'quickstart',
                'avm init\navm alias add dev "pnpm run dev"\navm plugin add node\navm node use 20.11.1\navm run dev'
              )
            }
            className="absolute top-4 right-4 p-1.5 rounded bg-slate-700 hover:bg-slate-600 text-slate-300"
          >
            {copiedSnippet === 'quickstart' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-lg border border-slate-700 text-[12px]">
          <div>
            <span className="font-semibold text-slate-100 block mb-0.5">Shell setup, for plain command interception</span>
            <span className="text-slate-400">
              Lets a bare <code className="text-emerald-400">node</code> resolve through avm too.
            </span>
          </div>
          <div className="shrink-0 flex items-center gap-2 bg-slate-800 border border-slate-700 px-3 py-1.5 rounded font-mono text-emerald-400">
            <span>eval "$(avm shell-init)"</span>
            <button onClick={() => handleCopyText('shell', 'eval "$(avm shell-init)"')} className="hover:text-emerald-300">
              {copiedSnippet === 'shell' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </section>

      {/* ===================== CONFIG SPEC ===================== */}
      <section className="w-full max-w-2xl px-6 pb-24">
        <p className="font-sans font-semibold text-2xl text-slate-100 text-center mb-2">The .avm.json spec</p>
        <p className="text-[13px] text-slate-400 text-center mb-8">One file, replacing a pile of fragmented dotfiles.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <div className="relative rounded-lg bg-slate-800 border border-slate-700 p-5 font-mono text-[12px] text-slate-300">
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
              onClick={() =>
                handleCopyText(
                  'config',
                  '{\n  "aliases": {\n    "dev": "pnpm run dev",\n    "release": "npm run release $1"\n  },\n  "env": {\n    "NODE_ENV": "development",\n    "API_URL": "https://api.local"\n  },\n  "tools": {\n    "node": "20.11.1"\n  }\n}'
                )
              }
              className="absolute top-4 right-4 p-1.5 rounded bg-slate-700 hover:bg-slate-600 text-slate-300"
            >
              {copiedSnippet === 'config' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          <div className="flex flex-col gap-3 text-[12px]">
            <div className="p-3.5 rounded-lg border border-slate-700">
              <span className="font-semibold text-emerald-400 block mb-1">Local overrides global</span>
              <span className="text-slate-300">
                Local <code className="text-slate-100">./.avm.json</code> overrides machine-wide{' '}
                <code className="text-slate-100">~/.avm.json</code>.
              </span>
            </div>
            <div className="p-3.5 rounded-lg border border-slate-700">
              <span className="font-semibold text-emerald-400 block mb-1">Env vars merge</span>
              <span className="text-slate-300">Merged transparently, with local values overriding global ones.</span>
            </div>
            <div className="p-3.5 rounded-lg border border-slate-700">
              <span className="font-semibold text-emerald-400 block mb-1">Tool lookup order</span>
              <span className="text-slate-300">Local, then global, then the system binary with a warning.</span>
            </div>
            <div className="p-3.5 rounded-lg border border-slate-700">
              <span className="font-semibold text-emerald-400 block mb-1">Legacy compatibility</span>
              <span className="text-slate-300">Old flat-map config files are read and migrated automatically.</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== CORE CAPABILITIES ===================== */}
      <section className="w-full max-w-3xl px-6 pb-24">
        <p className="text-[11px] tracking-widest text-emerald-400 text-center mb-2">CORE CAPABILITIES</p>
        <p className="font-sans font-semibold text-2xl text-slate-100 text-center mb-8">What avm handles today</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {corePillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div key={idx} className="p-4 rounded-lg border border-slate-700">
                <Icon className="w-4 h-4 text-emerald-400 mb-2.5" />
                <p className="text-[13px] font-semibold text-slate-100 mb-1">{pillar.title}</p>
                <p className="text-[12px] leading-relaxed text-slate-400">{pillar.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ===================== UNDER THE HOOD ===================== */}
      <section className="w-full max-w-2xl px-6 pb-24">
        <p className="text-[11px] tracking-widest text-emerald-400 text-center mb-2">UNDER THE HOOD</p>
        <p className="font-sans font-semibold text-2xl text-slate-100 text-center mb-2">This repo's crate layout</p>
        <p className="text-[13px] text-slate-400 text-center mb-8">
          node, java, and android are independent repos, fetched at runtime via{' '}
          <code className="text-emerald-400">avm plugin add</code> — not compiled into avm-bin.
        </p>

        <div className="flex flex-col gap-2">
          {workspaceCrates.map((crate, idx) => (
            <div key={idx} className="p-4 rounded-lg border border-slate-700 flex flex-col sm:flex-row sm:items-baseline gap-1.5 sm:gap-4">
              <span className="font-mono text-[12px] text-emerald-400 shrink-0">{crate.name}</span>
              <span className="text-[12px] text-slate-400">{crate.desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== BOTTOM CTA ===================== */}
      <section className="w-full max-w-lg px-6 pb-24">
        <div className="rounded-lg border border-slate-700 p-7 text-center flex flex-col items-center gap-4">
          <div>
            <p className="font-sans font-semibold text-lg text-slate-100 mb-1.5">Ready to explore available plugins?</p>
            <p className="text-[13px] text-slate-400">
              Browse Node.js, OpenJDK Temurin, and Android SDK in the registry, or create your own.
            </p>
          </div>
          <Link
            to="/marketplace"
            className="px-5 py-2.5 rounded-md bg-emerald-400 text-slate-950 font-sans font-semibold text-[13px] hover:bg-emerald-300 transition-colors"
          >
            Browse marketplace →
          </Link>
        </div>
      </section>

    </div>
  );
};
