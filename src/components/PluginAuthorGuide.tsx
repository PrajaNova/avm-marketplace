import { useState } from 'react';
import { GitPullRequest, Copy, Check, CheckCircle2 } from 'lucide-react';

interface PluginAuthorGuideProps {
  onCopy: (text: string) => void;
}

export const PluginAuthorGuide: React.FC<PluginAuthorGuideProps> = ({ onCopy }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    onCopy(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const sampleRegistryEntry = `{
  "name": "ruby",
  "description": "CRuby (MRI) — versions, install, GEM_HOME, bundle wrapper",
  "section_label": "Ruby",
  "repo": "yourname/avm-plugin-ruby"
}`;

  return (
    <section id="author" className="py-20 border-t border-slate-900 bg-slate-950/80 scroll-mt-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs font-semibold mb-3">
            <GitPullRequest className="w-3.5 h-3.5" />
            Developer Guide
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Build & Publish a Marketplace Plugin
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            avm's plugin marketplace is decentralized. Write in Rust, release prebuilt binaries, and submit your plugin entry in minutes.
          </p>
        </div>

        {/* 4 Steps */}
        <div className="space-y-10 mb-16">
          
          {/* Step 1: Scaffold */}
          <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-lg bg-emerald-500 text-slate-950 font-bold font-mono text-sm flex items-center justify-center">
                1
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white">Scaffold with avm create</h3>
            </div>
            <p className="text-sm text-slate-300 mb-4 leading-relaxed">
              Run <code className="text-emerald-300 font-mono text-xs bg-slate-950 px-1.5 py-0.5 rounded">avm create &lt;name&gt;</code>. This generates a complete Cargo project with the <code className="text-emerald-300 font-mono text-xs bg-slate-950 px-1.5 py-0.5 rounded">avm-plugin-api</code> dependency, wire protocol runner, and GitHub Actions workflow template.
            </p>

            <div className="relative rounded-xl bg-slate-950 border border-slate-800 p-4 font-mono text-xs sm:text-sm text-emerald-300 overflow-x-auto">
              avm create ruby
              <button
                onClick={() => handleCopy('step1', 'avm create ruby')}
                className="absolute top-3 right-3 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                title="Copy command"
              >
                {copiedId === 'step1' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Step 2: Implement ToolProvider */}
          <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-lg bg-emerald-500 text-slate-950 font-bold font-mono text-sm flex items-center justify-center">
                2
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white">Implement the ToolProvider Trait</h3>
            </div>
            <p className="text-sm text-slate-300 mb-4 leading-relaxed">
              In your <code className="text-emerald-300 font-mono text-xs bg-slate-950 px-1.5 py-0.5 rounded">src/provider.rs</code>, implement the methods for listing versions and installing/uninstalling binaries:
            </p>

            <div className="relative rounded-xl bg-slate-950 border border-slate-800 p-4 font-mono text-xs text-slate-300 overflow-x-auto">
{`use async_trait::async_trait;
use avm_plugin_api::{ToolProvider, PluginManifest, Result};

pub struct RubyProvider;

#[async_trait]
impl ToolProvider for RubyProvider {
    fn manifest(&self) -> PluginManifest {
        PluginManifest::new("ruby", "CRuby provider")
    }

    async fn list_versions(&self) -> Result<Vec<String>> {
        // Fetch releases from ruby-lang.org or GitHub
        Ok(vec!["3.3.0".into(), "3.2.3".into()])
    }

    async fn install_version(&self, version: &str) -> Result<()> {
        // Download precompiled archive and unpack to ~/.avm/tools/ruby/<version>
        Ok(())
    }
}`}
              <button
                onClick={() => handleCopy('step2', '// ToolProvider implementation')}
                className="absolute top-3 right-3 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                title="Copy snippet"
              >
                {copiedId === 'step2' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Step 3: Publish GitHub Release */}
          <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-lg bg-emerald-500 text-slate-950 font-bold font-mono text-sm flex items-center justify-center">
                3
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white">Tag and Publish Releases</h3>
            </div>
            <p className="text-sm text-slate-300 mb-4 leading-relaxed">
              When you push a git tag (e.g. <code className="text-emerald-300 font-mono text-xs bg-slate-950 px-1.5 py-0.5 rounded">v1.0.0</code>), your GitHub Actions workflow creates prebuilt release assets with the naming pattern:
            </p>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
              <div className="text-emerald-400">&bull; avm-plugin-&lt;name&gt;_darwin_arm64.tar.gz (Apple Silicon)</div>
              <div className="text-emerald-400">&bull; avm-plugin-&lt;name&gt;_linux_amd64.tar.gz (Linux x86_64)</div>
              <div className="text-emerald-400">&bull; avm-plugin-&lt;name&gt;_linux_arm64.tar.gz (Linux aarch64)</div>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Each archive contains exactly one binary: <code className="text-slate-300 font-mono">avm-plugin-&lt;name&gt;</code>.
            </p>
          </div>

          {/* Step 4: Open a PR to registry.json */}
          <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-lg bg-emerald-500 text-slate-950 font-bold font-mono text-sm flex items-center justify-center">
                4
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white">Submit PR to registry.json</h3>
            </div>
            <p className="text-sm text-slate-300 mb-4 leading-relaxed">
              Open a Pull Request on <a href="https://github.com/PrajaNova/avm-marketplace" target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline">PrajaNova/avm-marketplace</a> adding your entry into <code className="text-emerald-300 font-mono text-xs bg-slate-950 px-1.5 py-0.5 rounded">registry.json</code>:
            </p>

            <div className="relative rounded-xl bg-slate-950 border border-slate-800 p-4 font-mono text-xs text-slate-300 overflow-x-auto">
              <pre>{sampleRegistryEntry}</pre>
              <button
                onClick={() => handleCopy('step4', sampleRegistryEntry)}
                className="absolute top-3 right-3 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                title="Copy JSON entry"
              >
                {copiedId === 'step4' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            <div className="mt-4 p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/20 text-xs text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>The moment your PR is merged, any user running <code className="font-mono bg-slate-950 px-1 py-0.5 rounded">avm plugin add &lt;name&gt;</code> immediately gets your plugin!</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
