export interface HealthResponse {
    status: string;
  }
  
  export interface ContractMessage {
    message: string;
  }
  
  export interface ContractMessageResponse {
    txHash: string;
    message: string;
  }
  
  export interface Signal {
    name: string;
    value: boolean | number;
  }
  
  export interface ScoreResponse {
    address: string;
    score: number;
    risk_band: string;
    signals: Signal[];
    updated_at: string;
  }
  
  export interface IngestRequest {
    address: string;
  }
  
  export interface IngestResponse {
    status: string;
    address: string;
  }
  
  export interface WalletItem {
    address: string;
    score: number;
    label: string;
  }
  
  export interface LabelItem {
    address: string;
    label: string;
    source: string;
    created_at?: string;
  }
  
  export interface AddLabelRequest {
    address: string;
    label: string;
  }
  
  export type RiskBand = 'low' | 'medium' | 'high';