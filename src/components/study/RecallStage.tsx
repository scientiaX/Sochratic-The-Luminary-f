// src/components/study/RecallStage.tsx
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import api from '@/lib/api';

interface Props {
  topicId: string;
}

// Mock questions for demo
const mockQuestions = {
  '1': [
    'Apa itu algoritma dan mengapa penting dalam programming?',
    'Jelaskan perbedaan antara array dan linked list!',
    'Apa itu Big O notation dan berikan contoh kompleksitas O(n²)?',
    'Bagaimana cara kerja bubble sort algorithm?'
  ],
  '2': [
    'Apa itu mathematical thinking dalam konteks programming?',
    'Bagaimana pola matematis membantu dalam problem solving?',
    'Jelaskan konsep rekursi dengan contoh sederhana!',
    'Apa perbedaan antara iterative dan recursive approach?'
  ]
};

export default function RecallStage({ topicId }: Props) {
  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const res = await api.get(`/topics/${topicId}/recall`);
        setQuestions([res.data.test1, res.data.test2, res.data.test3, res.data.test4]);
        setAnswers(['', '', '', '']);
      } catch (error) {
        console.log('Backend not available, using mock questions');
        // Use mock questions as fallback
        const mockData = mockQuestions[topicId as keyof typeof mockQuestions] || [
          'Apa yang telah Anda pelajari dari topik ini?',
          'Bagaimana Anda akan menerapkan pengetahuan ini?',
          'Apa tantangan terbesar yang Anda hadapi?',
          'Bagaimana Anda akan mengembangkan skill ini lebih lanjut?'
        ];
        setQuestions(mockData);
        setAnswers(['', '', '', '']);
      } finally {
        setIsLoading(false);
      }
    };

    loadQuestions();
  }, [topicId]);

  const handleSubmit = async () => {
    try {
      await api.post('/exp', { answers });
    } catch (error) {
      console.log('Backend not available, simulating submission');
    }
    
    localStorage.removeItem('currentStage');
    window.location.href = '/selection';
  };

  if (isLoading) {
    return (
      <Card className="rounded-2xl shadow-lg">
        <CardContent className="p-6">
          <div className="text-center">
            <p>Memuat pertanyaan...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="rounded-2xl shadow-lg">
      <CardContent className="p-6 space-y-4">
        <h2 className="text-xl font-bold">Active Recall</h2>
        
        <div className="text-xs text-blue-600 bg-blue-50 p-2 rounded">
          💡 Demo Mode: Backend belum tersedia. Pertanyaan menggunakan mock data.
        </div>
        
        {questions.map((q, i) => (
          <div key={i} className="space-y-2">
            <p className="font-semibold">{i + 1}. {q}</p>
            <Textarea
              value={answers[i]}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                const newAns = [...answers];
                newAns[i] = e.target.value;
                setAnswers(newAns);
              }}
              placeholder="Jawaban Anda..."
              className="min-h-[80px]"
            />
          </div>
        ))}
        <Button onClick={handleSubmit} className="w-full">
          Kirim Jawaban & Selesai
        </Button>
      </CardContent>
    </Card>
  );
}