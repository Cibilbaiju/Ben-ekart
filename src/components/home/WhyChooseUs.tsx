
import { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Truck, HeadphonesIcon, Award } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Shield,
    title: "5-Year Warranty",
    description: "Comprehensive protection on all premium appliances with extended warranty coverage.",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Truck,
    title: "Free Delivery",
    description: "Complimentary delivery and installation on orders over $500. Professional setup included.",
    color: "from-green-500 to-green-600",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description: "Round-the-clock customer service with expert technicians ready to assist you.",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: Award,
    title: "Certified Quality",
    description: "All products undergo rigorous testing and come with industry-leading certifications.",
    color: "from-orange-500 to-orange-600",
  },
];

export const WhyChooseUs = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(titleRef.current, { opacity: 0, y: 50 });
      gsap.set(featuresRef.current, { opacity: 0, scale: 0.5, rotation: 10 });

      // Title animation
      gsap.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      // Features animation with bounce effect
      gsap.to(featuresRef.current, {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "elastic.out(1, 0.5)",
        scrollTrigger: {
          trigger: featuresRef.current[0],
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none reverse"
        }
      });

      // Advanced hover animations
      featuresRef.current.forEach((feature, index) => {
        if (feature) {
          const icon = feature.querySelector('.feature-icon');
          const content = feature.querySelector('.feature-content');
          
          feature.addEventListener('mouseenter', () => {
            gsap.to(feature, {
              y: -15,
              scale: 1.05,
              duration: 0.4,
              ease: "power2.out"
            });
            gsap.to(icon, {
              scale: 1.2,
              rotation: 10,
              duration: 0.3,
              ease: "back.out(1.7)"
            });
            gsap.to(content, {
              y: -5,
              duration: 0.3,
              ease: "power2.out"
            });
          });

          feature.addEventListener('mouseleave', () => {
            gsap.to(feature, {
              y: 0,
              scale: 1,
              duration: 0.4,
              ease: "power2.out"
            });
            gsap.to(icon, {
              scale: 1,
              rotation: 0,
              duration: 0.3,
              ease: "power2.out"
            });
            gsap.to(content, {
              y: 0,
              duration: 0.3,
              ease: "power2.out"
            });
          });
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Why Choose HomeHaven?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're committed to providing exceptional service and premium quality products that exceed your expectations
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={feature.title} 
              ref={(el) => el && (featuresRef.current[index] = el)}
              className="text-center border-0 shadow-lg overflow-hidden group cursor-pointer"
            >
              <CardContent className="p-8 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50/50 opacity-90"></div>
                <div className="feature-content relative z-10">
                  <div className={`feature-icon bg-gradient-to-br ${feature.color} rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                    <feature.icon className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-4 text-xl">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
