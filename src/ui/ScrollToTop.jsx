import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { useMapView } from "../context/MapViewContext";

function ScrollToTop() {
  const location = useLocation();
  const { setMapView } = useMapView();

  // Scroll to top if path changes
  useLayoutEffect(() => {
    setMapView(false);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [location, setMapView]);

  return null;
}

export default ScrollToTop;
