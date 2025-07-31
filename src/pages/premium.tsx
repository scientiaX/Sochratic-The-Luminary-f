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
    id: 'thought-learner',
    name: 'Thought Learner',
    subtitle: 'Foundation of Everything',
    price: '$3',
    originalPrice: '$5',
    description: 'Master the basics of problem solving and high-end thinking',
    icon: Brain,
    gradient: 'from-blue-600 via-purple-600 to-indigo-700',
    featureCategories: [
      {
        name: 'Learning Content',
        icon: BookOpen,
        features: [
          'Access to 50+ foundational lessons',
          'Interactive problem-solving exercises',
          'Step-by-step video tutorials',
          'Downloadable study materials'
        ]
      },
      {
        name: 'Progress & Analytics',
        icon: Target,
        features: [
          'Progress tracking & analytics',
          'Performance insights dashboard',
          'Learning path recommendations',
          'Achievement badges system'
        ]
      },
      {
        name: 'Community & Support',
        icon: Users,
        features: [
          'Community discussion forums',
          'Email support',
          'Mobile app access',
          'Certificate of completion'
        ]
      }
    ]
  },
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
          'Everything in Thought Learner',
          'Access to 100+ advanced lessons',
          'Exclusive "Truth Discovery" modules',
          'Advanced AI mentor assistance'
        ]
      },
      {
        name: 'Exclusive Access',
        icon: Crown,
        features: [
          'Priority community access',
          'Live Q&A sessions monthly',
          'Early access to new features',
          'Exclusive study materials'
        ]
      },
      {
        name: 'Premium Support',
        icon: Shield,
        features: [
          'Advanced analytics dashboard',
          'Priority email & chat support',
          'Personal learning advisor',
          'Custom study schedules'
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
    badge: 'ONLY THE CHOSEN',
    featureCategories: [
      {
        name: 'Ultimate Access',
        icon: Infinity,
        features: [
          'Everything in Truth Seeker',
          'Unlimited access to all content',
          'Personal AI mentor 24/7',
        ]
      },
      {
        name: 'Exclusive Experiences',
        icon: Sparkles,
        features: [
          'Exclusive "Ultra Thinking" workshops',
          'Direct access to expert instructors',
          'Exclusive networking events',
          'Exclusive research insights'
        ]
      },
      {
        name: 'Personal Success',
        icon: Award,
        features: [
          'Custom learning path creation',
          'Advanced project portfolio',
          'Dedicated success manager',
          'Priority feature requests'
        ]
      }
    ]
  }
];

const FeatureIcon = ({ feature }: { feature: string }) => {
  const getIcon = (feature: string) => {
    if (feature.includes('AI')) return <Brain className="w-4 h-4" />;
    if (feature.includes('access')) return <Infinity className="w-4 h-4" />;
    if (feature.includes('support')) return <Shield className="w-4 h-4" />;
    if (feature.includes('certificate')) return <Award className="w-4 h-4" />;
    if (feature.includes('community')) return <Users className="w-4 h-4" />;
    if (feature.includes('exclusive')) return <Crown className="w-4 h-4" />;
    if (feature.includes('priority')) return <Target className="w-4 h-4" />;
    if (feature.includes('advanced')) return <Sparkles className="w-4 h-4" />;
    return <Check className="w-4 h-4" />;
  };

  return (
    <div className="flex items-center space-x-3">
      <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white">
        {getIcon(feature)}
      </div>
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
              // Here you can add logic to handle package selection
              console.log(`Selected package: ${pkg.name}`);
              // You can add payment processing logic here
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
  const [currentIndex, setCurrentIndex] = useState(1); // Start with Truth Seeker (middle package)
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
    if (isMobile) {
      const packageIndex = packages.findIndex(pkg => pkg.id === packageId);
      setCurrentIndex(packageIndex);
    }
  };

  const scrollToPackage = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const cardWidth = container.scrollWidth / packages.length;
    const currentScroll = container.scrollLeft;
    
    let targetScroll;
    if (direction === 'left') {
      targetScroll = Math.max(0, currentScroll - cardWidth);
    } else {
      targetScroll = Math.min(container.scrollWidth - container.clientWidth, currentScroll + cardWidth);
    }
    
    container.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Falling Stars Background */}
      <FallingStars starCount={30} />
      
      {/* Close Button */}
      <button 
        onClick={() => navigate(-1)}
        className="absolute top-6 right-6 z-20 w-12 h-12 bg-gray-900/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-gray-800 transition-all duration-300 border border-gray-700 hover:border-gray-600 shadow-lg"
      >
        <X size={24} />
      </button>
      
      {/* Header */}
      <div className="relative z-10 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
              <Crown className="text-white w-10 h-10" />
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-4">
                Unlock Your Full Potential,
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent"> What Templates Can't Do</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto">
            Be a part of this mass revolution by unlocking the chunks of truth that only the deserving can access.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
              <div className="text-2xl font-bold text-white mb-2">✅</div>
              <div className="text-gray-300">Verified by Science</div>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
              <div className="text-2xl font-bold text-white mb-2">🏆</div>
              <div className="text-gray-300">Top 1 Most Effective Learning Method</div>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
              <div className="text-2xl font-bold text-white mb-2">🌟</div>
              <div className="text-gray-300">Methods Supported by Great Figures</div>
            </div>
          </div>
        </div>
      </div>

                                  {/* Packages */}
       <div className="relative z-10 pb-40">
          <div className={`max-w-7xl mx-auto ${isMobile ? 'px-0' : 'px-4 sm:px-6 lg:px-8'}`}>
                      {/* Mobile Navigation Arrows - Floating on sides */}
            {isMobile && (
              <>
                <button
                  onClick={() => scrollToPackage('left')}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 z-30 w-12 h-12 bg-gray-900/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-gray-800 transition-all duration-300 border border-gray-700 hover:border-gray-600 shadow-lg"
                >
                  <ChevronLeft size={24} />
                </button>
                
                <button
                  onClick={() => scrollToPackage('right')}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 z-30 w-12 h-12 bg-gray-900/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-gray-800 transition-all duration-300 border border-gray-700 hover:border-gray-600 shadow-lg"
                >
                  <ChevronRight size={24} />
                </button>
                
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

                     {/* Desktop Grid / Mobile Horizontal Scroll */}
                                               <div 
               ref={scrollContainerRef}
               className={`${
                 isMobile 
                   ? 'flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-4 pb-16 pt-8 px-4' 
                   : 'grid grid-cols-1 md:grid-cols-3 gap-8'
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
                      : ''
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
