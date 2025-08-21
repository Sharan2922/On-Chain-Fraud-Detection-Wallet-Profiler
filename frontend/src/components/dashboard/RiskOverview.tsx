import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { TrendingUp, Shield, AlertTriangle } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { useWallets } from '../../hooks/useApi';

const COLORS = ['#10B981', '#F59E0B', '#EF4444'];

export const RiskOverview = () => {
  const { data: wallets, isLoading } = useWallets();

  const riskData = wallets?.reduce((acc, wallet) => {
    const risk = wallet.score >= 80 ? 'High' : wallet.score >= 50 ? 'Medium' : 'Low';
    acc[risk] = (acc[risk] || 0) + 1;
    return acc;
  }, {} as Record<string, number>) || {};

  const chartData = Object.entries(riskData).map(([risk, count]) => ({
    name: risk,
    value: count,
  }));

  const scoreDistribution = wallets?.map((wallet, index) => ({
    name: `W${index + 1}`,
    score: wallet.score,
  })) || [];

  if (isLoading) {
    return (
      <GlassCard className="p-6">
        <div className="flex items-center space-x-2 mb-4">
          <TrendingUp className="w-6 h-6 text-blue-400" />
          <h3 className="text-lg font-semibold text-white">Risk Overview</h3>
        </div>
        <div className="flex items-center justify-center h-48">
          <div className="text-gray-400">Loading risk data...</div>
        </div>
      </GlassCard>
    );
  }

  if (!wallets?.length) {
    return (
      <GlassCard className="p-6">
        <div className="flex items-center space-x-2 mb-4">
          <TrendingUp className="w-6 h-6 text-blue-400" />
          <h3 className="text-lg font-semibold text-white">Risk Overview</h3>
        </div>
        <div className="flex flex-col items-center justify-center h-48 space-y-2">
          <Shield className="w-12 h-12 text-gray-500" />
          <p className="text-gray-400 text-center">No wallet data available yet</p>
          <p className="text-sm text-gray-500 text-center">
            Score some wallets to see risk analytics
          </p>
        </div>
      </GlassCard>
    );
  }

  return (
    <div className="space-y-6">
      {/* Risk Distribution */}
      <GlassCard className="p-6">
        <div className="flex items-center space-x-2 mb-4">
          <AlertTriangle className="w-6 h-6 text-yellow-400" />
          <h3 className="text-lg font-semibold text-white">Risk Distribution</h3>
        </div>
        
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                  color: 'white',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex justify-center space-x-6 mt-4">
          {chartData.map((entry, index) => (
            <div key={entry.name} className="flex items-center space-x-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="text-sm text-gray-300">
                {entry.name}: {entry.value}
              </span>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Score Distribution */}
      <GlassCard className="p-6">
        <div className="flex items-center space-x-2 mb-4">
          <TrendingUp className="w-6 h-6 text-blue-400" />
          <h3 className="text-lg font-semibold text-white">Score Distribution</h3>
        </div>
        
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={scoreDistribution}>
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#9CA3AF', fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#9CA3AF', fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                  color: 'white',
                }}
              />
              <Bar dataKey="score" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>
    </div>
  );
};