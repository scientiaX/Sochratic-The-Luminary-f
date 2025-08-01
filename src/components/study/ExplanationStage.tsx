// src/components/study/ExplanationStage.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Home, Type } from 'lucide-react';
import NextButton from '../element/NextButton';
import { FallingStars } from '../ui/FallingStars';
import { useNavigate } from 'react-router-dom';

interface Props {
  text: string;
  onNext: (stage: 'finalSolution') => void;
}

export default function ExplanationStage({ text, onNext }: Props) {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
    console.log('ExplanationStage mounted with text:', text?.substring(0, 100) + '...');
  }, [text]);

  // Navigation items
  const navItems = [
    {
      icon: <Home className="w-4 h-4" />,
      text: "Home",
    },
    {
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 7V9C15 10.1 14.1 11 13 11V22H11V16H9V22H7V11C5.9 11 5 10.1 5 9V7L3 7V9H1V7C1 5.9 1.9 5 3 5H21C22.1 5 23 5.9 23 7V9H21Z"/>
        </svg>
      ),
      text: "Profil",
    },
    {
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 4C18.2 4 20 5.8 20 8C20 10.2 18.2 12 16 12C13.8 12 12 10.2 12 8C12 5.8 13.8 4 16 4ZM16 6C14.9 6 14 6.9 14 8C14 9.1 14.9 10 16 10C17.1 10 18 9.1 18 8C18 6.9 17.1 6 16 6ZM4 8C5.1 8 6 8.9 6 10C6 11.1 5.1 12 4 12C2.9 12 2 11.1 2 10C2 8.9 2.9 8 4 8ZM4 10C4 10 4 10 4 10ZM16 14C19.3 14 22 16.7 22 20V22H10V20C10 16.7 12.7 14 16 14ZM8 18C8 18 8 18 8 18H8V20H8V18ZM4 14C6.2 14 8 15.8 8 18V20H2V18C2 15.8 3.8 14 4 14Z"/>
        </svg>
      ),
      text: "Join",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Falling Stars Background */}
      <FallingStars starCount={15} starColor="#3B82F6" />
      
      <div className="flex-1 p-4 pb-28 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Top Navigation Bar */}
          <Card className="mt-0 mb-4 shadow-lg">
            <CardContent className="p-4 flex justify-between items-center">
              <div className="font-bold text-gray-700 text-lg">
                Nova X
              </div>

              <div className="flex space-x-2">
                {navItems.map((item, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="flex items-center space-x-2 h-10 px-3 rounded-lg hover:bg-gray-100"
                    onClick={() => {
                      if (item.text === 'Home') {
                        navigate('/selection');
                      } else if (item.text === 'Join' || item.text === 'Profil') {
                        navigate('/premium');
                      }
                    }}
                  >
                    {item.icon}
                    <span className="hidden sm:inline font-normal text-gray-700 text-sm">
                      {item.text}
                    </span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Progress Bar */}
          <Card className="mb-6 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                <span>Explanation Stage</span>
                <span>Step 2 of 5</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500" style={{ width: '40%' }}></div>
              </div>
            </CardContent>
          </Card>

          {/* Main Content - Static Box */}
          <div className="max-w-4xl mx-auto mb-12">
            <Card className={`rounded-3xl shadow-2xl border-0 bg-white/95 backdrop-blur-sm transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <CardContent className="p-8">
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-100 to-purple-100 px-6 py-3 rounded-full mb-4">
                    <Type className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold text-gray-700">Concept Explanation</span>
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Understanding the Concepts</h1>
                  <p className="text-gray-600 text-lg">Read through the detailed explanation below</p>
                </div>

                {/* Static Text Container */}
                <div className="relative">
                  {/* Fixed background box */}
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-200">
                    {/* Text content */}
                    <div 
                      ref={textRef}
                      className="prose max-w-none"
                      style={{ 
                        fontSize: '1.1rem',
                        lineHeight: '1.8',
                        color: '#374151'
                      }}
                    >
                      <div className="whitespace-pre-wrap">
                        {text || 'Loading explanation...'}
                      </div>
                    </div>
                  </div>

                  {/* Floating elements for visual appeal */}
                  <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-10 animate-pulse"></div>
                  <div className="absolute bottom-4 left-4 w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>

                
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Fixed Footer - Always visible */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-200 p-6 z-20">
        <div className="max-w-7xl mx-auto flex justify-center">
          <button
            type="button"
            aria-label="Continue to realisation stage"
            onClick={() => onNext('finalSolution')}
            className="active:scale-95 transition-all duration-300 hover:scale-105"
          >
            <NextButton className="w-[228px] h-[60px]" />
          </button>
        </div>
      </div>
    </div>
  );
}