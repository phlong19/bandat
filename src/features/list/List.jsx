// libs
import { useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { Switch } from "@chakra-ui/react";

// UI
import ListItem from "./ListItem";
import Searchbar from "../searchbar/Searchbar";
import Map from "../../ui/Map";
import ChakraTablePagination from "../../ui/ChakraTablePagination";

// hooks & helpers & context
import { formatNumber } from "../../utils/helper";
import { useMapView } from "../../context/MapViewContext";

function List({ purType, data, count }) {
  const { mapView, setMapView } = useMapView();

  const listAnimationControl = useAnimation();
  const mapAnimationControl = useAnimation();

  useEffect(() => {
    if (mapView) {
      // if true, animate the map sliding in and the list shrinking
      mapAnimationControl.start({
        display: "block",
        x: "0%",
        width: "46%",
        opacity: 1,
        transition: { duration: 0.5 },
      });
      listAnimationControl.start({
        width: "70%",
        transition: { duration: 0.5 },
      });
    } else {
      // if false, animate the map sliding out and the list expanding
      Promise.all([
        mapAnimationControl.start({
          x: "100%",
          width: 0,
          opacity: 0,
          transition: { duration: 0.5 },
        }),
        listAnimationControl
          .start({
            width: "100%",
            transition: { duration: 0.5 },
          })
          .then(() => mapAnimationControl.set({ display: "none" })),
      ]);
    }
  }, [mapView, mapAnimationControl, listAnimationControl]);

  return (
    <div className="relative h-full min-h-[80%] justify-center px-2.5 sm:px-4 lg:flex lg:gap-2">
      <AnimatePresence presenceAffectsLayout>
        <motion.div
          animate={listAnimationControl}
          className={`z-10 h-full min-h-[90dvh] w-full ${
            mapView ? "overflow-y-auto" : ""
          }`}
        >
          <div className="pt-4 md:pt-8">
            <Searchbar />
          </div>

          <h2 className="mx-auto max-w-[1500px] pt-3 font-lexend text-lg font-medium">
            {`${purType ? "Mua bán" : "Cho thuê"} nhà đất trên toàn quốc`}
          </h2>
          <div className="mx-auto flex max-w-[1500px] items-center justify-between">
            {/* counter */}
            <span className="inline-block text-sm">
              Có <span>{formatNumber(count)}</span> bất động sản.
            </span>

            {/* toggle grid & map views */}
            <div className="hidden items-center gap-2 lg:flex">
              <span className="font-lexend text-lg font-semibold">Bản đồ:</span>
              <Switch
                size="sm"
                onChange={() => setMapView((s) => !s)}
                isChecked={mapView}
                key={purType}
                colorScheme="green"
              />
            </div>
          </div>

          {/* RE list */}
          <motion.div
            className={`${
              mapView
                ? "lg:grid-cols-2 lg:gap-2 xl:grid-cols-3 xl:gap-2.5 3xl:grid-cols-4"
                : "mx-auto max-w-[1500px] lg:grid-cols-3 lg:gap-3 xl:grid-cols-4 xl:gap-5"
            } mt-3 space-y-4 lg:grid lg:space-y-0`}
          >
            {data.map((item) => (
              <ListItem key={item.id} data={item} purType={purType} />
            ))}
          </motion.div>
          <ChakraTablePagination count={count} />
        </motion.div>

        {/* map, mobile hidden */}
        <motion.div
          key="map"
          initial={{ x: "100%", width: 0, opacity: 0, display: "none" }}
          animate={mapAnimationControl}
        >
          <Map data={data} purType={purType} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default List;
