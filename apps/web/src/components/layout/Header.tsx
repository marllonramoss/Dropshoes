
import { HeaderLogo } from "./Header/HeaderLogo";
import { HeaderDesktopNav } from "./Header/HeaderDesktopNav";
import { HeaderMenuMobile } from "./Header/HeaderMenuMobile";
import { HeaderCartButton } from "./Header/HeaderCartButton";
import { HeaderUserMenu } from "./Header/HeaderUserMenu";
import { HeaderSearchButton } from "./Header/HeaderSearchButton";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <HeaderMenuMobile />
            <HeaderLogo />
          </div>
          <HeaderDesktopNav />
          <div className="flex items-center gap-4">
            <HeaderSearchButton />
            <HeaderCartButton />
            <HeaderUserMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
