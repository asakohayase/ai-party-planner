export interface PartyRequest {
  occasion: string;
  guest_count: number;
  location: 'indoor' | 'outdoor';
  start_time: string; 
  end_time: string;    
  dietary_restrictions?: string;
  guest_ages?: 'kids' | 'adults' | 'mixed';
  special_requests?: string;
}

export interface PartyPlanResponse {
  success: boolean;
  plan: string;
  specialist_used: string;
  timestamp: string;
}