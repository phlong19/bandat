import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import ListItem from "../features/list/ListItem";
import { motion } from "framer-motion";

function Map({ data, purType }) {
  return (
    <motion.div
      initial={{ x: "500px", width: 0 }}
      animate={{ x: "0px", width: "100%" }}
      transition={{ duration: 0.5, type: "tween" }}
      exit={{ x: "500px", transition: { duration: 0.5 } }}
    >
      <MapContainer
        center={[51.505, -0.09]}
        zoom={8}
        className="h-[96%] lg:mt-8 lg:w-[calc(100vw/2-25px)]"
        scrollWheelZoom={true}
        // a bit ugly code to set the width, but this is the only way to fix the map bug with animation
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[20.97455, 105.84436]}>
          <Popup>
            <ListItem data={data} purType={purType} mapView={true} isPopup />
          </Popup>
        </Marker>
      </MapContainer>
    </motion.div>
  );
}

export default Map;
