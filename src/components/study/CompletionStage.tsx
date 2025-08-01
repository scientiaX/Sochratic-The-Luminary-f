// src/components/study/CompletionStage.tsx
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Home, Trophy, Star, Target, Brain, Zap, Lightbulb, TrendingUp, Award } from 'lucide-react';
import Lottie from 'lottie-react';
import expAnimation from '../element/exp.json';
import { useNavigate } from 'react-router-dom';

interface Props {
  topicId: string;
}

interface EvaluationAspect {
  name: string;
  icon: React.ReactNode;
  score: number;
  color: string;
  description: string;
}

export default function CompletionStage({ topicId }: Props) {
  const navigate = useNavigate();
  const [showAnimation, setShowAnimation] = useState(false);
  const [showScores, setShowScores] = useState(false);
  const [currentAspect, setCurrentAspect] = useState(0);

  const evaluationAspects: EvaluationAspect[] = [
    {
      name: "Clarity",
      icon: <Lightbulb className="w-5 h-5" />,
      score: 85,
      color: "from-yellow-400 to-orange-500",
      description: "How clearly you understand the concepts"
    },
    {
      name: "Logic",
      icon: <Brain className="w-5 h-5" />,
      score: 92,
      color: "from-blue-400 to-purple-500",
      description: "Your logical reasoning abilities"
    },
    {
      name: "Significance",
      icon: <Target className="w-5 h-5" />,
      score: 78,
      color: "from-red-400 to-pink-500",
      description: "Understanding of key concepts"
    },
    {
      name: "Precision",
      icon: <Zap className="w-5 h-5" />,
      score: 88,
      color: "from-green-400 to-teal-500",
      description: "Accuracy in your responses"
    },
    {
      name: "Breadth",
      icon: <TrendingUp className="w-5 h-5" />,
      score: 76,
      color: "from-indigo-400 to-blue-500",
      description: "Range of knowledge covered"
    },
    {
      name: "Depth",
      icon: <Award className="w-5 h-5" />,
      score: 82,
      color: "from-purple-400 to-violet-500",
      description: "Depth of understanding"
    },
    {
      name: "Relevance",
      icon: <Star className="w-5 h-5" />,
      score: 90,
      color: "from-amber-400 to-yellow-500",
      description: "Relevance of your answers"
    },
    {
      name: "Fairness",
      icon: <Trophy className="w-5 h-5" />,
      score: 87,
      color: "from-emerald-400 to-green-500",
      description: "Balanced perspective"
    },
    {
      name: "Insight",
      icon: <Home className="w-5 h-5" />,
      score: 84,
      color: "from-rose-400 to-red-500",
      description: "Unique insights gained"
    }
  ];

  useEffect(() => {
    setShowAnimation(true);
    const timer = setTimeout(() => {
      setShowAnimation(false);
      setShowScores(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showScores) {
      const interval = setInterval(() => {
        setCurrentAspect(prev => {
          if (prev < evaluationAspects.length - 1) {
            return prev + 1;
          } else {
            clearInterval(interval);
            return prev;
          }
        });
      }, 500);
      return () => clearInterval(interval);
    }
  }, [showScores]);

  const totalScore = Math.round(
    evaluationAspects.reduce((sum, aspect) => sum + aspect.score, 0) / evaluationAspects.length
  );

  const handleFinish = () => {
    localStorage.removeItem('currentStage');
    window.location.href = '/selection';
  };

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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex flex-col">
      <div className="flex-1 p-4 pb-16">
        <div className="max-w-6xl mx-auto">
          <Card className="mt-0 mb-4 shadow-lg bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-4 flex justify-between items-center">
              <div className="font-bold text-white text-lg">Nova X</div>
              <div className="flex space-x-2">
                {navItems.map((item, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="flex items-center space-x-2 h-10 px-3 rounded-lg hover:bg-white/20 text-white"
                    onClick={() => {
                      if (item.text === 'Home') {
                        navigate('/selection');
                      } else if (item.text === 'Join' || item.text === 'Profil') {
                        navigate('/premium');
                      }
                    }}
                  >
                    {item.icon}
                    <span className="hidden sm:inline font-normal text-white text-sm">
                      {item.text}
                    </span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="text-center space-y-8">
            {showAnimation && (
              <div className="flex flex-col items-center space-y-6">
                <div className="w-64 h-64">
                  <Lottie 
                    animationData={expAnimation}
                    loop={true}
                    autoplay={true}
                    style={{ width: '100%', height: '100%' }}
                  />
                </div>
                <div className="text-white text-2xl font-bold animate-pulse">
                  Calculating Your Experience Points...
                </div>
              </div>
            )}

            {showScores && (
              <div className="space-y-8">
                <Card className="bg-white/10 backdrop-blur-sm border-white/20 shadow-xl">
                  <CardContent className="p-8 text-center">
                    <div className="text-6xl font-bold text-white mb-4">{totalScore}</div>
                    <div className="text-xl text-white/80 mb-2">Overall Experience Score</div>
                    <div className="text-sm text-white/60">Based on 9 evaluation criteria</div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {evaluationAspects.map((aspect, index) => (
                    <Card 
                      key={aspect.name}
                      className={`bg-white/10 backdrop-blur-sm border-white/20 shadow-lg transition-all duration-500 ${
                        index <= currentAspect ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                      }`}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-lg bg-gradient-to-r ${aspect.color}`}>
                              {aspect.icon}
                            </div>
                            <div>
                              <div className="font-semibold text-white text-lg">{aspect.name}</div>
                              <div className="text-white/60 text-sm">{aspect.description}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-white">{aspect.score}</div>
                            <div className="text-xs text-white/60">/100</div>
                          </div>
                        </div>
                        <div className="w-full bg-white/20 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full bg-gradient-to-r ${aspect.color} transition-all duration-1000 ease-out`}
                            style={{ width: `${aspect.score}%` }}
                          ></div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card className="bg-gradient-to-r from-yellow-400/20 to-orange-500/20 backdrop-blur-sm border-yellow-400/30 shadow-xl">
                  <CardContent className="p-8 text-center">
                    <div className="text-4xl mb-4">🎉</div>
                    <h2 className="text-2xl font-bold text-white mb-2">Congratulations!</h2>
                    <p className="text-white/80 text-lg">
                      You've successfully completed all learning stages and earned {totalScore} experience points!
                    </p>
                    <p className="text-white/60 text-sm mt-2">
                      Keep practicing to improve your scores across all aspects.
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {showScores && (
        <div className="fixed bottom-0 left-0 right-0 bg-white/10 backdrop-blur-sm border-t border-white/20 p-4">
          <div className="max-w-6xl mx-auto flex justify-center">
            <Button
              onClick={handleFinish}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
            >
              Continue Learning
            </Button>
          </div>
        </div>
      )}
    </div>
  );
} 