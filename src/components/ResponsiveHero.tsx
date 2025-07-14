
import { ReactNode } from 'react';

interface ResponsiveHeroProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
  backgroundClass?: string;
}

const ResponsiveHero = ({ 
  icon, 
  title, 
  subtitle, 
  backgroundClass = "bg-[#006d4e]" 
}: ResponsiveHeroProps) => {
  return (
    <section className={`${backgroundClass} text-white py-12 sm:py-16 lg:py-20 relative overflow-hidden`}>
      <div className="absolute inset-0 bg-gradient-to-br from-[#006d4e] via-[#005a41] to-[#004d37]"></div>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 left-4 sm:top-10 sm:left-10 w-12 h-12 sm:w-20 sm:h-20 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-16 right-8 sm:top-32 sm:right-20 w-8 h-8 sm:w-16 sm:h-16 bg-white rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-8 left-8 sm:bottom-20 sm:left-1/4 w-6 h-6 sm:w-12 sm:h-12 bg-white rounded-full animate-pulse delay-2000"></div>
        <div className="absolute bottom-12 right-12 sm:bottom-32 sm:right-1/3 w-4 h-4 sm:w-8 sm:h-8 bg-white rounded-full animate-pulse delay-3000"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="mb-4 sm:mb-6 animate-fade-in opacity-0 animation-delay-300">
          {icon}
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 lg:mb-6 animate-fade-in opacity-0 animation-delay-300 leading-tight">
          {title}
        </h1>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl animate-fade-in opacity-0 animation-delay-600 leading-relaxed max-w-4xl mx-auto">
          {subtitle}
        </p>
      </div>
      
      {/* Floating Animation Elements */}
      <div className="absolute top-1/2 left-0 w-2 h-2 sm:w-4 sm:h-4 bg-green-300 rounded-full animate-bounce opacity-30"></div>
      <div className="absolute top-1/3 right-0 w-3 h-3 sm:w-6 sm:h-6 bg-green-200 rounded-full animate-bounce opacity-40 delay-500"></div>
      <div className="absolute bottom-1/4 left-1/2 w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full animate-bounce opacity-50 delay-1000"></div>
    </section>
  );
};

export default ResponsiveHero;
