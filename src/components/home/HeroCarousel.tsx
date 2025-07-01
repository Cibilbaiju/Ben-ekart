
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import Autoplay from "embla-carousel-autoplay"
import { useState, useEffect } from "react"
import { ImageUploadModal } from "./ImageUploadModal"
import { useAuth } from "@/contexts/AuthContext"

interface CarouselImage {
  id: string;
  desktopSrc: string;
  mobileSrc: string;
  alt: string;
}

// Default fallback images
const defaultCarouselImages: CarouselImage[] = [
  { 
    id: "1",
    desktopSrc: "https://images.unsplash.com/photo-1571844092148-391e0539746f?w=1600&h=900&fit=crop&q=80", 
    mobileSrc: "https://images.unsplash.com/photo-1571844092148-391e0539746f?w=900&h=1600&fit=crop&q=80",
    alt: "Modern kitchen with new appliances" 
  },
  { 
    id: "2",
    desktopSrc: "https://images.unsplash.com/photo-1615875605825-5eb9bb5fea38?w=1600&h=900&fit=crop&q=80", 
    mobileSrc: "https://images.unsplash.com/photo-1615875605825-5eb9bb5fea38?w=900&h=1600&fit=crop&q=80",
    alt: "Living room with a large screen TV" 
  },
  { 
    id: "3",
    desktopSrc: "https://images.unsplash.com/photo-1558992249-00742fde7856?w=1600&h=900&fit=crop&q=80", 
    mobileSrc: "https://images.unsplash.com/photo-1558992249-00742fde7856?w=900&h=1600&fit=crop&q=80",
    alt: "Comfortable and stylish furniture collection" 
  },
  { 
    id: "4",
    desktopSrc: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=1600&h=900&fit=crop&q=80", 
    mobileSrc: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=900&h=1600&fit=crop&q=80",
    alt: "Latest smart home devices" 
  },
]

export function HeroCarousel() {
  const [carouselImages, setCarouselImages] = useState<CarouselImage[]>(defaultCarouselImages)
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const { user } = useAuth()

  // Load images from localStorage on component mount
  useEffect(() => {
    const savedImages = localStorage.getItem('heroCarouselImages')
    if (savedImages) {
      try {
        const parsedImages = JSON.parse(savedImages)
        setCarouselImages(parsedImages)
      } catch (error) {
        console.error('Error parsing saved carousel images:', error)
      }
    }
  }, [])

  // Save images to localStorage whenever they change
  const saveImages = (images: CarouselImage[]) => {
    setCarouselImages(images)
    localStorage.setItem('heroCarouselImages', JSON.stringify(images))
  }

  const handleImageUpload = (newImage: CarouselImage) => {
    const updatedImages = [...carouselImages, newImage]
    saveImages(updatedImages)
  }

  const handleImageDelete = (imageId: string) => {
    const updatedImages = carouselImages.filter(img => img.id !== imageId)
    saveImages(updatedImages)
  }

  const handleImageUpdate = (updatedImage: CarouselImage) => {
    const updatedImages = carouselImages.map(img => 
      img.id === updatedImage.id ? updatedImage : img
    )
    saveImages(updatedImages)
  }

  // Check if user is admin (you can modify this logic based on your admin setup)
  const isAdmin = user?.email === 'cibilbaiju@gmail.com' // Adjust this based on your admin logic

  return (
    <section className="w-full relative">
      {/* Admin controls */}
      {isAdmin && (
        <div className="absolute top-4 right-4 z-10">
          <Button
            onClick={() => setIsUploadModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Manage Images
          </Button>
        </div>
      )}

      <Carousel 
        className="w-full"
        plugins={[Autoplay({ delay: 5000, stopOnInteraction: false, })]}
        opts={{ loop: true }}
      >
        <CarouselContent>
          {carouselImages.map((image) => (
            <CarouselItem key={image.id}>
              <div className="relative w-full overflow-hidden transition-all">
                {/* Desktop/Tablet view - 16:9 aspect ratio */}
                <div className="hidden md:block w-full aspect-[16/9]">
                  <img src={image.desktopSrc} alt={image.alt} className="w-full h-full object-cover" />
                </div>
                
                {/* Mobile view - 9:16 aspect ratio */}
                <div className="block md:hidden w-full aspect-[9/16]">
                  <img src={image.mobileSrc} alt={image.alt} className="w-full h-full object-cover" />
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

      {/* Image Upload Modal */}
      <ImageUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        images={carouselImages}
        onImageUpload={handleImageUpload}
        onImageDelete={handleImageDelete}
        onImageUpdate={handleImageUpdate}
      />
    </section>
  )
}
