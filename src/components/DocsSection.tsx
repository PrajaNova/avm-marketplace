import { useState } from 'react';
import { BookOpen, Copy, Check, Cpu } from 'lucide-react';
import { COMPARISONS, SHELL_SETUP_GUIDE } from '../data/guideData';

interface DocsSectionProps {
  onCopy: (text: string) => void;
}

export const DocsSection: React.FC<DocsSectionProps> = ({ onCopy }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    onCopy(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="docs" className="py-20 border-t border-slate-900 bg-slate-950/70 scroll-mt-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs font-semibold mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            Complete Guide & Reference
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How avm Works & Setup Guide
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Everything you need to configure your projects, set up shell shims, and eliminate runtime drift.
          </p>
        </div>

        {/* Step-by-step Setup */}
        <div className="space-y-12 mb-20">
          
          {/* Step 1 */}
          <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500 text-slate-950 font-bold font-mono text-sm">
                1
              </span>
              <h3 className="text-xl font-bold text-white">Install avm-bin</h3>
            </div>
            <p className="text-slate-300 text-sm mb-4 leading-relaxed">
              Install the standalone native Rust executable. It places <code className="text-emerald-300 font-mono text-xs bg-slate-950 px-1.5 py-0.5 rounded">avm-bin</code> in <code className="text-emerald-300 font-mono text-xs bg-slate-950 px-1.5 py-0.5 rounded">/usr/local/bin</code> or <code className="text-emerald-300 font-mono text-xs bg-slate-950 px-1.5 py-0.5 rounded">~/.local/bin</code>.
            </p>
            <div className="relative rounded-xl bg-slate-950 border border-slate-800 p-4 font-mono text-xs sm:text-sm text-emerald-300 overflow-x-auto">
              curl -fsSL https://raw.githubusercontent.com/prajanova/avm/main/install.sh | bash
              <button
                onClick={() => handleCopy('step1', 'curl -fsSL https://raw.githubusercontent.com/prajanova/avm/main/install.sh | bash')}
                className="absolute top-3 right-3 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                title="Copy command"
              >
                {copiedId === 'step1' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Step 2 */}
          <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500 text-slate-950 font-bold font-mono text-sm">
                2
              </span>
              <h3 className="text-xl font-bold text-white">Hook Into Your Shell</h3>
            </div>
            <p className="text-slate-300 text-sm mb-4 leading-relaxed">
              Add the shell hook to your shell configuration file. This activates <code className="text-emerald-300 font-mono text-xs bg-slate-950 px-1.5 py-0.5 rounded">eval "$(avm shell-init)"</code>, allowing PATH shims to transparently resolve commands like <code className="text-emerald-300 font-mono text-xs bg-slate-950 px-1.5 py-0.5 rounded">node</code>, <code className="text-emerald-300 font-mono text-xs bg-slate-950 px-1.5 py-0.5 rounded">java</code>, or <code className="text-emerald-300 font-mono text-xs bg-slate-950 px-1.5 py-0.5 rounded">adb</code>.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {SHELL_SETUP_GUIDE.map((item) => (
                <div key={item.shell} className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold text-emerald-400 uppercase">{item.shell}</span>
                    <span className="font-mono text-[11px] text-slate-500">{item.file}</span>
                  </div>
                  <pre className="font-mono text-[11px] text-slate-300 mb-3 whitespace-pre-wrap">
                    {item.snippet}
                  </pre>
                  <button
                    onClick={() => handleCopy(`shell-${item.shell}`, item.snippet)}
                    className="w-full py-1.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-mono flex items-center justify-center gap-1.5 border border-slate-800"
                  >
                    {copiedId === `shell-${item.shell}` ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy Script</span>
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Step 3 */}
          <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500 text-slate-950 font-bold font-mono text-sm">
                3
              </span>
              <h3 className="text-xl font-bold text-white">Project Configuration: .avm.json</h3>
            </div>
            <p className="text-slate-300 text-sm mb-4 leading-relaxed">
              Initialize a configuration file with <code className="text-emerald-300 font-mono text-xs bg-slate-950 px-1.5 py-0.5 rounded">avm init</code>. A single JSON structure unifies command aliases, project environment variables, and pinned tool versions:
            </p>

            <div className="relative rounded-xl bg-slate-950 border border-slate-800 p-4 font-mono text-xs text-slate-300 overflow-x-auto">
{`{
  "aliases": {
    "dev": "pnpm run dev",
    "release": "npm run release $1",
    "build:apk": "./gradlew assembleRelease"
  },
  "env": {
    "NODE_ENV": "development",
    "API_BASE": "https://api.internal.dev"
  },
  "tools": {
    "node": "22.14.0",
    "java": "17.0.13+11",
    "android": "34"
  }
}`}
              <button
                onClick={() => handleCopy('avm-json', `{\n  "aliases": {\n    "dev": "pnpm run dev",\n    "release": "npm run release $1"\n  },\n  "env": {\n    "NODE_ENV": "development"\n  },\n  "tools": {\n    "node": "22.14.0"\n  }\n}`)}
                className="absolute top-3 right-3 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                title="Copy JSON"
              >
                {copiedId === 'avm-json' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Precedence details */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                <span className="text-emerald-400 font-mono font-bold block mb-1">Local-First</span>
                <span className="text-slate-400">Current folder's .avm.json takes highest priority over global settings.</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                <span className="text-emerald-400 font-mono font-bold block mb-1">Global Fallback</span>
                <span className="text-slate-400">~/.avm.json provides machine defaults when local project is unpinned.</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                <span className="text-emerald-400 font-mono font-bold block mb-1">System Fallback</span>
                <span className="text-slate-400">If a requested version is not installed, avm falls back to host binary with a warning.</span>
              </div>
            </div>
          </div>

        </div>

        {/* Architecture & Wire Protocol Overview */}
        <div className="rounded-2xl bg-slate-900/40 border border-slate-800 p-6 sm:p-8 mb-20">
          <div className="flex items-center gap-3 mb-6">
            <Cpu className="w-6 h-6 text-emerald-400" />
            <h3 className="text-2xl font-bold text-white">The Architecture & Plugin Wire Protocol</h3>
          </div>

          <p className="text-sm text-slate-300 mb-6 leading-relaxed">
            Unlike other version managers that embed plugin runtimes or invoke multi-step bash scripts, 
            <strong className="text-white"> avm keeps the core binary lean (&lt; 5MB)</strong>. 
            Plugins are standalone executables that communicate over standard input/output using a strongly typed JSON protocol:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono mb-6">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-emerald-400 font-bold uppercase tracking-wider">JSON Read Commands</div>
              <div className="text-slate-300">
                <div className="text-slate-400"># Queries metadata:</div>
                <div>avm-plugin-&lt;name&gt; manifest</div>
                <div className="text-slate-400 pt-1"># Queries upstream versions index:</div>
                <div>avm-plugin-&lt;name&gt; versions</div>
                <div className="text-slate-400 pt-1"># Queries environment exports:</div>
                <div>avm-plugin-&lt;name&gt; env-vars &lt;version&gt;</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-emerald-400 font-bold uppercase tracking-wider">Lifecycle Commands</div>
              <div className="text-slate-300">
                <div className="text-slate-400"># Streams live installation progress:</div>
                <div>avm-plugin-&lt;name&gt; install &lt;version&gt;</div>
                <div className="text-slate-400 pt-1"># Clean uninstallation:</div>
                <div>avm-plugin-&lt;name&gt; uninstall &lt;version&gt;</div>
                <div className="text-slate-400 pt-1"># Locates executable inside install root:</div>
                <div>avm-plugin-&lt;name&gt; executable-path &lt;version&gt;</div>
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-400">
            Malfunctions or malformed JSON in a third-party plugin produce typed errors without crashing the <code className="text-emerald-300 font-mono">avm</code> CLI or polluting host shell environments.
          </p>
        </div>

        {/* Comparison Matrix */}
        <div>
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white">Comparison with asdf, vfox, and nvm</h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              How avm compares to existing alternatives in performance, security, and developer ergonomics.
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
                  <th className="p-4 font-semibold text-slate-400">nvm</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans">
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
                    <td className="p-4 text-slate-400">
                      {comp.nvm}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
};
