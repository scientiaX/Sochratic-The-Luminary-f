/**
 * Default Stage Component
 *
 * This is the initial learning stage where users begin their study session.
 * It provides an interactive interface for users to engage with the topic,
 * ask questions, and receive explanations. The component includes a problem
 * presentation system and a conversation interface for learning.
 *
 * Features:
 * - Interactive problem presentation with typing animation
 * - Question-based learning approach
 * - Real-time conversation interface
 * - Seamless transition to explanation stage
 *
 * @author Nova X Team
 * @version 1.0.0
 */

import React, {useState, useEffect} from 'react';
import {Home, BookOpen, Sparkles} from 'lucide-react';
import NextButton from '../../element/NextButton.tsx';
import {Button} from '@/components/ui/button.tsx';
import {Card, CardContent} from '@/components/ui/card.tsx';
import {Input} from '@/components/ui/input.tsx';
// API imports removed since this component doesn't use backend APIs yet
import {useNavigate} from 'react-router-dom';

/**
 * Props interface for DefaultStage component
 *
 * @interface Props
 * @property {string} topicId - Unique identifier for the current topic
 * @property {function} onNext - Callback function to transition to next stage
 */
interface Props {
    topicId: string,
    onNext: (stage: 'explanation' | 'realisation', text?: string) => void,
    onChatMessage?: (message: string) => Promise<string>
}

/**
 * DefaultStage Component
 *
 * The primary learning interface that serves as the entry point for study sessions.
 * Manages user interactions, problem presentation, and stage transitions.
 *
 * @param {Props} props - Component properties
 * @returns {JSX.Element} The default stage interface
 */
export default function DefaultStage({topicId, onNext, onChatMessage}: Props) {
    const navigate = useNavigate();

    // UI State Management
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [currentSession, setCurrentSession] = useState(0);
    const [typedProblem, setTypedProblem] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [explanationText, setExplanationText] = useState('');
    const [currentStage, setCurrentStage] = useState<'default' | 'explanation'>('default');

    /**
     * Mock data for different learning topics
     * Contains problem statements and guided questions for each topic
     */
    const mockResponses = {
        '1': {
            title: 'Algorithms & Data Structures',
            problem: 'Implement the bubble sort algorithm to sort the array [64, 34, 25, 12, 22, 11, 90]. Explain the time and space complexity of this algorithm.',
            questions: [
                'What is an algorithm and why is it important in programming?',
                'Explain the difference between arrays and linked lists!',
                'How does the bubble sort algorithm work?'
            ]
        },
        '2': {
            title: 'Probability & Statistics',
            problem: 'If there are 5 red balls, 3 blue balls, and 2 green balls in a box, what is the probability of drawing a red ball in one draw?',
            questions: [
                'What is probability and how is it calculated?',
                'Explain the concept of sample space!',
                'How do we determine probability in simple events?'
            ]
        },
        '3': {
            title: 'Linear Algebra',
            problem: 'Solve the system of linear equations: 2x + 3y = 8 and 4x - y = 7 using matrix operations.',
            questions: [
                'What are matrices and how are they used in linear algebra?',
                'Explain the concept of determinants!',
                'How do we solve systems of linear equations?'
            ]
        }
    };

    /**
     * Mock explanation content for each topic
     * Provides detailed explanations with code examples and theoretical concepts
     */
    const mockExplanations = {
        '1': `# Bubble Sort Algorithm

Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.

## How it works:

\`\`\`python
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
    return arr

# Example usage
numbers = [64, 34, 25, 12, 22, 11, 90]
sorted_numbers = bubble_sort(numbers.copy())
print("Original:", numbers)
print("Sorted:", sorted_numbers)
\`\`\`

## Time Complexity:
- **Best Case**: O(n) - when array is already sorted
- **Average Case**: O(n²) - typical case
- **Worst Case**: O(n²) - when array is reverse sorted

## Space Complexity:
- **O(1)** - only uses a constant amount of extra space

The algorithm gets its name because smaller elements "bubble" to the top of the list.`,
        '2': `# Probability Fundamentals

Probability is a measure of the likelihood that an event will occur. It ranges from 0 (impossible) to 1 (certain).

## Basic Probability Formula:

\`\`\`python
def calculate_probability(favorable_outcomes, total_outcomes):
    return favorable_outcomes / total_outcomes

# Example: Probability of drawing a red ball
red_balls = 5
blue_balls = 3
green_balls = 2
total_balls = red_balls + blue_balls + green_balls

probability_red = calculate_probability(red_balls, total_balls)
print(f"Probability of red ball: {probability_red:.2f} = {probability_red * 100:.1f}%")
\`\`\`

## Key Concepts:
- **Sample Space**: All possible outcomes (10 balls total)
- **Favorable Outcomes**: Desired outcomes (5 red balls)
- **Probability**: 5/10 = 0.5 = 50%

## Properties:
- Probability always ranges from 0 to 1
- Sum of all probabilities equals 1
- P(A) + P(not A) = 1`,
        '3': `# Linear Algebra: Systems of Equations

Linear algebra provides powerful tools for solving systems of linear equations using matrices and determinants.

## Matrix Method:

\`\`\`python
import numpy as np

# System: 2x + 3y = 8, 4x - y = 7
# Matrix form: AX = B
A = np.array([[2, 3], [4, -1]])
B = np.array([8, 7])

# Solution: X = A^(-1) * B
X = np.linalg.solve(A, B)
print(f"x = {X[0]:.2f}")
print(f"y = {X[1]:.2f}")

# Verification
print(f"2x + 3y = {2*X[0] + 3*X[1]:.2f}")
print(f"4x - y = {4*X[0] - X[1]:.2f}")
\`\`\`

## Key Concepts:
- **Matrix**: Rectangular array of numbers
- **Determinant**: Scalar value that determines if matrix is invertible
- **Inverse**: Matrix that when multiplied gives identity matrix

## Solution Steps:
1. Write equations in matrix form AX = B
2. Find inverse of matrix A
3. Multiply A^(-1) with B to get solution X`
    };

    // Get the current topic data
    const mockData = mockResponses[topicId as keyof typeof mockResponses] || mockResponses['1'];

    /**
     * Initialize the component with auto-opening dropdown and typing animation
     */
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsDropdownOpen(true);
            setIsTyping(true);
            typeProblem(mockData.problem);
        }, 500);
        return () => clearTimeout(timer);
    }, [mockData.problem]);

    /**
     * Creates a typing animation effect for problem presentation
     *
     * @param {string} text - The text to be typed out
     */
    const typeProblem = (text: string) => {
        let index = 0;
        setTypedProblem("");
        const typeInterval = setInterval(() => {
            if (index < text.length) {
                setTypedProblem(prev => prev + text[index]);
                index++;
            } else {
                clearInterval(typeInterval);
                setIsTyping(false);
            }
        }, 30);
    };

    /**
     * Toggles the problem dropdown visibility
     */
    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    /**
     * Handles input field changes for user questions
     *
     * @param {React.ChangeEvent<HTMLInputElement>} e - Input change event
     */
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    /**
     * Handles stage transitions and user input processing
     * Manages the flow between default and explanation stages
     */
    const handleNext = () => {
        if (inputValue.trim()) {
            if (currentStage === 'default') {
                // Get explanation text first
                const mockExplanation = mockExplanations[topicId as keyof typeof mockExplanations] || mockExplanations['1'];
                setExplanationText(mockExplanation);

                // Move to explanation stage
                setCurrentStage('explanation');

                // Transition to explanation stage immediately
                console.log('Calling onNext with explanation text:', mockExplanation.substring(0, 100) + '...');
                onNext('explanation', mockExplanation);
            } else if (currentStage === 'explanation') {
                // Move to realisation stage with problem data
                onNext('realisation', mockData.problem);
            }
            setInputValue('');
        }
    };

    /**
     * Renders explanation content with proper formatting for code blocks and headers
     *
     * @param {string} text - The explanation text to render
     * @returns {JSX.Element[]} Array of formatted content elements
     */
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
                                if (level === 1) return <h2 key={j}
                                                            className="text-xl font-bold text-gray-900 mb-2">{content}</h2>;
                                else if (level === 2) return <h3 key={j}
                                                                 className="text-lg font-bold text-gray-900 mb-2">{content}</h3>;
                                else if (level === 3) return <h4 key={j}
                                                                 className="text-base font-bold text-gray-900 mb-2">{content}</h4>;
                                else return <h5 key={j} className="text-sm font-bold text-gray-900 mb-2">{content}</h5>;
                            } else if (line.trim() === '') {
                                return <br key={j}/>;
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

    /**
     * Navigation items configuration for the top navigation bar
     */
    const navItems = [
        {
            icon: (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path
                        d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 7V9C15 10.1 14.1 11 13 11V22H11V16H9V22H7V11C5.9 11 5 10.1 5 9V7L3 7V9H1V7C1 5.9 1.9 5 3 5H21C22.1 5 23 5.9 23 7V9H21Z"/>
                </svg>
            ),
            text: "Profil",
        },
        {
            icon: (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path
                        d="M16 4C18.2 4 20 5.8 20 8C20 10.2 18.2 12 16 12C13.8 12 12 10.2 12 8C12 5.8 13.8 4 16 4ZM16 6C14.9 6 14 6.9 14 8C14 9.1 14.9 10 16 10C17.1 10 18 9.1 18 8C18 6.9 17.1 6 16 6ZM4 8C5.1 8 6 8.9 6 10C6 11.1 5.1 12 4 12C2.9 12 2 11.1 2 10C2 8.9 2.9 8 4 8ZM4 10C4 10 4 10 4 10ZM16 14C19.3 14 22 16.7 22 20V22H10V20C10 16.7 12.7 14 16 14ZM8 18C8 18 8 18 8 18H8V20H8V18ZM4 14C6.2 14 8 15.8 8 18V20H2V18C2 15.8 3.8 14 4 14Z"/>
                </svg>
            ),
            text: "Join",
        },
    ];

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <div className="flex-1 p-4">
                <div className="max-w-7xl mx-auto">
                    {/* Top Navigation */}
                    <Card
                        className={`mt-0 mb-4 shadow-xl border-0 bg-white/80 backdrop-blur-sm transition-all duration-700`}>
                        <CardContent className="p-6 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                                    <BookOpen className="w-5 h-5 text-white"/>
                                </div>
                                <div>
                                    <div className="font-bold text-gray-900 text-xl">Nova X</div>
                                    <div className="text-sm text-gray-500">Learning Platform</div>
                                </div>
                            </div>

                            <div className="flex space-x-3">
                                {navItems.map((item, index) => (
                                    <Button
                                        key={`nav-${index}`}
                                        variant="ghost"
                                        className="flex items-center space-x-2 h-12 px-4 rounded-xl hover:bg-gray-100 transition-all duration-300"
                                        onClick={() => {
                                            if (item.text === 'Home') {
                                                navigate('/selection');
                                            } else if (item.text === 'Join' || item.text === 'Profil') {
                                                navigate('/premium');
                                            }
                                        }}
                                    >
                                        {item.icon}
                                        <span className="hidden sm:inline font-medium text-gray-700 text-sm">
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
                                <span>Default Stage</span>
                                <span>Step 1 of 5</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                                    style={{width: '20%'}}></div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Main Content Layout */}
                    <div className="max-w-6xl mx-auto">
                        <div className="flex justify-center">
                            <div className="w-full max-w-4xl">
                                {/* Dropdown Container */}
                                <div className="flex justify-center relative mb-3">
                                    <div className="relative">
                                        {/* Dropdown Button */}
                                        <Button
                                            className={`w-32 sm:w-80 h-8 sm:h-11 bg-gray-200 hover:bg-gray-300 border border-gray-300 rounded-xl cursor-pointer transition-all duration-300 ease-out ${
                                                isDropdownOpen ? 'opacity-30 scale-95' : 'opacity-100 scale-100 hover:opacity-80'
                                            }`}
                                            onClick={handleDropdownToggle}
                                        >
                                            <span className="text-gray-600 text-sm font-medium">Show Problem</span>
                                        </Button>

                                        {/* Dropdown Content */}
                                        <div
                                            className={`absolute top-0 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 w-screen max-w-4xl px-4 sm:px-0 sm:w-full ${
                                                isDropdownOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-8 scale-90 pointer-events-none'
                                            }`}
                                            style={{transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'}}
                                        >
                                            <Card
                                                className="w-full bg-[#0e132380] rounded-2xl backdrop-blur-[30px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(30px)_brightness(100%)] shadow-2xl border-0">
                                                <CardContent className="p-6">
                                                    <h2 className="[font-family:'Inter',Helvetica] font-bold text-[#e2e5e8] text-[15px] tracking-[0] leading-6 mb-4">
                                                        {typedProblem}
                                                        {isTyping && <span className="animate-pulse">|</span>}
                                                    </h2>
                                                    <Button
                                                        className="w-full h-11 bg-gray-400 hover:bg-gray-500 active:bg-gray-600 text-white rounded-xl transition-all duration-150 active:scale-95 transform"
                                                        onClick={handleDropdownToggle}
                                                        disabled={isTyping}
                                                    >
                                                        CONTINUE
                                                    </Button>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </div>
                                </div>

                                {/* Default Stage Interface */}
                                <Card className="bg-white border-2 border-gray-300 rounded-2xl mb-12">
                                    <CardContent className="p-6">
                                        {currentStage === 'default' && (
                                            <>
                                                {/* AI Response */}
                                                <div className="mb-6">
                                                    <div className="text-sm text-gray-500 mb-2 font-medium">Question:
                                                    </div>
                                                    <div className="text-gray-800 text-base leading-relaxed">
                                                        {mockData.questions[currentSession]}
                                                    </div>
                                                </div>

                                                {/* Input Field */}
                                                <div className="border-t border-gray-200 pt-4">
                                                    <Input
                                                        className="bg-gray-100 h-12 border border-gray-300 rounded-xl placeholder:text-gray-600 w-full focus:bg-white transition-colors"
                                                        placeholder="Enter your question and opinion"
                                                        value={inputValue}
                                                        onChange={handleInputChange}
                                                        onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
                                                            if (e.key === 'Enter' && inputValue.trim()) {
                                                                handleNext();
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            </>
                                        )}

                                        {currentStage === 'explanation' && (
                                            <>
                                                <div className="text-sm text-gray-500 mb-2 font-medium">Material
                                                    Explanation:
                                                </div>
                                                {renderExplanationContent(explanationText)}
                                            </>
                                        )}


                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-t border-gray-200 p-4">
                <div className="max-w-7xl mx-auto flex justify-center">
                    <button
                        onClick={handleNext}
                        disabled={!inputValue.trim() || isTyping}
                        className="disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 transition-transform"
                    >
                        <NextButton className="w-[228px] h-[60px]"/>
                    </button>
                </div>
            </div>
        </div>
    );
}