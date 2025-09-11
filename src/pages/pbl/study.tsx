/**
 * Study Page Component - Fixed Implementation
 *
 * This component manages the learning flow through different stages of the study process.
 * It integrates with the Sochratic API for session management, chat, and EXP tracking.
 *
 * @author Nova X Team
 * @version 2.0.1
 */

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DefaultStage from '../../components/study/pbl/DefaultStage.tsx';
import ExplanationStage from '../../components/study/pbl/ExplanationStage.tsx';
import FinalSolutionStage from '../../components/study/pbl/FinalSolutionStage.tsx';
import RealisationStage from '../../components/study/pbl/RealisationStage.tsx';
import RecallStage from '../../components/study/pbl/RecallStage.tsx';

/**
 * Available learning stages in the study flow
 */
type Stage = 'default' | 'explanation' | 'finalSolution' | 'realisation' | 'recall' | 'completed';

/**
 * API response types
 */
interface SessionResponse {
    sessionId: string;
    userId: number;
    topicId: number;
    createdAt: string;
}

interface ChatResponse {
    reply: string;
}

interface ExpCompleteResponse {
    success: boolean;
    sessionId: string;
    expPoints: Array<{ element: string; value: number }>;
    totalExp: number;
    level: number;
    message: string;
}

/**
 * StudyPage Component
 */
export default function StudyPage() {
    const { courseId, topicId } = useParams<{ courseId: string; topicId: string }>();
    const navigate = useNavigate();

    // Session state
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [userId] = useState<number>(1); // Get from auth context in real app

    // Learning flow state
    const [stage, setStage] = useState<Stage>('default');
    const [aiText, setAiText] = useState<string>('');
    const [problem, setProblem] = useState<string>('');
    const [finalSolution, setFinalSolution] = useState<string>('');

    // UI state
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [isSessionInitialized, setIsSessionInitialized] = useState<boolean>(false);

    /**
     * Abandon session without saving
     */
    const abandonSession = useCallback(async () => {
        if (!sessionId) return;

        try {
            await fetch(`/api/session/${sessionId}/abandon`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('Session abandoned');
        } catch (err) {
            console.error('Failed to abandon session:', err);
        }
    }, [sessionId]);

    /**
     * Initialize session when component mounts
     */
    const initializeSession = useCallback(async () => {
        // Validate required params
        if (!topicId || !courseId) {
            setError('Missing required parameters: courseId or topicId');
            return;
        }

        // Validate topicId is a number
        const topicIdNumber = parseInt(topicId);
        if (isNaN(topicIdNumber)) {
            setError('Invalid topic ID provided');
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const response = await fetch('/api/session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId,
                    topicId: topicIdNumber,
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP ${response.status}: ${response.statusText} - ${errorText}`);
            }

            const data: SessionResponse = await response.json();
            setSessionId(data.sessionId);
            setIsSessionInitialized(true);

            console.log('Session initialized:', data);
        } catch (err) {
            console.error('Failed to initialize session:', err);
            const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
            setError(`Failed to start learning session: ${errorMessage}`);
        } finally {
            setLoading(false);
        }
    }, [topicId, courseId, userId]);

    /**
     * Effect to initialize session and handle cleanup
     */
    useEffect(() => {
        if (!isSessionInitialized && !sessionId) {
            initializeSession();
        }

        // Cleanup: abandon session if user leaves without completing
        return () => {
            if (sessionId && stage !== 'completed') {
                abandonSession();
            }
        };
    }, [initializeSession, abandonSession, sessionId, stage, isSessionInitialized]);

    /**
     * Send message to AI and handle response
     */
    const sendMessage = async (message: string, mode: string = 'DEFAULT'): Promise<string> => {
        if (!sessionId) {
            throw new Error('No active session');
        }

        if (!topicId) {
            throw new Error('No topic ID available');
        }

        const topicIdNumber = parseInt(topicId);
        if (isNaN(topicIdNumber)) {
            throw new Error('Invalid topic ID');
        }

        const response = await fetch('/api/chat/message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                topicId: topicIdNumber,
                message,
                userId,
                sessionId,
                mode,
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP ${response.status}: ${response.statusText} - ${errorText}`);
        }

        const data: ChatResponse = await response.json();
        return data.reply;
    };

    /**
     * Complete session and get EXP
     */
    const completeSession = async (): Promise<ExpCompleteResponse> => {
        if (!sessionId) {
            throw new Error('No active session');
        }

        if (!topicId) {
            throw new Error('No topic ID available');
        }

        const topicIdNumber = parseInt(topicId);
        if (isNaN(topicIdNumber)) {
            throw new Error('Invalid topic ID');
        }

        const response = await fetch(`/api/exp/complete/${sessionId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId,
                topicId: topicIdNumber,
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP ${response.status}: ${response.statusText} - ${errorText}`);
        }

        return await response.json();
    };

    /**
     * Handle stage transitions with API integration
     */
    const nextStage = async (newStage: Stage, userMessage?: string) => {
        try {
            setLoading(true);
            setError(null);

            console.log('Transitioning to stage:', newStage);

            switch (newStage) {
                case 'explanation': {
                    // AI automatically provides explanation when user needs it
                    const aiResponse = await sendMessage(
                        userMessage || 'I need more explanation about this concept',
                        'EXPLAIN_CONCEPT'
                    );

                    // Check if response contains explanation material
                    if (aiResponse.includes('<MATERIAL_TYPE=')) {
                        setAiText(aiResponse);
                        setStage('explanation');
                    } else {
                        // If no explanation tag, send to default stage
                        setStage('default');
                    }
                    break;
                }

                case 'finalSolution': {
                    // Request solution from AI
                    const aiResponse = await sendMessage('Lanjutkan', 'REQUEST_SOLUTION');
                    setFinalSolution(aiResponse);
                    setStage('finalSolution');
                    break;
                }

                case 'realisation': {
                    // Enter implementation mode
                    const aiResponse = await sendMessage('Lanjutkan', 'ENTER_IMPLEMENTATION');

                    // Check for implementation start tag
                    if (aiResponse.includes('<IMPLEMENTATION_START>')) {
                        setProblem(aiResponse);
                        setStage('realisation');
                    }
                    break;
                }

                case 'recall': {
                    // Enter active recall mode
                    const aiResponse = await sendMessage('Lanjutkan', 'ACTIVE_RECALL');

                    // Check for active recall mode tag
                    if (aiResponse.includes('<ACTIVE_RECALL_MODE>')) {
                        setStage('recall');
                    }
                    break;
                }

                case 'completed': {
                    // Complete session and get EXP
                    const expResult = await completeSession();
                    console.log('Session completed:', expResult);

                    // Show success message
                    setStage('completed');
                    break;
                }

                default:
                    setStage(newStage);
            }
        } catch (err) {
            console.error('Error in stage transition:', err);
            const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
            setError(`Failed to proceed to ${newStage}: ${errorMessage}`);
        } finally {
            setLoading(false);
        }
    };

    /**
     * Handle direct chat messages from DefaultStage
     */
    const handleChatMessage = async (message: string): Promise<string> => {
        try {
            setError(null);
            const response = await sendMessage(message, 'DEFAULT');

            // Check for automatic mode transitions
            if (response.includes('<MATERIAL_TYPE=')) {
                // AI detected need for explanation
                setAiText(response);
                setStage('explanation');
            }

            return response;
        } catch (err) {
            console.error('Chat error:', err);
            const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
            setError(`Failed to send message: ${errorMessage}`);
            throw err;
        }
    };

    /**
     * Handle navigation back to topics
     */
    const handleBackToTopics = () => {
        if (courseId) {
            navigate(`/course/${courseId}/topics`);
        } else {
            navigate(-1); // Go back in history
        }
    };

    // Show loading state during session initialization
    if (loading && !sessionId) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Starting your learning session...</p>
                </div>
            </div>
        );
    }

    // Show error state
    if (error && !sessionId) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-center max-w-md mx-auto p-6">
                    <div className="text-red-500 mb-4 text-4xl">❌</div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Session Error</h2>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <div className="space-x-2">
                        <button
                            onClick={() => window.location.reload()}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            Try Again
                        </button>
                        <button
                            onClick={handleBackToTopics}
                            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                        >
                            Back to Topics
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Don't render stages until session is properly initialized
    if (!sessionId || !isSessionInitialized) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Initializing session...</p>
                </div>
            </div>
        );
    }

    // Render current stage
    return (
        <div className="min-h-screen bg-gray-100 pb-16">
            {/* Loading overlay */}
            {loading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p>Processing...</p>
                    </div>
                </div>
            )}

            {/* Error banner */}
            {error && (
                <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-red-700">{error}</p>
                        </div>
                        <div className="ml-auto pl-3">
                            <button
                                onClick={() => setError(null)}
                                className="text-red-400 hover:text-red-600"
                            >
                                <span className="sr-only">Dismiss</span>
                                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Stage Components */}
            {stage === 'default' && topicId && (
                <DefaultStage
                    topicId={topicId}
                    onNext={nextStage}
                    onChatMessage={handleChatMessage}
                    sessionId={sessionId}
                />
            )}

            {stage === 'explanation' && (
                <ExplanationStage
                    text={aiText}
                    onNext={nextStage}
                />
            )}

            {stage === 'finalSolution' && (
                <FinalSolutionStage
                    solution={finalSolution}
                    onNext={nextStage}
                />
            )}

            {stage === 'realisation' && (
                <RealisationStage
                    problem={problem}
                    finalSolution={finalSolution}
                    onNext={nextStage}
                />
            )}

            {stage === 'recall' && topicId && (
                <RecallStage
                    topicId={topicId}
                    sessionId={sessionId}
                    onComplete={() => nextStage('completed')}
                    onChatMessage={handleChatMessage}
                />
            )}

            {stage === 'completed' && (
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center max-w-md mx-auto p-6">
                        <div className="text-green-500 text-6xl mb-4">🎉</div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            Congratulations!
                        </h2>
                        <p className="text-gray-600 mb-6">
                            You have successfully completed this topic. Check your profile to see your earned EXP!
                        </p>
                        <button
                            onClick={handleBackToTopics}
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Back to Topics
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}