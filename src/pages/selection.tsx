import React, { useState } from 'react';

// Main App Component
export default function selectionPage() {
  // State to store the currently selected topic
  const [selectedTopic, setSelectedTopic] = useState(null);

  // List of learning topics
  const topics = [
    'Matematika',
    'Sains',
    'Sejarah',
    'Bahasa Inggris',
    'Pemrograman'
  ];

  // Function to handle topic selection
  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
  };

  return (
    // Main container with a light gray background
    <div className="bg-gray-100 min-h-screen flex items-center justify-center font-sans p-4">
      <div className="w-full max-w-3xl text-center">
        
        {/* Header Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
          Pilih Topik Pembelajaran
        </h1>
        <p className="text-lg text-gray-600 mb-10">
          Klik pada salah satu topik di bawah ini untuk memulai.
        </p>

        {/* Responsive grid container for topic cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {topics.map((topic) => (
            <div
              key={topic}
              onClick={() => handleTopicSelect(topic)}
              className={`
                p-6 rounded-lg cursor-pointer transition-all duration-300 ease-in-out
                transform hover:-translate-y-1 
                ${selectedTopic === topic 
                  ? 'bg-indigo-600 text-white shadow-lg ring-4 ring-indigo-300' 
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
                }
              `}
            >
              <h2 className="text-lg font-semibold">{topic}</h2>
            </div>
          ))}
        </div>

        {/* Display selected topic confirmation */}
        {selectedTopic && (
          <div className="mt-10 p-4 bg-white rounded-lg shadow-inner border border-gray-200">
            <p className="text-lg text-gray-700">
              Topik yang Anda pilih: <span className="font-bold text-indigo-600">{selectedTopic}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
