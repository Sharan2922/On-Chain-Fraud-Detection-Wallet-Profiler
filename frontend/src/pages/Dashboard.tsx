import { motion } from 'framer-motion';
import { Activity, MessageSquare, TrendingUp } from 'lucide-react';
import { HealthBadge } from '../components/dashboard/HealthBadge';
import { ContractCard } from '../components/dashboard/ContractCard';
import { RiskOverview } from '../components/dashboard/RiskOverview';

export const Dashboard = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-white mb-8">Dashboard</h1>

        {/* Health Status */}
        <div className="mb-8">
          <HealthBadge />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Contract & Controls */}
          <div className="lg:col-span-2 space-y-8">
            <ContractCard />
          </div>

          {/* Right Column - Analytics */}
          <div className="space-y-8">
            <RiskOverview />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: Activity,
              label: 'System Status',
              value: 'Online',
              color: 'text-green-400',
            },
            {
              icon: MessageSquare,
              label: 'Contract',
              value: 'Active',
              color: 'text-blue-400',
            },
            {
              icon: TrendingUp,
              label: 'Network',
              value: 'Sepolia',
              color: 'text-purple-400',
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="flex items-center space-x-3">
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                <div>
                  <p className="text-sm text-gray-400">{stat.label}</p>
                  <p className={`text-lg font-semibold ${stat.color}`}>{stat.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};