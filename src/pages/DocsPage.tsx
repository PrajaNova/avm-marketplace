import { DocsSection } from '../components/DocsSection';
import { TerminalPreview } from '../components/TerminalPreview';

interface DocsPageProps {
  onCopy: (text: string) => void;
}

export const DocsPage: React.FC<DocsPageProps> = ({ onCopy }) => {
  return (
    <div className="py-8 space-y-12">
      <DocsSection onCopy={onCopy} />
      <div className="pt-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-white">Interactive Terminal Walkthrough</h3>
          <p className="text-xs text-slate-400 mt-1">
            Experience real workflows for quickstart, Node scripts, Java & Android, and shims.
          </p>
        </div>
        <TerminalPreview />
      </div>
    </div>
  );
};
