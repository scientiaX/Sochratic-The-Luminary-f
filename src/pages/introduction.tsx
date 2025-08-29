import cosmicBackground from "@/assets/cosmic-planet-background.jpg";
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const IntroductionPage = () => {
  const navigate = useNavigate();
  // Use scroll animation hook
  useScrollAnimation();

  // Navigation items data
  const navItems = [
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
    <div>
      {/* Fixed Header/Navigation */}
      {/* Floating Island Header */}
      <header
        className="fixed z-50 left-1/2 -translate-x-1/2
                  flex items-center justify-between
                  px-6 py-3 rounded-[18px]
                  bg-black/60 backdrop-blur-lg border border-white/10 shadow-2xl
                  max-w-4xl"
        style={{ top: 'env(safe-area-inset-top, 1rem)', width: 'min(920px, calc(100% - 3rem))' }}
      >
        <div className="font-bold text-white text-xl tracking-wide select-none">
          novaX
        </div>

        <nav className="flex items-center space-x-1.5">
          {navItems.map((item, idx) => (
            <Button
              key={idx}
              variant="ghost"
              className="flex items-center space-x-1.5 h-9 px-3 rounded-lg
                        text-white/90 hover:text-white hover:bg-white/10
                        transition-colors"
              onClick={() => navigate("/login")}
            >
              {item.icon}
              <span className="hidden sm:inline text-sm font-normal">
                {item.text}
              </span>
            </Button>
          ))}
        </nav>
      </header>


      <div className="min-h-screen relative overflow-hidden bg-background">
      {/* Cosmic Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${cosmicBackground})` }}
      />
      
      {/* Cosmic Gradient Overlays */}
      <div className="absolute inset-0 bg-cosmic-gradient opacity-80" />
      <div className="absolute inset-0 bg-planet-glow opacity-60" />
      
      {/* Animated Cosmic Glow */}
      <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-cosmic-glow rounded-full blur-3xl animate-cosmic-glow opacity-30" />
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          {/* Main Title */}
          <div className="space-y-4 animate-fade-in">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-wider">
              <span className="bg-gradient-to-r from-cosmic-glow via-cosmic-aurora to-cosmic-sunrise bg-clip-text text-transparent animate-float">
                novaX
              </span>
            </h1>
          </div>
          
          {/* Subtitle */}
          <div className="animate-fade-in [animation-delay:0.5s] opacity-0">
            <p className="text-lg md:text-xl lg:text-2xl text-foreground/90 leading-relaxed font-light tracking-wide max-w-3xl mx-auto">
              first all in one learning environment 
              <br className="hidden md:block" />
              <span className="text-cosmic-aurora">with AI thinking tracker</span>
            </p>
          </div>
          
          {/* Subtle Accent Line */}
          <div className="animate-fade-in [animation-delay:1s] opacity-0">
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-cosmic-glow to-transparent mx-auto" />
          </div>
        </div>
      
        {/* Additional Cosmic Effects */}
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-cosmic-aurora/20 rounded-full blur-2xl animate-cosmic-glow [animation-delay:2s]" />
        <div className="absolute top-20 right-1/4 w-16 h-16 bg-cosmic-sunrise/30 rounded-full blur-xl animate-float [animation-delay:3s]" />
      </div>
      </div>

      {/* Black Introduction Section */}
      <div className="min-h-screen bg-black text-white flex flex-col">
        <div className="flex-1 p-4">
          <div className="max-w-7xl mx-auto">
            {/* Main Content */}
            <div className="max-w-6xl mx-auto pb-16 sm:pb-14 opacity-0 transform translate-y-8 transition-all duration-1000 ease-out" 
                 data-scroll="fade-up">
              {/* Hero Section */}
              <div className="mb-12 sm:mb-16 pt-16 sm:pt-24">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                  Transform Your Mind<br />
                  <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    In 10 Minutes
                  </span>
                </h1>
                <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 max-w-2xl">
                  Experience the future of learning where AI adapts to your thinking patterns and accelerates your problem-solving abilities
                </p>
                <Link 
                  to="/login" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl w-full sm:w-auto inline-block text-center"
                >
                  Begin Your Journey
                </Link>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 sm:mb-24">
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-3xl p-6 opacity-0 transform translate-y-8 transition-all duration-1000 ease-out" 
                     data-scroll="fade-up" style={{animationDelay: '0.2s'}}>
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">Lightning Fast Learning</h3>
                  <p className="text-gray-400">AI-powered adaptation that matches your pace and accelerates your understanding</p>
                </div>

                <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-3xl p-6 opacity-0 transform translate-y-8 transition-all duration-1000 ease-out" 
                     data-scroll="fade-up" style={{animationDelay: '0.4s'}}>
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">Smart Problem Solving</h3>
                  <p className="text-gray-400">Real-world challenges that build critical thinking and analytical skills</p>
                </div>

                <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-3xl p-6 opacity-0 transform translate-y-8 transition-all duration-1000 ease-out" 
                     data-scroll="fade-up" style={{animationDelay: '0.6s'}}>
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-600 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">Progress Tracking</h3>
                  <p className="text-gray-400">Monitor your growth with detailed analytics with thinking process</p>
                </div>
              </div>

              {/* Statistics Section */}
              <div className="text-center mb-16 sm:mb-24 opacity-0 transform translate-y-8 transition-all duration-1000 ease-out" 
                   data-scroll="fade-up">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8">
                  Why <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Problem Solving</span> Matters
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  <div className="bg-gradient-to-r from-yellow-400/10 to-orange-500/10 border border-yellow-500/30 rounded-3xl p-8 backdrop-blur-sm opacity-0 transform translate-y-8 transition-all duration-1000 ease-out" 
                       data-scroll="fade-up" style={{animationDelay: '0.2s'}}>
                    <h3 className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-4">
                      WORLD ECONOMIC FORUM
                    </h3>
                    <p className="text-gray-300">
                      Problem-solving is the #1 skill needed in the era of automation and AI orchestrations
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-400/10 to-purple-500/10 border border-blue-500/30 rounded-3xl p-8 backdrop-blur-sm opacity-0 transform translate-y-8 transition-all duration-1000 ease-out" 
                       data-scroll="fade-up" style={{animationDelay: '0.4s'}}>
                    <h3 className="text-2xl sm:text-3xl font-bold text-blue-400 mb-4">
                      TOP LINKEDIN SKILL
                    </h3>
                    <p className="text-gray-300">
                      Most sought-after skill by employers across all industries
                    </p>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="text-center opacity-0 transform translate-y-8 transition-all duration-1000 ease-out" 
                   data-scroll="fade-up">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                  Ready to <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">Unlock</span> Your Team?
                </h2>
                <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                  Join thousands of students who can be your collaboration and discussion team
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <button className="border border-gray-600 text-gray-300 px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-gray-800 hover:text-white transition-all duration-300 w-full sm:w-auto">
                    Watch Demo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Content Section */}
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <div className="flex-1 p-4">
          <div className="max-w-7xl mx-auto">
            {/* Main Content */}
            <div className="max-w-6xl mx-auto pb-16 sm:pb-14 opacity-0 transform translate-y-8 transition-all duration-1000 ease-out" 
                 data-scroll="fade-up">
              {/* Hero Section */}
              <div className="mb-12 sm:mb-16">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
                  online thinking lab<br />
                  with transcendent AI
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl">
                Online lab + Project portfolio + Deep-learning method + transcendent AI
                </p>
              </div>

              {/* Combined Section with Scroll Track Shadow Effect */}
              <div className="relative">
                <div className="p-0 relative z-10">
                  <div className="flex overflow-x-auto gap-4 pb-4 md:flex-col md:space-y-8 md:overflow-x-visible snap-x snap-mandatory px-4 md:px-0">
                    <div className="bg-gradient-to-r from-yellow-400/10 to-orange-500/10 border border-yellow-500/30 rounded-3xl p-6 backdrop-blur-sm min-w-[280px] md:min-w-0 md:p-8 snap-center opacity-0 transform translate-y-8 transition-all duration-1000 ease-out" 
                         data-scroll="fade-up" style={{animationDelay: '0.2s'}}>
                      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-yellow-500 mb-4">
                        DEEP-LEARNING METHOD
                      </h2>
                      <p className="text-base sm:text-lg text-gray-700">
                        Spaced repetition, active retrieval, meta cognition reflection, problem based and project based learning <br className="hidden sm:block" />
                        <span className="sm:hidden"> </span>
                      </p>
                    </div>
                    
                    <div className="bg-gradient-to-r from-yellow-400/10 to-orange-500/10 border border-yellow-500/30 rounded-3xl p-6 backdrop-blur-sm min-w-[280px] md:min-w-0 md:p-8 snap-center opacity-0 transform translate-y-8 transition-all duration-1000 ease-out" 
                         data-scroll="fade-up" style={{animationDelay: '0.4s'}}>
                      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-yellow-500 mb-4">
                        AI TRANSCENDENT
                      </h2>
                      <p className="text-base sm:text-lg text-gray-700">
                      AI that assesses thinking skills in all conditions while learning, arguing, experimenting, working on projects and collaborating
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="min-h-screen bg-white py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16 sm:mb-20 opacity-0 transform translate-y-8 transition-all duration-1000 ease-out" 
               data-scroll="fade-up">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Problem-Based Learning
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Experience learning through real-world challenges that develop critical thinking, 
              collaboration skills, and deep understanding through authentic problem-solving scenarios
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
            {/* Problem-Based Learning Explanation */}
            <div className="opacity-0 transform translate-y-8 transition-all duration-1000 ease-out" 
                 data-scroll="fade-up" style={{animationDelay: '0.2s'}}>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                Learn by Solving Real Problems
              </h3>
              <div className="space-y-6 text-gray-700">
                <p className="text-lg leading-relaxed">
                  Problem-based learning puts you at the center of authentic, complex challenges that mirror real-world scenarios. 
                  Instead of passive consumption, you actively construct knowledge through investigation, collaboration, and reflection.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Active Knowledge Construction</h4>
                      <p className="text-gray-600">Build understanding through hands-on investigation rather than passive absorption</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Collaborative Learning</h4>
                      <p className="text-gray-600">Work with peers to tackle complex challenges and share diverse perspectives</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Real-World Relevance</h4>
                      <p className="text-gray-600">Engage with authentic problems that connect learning to meaningful contexts</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Representation */}
            <div className="opacity-0 transform translate-y-8 transition-all duration-1000 ease-out" 
                 data-scroll="fade-up" style={{animationDelay: '0.4s'}}>
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 border border-blue-100">
                <div className="text-center mb-8">
                  <h4 className="text-xl font-bold text-gray-900 mb-4">PBL Learning Cycle</h4>
                </div>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">1</div>
                    <div>
                      <h5 className="font-semibold text-gray-900">Problem Presentation</h5>
                      <p className="text-sm text-gray-600">Encounter authentic, complex scenarios</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">2</div>
                    <div>
                      <h5 className="font-semibold text-gray-900">Investigation & Research</h5>
                      <p className="text-sm text-gray-600">Gather information and analyze data</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">3</div>
                    <div>
                      <h5 className="font-semibold text-gray-900">Solution Development</h5>
                      <p className="text-sm text-gray-600">Create and test potential solutions</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">4</div>
                    <div>
                      <h5 className="font-semibold text-gray-900">Reflection & Application</h5>
                      <p className="text-sm text-gray-600">Evaluate learning and transfer knowledge</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Learning Techniques Section */}
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16 sm:mb-20 opacity-0 transform translate-y-8 transition-all duration-1000 ease-out" 
               data-scroll="fade-up">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Advanced Cognitive Enhancement
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Experience personalized learning that adapts to your cognitive patterns using scientifically-proven techniques 
              that optimize memory retention, critical thinking, and self-awareness
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-16">
            {/* Spaced Repetition */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200 opacity-0 transform translate-y-8 transition-all duration-1000 ease-out" 
                 data-scroll="fade-up" style={{animationDelay: '0.2s'}}>
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Intelligent Spaced Repetition</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Our AI analyzes your forgetting curves and optimizes review intervals based on your individual memory patterns, 
                ensuring maximum retention with minimal effort.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Personalized forgetting curve analysis</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Dynamic interval adjustment</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Context-aware scheduling</span>
                </div>
              </div>
            </div>

            {/* Active Retrieval */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200 opacity-0 transform translate-y-8 transition-all duration-1000 ease-out" 
                 data-scroll="fade-up" style={{animationDelay: '0.4s'}}>
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Adaptive Active Retrieval</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Engage in challenging recall exercises that strengthen neural pathways. Our system adapts difficulty and 
                question types based on your cognitive load and performance patterns.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Multi-modal retrieval challenges</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Cognitive load monitoring</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Progressive difficulty scaling</span>
                </div>
              </div>
            </div>

            {/* Metacognition */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200 opacity-0 transform translate-y-8 transition-all duration-1000 ease-out" 
                 data-scroll="fade-up" style={{animationDelay: '0.6s'}}>
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Deep Metacognitive Awareness</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Develop profound self-awareness of your thinking processes through guided reflection, strategy monitoring, 
                and real-time feedback on your cognitive approaches.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Real-time thinking process analysis</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Strategic approach optimization</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Self-regulation skill development</span>
                </div>
              </div>
            </div>
          </div>

          {/* Advanced Features Showcase */}
          <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl border border-gray-200 opacity-0 transform translate-y-8 transition-all duration-1000 ease-out" 
               data-scroll="fade-up">
            <div className="text-center mb-12">
              <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Beyond Traditional Learning Platforms
              </h3>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Our AI doesn't just track what you learn—it understands how you think, adapts to your cognitive style, 
                and continuously optimizes your learning experience for maximum growth.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center opacity-0 transform translate-y-8 transition-all duration-1000 ease-out" 
                   data-scroll="fade-up" style={{animationDelay: '0.2s'}}>
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Cognitive Pattern Recognition</h4>
                <p className="text-sm text-gray-600">AI identifies your unique thinking patterns and learning preferences</p>
              </div>

              <div className="text-center opacity-0 transform translate-y-8 transition-all duration-1000 ease-out" 
                   data-scroll="fade-up" style={{animationDelay: '0.4s'}}>
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Emotional Intelligence Integration</h4>
                <p className="text-sm text-gray-600">Considers your emotional state and motivation levels in learning optimization</p>
              </div>

              <div className="text-center opacity-0 transform translate-y-8 transition-all duration-1000 ease-out" 
                   data-scroll="fade-up" style={{animationDelay: '0.6s'}}>
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Predictive Performance Modeling</h4>
                <p className="text-sm text-gray-600">Anticipates learning challenges and proactively adjusts strategies</p>
              </div>

              <div className="text-center opacity-0 transform translate-y-8 transition-all duration-1000 ease-out" 
                   data-scroll="fade-up" style={{animationDelay: '0.8s'}}>
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Neural Pathway Optimization</h4>
                <p className="text-sm text-gray-600">Enhances specific neural connections for improved cognitive performance</p>
              </div>
            </div>
          </div>
        </div>
      </div>

            {/* Futuristic Landing Section */}
            <div className="bg-black text-white py-12 sm:py-32 mt-16 sm:mt-24 rounded-3xl opacity-0 transform translate-y-8 transition-all duration-1000 ease-out" 
                 data-scroll="fade-up">
              <div className="max-w-6xl mx-auto px-4 sm:px-6">
                {/* Section 1 - Appears from top when scrolling down */}
                <div className="mb-12 sm:mb-32 opacity-0 transform translate-y-8 transition-all duration-1000 ease-out" 
                     data-scroll="fade-up">
                  <div className="text-center mb-8 sm:mb-12">
                    <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                      The Future of Learning
                    </h2>
                    <p className="text-lg sm:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                      Experience education reimagined with AI-powered problem solving that matches Human learning styles
                    </p>
                  </div>
                  
                  <div className="flex overflow-x-auto gap-3 mt-8 sm:mt-16 pb-4 md:grid md:grid-cols-3 md:gap-8 md:overflow-x-visible snap-x snap-mandatory px-2 md:px-0">
                    <div className="text-center p-3 rounded-3xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 min-w-[220px] md:min-w-0 md:p-6 snap-center opacity-0 transform translate-y-8 transition-all duration-1000 ease-out" 
                         data-scroll="fade-up" style={{animationDelay: '0.2s'}}>
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                        <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                      <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">Adaptive Intelligence</h3>
                      <p className="text-sm md:text-base text-gray-400">Our AI learns your patterns and adapts challenges or reflection to your skill level</p>
                    </div>
                    
                    <div className="text-center p-3 rounded-3xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 min-w-[220px] md:min-w-0 md:p-6 snap-center opacity-0 transform translate-y-8 transition-all duration-1000 ease-out" 
                         data-scroll="fade-up" style={{animationDelay: '0.4s'}}>
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                        <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">Lightning Fast and Immersive</h3>
                      <p className="text-sm md:text-base text-gray-400">Makes it easy to learn comprehensive learning quickly and effectively</p>
                    </div>
                    
                    <div className="text-center p-3 rounded-3xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 min-w-[220px] md:min-w-0 md:p-6 snap-center opacity-0 transform translate-y-8 transition-all duration-1000 ease-out" 
                         data-scroll="fade-up" style={{animationDelay: '0.6s'}}>
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-pink-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                        <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                      <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">Secure & Private</h3>
                      <p className="text-sm md:text-base text-gray-400">Your learning data is protected from AI training with embedding technology</p>
                    </div>
                  </div>
                </div>

                {/* Section 2 - Appears from bottom when scrolling up - Hidden on mobile, shown on desktop */}
                <div className="hidden sm:block opacity-0 transform translate-y-8 transition-all duration-1000 ease-out" 
                     data-scroll="fade-down">
                  <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8">
                      Join the <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Revolution</span>
                    </h2>
                    <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
                      Be part of the next generation of orchestrators. Start your journey today.
                    </p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link 
                      to="/login" 
                      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      Get Started Now
                    </Link>
                    <Link
                      to="/premium"
                      className="border border-gray-600 text-gray-300 px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-gray-800 hover:text-white transition-all duration-300"
                     >
                      Pricing
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Join Revolution Section - Mobile Only */}
            <div className="sm:hidden bg-black text-white py-12 mt-8 rounded-3xl opacity-0 transform translate-y-8 transition-all duration-1000 ease-out" 
                 data-scroll="fade-up">
              <div className="max-w-6xl mx-auto px-4">
                {/* Section 2 - Appears from bottom when scrolling up */}
                <div className="opacity-0 transform translate-y-8 transition-all duration-1000 ease-out" 
                     data-scroll="fade-down">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold mb-4">
                      Join the <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Revolution</span>
                    </h2>
                    <p className="text-base text-gray-300 max-w-2xl mx-auto">
                      Be part of the next generation of orchestrators. Start your journey today.
                    </p>
                  </div>
                  
                  <div className="flex flex-col gap-3 justify-center items-center">
                    <Link 
                      to="/login" 
                      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-2xl text-base font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl w-full text-center"
                    >
                      Get Started Now
                    </Link>
                    <button className="border border-gray-600 text-gray-300 px-6 py-3 rounded-2xl text-base font-semibold hover:bg-gray-800 hover:text-white transition-all duration-300 w-full text-center">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Video and Explanation Section */}
            <div className="py-16 sm:py-24 opacity-0 transform translate-y-8 transition-all duration-1000 ease-out" 
                 data-scroll="fade-up">
              <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
                  {/* Video Container */}
                  <div className="relative order-1 lg:order-2 w-full lg:w-1/2 mb-8 lg:mb-0 opacity-0 transform translate-y-8 transition-all duration-1000 ease-out" 
                       data-scroll="fade-up" style={{animationDelay: '0.2s'}}>
                    <div className="bg-gray-900 rounded-3xl overflow-hidden shadow-2xl aspect-video">
                      {/* Placeholder for YouTube video */}
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                        <div className="text-center">
                          <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-red-700 transition-colors cursor-pointer">
                            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z"/>
                            </svg>
                          </div>
                          <p className="text-gray-300 text-lg font-medium">Video Demo</p>
                          <p className="text-gray-400 text-sm">YouTube link will be added here</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Video overlay info */}
                    <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-lg border border-gray-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">2:45 min</p>
                          <p className="text-xs text-gray-500">Demo video</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Explanation Box */}
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-3xl p-8 lg:p-10 shadow-lg order-2 lg:order-1 w-full lg:w-1/2 opacity-0 transform translate-y-8 transition-all duration-1000 ease-out" 
                       data-scroll="fade-up" style={{animationDelay: '0.4s'}}>
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                      See How It Works
                    </h2>
                    <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                      Watch our interactive demonstration to see how AI-powered problem solving transforms your learning experience in just 10 minutes a day.
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="text-gray-700">Real-time AI adaptation to your thinking level</p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="text-gray-700">Interactive problem-solving scenarios</p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="text-gray-700">Instant feedback and progress tracking by procces not result</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-16 sm:py-20 opacity-0 transform translate-y-8 transition-all duration-1000 ease-out" 
                 data-scroll="fade-up">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              {/* Company Info */}
              <div className="lg:col-span-2 opacity-0 transform translate-y-8 transition-all duration-1000 ease-out" 
                   data-scroll="fade-up" style={{animationDelay: '0.2s'}}>
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-4">novaX</h3>
                  <p className="text-gray-300 mb-6 max-w-md">
                    Empowering the next generation of problem solvers and truth seekers with AI-powered learning experiences that adapt to your unique thought.
                  </p>
                </div>
                
                {/* Social Media */}
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-black transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                  <a href="https://x.com/NovaX_of" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-black transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                  <a href="https://www.linkedin.com/company/nova-x" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.047-1.852-3.047-1.853 0-2.136 1.445-2.136 2.939v5.677H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="opacity-0 transform translate-y-8 transition-all duration-1000 ease-out" 
                 data-scroll="fade-up" style={{animationDelay: '0.4s'}}>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Support */}
            <div className="opacity-0 transform translate-y-8 transition-all duration-1000 ease-out" 
                 data-scroll="fade-up" style={{animationDelay: '0.6s'}}>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-800 mt-12 pt-8 opacity-0 transform translate-y-8 transition-all duration-1000 ease-out" 
               data-scroll="fade-up" style={{animationDelay: '0.8s'}}>
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm mb-4 md:mb-0">
                © 2024 novaX. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy</a>
                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms</a>
                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Cookies</a>
              </div>
            </div>
          </div>
        </footer>
    </div>
    </div>
  );
};

export default IntroductionPage;