// src/components/study/ConversationStage.tsx
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Home } from "lucide-react";
import NextButton from "@/components/element/NextButton";
import api from '@/lib/api';

interface Props {
  topicId: string;
  onNext: (stage: 'explanation', text: string) => void;
}

// Mock data untuk demo
const mockResponses = {
  '1': {
    title: 'Algoritma & Struktur Data',
    problem: 'Implementasikan algoritma bubble sort untuk mengurutkan array [64, 34, 25, 12, 22, 11, 90]. Jelaskan kompleksitas waktu dan ruang dari algoritma ini.',
    questions: [
      'Apa itu algoritma dan mengapa penting dalam programming?',
      'Jelaskan perbedaan antara array dan linked list!',
      'Bagaimana cara kerja bubble sort algorithm?'
    ]
  },
  '2': {
    title: 'Mathematical Thinking',
    problem: 'Selesaikan masalah matematika berikut: Jika ada 5 bola merah, 3 bola biru, dan 2 bola hijau dalam sebuah kotak, berapa peluang mengambil bola merah dalam satu kali pengambilan?',
    questions: [
      'Apa itu mathematical thinking dalam konteks programming?',
      'Bagaimana pola matematis membantu dalam problem solving?',
      'Jelaskan konsep rekursi dengan contoh sederhana!'
    ]
  }
};

export default function ConversationStage({ topicId, onNext }: Props) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [currentSession, setCurrentSession] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [typedProblem, setTypedProblem] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [explanationText, setExplanationText] = useState("");

  const mockData = mockResponses[topicId as keyof typeof mockResponses] || {
    title: `Topic ${topicId}`,
    problem: 'Implementasikan solusi untuk masalah yang diberikan. Jelaskan pendekatan Anda dan analisis kompleksitasnya.',
    questions: [
      'Apa yang telah Anda pelajari dari topik ini?',
      'Bagaimana Anda akan menerapkan pengetahuan ini?',
      'Apa tantangan terbesar yang Anda hadapi?'
    ]
  };

  const conversationSessions = mockData.questions.map(q => ({ aiResponse: q }));

  // Auto-open dropdown and start typing animation on first load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDropdownOpen(true);
      setIsTyping(true);
      typeProblem(mockData.problem);
    }, 500); // Delay 500ms after component mounts

    return () => clearTimeout(timer);
  }, [mockData.problem]);

  // Typing animation function
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
    }, 30); // Speed of typing (30ms per character)
  };

  const handleDropdownToggle = () => {
    if (isDropdownOpen) {
      setIsDropdownOpen(false);
    } else {
      setIsDropdownOpen(true);
      if (!typedProblem) {
        setIsTyping(true);
        typeProblem(mockData.problem);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleNext = async () => {
    if (!inputValue.trim()) return;
    
    setIsLoading(true);
    try {
      // Try to call real API first
      const res = await api.post('/chat', { topicId, message: inputValue });
      const first = res.data.result[0];

      if (first.isExplanation) {
        startTransition(first.text);
      } else {
        // Continue to next question
        setCurrentSession((prev) => (prev + 1) % conversationSessions.length);
        setInputValue("");
      }
    } catch (error) {
      console.log('Backend not available, using mock flow');
      
      // Simulate moving to explanation stage after all questions
      if (currentSession >= conversationSessions.length - 1) {
        const mockExplanation = `# Penjelasan Materi

## Algoritma Bubble Sort

Bubble Sort adalah algoritma pengurutan sederhana yang berulang kali melintasi daftar, membandingkan elemen yang berdekatan dan menukarnya jika mereka berada dalam urutan yang salah.

### Implementasi dalam Python:

\`\`\`python
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
    return arr

# Contoh penggunaan
numbers = [64, 34, 25, 12, 22, 11, 90]
sorted_numbers = bubble_sort(numbers)
print(f"Array terurut: {sorted_numbers}")
\`\`\`

### Kompleksitas:
- **Waktu**: O(n²) - untuk kasus terburuk dan rata-rata
- **Ruang**: O(1) - hanya menggunakan ruang tambahan konstan

### Cara Kerja:
1. Bandingkan elemen pertama dengan elemen kedua
2. Jika elemen pertama lebih besar, tukar posisinya
3. Lanjutkan ke elemen berikutnya
4. Ulangi proses sampai tidak ada lagi pertukaran yang diperlukan

Ini adalah contoh penjelasan materi dalam mode demo. Backend belum tersedia, jadi ini adalah mock data untuk demonstrasi fitur aplikasi.`;
        
        startTransition(mockExplanation);
      } else {
        // Continue to next question
        setCurrentSession((prev) => (prev + 1) % conversationSessions.length);
        setInputValue("");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const startTransition = (text: string) => {
    setIsTransitioning(true);
    setExplanationText(text);
    
    // Wait for transition animation to complete
    setTimeout(() => {
      onNext('explanation', text);
    }, 1000); // Match the transition duration
  };

  // Navigation items data
  const navItems = [
    {
      icon: <Home className="w-5 h-5" />,
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

  // Function to render explanation content with code blocks
  const renderExplanationContent = (text: string) => {
    const parts = text.split(/```([\s\S]*?)```/);
    
    return parts.map((part, i) => {
      if (i % 2 === 0) {
        // Regular text
        return (
          <div key={i} className="mb-4 text-gray-800 leading-relaxed">
            {part.split('\n').map((line, j) => {
              if (line.startsWith('#')) {
                // Headers
                const headerMatch = line.match(/^(#+)\s*(.+)$/);
                if (headerMatch) {
                  const level = headerMatch[1].length;
                  const content = headerMatch[2];
                  
                  if (level === 1) {
                    return <h2 key={j} className="text-xl font-bold text-gray-900 mb-2">{content}</h2>;
                  } else if (level === 2) {
                    return <h3 key={j} className="text-lg font-bold text-gray-900 mb-2">{content}</h3>;
                  } else if (level === 3) {
                    return <h4 key={j} className="text-base font-bold text-gray-900 mb-2">{content}</h4>;
                  } else {
                    return <h5 key={j} className="text-sm font-bold text-gray-900 mb-2">{content}</h5>;
                  }
                }
                return <p key={j} className="mb-2">{line}</p>;
              } else if (line.trim() === '') {
                return <br key={j} />;
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

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex-1 p-4">
        <div className="max-w-7xl mx-auto">
          {/* Top Navigation Bar */}
          <Card className="mt-0 mb-4 shadow-lg">
            <CardContent className="p-4 flex justify-between items-center">
              <div className="font-bold text-gray-700 text-lg">
                {mockData.title}
              </div>

              <div className="flex space-x-2">
                {navItems.map((item, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="flex items-center space-x-2 h-10 px-3 rounded-lg hover:bg-gray-100"
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

          {/* Main Content Layout */}
          <div className="flex justify-center">
            <div className="w-full max-w-4xl">
              {/* Dropdown Container */}
              <div className="flex justify-center relative mb-3">
                <div className="relative">
                  {/* Dropdown Button */}
                  <Button
                    className={`w-32 sm:w-80 h-8 sm:h-11 bg-gray-200 hover:bg-gray-300 border border-gray-300 rounded-xl cursor-pointer transition-all duration-300 ease-out ${
                      isDropdownOpen 
                        ? 'opacity-30 scale-95' 
                        : 'opacity-100 scale-100 hover:opacity-80'
                    }`}
                    onClick={handleDropdownToggle}
                  >
                    <span className="text-gray-600 text-sm font-medium">
                      {isDropdownOpen ? 'Hide Problem' : 'Show Problem'}
                    </span>
                  </Button>
                  
                  {/* Dropdown Content */}
                  <div 
                    className={`absolute top-0 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 w-screen max-w-4xl px-4 sm:px-0 sm:w-full ${
                      isDropdownOpen 
                        ? 'opacity-100 translate-y-0 scale-100' 
                        : 'opacity-0 -translate-y-8 scale-90 pointer-events-none'
                    }`}
                    style={{
                      transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    }}
                  >
                    <Card className="w-full bg-[#0e132380] rounded-2xl backdrop-blur-[30px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(30px)_brightness(100%)] shadow-2xl border-0">
                      <CardContent className="p-6">
                        <h2 className="[font-family:'Inter',Helvetica] font-bold text-[#e2e5e8] text-[15px] tracking-[0] leading-6 mb-4 min-h-[4.5rem]">
                          {typedProblem}
                          {isTyping && (
                            <span className="inline-block w-2 h-4 bg-[#e2e5e8] ml-1 animate-pulse"></span>
                          )}
                        </h2>
                        
                        <Button 
                          className="w-full h-11 bg-gray-400 hover:bg-gray-500 active:bg-gray-600 text-white rounded-xl transition-all duration-150 active:scale-95 transform"
                          onClick={handleDropdownToggle}
                          disabled={isTyping}
                        >
                          {isTyping ? 'Typing...' : 'CONTINUE'}
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>

              {/* Conversation/Explanation Box */}
              <Card className={`bg-white border-2 border-gray-300 rounded-2xl mb-20 transition-all duration-1000 ease-in-out ${
                isTransitioning ? 'scale-105 shadow-2xl' : ''
              }`}>
                <CardContent className={`p-6 transition-all duration-1000 ${
                  isTransitioning ? 'min-h-[400px]' : ''
                }`}>
                  {!isTransitioning ? (
                    <>
                      {/* Conversation Mode */}
                      <div className="mb-6">
                        <div className="text-sm text-gray-500 mb-2 font-medium">Sochratic:</div>
                        <div className="text-gray-800 text-base leading-relaxed">
                          {conversationSessions[currentSession].aiResponse}
                        </div>
                      </div>

                      {/* Input Field at Bottom of Box */}
                      <div className="border-t border-gray-200 pt-4">
                        <Input
                          className="bg-gray-100 h-12 border border-gray-300 rounded-xl placeholder:text-gray-600 w-full focus:bg-white transition-colors"
                          placeholder="Masukan pertanyaan dan pendapat"
                          value={inputValue}
                          onChange={handleInputChange}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter' && inputValue.trim() && !isLoading) {
                              handleNext();
                            }
                          }}
                          disabled={isLoading}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Explanation Mode */}
                      <div className="mb-6">
                        <div className="text-sm text-gray-500 mb-2 font-medium">Penjelasan Materi:</div>
                        <div className="text-gray-800 text-base leading-relaxed">
                          {renderExplanationContent(explanationText)}
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className={`fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-t border-gray-200 p-4 transition-all duration-1000 ${
        isTransitioning ? 'opacity-0 transform translate-y-full' : ''
      }`}>
        <div className="max-w-7xl mx-auto flex justify-center">
          <button
            onClick={handleNext}
            disabled={!inputValue.trim() || isLoading || isTransitioning}
            className="disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 transition-transform"
          >
            <NextButton className="w-[228px] h-[60px]" />
          </button>
        </div>
      </div>
    </div>
  );
}