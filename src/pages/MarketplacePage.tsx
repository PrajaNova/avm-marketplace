import { useNavigate } from 'react-router-dom';
import { Marketplace } from '../components/Marketplace';

interface MarketplacePageProps {
  onCopy: (text: string) => void;
}

export const MarketplacePage: React.FC<MarketplacePageProps> = ({ onCopy }) => {
  const navigate = useNavigate();

  return (
    <div className="py-6">
      <Marketplace
        onCopy={onCopy}
        onOpenCreatePlugin={() => navigate('/create-plugin')}
      />
    </div>
  );
};
