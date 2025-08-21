import { motion } from 'framer-motion';
import { Shield, Github, Twitter } from 'lucide-react';

export const Footer = () => {
  return (
    <motion.footer
      className="bg-black/40 backdrop-blur-xl border-t border-white/10 mt-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <Shield className="w-6 h-6 text-blue-400" />
            <span className="text-lg font-semibold text-white">Wallet Profiler</span>
          </div>
          
          <div className="flex items-center space-x-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <span className="text-gray-500 text-sm">
              © 2025 On-Chain Fraud Detection
            </span>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};