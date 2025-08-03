/**
 * Study Page Component
 * 
 * This component manages the learning flow through different stages of the study process.
 * It handles state transitions between various learning stages and maintains the overall
 * study session state.
 * 
 * @author Nova X Team
 * @version 1.0.0
 */

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DefaultStage from '../components/study/DefaultStage';
import ExplanationStage from '../components/study/ExplanationStage';
import FinalSolutionStage from '../components/study/FinalSolutionStage';
import RealisationStage from '../components/study/RealisationStage';
import RecallStage from '../components/study/RecallStage';

/**
 * Available learning stages in the study flow
 * - default: Initial stage where users interact with the topic
 * - explanation: Detailed concept explanation stage
 * - finalSolution: Solution generation and review stage
 * - realisation: Problem understanding and analysis stage
 * - recall: Knowledge retention and testing stage
 */
type Stage = 'default' | 'explanation' | 'finalSolution' | 'realisation' | 'recall';

/**
 * StudyPage Component
 * 
 * Main container component that orchestrates the learning experience.
 * Manages stage transitions and maintains session state throughout
 * the learning process.
 * 
 * @returns {JSX.Element} The study page with current stage rendered
 */
export default function StudyPage() {
  // Extract course ID and topic ID from URL parameters
  const { courseId, topicId } = useParams();
  
  // State management for learning flow
  const [stage, setStage] = useState<Stage>('default'); // Current learning stage
  const [aiText, setAiText] = useState(''); // AI-generated explanation content
  const [problem, setProblem] = useState(''); // Current problem statement
  const [finalSolution, setFinalSolution] = useState(''); // Generated solution

  /**
   * Handles stage transitions and state updates
   * 
   * This function manages the flow between different learning stages
   * and updates the appropriate state variables based on the stage type.
   * 
   * @param {Stage} newStage - The target stage to transition to
   * @param {string} [text] - Optional text content for the stage
   */
  const nextStage = (newStage: Stage, text?: string) => {
    console.log('Moving to stage:', newStage, 'with text:', text?.substring(0, 50) + '...');
    
    if (text) {
      switch (newStage) {
        case 'explanation':
          console.log('Setting aiText:', text.substring(0, 100) + '...');
          setAiText(text);
          setStage(newStage);
          break;
        case 'finalSolution':
          setFinalSolution(text);
          setStage(newStage);
          break;
        case 'realisation':
          setProblem(text);
          setStage(newStage);
          break;
        default:
          setStage(newStage);
      }
    } else {
      setStage(newStage);
    }
  };

  /**
   * Render the appropriate stage component based on current state
   * 
   * Each stage component receives the necessary props for its functionality
   * and the onNext callback for stage transitions.
   */
  return (
    <div className="min-h-screen bg-gray-100 pb-16">
      {/* Default Stage - Initial learning interaction */}
      {stage === 'default' && (
        <DefaultStage topicId={topicId!} onNext={nextStage} />
      )}
      
      {/* Explanation Stage - Detailed concept breakdown */}
      {stage === 'explanation' && (
        <ExplanationStage text={aiText} onNext={nextStage} />
      )}
      
      {/* Final Solution Stage - Solution generation and review */}
      {stage === 'finalSolution' && (
        <FinalSolutionStage onNext={nextStage} />
      )}
      
      {/* Realisation Stage - Problem understanding and analysis */}
      {stage === 'realisation' && (
        <RealisationStage problem={problem} finalSolution={finalSolution} onNext={nextStage} />
      )}
      
      {/* Recall Stage - Knowledge retention and testing */}
      {stage === 'recall' && (
        <RecallStage topicId={topicId!} />
      )}
    </div>
  );
}