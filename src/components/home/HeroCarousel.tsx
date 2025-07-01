
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import Autoplay from "embla-carousel-autoplay"

const carouselImages = [
  { src: "https://images.unsplash.com/photo-1571844092148-391e0539746f?w=1600&h=900&fit=crop&q=80", alt: "Modern kitchen with new appliances" },
  { src: "https://images.unsplash.com/photo-1615875605825-5eb9bb5fea38?w=1600&h=900&fit=crop&q=80", alt: "Living room with a large screen TV" },
  { src: "https://images.unsplash.com/photo-1558992249-00742fde7856?w=1600&h=900&fit=crop&q=80", alt: "Comfortable and stylish furniture collection" },
  { src: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=1600&h=900&fit=crop&q=80", alt: "Latest smart home devices" },
]

const mobileCarouselImages = [
  { src: "https://images.unsplash.com/photo-1571844092148-391e0539746f?w=900&h=1600&fit=crop&q=80", alt: "Modern kitchen with new appliances" },
  { src: "https://images.unsplash.com/photo-1615875605825-5eb9bb5fea38?w=900&h=1600&fit=crop&q=80", alt: "Living room with a large screen TV" },
  { src: "https://images.unsplash.com/photo-1558992249-00742fde7856?w=900&h=1600&fit=crop&q=80", alt: "Comfortable and stylish furniture collection" },
  { src: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=900&h=1600&fit=crop&q=80", alt: "Latest smart home devices" },
]

export function HeroCarousel() {
  return (
    <section className="w-full">
      <Carousel 
        className="w-full"
        plugins={[Autoplay({ delay: 5000, stopOnInteraction: false, })]}
        opts={{ loop: true }}
      >
        <CarouselContent>
          {carouselImages.map((image, index) => (
            <CarouselItem key={index}>
              <div className="relative w-full overflow-hidden transition-all">
                {/* Desktop/Tablet view - 16:9 aspect ratio */}
                <div className="hidden md:block w-full aspect-[16/9]">
                  <img src={image.src} alt={image.alt} className="w-full h-full object-cover" />
                </div>
                
                {/* Mobile view - 9:16 aspect ratio */}
                <div className="block md:hidden w-full aspect-[9/16]">
                  <img src={mobileCarouselImages[index].src} alt={mobileCarouselImages[index].alt} className="w-full h-full object-cover" />
                </div>
                
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="text-center text-white px-4">
                    <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold mb-4">
                      Premium Home Appliances
                    </h1>
                    <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
                      Discover our exclusive collection of energy-efficient, smart home appliances
                    </p>
                    <Button size="lg" className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg">
                      Shop Now
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden md:block">
          <CarouselPrevious className="absolute left-8 top-1/2 -translate-y-1/2" />
          <CarouselNext className="absolute right-8 top-1/2 -translate-y-1/2" />
        </div>
      </Carousel>
    </section>
  )
}
