"use client";
import { HeaderLogo } from "./Header/HeaderLogo";
import { HeaderDesktopNav } from "./Header/HeaderDesktopNav";
import { HeaderMenuMobile } from "./Header/HeaderMenuMobile";
import { HeaderCartButton } from "./Header/HeaderCartButton";
import { HeaderUserMenu } from "./Header/HeaderUserMenu";
import { useState } from "react";
import { HeaderSearchButton } from "./Header/HeaderSearchButton";
import { HeaderSearchBar } from "./Header/HeaderSearchBar";

export default function Header() {
  const [showSearchBar, setShowSearchBar] = useState(false);
  return (
    <>
      <header className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <HeaderMenuMobile />
              <HeaderLogo />
            </div>
            <HeaderDesktopNav />
            <div className="flex items-center gap-4">
              <div className="relative">
                <HeaderSearchButton onClick={() => setShowSearchBar(true)} />
                <HeaderSearchBar
                  open={showSearchBar}
                  onClose={() => setShowSearchBar(false)}
                />
              </div>
              <HeaderCartButton />
              <HeaderUserMenu />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
