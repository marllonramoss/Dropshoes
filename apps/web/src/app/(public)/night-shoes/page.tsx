import React from "react";

const produtos = [
  { id: 1, nome: "Night Shoes Eclipse" },
  { id: 2, nome: "Night Shoes Nebula" },
  { id: 3, nome: "Night Shoes Galaxy" },
  { id: 4, nome: "Night Shoes Shadow" },
  { id: 5, nome: "Night Shoes Aurora" },
];

import { NightCollectionSection } from "./NightCollectionSection";
import { NightHeroSection } from "./NightHeroSection";

export default function NightShoesLanding() {
  return (
    <>
      <NightHeroSection />
      <NightCollectionSection />
    </>
  );
}
