
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

// A repetitive list to fill the strip, making it look endless.
// Each image is a small "pocket" photo.
const basePhotos = [
  { src: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=200&h=200&fit=crop&q=80", alt: "Smart TV in modern living room" },
  { src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=200&h=200&fit=crop&q=80", alt: "Front Load Washing Machine" },
  { src: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=200&h=200&fit=crop&q=80", alt: "Microwave and kitchen" },
  { src: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=200&h=200&fit=crop&q=80", alt: "Refrigerator in kitchen" },
];

// Duplicate base photos to lengthen the carousel
const photos = [
  ...basePhotos,
  ...basePhotos,
  ...basePhotos, // 3 cycles to ensure seamlessness
];

export function AutoPhotoCarousel() {
  return (
    <section className="w-full mb-4 py-2 select-none">
      <Carousel
        className="w-full max-w-5xl mx-auto"
        plugins={[
          Autoplay({
            delay: 1, // almost zero, fastest, feels 'continuous'
            stopOnInteraction: false,
            stopOnMouseEnter: false,
            playOnInit: true,
          }),
        ]}
        opts={{
          loop: true,
          // speed option removed, not supported by Embla
        }}
      >
        <CarouselContent>
          {photos.map((image, idx) => (
            <CarouselItem
              key={idx}
              className="basis-auto flex-shrink-0 w-auto px-0.5"
              style={{ maxWidth: 88 }} // ~22px borders + 66px img for even attachment
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-2 border-background shadow animate-fade-in"
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
