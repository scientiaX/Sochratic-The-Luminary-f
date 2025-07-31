// src/pages/study.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ConversationStage from '../components/study/ConversationStage';
import ExplanationStage from '../components/study/ExplanationStage';
import FinalSolutionStage from '../components/study/FinalSolutionStage';
import RealisationStage from '../components/study/RealisationStage';
import RecallStage from '../components/study/RecallStage';

type Stage = 'conversation' | 'explanation' | 'finalSolution' | 'realisation' | 'recall';

export default function StudyPage() {
  const { topicId } = useParams();
  const [stage, setStage] = useState<Stage>('conversation');
  const [aiText, setAiText] = useState('');
  const [problem, setProblem] = useState('');
  const [finalSolution, setFinalSolution] = useState('');

  // Fungsi untuk pindah tahap
  const nextStage = (newStage: Stage, text?: string) => {
    console.log('Moving to stage:', newStage, 'with text:', text?.substring(0, 50) + '...');
    
    if (text) {
      if (newStage === 'explanation') {
        console.log('Setting aiText:', text.substring(0, 100) + '...');
        setAiText(text);
        setStage(newStage);
      } else if (newStage === 'finalSolution') {
        setFinalSolution(text);
        setStage(newStage);
      } else if (newStage === 'realisation') {
        setProblem(text);
        setStage(newStage);
      } else {
        setStage(newStage);
      }
    } else {
      setStage(newStage);
    }
  };



  return (
    <div className="min-h-screen bg-gray-100">
      {stage === 'conversation' && (
        <ConversationStage topicId={topicId!} onNext={nextStage} />
      )}
      {stage === 'explanation' && (
        <ExplanationStage text={aiText} onNext={nextStage} />
      )}
      {stage === 'finalSolution' && (
        <FinalSolutionStage onNext={nextStage} />
      )}
      {stage === 'realisation' && (
        <RealisationStage problem={problem} finalSolution={finalSolution} onNext={nextStage} />
      )}
      {stage === 'recall' && (
        <RecallStage topicId={topicId!} />
      )}
    </div>
  );
}