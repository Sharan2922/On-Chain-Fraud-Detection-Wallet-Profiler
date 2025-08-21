import axios from 'axios';
import toast from 'react-hot-toast';
import type {
  HealthResponse,
  ContractMessage,
  ContractMessageResponse,
  ScoreResponse,
  IngestRequest,
  IngestResponse,
  WalletItem,
  LabelItem,
  AddLabelRequest,
} from '../types';

const API_BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 15000,
});

// Request interceptor for logging
api.interceptors.request.use((config) => {
  console.log(`🔄 API Request: ${config.method?.toUpperCase()} ${config.url}`);
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Success: ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error(`❌ API Error: ${error.config?.url}`, error.response?.data || error.message);
    
    if (error.code === 'ECONNABORTED') {
      toast.error('Request timeout - backend might be slow');
    } else if (error.response?.status >= 500) {
      toast.error('Server error - please try again later');
    } else if (error.response?.status === 404) {
      console.log('Endpoint not implemented yet');
    } else if (!error.response) {
      toast.error('Backend service is unavailable');
    }
    
    return Promise.reject(error);
  }
);

export const apiService = {
  // Health check
  async getHealth(): Promise<HealthResponse> {
    try {
      const response = await api.get<HealthResponse>('/health');
      return response.data;
    } catch (error) {
      return { status: 'unavailable' };
    }
  },

  // Contract operations
  async getContractMessage(): Promise<string> {
    try {
      const response = await api.get<ContractMessage>('/v1/contract/message');
      return response.data.message;
    } catch (error) {
      throw new Error('Contract message endpoint not available');
    }
  },

  async setContractMessage(message: string): Promise<ContractMessageResponse> {
    try {
      const response = await api.post<ContractMessageResponse>('/v1/contract/message', { message });
      return response.data;
    } catch (error) {
      throw new Error('Unable to update contract message');
    }
  },

  // Score operations
  async getScore(address: string): Promise<ScoreResponse> {
    try {
      const response = await api.get<ScoreResponse>(`/v1/score/${address}`);
      return response.data;
    } catch (error) {
      throw new Error('Score lookup service not available');
    }
  },

  // Ingest operations
  async ingestAddress(address: string): Promise<IngestResponse> {
    try {
      const response = await api.post<IngestResponse>('/v1/ingest', { address });
      return response.data;
    } catch (error) {
      throw new Error('Ingest service not available');
    }
  },

  // Wallet operations
  async getWallets(): Promise<WalletItem[]> {
    try {
      const response = await api.get<WalletItem[]>('/v1/wallets');
      return response.data;
    } catch (error) {
      return [];
    }
  },

  // Label operations
  async getLabels(): Promise<LabelItem[]> {
    try {
      const response = await api.get<LabelItem[]>('/v1/labels');
      return response.data;
    } catch (error) {
      return [];
    }
  },

  async addLabel(data: AddLabelRequest): Promise<void> {
    try {
      await api.post('/v1/labels', data);
    } catch (error) {
      throw new Error('Label service not available');
    }
  },
};