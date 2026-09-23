import React, { useState } from 'react';
import {
  ExternalLink,
  Copy,
  Check,
  Package,
  Layers,
  Sparkles,
  FileJson,
  Cpu
} from 'lucide-react';
import { EXTENDED_PLUGIN_METADATA } from '../../data/registryData';
import { PLUGIN_WALKTHROUGHS } from '../../data/pluginWalkthroughData';
import { WalkthroughVideo, WalkthroughStep } from '../WalkthroughVideo';

interface PluginDocViewProps {
  pluginName: string;
  onCopy: (text: string) => void;
}

export const PluginDocView: React.FC<PluginDocViewProps> = ({
  pluginName,
  onCopy,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const cleanName = pluginName.toLowerCase().replace(/^avm-plugin-/, '');
  const meta = EXTENDED_PLUGIN_METADATA[cleanName];

  // Title formatting
  const pluginTitles: Record<string, string> = {
    node: 'Node.js Runtime Provider',
    java: 'OpenJDK Temurin Provider',
    android: 'Android SDK & Emulator Provider',
  };

  const title = pluginTitles[cleanName] || `${cleanName.toUpperCase()} Provider`;
  const repoName = `PrajaNova/avm-plugin-${cleanName}`;

  // Walkthrough data with fallback
  const walkthrough = PLUGIN_WALKTHROUGHS[cleanName] || {
    title: `${title} Walkthrough`,
    badge: `avm-plugin-${cleanName}`,
    steps: [
      {
        id: `${cleanName}-add`,
        stepNumber: '01',
        label: 'Add Plugin',
        command: `avm plugin add ${cleanName}`,
        comment: `# Fetch precompiled ${cleanName} plugin from registry`,
        output: `Resolving '${cleanName}' from PrajaNova/avm-marketplace...\nDownloading release binary for your OS...\n✓ Registered ToolProvider ~/.avm/plugins/avm-plugin-${cleanName}/bin/avm-plugin`,
        timing: '0.8s',
      },
      {
        id: `${cleanName}-versions`,
        stepNumber: '02',
        label: 'Browse Versions',
        command: `avm ${cleanName} versions`,
        comment: `# List upstream releases available for installation`,
        output: `Available ${cleanName} versions:\n  latest (stable)\n  lts\n  v2.0.0\n  v1.9.4`,
        timing: '250ms',
      },
      {
        id: `${cleanName}-install`,
        stepNumber: '03',
        label: 'Download Binary',
        command: `avm ${cleanName} install latest`,
        comment: `# Fast binary fetch of official release`,
        output: `Downloading upstream release...\nExtracting to ~/.avm/tools/${cleanName}/latest...\n✓ Successfully installed ${cleanName}`,
        timing: '1.9s',
      },
      {
        id: `${cleanName}-use`,
        stepNumber: '04',
        label: 'Pin Local Version',
        command: `avm ${cleanName} use latest`,
        comment: `# Pin version in local .avm.json`,
        output: `✓ Updated ./.avm.json:\n  "tools": {\n    "${cleanName}": "latest"\n  }\nDirectory activated: ${cleanName}`,
        timing: '<1ms',
      },
      {
        id: `${cleanName}-env`,
        stepNumber: '05',
        label: 'Export Env',
        command: `avm env`,
        comment: `# Injects environment variables and PATH shims`,
        output: `export PATH="/Users/dev/.avm/shims:$PATH"`,
        timing: '<0.3ms',
      },
      {
        id: `${cleanName}-verify`,
        stepNumber: '06',
        label: 'Verify Shim',
        command: `which ${cleanName}`,
        comment: `# Transparent shim resolution without subshell latency`,
        output: `/Users/dev/.avm/shims/${cleanName}`,
        timing: '<0.2ms',
      },
    ] as WalkthroughStep[],
  };

  const handleCopy = (id: string, text: string) => {
    onCopy(text);
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-12">
      
      {/* Breadcrumb & Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-3">
          <span>Documentation</span>
          <span>/</span>
          <span>Plugins</span>
          <span>/</span>
          <span className="text-emerald-400 font-semibold">{cleanName}</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {title}
              </h1>
              <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                Official
              </span>
            </div>
            <p className="text-slate-400 text-sm font-mono">
              avm-plugin-{cleanName} &bull; Precompiled Native Executable
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`https://github.com/${repoName}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-all text-xs font-mono"
            >
              <span>GitHub</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </div>
        </div>
      </div>

      {/* Embedded Video Tutorial & Interactive Walkthrough */}
      <div>
        <div className="flex items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive Tutorial & CLI Demo</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              {walkthrough.title}
            </h2>
          </div>
          <span className="hidden sm:inline-block text-xs font-mono text-slate-500">
            6 interactive steps
          </span>
        </div>

        {/* Multi-mode Walkthrough Component */}
        <WalkthroughVideo
          steps={walkthrough.steps}
          title={walkthrough.title}
          badge={walkthrough.badge}
          className="w-full mb-0"
          onCopy={onCopy}
        />
      </div>

      {/* Quick Install Bar */}
      <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6 sm:p-7">
        <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
          <Package className="w-4 h-4 text-emerald-400" />
          <span>Quick Installation</span>
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 mb-4 leading-relaxed">
          Install the precompiled standalone executable directly into <code className="text-emerald-300 font-mono text-xs bg-slate-950 px-1.5 py-0.5 rounded">~/.avm/plugins/avm-plugin-{cleanName}</code>:
        </p>

        <div className="relative rounded-xl bg-slate-950 border border-slate-800 p-4 font-mono text-xs sm:text-sm text-emerald-300 flex items-center justify-between">
          <span>avm plugin add {cleanName}</span>
          <button
            onClick={() => handleCopy('install-cmd', `avm plugin add ${cleanName}`)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Copy command"
          >
            {copiedId === 'install-cmd' ? (
              <Check className="w-4 h-4 text-emerald-400" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Key Commands Table */}
      {meta?.keyCommands && meta.keyCommands.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-white font-bold text-lg">
            <Layers className="w-5 h-5 text-emerald-400" />
            <span>Key Commands</span>
          </div>

          <div className="rounded-xl border border-slate-800 overflow-hidden bg-slate-900/40">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/80 font-mono text-slate-400">
                  <th className="p-3.5 font-semibold">Command</th>
                  <th className="p-3.5 font-semibold">Purpose</th>
                  <th className="p-3.5 text-right font-semibold">Copy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {meta.keyCommands.map((cmd, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                    <td className="p-3.5 text-emerald-300 font-semibold whitespace-nowrap">
                      {cmd.command}
                    </td>
                    <td className="p-3.5 text-slate-300 font-sans text-xs">
                      {cmd.description}
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => handleCopy(`cmd-${idx}`, cmd.command)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                        title="Copy command"
                      >
                        {copiedId === `cmd-${idx}` ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Environment Injections */}
      {meta?.envVars && meta.envVars.length > 0 && (
        <div className="rounded-2xl bg-slate-900/50 border border-slate-800 p-6 sm:p-7">
          <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-emerald-400" />
            <span>Environment Variable Injections</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mb-4 leading-relaxed">
            When you run an alias (e.g. <code className="text-emerald-300 font-mono text-xs bg-slate-950 px-1 py-0.5 rounded">avm dev</code>) or call shims directly, the plugin exports the following environment variables:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {meta.envVars.map((env, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 font-mono text-xs flex items-center justify-between text-slate-300"
              >
                <span className="text-emerald-400 font-semibold">{env}</span>
                <span className="text-[11px] text-slate-500">Auto-injected</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sample .avm.json Snippet */}
      {meta?.sampleConfig && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-white font-bold text-lg">
            <FileJson className="w-5 h-5 text-emerald-400" />
            <span>Sample Project Configuration (.avm.json)</span>
          </div>

          <div className="relative rounded-2xl bg-slate-950 border border-slate-800 p-5 font-mono text-xs text-slate-300 overflow-x-auto shadow-lg">
            <pre>{meta.sampleConfig}</pre>
            <button
              onClick={() => handleCopy('sample-cfg', meta.sampleConfig || '')}
              className="absolute top-4 right-4 p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="Copy config"
            >
              {copiedId === 'sample-cfg' ? (
                <Check className="w-4 h-4 text-emerald-400" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      )}

      {/* Feature Highlights */}
      {meta?.highlights && meta.highlights.length > 0 && (
        <div className="rounded-2xl bg-slate-900/30 border border-slate-800 p-6 sm:p-7 space-y-3">
          <h3 className="text-base font-bold text-white">Features & Highlights</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
            {meta.highlights.map((highlight, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

    </div>
  );
};
