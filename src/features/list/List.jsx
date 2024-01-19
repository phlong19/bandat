// libs
import { useEffect } from "react";
import toast from "react-hot-toast";

// UI
import Spinner from "../../ui/Spinner";
import ErrorFallBack from "../../ui/ErrorFallBack";

// hooks & helpers & context
import { useListingPage } from "./useListingPage";
import { formatNumber } from "../../utils/helper";
import { purTypeFalse, purTypeTrue } from "../../constants/anyVariables";
import ListItem from "./ListItem";
import Map from "../../ui/Map";

function List({ purType }) {
  const { data, error, isLoading } = useListingPage(purType);

  // change page title
  useEffect(() => {
    const pageTitle = purType ? purTypeTrue : purTypeFalse;
    document.title = pageTitle;
  }, [purType]);

  if (isLoading) {
    return (
      <div className="absolute flex h-full w-full items-center justify-center bg-light dark:bg-dark">
        <Spinner inButton={false} width={50} height={50} />
      </div>
    );
  }

  if (error) {
    toast.error(error.message);
    return <ErrorFallBack />;
  }

  return (
    <div className="h-full justify-center px-2.5 sm:px-5 lg:flex lg:gap-5">
      {/* sider, mobile & tablet hidden */}
      <div className="hidden h-[500px] w-52 border border-red-700 lg:block"></div>
      {/* main content */}
      <div className="lg:w-[700px]">
        <h2 className="pb-4 pt-6 font-lexend text-xl font-medium">
          {`${purType ? "Mua bán" : "Cho thuê"} nhà đất trên toàn quốc`}
        </h2>
        {/* counter and filter */}
        <div className="flex items-center justify-between">
          <span className="inline-block">
            Có <span id="count-number">{formatNumber(data.length)}</span> bất
            động sản.
          </span>
          {/* filter here */}
          <div className="mr-2 w-1/3 bg-red-500">filter drop down</div>
        </div>

        {/* RE list */}
        <div className="mt-3 lg:space-y-6 space-y-4">
          {data.map((item) => (
            <ListItem key={item.id} data={item} purType={purType} />
          ))}
        </div>
      </div>
      {/* map, mobile hidden */}
      <Map /> 
    </div>
  );
}

export default List;
