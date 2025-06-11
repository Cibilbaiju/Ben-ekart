
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 text-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
      
      <div className="container mx-auto px-4 py-20 md:py-28 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Sparkles className="h-4 w-4 text-yellow-300" />
              <span className="text-sm font-medium">Premium Quality Guaranteed</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Premium Home
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">
                Appliances
              </span>
            </h1>
            
            <p className="text-xl mb-8 text-blue-100 leading-relaxed max-w-xl">
              Discover our exclusive collection of energy-efficient, smart home appliances. 
              Transform your home with cutting-edge technology and modern design.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white hover:text-blue-600 backdrop-blur-sm bg-white/10 shadow-lg">
                View Offers
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20">
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl p-3 shadow-lg">
                <span className="text-white font-bold text-sm">HOT DEAL!</span>
              </div>
              
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400 mb-2">
                  UP TO 40% OFF
                </div>
                <div className="text-xl md:text-2xl font-semibold mb-4">Premium Smart TVs</div>
                <div className="text-sm text-blue-100 bg-white/10 rounded-full px-4 py-2 inline-block">
                  ⏰ Limited time offer
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-6 -left-6 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-70 animate-pulse"></div>
            <div className="absolute -bottom-4 -right-8 w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full opacity-60 animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>
        </div>
      </div>
      
      {/* Wave bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-16" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="white"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="white"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="white"></path>
        </svg>
      </div>
    </section>
  );
};
