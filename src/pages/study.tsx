// src/pages/study.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ConversationStage from '../components/study/ConversationStage';
import ExplanationStage from '../components/study/ExplanationStage';
import RealisationStage from '../components/study/RealisationStage';
import RecallStage from '../components/study/RecallStage';

type Stage = 'conversation' | 'explanation' | 'realisation' | 'recall';

export default function StudyPage() {
  const { topicId } = useParams();
  const [stage, setStage] = useState<Stage>('conversation');
  const [aiText, setAiText] = useState('');
  const [problem, setProblem] = useState('');

  // Load stage dari localStorage
  useEffect(() => {
    const saved = localStorage.getItem('currentStage');
    if (saved) setStage(saved as Stage);
  }, []);

  // Fungsi untuk pindah tahap
  const nextStage = (newStage: Stage, text?: string) => {
    setStage(newStage);
    if (text) setAiText(text);
    localStorage.setItem('currentStage', newStage);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        {stage === 'conversation' && (
          <ConversationStage topicId={topicId!} onNext={nextStage} />
        )}
        {stage === 'explanation' && (
          <ExplanationStage text={aiText} onNext={nextStage} />
        )}
        {stage === 'realisation' && (
          <RealisationStage problem={problem} onNext={nextStage} />
        )}
        {stage === 'recall' && (
          <RecallStage topicId={topicId!} />
        )}
      </div>
    </div>
  );
}