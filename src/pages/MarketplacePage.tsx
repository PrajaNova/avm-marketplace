import React from 'react';
import { Marketplace } from '../components/Marketplace';

interface MarketplacePageProps {
  onCopy: (text: string) => void;
}

export const MarketplacePage: React.FC<MarketplacePageProps> = ({ onCopy }) => {
  return (
    <div className="py-6">
      <Marketplace onCopy={onCopy} />
    </div>
  );
};
