"use client";
import React, { useRef, useEffect } from "react";

export function NightHeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5; // Deixa o vídeo mais lento
    }
  }, []);
  return (
    <section className="w-screen h-screen min-h-[400px] flex items-center justify-center relative overflow-hidden">
      {/* Vídeo de fundo */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover object-center z-0"
        src="/night-shoes/jordan_video.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      {/* Gradiente preto apenas na parte inferior para esconder a marca d'água */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 w-full h-2/3 z-10"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.96) 0px, rgba(0,0,0,0.82) 80px, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.15) 70%, transparent 100%)",
        }}
      />
      <div className="relative z-20 flex flex-col items-center justify-center gap-4">
        <div className="flex flex-col items-center">
          <span
            className="text-5xl md:text-7xl font-black tracking-tight drop-shadow-2xl text-center select-none leading-none uppercase"
            style={{ letterSpacing: "0.05em" }}
          >
            <span className="text-white">Night</span>
            <span className="text-white"> Shoes</span>
          </span>
          <span
            className="text-white/80 text-lg md:text-2xl font-light tracking-widest text-center select-none mt-2 md:mt-4 uppercase"
            style={{ letterSpacing: "0.3em", fontFamily: "serif" }}
          >
            Collection
          </span>
        </div>
        {/* Botão arrow down */}
        <a
          href="#sobre-colecao"
          className="flex items-center justify-center"
          tabIndex={-1}
          aria-label="Scroll Down"
          onClick={(e) => {
            e.preventDefault();
            const section = document.getElementById("sobre-colecao");
            if (section) {
              section.scrollIntoView({ behavior: "smooth" });
            }
          }}
        >
          <div className="group flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-white/30 bg-white/5 hover:scale-110 transition-all duration-300 cursor-pointer shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 48 48"
              className="w-9 h-9 md:w-12 md:h-12 text-white drop-shadow-lg"
            >
              <circle cx="24" cy="24" r="22" fill="none" />
              <path
                d="M16 22l8 8 8-8"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </a>
      </div>
    </section>
  );
}
