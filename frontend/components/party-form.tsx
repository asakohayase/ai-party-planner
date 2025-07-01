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

  return {
    occasion: frontendData.occasion,
    guest_count: frontendData.guest_count, // Remove || undefined
    location: frontendData.location, // Remove || undefined  
    start_time: frontendData.start_time, // Remove || undefined
    end_time: frontendData.end_time, // Remove || undefined
    duration_hours,
    time_of_day,
    planning_focus: frontendData.planning_focus || '',
    dietary_restrictions: frontendData.dietary_restrictions,
    guest_ages: frontendData.guest_ages,
    special_requests: frontendData.special_requests,
  };
};

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.occasion && formData.planning_focus) {
      const backendData = convertToBackendFormat(formData as PartyRequest);
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
              {/* Duration Display */}
              {formData.start_time && formData.end_time && (
                <div className="text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
                  Duration: {(() => {
                    const start = new Date(`2000-01-01T${formData.start_time}`);
                    const end = new Date(`2000-01-01T${formData.end_time}`);
                    const diff = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
                    return diff > 0 ? `${diff} hour${diff !== 1 ? 's' : ''}` : 'Invalid time range';
                  })()}
                </div>
              )}
            </div>
          </div>

          {/* Optional Fields */}
          <div className="space-y-6 pt-6 border-t border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
              Optional Details
            </h3>
            
            <div className="space-y-3">
              <Label htmlFor="dietary_restrictions" className="text-lg font-semibold text-gray-800">
                Dietary restrictions
              </Label>
              <Input
                id="dietary_restrictions"
                placeholder="Vegetarian, gluten-free, allergies, etc..."
                value={formData.dietary_restrictions || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, dietary_restrictions: e.target.value }))}
                className="h-12 text-base leading-none border border-gray-200 focus:border-emerald-400 focus:ring-emerald-400/20 rounded-lg bg-white shadow-sm transition-all duration-200 px-4"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-lg font-semibold text-gray-800">
                Guest ages
              </Label>
              <Select
                value={formData.guest_ages}
                onValueChange={(value: 'kids' | 'adults' | 'mixed') =>
                  setFormData((prev) => ({ ...prev, guest_ages: value }))
                }
              >
                <SelectTrigger className="h-12 border border-gray-200 focus:border-emerald-400 focus:ring-emerald-400/20 rounded-lg bg-white shadow-sm transition-all duration-200 px-4 text-left text-base">
                  <SelectValue
                    placeholder="Select age group"
                    className="text-base"
                  />
                </SelectTrigger>
                <SelectContent className="rounded-lg border border-gray-200 bg-white shadow-lg">
                  <SelectItem value="kids">Kids</SelectItem>
                  <SelectItem value="adults">Adults</SelectItem>
                  <SelectItem value="mixed">Mixed ages</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label htmlFor="special_requests" className="text-lg font-semibold text-gray-800">
                Special requests
              </Label>
              <Textarea
                id="special_requests"
                placeholder="Any specific themes, activities, or special requirements..."
                value={formData.special_requests || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, special_requests: e.target.value }))}
                className="min-h-[100px] text-base leading-relaxed resize-none border border-gray-200 focus:border-emerald-400 focus:ring-emerald-400/20 rounded-lg bg-white shadow-sm p-4 transition-all duration-200"
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full h-16 text-xl font-bold text-white border-0 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl shadow-xl rounded-xl relative overflow-hidden group bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 hover:from-orange-500 hover:via-pink-600 hover:to-purple-700 backdrop-blur-md" 
            disabled={loading}
          >
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
            <div className="relative z-10">
              {loading ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Creating your amazing party plan...
                </div>
              ) : (
                <span className="flex items-center justify-center gap-3">
                  🎊 Create My Amazing Party Plan 🍹
                </span>
              )}
            </div>
          </Button>
        </form>
      </div>
    </div>
  );
}