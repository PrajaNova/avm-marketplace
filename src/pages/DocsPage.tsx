import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Menu,
  Copy,
  Check,
  Terminal,
  FileJson,
  Package,
  Cpu,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { DocsSidebar } from '../components/docs/DocsSidebar';
import { PluginDocView } from '../components/docs/PluginDocView';
import { TerminalInstallBox } from '../components/TerminalInstallBox';
import { CliReference } from '../components/CliReference';
import { SHELL_SETUP_GUIDE, COMPARISONS } from '../data/guideData';

interface DocsPageProps {
  onCopy: (text: string) => void;
}

// Flat list of navigable pages for Next/Previous links
interface PageNavInfo {
  id: string;
  text: string;
  group: string;
}

const ALL_PAGES: PageNavInfo[] = [
  { id: 'introduction', text: 'What is avm?', group: 'Guide' },
  { id: 'getting-started', text: 'Getting Started', group: 'Guide' },
  { id: 'shell-setup', text: 'Shell Setup & Shims', group: 'Guide' },
  { id: 'usage-core', text: 'Core (CLI & Precedence)', group: 'Usage' },
  { id: 'usage-plugins', text: 'Plugins (Add, List, Update)', group: 'Usage' },
  { id: 'usage-versions', text: 'Versions (Browse, Install, Pin)', group: 'Usage' },
  { id: 'usage-aliases', text: 'Aliases & Scripts Discovery', group: 'Usage' },
  { id: 'configuration', text: 'Configuration (.avm.json)', group: 'Reference' },
  { id: 'commands', text: 'All Commands', group: 'Reference' },
  { id: 'dependencies', text: 'Dependencies & Host Env', group: 'Reference' },
  { id: 'architecture', text: 'Architecture & Wire Protocol', group: 'Reference' },
  { id: 'comparison', text: 'Comparison Matrix', group: 'Reference' },
  { id: 'plugin-node', text: 'Node.js Plugin & Tutorial', group: 'Plugins' },
  { id: 'plugin-java', text: 'Java Temurin Plugin & Tutorial', group: 'Plugins' },
  { id: 'plugin-android', text: 'Android SDK Plugin & Tutorial', group: 'Plugins' },
  { id: 'faq', text: 'Frequently Asked Questions', group: 'Questions' },
  { id: 'troubleshooting', text: 'Troubleshooting & Diagnostics', group: 'Questions' },
  { id: 'contribute-core', text: 'Core avm Contribution', group: 'Contribute' },
  { id: 'contribute-docs', text: 'Contributing Documentation', group: 'Contribute' },
];

export const DocsPage: React.FC<DocsPageProps> = ({ onCopy }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Parse section from current URL path
  // Supports: /docs, /docs/guide/introduction, /docs/plugins/node, /docs/getting-started, etc.
  const path = location.pathname.replace(/^\/docs\/?/, '');
  let activeSection = 'introduction';

  if (!path || path === '') {
    activeSection = 'introduction';
  } else if (path.includes('plugins/')) {
    const pluginName = path.split('plugins/')[1].replace(/\/.*$/, '').toLowerCase();
    activeSection = `plugin-${pluginName}`;
  } else {
    // Check if path matches any page id directly or through trailing segment
    const segments = path.split('/');
    const lastSeg = segments[segments.length - 1].toLowerCase();
    const matched = ALL_PAGES.find((p) => p.id === lastSeg || path.endsWith(p.id));
    if (matched) {
      activeSection = matched.id;
    } else if (lastSeg === 'core') {
      activeSection = path.includes('contribute') ? 'contribute-core' : 'usage-core';
    } else if (lastSeg === 'plugins') {
      activeSection = 'usage-plugins';
    } else if (lastSeg === 'versions') {
      activeSection = 'usage-versions';
    } else if (lastSeg === 'commands') {
      activeSection = 'commands';
    } else {
      activeSection = lastSeg || 'introduction';
    }
  }

  // Scroll to top on section switch
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeSection]);

  const handleSelectSection = (id: string, link?: string) => {
    if (link) {
      navigate(link);
    } else if (id.startsWith('plugin-')) {
      const pName = id.replace('plugin-', '');
      navigate(`/docs/plugins/${pName}`);
    } else {
      navigate(`/docs/${id}`);
    }
  };

  const handleCopy = (id: string, text: string) => {
    onCopy(text);
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Find page metadata and Next/Previous navigation
  const pageIndex = ALL_PAGES.findIndex((p) => p.id === activeSection);
  const currentPage = ALL_PAGES[pageIndex] || ALL_PAGES[0];
  const prevPage = pageIndex > 0 ? ALL_PAGES[pageIndex - 1] : null;
  const nextPage = pageIndex < ALL_PAGES.length - 1 ? ALL_PAGES[pageIndex + 1] : null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col antialiased">
      
      {/* Mobile Bar */}
      <div className="lg:hidden sticky top-14 z-30 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 hover:text-white"
        >
          <Menu className="w-4 h-4 text-emerald-400" />
          <span>Documentation Menu</span>
        </button>

        <span className="text-xs font-mono font-medium text-emerald-400 truncate max-w-[200px]">
          {currentPage.text}
        </span>
      </div>

      {/* Main Body */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex gap-8">
        
        {/* asdf-vm style Sidebar */}
        <DocsSidebar
          activeSection={activeSection}
          onSelectSection={handleSelectSection}
          isOpenMobile={isMobileMenuOpen}
          onCloseMobile={() => setIsMobileMenuOpen(false)}
        />

        {/* Content View */}
        <main className="flex-1 min-w-0 pb-16">
          
          {/* Breadcrumb Header */}
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-6 pb-2 border-b border-slate-800/60">
            <span>Docs</span>
            <span>/</span>
            <span className="text-slate-400">{currentPage.group}</span>
            <span>/</span>
            <span className="text-emerald-400 font-semibold">{currentPage.text}</span>
          </div>

          {/* SECTION ROUTING */}

          {/* 1. Official Plugin Views with Embedded Video Tutorials */}
          {activeSection.startsWith('plugin-') ? (
            <PluginDocView
              pluginName={activeSection.replace('plugin-', '')}
              onCopy={onCopy}
            />
          ) : activeSection === 'introduction' ? (
            
            /* 2. Guide: What is avm? */
            <div className="space-y-10">
              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
                  What is avm?
                </h1>
                <p className="text-slate-300 text-base leading-relaxed max-w-3xl">
                  <strong className="text-white">avm</strong> is an ultra-fast, native CLI version manager and project orchestrator. 
                  It manages multiple runtime versions (like Node.js, OpenJDK Temurin, Android SDK) and anchors directory-scoped command aliases and environment variables in a single version-controlled configuration.
                </p>
              </div>

              {/* Motivation */}
              <div className="rounded-2xl bg-slate-900/50 border border-slate-800 p-6 sm:p-8 space-y-4">
                <h3 className="text-xl font-bold text-white">Why avm?</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Traditional version managers like <em>asdf</em>, <em>nvm</em>, and <em>rbenv</em> rely on heavy bash harness scripts, nested subshells, and fragmented configuration files (<code className="text-emerald-300 font-mono text-xs bg-slate-950 px-1 py-0.5 rounded">.tool-versions</code>, <code className="text-emerald-300 font-mono text-xs bg-slate-950 px-1 py-0.5 rounded">.nvmrc</code>, <code className="text-emerald-300 font-mono text-xs bg-slate-950 px-1 py-0.5 rounded">.ruby-version</code>).
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 text-xs">
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-rose-400 font-bold block mb-1">Traditional Friction</span>
                    <ul className="space-y-1.5 text-slate-400">
                      <li>&bull; Slower prompt load times due to shell wrappers</li>
                      <li>&bull; Compiling plugins and runtimes from source</li>
                      <li>&bull; Command drift across engineering teammates</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/20 bg-emerald-950/10">
                    <span className="text-emerald-400 font-bold block mb-1">The avm Approach</span>
                    <ul className="space-y-1.5 text-slate-300">
                      <li>&bull; Pure compiled Rust with &lt;1ms execution latency</li>
                      <li>&bull; Precompiled standalone binaries with zero compilation</li>
                      <li>&bull; Unified <code className="font-mono text-emerald-300">.avm.json</code> for aliases, tools, and env vars</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Core Features */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">Core Capabilities</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800">
                    <Package className="w-5 h-5 text-emerald-400 mb-2" />
                    <h4 className="font-bold text-white text-sm mb-1">Plugin Marketplace</h4>
                    <p className="text-xs text-slate-400">
                      Native executables fetched on demand directly from GitHub Releases.
                    </p>
                  </div>
                  <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800">
                    <Terminal className="w-5 h-5 text-emerald-400 mb-2" />
                    <h4 className="font-bold text-white text-sm mb-1">Static PATH Shims</h4>
                    <p className="text-xs text-slate-400">
                      Zero subshell overhead. Commands resolve immediately on invocation.
                    </p>
                  </div>
                  <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800">
                    <FileJson className="w-5 h-5 text-emerald-400 mb-2" />
                    <h4 className="font-bold text-white text-sm mb-1">Unified Config</h4>
                    <p className="text-xs text-slate-400">
                      A single <code className="text-emerald-300 font-mono text-[11px]">.avm.json</code> file commits your team's workflow to git.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          ) : activeSection === 'getting-started' ? (

            /* 3. Guide: Getting Started */
            <div className="space-y-10">
              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
                  Getting Started
                </h1>
                <p className="text-slate-300 text-base leading-relaxed max-w-3xl">
                  Install avm on macOS or Linux in seconds. Choose your preferred package manager or run the automated shell installer.
                </p>
              </div>

              {/* Installation Methods */}
              <div className="rounded-2xl bg-slate-900/50 border border-slate-800 p-6 sm:p-8 space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">1. Install avm CLI</h3>
                  <p className="text-xs sm:text-sm text-slate-400">
                    Select your installation target (macOS Apple Silicon, Intel, Linux x86_64, arm64):
                  </p>
                </div>
                <TerminalInstallBox onCopy={onCopy} />
                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span>Verify installation in your terminal:</span>
                  <code className="text-emerald-400 font-mono bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                    avm --version
                  </code>
                </div>
              </div>

              {/* Quickstart 5 commands */}
              <div className="rounded-2xl bg-slate-900/40 border border-slate-800 p-6 sm:p-8 space-y-4">
                <h3 className="text-xl font-bold text-white">2. Quickstart in 60 Seconds</h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  Run these 5 simple commands inside any directory to pin tools and configure aliases:
                </p>

                <div className="relative p-5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 space-y-3">
                  <div>
                    <span className="text-slate-500"># 1. Initialize .avm.json in current directory</span>
                    <div className="text-emerald-400 font-bold">$ avm init</div>
                  </div>
                  <div>
                    <span className="text-slate-500"># 2. Add an official runtime provider (e.g. Node.js)</span>
                    <div className="text-emerald-400 font-bold">$ avm plugin add node</div>
                  </div>
                  <div>
                    <span className="text-slate-500"># 3. Download and install a runtime version</span>
                    <div className="text-emerald-400 font-bold">$ avm node install 22.14.0</div>
                  </div>
                  <div>
                    <span className="text-slate-500"># 4. Pin version for this project directory</span>
                    <div className="text-emerald-400 font-bold">$ avm node use 22.14.0</div>
                  </div>
                  <div>
                    <span className="text-slate-500"># 5. Add a project alias</span>
                    <div className="text-emerald-400 font-bold">$ avm alias add dev "pnpm run dev"</div>
                  </div>

                  <button
                    onClick={() => handleCopy('qs-cmds', 'avm init\navm plugin add node\navm node install 22.14.0\navm node use 22.14.0\navm alias add dev "pnpm run dev"')}
                    className="absolute top-4 right-4 p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                    title="Copy all"
                  >
                    {copiedId === 'qs-cmds' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

          ) : activeSection === 'shell-setup' ? (

            /* 4. Guide: Shell Setup */
            <div className="space-y-10">
              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
                  Shell Setup & Shims
                </h1>
                <p className="text-slate-300 text-base leading-relaxed max-w-3xl">
                  Configure your shell to transparently intercept commands via <code className="text-emerald-300 font-mono text-xs bg-slate-950 px-1 py-0.5 rounded">~/.avm/shims</code> without manual PATH management.
                </p>
              </div>

              {/* Supported Shells */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {SHELL_SETUP_GUIDE.map((item) => (
                  <div key={item.shell} className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-mono text-sm font-bold text-emerald-400 uppercase">{item.shell}</span>
                        <span className="font-mono text-xs text-slate-500">{item.file}</span>
                      </div>
                      <pre className="font-mono text-xs text-slate-300 mb-4 whitespace-pre-wrap bg-slate-950 p-3 rounded-xl border border-slate-800/80">
                        {item.snippet}
                      </pre>
                    </div>
                    <button
                      onClick={() => handleCopy(`shell-${item.shell}`, item.snippet)}
                      className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono flex items-center justify-center gap-1.5 transition-colors"
                    >
                      {copiedId === `shell-${item.shell}` ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Hook Script</span>
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>

          ) : activeSection === 'usage-core' ? (

            /* 5. Usage: Core */
            <div className="space-y-10">
              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
                  Core Usage & Precedence
                </h1>
                <p className="text-slate-300 text-base leading-relaxed max-w-3xl">
                  Understand how avm discovers configuration files, walks directory hierarchies, and safely falls back to host system binaries.
                </p>
              </div>

              <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6 sm:p-8 space-y-4">
                <h3 className="text-xl font-bold text-white">Hierarchical Precedence</h3>
                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
                    <span className="w-6 h-6 rounded bg-emerald-500 text-slate-950 font-bold flex items-center justify-center font-mono shrink-0">1</span>
                    <div>
                      <strong className="text-white block mb-0.5">Local Project Pin (./.avm.json)</strong>
                      <span className="text-slate-400">Takes absolute priority when running commands from inside that directory tree.</span>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
                    <span className="w-6 h-6 rounded bg-slate-800 text-emerald-400 font-bold flex items-center justify-center font-mono shrink-0">2</span>
                    <div>
                      <strong className="text-white block mb-0.5">Global Machine Fallback (~/.avm.json)</strong>
                      <span className="text-slate-400">Provides developer defaults when a directory has no pinned tool or alias.</span>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
                    <span className="w-6 h-6 rounded bg-slate-800 text-slate-400 font-bold flex items-center justify-center font-mono shrink-0">3</span>
                    <div>
                      <strong className="text-white block mb-0.5">Host System Tool with Warning</strong>
                      <span className="text-slate-400">If a requested version is missing, avm falls back to host binary instead of failing silently.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          ) : activeSection === 'usage-plugins' ? (

            /* 6. Usage: Plugins */
            <div className="space-y-10">
              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
                  Managing Plugins
                </h1>
                <p className="text-slate-300 text-base leading-relaxed max-w-3xl">
                  Commands for installing, listing, updating, and removing plugins in the avm ecosystem.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                  <div className="text-emerald-400 font-bold">avm plugin add &lt;name&gt;</div>
                  <div className="text-slate-400 font-sans text-xs">Downloads precompiled binary from marketplace registry and registers ToolProvider.</div>
                  <pre className="p-2.5 rounded bg-slate-950 text-slate-300 mt-2">$ avm plugin add node</pre>
                </div>
                <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                  <div className="text-emerald-400 font-bold">avm plugin list</div>
                  <div className="text-slate-400 font-sans text-xs">Lists installed plugins in ~/.avm/plugins with their versions and manifests.</div>
                  <pre className="p-2.5 rounded bg-slate-950 text-slate-300 mt-2">$ avm plugin list</pre>
                </div>
                <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                  <div className="text-emerald-400 font-bold">avm plugin update &lt;name&gt;</div>
                  <div className="text-slate-400 font-sans text-xs">Checks upstream GitHub releases for the latest plugin binary and updates it.</div>
                  <pre className="p-2.5 rounded bg-slate-950 text-slate-300 mt-2">$ avm plugin update java</pre>
                </div>
                <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                  <div className="text-emerald-400 font-bold">avm plugin remove &lt;name&gt;</div>
                  <div className="text-slate-400 font-sans text-xs">Removes provider binary and cleans up shims.</div>
                  <pre className="p-2.5 rounded bg-slate-950 text-slate-300 mt-2">$ avm plugin remove ruby</pre>
                </div>
              </div>
            </div>

          ) : activeSection === 'usage-versions' ? (

            /* 7. Usage: Versions */
            <div className="space-y-10">
              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
                  Managing Tool Versions
                </h1>
                <p className="text-slate-300 text-base leading-relaxed max-w-3xl">
                  Install, switch, and pin multiple versions per language or SDK across project directories.
                </p>
              </div>

              <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6 sm:p-8 space-y-6 font-mono text-xs">
                <div>
                  <span className="text-emerald-400 font-bold text-sm block mb-1">1. Browse Available Releases</span>
                  <p className="text-slate-400 font-sans text-xs mb-2">Queries upstream indices directly without cloning heavy repositories:</p>
                  <pre className="p-3 rounded-xl bg-slate-950 text-slate-300 border border-slate-800">$ avm node versions\n$ avm java versions\n$ avm android versions</pre>
                </div>

                <div>
                  <span className="text-emerald-400 font-bold text-sm block mb-1">2. Install Exact or Major Versions</span>
                  <p className="text-slate-400 font-sans text-xs mb-2">Fetches official prebuilt distributions:</p>
                  <pre className="p-3 rounded-xl bg-slate-950 text-slate-300 border border-slate-800">$ avm node install 22.14.0\n$ avm java install 17\n$ avm android install 34</pre>
                </div>

                <div>
                  <span className="text-emerald-400 font-bold text-sm block mb-1">3. Pin Local vs Global</span>
                  <pre className="p-3 rounded-xl bg-slate-950 text-slate-300 border border-slate-800"># Pins in ./.avm.json for the current repository:\n$ avm node use 22.14.0\n\n# Pins machine default in ~/.avm.json:\n$ avm node use 22.14.0 --global</pre>
                </div>
              </div>
            </div>

          ) : activeSection === 'usage-aliases' ? (

            /* 8. Usage: Aliases & Scripts */
            <div className="space-y-10">
              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
                  Aliases & Scripts Discovery
                </h1>
                <p className="text-slate-300 text-base leading-relaxed max-w-3xl">
                  Eliminate command drift. Anchor project aliases inside <code className="text-emerald-300 font-mono text-xs bg-slate-950 px-1 py-0.5 rounded">.avm.json</code> and automatically discover scripts from <code className="text-emerald-300 font-mono text-xs bg-slate-950 px-1 py-0.5 rounded">package.json</code>.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
                  <h4 className="text-emerald-400 font-bold text-sm font-sans">Explicit Project Aliases</h4>
                  <pre className="p-3 rounded-xl bg-slate-950 text-slate-300">$ avm alias add dev "pnpm run dev --port 3000"\n$ avm alias add release "npm run release $1"</pre>
                  <p className="text-slate-400 font-sans text-xs">
                    Supports parameter forwarding ($1, $@) and runs with injected tools and env vars.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
                  <h4 className="text-emerald-400 font-bold text-sm font-sans">Auto package.json Script Discovery</h4>
                  <pre className="p-3 rounded-xl bg-slate-950 text-slate-300">$ avm test\n$ avm build\n$ avm lint</pre>
                  <p className="text-slate-400 font-sans text-xs">
                    Discovers scripts defined in package.json and executes them using your detected package manager (pnpm, npm, yarn, bun).
                  </p>
                </div>
              </div>
            </div>

          ) : activeSection === 'configuration' ? (

            /* 9. Reference: Configuration */
            <div className="space-y-10">
              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
                  Configuration (.avm.json)
                </h1>
                <p className="text-slate-300 text-base leading-relaxed max-w-3xl">
                  Complete JSON specification for the <code className="text-emerald-300 font-mono text-xs bg-slate-950 px-1 py-0.5 rounded">.avm.json</code> file.
                </p>
              </div>

              <div className="relative rounded-2xl bg-slate-950 border border-slate-800 p-5 font-mono text-xs text-slate-300 overflow-x-auto shadow-xl">
<pre>{`{
  // Project-specific aliases with injected environment variables
  "aliases": {
    "dev": "pnpm run dev",
    "release": "npm run release $1",
    "build:apk": "./gradlew assembleRelease"
  },
  // Injected environment variables for this workspace
  "env": {
    "NODE_ENV": "development",
    "API_URL": "https://api.internal.dev"
  },
  // Pinned tool versions (intercepted via shims or avm commands)
  "tools": {
    "node": "22.14.0",
    "java": "17.0.13+11",
    "android": "34"
  }
}`}</pre>
                <button
                  onClick={() => handleCopy('cfg-ref', `{\n  "aliases": {\n    "dev": "pnpm run dev"\n  },\n  "tools": {\n    "node": "22.14.0"\n  }\n}`)}
                  className="absolute top-4 right-4 p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                >
                  {copiedId === 'cfg-ref' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

          ) : activeSection === 'commands' ? (

            /* 10. Reference: All Commands */
            <CliReference onCopy={onCopy} />

          ) : activeSection === 'dependencies' ? (

            /* 11. Reference: Dependencies */
            <div className="space-y-10">
              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
                  Dependencies & Host Environment
                </h1>
                <p className="text-slate-300 text-base leading-relaxed max-w-3xl">
                  avm is compiled directly to machine code with zero external runtime dependencies.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
                <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                  <h4 className="font-bold text-white text-sm">Supported Operating Systems</h4>
                  <ul className="space-y-1 text-slate-300 font-mono text-xs">
                    <li>&bull; macOS (Apple Silicon arm64, Intel x86_64)</li>
                    <li>&bull; Linux (x86_64, aarch64, glibc & musl)</li>
                  </ul>
                </div>
                <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                  <h4 className="font-bold text-white text-sm">Runtime Dependencies</h4>
                  <p className="text-slate-400 text-xs">
                    <strong className="text-emerald-400">Zero dependencies.</strong> No Node.js, Python, Ruby, or GCC is required to run the core <code className="font-mono text-emerald-300">avm-bin</code>.
                  </p>
                </div>
              </div>
            </div>

          ) : activeSection === 'architecture' ? (

            /* 12. Reference: Architecture */
            <div className="space-y-10">
              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
                  Architecture & Wire Protocol
                </h1>
                <p className="text-slate-300 text-base leading-relaxed max-w-3xl">
                  avm isolates plugins as standalone processes communicating over standard input/output using a strongly typed JSON wire protocol.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-emerald-400" />
                  <span>Typed Wire Protocol Commands</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                    <span className="text-emerald-400 font-bold uppercase tracking-wider block mb-1">Queries (Read)</span>
                    <div className="text-slate-400"># Metadata:</div>
                    <div className="text-slate-200">avm-plugin-&lt;name&gt; manifest</div>
                    <div className="text-slate-400 pt-1"># Versions:</div>
                    <div className="text-slate-200">avm-plugin-&lt;name&gt; versions</div>
                    <div className="text-slate-400 pt-1"># Env exports:</div>
                    <div className="text-slate-200">avm-plugin-&lt;name&gt; env-vars &lt;version&gt;</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                    <span className="text-emerald-400 font-bold uppercase tracking-wider block mb-1">Lifecycle (Write)</span>
                    <div className="text-slate-400"># Install:</div>
                    <div className="text-slate-200">avm-plugin-&lt;name&gt; install &lt;version&gt;</div>
                    <div className="text-slate-400 pt-1"># Uninstall:</div>
                    <div className="text-slate-200">avm-plugin-&lt;name&gt; uninstall &lt;version&gt;</div>
                    <div className="text-slate-400 pt-1"># Executable:</div>
                    <div className="text-slate-200">avm-plugin-&lt;name&gt; executable-path &lt;version&gt;</div>
                  </div>
                </div>
              </div>
            </div>

          ) : activeSection === 'comparison' ? (

            /* 13. Reference: Comparison Matrix */
            <div className="space-y-10">
              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
                  Comparison Matrix
                </h1>
                <p className="text-slate-300 text-base leading-relaxed max-w-3xl">
                  Side-by-side comparison of avm against asdf, vfox, and nvm.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 overflow-hidden bg-slate-900/60 shadow-xl overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 bg-slate-950/80 font-mono text-slate-300">
                      <th className="p-4 font-semibold">Capability</th>
                      <th className="p-4 font-bold text-emerald-400 bg-emerald-500/10">avm</th>
                      <th className="p-4 font-semibold text-slate-400">asdf</th>
                      <th className="p-4 font-semibold text-slate-400">vfox</th>
                      <th className="p-4 font-semibold text-slate-400">nvm</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-sans">
                    {COMPARISONS.map((comp, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                        <td className="p-4 font-mono font-medium text-slate-200 whitespace-nowrap">{comp.feature}</td>
                        <td className="p-4 font-medium text-emerald-300 bg-emerald-500/5">{comp.avm}</td>
                        <td className="p-4 text-slate-400">{comp.asdf}</td>
                        <td className="p-4 text-slate-400">{comp.vfox}</td>
                        <td className="p-4 text-slate-400">{comp.nvm}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          ) : activeSection === 'faq' ? (

            /* 16. Questions: FAQ */
            <div className="space-y-10">
              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
                  Frequently Asked Questions
                </h1>
                <p className="text-slate-300 text-base leading-relaxed max-w-3xl">
                  Answers to common questions regarding avm's runtime model, performance, and compatibility.
                </p>
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                {[
                  { q: 'How does avm achieve sub-millisecond execution overhead?', a: 'avm is built in pure Rust and uses static directory-aware PATH shims in ~/.avm/shims. It avoids sourcing large bash files, spawning subshells, or hooking cd.' },
                  { q: 'Can I use globally installed packages across different local version pins?', a: 'Yes! avm supports global package sharing, meaning globally installed tools (like npm -g packages) remain reachable even when a directory pins a different version.' },
                  { q: 'Where are plugins downloaded and installed?', a: 'Plugins are stored in ~/.avm/plugins/avm-plugin-<name>, while downloaded runtimes reside in ~/.avm/tools/<name>/<version>.' },
                  { q: 'What happens if a requested tool version is not installed?', a: 'avm gracefully prints a clear diagnostic notice and executes your host system binary fallback if available, rather than abruptly aborting.' },
                ].map((item, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
                    <h4 className="font-bold text-white text-base mb-2">{item.q}</h4>
                    <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>

          ) : activeSection === 'troubleshooting' ? (

            /* 17. Questions: Troubleshooting */
            <div className="space-y-10">
              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
                  Troubleshooting & Diagnostics
                </h1>
                <p className="text-slate-300 text-base leading-relaxed max-w-3xl">
                  Diagnostic steps to resolve PATH ordering, shell hook evaluation, and emulator permissions.
                </p>
              </div>

              <div className="space-y-4 font-mono text-xs">
                <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                  <h4 className="font-bold text-white font-sans text-sm">1. Check Active Environment Variables</h4>
                  <pre className="p-3 rounded-xl bg-slate-950 text-emerald-300">$ avm env</pre>
                  <p className="text-slate-400 font-sans text-xs">Prints exact exported variables including JAVA_HOME, ANDROID_HOME, and PATH order.</p>
                </div>
                <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                  <h4 className="font-bold text-white font-sans text-sm">2. Verify Shim Resolution</h4>
                  <pre className="p-3 rounded-xl bg-slate-950 text-emerald-300">$ which node\n$ which java\n$ which adb</pre>
                  <p className="text-slate-400 font-sans text-xs">Should point to ~/.avm/shims/&lt;binary&gt;.</p>
                </div>
              </div>
            </div>

          ) : activeSection === 'contribute-core' ? (

            /* 18. Contribute: Core */
            <div className="space-y-10">
              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
                  Contributing to avm Core
                </h1>
                <p className="text-slate-300 text-base leading-relaxed max-w-3xl">
                  We welcome contributions! avm is completely open source under the MIT license.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4 font-mono text-xs">
                <span className="text-white font-bold text-sm font-sans">Build from Source</span>
                <pre className="p-4 rounded-xl bg-slate-950 text-slate-300 border border-slate-800">$ git clone https://github.com/PrajaNova/avm.git\n$ cd avm\n$ cargo check\n$ cargo test\n$ cargo build --release</pre>
              </div>
            </div>

          ) : (

            /* 17. Contribute: Docs */
            <div className="space-y-10">
              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
                  Contributing Documentation
                </h1>
                <p className="text-slate-300 text-base leading-relaxed max-w-3xl">
                  Help improve our guides, shell integration instructions, and troubleshooting tips.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
                <h4 className="text-base font-bold text-white">Submitting Documentation Changes</h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Fork <a href="https://github.com/PrajaNova/avm" target="_blank" rel="noreferrer" className="text-emerald-400 underline">PrajaNova/avm</a>, improve the documentation or guide files, and open a Pull Request!
                </p>
              </div>
            </div>

          )}

          {/* Previous / Next Page Navigation Cards (like asdf-vm/VitePress) */}
          <div className="mt-16 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            {prevPage ? (
              <button
                onClick={() => handleSelectSection(prevPage.id)}
                className="flex-1 flex flex-col items-start p-4 rounded-xl bg-slate-900/50 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all group text-left"
              >
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400 group-hover:text-emerald-400 mb-1">
                  <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                  <span>Previous page</span>
                </div>
                <span className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                  {prevPage.text}
                </span>
              </button>
            ) : (
              <div className="flex-1" />
            )}

            {nextPage && (
              <button
                onClick={() => handleSelectSection(nextPage.id)}
                className="flex-1 flex flex-col items-end p-4 rounded-xl bg-slate-900/50 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all group text-right"
              >
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400 group-hover:text-emerald-400 mb-1">
                  <span>Next page</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
                <span className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                  {nextPage.text}
                </span>
              </button>
            )}
          </div>

        </main>
      </div>

    </div>
  );
};
