export const formatAddress = (address: string, length = 8): string => {
    if (!address || address.length < 10) return address;
    return `${address.slice(0, length)}...${address.slice(-6)}`;
  };
  
  export const formatScore = (score: number): string => {
    return score.toFixed(0);
  };
  
  export const getRiskColor = (riskBand: string): string => {
    switch (riskBand.toLowerCase()) {
      case 'low':
        return 'text-green-400';
      case 'medium':
        return 'text-yellow-400';
      case 'high':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };
  
  export const getRiskBgColor = (riskBand: string): string => {
    switch (riskBand.toLowerCase()) {
      case 'low':
        return 'bg-green-500/20';
      case 'medium':
        return 'bg-yellow-500/20';
      case 'high':
        return 'bg-red-500/20';
      default:
        return 'bg-gray-500/20';
    }
  };
  
  export const getExplorerUrl = (txHash: string): string => {
    const base = import.meta.env.VITE_BLOCK_EXPLORER_BASE || 'https://sepolia.etherscan.io';
    return `${base}/tx/${txHash}`;
  };
  
  export const formatTimeAgo = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
  
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return date.toLocaleDateString();
  };
  
  export const isValidAddress = (address: string): boolean => {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  };