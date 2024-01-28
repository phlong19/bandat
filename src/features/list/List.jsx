// libs
import React, { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

// UI
import Map from "../../ui/Map";
import SpinnerFullPage from "../../ui/SpinnerFullPage";
import ErrorFallBack from "../../ui/ErrorFallBack";
import ListItem from "./ListItem";
import SkewedToggle from "../../ui/SkewedToggle";

// hooks & helpers & context
import { useListingPage } from "./useListingPage";
import { formatNumber } from "../../utils/helper";
import { purTypeFalse, purTypeTrue } from "../../constants/anyVariables";
import Pagination from "../../ui/Pagination";
import { useMapView } from "../../context/MapViewContext";

function List({ purType, home = false }) {
  const { data, error, isLoading } = useListingPage(purType);
  const { mapView } = useMapView();

  // change page title
  useEffect(() => {
    const pageTitle = purType ? purTypeTrue : purTypeFalse;
    document.title = pageTitle;
  }, [purType]);

  if (isLoading) {
    return <SpinnerFullPage />;
  }

  if (error) {
    toast.error(error.message);
    return <ErrorFallBack />;
  }
console.log(data)
  return (
    <div className="relative h-full justify-center px-2.5 sm:px-5 lg:flex lg:gap-2">
      {/* sider, mobile & tablet hidden */}

      {/* main content */}
      <div
        className={`z-10 h-full w-full ${mapView ? " overflow-y-auto" : ""}`}
      >
        <h2 className="pb-4 pt-6 font-lexend text-xl font-medium">
          {`${purType ? "Mua bán" : "Cho thuê"} nhà đất trên toàn quốc`}
        </h2>
        {/* counter and filter */}
        <div className="flex items-center justify-between">
          <span className="inline-block">
            Có <span>{formatNumber(data.length)}</span> bất động sản.
          </span>
          {/* filter here */}
          <div className="mr-2 w-1/3 bg-red-500">filter drop down</div>
          {/* toggle grid & map views */}
          {!home && (
            <div className="hidden items-center gap-2 lg:flex">
              <span className="font-lexend text-xl font-semibold">Bản đồ:</span>
              <SkewedToggle />
            </div>
          )}
        </div>

        {/* RE list */}
        <div
          className={`${
            mapView ? "xl:gap-3" : "mx-auto max-w-[1400px] xl:gap-8"
          } mt-3 space-y-4 lg:flex lg:flex-wrap lg:gap-2 lg:space-y-0`}
        >
          {/* for development */}
          {Array.from({ length: 6 }).map((dt, i) => (
            <React.Fragment key={i}>
              {data.map((item) => (
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
        <Pagination count={data.count} />
      </div>
      <AnimatePresence mode="popLayout">
        {/* map, mobile hidden */}
        {mapView && !home && <Map data={data} purType={purType} />}
      </AnimatePresence>
    </div>
  );
}

export default List;
