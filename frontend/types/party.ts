export interface PartyRequest {
  occasion: string;
  guest_count?: number;
  location?: 'indoor' | 'outdoor';
  start_time?: string;
  end_time?: string;
  planning_focus: string;
  dietary_restrictions?: string;
  guest_ages?: 'kids' | 'adults' | 'mixed';
  special_requests?: string;
}

export interface BackendPartyRequest {
  occasion: string;
  guest_count?: number;
  location?: 'indoor' | 'outdoor';
  start_time?: string;
  end_time?: string;
  duration_hours?: number;
  time_of_day?: 'morning' | 'afternoon' | 'evening';
  planning_focus: string;
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

export interface PartyFormProps {
  onSubmit: (data: BackendPartyRequest) => Promise<void>;
  loading: boolean;
}