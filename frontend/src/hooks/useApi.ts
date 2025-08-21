import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService } from '../services/api';
import toast from 'react-hot-toast';
import type { AddLabelRequest } from '../types';

export const useHealth = () => {
  return useQuery({
    queryKey: ['health'],
    queryFn: apiService.getHealth,
    refetchInterval: 30000, // Check every 30 seconds
    retry: 1,
  });
};

export const useContractMessage = () => {
  return useQuery({
    queryKey: ['contract', 'message'],
    queryFn: apiService.getContractMessage,
    retry: 1,
    staleTime: 60000,
  });
};

export const useSetContractMessage = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: apiService.setContractMessage,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['contract', 'message'] });
      toast.success(`Message updated! Tx: ${data.txHash.slice(0, 8)}...`);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};

export const useScore = (address: string) => {
  return useQuery({
    queryKey: ['score', address],
    queryFn: () => apiService.getScore(address),
    enabled: !!address && address.length === 42,
    retry: 1,
    staleTime: 300000, // 5 minutes
  });
};

export const useIngestAddress = () => {
  return useMutation({
    mutationFn: apiService.ingestAddress,
    onSuccess: () => {
      toast.success('Address queued for analysis');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};

export const useWallets = () => {
  return useQuery({
    queryKey: ['wallets'],
    queryFn: apiService.getWallets,
    retry: 1,
    staleTime: 300000,
  });
};

export const useLabels = () => {
  return useQuery({
    queryKey: ['labels'],
    queryFn: apiService.getLabels,
    retry: 1,
    staleTime: 300000,
  });
};

export const useAddLabel = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: AddLabelRequest) => apiService.addLabel(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['labels'] });
      toast.success('Label added successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};