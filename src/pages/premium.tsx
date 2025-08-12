import React, { useState, useRef, useEffect } from 'react';
import { Check, Star, Zap, Brain, Search, Award, Crown, Rocket, Shield, Infinity, Target, Sparkles, Users, BookOpen, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { FallingStars } from '../components/ui/FallingStars';

interface FeatureCategory {
  name: string;
  features: string[];
  icon: React.ComponentType<any>;
}

interface Package {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  originalPrice?: string;
  description: string;
  featureCategories: FeatureCategory[];
  icon: React.ComponentType<any>;
  gradient: string;
  popular?: boolean;
  badge?: string;
}

const packages: Package[] = [
  {
    id: 'truth-seeker',
    name: 'Truth Seeker',
    subtitle: 'Junior Level Contributor',
    price: '$5',
    originalPrice: '$10',
    description: 'Maximize the truth, upgrade your questions and understand what they don\'t understand',
    icon: Search,
    gradient: 'from-emerald-600 via-teal-600 to-cyan-700',
    popular: true,
    badge: 'MOST POPULAR',
    featureCategories: [
      {
        name: 'Advanced Learning',
        icon: Brain,
        features: [
          'Unlimited lesson access in thought learning',
          'Access to truth seeking advanced lessons',
          'Exclusive "Truth Discovery" modules',
          'Advanced truth seeking AI mentor'
        ]
      },
      {
        name: 'Exclusive Access',
        icon: Crown,
        features: [
          'Priority team recommendations',
          'Bandage verification truth seeker',
          'Trusted accounts and opinions',
          'AI opinion analysis on nova thread posts'
        ]
      },
      {
        name: 'Premium Support',
        icon: Shield,
        features: [
          'Advanced course recommendations based on thought talent',
          'Ai to reflect and evaluate thinking',
          'Personal learning advisor',
          'AI interactive reminder'
        ]
      }
    ]
  },
  {
    id: 'ultra-thinker',
    name: 'Ultra Thinker',
    subtitle: 'Ultra Level Contributor',
    price: '$25',
    originalPrice: '$30',
    description: 'Push the boundaries of thought power with advanced AI mentors and super solving facilities',
    icon: Zap,
    gradient: 'from-orange-600 via-red-600 to-pink-700',
    badge: 'THE CHOSEN ONE',
    featureCategories: [
      {
        name: 'Ultimate Access',
        icon: Infinity,
        features: [
          'Everything in Truth Seeker',
          'Project based learning',
          'Interdisciplinary learning of problems',
          'early access to new features and lessons'
        ]
      },
      {
        name: 'Exclusive Experiences',
        icon: Sparkles,
        features: [
          'Exclusive "Ultra Thinking" labs',
          'Direct access to talented students',
          'Exclusive networking teams',
          'Exclusive project completion collaboration'
        ]
      },
      {
        name: 'Personal Success',
        icon: Award,
        features: [
          'Team matching to build a startup',
          'Advanced project portfolio',
          'Mentoring training in distributing products directly to the public',
          'Easy access to investors for monthly project winning teams'
        ]
      }
    ]
  }
];

const FeatureIcon = ({ feature }: { feature: string }) => {
  return (
    <div className="flex items-center space-x-3">
      <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
      <span className="text-gray-300">{feature}</span>
    </div>
  );
};

const PackageCard = ({ pkg, isSelected, onSelect }: { pkg: Package; isSelected: boolean; onSelect: () => void }) => {
  const IconComponent = pkg.icon;

  return (
    <div 
      className={`relative transform transition-all duration-500 hover:scale-105 ${
        isSelected ? 'scale-105' : ''
      }`}
    >
      {pkg.popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
            {pkg.badge}
          </div>
        </div>
      )}
      
      {pkg.badge && !pkg.popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
            {pkg.badge}
          </div>
        </div>
      )}

      <div 
        className={`relative overflow-hidden rounded-3xl p-8 min-h-[1100px] cursor-pointer transition-all duration-500 ${
          isSelected 
            ? 'bg-gray-900 shadow-2xl ring-4 ring-yellow-500 ring-opacity-50 border border-gray-700' 
            : 'bg-gray-900/90 backdrop-blur-sm shadow-xl hover:shadow-2xl border border-gray-800'
        }`}
        onClick={onSelect}
      >
        {/* Background Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${pkg.gradient} opacity-5`}></div>
        
        {/* Floating Elements */}
        <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20"></div>
        <div className="absolute bottom-6 left-6 w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20"></div>
        
        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className={`w-16 h-16 bg-gradient-to-br ${pkg.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
              <IconComponent className="text-white w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
            <p className="text-gray-300 mb-4">{pkg.subtitle}</p>
            <p className="text-sm text-gray-400 mb-6">{pkg.description}</p>
          </div>

          {/* Pricing */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <span className="text-4xl font-bold text-white">{pkg.price}</span>
              {pkg.originalPrice && (
                <span className="text-lg text-gray-400 line-through">{pkg.originalPrice}</span>
              )}
            </div>
            <span className="text-gray-400">per month</span>
          </div>

          {/* Features */}
          <div className="space-y-6 mb-8">
            {pkg.featureCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="space-y-3">
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-5 h-5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <category.icon className="text-white w-3 h-3" />
                  </div>
                  <h4 className="text-sm font-semibold text-white">{category.name}</h4>
                </div>
                <div className="space-y-2 ml-7">
                  {category.features.map((feature, featureIndex) => (
                    <FeatureIcon key={featureIndex} feature={feature} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <button 
            onClick={() => {
              console.log(`Selected package: ${pkg.name}`);
            }}
            className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
              isSelected
                ? `bg-gradient-to-r ${pkg.gradient} text-white shadow-lg transform scale-105`
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-600'
            }`}
          >
            {isSelected ? 'Selected' : 'Choose Plan'}
          </button>
        </div>
      </div>
    </div>
  );
};

const PremiumPage = () => {
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState<string>('truth-seeker');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Update current index when scrolling
  useEffect(() => {
    if (isMobile && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      
      const handleScroll = () => {
        const cardWidth = container.scrollWidth / packages.length;
        const scrollLeft = container.scrollLeft;
        const newIndex = Math.round(scrollLeft / cardWidth);
        setCurrentIndex(newIndex);
      };

      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [isMobile, packages.length]);

  // Auto-scroll to selected package on mobile
  useEffect(() => {
    if (isMobile && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.scrollWidth / packages.length;
      const targetScroll = cardWidth * packages.findIndex(pkg => pkg.id === selectedPackage);
      
      container.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  }, [selectedPackage, isMobile]);

  const handlePackageSelect = (packageId: string) => {
    setSelectedPackage(packageId);
  };

  const scrollToNext = () => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const cardWidth = container.scrollWidth / packages.length;
    const nextIndex = Math.min(currentIndex + 1, packages.length - 1);
    const targetScroll = cardWidth * nextIndex;
    
    container.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });
  };

  const scrollToPrevious = () => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const cardWidth = container.scrollWidth / packages.length;
    const previousIndex = Math.max(currentIndex - 1, 0);
    const targetScroll = cardWidth * previousIndex;
    
    container.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });
  };

  // Determine which navigation button to show
  const canGoLeft = currentIndex > 0;
  const canGoRight = currentIndex < packages.length - 1;

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Falling Stars Background */}
      <FallingStars starCount={30} />
      
      {/* Close Button */}
      <button 
        onClick={goBack}
        className="absolute top-4 right-4 md:top-6 md:right-6 z-20 w-10 h-10 md:w-12 md:h-12 bg-gray-900/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-gray-800 transition-all duration-300 border border-gray-700 hover:border-gray-600 shadow-lg"
      >
        <X size={20} className="md:w-6 md:h-6" />
      </button>
      
      {/* Header */}
      <div className="relative z-10 pt-12 md:pt-16 pb-6 md:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6 md:mb-8">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl md:rounded-3xl flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-2xl">
              <Crown className="text-white w-8 h-8 md:w-10 md:h-10" />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-3 md:mb-4 leading-tight">
              Unlock Your Full Potential,
              <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent"> What Templates Can't Do</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto px-2">
              Be a part of this mass revolution by unlocking the chunks of truth that only the deserving can access.
            </p>
          </div>

          {/* Mobile-Optimized Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-8 mb-8 md:mb-12 px-2">
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 border border-gray-700">
              <div className="text-xl md:text-2xl font-bold text-white mb-1 md:mb-2">✅</div>
              <div className="text-sm md:text-base text-gray-300">Verified by Science</div>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 border border-gray-700 sm:col-span-2 md:col-span-1">
              <div className="text-xl md:text-2xl font-bold text-white mb-1 md:mb-2">🏆</div>
              <div className="text-sm md:text-base text-gray-300">Top 1 Most Effective Learning Method</div>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 border border-gray-700 sm:col-span-2 md:col-span-1 sm:mx-auto sm:max-w-xs md:max-w-none">
              <div className="text-xl md:text-2xl font-bold text-white mb-1 md:mb-2">🌟</div>
              <div className="text-sm md:text-base text-gray-300">Methods Supported by Great Figures</div>
            </div>
          </div>
        </div>
      </div>

      {/* Packages */}
      <div className="relative z-10 pb-20 md:pb-40">
        <div className={`max-w-5xl mx-auto ${isMobile ? 'px-0' : 'px-4 sm:px-6 lg:px-8'}`}>
          {/* Mobile Dynamic Navigation - Show only one button at a time */}
          {isMobile && (
            <>
              {/* Left Arrow - Only show if can go left */}
              {canGoLeft && (
                <button
                  onClick={scrollToPrevious}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 bg-gray-900/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-gray-800 transition-all duration-300 border border-gray-700 hover:border-gray-600 shadow-lg"
                >
                  <ChevronLeft size={20} />
                </button>
              )}
              
              {/* Right Arrow - Only show if can go right */}
              {canGoRight && (
                <button
                  onClick={scrollToNext}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 bg-gray-900/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-gray-800 transition-all duration-300 border border-gray-700 hover:border-gray-600 shadow-lg"
                >
                  <ChevronRight size={20} />
                </button>
              )}
              
              {/* Dot indicators */}
              <div className="flex justify-center space-x-2 mb-6">
                {packages.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex ? 'bg-yellow-400' : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            </>
          )}

          {/* Desktop Centered / Mobile Horizontal Scroll */}
          <div 
            ref={scrollContainerRef}
            className={`${
              isMobile 
                ? 'flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-4 pb-16 pt-8 px-4' 
                : 'flex justify-center gap-8 flex-wrap'
            }`}
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {packages.map((pkg, index) => (
              <div
                key={pkg.id}
                className={`${
                  isMobile 
                    ? 'flex-shrink-0 w-72 snap-center my-8' 
                    : 'w-full max-w-sm'
                }`}
              >
                <PackageCard
                  pkg={pkg}
                  isSelected={selectedPackage === pkg.id}
                  onSelect={() => handlePackageSelect(pkg.id)}
                />
              </div>
            ))}
          </div>

          {/* Mobile Swipe Instructions */}
          {isMobile && (
            <div className="text-center mt-6 px-4">
              <p className="text-gray-400 text-sm">
                💡 Swipe left or right to browse packages
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Custom CSS for hiding scrollbar */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default PremiumPage;