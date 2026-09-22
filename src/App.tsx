import { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { ScrollToTop } from './components/ScrollToTop';

import { HomePage } from './pages/HomePage';
import { MarketplacePage } from './pages/MarketplacePage';
import { DocsPage } from './pages/DocsPage';
import { CommandsPage } from './pages/CommandsPage';
import { CreatePluginPage } from './pages/CreatePluginPage';

export function App() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  return (
    <HashRouter>
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col antialiased selection:bg-emerald-500/30 selection:text-emerald-300">
        <ScrollToTop />
        <Toast message={toastMessage} />

        {/* Global sticky navigation */}
        <Navbar />

        {/* Routed pages */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage onCopy={(t) => showToast(`Copied: ${t}`)} />} />
            <Route path="/marketplace" element={<MarketplacePage onCopy={(t) => showToast(`Copied: ${t}`)} />} />
            <Route path="/docs" element={<DocsPage onCopy={(t) => showToast(`Copied: ${t}`)} />} />
            <Route path="/commands" element={<CommandsPage onCopy={(t) => showToast(`Copied: ${t}`)} />} />
            <Route path="/create-plugin" element={<CreatePluginPage onCopy={(t) => showToast(`Copied: ${t}`)} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Global footer */}
        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;
