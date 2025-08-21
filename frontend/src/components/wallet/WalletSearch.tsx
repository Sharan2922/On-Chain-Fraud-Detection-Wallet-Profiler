import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Wallet, AlertCircle, Clock, TrendingUp } from 'lucide-react';
import { useScore, useIngestAddress } from '../../hooks/useApi';
import { formatAddress, getRiskColor, getRiskBgColor, formatTimeAgo, isValidAddress } from '../../utils/format';
import { GlassCard } from '../ui/GlassCard';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { LoadingSpinner } from '../ui/LoadingSpinner';

export const WalletSearch = () => {
  const [address, setAddress] = useState('');
  const [searchAddress, setSearchAddress] = useState('');
  
  const { data: scoreData, isLoading, error } = useScore(searchAddress);
  const ingestMutation = useIngestAddress();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidAddress(address)) {
      return;
    }
    setSearchAddress(address);
  };

  const handleIngest = async () => {
    if (!isValidAddress(address)) return;
    await ingestMutation.mutateAsync(address);
  };

  return (
    <div className="space-y-6">
      {/* Search Form */}
      <GlassCard className="p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Search className="w-6 h-6 text-blue-400" />
          <h3 className="text-lg font-semibold text-white">Wallet Analysis</h3>
        </div>

        <form onSubmit={handleSearch} className="space-y-4">
          <Input
            placeholder="Enter Ethereum address (0x...)"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            error={address && !isValidAddress(address) ? 'Invalid Ethereum address' : ''}
          />
          <div className="flex space-x-3">
            <Button
              type="submit"
              disabled={!isValidAddress(address)}
              loading={isLoading}
            >
              <Search className="w-4 h-4" />
              Analyze Wallet
            </Button>
            <Button
              variant="secondary"
              onClick={handleIngest}
              disabled={!isValidAddress(address)}
              loading={ingestMutation.isPending}
            >
              Queue for Analysis
            </Button>
          </div>
        </form>
      </GlassCard>

      {/* Results */}
      <AnimatePresence>
        {isLoading && searchAddress && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <GlassCard className="p-6">
              <div className="flex items-center justify-center space-x-2 py-8">
                <LoadingSpinner />
                <span className="text-gray-300">Analyzing wallet...</span>
              </div>
            </GlassCard>
          </motion.div>
        )}

        {error && searchAddress && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <GlassCard className="p-6">
              <div className="flex items-center space-x-2 text-yellow-400 mb-4">
                <AlertCircle className="w-5 h-5" />
                <span className="font-medium">Service Not Available</span>
              </div>
              <p className="text-gray-300 mb-4">
                The wallet scoring service is not configured yet. This feature will be available once the backend is fully implemented.
              </p>
              <div className="p-4 bg-gray-500/10 border border-gray-500/20 rounded-lg">
                <p className="text-sm text-gray-400">
                  <strong>Searched Address:</strong> {formatAddress(searchAddress, 12)}
                </p>
              </div>
            </GlassCard>
          </motion.div>
        )}

        {scoreData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <GlassCard className="p-6">
              <div className="flex items-center space-x-2 mb-6">
                <Wallet className="w-6 h-6 text-green-400" />
                <h3 className="text-lg font-semibold text-white">Wallet Profile</h3>
              </div>

              {/* Address & Score */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Address</label>
                  <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
                    <p className="text-white font-mono text-sm break-all">
                      {scoreData.address}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <label className="text-sm text-gray-400 mb-2 block">Risk Assessment</label>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-white">{scoreData.score}</span>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskBgColor(scoreData.risk_band)} ${getRiskColor(scoreData.risk_band)}`}>
                      {scoreData.risk_band.toUpperCase()} RISK
                    </div>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full bg-gradient-to-r ${
                        scoreData.score < 30
                          ? 'from-green-500 to-green-400'
                          : scoreData.score < 70
                          ? 'from-yellow-500 to-yellow-400'
                          : 'from-red-500 to-red-400'
                      }`}
                      style={{ width: `${scoreData.score}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Signals */}
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <TrendingUp className="w-5 h-5 text-blue-400" />
                  <h4 className="text-md font-semibold text-white">Risk Signals</h4>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {scoreData.signals.map((signal, index) => (
                    <motion.div
                      key={signal.name}
                      className="p-3 bg-white/5 border border-white/10 rounded-lg"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-300 capitalize">
                          {signal.name.replace('_', ' ')}
                        </span>
                        <span className={`text-sm font-medium ${
                          typeof signal.value === 'boolean'
                            ? signal.value
                              ? 'text-red-400'
                              : 'text-green-400'
                            : signal.value > 0.5
                            ? 'text-red-400'
                            : 'text-yellow-400'
                        }`}>
                          {typeof signal.value === 'boolean'
                            ? signal.value
                              ? 'Yes'
                              : 'No'
                            : `${(signal.value as number * 100).toFixed(1)}%`}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Metadata */}
              <div className="mt-6 flex items-center space-x-4 text-sm text-gray-400">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>Updated {formatTimeAgo(scoreData.updated_at)}</span>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};