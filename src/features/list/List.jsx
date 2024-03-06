// libs
import { useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { Switch } from "@chakra-ui/react";

// UI
import ListItem from "./ListItem";
import Searchbar from "../searchbar/Searchbar";
import Map from "../../ui/Map";
import SpinnerFullPage from "../../ui/SpinnerFullPage";
import ChakraTablePagination from "../../ui/ChakraTablePagination";

// hooks & helpers & context
import { useListingPage } from "./useListingPage";
import { formatNumber } from "../../utils/helper";
import { purTypeFalse, purTypeTrue } from "../../constants/anyVariables";
import { useMapView } from "../../context/MapViewContext";

function List({ purType }) {
  const { data, count, isLoading } = useListingPage(purType);
  const { mapView, setMapView } = useMapView();

  const listAnimationControl = useAnimation();
  const mapAnimationControl = useAnimation();

  // change page title
  useEffect(() => {
    const pageTitle = purType ? purTypeTrue : purTypeFalse;
    document.title = pageTitle;
  }, [purType]);

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

  if (isLoading) {
    return <SpinnerFullPage />;
  }

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

          <h2 className="pb-4 pt-3 font-lexend text-xl font-medium xl:text-2xl">
            {`${purType ? "Mua bán" : "Cho thuê"} nhà đất trên toàn quốc`}
          </h2>
          <div className="flex items-center justify-between">
            {/* counter */}
            <span className="inline-block text-base lg:text-lg">
              Có <span>{formatNumber(count)}</span> bất động sản.
            </span>

            {/* toggle grid & map views */}
            <div className="hidden items-center gap-2 lg:flex">
              <span className="font-lexend text-xl font-semibold">Bản đồ:</span>
              <Switch
                onChange={() => setMapView((s) => !s)}
                checked={mapView}
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
