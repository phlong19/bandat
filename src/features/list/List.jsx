// libs
import React, { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

// UI
import Map from "../../ui/Map";
import SpinnerFullPage from "../../ui/SpinnerFullPage";
import ErrorFallBack from "../../ui/ErrorFallBack";
import ListItem from "./ListItem";

// hooks & helpers & context
import { useListingPage } from "./useListingPage";
import { formatNumber } from "../../utils/helper";
import { purTypeFalse, purTypeTrue } from "../../constants/anyVariables";
import SkewedToggle from "../../ui/SkewedToggle";

function List({ purType }) {
  const { data, error, isLoading } = useListingPage(purType);
  const [mapView, setMapView] = useState(false);

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

  return (
    <div className="relative h-full justify-center px-2.5 sm:px-5 lg:flex lg:gap-2">
      {/* sider, mobile & tablet hidden */}

      {/* main content */}
      <div className="left-2.5 z-10 h-full w-full">
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
          <div className="hidden items-center gap-2 lg:flex">
            <span className="font-lexend text-xl font-semibold">Bản đồ:</span>
            <SkewedToggle onSetMapView={setMapView} />
          </div>
        </div>

        {/* RE list */}
        <div
          className={`${
            mapView ? "xl:gap-3" : "xl:gap-8"
          } mt-3 space-y-4 lg:flex lg:flex-wrap lg:gap-2 lg:space-y-0`}
        >
          {Array.from({ length: 3 }).map((dt, i) => (
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
        <div className="bottom-1 ml-auto mr-1.5 mt-3 h-8 w-1/3 bg-blue-500">
          phan trang o day
        </div>
      </div>
      <AnimatePresence mode="popLayout">
        {/* map, mobile hidden */}
        {mapView && <Map data={data[0]} purType={purType} />}
      </AnimatePresence>
    </div>
  );
}

export default List;
