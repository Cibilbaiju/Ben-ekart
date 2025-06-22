
import { useHorizontalScroll } from "@/hooks/useHorizontalScroll";

interface ScrollSection {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  bgColor: string;
  cta1?: string;
  cta2?: string;
}

interface GenericHorizontalScrollProps {
  sections: ScrollSection[];
  showScrollHint?: boolean;
}

export const GenericHorizontalScroll = ({ 
  sections, 
  showScrollHint = true 
}: GenericHorizontalScrollProps) => {
  const { containerRef, sectionsRef } = useHorizontalScroll(sections);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-black"
    >
      <div 
        ref={sectionsRef}
        className="flex h-full"
      >
        {sections.map((section, index) => (
          <div
            key={section.id}
            className={`scroll-section flex-shrink-0 w-screen h-full relative overflow-hidden bg-gradient-to-br ${section.bgColor}`}
          >
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
              style={{ backgroundImage: `url(${section.image})` }}
            />
            
            <div className="absolute inset-0 bg-black/40" />
            
            <div className="section-content relative z-10 h-full flex items-center justify-center px-8 md:px-16">
              <div className="text-center text-white max-w-4xl">
                <div className="mb-4">
                  <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium border border-white/20">
                    Section {index + 1}
                  </span>
                </div>
                
                <h2 className="text-4xl md:text-7xl font-bold mb-6 leading-tight">
                  {section.title}
                </h2>
                
                <h3 className="text-xl md:text-3xl font-light mb-8 text-gray-200">
                  {section.subtitle}
                </h3>
                
                <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
                  {section.description}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
                    {section.cta1 || "Explore Collection"}
                  </button>
                  <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-black transition-all duration-300">
                    {section.cta2 || "Learn More"}
                  </button>
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-8 right-8 text-white/60 text-6xl md:text-8xl font-bold">
              0{index + 1}
            </div>
            
            <div className="absolute bottom-8 left-8 flex space-x-2">
              {sections.map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === index ? 'bg-white' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {showScrollHint && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/80 text-center pointer-events-none">
          <div className="flex flex-col items-center space-y-2">
            <span className="text-sm font-medium">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
