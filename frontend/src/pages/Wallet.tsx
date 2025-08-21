import { motion } from 'framer-motion';
import { WalletSearch } from '../components/wallet/WalletSearch';

export const Wallet = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Wallet Analysis</h1>
          <p className="text-gray-400">
            Analyze Ethereum wallets for risk assessment and fraud detection
          </p>
        </div>

        <WalletSearch />
      </motion.div>
    </div>
  );
};