import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TerminalPreview } from './components/TerminalPreview';
import { Features } from './components/Features';
import { Marketplace } from './components/Marketplace';
import { DocsSection } from './components/DocsSection';
import { CliReference } from './components/CliReference';
import { PluginAuthorGuide } from './components/PluginAuthorGuide';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';

export function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const scrollTo = (id: string) => {
    setActiveTab(id);
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col antialiased selection:bg-emerald-500/30 selection:text-emerald-300">
      {/* Toast Notification */}
      <Toast message={toastMessage} />

      {/* Top Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Sections */}
      <main className="flex-1" id="overview">
        {/* Hero with Homebrew-like Install Bar */}
        <Hero
          onCopy={(text) => showToast(`Copied to clipboard: ${text}`)}
          onExploreMarketplace={() => scrollTo('marketplace')}
          onViewDocs={() => scrollTo('docs')}
        />

        {/* Realistic Terminal Preview */}
        <TerminalPreview />

        {/* Feature Grid ("Why AVM?") */}
        <Features />

        {/* AVM Marketplace (Live from registry.json) */}
        <Marketplace
          onCopy={(text) => showToast(`Copied to clipboard: ${text}`)}
          onOpenCreatePlugin={() => scrollTo('author')}
        />

        {/* In-depth Documentation & Setup Guide */}
        <DocsSection onCopy={(text) => showToast(`Copied to clipboard: ${text}`)} />

        {/* Searchable CLI Commands Reference */}
        <CliReference onCopy={(text) => showToast(`Copied to clipboard: ${text}`)} />

        {/* Plugin Developer & Scaffolding Guide */}
        <PluginAuthorGuide onCopy={(text) => showToast(`Copied to clipboard: ${text}`)} />
      </main>

      {/* Footer */}
      <Footer onNavClick={scrollTo} />
    </div>
  );
}

export default App;
