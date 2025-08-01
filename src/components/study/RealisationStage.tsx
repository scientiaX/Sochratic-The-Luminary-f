// src/components/study/RealisationStage.tsx
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Home } from 'lucide-react';
import NextButton from '../element/NextButton';
import api from '@/lib/api';
import { useNavigate } from 'react-router-dom';

interface Props {
  problem: string;
  finalSolution?: string;
  onNext: (stage: 'recall') => void;
}

// Mock solution prompts for different topics
const getSolutionPrompt = (problem: string) => {
  if (problem.includes('bubble sort') || problem.includes('algoritma')) {
    return 'Now implement the bubble sort algorithm to sort the array [64, 34, 25, 12, 22, 11, 90]. Write Python code and explain how the algorithm works step by step.';
  } else if (problem.includes('probability') || problem.includes('peluang')) {
    return 'Now solve the probability problem: If there are 5 red balls, 3 blue balls, and 2 green balls in a box, what is the probability of drawing a red ball in one draw? Write the solution with step-by-step explanation.';
  } else {
    return 'Now implement the solution for the problem you have learned. Write your code and explanation.';
  }
};

// Mock AI realisation responses with editable code
const getAIRealisation = (problem: string, userSolution: string) => {
  if (problem.includes('bubble sort') || problem.includes('algoritma')) {
    return {
      explanation: `# AI Realisation Version - Bubble Sort

Based on your solution, here is the optimized implementation:

**Improvements made:**
1. Added swapped flag for early termination
2. If no swapping occurs in one iteration, array is already sorted
3. Using .copy() to avoid modifying the original array
4. Added more detailed complexity analysis

Your solution is correct! This is the optimized version for better performance.`,
      code: `def bubble_sort_optimized(arr):
    n = len(arr)
    for i in range(n):
        swapped = False
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
                swapped = True
        # If no swapping occurred, array is already sorted
        if not swapped:
            break
    return arr

# Test with the same array
numbers = [64, 34, 25, 12, 22, 11, 90]
print("Original array:", numbers)
sorted_numbers = bubble_sort_optimized(numbers.copy())
print("Sorted array:", sorted_numbers)

# Complexity analysis
print("\\nComplexity:")
print("- Worst case: O(n²)")
print("- Best case: O(n) if array is already sorted")
print("- Space: O(1)")`
    };
  } else if (problem.includes('probability') || problem.includes('peluang')) {
    return {
      explanation: `# AI Realisation Version - Probability

Based on your solution, here is the more comprehensive explanation:

**Complete explanation:**
- Total balls = 5 + 3 + 2 = 10
- Probability = Red balls / Total balls = 5/10 = 0.5 = 50%
- This is a simple probability example with equally likely outcomes

Your solution is correct! This is a more structured implementation.`,
      code: `def calculate_probability():
    # Number of balls
    red_balls = 5
    blue_balls = 3
    green_balls = 2
    total_balls = red_balls + blue_balls + green_balls
    
    # Probability of drawing a red ball
    probability_red = red_balls / total_balls
    
    print(f"Total balls: {total_balls}")
    print(f"Red balls: {red_balls}")
    print(f"Probability of red ball: {red_balls}/{total_balls} = {probability_red:.2f} = {probability_red * 100:.1f}%")
    
    return probability_red

# Calculate probability
prob = calculate_probability()
print(f"\\nSo the probability of drawing a red ball is {prob:.2f} or {prob * 100:.1f}%")`
    };
  } else {
    return {
      explanation: `# AI Realisation Version

Based on your solution, here is the optimized implementation:

Your solution is good! This is a more structured and efficient version.`,
      code: `# Optimized implementation based on learned concepts
def optimized_solution():
    # Implementation here
    pass

print("Solution optimized based on learning")`
    };
  }
};

// Safe Python execution with sandboxing
const executePythonCode = async (code: string): Promise<string> => {
  try {
    // Try to call real API with sandboxed execution
    const res = await api.post('/execute-python', { 
      code,
      timeout: 5000, // 5 second timeout
      memory_limit: '50MB',
      allow_imports: ['math', 'random', 'datetime'] // Only safe imports
    });
    return res.data.output;
  } catch (error) {
    console.log('Backend not available, using mock execution');
    // Mock execution for demo
    return mockExecutePython(code);
  }
};

// Mock Python execution for demo
const mockExecutePython = (code: string): string => {
  // Simple mock execution for demo purposes
  if (code.includes('bubble_sort_optimized')) {
    return `Original array: [64, 34, 25, 12, 22, 11, 90]
Sorted array: [11, 12, 22, 25, 34, 64, 90]

Complexity:
- Worst case: O(n²)
- Best case: O(n) if array is already sorted
- Space: O(1)

Demo Mode: Code executed successfully in sandboxed environment.`;
  } else if (code.includes('calculate_probability')) {
    return `Total balls: 10
Red balls: 5
Probability of red ball: 5/10 = 0.50 = 50.0%

So the probability of drawing a red ball is 0.50 or 50.0%

Demo Mode: Code executed successfully in sandboxed environment.`;
  } else {
    return `Solution optimized based on learning

Demo Mode: Code executed successfully in sandboxed environment.
In production, this would run in a secure sandbox with resource limits.`;
  }
};

export default function RealisationStage({ problem, finalSolution, onNext }: Props) {
  const navigate = useNavigate();
  const [aiRealisation, setAiRealisation] = useState<{explanation: string, code: string} | null>(null);
  const [editableCode, setEditableCode] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionOutput, setExecutionOutput] = useState('');

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

  // Auto-generate AI realisation on component mount
  React.useEffect(() => {
    const generateRealisation = async () => {
      setIsLoading(true);
      try {
        // Try to call real API first
        const res = await api.post('/realisation', { problem, userSolution: finalSolution || '' });
        setAiRealisation(res.data.realisation);
        setEditableCode(res.data.realisation.code || '');
      } catch (error) {
        console.log('Backend not available, using mock realisation');
        // Use mock realisation
        const mockRealisation = getAIRealisation(problem, finalSolution || '');
        setAiRealisation(mockRealisation);
        setEditableCode(mockRealisation.code);
      } finally {
        setIsLoading(false);
      }
    };

    generateRealisation();
  }, [problem, finalSolution]);

  const handleRunCode = async () => {
    if (!editableCode.trim()) return;
    
    setIsExecuting(true);
    setExecutionOutput('');
    
    try {
      const output = await executePythonCode(editableCode);
      setExecutionOutput(output);
    } catch (error) {
      setExecutionOutput('Error: Code execution failed. Please check your syntax.');
    } finally {
      setIsExecuting(false);
    }
  };

  const handleContinueToRecall = () => {
    onNext('recall');
  };

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
                 <span>Realisation Stage</span>
                 <span>Step 4 of 5</span>
               </div>
               <div className="w-full bg-gray-200 rounded-full h-2">
                 <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500" style={{ width: '80%' }}></div>
               </div>
             </CardContent>
           </Card>

          {/* Main Content */}
          <div className="max-w-6xl mx-auto mb-16">
            <Card className="rounded-2xl shadow-lg">
                             <CardContent className="p-6 space-y-4">
                 <h2 className="text-xl font-bold">Solution Realisation</h2>
                 
                 {isLoading && (
                   <div className="text-center py-8">
                     <div className="text-lg text-gray-600 mb-4">AI is creating your optimized realisation...</div>
                     <div className="flex justify-center">
                       <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                     </div>
                   </div>
                 )}

                 {!isLoading && aiRealisation && (
                  <>
                    {/* AI Realisation Section */}
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                      <div className="text-sm text-green-600 mb-2 font-medium">AI Realisation Version:</div>
                      <div className="text-gray-800 text-base leading-relaxed">
                        AI has created an optimized realisation version. You can edit the code and run it safely.
                      </div>
                    </div>
                    
                    {/* Explanation */}
                    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
                      <div className="prose max-w-none">
                        <pre className="whitespace-pre-wrap text-gray-800 leading-relaxed">{aiRealisation.explanation}</pre>
                      </div>
                    </div>

                    {/* Editable Code Section */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold">Editable Code:</h3>
                        <Button 
                          onClick={handleRunCode}
                          disabled={isExecuting || !editableCode.trim()}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          {isExecuting ? 'Running...' : 'Run Code'}
                        </Button>
                      </div>
                      
                      <Textarea
                        value={editableCode}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setEditableCode(e.target.value)}
                        className="font-mono h-64 text-sm bg-gray-900 text-green-400 border-gray-700"
                        placeholder="Edit the AI-generated code here..."
                      />
                    </div>

                    {/* Execution Output */}
                    {executionOutput && (
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold">Execution Output:</h3>
                        <div className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto">
                          <pre className="text-sm font-mono whitespace-pre-wrap">{executionOutput}</pre>
                        </div>
                      </div>
                    )}
                  </>
                )}

                
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Fixed Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-t border-gray-200 p-4">
        <div className="max-w-7xl mx-auto flex justify-center">
          <button
            onClick={handleContinueToRecall}
            className="active:scale-95 transition-transform"
          >
            <NextButton className="w-[228px] h-[60px]" />
          </button>
        </div>
      </div>
    </div>
  );
}