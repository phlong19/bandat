import { useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import ListItem from "../features/list/ListItem";

function Map({ data, purType }) {
  const mapRef = useRef(null);
  const [selectedMarker, setSelectedMarker] = useState(0);

  return (
    <MapContainer
      id="map-container"
      center={[16.363147, 105.713807]}
      zoom={6}
      className="h-full rounded-lg lg:w-[calc(100vw/2-85px)]"
      scrollWheelZoom={true}
      ref={mapRef}
      whenReady={() => resizeMap(mapRef)}
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
            <ListItem data={item} purType={purType} mapView={true} isPopup />
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default Map;

// custom marker
const selectedIcon = new L.Icon({
  iconUrl: "./customMarker.png",
  iconSize: [30, 30],
});

const defaultIcon = new L.Icon({
  iconUrl: "./defaultIcon.png",
  iconSize: [20, 30],
});

function resizeMap(mapRef) {
  const resizeObserver = new ResizeObserver(() =>
    mapRef.current?.invalidateSize(),
  );
  const container = document.getElementById("map-container");
  if (container) {
    resizeObserver.observe(container);
  }
}
