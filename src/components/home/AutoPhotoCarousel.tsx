
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

// Pocket-sized images for a smooth horizontal strip (add more if desired)
const photos = [
  { src: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=200&h=200&fit=crop&q=80", alt: "Smart TV in modern living room" },
  { src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=200&h=200&fit=crop&q=80", alt: "Front Load Washing Machine" },
  { src: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=200&h=200&fit=crop&q=80", alt: "Microwave and kitchen" },
  { src: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=200&h=200&fit=crop&q=80", alt: "Refrigerator in kitchen" },
  // Repeating for longer run if needed
  { src: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=200&h=200&fit=crop&q=80", alt: "Smart TV repeat" },
  { src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=200&h=200&fit=crop&q=80", alt: "Washing Machine repeat" }
];

export function AutoPhotoCarousel() {
  return (
    <section className="w-full mb-4 py-2">
      <Carousel
        className="w-full max-w-5xl mx-auto"
        plugins={[
          Autoplay({
            delay: 1,         // ultra-short delay to enable "continuous" movement
            stopOnInteraction: false,
            stopOnMouseEnter: false,
            playOnInit: true
          }),
        ]}
        opts={{
          loop: true,
          speed: 5 // faster sliding, feel free to adjust for smoothness
        }}
      >
        <CarouselContent>
          {photos.map((image, idx) => (
            <CarouselItem
              key={idx}
              className="basis-auto flex-shrink-0 w-auto px-2"
              style={{ maxWidth: 104 }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-2 border-background shadow-md animate-fade-in"
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
