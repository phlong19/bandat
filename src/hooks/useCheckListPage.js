import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export function useCheckListPage() {
  const location = useLocation();
  const [isListingPage, setIsListingPage] = useState(false);

  useEffect(() => {
    // console.log(location.pathname.includes("/nha-dat-"));
    location.pathname.includes("/nha-dat-")
      ? setIsListingPage(true)
      : setIsListingPage(false);
  }, [location]);

  return isListingPage;
}
