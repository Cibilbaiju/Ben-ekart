
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const photos = [
  { src: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=1200&h=400&fit=crop&q=80", alt: "Smart TV in modern living room" },
  { src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=400&fit=crop&q=80", alt: "Front Load Washing Machine" },
  { src: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&h=400&fit=crop&q=80", alt: "Microwave and kitchen" },
  { src: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=1200&h=400&fit=crop&q=80", alt: "Refrigerator in kitchen" },
];

export function AutoPhotoCarousel() {
  return (
    <section className="w-full mb-8">
      <Carousel 
        className="w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-lg bg-card"
        plugins={[Autoplay({ delay: 3600, stopOnInteraction: false })]}
        opts={{ loop: true }}
      >
        <CarouselContent>
          {photos.map((image, idx) => (
            <CarouselItem key={idx}>
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-[280px] md:h-[360px] object-cover"
                loading="lazy"
                draggable={false}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}

export default AutoPhotoCarousel;
