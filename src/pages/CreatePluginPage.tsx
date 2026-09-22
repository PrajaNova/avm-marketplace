import { PluginAuthorGuide } from '../components/PluginAuthorGuide';

interface CreatePluginPageProps {
  onCopy: (text: string) => void;
}

export const CreatePluginPage: React.FC<CreatePluginPageProps> = ({ onCopy }) => {
  return (
    <div className="py-8">
      <PluginAuthorGuide onCopy={onCopy} />
    </div>
  );
};
