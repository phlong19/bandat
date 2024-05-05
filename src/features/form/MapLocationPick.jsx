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
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { resizeMap } from "../../utils/reuse";
import { createPortal } from "react-dom";
import { AiOutlineClear } from "react-icons/ai";
import {
  Tb360,
  TbEyeOff,
  TbEyeSearch,
  TbLock,
  TbLockOpen,
} from "react-icons/tb";
import toast from "react-hot-toast";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import "leaflet-geosearch/dist/geosearch.css";

function MapLocationPick({ position, setPosition, edit }) {
  const [draggable, setDraggable] = useState(false);
  const originalPosition = useRef(edit ? position : null);
  const [isReady, setIsReady] = useState(false);
  const [show, setShow] = useState(true);
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
              isReady &&
              createPortal(
                <Flex direction="column">
                  <ControlIconButton
                    border={false}
                    label={`${show ? "Ẩn" : "Hiển thị"} thanh tìm kiếm`}
                    icon={show ? <TbEyeSearch /> : <TbEyeOff />}
                    onClick={() => setShow((s) => !s)}
                  />
                  {position && (
                    <>
                      <ControlIconButton
                        label="Xóa tất cả đánh dấu"
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          setPosition(null);
                          toast.success("Đã xóa vị trí lựa chọn");
                        }}
                        icon={<AiOutlineClear />}
                      />
                      <ControlIconButton
                        onClick={() => {
                          toggleDraggable();
                          toast.success(
                            !draggable
                              ? "Đã mở khóa, có thể kéo đánh dấu / chọn vị trí"
                              : "Đã khóa vị trí",
                          );
                        }}
                        label={`${!draggable ? "Mở" : "Khóa"} đánh dấu`}
                        icon={draggable ? <TbLockOpen /> : <TbLock />}
                      />
                    </>
                  )}
                  {edit && (
                    <ControlIconButton
                      label="Đặt lại vị trí"
                      onClick={() => {
                        setPosition(originalPosition.current);
                        toast.success("Đã đặt lại vị trí về ban đầu");
                      }}
                      icon={<Tb360 />}
                    />
                  )}
                </Flex>,
                document.querySelector(classname),
              )}
            {show && <SearchButton />}
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

function ControlIconButton({ onClick, icon, label, border = true }) {
  return (
    <Tooltip label={label}>
      <IconButton
        bg="white"
        minW={1}
        boxSize="30px"
        variant="solid"
        borderTop={border && "1px solid lightgrey"}
        zIndex={10000}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          onClick();
        }}
        _hover={{ bg: "#f4f4f4" }}
        color="black"
        rounded="none"
        m={0}
        icon={icon}
      />
    </Tooltip>
  );
}

function SearchButton() {
  const provider = useMemo(() => new OpenStreetMapProvider(), []);
  const searchControl = useMemo(
    () =>
      new GeoSearchControl({
        provider,
        style: "bar",
        autoComplete: true,
        autoCompleteDelay: 250,
        showMarker: false,
        searchLabel: "Nhập địa chỉ tìm kiếm",
      }),
    [provider],
  );

  const map = useMap();

  useEffect(() => {
    map.addControl(searchControl);

    return () => map.removeControl(searchControl);
  }, [map, searchControl]);

  return null;
}
