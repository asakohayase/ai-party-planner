'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { PartyRequest } from '../types/party';

interface PartyFormProps {
  onSubmit: (request: PartyRequest) => void;
  loading: boolean;
}

export function PartyForm({ onSubmit, loading }: PartyFormProps) {
  const [formData, setFormData] = useState<Partial<PartyRequest>>({
    guest_count: 8,
    location: 'indoor',
    duration: 'halfday',
    time_of_day: 'afternoon'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.occasion && formData.guest_count && formData.location) {
      onSubmit(formData as PartyRequest);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-orange-400 via-pink-500 via-purple-500 to-blue-500 text-white relative rounded-t-3xl shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-orange-400/20 via-pink-400/20 to-blue-400/20 rounded-t-3xl"></div>
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
          <div className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="occasion" className="text-lg font-semibold text-gray-800 flex items-center gap-2">
               What&apos;s the occasion? <span className="text-orange-500">*</span>
              </Label>
              <Input
                id="occasion"
                placeholder="Birthday party, BBQ, Pool party, Game night..."
                value={formData.occasion || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, occasion: e.target.value }))}
                className="h-12 text-base border border-gray-200 focus:border-orange-400 focus:ring-orange-400/20 rounded-lg bg-white shadow-sm transition-all duration-200"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="guest_count" className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  Guest count <span className="text-orange-500">*</span>
                </Label>
                <Input
                  id="guest_count"
                  type="number"
                  min="1"
                  max="50"
                  value={formData.guest_count || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, guest_count: parseInt(e.target.value) }))}
                  className="h-12 text-base border border-gray-200 focus:border-orange-400 focus:ring-orange-400/20 rounded-lg bg-white shadow-sm transition-all duration-200"
                  required
                />
              </div>

              <div className="space-y-3">
                <Label className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  Location <span className="text-orange-500">*</span>
                </Label>
                <Select value={formData.location} onValueChange={(value: 'indoor' | 'outdoor') => 
                  setFormData(prev => ({ ...prev, location: value }))}>
                  <SelectTrigger className="h-12 text-base border border-gray-200 focus:border-orange-400 focus:ring-orange-400/20 rounded-lg bg-white shadow-sm transition-all duration-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-lg border border-gray-200 bg-white shadow-lg">
                    <SelectItem value="indoor">Indoor</SelectItem>
                    <SelectItem value="outdoor">Outdoor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                 Duration <span className="text-orange-500">*</span>
                </Label>
                <Select value={formData.duration} onValueChange={(value: any) => 
                  setFormData(prev => ({ ...prev, duration: value }))}>
                  <SelectTrigger className="h-12 text-base border border-gray-200 focus:border-orange-400 focus:ring-orange-400/20 rounded-lg bg-white shadow-sm transition-all duration-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-lg border border-gray-200 bg-white shadow-lg">
                    <SelectItem value="halfday">Half day</SelectItem>
                    <SelectItem value="allday">All day</SelectItem>
                    <SelectItem value="evening">Evening</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  Time of day <span className="text-orange-500">*</span>
                </Label>
                <Select value={formData.time_of_day} onValueChange={(value: any) => 
                  setFormData(prev => ({ ...prev, time_of_day: value }))}>
                  <SelectTrigger className="h-12 text-base border border-gray-200 focus:border-orange-400 focus:ring-orange-400/20 rounded-lg bg-white shadow-sm transition-all duration-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-lg border border-gray-200 bg-white shadow-lg">
                    <SelectItem value="morning">Morning</SelectItem>
                    <SelectItem value="afternoon">Afternoon</SelectItem>
                    <SelectItem value="evening">Evening</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
                className="h-12 text-base border border-gray-200 focus:border-emerald-400 focus:ring-emerald-400/20 rounded-lg bg-white shadow-sm transition-all duration-200"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-lg font-semibold text-gray-800">
              Guest ages
              </Label>
              <Select value={formData.guest_ages} onValueChange={(value: any) => 
                setFormData(prev => ({ ...prev, guest_ages: value }))}>
                <SelectTrigger className="h-12 text-base border border-gray-200 focus:border-emerald-400 focus:ring-emerald-400/20 rounded-lg bg-white shadow-sm transition-all duration-200">
                  <SelectValue placeholder="Select age group" />
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
                className="min-h-[100px] text-base resize-none border border-gray-200 focus:border-emerald-400 focus:ring-emerald-400/20 rounded-lg bg-white shadow-sm p-4 transition-all duration-200"
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full h-16 text-xl font-bold text-white border-0 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl shadow-xl rounded-xl relative overflow-hidden group bg-gradient-to-r from-orange-400 via-pink-500 via-red-500 to-purple-600 hover:from-orange-500 hover:via-pink-600 hover:via-red-600 hover:to-purple-700 backdrop-blur-md" 
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