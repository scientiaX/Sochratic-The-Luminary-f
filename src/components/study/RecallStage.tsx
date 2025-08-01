// src/components/study/RecallStage.tsx
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Home } from 'lucide-react';
import NextButton from '../element/NextButton';
import api from '@/lib/api';
import { useNavigate } from 'react-router-dom';
import CompletionStage from './CompletionStage';

interface Props {
  topicId: string;
}

export default function RecallStage({ topicId }: Props) {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState(['', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  // Mock questions for different topics
  const mockQuestions = {
    '1': [
      'What is the time complexity of bubble sort in the worst case?',
      'Explain the difference between bubble sort and quick sort.',
      'How would you optimize bubble sort for already sorted arrays?'
    ],
    '2': [
      'What is the probability of drawing a blue ball from the same box?',
      'Explain the concept of complementary probability.',
      'How would you calculate probability for dependent events?'
    ],
    '3': [
      'What is the determinant of a 2x2 matrix?',
      'Explain when a system of linear equations has no solution.',
      'How do you find the inverse of a matrix?'
    ]
  };

  const questions = mockQuestions[topicId as keyof typeof mockQuestions] || mockQuestions['1'];

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // Try to submit to real API
      await api.post('/recall', { topicId, answers });
    } catch (error) {
      console.log('Backend not available, using mock submission');
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
    } finally {
      setIsLoading(false);
      setIsSubmitted(true);
    }
  };

  const handleFinish = () => {
    // Reset stage to default for new session
    localStorage.removeItem('currentStage');
    window.location.href = '/selection';
  };

  if (isSubmitted) {
    return <CompletionStage topicId={topicId} />;
  }

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
                <span>Recall Stage</span>
                <span>Step 5 of 5</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500" style={{ width: '100%' }}></div>
              </div>
            </CardContent>
          </Card>

          {/* Main Content */}
          <div className="max-w-6xl mx-auto mb-16">
            <Card className="rounded-2xl shadow-lg">
              <CardContent className="p-6 space-y-4">
                <h2 className="text-xl font-bold">Active Recall</h2>
                
                <p className="text-sm text-gray-600">
                  Test your understanding with these questions based on what you've learned.
                </p>
                
                <div className="space-y-4">
                  {questions.map((question: string, index: number) => (
                    <div key={index} className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Question {index + 1}:
                      </label>
                      <p className="text-gray-800 mb-2">{question}</p>
                      <Textarea
                        value={answers[index]}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => 
                          handleAnswerChange(index, e.target.value)
                        }
                        placeholder="Write your answer here..."
                        className="min-h-[80px]"
                      />
                    </div>
                  ))}
                </div>
                
                <div className="text-xs text-blue-600 bg-blue-50 p-2 rounded">
                  💡 Answer these questions to reinforce your learning and test your understanding.
                </div>
                
                <Button 
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="w-full"
                >
                  {isLoading ? 'Submitting...' : 'Submit Answers'}
                </Button>

                
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Fixed Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-t border-gray-200 p-4">
        <div className="max-w-7xl mx-auto flex justify-center">
          <button
            onClick={handleSubmit}
            disabled={isLoading || answers.some(answer => !answer.trim())}
            className="disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 transition-transform"
          >
            <NextButton className="w-[228px] h-[60px]" />
          </button>
        </div>
      </div>
    </div>
  );
}