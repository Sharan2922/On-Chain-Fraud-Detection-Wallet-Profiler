import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, ExternalLink, Send } from 'lucide-react';
import { useContractMessage, useSetContractMessage } from '../../hooks/useApi';
import { getExplorerUrl } from '../../utils/format';
import { GlassCard } from '../ui/GlassCard';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { LoadingSpinner } from '../ui/LoadingSpinner';

export const ContractCard = () => {
  const [newMessage, setNewMessage] = useState('');
  const [showForm, setShowForm] = useState(false);
  
  const { data: message, isLoading, error } = useContractMessage();
  const setMessageMutation = useSetContractMessage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    await setMessageMutation.mutateAsync(newMessage);
    setNewMessage('');
    setShowForm(false);
  };

  return (
    <GlassCard className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <MessageSquare className="w-6 h-6 text-purple-400" />
          <div>
            <h3 className="text-lg font-semibold text-white">Contract Message</h3>
            <p className="text-sm text-gray-400">Interact with deployed contract</p>
          </div>
        </div>
        
        {!showForm && (
          <Button
            size="sm"
            onClick={() => setShowForm(true)}
            className="text-xs"
          >
            Update
          </Button>
        )}
      </div>

      {/* Current Message */}
      <div className="mb-4">
        {isLoading ? (
          <div className="flex items-center space-x-2">
            <LoadingSpinner size="sm" />
            <span className="text-gray-400">Loading message...</span>
          </div>
        ) : error ? (
          <p className="text-red-400 text-sm">Contract message endpoint not configured</p>
        ) : (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10">
            <p className="text-white font-medium">{message || 'No message set'}</p>
          </div>
        )}
      </div>

      {/* Update Form */}
      {showForm && (
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-4"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <Input
            placeholder="Enter new message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <div className="flex space-x-2">
            <Button
              type="submit"
              loading={setMessageMutation.isPending}
              disabled={!newMessage.trim()}
              size="sm"
            >
              <Send className="w-4 h-4" />
              Update Message
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                setShowForm(false);
                setNewMessage('');
              }}
            >
              Cancel
            </Button>
          </div>
        </motion.form>
      )}

      {/* Transaction Hash */}
      {setMessageMutation.data?.txHash && (
        <motion.div
          className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between">
            <span className="text-sm text-green-400">Transaction successful</span>
            <a
              href={getExplorerUrl(setMessageMutation.data.txHash)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 text-sm"
            >
              <span>View on Explorer</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </motion.div>
      )}
    </GlassCard>
  );
};