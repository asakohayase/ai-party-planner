'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { BackendPartyRequest, PartyFormProps, PartyRequest } from '@/types/party';

export function PartyForm({ onSubmit, loading }: PartyFormProps) {
  const [formData, setFormData] = useState<Partial<PartyRequest>>({
  });

  // Convert frontend data to backend format
  const convertToBackendFormat = (frontendData: PartyRequest): BackendPartyRequest => {
    let duration_hours: number | undefined;
    let time_of_day: 'morning' | 'afternoon' | 'evening' | undefined;

    // Only calculate if both times are provided
    if (frontendData.start_time && frontendData.end_time) {
      const start = new Date(`2000-01-01T${frontendData.start_time}`);
      const end = new Date(`2000-01-01T${frontendData.end_time}`);
      duration_hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);

      // Determine time of day from start time
      const startHour = parseInt(frontendData.start_time.split(':')[0]);
      if (startHour < 12) {
        time_of_day = 'morning';
      } else if (startHour < 18) {
        time_of_day = 'afternoon';
      } else {
        time_of_day = 'evening';
      }
    }

    // Build the request object, only including fields that have values
    const request: BackendPartyRequest = {
      occasion: frontendData.occasion,
      planning_focus: frontendData.planning_focus || '',
    };

    // Only add optional fields if they have actual values
    if (frontendData.guest_count && frontendData.guest_count > 0) {
      request.guest_count = frontendData.guest_count;
    }

    if (frontendData.location) {
      request.location = frontendData.location;
    }

    if (frontendData.start_time) {
      request.start_time = frontendData.start_time;
    }

    if (frontendData.end_time) {
      request.end_time = frontendData.end_time;
    }

    if (duration_hours && duration_hours > 0) {
      request.duration_hours = duration_hours;
    }

    if (time_of_day) {
      request.time_of_day = time_of_day;
    }

    if (frontendData.dietary_restrictions?.trim()) {
      request.dietary_restrictions = frontendData.dietary_restrictions.trim();
    }

    if (frontendData.guest_ages) {
      request.guest_ages = frontendData.guest_ages;
    }

    if (frontendData.special_requests?.trim()) {
      request.special_requests = frontendData.special_requests.trim();
    }

    return request;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.occasion && formData.planning_focus) {
      const backendData = convertToBackendFormat(formData as PartyRequest);
      console.log('Sending data to backend:', JSON.stringify(backendData, null, 2)); // Add this line for debugging
      onSubmit(backendData);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 text-white relative rounded-t-3xl shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-orange-400/20 to-pink-400/20 rounded-t-3xl"></div>
        <div className="text-center text-4xl font-bold relative z-10 drop-shadow-lg py-8 px-6 flex flex-col items-center justify-center">
          🍹 AI Party Planner 🎊
          <p className="text-white/95 text-xl mt-3 font-medium drop-shadow">
            Let&apos;s create the perfect party together!
          </p>
        </div>
      </div>
      
      {/* Form Section */}
      <div className="bg-white/95 backdrop-blur-xl px-8 py-8 rounded-b-3xl shadow-2xl">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Required Fields */}
          <div className="space-y-3">
            <Label htmlFor="planning_focus" className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              What do you want to plan? <span className="text-orange-500">*</span>
            </Label>
            <Input
              id="planning_focus"
              placeholder="e.g., Food and decorations, Just activities, Everything..."
              value={formData.planning_focus || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, planning_focus: e.target.value }))}
              className="h-12 text-base leading-none border border-gray-200 focus:border-orange-400 focus:ring-orange-400/20 rounded-lg bg-white shadow-sm transition-all duration-200 px-4"
              required
            />
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="occasion" className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                What&apos;s the occasion? <span className="text-orange-500">*</span>
              </Label>
              <Input
                id="occasion"
                placeholder="Birthday, anniversary, graduation, etc..."
                value={formData.occasion || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, occasion: e.target.value }))}
                className="h-12 text-base leading-none border border-gray-200 focus:border-orange-400 focus:ring-orange-400/20 rounded-lg bg-white shadow-sm transition-all duration-200 px-4"
                required
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="guest_count" className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                How many guests?
              </Label>
              <Input
                id="guest_count"
                type="number"
                min="1"
                max="1000"
                value={formData.guest_count || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, guest_count: parseInt(e.target.value) }))}
                className="h-12 text-base leading-none border border-gray-200 focus:border-orange-400 focus:ring-orange-400/20 rounded-lg bg-white shadow-sm transition-all duration-200 px-4"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                Location
              </Label>
              <Select value={formData.location} onValueChange={(value: 'indoor' | 'outdoor') => 
                setFormData(prev => ({ ...prev, location: value }))}>
                <SelectTrigger className="h-12 text-base leading-none border border-gray-200 focus:border-orange-400 focus:ring-orange-400/20 rounded-lg bg-white shadow-sm transition-all duration-200 px-4">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-lg border border-gray-200 bg-white shadow-lg">
                  <SelectItem value="indoor">Indoor</SelectItem>
                  <SelectItem value="outdoor">Outdoor</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Time Section  */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                Party Time
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start_time" className="text-sm font-medium text-gray-600">
                    Start Time
                  </Label>
                  <Input
                    id="start_time"
                    type="time"
                    value={formData.start_time || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, start_time: e.target.value }))}
                    className="h-12 text-base leading-none border border-gray-200 focus:border-orange-400 focus:ring-orange-400/20 rounded-lg bg-white shadow-sm transition-all duration-200 px-4"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end_time" className="text-sm font-medium text-gray-600">
                    End Time
                  </Label>
                  <Input
                    id="end_time"
                    type="time"
                    value={formData.end_time || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, end_time: e.target.value }))}
                    className="h-12 text-base leading-none border border-gray-200 focus:border-orange-400 focus:ring-orange-400/20 rounded-lg bg-white shadow-sm transition-all duration-200 px-4"
                  />
                </div>
              </div>
            </div>

            {/* Guest Ages */}
            <div className="space-y-3">
              <Label className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                Guest Ages
              </Label>
              <Select value={formData.guest_ages} onValueChange={(value: 'kids' | 'adults' | 'mixed') => 
                setFormData(prev => ({ ...prev, guest_ages: value }))}>
                <SelectTrigger className="h-12 text-base leading-none border border-gray-200 focus:border-orange-400 focus:ring-orange-400/20 rounded-lg bg-white shadow-sm transition-all duration-200 px-4">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-lg border border-gray-200 bg-white shadow-lg">
                  <SelectItem value="kids">Kids</SelectItem>
                  <SelectItem value="adults">Adults</SelectItem>
                  <SelectItem value="mixed">Mixed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Dietary Restrictions */}
            <div className="space-y-3">
              <Label htmlFor="dietary_restrictions" className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                Dietary Restrictions
              </Label>
              <Input
                id="dietary_restrictions"
                placeholder="e.g., Vegetarian, gluten-free, nut allergies..."
                value={formData.dietary_restrictions || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, dietary_restrictions: e.target.value }))}
                className="h-12 text-base leading-none border border-gray-200 focus:border-orange-400 focus:ring-orange-400/20 rounded-lg bg-white shadow-sm transition-all duration-200 px-4"
              />
            </div>

            {/* Special Requests */}
            <div className="space-y-3">
              <Label htmlFor="special_requests" className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                Special Requests
              </Label>
              <Textarea
                id="special_requests"
                placeholder="Any special requests or themes for your party..."
                value={formData.special_requests || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, special_requests: e.target.value }))}
                className="min-h-[100px] text-base leading-relaxed border border-gray-200 focus:border-orange-400 focus:ring-orange-400/20 rounded-lg bg-white shadow-sm transition-all duration-200 px-4 py-3 resize-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button 
              type="submit" 
              disabled={loading || !formData.occasion || !formData.planning_focus}
              className="w-full h-14 text-lg font-bold bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Planning your perfect party...
                </div>
              ) : (
                <>
                  🎉 Plan My Party! 🎉
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}