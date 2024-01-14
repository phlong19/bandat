import { useMediaQuery } from "react-responsive";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import Logo from "./Logo";

function Header() {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width:1200px)",
  });
  return (
    <header className="sticky left-0 top-0 z-[999] flex h-[72px] w-full flex-wrap items-center justify-between bg-white px-3 py-1 text-dark transition-colors duration-300 dark:bg-black dark:text-white md:px-4 lg:h-24 lg:py-[18px]">
      <Logo />
      {isDesktopOrLaptop ? <DesktopNav /> : <MobileNav />}
    </header>
  );
}

export default Header;
