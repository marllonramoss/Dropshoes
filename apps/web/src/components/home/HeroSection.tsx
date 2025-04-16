"use client";

import React from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

interface HeroSlide {
  title: string;
  description: string;
  image: string;
  primaryButton: {
    text: string;
    href: string;
  };
  secondaryButton: {
    text: string;
    href: string;
  };
}

const heroSlides: HeroSlide[] = [
  {
    title: "Estilo e Conforto para seus Passos",
    description:
      "Descubra nossa nova coleção de tênis, combinando design moderno com materiais sustentáveis e tecnologia de ponta.",
    image:
      "https://images.pexels.com/photos/8859171/pexels-photo-8859171.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    primaryButton: {
      text: "Comprar Agora",
      href: "/products",
    },
    secondaryButton: {
      text: "Ver Coleções",
      href: "/collections",
    },
  },
  {
    title: "Nova Coleção Esportiva",
    description:
      "Performance e estilo unidos em uma linha exclusiva para atletas e entusiastas.",
    image:
      "https://images.pexels.com/photos/7462557/pexels-photo-7462557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    primaryButton: {
      text: "Explorar Coleção",
      href: "/collections/sports",
    },
    secondaryButton: {
      text: "Saiba Mais",
      href: "/about",
    },
  },
  {
    title: "Edição Limitada",
    description:
      "Conheça nossa linha exclusiva de tênis em colaboração com artistas locais.",
    image:
      "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    primaryButton: {
      text: "Ver Edição Limitada",
      href: "/collections/limited",
    },
    secondaryButton: {
      text: "Sobre a Colaboração",
      href: "/collaborations",
    },
  },
  {
    title: "Sustentabilidade em Foco",
    description:
      "Descubra nossa linha eco-friendly, produzida com materiais reciclados e processos sustentáveis.",
    image:
      "https://images.pexels.com/photos/6412694/pexels-photo-6412694.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    primaryButton: {
      text: "Comprar Eco",
      href: "/collections/eco",
    },
    secondaryButton: {
      text: "Nossa Missão",
      href: "/sustainability",
    },
  },
];

export function HeroSection() {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      className="h-[calc(100vh-64px)] w-full relative overflow-hidden"
      pagination={{
        el: ".swiper-pagination",
        type: "bullets",
        clickable: true,
        bulletActiveClass: "swiper-pagination-bullet-active bg-white",
      }}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      loop
    >
      <div className="swiper-pagination absolute bottom-6 left-0 right-0 z-20"></div>
      {heroSlides.map((slide, index) => (
        <SwiperSlide key={index}>
          <section
            className="relative bg-cover bg-center h-full w-full flex items-center overflow-hidden"
            style={{ backgroundImage: `url("${slide.image}")` }}
          >
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="max-w-2xl mx-auto text-center">
                <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
                  {slide.title}
                </h1>
                <p className="mt-4 text-xl text-zinc-100">
                  {slide.description}
                </p>
                <div className="mt-8 space-x-4 flex justify-center">
                  <Link
                    href={slide.primaryButton.href}
                    className="inline-block bg-zinc-950 text-white px-6 py-3 rounded-md hover:bg-zinc-900 transition-colors"
                  >
                    {slide.primaryButton.text}
                  </Link>
                  <Link
                    href={slide.secondaryButton.href}
                    className="inline-block bg-white text-zinc-950 border border-white px-6 py-3 rounded-md hover:bg-zinc-100 transition-colors"
                  >
                    {slide.secondaryButton.text}
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
