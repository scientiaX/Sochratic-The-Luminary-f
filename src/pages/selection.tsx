import React, { useState } from 'react';
import { Search, Clock, BarChart, Star, Lock, CheckCircle, Menu, X, Filter } from 'lucide-react';

const LessonSelectionPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);

  // Data dummy untuk courses
  const courses = [
    {
      id: 1,
      title: "Algoritma Pemrograman",
      category: "computer-science",
      description: "Pelajari dasar-dasar algoritma dan struktur data",
      difficulty: "Pemula",
      duration: "4 minggu",
      lessons: 12,
      progress: 75,
      isLocked: false,
      rating: 4.8,
      students: 15420,
      image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      title: "Kalkulus Dasar",
      category: "mathematics",
      description: "Konsep fundamental kalkulus diferensial dan integral",
      difficulty: "Menengah",
      duration: "6 minggu",
      lessons: 18,
      progress: 30,
      isLocked: false,
      rating: 4.7,
      students: 23150,
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      title: "Fisika Kuantum",
      category: "science",
      description: "Eksplorasi dunia subatomik dan mekanika kuantum",
      difficulty: "Lanjutan",
      duration: "8 minggu",
      lessons: 24,
      progress: 0,
      isLocked: true,
      rating: 4.9,
      students: 8930,
      image: "https://images.unsplash.com/photo-1635070041409-e63e783ce3c1?w=400&h=300&fit=crop"
    },
    {
      id: 4,
      title: "Machine Learning",
      category: "computer-science",
      description: "Pengenalan konsep dan implementasi machine learning",
      difficulty: "Menengah",
      duration: "10 minggu",
      lessons: 30,
      progress: 50,
      isLocked: false,
      rating: 4.8,
      students: 31240,
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop"
    },
    {
      id: 5,
      title: "Statistika & Probabilitas",
      category: "mathematics",
      description: "Analisis data dan teori probabilitas",
      difficulty: "Pemula",
      duration: "5 minggu",
      lessons: 15,
      progress: 100,
      isLocked: false,
      rating: 4.6,
      students: 19870,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop"
    },
    {
      id: 6,
      title: "Kimia Organik",
      category: "science",
      description: "Struktur, sifat, dan reaksi senyawa organik",
      difficulty: "Menengah",
      duration: "7 minggu",
      lessons: 21,
      progress: 0,
      isLocked: true,
      rating: 4.5,
      students: 12560,
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=300&fit=crop"
    }
  ];

  const categories = [
    { id: 'all', name: 'Semua Kursus', icon: '📚' },
    { id: 'mathematics', name: 'Matematika', icon: '🔢' },
    { id: 'science', name: 'Sains', icon: '🔬' },
    { id: 'computer-science', name: 'Ilmu Komputer', icon: '💻' }
  ];

  // Filter courses berdasarkan kategori dan search
  const filteredCourses = courses.filter(course => {
    const matchCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Pemula': return 'bg-green-100 text-green-800';
      case 'Menengah': return 'bg-yellow-100 text-yellow-800';
      case 'Lanjutan': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setIsCategoryMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">LearnHub</h1>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-700 hover:text-gray-900">Dashboard</a>
              <a href="#" className="text-gray-700 hover:text-gray-900">Progress</a>
              <a href="#" className="text-gray-700 hover:text-gray-900">Profil</a>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-2 space-y-1">
              <a href="#" className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100">Dashboard</a>
              <a href="#" className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100">Progress</a>
              <a href="#" className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100">Profil</a>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4">Pilih Pelajaran Anda</h2>
          <p className="text-base sm:text-lg md:text-xl mb-4 sm:mb-6 md:mb-8">Jelajahi berbagai kursus interaktif untuk meningkatkan kemampuan Anda</p>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Cari kursus..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 sm:py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            />
          </div>
        </div>
      </div>

      {/* Mobile Category Filter Button */}
      <div className="lg:hidden sticky top-16 z-10 bg-white border-b border-gray-200 px-4 py-3">
        <button
          onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
          className="flex items-center justify-between w-full px-4 py-2 bg-gray-100 rounded-lg text-gray-700"
        >
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5" />
            <span>
              {selectedCategory === 'all' 
                ? 'Semua Kategori' 
                : categories.find(c => c.id === selectedCategory)?.name}
            </span>
          </div>
          <span className="text-gray-400">{isCategoryMenuOpen ? '▲' : '▼'}</span>
        </button>

        {/* Mobile Category Dropdown */}
        {isCategoryMenuOpen && (
          <div className="absolute left-0 right-0 top-full bg-white shadow-lg border-t border-gray-200 z-20">
            <div className="p-4 space-y-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => handleCategorySelect(category.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <span className="text-xl sm:text-2xl">{category.icon}</span>
                  <span className="text-sm sm:text-base">{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Desktop Sidebar Categories */}
          <aside className="hidden lg:block lg:w-64">
            <h3 className="text-lg font-semibold mb-4">Kategori</h3>
            <div className="space-y-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <span className="text-2xl">{category.icon}</span>
                  <span>{category.name}</span>
                </button>
              ))}
            </div>
          </aside>

          {/* Course Grid */}
          <main className="flex-1">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold">
                {selectedCategory === 'all' 
                  ? 'Semua Kursus' 
                  : categories.find(c => c.id === selectedCategory)?.name}
              </h3>
              <p className="text-sm sm:text-base text-gray-600">{filteredCourses.length} kursus</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredCourses.map(course => (
                <div
                  key={course.id}
                  className={`bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden ${
                    course.isLocked ? 'opacity-75' : ''
                  }`}
                >
                  {/* Course Image */}
                  <div className="relative h-40 sm:h-48 overflow-hidden">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                    {course.isLocked && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <Lock className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                      </div>
                    )}
                    {course.progress === 100 && (
                      <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full flex items-center space-x-1">
                        <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="text-xs sm:text-sm">Selesai</span>
                      </div>
                    )}
                  </div>

                  {/* Course Content */}
                  <div className="p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(course.difficulty)}`}>
                        {course.difficulty}
                      </span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" />
                        <span className="text-xs sm:text-sm text-gray-600">{course.rating}</span>
                      </div>
                    </div>

                    <h4 className="text-base sm:text-lg md:text-xl font-semibold mb-2 line-clamp-2">{course.title}</h4>
                    <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">{course.description}</p>

                    {/* Course Stats */}
                    <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <BarChart className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>{course.lessons} pelajaran</span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    {!course.isLocked && course.progress > 0 && (
                      <div className="mb-3 sm:mb-4">
                        <div className="flex items-center justify-between text-xs sm:text-sm mb-1">
                          <span className="text-gray-600">Progress</span>
                          <span className="font-medium">{course.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
                          <div
                            className="bg-blue-600 h-1.5 sm:h-2 rounded-full transition-all"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Action Button */}
                    <button
                      className={`w-full py-2 px-3 sm:px-4 rounded-lg font-medium transition-colors text-sm sm:text-base ${
                        course.isLocked
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : course.progress > 0
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-purple-600 text-white hover:bg-purple-700'
                      }`}
                      disabled={course.isLocked}
                    >
                      {course.isLocked 
                        ? 'Terkunci' 
                        : course.progress > 0 
                        ? 'Lanjutkan' 
                        : 'Mulai Belajar'}
                    </button>

                    {/* Students Count */}
                    <p className="text-center text-xs text-gray-500 mt-2">
                      {course.students.toLocaleString()} siswa terdaftar
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredCourses.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada kursus ditemukan</h3>
                <p className="text-gray-600">Coba ubah kata kunci pencarian atau kategori</p>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Bottom Navigation (Optional) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex justify-around">
          <button className="flex flex-col items-center py-2 px-3 text-blue-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span className="text-xs mt-1">Kursus</span>
          </button>
          <button className="flex flex-col items-center py-2 px-3 text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <span className="text-xs mt-1">Progress</span>
          </button>
          <button className="flex flex-col items-center py-2 px-3 text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-xs mt-1">Profil</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LessonSelectionPage;
