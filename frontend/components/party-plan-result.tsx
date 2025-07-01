'use client';

import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

interface PartyPlanResultProps {
  plan: string;
  specialistUsed: string;
  onStartOver: () => void;
}

export function PartyPlanResult({ plan, specialistUsed, onStartOver }: PartyPlanResultProps) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="shadow-2xl bg-white border-4 border-white rounded-3xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white relative">
          <div className="absolute inset-0 bg-gradient-to-r from-green-300/20 via-blue-400/20 to-purple-500/20"></div>
          <div className="flex items-center justify-between relative z-10">
            <div>
              <CardTitle className="text-3xl font-black drop-shadow-lg">
                🎉 Your Amazing Party Plan! 🎊
              </CardTitle>
              <p className="text-green-100 text-lg mt-2 font-semibold drop-shadow">
                Everything you need for an unforgettable celebration!
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={onStartOver}
              className="bg-white text-purple-600 border-2 border-white hover:bg-purple-50 hover:text-purple-700 font-bold px-6 py-3 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105"
            >
              🔄 Plan Another Party
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-8 bg-gradient-to-b from-white to-blue-50">
          <div className="prose max-w-none">
            <div className="whitespace-pre-wrap text-base leading-relaxed bg-gradient-to-br from-yellow-50 via-pink-50 to-blue-50 p-8 rounded-2xl border-4 border-dashed border-pink-200 shadow-inner">
              {plan}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
