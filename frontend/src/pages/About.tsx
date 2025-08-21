import { motion } from 'framer-motion';
import { Shield, Target, Zap, Globe, Github, ExternalLink } from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';

export const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">About Wallet Profiler</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Advanced on-chain fraud detection and wallet risk assessment for the Ethereum ecosystem
          </p>
        </div>

        <div className="space-y-8">
          {/* Mission */}
          <GlassCard className="p-8">
            <div className="flex items-center space-x-3 mb-4">
              <Target className="w-8 h-8 text-blue-400" />
              <h2 className="text-2xl font-bold text-white">Our Mission</h2>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed">
              We're building the next generation of blockchain security tools to help institutions, 
              exchanges, and DeFi protocols identify and mitigate risks from fraudulent wallets 
              and suspicious activities on Ethereum networks.
            </p>
          </GlassCard>

          {/* Features */}
          <GlassCard className="p-8">
            <div className="flex items-center space-x-3 mb-6">
              <Zap className="w-8 h-8 text-yellow-400" />
              <h2 className="text-2xl font-bold text-white">Key Features</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Real-time Risk Scoring',
                  description: 'Advanced algorithms analyze wallet behavior and assign risk scores based on transaction patterns, fund sources, and historical data.',
                },
                {
                  title: 'Fraud Signal Detection',
                  description: 'Identify common fraud indicators like mixer usage, rapid fund movements, and connections to known malicious addresses.',
                },
                {
                  title: 'Address Labeling',
                  description: 'Comprehensive database of labeled addresses including exchanges, mixers, sanctioned entities, and other categorized wallets.',
                },
                {
                  title: 'Smart Contract Integration',
                  description: 'Direct integration with Ethereum smart contracts for on-chain data verification and automated reporting.',
                },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="p-4 bg-white/5 rounded-lg border border-white/10"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </GlassCard>

          {/* Technology */}
          <GlassCard className="p-8">
            <div className="flex items-center space-x-3 mb-6">
              <Shield className="w-8 h-8 text-green-400" />
              <h2 className="text-2xl font-bold text-white">Technology Stack</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                'React',
                'TypeScript',
                'TailwindCSS',
                'Framer Motion',
                'wagmi',
                'RainbowKit',
                'React Query',
                'FastAPI',
              ].map((tech, index) => (
                <motion.div
                  key={tech}
                  className="px-3 py-2 bg-white/5 rounded-lg border border-white/10 text-center text-sm text-gray-300"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {tech}
                </motion.div>
              ))}
            </div>
          </GlassCard>

          {/* Network Info */}
          <GlassCard className="p-8">
            <div className="flex items-center space-x-3 mb-4">
              <Globe className="w-8 h-8 text-purple-400" />
              <h2 className="text-2xl font-bold text-white">Network Information</h2>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-gray-300">Blockchain Network</span>
                <span className="text-white font-semibold">Ethereum Sepolia Testnet</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-gray-300">Chain ID</span>
                <span className="text-white font-mono">{import.meta.env.VITE_CHAIN_ID}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-gray-300">Contract Address</span>
                <div className="flex items-center space-x-2">
                  <span className="text-white font-mono text-sm">
                    {import.meta.env.VITE_CONTRACT_ADDRESS?.slice(0, 8)}...
                    {import.meta.env.VITE_CONTRACT_ADDRESS?.slice(-6)}
                  </span>
                  <a
                    href={`${import.meta.env.VITE_BLOCK_EXPLORER_BASE}/address/${import.meta.env.VITE_CONTRACT_ADDRESS}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </motion.div>
    </div>
  );
};