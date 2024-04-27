import {
  Box,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Text,
  IconButton,
  Flex,
  Tooltip,
} from "@chakra-ui/react";
import { useCallback, useMemo, useRef, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import { resizeMap } from "../../utils/reuse";
import { createPortal } from "react-dom";
import { AiOutlineClear } from "react-icons/ai";
import { TbLock, TbLockOpen } from "react-icons/tb";
import toast from "react-hot-toast";

function MapLocationPick({ position, setPosition }) {
  const [draggable, setDraggable] = useState(false);

  const [isReady, setIsReady] = useState(false);
  const mapRef = useRef(null);
  const id = useRef("map-reform");
  const classname = ".leaflet-control-zoom.leaflet-bar.leaflet-control";

  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d);
  }, []);

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
            className="relative h-[300px]"
            whenReady={() => {
              resizeMap(mapRef, id.current);
              setIsReady(true);
            }}
            center={[position?.lat || 16.363147, position?.long || 105.713807]}
            zoom={5}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {id.current &&
              position &&
              isReady &&
              createPortal(
                <Flex direction="column" bg="white">
                  <Tooltip label="Xóa tất cả đánh dấu">
                    <IconButton
                      minW={1}
                      boxSize="30px"
                      variant="solid"
                      zIndex={10000}
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        setPosition(null);
                        toast.success("Đã xóa vị trí lựa chọn");
                      }}
                      color="black"
                      rounded="none"
                      m={0}
                      icon={<AiOutlineClear />}
                    />
                  </Tooltip>
                  <Tooltip label="Mở / Khóa đánh dấu">
                    <IconButton
                      color="black"
                      borderTop="1px solid lightgrey"
                      minW={1}
                      boxSize="30px"
                      variant="solid"
                      zIndex={10000}
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        toggleDraggable();
                        toast.success(
                          !draggable
                            ? "Đã mở khóa, có thể kéo đánh dấu / chọn vị trí"
                            : "Đã khóa vị trí",
                        );
                      }}
                      rounded="none"
                      m={0}
                      icon={draggable ? <TbLockOpen /> : <TbLock />}
                    />
                  </Tooltip>
                </Flex>,
                document.querySelector(classname),
              )}
            <DraggableMarker
              position={position}
              setPosition={setPosition}
              draggable={draggable}
            />
          </MapContainer>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

export default MapLocationPick;

function DraggableMarker({ position, setPosition, draggable }) {
  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
        }
      },
    }),
    [setPosition],
  );

  const map = useMapEvents({
    click(e) {
      if (!position || draggable) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      }
    },
  });

  return position === null ? null : (
    <Marker
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
    >
      <Popup minWidth={90}>
        <span>
          {draggable
            ? "Có thể di chuyển, kéo đánh dấu"
            : "Đã khóa đánh dấu, mở khóa để di chuyển, kéo"}
        </span>
      </Popup>
    </Marker>
  );
}
