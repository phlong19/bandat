// import { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";

// export function useCheckListPage() {
//   const location = useLocation();
//   const [isListingPage, setIsListingPage] = useState(false);
//   const { pathname } = location;

//   useEffect(() => {
//     pathname.includes("/nha-dat-") &&
//     // pathname.includes("/tin-da-luu") &&
//     !pathname.includes("/nguoi-dung/")
//       ? setIsListingPage(true)
//       : setIsListingPage(false);
//   }, [pathname]);

//   return isListingPage;
// }

// [DEPRECATED]