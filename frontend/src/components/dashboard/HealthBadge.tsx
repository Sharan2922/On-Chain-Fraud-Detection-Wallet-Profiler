import { motion } from 'framer-motion';
import { Activity, AlertTriangle } from 'lucide-react';
import { useHealth } from '../../hooks/useApi';
import { GlassCard } from '../ui/GlassCard';

export const HealthBadge = () => {
  const { data: health, isLoading, error } = useHealth();

  const isHealthy = health?.status === 'ok';
  const statusColor = isHealthy ? 'text-green-400' : 'text-red-400';
  const bgColor = isHealthy ? 'bg-green-500/20' : 'bg-red-500/20';

  return (
    <GlassCard className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              {isHealthy ? (
                <Activity className={`w-5 h-5 ${statusColor}`} />
              ) : (
                <AlertTriangle className={`w-5 h-5 ${statusColor}`} />
              )}
            </>
          )}
          <div>
            <h3 className="text-sm font-semibold text-white">System Status</h3>
            <p className="text-xs text-gray-400">Backend Health</p>
          </div>
        </div>
        
        <motion.div
          className={`px-3 py-1 rounded-full text-xs font-medium ${bgColor} ${statusColor}`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          {isLoading ? 'Checking...' : isHealthy ? 'Online' : 'Offline'}
        </motion.div>
      </div>
      
      {error && (
        <p className="text-xs text-red-400 mt-2">
          Unable to connect to backend service
        </p>
      )}
    </GlassCard>
  );
};