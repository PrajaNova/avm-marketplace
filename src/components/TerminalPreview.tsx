import React, { useState } from 'react';
import { Terminal, Check, Copy } from 'lucide-react';

interface TerminalTab {
  id: string;
  label: string;
  lines: {
    type: 'input' | 'output' | 'comment' | 'success';
    text: string;
  }[];
}

const TERMINAL_TABS: TerminalTab[] = [
  {
    id: 'quickstart',
    label: '🚀 Quickstart',
    lines: [
      { type: 'comment', text: '# Initialize avm in your project' },
      { type: 'input', text: 'avm init' },
      { type: 'success', text: '✓ Initialized .avm.json' },
      { type: 'comment', text: '# Define project-scoped command aliases' },
      { type: 'input', text: 'avm add dev "pnpm run dev --filter web"' },
      { type: 'success', text: '✓ Added alias "dev" -> "pnpm run dev --filter web"' },
      { type: 'comment', text: '# Execute directly without shell drift or path confusion' },
      { type: 'input', text: 'avm dev' },
      { type: 'output', text: '> web@1.0.0 dev\n> vite dev --port 3000\n  ➜  Local:   http://localhost:3000/' }
    ]
  },
  {
    id: 'node',
    label: '⚡️ Node & Scripts',
    lines: [
      { type: 'comment', text: '# Add the native Node plugin from marketplace' },
      { type: 'input', text: 'avm plugin add node' },
      { type: 'output', text: 'Resolving "node" from marketplace registry...\nFound PrajaNova/avm-plugin-node\nDownloading release for darwin_arm64...\n✓ Installed ~/.avm/plugins/avm-plugin-node/bin/avm-plugin' },
      { type: 'comment', text: '# Pin Node version locally in .avm.json' },
      { type: 'input', text: 'avm node use 22.14.0' },
      { type: 'success', text: '✓ Set local tools.node = "22.14.0"' },
      { type: 'comment', text: '# Package.json scripts are discovered automatically!' },
      { type: 'input', text: 'avm test' },
      { type: 'output', text: 'Discovered package script "test" (using pnpm)\n✓ 14 passed (1.2s)' }
    ]
  },
  {
    id: 'java-android',
    label: '☕️ Java & Android',
    lines: [
      { type: 'comment', text: '# Install OpenJDK and Android SDK via marketplace' },
      { type: 'input', text: 'avm plugin add java && avm plugin add android' },
      { type: 'success', text: '✓ Installed avm-plugin-java and avm-plugin-android' },
      { type: 'comment', text: '# Pin OpenJDK 17 and Android API 34' },
      { type: 'input', text: 'avm java install 17 && avm android install 34' },
      { type: 'output', text: 'Pulling Temurin 17.0.13+11 via Foojay Disco API...\nPulling Android platform-34, build-tools, and emulator...' },
      { type: 'comment', text: '# JAVA_HOME and ANDROID_HOME are injected automatically!' },
      { type: 'input', text: 'avm env' },
      { type: 'output', text: 'export JAVA_HOME="/Users/.../.avm/tools/java/openjdk-17.0.13+11"\nexport ANDROID_HOME="/Users/.../.avm/tools/android/34"\nexport ANDROID_SDK_ROOT="/Users/.../.avm/tools/android/34"' }
    ]
  },
  {
    id: 'shims',
    label: '🛡️ PATH Shims',
    lines: [
      { type: 'comment', text: '# Initialize shell shims in ~/.zshrc or ~/.bashrc' },
      { type: 'input', text: 'eval "$(avm shell-init)"' },
      { type: 'comment', text: '# Plain commands transparently resolve to the active project pin' },
      { type: 'input', text: 'which node' },
      { type: 'output', text: '/Users/.../.avm/shims/node' },
      { type: 'input', text: 'node -v' },
      { type: 'output', text: 'v22.14.0' },
      { type: 'comment', text: '# Global packages stay reachable even when switching versions' },
      { type: 'input', text: 'which ts-node' },
      { type: 'output', text: '/Users/.../.avm/tools/node/20.11.1/bin/ts-node (global fallback)' }
    ]
  }
];

export const TerminalPreview: React.FC = () => {
  const [activeTab, setActiveTab] = useState(TERMINAL_TABS[0].id);
  const [copied, setCopied] = useState(false);

  const currentTab = TERMINAL_TABS.find((t) => t.id === activeTab) || TERMINAL_TABS[0];

  const handleCopyAll = () => {
    const rawCode = currentTab.lines
      .filter((l) => l.type === 'input')
      .map((l) => l.text)
      .join('\n');
    navigator.clipboard.writeText(rawCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-24">
      <div className="rounded-2xl border border-slate-800 bg-slate-950/90 shadow-2xl overflow-hidden backdrop-blur-xl">
        
        {/* Terminal Header */}
        <div className="flex flex-wrap items-center justify-between border-b border-slate-800/80 px-4 py-3 bg-slate-900/60">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="h-3 w-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="h-3 w-3 rounded-full bg-emerald-500/80 inline-block" />
            <span className="ml-2 font-mono text-xs text-slate-400 font-medium hidden sm:inline">
              avm-cli session &mdash; zsh
            </span>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto py-1 sm:py-0">
            {TERMINAL_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1 rounded-md text-xs font-mono font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-slate-800 text-emerald-300 border border-slate-700'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Copy Snippet */}
          <button
            onClick={handleCopyAll}
            className="flex items-center gap-1 text-[11px] font-mono text-slate-400 hover:text-white transition-colors"
            title="Copy commands"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>

        {/* Terminal Body */}
        <div className="p-5 sm:p-6 font-mono text-xs sm:text-sm overflow-x-auto space-y-2.5 max-h-[420px] overflow-y-auto">
          {currentTab.lines.map((line, idx) => {
            if (line.type === 'comment') {
              return (
                <div key={idx} className="text-slate-500 italic select-none pt-1">
                  {line.text}
                </div>
              );
            }
            if (line.type === 'input') {
              return (
                <div key={idx} className="flex items-center gap-2 text-slate-100 font-semibold">
                  <span className="text-emerald-400 select-none">$</span>
                  <span>{line.text}</span>
                </div>
              );
            }
            if (line.type === 'success') {
              return (
                <div key={idx} className="text-emerald-400 pl-4 font-medium">
                  {line.text}
                </div>
              );
            }
            return (
              <pre key={idx} className="text-slate-300 whitespace-pre-wrap pl-4 text-xs font-mono text-slate-400 leading-relaxed">
                {line.text}
              </pre>
            );
          })}
        </div>

        {/* Terminal Footer */}
        <div className="border-t border-slate-900 bg-slate-950 px-4 py-2 flex items-center justify-between text-[11px] font-mono text-slate-500">
          <div className="flex items-center gap-2">
            <Terminal className="w-3 h-3 text-emerald-500" />
            <span>Pure Rust binary &bull; No Python/Ruby dependencies</span>
          </div>
          <span>PrajaNova/avm</span>
        </div>
      </div>
    </div>
  );
};
