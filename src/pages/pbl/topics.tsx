import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, BookOpen, Clock, Star, Play, Brain, Target, Zap, CheckCircle } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import algorithmPng from '../../assets/StudyIcon/algorithm.png';
import { FallingStars } from '../../components/ui/FallingStars.tsx';

// Course topics data
const courseTopics = {
  1: { // Algorithms & Data Structures
    title: "Algorithms & Data Structures",
    description: "Learn fundamental algorithms and data structures essential for programming and problem solving.",
    icon: algorithmPng,
    topics: [
             {
         id: 1,
         title: "Introduction to Algorithms",
         description: "Understanding basic algorithm concepts and complexity",
         duration: "45 min",
         difficulty: "Beginner",
         isCompleted: false,
         lessons: 3,
         icon: Brain
       },
       {
         id: 2,
         title: "Arrays and Linked Lists",
         description: "Implementation and usage of basic data structures",
         duration: "60 min",
         difficulty: "Beginner",
         isCompleted: false,
         lessons: 4,
         icon: Target
       },
       {
         id: 3,
         title: "Stacks and Queues",
         description: "Linear data structures with LIFO and FIFO operations",
         duration: "50 min",
         difficulty: "Intermediate",
         isCompleted: false,
         lessons: 3,
         icon: Zap
       },
       {
         id: 4,
         title: "Sorting Algorithms",
         description: "Sorting algorithms: Bubble, Selection, Insertion",
         duration: "75 min",
         difficulty: "Intermediate",
         isCompleted: false,
         lessons: 5,
         icon: Brain
       },
       {
         id: 5,
         title: "Searching Algorithms",
         description: "Search algorithms: Linear and Binary Search",
         duration: "55 min",
         difficulty: "Intermediate",
         isCompleted: false,
         lessons: 4,
         icon: Target
       },
       {
         id: 6,
         title: "Trees and Graphs",
         description: "Hierarchical data structures and graphs",
         duration: "90 min",
         difficulty: "Advanced",
         isCompleted: false,
         lessons: 6,
         icon: Zap
       }
    ]
  },
  2: { // Mathematical Thinking
    title: "Mathematical Thinking",
    description: "Master problem solving essentials in programming",
    icon: algorithmPng,
    topics: [
             {
         id: 1,
         title: "Logical Thinking",
         description: "Developing logical thinking patterns for problem solving",
         duration: "40 min",
         difficulty: "Beginner",
         isCompleted: false,
         lessons: 3,
         icon: Brain
       },
       {
         id: 2,
         title: "Pattern Recognition",
         description: "Identifying patterns in programming problems",
         duration: "55 min",
         difficulty: "Intermediate",
         isCompleted: false,
         lessons: 4,
         icon: Target
       }
    ]
  },
  3: { // Solving Equations
    title: "Solving Equations",
    description: "Learn to solve complex programming problems",
    icon: algorithmPng,
    topics: [
             {
         id: 1,
         title: "Linear Equations",
         description: "Solving linear equations in programming",
         duration: "50 min",
         difficulty: "Beginner",
         isCompleted: false,
         lessons: 4,
         icon: Brain
       },
       {
         id: 2,
         title: "Quadratic Equations",
         description: "Implementing quadratic equations in algorithms",
         duration: "65 min",
         difficulty: "Intermediate",
         isCompleted: false,
         lessons: 5,
         icon: Target
       }
    ]
  },
  4: { // Visual Programming
    title: "Visual Programming",
    description: "Understand programming concepts visually",
    icon: algorithmPng,
    topics: [
             {
         id: 1,
         title: "Flowcharts",
         description: "Creating and understanding flowcharts",
         duration: "45 min",
         difficulty: "Beginner",
         isCompleted: false,
         lessons: 3,
         icon: Brain
       },
       {
         id: 2,
         title: "UML Diagrams",
         description: "UML diagrams for system modeling",
         duration: "70 min",
         difficulty: "Intermediate",
         isCompleted: false,
         lessons: 5,
         icon: Target
       }
    ]
  },
  5: { // Data Structures
    title: "Data Structures",
    description: "Master essential data structures",
    icon: algorithmPng,
    topics: [
             {
         id: 1,
         title: "Basic Data Structures",
         description: "Array, List, and Stack",
         duration: "60 min",
         difficulty: "Beginner",
         isCompleted: false,
         lessons: 4,
         icon: Brain
       },
       {
         id: 2,
         title: "Advanced Data Structures",
         description: "Tree, Graph, and Hash Tables",
         duration: "80 min",
         difficulty: "Advanced",
         isCompleted: false,
         lessons: 6,
         icon: Target
       }
    ]
  },
  6: { // Advanced Algorithms
    title: "Advanced Algorithms",
    description: "Take your problem solving to the next level",
    icon: algorithmPng,
    topics: [
             {
         id: 1,
         title: "Dynamic Programming",
         description: "Understanding and implementing DP",
         duration: "90 min",
         difficulty: "Advanced",
         isCompleted: false,
         lessons: 6,
         icon: Brain
       },
       {
         id: 2,
         title: "Greedy Algorithms",
         description: "Greedy algorithms for optimization",
         duration: "75 min",
         difficulty: "Advanced",
         isCompleted: false,
         lessons: 5,
         icon: Target
       }
     ]
   },
  7: { // Machine Learning
    title: "Machine Learning",
    description: "Master AI and machine learning fundamentals",
    icon: algorithmPng,
    topics: [
             {
         id: 1,
         title: "Introduction to ML",
         description: "Basic machine learning concepts",
         duration: "60 min",
         difficulty: "Intermediate",
         isCompleted: false,
         lessons: 4,
         icon: Brain
       },
       {
         id: 2,
         title: "Supervised Learning",
         description: "Classification and regression",
         duration: "90 min",
         difficulty: "Advanced",
         isCompleted: false,
         lessons: 6,
         icon: Target
       }
    ]
  },
  8: { // Deep Learning
    title: "Deep Learning",
    description: "Explore neural networks and deep learning",
    icon: algorithmPng,
    topics: [
             {
         id: 1,
         title: "Neural Networks",
         description: "Neural network architecture and implementation",
         duration: "80 min",
         difficulty: "Advanced",
         isCompleted: false,
         lessons: 5,
         icon: Brain
       },
       {
         id: 2,
         title: "Convolutional Networks",
         description: "CNN for computer vision",
         duration: "100 min",
         difficulty: "Advanced",
         isCompleted: false,
         lessons: 7,
         icon: Target
       }
    ]
  },
  9: { // Computer Vision
    title: "Computer Vision",
    description: "Learn to process and analyze images",
    icon: algorithmPng,
    topics: [
             {
         id: 1,
         title: "Image Processing",
         description: "Basics of image processing",
         duration: "70 min",
         difficulty: "Intermediate",
         isCompleted: false,
         lessons: 5,
         icon: Brain
       },
       {
         id: 2,
         title: "Object Detection",
         description: "Object detection in images",
         duration: "85 min",
         difficulty: "Advanced",
         isCompleted: false,
         lessons: 6,
         icon: Target
       }
    ]
  },
  10: { // Natural Language Processing
    title: "Natural Language Processing",
    description: "Understand text processing and AI",
    icon: algorithmPng,
    topics: [
             {
         id: 1,
         title: "Text Processing",
         description: "Text processing and analysis",
         duration: "65 min",
         difficulty: "Intermediate",
         isCompleted: false,
         lessons: 4,
         icon: Brain
       },
       {
         id: 2,
         title: "Language Models",
         description: "Modern language models",
         duration: "95 min",
         difficulty: "Advanced",
         isCompleted: false,
         lessons: 7,
         icon: Target
       }
    ]
  },
  11: { // Robotics
    title: "Robotics",
    description: "Control robots with programming",
    icon: algorithmPng,
    topics: [
             {
         id: 1,
         title: "Robot Programming",
         description: "Basics of robot programming",
         duration: "75 min",
         difficulty: "Intermediate",
         isCompleted: false,
         lessons: 5,
         icon: Brain
       },
       {
         id: 2,
         title: "Path Planning",
         description: "Robot path planning",
         duration: "90 min",
         difficulty: "Advanced",
         isCompleted: false,
         lessons: 6,
         icon: Target
       }
    ]
  },
  12: { // Quantum Computing
    title: "Quantum Computing",
    description: "Explore the future of computing",
    icon: algorithmPng,
    topics: [
             {
         id: 1,
         title: "Quantum Basics",
         description: "Basic quantum computing concepts",
         duration: "80 min",
         difficulty: "Advanced",
         isCompleted: false,
         lessons: 6,
         icon: Brain
       },
       {
         id: 2,
         title: "Quantum Algorithms",
         description: "Basic quantum algorithms",
         duration: "110 min",
         difficulty: "Advanced",
         isCompleted: false,
         lessons: 8,
         icon: Target
       }
    ]
  }
  // Add data for other courses as needed
};

const TopicCard = ({ topic, onStart, index }: { topic: any; onStart: () => void; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-2 overflow-hidden group cursor-pointer ${
        topic.isCompleted ? 'border-green-200 bg-green-50' : 'border-gray-100 hover:border-blue-200'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onStart}
    >
      {/* Header */}
      <div className={`p-6 relative overflow-hidden ${
        topic.isCompleted 
          ? 'bg-gradient-to-br from-green-500 to-emerald-600' 
          : 'bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700'
      }`}>
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center backdrop-blur-sm ${
              topic.isCompleted ? 'bg-white bg-opacity-20' : 'bg-white bg-opacity-20'
            }`}>
              <span className="text-2xl font-bold text-white">{index + 1}</span>
            </div>
                         <div>
               <h3 className="text-xl font-bold text-white">{topic.title}</h3>
             </div>
          </div>
          {topic.isCompleted && (
            <div className="bg-white bg-opacity-20 rounded-full p-2">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
          )}
        </div>
        
        {/* Floating particles effect */}
        <div className="absolute top-0 right-0 w-16 h-16 bg-white bg-opacity-5 rounded-full -translate-y-8 translate-x-8"></div>
        <div className="absolute bottom-0 left-0 w-12 h-12 bg-white bg-opacity-5 rounded-full translate-y-6 -translate-x-6"></div>
      </div>

      {/* Content */}
      <div className="p-6">
        

        

        {/* CTA Button */}
        <button
          className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
            topic.isCompleted
              ? 'bg-green-100 text-green-700 hover:bg-green-200'
              : isHovered
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {topic.isCompleted ? (
            <>
              <CheckCircle size={18} />
              <span>Completed</span>
            </>
          ) : (
            <>
              <Play size={18} />
              <span>Start Learning</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

const TopicsPage = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const topicsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (courseId && courseTopics[courseId as unknown as keyof typeof courseTopics]) {
      setSelectedCourse(courseTopics[courseId as unknown as keyof typeof courseTopics]);
    }
  }, [courseId]);

  const handleStartTopic = (topicId: number) => {
    navigate(`/study/${courseId}/${topicId}`);
  };

  const handleBackToSelection = () => {
    navigate('/selection');
  };

  if (!selectedCourse) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Course not found</h1>
          <button 
            onClick={handleBackToSelection}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
          >
            Back to Course Selection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Falling Stars Background */}
      <FallingStars starCount={15} starColor="#3B82F6" />
      
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
                             <button 
                 onClick={handleBackToSelection}
                 className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
               >
                 <ChevronLeft size={20} />
                 <span className="hidden sm:inline">Back</span>
               </button>
              
                             <div>
                 <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{selectedCourse.title}</h1>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative z-10">
                 {/* Course Overview */}
         <div className="mb-8">
           <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
             <h2 className="text-xl font-bold text-gray-900 mb-4">Course Overview</h2>
                                                       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                 <div className="flex items-center space-x-3">
                   <BookOpen className="w-5 h-5 text-blue-600" />
                   <div>
                     <p className="text-sm text-gray-600">Total Topics</p>
                     <p className="font-semibold text-gray-900">{selectedCourse.topics.length}</p>
                   </div>
                 </div>
                 <div className="flex items-center space-x-3">
                   <Clock className="w-5 h-5 text-green-600" />
                   <div>
                     <p className="text-sm text-gray-600">Total Duration</p>
                     <p className="font-semibold text-gray-900">
                       {selectedCourse.topics.reduce((acc: number, topic: any) => {
                         const minutes = parseInt(topic.duration.split(' ')[0]);
                         return acc + minutes;
                       }, 0)} min
                     </p>
                   </div>
                 </div>
                 <div className="flex items-center space-x-3">
                   <Star className="w-5 h-5 text-yellow-500" />
                   <div>
                     <p className="text-sm text-gray-600">Level</p>
                     <p className="font-semibold text-gray-900">Beginner - Advanced</p>
                   </div>
                 </div>
                 <div className="flex items-center space-x-3">
                   <Target className="w-5 h-5 text-purple-600" />
                   <div>
                     <p className="text-sm text-gray-600">Difficulty</p>
                     <p className="font-semibold text-gray-900">
                       {(() => {
                         const difficulties = selectedCourse.topics.map((t: any) => t.difficulty);
                         const uniqueDifficulties = [...new Set(difficulties)];
                         return uniqueDifficulties.join(', ');
                       })()}
                     </p>
                   </div>
                 </div>
                 <div className="flex items-center space-x-3">
                   <CheckCircle className="w-5 h-5 text-emerald-600" />
                   <div>
                     <p className="text-sm text-gray-600">Course Progress</p>
                     <p className="font-semibold text-gray-900">
                       {(() => {
                         const completedTopics = selectedCourse.topics.filter((t: any) => t.isCompleted).length;
                         const totalTopics = selectedCourse.topics.length;
                         const progressPercentage = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;
                         return `${progressPercentage}%`;
                       })()}
                     </p>
                   </div>
                 </div>
               </div>
               
               {/* Course Progress Bar */}
               <div className="mt-6">
                 <div className="flex items-center justify-between mb-2">
                   <span className="text-sm font-medium text-gray-700">Overall Progress</span>
                   <span className="text-xs text-gray-500">
                     {(() => {
                       const completedTopics = selectedCourse.topics.filter((t: any) => t.isCompleted).length;
                       const totalTopics = selectedCourse.topics.length;
                       return `${completedTopics}/${totalTopics} topics completed`;
                     })()}
                   </span>
                 </div>
                 <div className="w-full bg-gray-200 rounded-full h-3">
                   <div 
                     className="bg-gradient-to-r from-emerald-500 to-green-500 h-3 rounded-full transition-all duration-700"
                     style={{ 
                       width: (() => {
                         const completedTopics = selectedCourse.topics.filter((t: any) => t.isCompleted).length;
                         const totalTopics = selectedCourse.topics.length;
                         return totalTopics > 0 ? `${(completedTopics / totalTopics) * 100}%` : '0%';
                       })()
                     }}
                   ></div>
                 </div>
               </div>
           </div>
         </div>

                 {/* Topics Grid */}
         <div ref={topicsRef}>
           <h2 className="text-2xl font-bold text-gray-900 mb-6">Learning Topics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {selectedCourse.topics.map((topic: any, index: number) => (
              <TopicCard 
                key={topic.id} 
                topic={topic} 
                onStart={() => handleStartTopic(topic.id)}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicsPage; 