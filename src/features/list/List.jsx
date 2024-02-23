// libs
import React, { useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";

// UI
import ListItem from "./ListItem";
import Searchbar from "../searchbar/Searchbar";
import Map from "../../ui/Map";
import SpinnerFullPage from "../../ui/SpinnerFullPage";
import SkewedToggle from "../../ui/SkewedToggle";
import ChakraTablePagination from "../../ui/ChakraTablePagination";

// hooks & helpers & context
import { useListingPage } from "./useListingPage";
import { formatNumber } from "../../utils/helper";
import { purTypeFalse, purTypeTrue } from "../../constants/anyVariables";
import { useMapView } from "../../context/MapViewContext";

function List({ purType }) {
  const { data, isLoading } = useListingPage(purType);
  const { mapView } = useMapView();

  const listAnimationControl = useAnimation();
  const mapAnimationControl = useAnimation();

  // change page title
  useEffect(() => {
    const pageTitle = purType ? purTypeTrue : purTypeFalse;
    document.title = pageTitle;
  }, [purType]);
  // TODO: fix exit animation
  useEffect(() => {
    if (mapView) {
      // if true, animate the map sliding in and the list shrinking
      mapAnimationControl.start({
        x: "0%",
        width: "46%",
        opacity: 1,
        transition: { duration: 0.5 },
      });
      listAnimationControl.start({
        width: "80%",
        transition: { duration: 0.5 },
      });
    } else {
      // if false, animate the map sliding out and the list expanding
      mapAnimationControl.start({
        x: "100%",
        opacity: 0,
        transition: { duration: 0.5 },
      });
      listAnimationControl
        .start({ width: "100%", transition: { duration: 0.5 } })
        .then(() => {
          mapAnimationControl.set({ width: 0 });
        });
    }
  }, [mapView, mapAnimationControl, listAnimationControl]);

  if (isLoading) {
    return <SpinnerFullPage />;
  }

  const list = data.data || [];

  return (
    <div className="relative h-full justify-center px-2.5 sm:px-5 lg:flex lg:gap-2">
      {/* main content */}
      <AnimatePresence presenceAffectsLayout>
        <motion.div
          animate={listAnimationControl}
          className={`z-10 h-full min-h-[90dvh] w-full ${
            mapView ? "overflow-y-auto" : ""
          }`}
        >
          <div className="pt-4">
            <Searchbar />
          </div>

          <h2 className="pb-4 pt-3 font-lexend text-xl font-medium xl:text-2xl">
            {`${purType ? "Mua bán" : "Cho thuê"} nhà đất trên toàn quốc`}
          </h2>
          <div className="flex items-center justify-between">
            {/* counter */}
            <span className="inline-block text-base lg:text-lg">
              Có <span>{formatNumber(list.length)}</span> bất động sản.
            </span>

            {/* toggle grid & map views */}
            <div className="hidden items-center gap-2 lg:flex">
              <span className="font-lexend text-xl font-semibold">Bản đồ:</span>
              <SkewedToggle />
            </div>
          </div>

          {/* RE list */}
          <div
            className={`${
              mapView
                ? "lg:grid-cols-2 lg:gap-2 xl:grid-cols-3 xl:gap-2.5 3xl:grid-cols-4"
                : "mx-auto max-w-[1400px] lg:grid-cols-3 lg:gap-3 xl:grid-cols-4 xl:gap-6"
            } mt-3 space-y-4 lg:grid lg:space-y-0`}
          >
            {/* for development */}
            {Array.from({ length: 4 }).map((dt, i) => (
              <React.Fragment key={i}>
                {list.map((item) => (
                  <ListItem
                    key={item.id}
                    data={item}
                    purType={purType}
                    mapView={mapView}
                  />
                ))}
              </React.Fragment>
            ))}
          </div>
          {/* total count later */}
          <ChakraTablePagination count={data.count} />
        </motion.div>

        {/* map, mobile hidden */}
        {mapView && (
          <motion.div
            key="map"
            initial={{ x: "100%", width: 0, opacity: 0 }}
            animate={mapAnimationControl}
          >
            <Map data={list} purType={purType} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default List;
