'use client';

import { useState } from 'react';
import { PartyForm } from '../components/party-form';
import { PartyPlanResult } from '../components/party-plan-result';
import { PartyPlanResponse } from '../types/party';

// Backend interface (what the API expects)
interface BackendPartyRequest {
  occasion: string;
  guest_count: number;
  location: 'indoor' | 'outdoor';
  start_time: string;
  end_time: string;
  duration_hours: number;
  time_of_day: 'morning' | 'afternoon' | 'evening';
  planning_focus: string;
  dietary_restrictions?: string;
  guest_ages?: 'kids' | 'adults' | 'mixed';
  special_requests?: string;
}

// Define proper error response types
interface ErrorDetail {
  msg?: string;
  type?: string;
  loc?: string[];
}

interface ErrorResponse {
  detail?: string | ErrorDetail[];
  message?: string;
}

export default function Home() {
  const [partyPlan, setPartyPlan] = useState<PartyPlanResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (request: BackendPartyRequest) => {
    setLoading(true);
    setError(null);

    try {
      // Call Python backend API
      const response = await fetch('http://localhost:8000/api/party-plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        let errorMessage = `HTTP error! status: ${response.status}`;
        try {
          const errorData: ErrorResponse = await response.json();
          // Handle different error response formats
          if (typeof errorData === 'string') {
            errorMessage = errorData;
          } else if (errorData.detail) {
            errorMessage = Array.isArray(errorData.detail) 
              ? errorData.detail.map((err: ErrorDetail) => err.msg || err.type || 'Unknown error').join(', ')
              : errorData.detail;
          } else if (errorData.message) {
            errorMessage = errorData.message;
          }
        } catch (jsonError) {
          // If response.json() fails, use the default error message
          console.warn('Failed to parse error response:', jsonError);
        }
        throw new Error(errorMessage);
      }

      const data: PartyPlanResponse = await response.json();
      
      if (data.success) {
        setPartyPlan(data);
      } else {
        setError('Failed to generate party plan');
      }
    } catch (err) {
      console.error('API Error:', err);
      setError(
        err instanceof Error 
          ? err.message 
          : 'Network error. Please make sure the Python backend is running on port 8000.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleStartOver = () => {
    setPartyPlan(null);
    setError(null);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-cyan-300 via-blue-400 to-purple-500 p-4 py-8 relative overflow-hidden">
      <div className="container mx-auto relative z-10">
        {error && (
          <div className="max-w-2xl mx-auto mb-6 p-4 bg-red-100 border-2 border-red-300 rounded-xl text-red-700 shadow-lg">
            <h3 className="font-bold text-lg">⚠️ Oops!</h3>
            <p className="mt-1">{error}</p>
            <p className="text-sm mt-2 opacity-75">
              Make sure your Python backend is running: <code className="bg-red-200 px-1 rounded">cd backend && uv run python app.py</code>
            </p>
          </div>
        )}

        {partyPlan ? (
          <PartyPlanResult 
            plan={partyPlan.plan} 
            specialistUsed={partyPlan.specialist_used}
            onStartOver={handleStartOver} 
          />
        ) : (
          <PartyForm onSubmit={handleSubmit} loading={loading} />
        )}
      </div>
    </main>
  );
}