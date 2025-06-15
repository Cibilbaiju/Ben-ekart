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
  { src: "https://images.unsplash.com/photo-1571844092148-391e0539746f?w=1600&h=500&fit=crop&q=80", alt: "Modern kitchen with new appliances" },
  { src: "https://images.unsplash.com/photo-1615875605825-5eb9bb5fea38?w=1600&h=500&fit=crop&q=80", alt: "Living room with a large screen TV" },
  { src: "https://images.unsplash.com/photo-1558992249-00742fde7856?w=1600&h=500&fit=crop&q=80", alt: "Comfortable and stylish furniture collection" },
  { src: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=1600&h=500&fit=crop&q=80", alt: "Latest smart home devices" },
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
              {/* Set height a bit larger than before but not full screen */}
              <div className="relative w-full h-[90vh] aspect-auto overflow-hidden transition-all">
                <img src={image.src} alt={image.alt} className="w-full h-full object-cover" />
                <div className="absolute left-4 bottom-4 md:left-8 md:bottom-8">
                  <Button 
                    size="lg"
                    className="bg-primary text-primary-foreground font-bold shadow-lg px-8 py-3 rounded-lg text-lg opacity-90 hover:opacity-100 transition-opacity"
                  >
                    Shop Now
                  </Button>
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
