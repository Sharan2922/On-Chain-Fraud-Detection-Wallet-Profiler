import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, Plus, Clock, ExternalLink } from 'lucide-react';
import { useLabels, useAddLabel } from '../../hooks/useApi';
import { formatAddress, formatTimeAgo, isValidAddress } from '../../utils/format';
import { GlassCard } from '../ui/GlassCard';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

export const LabelsTable = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAddress, setNewAddress] = useState('');
  const [newLabel, setNewLabel] = useState('');

  const { data: labels, isLoading } = useLabels();
  const addLabelMutation = useAddLabel();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidAddress(newAddress) || !newLabel.trim()) return;

    await addLabelMutation.mutateAsync({
      address: newAddress,
      label: newLabel.trim(),
    });

    setNewAddress('');
    setNewLabel('');
    setShowAddForm(false);
  };

  if (isLoading) {
    return (
      <GlassCard className="p-6">
        <div className="flex items-center justify-center py-8">
          <div className="text-gray-400">Loading labels...</div>
        </div>
      </GlassCard>
    );
  }

  if (!labels?.length && !showAddForm) {
    return (
      <GlassCard className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Tag className="w-6 h-6 text-purple-400" />
            <h3 className="text-lg font-semibold text-white">Address Labels</h3>
          </div>
          <Button size="sm" onClick={() => setShowAddForm(true)}>
            <Plus className="w-4 h-4" />
            Add Label
          </Button>
        </div>

        <div className="text-center py-8">
          <Tag className="w-12 h-12 text-gray-500 mx-auto mb-3" />
          <p className="text-gray-400 mb-2">No labels configured yet</p>
          <p className="text-sm text-gray-500 mb-4">
            Add labels to categorize and track addresses
          </p>
        </div>

        {/* Add Form */}
        <AnimatePresence>
          {showAddForm && (
            <motion.form
              onSubmit={handleSubmit}
              className="space-y-4 border-t border-white/10 pt-6"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Address"
                  placeholder="0x..."
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                  error={newAddress && !isValidAddress(newAddress) ? 'Invalid address' : ''}
                />
                <Input
                  label="Label"
                  placeholder="e.g., mixer, exchange, dex"
                  value={newLabel}
                  onChange={(e) => setNewLabel(e.target.value)}
                />
              </div>
              <div className="flex space-x-2">
                <Button
                  type="submit"
                  loading={addLabelMutation.isPending}
                  disabled={!isValidAddress(newAddress) || !newLabel.trim()}
                  size="sm"
                >
                  Add Label
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    setShowAddForm(false);
                    setNewAddress('');
                    setNewLabel('');
                  }}
                >
                  Cancel
                </Button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Tag className="w-6 h-6 text-purple-400" />
          <h3 className="text-lg font-semibold text-white">Address Labels</h3>
        </div>
        {!showAddForm && (
          <Button size="sm" onClick={() => setShowAddForm(true)}>
            <Plus className="w-4 h-4" />
            Add Label
          </Button>
        )}
      </div>

      {/* Add Form */}
      <AnimatePresence>
        {showAddForm && (
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-4 mb-6 p-4 bg-white/5 border border-white/10 rounded-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Address"
                placeholder="0x..."
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
                error={newAddress && !isValidAddress(newAddress) ? 'Invalid address' : ''}
              />
              <Input
                label="Label"
                placeholder="e.g., mixer, exchange, dex"
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
              />
            </div>
            <div className="flex space-x-2">
              <Button
                type="submit"
                loading={addLabelMutation.isPending}
                disabled={!isValidAddress(newAddress) || !newLabel.trim()}
                size="sm"
              >
                Add Label
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  setShowAddForm(false);
                  setNewAddress('');
                  setNewLabel('');
                }}
              >
                Cancel
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Labels Table */}
      {labels?.length ? (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-2 text-sm font-medium text-gray-400">Address</th>
                <th className="text-left py-3 px-2 text-sm font-medium text-gray-400">Label</th>
                <th className="text-left py-3 px-2 text-sm font-medium text-gray-400">Source</th>
                <th className="text-left py-3 px-2 text-sm font-medium text-gray-400">Added</th>
                <th className="text-left py-3 px-2 text-sm font-medium text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {labels.map((label, index) => (
                <motion.tr
                  key={`${label.address}-${label.label}`}
                  className="border-b border-white/5 hover:bg-white/5"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <td className="py-3 px-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-sm text-white">
                        {formatAddress(label.address, 8)}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-400">
                      {label.label}
                    </span>
                  </td>
                  <td className="py-3 px-2">
                    <span className="text-sm text-gray-400 capitalize">{label.source}</span>
                  </td>
                  <td className="py-3 px-2">
                    <div className="flex items-center space-x-1 text-sm text-gray-400">
                      <Clock className="w-3 h-3" />
                      <span>
                        {label.created_at ? formatTimeAgo(label.created_at) : 'Unknown'}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-2">
                    <a
                      href={`${import.meta.env.VITE_BLOCK_EXPLORER_BASE}/address/${label.address}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 text-sm flex items-center space-x-1"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>View</span>
                    </a>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !showAddForm && (
          <div className="text-center py-4">
            <p className="text-gray-400">No labels found</p>
          </div>
        )
      )}
    </GlassCard>
  );
};