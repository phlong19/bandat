import { createContext, useContext, useState } from "react";

const MapContext = createContext();

function MapView({ children }) {
  const [mapView, setMapView] = useState(false);
  
  return (
    <MapContext.Provider value={{ mapView, setMapView }}>
      {children}
    </MapContext.Provider>
  );
}

function useMapView() {
  const context = useContext(MapContext);
  if (context === undefined)
    throw new Error("Context has been using outside provider");
  return context;
}

export { MapView, useMapView };
