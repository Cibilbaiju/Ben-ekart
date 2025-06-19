
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Refs for animations
  const heroRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const contactInfoRef = useRef<HTMLDivElement>(null);
  const liveChatRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const floatingElementsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero section animation
      if (heroRef.current) {
        const heroTitle = heroRef.current.querySelector('h1');
        const heroSubtitle = heroRef.current.querySelector('p');
        
        gsap.set([heroTitle, heroSubtitle], { opacity: 0, y: 80 });
        
        const heroTl = gsap.timeline();
        heroTl.to(heroTitle, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out"
        })
        .to(heroSubtitle, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out"
        }, "-=0.6");

        // Background gradient animation
        gsap.to(heroRef.current, {
          backgroundPosition: "200% center",
          duration: 20,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut"
        });
      }

      // Form animation
      if (formRef.current) {
        gsap.set(formRef.current, { opacity: 0, x: -100, rotationY: -15 });
        gsap.to(formRef.current, {
          opacity: 1,
          x: 0,
          rotationY: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        });

        // Form inputs animation
        const inputs = formRef.current.querySelectorAll('input, textarea');
        inputs.forEach((input, index) => {
          input.addEventListener('focus', () => {
            gsap.to(input, {
              scale: 1.02,
              boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)",
              duration: 0.3,
              ease: "power2.out"
            });
          });

          input.addEventListener('blur', () => {
            gsap.to(input, {
              scale: 1,
              boxShadow: "none",
              duration: 0.3,
              ease: "power2.out"
            });
          });
        });
      }

      // Contact info cards animation
      if (contactInfoRef.current) {
        const cards = contactInfoRef.current.querySelectorAll('.contact-card');
        gsap.set(cards, { opacity: 0, y: 60, rotationX: 15 });
        
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contactInfoRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        });

        // Hover animations for contact cards
        cards.forEach((card) => {
          const icon = card.querySelector('.contact-icon');
          
          card.addEventListener('mouseenter', () => {
            gsap.to(card, {
              y: -10,
              scale: 1.03,
              boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
              duration: 0.4,
              ease: "power2.out"
            });
            gsap.to(icon, {
              rotation: 360,
              scale: 1.1,
              duration: 0.6,
              ease: "back.out(1.7)"
            });
          });

          card.addEventListener('mouseleave', () => {
            gsap.to(card, {
              y: 0,
              scale: 1,
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              duration: 0.4,
              ease: "power2.out"
            });
            gsap.to(icon, {
              rotation: 0,
              scale: 1,
              duration: 0.4,
              ease: "power2.out"
            });
          });
        });
      }

      // Live chat card animation
      if (liveChatRef.current) {
        gsap.set(liveChatRef.current, { opacity: 0, scale: 0.8, rotation: -5 });
        gsap.to(liveChatRef.current, {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1,
          ease: "elastic.out(1, 0.5)",
          scrollTrigger: {
            trigger: liveChatRef.current,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse"
          }
        });

        // Floating animation for live chat
        gsap.to(liveChatRef.current, {
          y: -8,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut"
        });
      }

      // FAQ animation
      if (faqRef.current) {
        const faqItems = faqRef.current.querySelectorAll('.faq-item');
        gsap.set(faqItems, { opacity: 0, x: 50 });
        
        gsap.to(faqItems, {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: faqRef.current,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse"
          }
        });
      }

      // Floating elements animation
      floatingElementsRef.current.forEach((element, index) => {
        if (element) {
          gsap.set(element, { opacity: 0, scale: 0 });
          gsap.to(element, {
            opacity: 0.7,
            scale: 1,
            duration: 1,
            delay: index * 0.3,
            ease: "back.out(1.7)"
          });

          gsap.to(element, {
            y: -20,
            x: Math.sin(index) * 15,
            duration: 3 + index,
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut"
          });
        }
      });

    }, [formRef, contactInfoRef, liveChatRef, faqRef, heroRef]);

    return () => ctx.revert();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    // Simulate form submission with success animation
    setTimeout(() => {
      // Success animation
      if (formRef.current) {
        gsap.to(formRef.current, {
          scale: 1.02,
          duration: 0.2,
          yoyo: true,
          repeat: 1,
          ease: "power2.out"
        });
      }

      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you within 24 hours.",
      });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
      setIsSubmitting(false);
    }, 1000);
  };

  const handleLiveChat = () => {
    // Animate button click
    if (liveChatRef.current) {
      const button = liveChatRef.current.querySelector('button');
      if (button) {
        gsap.to(button, {
          scale: 0.95,
          duration: 0.1,
          yoyo: true,
          repeat: 1,
          ease: "power2.out"
        });
      }
    }

    toast({
      title: "Live Chat Started",
      description: "Connecting you with our support team...",
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      {/* Floating background elements */}
      <div ref={(el) => el && (floatingElementsRef.current[0] = el)} className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-xl"></div>
      <div ref={(el) => el && (floatingElementsRef.current[1] = el)} className="absolute top-40 right-20 w-48 h-48 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-full blur-xl"></div>
      <div ref={(el) => el && (floatingElementsRef.current[2] = el)} className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-xl"></div>

      {/* Hero Section */}
      <section ref={heroRef} className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
            Contact Us
          </h1>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            We're here to help with all your appliance needs. Get in touch and let's create something amazing together.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div ref={formRef}>
            <Card className="bg-gray-800/80 backdrop-blur-sm border-gray-700 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-3xl text-white mb-2">Send us a Message</CardTitle>
                <p className="text-gray-300">
                  Fill out the form below and we'll get back to you within 24 hours
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-gray-200">First Name *</Label>
                      <Input 
                        id="firstName" 
                        placeholder="John" 
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="bg-gray-700/80 border-gray-600 text-white placeholder:text-gray-400 transition-all duration-300"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-gray-200">Last Name *</Label>
                      <Input 
                        id="lastName" 
                        placeholder="Doe" 
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="bg-gray-700/80 border-gray-600 text-white placeholder:text-gray-400 transition-all duration-300"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="text-gray-200">Email *</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="john@example.com" 
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="bg-gray-700/80 border-gray-600 text-white placeholder:text-gray-400 transition-all duration-300"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone" className="text-gray-200">Phone Number</Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      placeholder="+1 (555) 123-4567" 
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="bg-gray-700/80 border-gray-600 text-white placeholder:text-gray-400 transition-all duration-300"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="subject" className="text-gray-200">Subject</Label>
                    <Input 
                      id="subject" 
                      placeholder="How can we help you?" 
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="bg-gray-700/80 border-gray-600 text-white placeholder:text-gray-400 transition-all duration-300"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="message" className="text-gray-200">Message *</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Tell us more about your inquiry..."
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      className="bg-gray-700/80 border-gray-600 text-white placeholder:text-gray-400 transition-all duration-300"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transform transition-all duration-300 hover:scale-105 shadow-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <div ref={contactInfoRef}>
              <Card className="contact-card bg-gray-800/80 backdrop-blur-sm border-gray-700 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-3xl text-white mb-2">Get in Touch</CardTitle>
                  <p className="text-gray-300">
                    Multiple ways to reach our customer service team
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="contact-icon bg-gradient-to-br from-blue-500 to-blue-600 rounded-full p-3 shadow-lg">
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-lg">Call Us</h3>
                      <p className="text-gray-300">1-800-APPLIANCE</p>
                      <p className="text-sm text-gray-400">Toll-free customer service</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="contact-icon bg-gradient-to-br from-green-500 to-green-600 rounded-full p-3 shadow-lg">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-lg">Email Us</h3>
                      <p className="text-gray-300">support@homehaven.com</p>
                      <p className="text-sm text-gray-400">We'll respond within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="contact-icon bg-gradient-to-br from-purple-500 to-purple-600 rounded-full p-3 shadow-lg">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-lg">Visit Us</h3>
                      <p className="text-gray-300">123 Appliance Street<br />Tech City, TC 12345</p>
                      <p className="text-sm text-gray-400">Main showroom location</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="contact-icon bg-gradient-to-br from-orange-500 to-orange-600 rounded-full p-3 shadow-lg">
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-lg">Business Hours</h3>
                      <p className="text-gray-300">
                        Mon-Fri: 8:00 AM - 8:00 PM<br />
                        Sat-Sun: 9:00 AM - 6:00 PM
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Live Chat Card */}
            <div ref={liveChatRef}>
              <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white shadow-2xl transform">
                <CardContent className="p-8 text-center">
                  <MessageCircle className="h-16 w-16 mx-auto mb-4" />
                  <h3 className="text-2xl font-semibold mb-2">Need Immediate Help?</h3>
                  <p className="mb-6 opacity-90">
                    Chat with our support team for instant assistance
                  </p>
                  <Button 
                    className="bg-white text-green-600 hover:bg-gray-100 font-semibold px-8 py-3 rounded-lg transform transition-all duration-300 hover:scale-105 shadow-lg"
                    onClick={handleLiveChat}
                  >
                    Start Live Chat
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* FAQ Card */}
            <div ref={faqRef}>
              <Card className="bg-gray-800/80 backdrop-blur-sm border-gray-700 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-white text-2xl">Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="faq-item">
                      <h4 className="font-semibold text-white text-lg mb-2">What's your return policy?</h4>
                      <p className="text-gray-300">30-day returns on all items in original condition</p>
                    </div>
                    <div className="faq-item">
                      <h4 className="font-semibold text-white text-lg mb-2">Do you offer installation?</h4>
                      <p className="text-gray-300">Yes, professional installation is available for most appliances</p>
                    </div>
                    <div className="faq-item">
                      <h4 className="font-semibold text-white text-lg mb-2">How long is the warranty?</h4>
                      <p className="text-gray-300">All appliances come with manufacturer warranty plus our 5-year extended warranty</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
