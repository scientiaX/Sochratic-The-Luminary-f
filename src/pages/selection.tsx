import React, { useState } from 'react';
import { ChevronRight, Star, Clock, Users, BookOpen, Award, Play } from 'lucide-react';

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
            <img 
              src="../assets/study/algorithm" 
              alt="Algorithm Icon" 
              className="w-8 h-8 drop-shadow-lg"
            />
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
            {course.skills.map((skill, index) => (
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
          onClick={() => onEnroll(course)}
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

const LessonSelectionPage = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);

  const course = {
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
    ]
  };

  const handleEnroll = (course) => {
    setSelectedCourse(course);
    // Simulate enrollment process
    setTimeout(() => {
      alert(`Selamat! Anda telah terdaftar dalam kursus "${course.title}"`);
      setSelectedCourse(null);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Pilih Kursus Anda</h1>
              <p className="text-gray-600 mt-2">Tingkatkan kemampuan programming Anda dengan kursus berkualitas tinggi</p>
            </div>
            <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg">
              <Award size={20} />
              <span className="font-medium">Premium Member</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <BookOpen className="text-blue-600" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">50+</p>
                <p className="text-gray-600">Kursus Tersedia</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="text-green-600" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">100K+</p>
                <p className="text-gray-600">Siswa Aktif</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Award className="text-purple-600" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">95%</p>
                <p className="text-gray-600">Tingkat Kepuasan</p>
              </div>
            </div>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <CourseCard course={course} onEnroll={handleEnroll} />
          
          {/* Placeholder cards for more courses */}
          <div className="bg-white bg-opacity-50 rounded-2xl border-2 border-dashed border-gray-300 p-8 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-gray-200 rounded-2xl flex items-center justify-center mb-4">
              <BookOpen className="text-gray-400" size={32} />
            </div>
            <h3 className="text-lg font-semibold text-gray-600 mb-2">Kursus Lainnya</h3>
            <p className="text-gray-500 text-sm">Segera hadir...</p>
          </div>
          
          <div className="bg-white bg-opacity-50 rounded-2xl border-2 border-dashed border-gray-300 p-8 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-gray-200 rounded-2xl flex items-center justify-center mb-4">
              <BookOpen className="text-gray-400" size={32} />
            </div>
            <h3 className="text-lg font-semibold text-gray-600 mb-2">Kursus Lainnya</h3>
            <p className="text-gray-500 text-sm">Segera hadir...</p>
          </div>
        </div>
      </div>
      
      {/* Loading overlay when enrolling */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full mx-4 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Mendaftarkan Anda...</h3>
            <p className="text-gray-600">Mohon tunggu sebentar</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LessonSelectionPage;