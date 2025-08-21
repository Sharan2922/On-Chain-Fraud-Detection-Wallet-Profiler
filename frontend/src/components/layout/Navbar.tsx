import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Shield, Activity } from 'lucide-react';
import { useHealth } from '../../hooks/useApi';

export const Navbar = () => {
  const location = useLocation();
  const { data: health } = useHealth();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/wallet', label: 'Wallet' },
    { path: '/labels', label: 'Labels' },
    { path: '/about', label: 'About' },
  ];

  return (
    <motion.nav
      className="sticky top-0 z-50 backdrop-blur-xl bg-black/20 border-b border-white/10"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <Shield className="w-8 h-8 text-blue-400" />
            <span className="text-xl font-bold text-white">Wallet Profiler</span>
          </Link>

          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors duration-200 hover:text-blue-400 ${
                  location.pathname === item.path ? 'text-blue-400' : 'text-gray-300'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Health indicator */}
            <div className="flex items-center space-x-2">
              <Activity className={`w-4 h-4 ${health?.status === 'ok' ? 'text-green-400' : 'text-red-400'}`} />
              <span className="text-xs text-gray-400 hidden sm:block">Sepolia</span>
            </div>

            {/* Wallet Connect */}
            <ConnectButton showBalance={false} />
          </div>
        </div>
      </div>
    </motion.nav>
  );
};