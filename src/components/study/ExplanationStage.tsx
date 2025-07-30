// src/components/study/ExplanationStage.tsx
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import NextButton from '../element/NextButton';

interface Props {
  text: string;
  onNext: (stage: 'realisation') => void;
}

export default function ExplanationStage({ text, onNext }: Props) {
  // Function to render explanation content with code blocks
  const renderExplanationContent = (text: string) => {
    const parts = text.split(/```([\s\S]*?)```/);
    return parts.map((part, i) => {
      if (i % 2 === 0) {
        // Regular text and headers
        return (
          <div key={i} className="mb-4 text-gray-800 leading-relaxed">
            {part.split('\n').map((line, j) => {
              const headerMatch = line.match(/^(#+)\s*(.+)$/);
              if (headerMatch) {
                const level = headerMatch[1].length;
                const content = headerMatch[2];
                if (level === 1) return <h2 key={j} className="text-xl font-bold text-gray-900 mb-2">{content}</h2>;
                else if (level === 2) return <h3 key={j} className="text-lg font-bold text-gray-900 mb-2">{content}</h3>;
                else if (level === 3) return <h4 key={j} className="text-base font-bold text-gray-900 mb-2">{content}</h4>;
                else return <h5 key={j} className="text-sm font-bold text-gray-900 mb-2">{content}</h5>;
              } else if (line.trim() === '') {
                return <br key={j} />;
              } else {
                return <p key={j} className="mb-2">{line}</p>;
              }
            })}
          </div>
        );
      } else {
        // Code block
        return (
          <div key={i} className="mb-4">
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm font-mono">
              <code>{part.trim()}</code>
            </pre>
          </div>
        );
      }
    });
  };

  // Navigation items data
  const navItems = [
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
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex-1 p-4">
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

          {/* Main Content */}
          <div className="max-w-6xl mx-auto">
            <Card className="rounded-2xl shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Concept Explanation</h2>
                
                {/* Content area with proper height */}
                <div className="max-h-[calc(100vh-300px)] overflow-y-auto pr-2">
                  <div className="prose max-w-none">
                    {renderExplanationContent(text)}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Fixed Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-t border-gray-200 p-4">
        <div className="max-w-7xl mx-auto flex justify-center">
          <button
            onClick={() => onNext('realisation')}
            className="active:scale-95 transition-transform"
          >
            <NextButton className="w-[228px] h-[60px]" />
          </button>
        </div>
      </div>
    </div>
  );
}