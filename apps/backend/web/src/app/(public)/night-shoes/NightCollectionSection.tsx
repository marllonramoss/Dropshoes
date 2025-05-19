"use client";
import React from "react";

export function NightCollectionSection() {
  return (
    <section
      id="sobre-colecao"
      className="w-screen h-screen min-h-[400px] flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: "url('/night-shoes/nike sport night.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Overlay para contraste */}
      <div className="absolute inset-0 bg-black/60 z-10" />
      {/* Gradiente preto no topo para continuidade visual */}
      <div
        className="pointer-events-none absolute top-0 left-0 w-full h-2/3 z-20"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.96) 0px, rgba(0,0,0,0.82) 80px, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.15) 70%, transparent 100%)"
        }}
      />
      <div className="relative z-30 flex flex-col items-center justify-center max-w-2xl px-6 text-center gap-6">
        <h2 className="text-white text-4xl md:text-5xl font-bold tracking-tight drop-shadow-2xl mb-2 select-none uppercase">Sobre a Coleção</h2>
        <p className="text-white/90 text-lg md:text-2xl font-light drop-shadow-xl select-none">
          A coleção <span className="font-semibold text-white">Night Shoes</span> foi criada para quem busca estilo, conforto e exclusividade durante a noite. Nossos modelos combinam design arrojado, materiais premium e detalhes que brilham sob as luzes urbanas. Descubra o luxo e a sofisticação de caminhar com atitude onde quer que a noite te leve.
        </p>
        <a
          href="#"
          className="inline-block mt-6 px-8 py-3 border-2 border-white/80 rounded-full text-white text-base md:text-lg font-semibold uppercase tracking-widest bg-transparent hover:bg-white hover:text-black transition-all duration-300 shadow-md backdrop-blur-sm"
        >
          Ver produtos
        </a>
      </div>
    </section>
  );
}
