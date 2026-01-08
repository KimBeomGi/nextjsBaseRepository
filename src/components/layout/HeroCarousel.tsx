"use client";

import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const HERO_SLIDES = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop",
    title: "New Season Arrivals",
    subtitle: "Discover the latest trends in fashion. Elevate your style today.",
    cta: "Shop Women",
    href: "/products/women",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?q=80&w=2071&auto=format&fit=crop",
    title: "Modern Men's Collection",
    subtitle: "Sophisticated styles for the contemporary man.",
    cta: "Shop Men",
    href: "/products/men",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?q=80&w=2193&auto=format&fit=crop",
    title: "Exclusive Accessories",
    subtitle: "Complete your look with our premium selection.",
    cta: "View Accessories",
    href: "/products/accessories",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop",
    title: "Summer Sale is On",
    subtitle: "Up to 50% off on selected items. Limited time only.",
    cta: "Shop Sale",
    href: "/products/all",
  },
];

export default function HeroCarousel() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);

  return (
    <section className="relative w-full h-[600px] md:h-[700px] overflow-hidden bg-black">
      <div className="overflow-hidden h-full" ref={emblaRef}>
        <div className="flex h-full">
          {HERO_SLIDES.map((slide) => (
            <div key={slide.id} className="relative flex-[0_0_100%] min-w-0 h-full">
              {/* Background Image */}
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover opacity-80"
                priority={slide.id === 1} // 첫 번째 이미지는 우선 로딩
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                  {slide.title}
                </h2>
                <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                  {slide.subtitle}
                </p>
                <div className="animate-in fade-in zoom-in duration-1000 delay-300">
                  <Button size="lg" className="rounded-full h-12 px-8 text-lg" asChild>
                    <Link href={slide.href}>{slide.cta}</Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
