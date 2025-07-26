import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, Star, Clock, Users, BookOpen, Award, Play } from 'lucide-react';
import algorithmPng from '../assets/StudyIcon/algorithm.png';
const CourseCard = ({ course, onEnroll }: { course: any; onEnroll: () => void }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header with gradient background */}
      <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        <div className="relative z-10">
          {/* Algorithm Icon */}
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-sm">
            <img src={algorithmPng} alt="Algorithm Icon" className="w-16 h-16 drop-shadow-lg rounded-2xl" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">{course.title}</h3>
          <p className="text-blue-100 text-sm leading-relaxed">{course.description}</p>
        </div>
        
        {/* Floating particles effect */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-white bg-opacity-5 rounded-full -translate-y-10 translate-x-10"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-white bg-opacity-5 rounded-full translate-y-8 -translate-x-8"></div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Stats */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Clock size={16} />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users size={16} />
              <span>{course.students}</span>
            </div>
            <div className="flex items-center space-x-1">
              <BookOpen size={16} />
              <span>{course.lessons} pelajaran</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium text-gray-700">{course.rating}</span>
          </div>
        </div>

        {/* Skills */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Yang akan Anda pelajari:</h4>
          <div className="space-y-2">
            {course.skills.map((skill: string, index: number) => (
              <div key={index} className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-sm text-gray-600">{skill}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Level indicator */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Level: {course.level}</span>
            <span className="text-xs text-gray-500">{course.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-700"
              style={{ width: `${course.progress}%` }}
            ></div>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={onEnroll}
          className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
            isHovered
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <Play size={18} />
          <span>Mulai Kursus</span>
          <ChevronRight size={18} className={`transition-transform ${isHovered ? 'translate-x-1' : ''}`} />
        </button>
      </div>
    </div>
  );
};

const courses = [
  {
    id: 1,
    title: "Algoritma & Struktur Data",
    description: "Pelajari fundamental algoritma dan struktur data yang essential untuk programming dan problem solving.",
    duration: "8 minggu",
    students: "12,543",
    lessons: 24,
    rating: 4.8,
    level: "Pemula hingga Menengah",
    progress: 0,
    skills: [
      "Pemahaman kompleksitas waktu dan ruang (Big O)",
      "Implementasi struktur data (Array, Linked List, Stack, Queue)",
      "Algoritma sorting dan searching",
      "Algoritma rekursif dan dynamic programming",
      "Graph algorithms dan tree traversal"
    ],
    icon: algorithmPng,
    isNew: true
  },
  {
    id: 2,
    title: "Mathematical Thinking",
    description: "Master problem solving essentials in programming",
    icon: algorithmPng,
    isNew: true,
    progress: 15
  },
  {
    id: 3,
    title: "Solving Equations",
    description: "Learn to solve complex programming problems",
    icon: algorithmPng,
    progress: 0
  },
  {
    id: 4,
    title: "Visual Programming",
    description: "Understand programming concepts visually",
    icon: algorithmPng,
    isNew: true,
    progress: 0
  },
  {
    id: 5,
    title: "Data Structures",
    description: "Master essential data structures",
    icon: algorithmPng,
    progress: 0
  },
  {
    id: 6,
    title: "Advanced Algorithms",
    description: "Take your problem solving to the next level",
    icon: algorithmPng,
    progress: 0
  }
];

const advancedCourses = [
  {
    id: 7,
    title: "Machine Learning",
    description: "Master AI and machine learning fundamentals",
    icon: algorithmPng,
    isNew: true,
    progress: 0
  },
  {
    id: 8,
    title: "Deep Learning",
    description: "Explore neural networks and deep learning",
    icon: algorithmPng,
    progress: 0
  },
  {
    id: 9,
    title: "Computer Vision",
    description: "Learn to process and analyze images",
    icon: algorithmPng,
    isNew: true,
    progress: 0
  },
  {
    id: 10,
    title: "Natural Language Processing",
    description: "Understand text processing and AI",
    icon: algorithmPng,
    progress: 0
  },
  {
    id: 11,
    title: "Robotics",
    description: "Control robots with programming",
    icon: algorithmPng,
    progress: 0
  },
  {
    id: 12,
    title: "Quantum Computing",
    description: "Explore the future of computing",
    icon: algorithmPng,
    isNew: true,
    progress: 0
  }
];

const CourseGridCard = ({ course }: { course: any }) => (
  <div className="flex flex-col items-center">
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 cursor-pointer relative w-32 h-32 flex items-center justify-center">
      {course.isNew && (
        <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          NEW
        </div>
      )}
      <img src={course.icon} alt={course.title} className="w-20 h-20 rounded-lg object-cover" />
    </div>
    <h3 className="font-semibold text-white mt-3 text-center text-sm">{course.title}</h3>
  </div>
);

const LearningPath = ({ title, subtitle, courses, pathRef }: { title: string; subtitle: string; courses: any[]; pathRef: React.RefObject<HTMLDivElement | null> }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }
      setLastScrollY(currentScrollY);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.3 }
    );

    if (pathRef.current) {
      observer.observe(pathRef.current);
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathRef, lastScrollY]);

  const getTransformClass = () => {
    if (!isVisible) {
      return scrollDirection === 'down' 
        ? 'translate-y-20 opacity-0' 
        : '-translate-y-20 opacity-0';
    }
    return 'translate-y-0 opacity-100';
  };

  return (
    <div 
      ref={pathRef}
      className={`transform transition-all duration-1000 ease-out ${getTransformClass()}`}
    >
      {/* Learning Path Header */}
      <div className="text-center mb-8 sm:mb-12">
        <div className="flex flex-col sm:flex-row items-center justify-center mb-4 gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-xl flex items-center justify-center">
            <BookOpen className="text-white w-5 h-5 sm:w-6 sm:h-6" size={24} />
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-gray-900">{title}</h2>
        </div>
        <p className="text-lg sm:text-xl text-gray-600 px-4">{subtitle}</p>
      </div>

      {/* Course Grid */}
      <div className="bg-gradient-to-br from-black via-gray-800 to-gray-700 rounded-3xl p-8 shadow-xl border border-gray-600">
        <div className="flex gap-6 overflow-x-auto pb-4 md:grid md:grid-cols-3 lg:grid-cols-3 md:overflow-x-visible md:pb-0 scroll-smooth snap-x snap-mandatory">
          {courses.map(course => (
            <div key={course.id} className="snap-center flex-shrink-0 w-full md:w-auto">
              <CourseGridCard course={course} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const LessonSelectionPage = () => {
  const path1Ref = useRef<HTMLDivElement>(null);
  const path2Ref = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Pilih Jalan Kebenaran</h1>
            </div>
            <button className="flex items-center justify-center sm:justify-start space-x-2 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 text-white px-4 py-2 rounded-lg shadow-lg border border-gray-600 hover:from-gray-800 hover:via-gray-700 hover:to-gray-600 transition-all duration-300 cursor-pointer text-sm sm:text-base">
              <Award size={18} className="text-gray-300 sm:w-5" />
              <span className="font-medium">Tingkatkan Level Pemikiran</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
        <LearningPath 
          title="Foundational Programming" 
          subtitle="Master problem solving essentials in programming"
          courses={courses}
          pathRef={path1Ref}
        />
        
        <LearningPath 
          title="Advanced AI & Machine Learning" 
          subtitle="Explore the future of artificial intelligence"
          courses={advancedCourses}
          pathRef={path2Ref}
        />
      </div>
    </div>
  );
};

export default LessonSelectionPage;