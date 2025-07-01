export interface PartyRequest {
  occasion: string;
  guest_count: number;
  location: 'indoor' | 'outdoor';
  duration: '2hours' | 'halfday' | 'allday' | 'evening';
  time_of_day: 'morning' | 'afternoon' | 'evening';
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
