
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

interface CategoryHeroCarouselProps {
  images: { src: string; alt: string }[];
}

export const CategoryHeroCarousel: React.FC<CategoryHeroCarouselProps> = ({ images }) => (
  <section className="w-full mb-8">
    <Carousel
      className="w-full"
      opts={{ loop: true }}
      plugins={[Autoplay({ delay: 3000, stopOnMouseEnter: true, stopOnInteraction: false })]}
    >
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div className="w-full aspect-[16/5] md:aspect-[16/6] lg:aspect-[16/5] overflow-hidden rounded-xl">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
                draggable={false}
              />
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
);
