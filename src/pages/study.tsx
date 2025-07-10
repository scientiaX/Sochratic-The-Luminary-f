import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Brain, X, Edit3, Lightbulb, Target, Settings, RefreshCw, AlertCircle, Menu, ChevronRight } from 'lucide-react';

const SocraticChatApp = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      text: 'Selamat datang! Saya akan membantu Anda berpikir kritis. Tuliskan Solusi, Pendapat dan Pertanyaan Anda di sini',
      isImportant: false,
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  
  const [thoughtBoard, setThoughtBoard] = useState({
    'Asumsi Awal': [],
    'pertanyaan': [],
    'Revisi': [],
    'Solusi Akhir': []
  });
  
  const [inputText, setInputText] = useState('');
  const [problemText, setProblemText] = useState('Belum ada masalah yang didefinisikan');
  const [isEditingProblem, setIsEditingProblem] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setSidebarOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const socraticResponses = [
    'Menarik! Bisakah Anda jelaskan lebih detail tentang hal itu?',
    'Apa yang membuat Anda yakin dengan asumsi tersebut?',
    'Bagaimana jika kita lihat dari sudut pandang yang berbeda?',
    'Apa bukti yang mendukung kesimpulan Anda?',
    'Coba pikirkan: apakah ada kemungkinan lain?',
    'Mengapa menurut Anda itu adalah solusi terbaik?',
    'Apa yang akan terjadi jika asumsi Anda salah?',
    'Bagaimana Anda akan menguji kebenaran ide tersebut?',
    'Apakah ada pola atau hubungan yang Anda perhatikan?',
    'Apa yang paling penting untuk dipertimbangkan dalam situasi ini?'
  ];

  // Simulasi API untuk kategorisasi otomatis
  const categorizeUserInput = async (userMessage) => {
    setIsProcessing(true);
    
    // Simulasi delay API
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const text = userMessage.toLowerCase();
    
    // Simulasi logic AI untuk kategorisasi
    if (text.includes('masalah') || text.includes('problem') || text.includes('kendala')) {
      setProblemText(userMessage);
    } else if (text.includes('asumsi') || text.includes('menurut saya') || text.includes('saya pikir')) {
      addToThoughtBoard('Asumsi Awal', userMessage);
    } else if (text.includes('hipotesis') || text.includes('mungkin') || text.includes('kemungkinan')) {
      addToThoughtBoard('Hipotesis', userMessage);
    } else if (text.includes('revisi') || text.includes('ubah') || text.includes('perbaiki')) {
      addToThoughtBoard('Revisi', userMessage);
    } else if (text.includes('solusi') || text.includes('jawaban') || text.includes('kesimpulan')) {
      addToThoughtBoard('Solusi Akhir', userMessage);
    } else {
      // Default ke asumsi awal jika tidak bisa dikategorikan
      addToThoughtBoard('Asumsi Awal', userMessage);
    }
    
    setIsProcessing(false);
  };

  const addToThoughtBoard = (category, text) => {
    const newNote = {
      id: Date.now(),
      text: text,
      timestamp: new Date().toLocaleTimeString(),
      fromAI: true
    };
    
    setThoughtBoard(prev => ({
      ...prev,
      [category]: [...prev[category], newNote]
    }));
  };

  const sendMessage = async () => {
    if (!inputText.trim()) return;
    
    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: inputText,
      timestamp: new Date().toLocaleTimeString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Kategorisasi otomatis oleh AI
    await categorizeUserInput(inputText);
    
    // Simulate AI response with Socratic questioning
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: 'ai',
        text: socraticResponses[Math.floor(Math.random() * socraticResponses.length)],
        isImportant: Math.random() > 0.7,
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 2000);
    
    setInputText('');
  };

  const deleteNote = (category, noteId) => {
    setThoughtBoard(prev => ({
      ...prev,
      [category]: prev[category].filter(note => note.id !== noteId)
    }));
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Asumsi Awal': return <Lightbulb className="w-4 h-4" />;
      case 'Hipotesis': return <Brain className="w-4 h-4" />;
      case 'Revisi': return <RefreshCw className="w-4 h-4" />;
      case 'Solusi Akhir': return <Settings className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Asumsi Awal': return 'border-yellow-300 bg-yellow-50';
      case 'Hipotesis': return 'border-blue-300 bg-blue-50';
      case 'Revisi': return 'border-purple-300 bg-purple-50';
      case 'Solusi Akhir': return 'border-green-300 bg-green-50';
      default: return 'border-gray-300 bg-gray-50';
    }
  };

  const saveProblem = () => {
    setIsEditingProblem(false);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Chat Area */}
      <div className={`flex-1 bg-white flex flex-col transition-all duration-300 ${
        isMobile ? 'w-full' : sidebarOpen ? 'mr-80' : 'mr-0'
      } ${!isMobile ? 'mr-80' : ''}`}>
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 shadow-lg relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MessageCircle className="w-6 h-6" />
              <h1 className="text-xl font-bold">Socratic AI</h1>
            </div>
            {isMobile && (
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg hover:bg-white hover:bg-opacity-20 transition-colors"
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            )}
          </div>
          <p className="text-blue-100 text-sm mt-1">Berpikir kritis melalui pertanyaan yang tepat</p>
        </div>

        {/* Floating Problem Box - positioned below header */}
        <div className="relative">
          <div className={`absolute top-4 z-10 bg-white rounded-lg shadow-lg border-2 border-red-200 p-4 ${
            isMobile ? 'left-4 right-4' : 'left-1/2 transform -translate-x-1/2 max-w-md w-full mx-4'
          }`}>
            <div className="flex items-center space-x-2 mb-2">
              <Target className="w-5 h-5 text-red-600" />
              <h3 className="font-semibold text-red-700">Masalah</h3>
              <button
                onClick={() => setIsEditingProblem(!isEditingProblem)}
                className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            </div>
            
            {isEditingProblem ? (
              <div>
                <textarea
                  value={problemText}
                  onChange={(e) => setProblemText(e.target.value)}
                  className="w-full p-2 text-sm border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-red-500"
                  rows="3"
                  placeholder="Definisikan masalah Anda..."
                  autoFocus
                />
                <div className="flex justify-end space-x-2 mt-2">
                  <button
                    onClick={() => setIsEditingProblem(false)}
                    className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                  >
                    Batal
                  </button>
                  <button
                    onClick={saveProblem}
                    className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Simpan
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-700">{problemText}</p>
            )}
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ marginTop: '120px' }}>
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg shadow-sm transition-all duration-200 ${
                  message.type === 'user'
                    ? 'bg-blue-500 text-white'
                    : message.isImportant
                    ? 'bg-yellow-100 border-2 border-yellow-300 text-gray-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {message.isImportant && (
                  <div className="flex items-center mb-1">
                    <Lightbulb className="w-4 h-4 text-yellow-600 mr-1" />
                    <span className="text-xs font-semibold text-yellow-700">Pertanyaan Penting</span>
                  </div>
                )}
                <p className="text-sm">{message.text}</p>
                <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
              </div>
            </div>
          ))}
          
          {isProcessing && (
            <div className="flex justify-center">
              <div className="bg-gray-200 rounded-lg px-4 py-2">
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                  <span className="text-sm text-gray-600">AI sedang menganalisis...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Ketik pesan Anda..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={sendMessage}
              disabled={isProcessing}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
            >
              Kirim
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar - Thought Board */}
      <div className={`bg-gray-50 border-l border-gray-200 flex flex-col transition-all duration-300 ${
        isMobile 
          ? `fixed right-0 top-0 h-screen w-80 z-20 transform ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}`
          : 'w-80 fixed right-0 top-0 h-screen'
      }`}>
        {/* Sidebar Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Brain className="w-6 h-6" />
              <h2 className="text-xl font-bold">Papan Pemikiran</h2>
            </div>
            {isMobile && (
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-1 rounded hover:bg-white hover:bg-opacity-20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
          <p className="text-purple-100 text-sm mt-1">Dikategorikan otomatis oleh AI</p>
        </div>

        {/* Sidebar Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {Object.entries(thoughtBoard).map(([category, notes]) => (
            <div key={category} className={`rounded-lg border-2 p-4 ${getCategoryColor(category)}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  {getCategoryIcon(category)}
                  <h3 className="font-semibold text-gray-700">{category}</h3>
                  <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">
                    {notes.length}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                {notes.map((note) => (
                  <div
                    key={note.id}
                    className="p-3 rounded-lg shadow-sm border bg-white border-gray-200"
                  >
                    <div className="flex justify-between items-start">
                      <p className="text-sm text-gray-700 flex-1">{note.text}</p>
                      <button
                        onClick={() => deleteNote(category, note.id)}
                        className="p-1 text-gray-400 hover:text-red-600 transition-colors ml-2"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="flex items-center mt-2 text-xs text-gray-500">
                      <span>{note.timestamp}</span>
                      {note.fromAI && (
                        <span className="ml-2 bg-purple-200 text-purple-800 px-2 py-1 rounded-full">
                          AI Categorized
                        </span>
                      )}
                    </div>
                  </div>
                ))}
                
                {notes.length === 0 && (
                  <div className="text-center py-6 text-gray-500">
                    <p className="text-sm">Belum ada catatan</p>
                    <p className="text-xs mt-1">AI akan menambahkan secara otomatis</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile sidebar toggle button when closed */}
      {isMobile && !sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="fixed right-4 bottom-4 bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 transition-colors z-10"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default SocraticChatApp;