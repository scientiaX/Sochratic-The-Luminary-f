import { Home } from "lucide-react";
import React, { useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";

export default function StudyPage() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
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

  // Menu items data
  const menuItems = [
    {
      label: "pertanyaan",
      icon: "❓",
    },
    {
      label: "materi",
      icon: "📚",
    },
    {
      label: "solusi dan pendapat",
      icon: "💡",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Top Navigation Bar */}
        <Card className="mb-6 shadow-lg">
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

        {/* Main Content Layout - Element utama di tengah */}
        <div className="flex justify-center">
          {/* Main Content Area */}
          <div className="w-full max-w-4xl space-y-6">
            {/* Dropdown - sekarang di tengah horizontal dengan animasi */}
            <div className="flex justify-center">
              <div className="relative">
                <img
                  className="w-80 h-11 cursor-pointer hover:opacity-80 transition-opacity"
                  alt="Dropdown container"
                  src="https://c.animaapp.com/md8rwr14pGdpfM/img/dropdown-container----dropdown.svg"
                  onClick={handleDropdownClick}
                />
                
                {/* Dropdown Content */}
                <div 
                  className={`absolute top-full left-0 w-full mt-2 transition-all duration-500 ease-in-out transform ${
                    isDropdownOpen 
                      ? 'opacity-100 translate-y-0 scale-100' 
                      : 'opacity-0 -translate-y-4 scale-95 pointer-events-none'
                  }`}
                >
                  <Card className="w-full bg-[#0e132380] rounded-2xl backdrop-blur-[30px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(30px)_brightness(100%)]">
                    <CardContent className="p-6">
                      <h2 className="[font-family:'Inter',Helvetica] font-bold text-[#e2e5e8] text-[15px] tracking-[0] leading-6 mb-4">
                        problem text here
                      </h2>
                      <Button 
                        className="w-full h-11 bg-gray-400 hover:bg-gray-500 text-white rounded-md transition-colors duration-200"
                        onClick={handleDropdownClick}
                      >
                        CONTINUE
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            {/* Main Image */}
            <Card className="overflow-hidden shadow-lg rounded-2xl">
              <CardContent className="p-0">
                <img
                  className="w-full h-64 sm:h-80 object-cover"
                  alt="Landscape"
                  src="https://c.animaapp.com/md8rwr14pGdpfM/img/rectangle.png"
                />
              </CardContent>
            </Card>

            {/* User Profile */}
            <div className="flex items-center space-x-4">
              <Avatar className="w-12 h-12">
                <AvatarImage
                  src="https://c.animaapp.com/md8rwr14pGdpfM/img/rectangle-1.png"
                  alt="User avatar"
                />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
              <span className="font-medium text-gray-700 text-base">
                SOCHRATIC
              </span>
            </div>

            {/* AI Response */}
            <Card className="bg-white/90 shadow-lg rounded-2xl">
              <CardContent className="p-6">
                <p className="text-gray-700 text-sm leading-relaxed">
                  ai respon/first question
                </p>
              </CardContent>
            </Card>

            {/* Message Input */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                className="flex-1 h-12 rounded-2xl border-gray-300 px-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                placeholder="masukan pertanyaan dan pendapat anda disini"
              />
              <Button className="h-12 px-6 bg-blue-600 hover:bg-blue-700 rounded-2xl text-white font-medium">
                kirim
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}