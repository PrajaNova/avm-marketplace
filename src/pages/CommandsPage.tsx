import { CliReference } from '../components/CliReference';

interface CommandsPageProps {
  onCopy: (text: string) => void;
}

export const CommandsPage: React.FC<CommandsPageProps> = ({ onCopy }) => {
  return (
    <div className="py-8">
      <CliReference onCopy={onCopy} />
    </div>
  );
};
