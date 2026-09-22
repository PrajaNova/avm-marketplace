import { useState } from 'react';
import { X, Copy, Check, Github, ExternalLink, Shield, Layers } from 'lucide-react';
import { PluginDetail } from '../types';

interface PluginModalProps {
  plugin: PluginDetail | null;
  onClose: () => void;
  onCopy: (text: string) => void;
}

export const PluginModal: React.FC<PluginModalProps> = ({ plugin, onClose, onCopy }) => {
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  if (!plugin) return null;

  const handleCopy = (text: string) => {
    onCopy(text);
    setCopiedCmd(text);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-2xl rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-mono font-bold text-lg">
              {plugin.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white">avm-plugin-{plugin.name}</h3>
                <span className="text-xs font-mono font-medium px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  {plugin.section_label}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">{plugin.repo}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Description */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">Description</h4>
            <p className="text-slate-200 text-sm leading-relaxed">{plugin.description}</p>
          </div>

          {/* Quick Install Bar */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">Install Command</h4>
            <div className="flex items-center justify-between bg-slate-950 border border-slate-800 rounded-xl p-3 font-mono text-xs sm:text-sm">
              <span className="text-emerald-300">avm plugin add {plugin.name}</span>
              <button
                onClick={() => handleCopy(`avm plugin add ${plugin.name}`)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-sans font-medium transition-colors"
              >
                {copiedCmd === `avm plugin add ${plugin.name}` ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Key Commands Table */}
          {plugin.keyCommands && plugin.keyCommands.length > 0 && (
            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">Plugin Commands</h4>
              <div className="rounded-xl border border-slate-800 bg-slate-950/40 overflow-hidden divide-y divide-slate-800/80">
                {plugin.keyCommands.map((cmd, idx) => (
                  <div key={idx} className="p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    <div className="space-y-1">
                      <div className="font-mono text-emerald-300 font-medium">{cmd.command}</div>
                      <div className="text-slate-400">{cmd.description}</div>
                    </div>
                    <button
                      onClick={() => handleCopy(cmd.command)}
                      className="self-start sm:self-center shrink-0 p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800"
                      title="Copy command"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Environment Variables */}
          {plugin.envVars && plugin.envVars.length > 0 && (
            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                Automatic Environment Variables
              </h4>
              <div className="flex flex-wrap gap-2">
                {plugin.envVars.map((env, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-md bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300">
                    {env}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Sample .avm.json */}
          {plugin.sampleConfig && (
            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-emerald-400" />
                Sample .avm.json
              </h4>
              <div className="relative">
                <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto">
                  {plugin.sampleConfig}
                </pre>
                <button
                  onClick={() => handleCopy(plugin.sampleConfig || '')}
                  className="absolute top-3 right-3 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                  title="Copy JSON"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Plugin Highlights */}
          {plugin.highlights && plugin.highlights.length > 0 && (
            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">Capabilities</h4>
              <ul className="space-y-1.5">
                {plugin.highlights.map((item, idx) => (
                  <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">&bull;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <a
            href={`https://github.com/${plugin.repo}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-xs font-mono text-slate-300 hover:text-white transition-colors"
          >
            <Github className="w-4 h-4" />
            <span>View Source on GitHub</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
          </a>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
