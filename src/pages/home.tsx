import React from 'react';
import { Link } from 'react-router-dom';
import MyComponent from '../components/pointer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="flex items-center justify-between px-4 sm:px-6 py-4 bg-white">
        <div className="text-lg sm:text-xl font-bold text-gray-900">Nova X</div>
        <nav className="hidden sm:flex items-center space-x-7">
          <a href="#" className="text-gray-600 hover:text-gray-900 font-bold">masukan</a>
          <a href="#" className="text-gray-600 hover:text-gray-900 font-bold">donasi</a>
          <a href="#" className="text-gray-600 hover:text-gray-900 font-bold">coming soon feature</a>
          <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800">
            pre-register
          </button>
        </nav>
        {/* Mobile menu button */}
        <button className="sm:hidden bg-black text-white px-3 py-2 rounded-lg text-sm">
          Menu
        </button>
      </header>
      
      {/* Lottie Animation Section */}
      <main className="px-4 sm:px-6 py-8 sm:py-16 relative">
        <div className="hidden sm:block absolute top-0 right-8 transform -translate-y-4 -rotate-90">
          <MyComponent />
        </div>
      </main>
      
      {/* Main Content */}
      <main className="px-4 sm:px-6 py-2">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="mb-12 sm:mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              10 menit sehari<br />
              meningkatkan problem<br />
              solving
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl">
              cukup 1% dari waktumu untuk latih soft skill tingkat dewa
            </p>
            <Link 
              to="/selection" 
              className="bg-black text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-medium hover:bg-gray-800 transition-colors w-full sm:w-auto inline-block text-center"
            >
              mulai 10 menit pertamamu
            </Link>
          </div>

          {/* Combined Section with Scroll Track Shadow Effect */}
          <div className="relative">
            {/* Right side shadow (like scroll track) */}
            {/* <div className="absolute top-0 right-0 w-2 h-full bg-gray-400 rounded-full transform translate-x-2 -z-10"></div> */}
            
            {/* Bottom shadow (like scroll track) */}
            {/* <div className="absolute bottom-0 left-0 right-0 h-2 bg-gray-400 rounded-full transform translate-y-2 -z-10"></div> */}
            
            {/* Main content without box */}
            <div className="p-0 relative z-10">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-yellow-500 mb-4">
                world economic forum
              </h2>
              <p className="text-base sm:text-lg text-gray-700 mb-8 sm:mb-12">
                menurut WEF problem solving adalah skill paling di butuhkan di era<br className="hidden sm:block" />
                <span className="sm:hidden"> </span>automatisasi dan era ai orchestrator(nanti)
              </p>
              
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-yellow-500 mb-4">
                top skills on linkedIn
              </h2>
              <p className="text-base sm:text-lg text-gray-700">
                problem solving adalah skill yang paling di cari di linkedIn
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}