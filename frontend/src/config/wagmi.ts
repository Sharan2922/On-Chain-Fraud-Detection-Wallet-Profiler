import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia } from 'wagmi/chains';

const projectId = 'wallet-profiler-dapp';

export const config = getDefaultConfig({
  appName: 'Wallet Profiler',
  projectId,
  chains: [sepolia],
  ssr: false,
});