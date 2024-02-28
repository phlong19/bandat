import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import ListItem from "../features/list/ListItem";

function Map({ data, purType }) {
  const [selectedMarker, setSelectedMarker] = useState(0);

  return (
    <MapContainer
      center={[16.363147, 105.713807]}
      zoom={7}
      className="h-full rounded-lg lg:w-[calc(100vw/2-85px)]"
      scrollWheelZoom={true} 
      // a bit ugly code to set the width, but this is the only way to fix the map bug with animation
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
