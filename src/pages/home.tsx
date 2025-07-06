import React from 'react';
import MyComponent from '../components/pointer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-white">
        <div className="text-xl font-bold text-gray-900">Nova X</div>
        <nav className="flex items-center space-x-8">
          <a href="#" className="text-gray-600 hover:text-gray-900">masukan</a>
          <a href="#" className="text-gray-600 hover:text-gray-900">donasi</a>
          <a href="#" className="text-gray-600 hover:text-gray-900">coming soon feature</a>
          <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800">
            pre-register
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="px-6 py-16">
          <MyComponent />
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="mb-16">
            <h1 className="text-7xl font-bold text-gray-900 mb-6 leading-tight">
              10 menit sehari<br />
              meningkatkan problem<br />
              solving
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl">
              cukup 1% dari waktumu untuk latih soft skill tingkat dewa
            </p>
            <button className="bg-black text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-800 transition-colors">
              mulai 10 menit pertamamu
            </button>
          </div>

          {/* Combined Section with Scroll Track Shadow Effect */}
          <div className="relative">
            {/* Right side shadow (like scroll track) */}
            {/* <div className="absolute top-0 right-0 w-2 h-full bg-gray-400 rounded-full transform translate-x-2 -z-10"></div> */}
            
            {/* Bottom shadow (like scroll track) */}
            {/* <div className="absolute bottom-0 left-0 right-0 h-2 bg-gray-400 rounded-full transform translate-y-2 -z-10"></div> */}
            
            {/* Main content without box */}
            <div className="p-0 relative z-10">
              <h2 className="text-5xl font-bold text-yellow-500 mb-4">
                world economic forum
              </h2>
              <p className="text-gray-700 text-lg mb-12">
                menurut WEF problem solving adalah skill paling di butuhkan di era<br />
                automatisasi dan era ai orchestrator(nanti)
              </p>
              
              <h2 className="text-5xl font-bold text-yellow-500 mb-4">
                top skills on linkedin
              </h2>
              <p className="text-gray-700 text-lg">
                problem solving adalah skill yang paling di cari di linkedin
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}