import { useMediaQuery } from "react-responsive";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import Logo from "./Logo";

function Header() {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width:1200px)",
  });
  return (
    <header className="sticky left-0 top-0 flex h-[72px] w-full flex-wrap items-center justify-between bg-light px-3 py-1 text-dark shadow shadow-dark transition-colors duration-300 dark:bg-dark dark:text-white dark:shadow-light md:px-4 lg:h-24 lg:py-[18px]">
      <Logo />
      {isDesktopOrLaptop ? <DesktopNav /> : <MobileNav />}
    </header>
  );
}

export default Header;
