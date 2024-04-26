import {
  Box,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Text,
  Button,
} from "@chakra-ui/react";
import { useRef } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import { resizeMap } from "../../utils/reuse";

function MapLocationPick({ position, setPosition }) {
  const mapRef = useRef(null);
  const id = useRef("map-reform");

  return (
    <Accordion allowToggle w="full">
      <AccordionItem>
        <h2>
          <AccordionButton pl={1.5}>
            <Box as="span" fontSize="xs" flex="1" textAlign="left">
              <span className="text-primary dark:text-secondary">
                (Tùy chọn)
              </span>{" "}
              Vị trí trên bản đồ
              <Text fontSize="11px">
                Tự động tạo từ địa chỉ bởi hệ thống nếu bỏ qua
              </Text>
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel>
          <MapContainer
            id={id.current}
            ref={mapRef}
            className="h-[300px] relative"
            whenReady={() => resizeMap(mapRef, id.current)}
            center={[16.363147, 105.713807]}
            zoom={5}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Button colorScheme="green" right={0} m={2} position='absolute'>clear</Button>
            <LocationMarker position={position} setPosition={setPosition} />
          </MapContainer>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

export default MapLocationPick;

function LocationMarker({ position, setPosition }) {
  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
}
