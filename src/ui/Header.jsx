import { useMediaQuery } from "react-responsive";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import Logo from "./Logo";
import SpinnerFullPage from "./SpinnerFullPage";
import { navLinks as navLinksConstant } from "../constants/navlink";
import { useGetCategories } from "../hooks/useGetCategories";

function Header() {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width:1200px)",
  });
  let navLinks;

  const { categoryTree, isFetching } = useGetCategories();

  if (isFetching) {
    return <SpinnerFullPage />;
  }

  if (!categoryTree) {
    navLinks = navLinksConstant;
  } else {
    navLinks = categoryTree;
  }

  return (
    <header className="sticky left-0 top-0 z-[9999] flex h-[72px] w-[100vw] flex-wrap items-center justify-between bg-white px-3 py-1.5 text-dark transition-colors duration-300 dark:bg-darker dark:text-white md:px-4 lg:fixed">
      <Logo />
      {isDesktopOrLaptop ? <DesktopNav navLinks={navLinks} /> : <MobileNav />}
    </header>
  );
}

export default Header;
