import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import ReactDOM from "react-dom/client";
import L from "leaflet";
import ListItem from "../features/list/ListItem";
import ViewInMap from "./ViewInMap";
import { useMapView } from "../context/MapViewContext";
import { resizeMap } from "../utils/reuse";

function Map({ data, userpage }) {
  const { mapView } = useMapView();
  const mapRef = useRef(null);
  const [selectedMarker, setSelectedMarker] = useState(0);
  const mapRoot = useRef({});
  const id = useRef("map-container");

  useEffect(() => {
    const renderTimeout = setTimeout(() => {
      if (data?.length) {
        data.forEach((item) => {
          const container = document.querySelector(`#viewInMap${item.id}`);
          if (container !== null) {
            mapRoot.current[item.id] = ReactDOM.createRoot(container);
            mapRoot.current[item.id].render(
              <ViewInMap
                postID={item.id}
                onClick={() => {
                  setSelectedMarker(item.id);
                  // flyTo([lat,long],zoom)
                  mapRef.current.flyTo([item.lat, item.long], 13);
                }}
              />,
            );
          }
        });
      }
    });

    // clean up
    return () => {
      clearTimeout(renderTimeout);
      mapRoot.current = {};

      setTimeout(() => {
        Object.values(mapRoot.current).forEach((root) => root.unmount());
      });
    };
  }, [mapView, data]);

  return (
    <MapContainer
      id={id.current}
      center={[16.363147, 105.713807]}
      zoom={6}
      className={`h-full rounded-lg ${
        !userpage
          ? "lg:w-[calc(100vw/2-85px)]"
          : "xl:h-[77%] xl:w-[calc(100vw/2-155px)] 2xl:w-[calc(100vw/2-200px)]"
      }`}
      scrollWheelZoom={true}
      ref={mapRef}
      whenReady={() => resizeMap(mapRef, id.current)}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {data.map((item) => (
        <Marker
          position={[item.lat, item.long]}
          key={item.id}
          icon={selectedMarker === item.id ? selectedIcon : defaultIcon}
          eventHandlers={{
            click: () => setSelectedMarker(item.id),
          }}
        >
          <Popup>
            <ListItem
              data={item}
              purType={item.purType}
              mapView={true}
              isPopup
            />
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default Map;

// custom marker
const selectedIcon = new L.Icon({
  iconUrl: "/customMarker.png",
  iconSize: [30, 30],
});

const defaultIcon = new L.Icon({
  iconUrl: "/defaultIcon.png",
  iconSize: [20, 30],
});
