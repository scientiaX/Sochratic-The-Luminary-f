import { Home } from "lucide-react";
import React, { useState } from "react";
import NextButton from "../components/element/NextButton";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";

export default function StudyPage() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [currentSession, setCurrentSession] = useState(0);

  // Sample conversation sessions
  const conversationSessions = [
    {
      aiResponse: "Apa itu fotosintesis dan bagaimana prosesnya?",
    },
    {
      aiResponse: "Jelaskan tentang hukum Newton yang pertama",
    },
    {
      aiResponse: "Bagaimana cara kerja sistem pencernaan manusia?",
    }
  ];

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleNext = () => {
    if (inputValue.trim()) {
      setCurrentSession((prev) => (prev + 1) % conversationSessions.length);
      setInputValue("");
    }
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

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex-1 p-4">
        <div className="max-w-7xl mx-auto">
          {/* Top Navigation Bar */}
          <Card className="mt-0 mb-4 shadow-lg">
            <CardContent className="p-4 flex justify-between items-center">
              <div className="font-bold text-gray-700 text-lg">
                topic
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
                    <span className="text-gray-600 text-sm font-medium">Show Problem</span>
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
                        <h2 className="[font-family:'Inter',Helvetica] font-bold text-[#e2e5e8] text-[15px] tracking-[0] leading-6 mb-4">
                          problem text here afhosh afhfhohf gfjg fogf ghfojgfhg fushgoufghdg sdu fuhgoufh problem text here afhosh afhfhohf gfjg fogf ghfojgfhg fushgoufghdg sdu fuhgoufh
                        </h2>
                        
                        <Button 
                          className="w-full h-11 bg-gray-400 hover:bg-gray-500 active:bg-gray-600 text-white rounded-xl transition-all duration-150 active:scale-95 transform"
                          onClick={handleDropdownToggle}
                        >
                          CONTINUE
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>

              {/* Main Image */}
              <Card className="mt-0 overflow-hidden shadow-lg rounded-2xl mb-3">
                <CardContent className="p-0">
                  <img
                    className="w-full h-20 sm:h-40 object-cover"
                    alt="Landscape"
                    src="https://c.animaapp.com/md8rwr14pGdpfM/img/rectangle.png"
                  />
                </CardContent>
              </Card>

              {/* Conversation Box */}
              <Card className="bg-white border-2 border-gray-300 rounded-2xl mb-20 transition-all duration-500 ease-in-out">
                <CardContent className="p-6">
                  {/* ai respon */}
                  <div className="mb-6">
                    <div className="text-sm text-gray-500 mb-2 font-medium">Pertanyaan:</div>
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
                        if (e.key === 'Enter' && inputValue.trim()) {
                          handleNext();
                        }
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
// --- inside the fixed footer ---
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-t border-gray-200 p-4">
        <div className="max-w-7xl mx-auto flex justify-center">
          <button
            onClick={handleNext}
            disabled={!inputValue.trim()}
            className="disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 transition-transform"
          >
            <NextButton className="w-[228px] h-[60px]" />
          </button>
        </div>
      </div>
    </div>
  );
}