import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export function useCheckListPage() {
  const location = useLocation();
  const [isListingPage, setIsListingPage] = useState(false);

  useEffect(() => {
    location.pathname.includes("/nha-dat-") &&
    !location.pathname.includes("/nguoi-dung/")
      ? setIsListingPage(true)
      : setIsListingPage(false);
  }, [location]);

  return isListingPage;
}
