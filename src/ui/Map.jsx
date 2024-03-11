import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import ListItem from "../features/list/ListItem";

function Map({ data, purType }) {
  return (
    <MapContainer
      center={[21.028511, 105.804817]}
      zoom={8}
      className="h-full rounded-lg lg:w-[calc(100vw/2-85px)]"
      scrollWheelZoom={true}
      // a bit ugly code to set the width, but this is the only way to fix the map bug with animation
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {data.map((item, i) => (
        <Marker
          position={i == 0 ? [20.97455, 105.84436] : [21.029779, 105.810692]}
          key={i}
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
