import React, { useState, useEffect } from 'react';
import { Search, Package, PlusCircle, ExternalLink, Copy, Check, ArrowUpRight, Sparkles, RefreshCw } from 'lucide-react';
import { RegistryPlugin, PluginDetail } from '../types';
import { DEFAULT_REGISTRY, EXTENDED_PLUGIN_METADATA } from '../data/registryData';
import { PluginModal } from './PluginModal';

interface MarketplaceProps {
  onCopy: (text: string) => void;
  onOpenCreatePlugin: () => void;
}

export const Marketplace: React.FC<MarketplaceProps> = ({ onCopy, onOpenCreatePlugin }) => {
  const [plugins, setPlugins] = useState<RegistryPlugin[]>(DEFAULT_REGISTRY.plugins);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPlugin, setSelectedPlugin] = useState<PluginDetail | null>(null);
  const [copiedName, setCopiedName] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Fetch registry.json dynamically with fallback to DEFAULT_REGISTRY
  const loadRegistry = async () => {
    setIsRefreshing(true);
    try {
      // First try local relative path (served with site)
      const res = await fetch('./registry.json');
      if (res.ok) {
        const data = await res.json();
        if (data && Array.isArray(data.plugins)) {
          setPlugins(data.plugins);
          setIsRefreshing(false);
          return;
        }
      }

      // Fallback: GitHub raw URL
      const githubRes = await fetch('https://raw.githubusercontent.com/PrajaNova/avm-marketplace/main/registry.json');
      if (githubRes.ok) {
        const data = await githubRes.json();
        if (data && Array.isArray(data.plugins)) {
          setPlugins(data.plugins);
        }
      }
    } catch (e) {
      console.warn('Using bundled registry data', e);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadRegistry();
  }, []);

  const handleCopyInstall = (name: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const cmd = `avm plugin add ${name}`;
    onCopy(cmd);
    setCopiedName(name);
    setTimeout(() => setCopiedName(null), 2000);
  };

  // Merge registry info with extended metadata
  const enrichedPlugins: PluginDetail[] = plugins.map((p) => {
    const meta = EXTENDED_PLUGIN_METADATA[p.name] || {};
    return {
      ...p,
      iconName: meta.iconName || 'Package',
      category: meta.category || 'Tool',
      versionExample: meta.versionExample || 'latest',
      envVars: meta.envVars || ['PATH'],
      keyCommands: meta.keyCommands || [
        { command: `avm plugin add ${p.name}`, description: `Install ${p.name} plugin` },
        { command: `avm ${p.name} versions`, description: `Browse available ${p.name} versions` },
        { command: `avm ${p.name} use latest`, description: `Use latest version of ${p.name}` }
      ],
      sampleConfig: meta.sampleConfig || `{\n  "tools": {\n    "${p.name}": "latest"\n  }\n}`,
      highlights: meta.highlights || [
        `Precompiled standalone binary speaks avm JSON-over-stdio protocol`,
        `Fetched on-demand from ${p.repo} GitHub Releases`,
        `Managed through ~/.avm/plugins/avm-plugin-${p.name}`
      ]
    };
  });

  const categories = ['all', 'Runtime', 'Language', 'SDK', 'Tool'];

  const filteredPlugins = enrichedPlugins.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.section_label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.repo.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' || p.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  return (
    <section id="marketplace" className="py-20 border-t border-slate-900 scroll-mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase">
                Plugin Ecosystem
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                registry.json (v1)
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              AVM Plugin Marketplace
            </h2>
            <p className="mt-2 text-slate-400 text-sm sm:text-base max-w-2xl">
              Plugins are standalone precompiled executables fetched on-demand. 
              Install with <code className="text-emerald-400 font-mono text-xs bg-slate-900 px-1.5 py-0.5 rounded">avm plugin add &lt;name&gt;</code>.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={loadRegistry}
              disabled={isRefreshing}
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-all"
              title="Refresh registry"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-emerald-400' : ''}`} />
            </button>
            <button
              onClick={onOpenCreatePlugin}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-semibold transition-all shadow-sm"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Submit Plugin</span>
            </button>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
          {/* Search box */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search plugins by name, runtime, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-900/90 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-mono"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all capitalize ${
                  selectedCategory.toLowerCase() === cat.toLowerCase()
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                    : 'text-slate-400 hover:text-slate-200 bg-slate-900/60 border border-slate-800'
                }`}
              >
                {cat === 'all' ? `All (${enrichedPlugins.length})` : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Plugin Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredPlugins.map((plugin) => (
            <div
              key={plugin.name}
              onClick={() => setSelectedPlugin(plugin)}
              className="group cursor-pointer rounded-2xl bg-slate-900/70 border border-slate-800/90 hover:border-emerald-500/50 hover:bg-slate-900 p-6 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 shadow-lg hover:shadow-emerald-500/5"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/30 flex items-center justify-center font-mono font-bold text-emerald-400 text-lg group-hover:scale-105 transition-transform">
                      {plugin.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                          {plugin.name}
                        </h3>
                        <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                          {plugin.section_label}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-slate-400">
                        avm-plugin-{plugin.name}
                      </span>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Official
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-300 leading-relaxed mb-6 line-clamp-3">
                  {plugin.description}
                </p>
              </div>

              {/* Card Footer & Install command */}
              <div className="space-y-3 pt-4 border-t border-slate-800/80">
                {/* Install Snippet */}
                <div className="flex items-center justify-between bg-slate-950/80 border border-slate-800 rounded-lg px-2.5 py-1.5 font-mono text-[11px]">
                  <span className="text-emerald-300 truncate mr-2">
                    avm plugin add {plugin.name}
                  </span>
                  <button
                    onClick={(e) => handleCopyInstall(plugin.name, e)}
                    className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors shrink-0"
                    title="Copy install command"
                  >
                    {copiedName === plugin.name ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                {/* Meta links */}
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <a
                    href={`https://github.com/${plugin.repo}`}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1.5 hover:text-slate-200 transition-colors font-mono text-[11px]"
                  >
                    <span>{plugin.repo.replace('PrajaNova/', '')}</span>
                    <ExternalLink className="w-3 h-3 text-slate-500" />
                  </a>
                  <span className="flex items-center gap-1 text-emerald-400 group-hover:translate-x-0.5 transition-transform font-medium text-xs">
                    Details <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state if search returned 0 */}
        {filteredPlugins.length === 0 && (
          <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800 mb-12">
            <Package className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-1">No matching plugins found</h3>
            <p className="text-sm text-slate-400 max-w-sm mx-auto mb-4">
              Try adjusting your query or create a new plugin to add it to the marketplace.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-white transition-colors"
            >
              Reset filters
            </button>
          </div>
        )}

        {/* Submit Plugin Banner */}
        <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-emerald-950/20 to-slate-900 border border-emerald-500/30 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <h3 className="text-lg font-bold text-white">
                Want to publish your own plugin?
              </h3>
            </div>
            <p className="text-sm text-slate-400 max-w-xl">
              Anyone can publish! Scaffold a new plugin in seconds with <code className="text-emerald-400 font-mono text-xs">avm create &lt;name&gt;</code>, publish a GitHub Release with compiled binaries, and open a PR adding your entry to <code className="text-emerald-400 font-mono text-xs">registry.json</code>.
            </p>
          </div>
          <button
            onClick={onOpenCreatePlugin}
            className="shrink-0 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs font-mono tracking-wide transition-all shadow-md shadow-emerald-500/20"
          >
            Read Plugin Guide &rarr;
          </button>
        </div>

      </div>

      {/* Details Modal */}
      {selectedPlugin && (
        <PluginModal
          plugin={selectedPlugin}
          onClose={() => setSelectedPlugin(null)}
          onCopy={onCopy}
        />
      )}
    </section>
  );
};
