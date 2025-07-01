'use client';

import { Button } from './ui/button';

interface PartyPlanResultProps {
  plan: string;
  specialistUsed: string;
  onStartOver: () => void;
}

export function PartyPlanResult({ plan, onStartOver }: PartyPlanResultProps) {
  // Function to format markdown-style text to proper HTML
  const formatPlanText = (text: string) => {
    return text
      .split('\n')
      .map((line, index) => {
        // Clean up markdown symbols
        const cleanLine = line
          .replace(/\*\*(.*?)\*\*/g, '$1') // Remove **bold** markers
          .replace(/\*(.*?)\*/g, '$1')     // Remove *italic* markers
          .trim();

        // Handle different heading levels
        if (cleanLine.startsWith('# ')) {
          return `<h1 key="${index}" class="text-xl font-bold text-gray-800 mt-4 mb-2 first:mt-0">${cleanLine.substring(2)}</h1>`;
        } else if (cleanLine.startsWith('## ')) {
          return `<h2 key="${index}" class="text-lg font-semibold text-gray-700 mt-3 mb-1">${cleanLine.substring(3)}</h2>`;
        } else if (cleanLine.startsWith('### ')) {
          return `<h3 key="${index}" class="text-base font-medium text-gray-700 mt-2 mb-1">${cleanLine.substring(4)}</h3>`;
        } else if (cleanLine.startsWith('- ')) {
          return `<li key="${index}" class="ml-4 mb-0.5 list-disc text-gray-600 text-sm leading-relaxed">${cleanLine.substring(2)}</li>`;
        } else if (cleanLine === '') {
          return `<div key="${index}" class="mb-1"></div>`;
        } else {
          return `<p key="${index}" class="text-gray-600 mb-1 leading-relaxed text-sm">${cleanLine}</p>`;
        }
      })
      .join('');
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header Section - matching form structure exactly */}
      <div className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white relative rounded-t-3xl shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-green-300/20 via-blue-400/20 to-purple-500/20 rounded-t-3xl"></div>
        <div className="text-center text-3xl font-black relative z-10 drop-shadow-lg py-8 px-6 flex flex-col items-center justify-center">
          🎉 Your Amazing Party Plan! 🎊
          <p className="text-green-100 text-lg mt-2 font-semibold drop-shadow">
            Everything you need for an unforgettable celebration!
          </p>
          <Button 
            variant="outline" 
            onClick={onStartOver}
            className="bg-white text-purple-600 border-2 border-white hover:bg-purple-50 hover:text-purple-700 font-bold px-6 py-3 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105 mt-4"
          >
            🔄 Plan Another Party
          </Button>
        </div>
      </div>
      
      {/* Content Section - matching form structure */}
      <div className="bg-white/95 backdrop-blur-xl px-8 py-8 rounded-b-3xl shadow-2xl">
        <div 
          className="text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: formatPlanText(plan) }}
        />
      </div>
    </div>
  );
}