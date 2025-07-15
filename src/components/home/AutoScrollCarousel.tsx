
import { useEffect, useRef } from "react";
import gsap from "gsap";

interface CarouselImage {
  src: string;
  alt: string;
  title: string;
}

const carouselImages: CarouselImage[] = [
  {
    src: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=300&fit=crop",
    alt: "Smart TV",
    title: "Sony 75\" OLED Smart TV"
  },
  {
    src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
    alt: "Dishwasher",
    title: "Bosch Series 8 Dishwasher"
  },
  {
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    alt: "Air Purifier",
    title: "Dyson Pure Cool Air Purifier"
  },
  {
    src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    alt: "Stand Mixer",
    title: "KitchenAid Stand Mixer"
  },
  {
    src: "https://images.unsplash.com/photo-1588200908342-23b585c03e26?w=400&h=300&fit=crop",
    alt: "Refrigerator",
    title: "Samsung Smart Refrigerator"
  },
  {
    src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    alt: "Washing Machine",
    title: "LG Front Load Washer"
  }
];

export const AutoScrollCarousel = () => {
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const images = carousel.querySelectorAll('.carousel-image');
    const totalWidth = images.length * 320; // 300px width + 20px gap

    // Create infinite scroll animation
    const animation = gsap.to(carousel, {
      x: -totalWidth / 2,
      duration: 20,
      ease: "none",
      repeat: -1,
    });

    return () => {
      animation.kill();
    };
  }, []);

  // Duplicate images for seamless loop
  const duplicatedImages = [...carouselImages, ...carouselImages];

  return (
    <div className="relative overflow-hidden py-8 bg-gradient-to-r from-gray-900/50 to-gray-800/50 rounded-lg">
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 pointer-events-none z-10"></div>
      
      <div
        ref={carouselRef}
        className="flex gap-5 will-change-transform"
        style={{ width: `${duplicatedImages.length * 320}px` }}
      >
        {duplicatedImages.map((image, index) => (
          <div
            key={`${image.src}-${index}`}
            className="carousel-image flex-shrink-0 relative group cursor-pointer"
            style={{ width: '300px', height: '200px' }}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105"
              draggable={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-4 left-4 text-white">
                <h4 className="font-semibold text-sm">{image.title}</h4>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="absolute top-4 left-4 text-white/80 text-sm font-medium">
        Latest Arrivals Gallery
      </div>
    </div>
  );
};
