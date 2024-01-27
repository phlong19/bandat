import { useState } from "react";
import { rentSelectOptions, sellSelectOptions } from "../../constants/navlink";
import { useSearchbar } from "./useSearchbar";
import SpinnerFullPage from "../../ui/SpinnerFullPage";
import ErrorFallBack from "../../ui/ErrorFallBack";

import { city } from "../../constants/products";

function Searchbar() {
  const [purType, setPurType] = useState(true);
  const { data, isLoading,error } = useSearchbar();

  if (isLoading) {
    return <SpinnerFullPage />;
  }

  if(error){
    return <ErrorFallBack />
  }

  // console.log(data);
  
  return (
    <div className="mx-auto flex w-2/3 items-stretch justify-center gap-1">
      <div className="">
        {/* purType */}
        <select
          className="relative m-0 -mr-0.5 block w-[1px] min-w-0 max-w-28 flex-auto rounded border border-solid border-prim-light bg-light bg-clip-padding px-3 py-1 text-base font-normal leading-[1.6] text-black outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-black focus:shadow-prim-light focus:outline-none dark:border-sec-light dark:bg-dark dark:text-white dark:placeholder:text-white dark:focus:border-secondary focus:dark:text-white dark:focus:shadow-sec-light"
          name="purType"
          id="purType"
          onChange={(e) => setPurType(e.target.value === "true")}
        >
          <option value="true">Bán</option>
          <option value="false">Cho thuê</option>
        </select>
        {/* re type */}
        <select
          name="reType"
          id="reType"
          className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded border border-solid border-prim-light bg-light bg-clip-padding px-3 py-1 text-base font-normal leading-[1.6] text-black outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-black focus:shadow-prim-light focus:outline-none dark:border-sec-light dark:bg-dark dark:text-white dark:placeholder:text-white dark:focus:border-secondary focus:dark:text-white dark:focus:shadow-sec-light"
        >
          {purType
            ? sellSelectOptions.map((opt) => (
                <option value={opt.value} key={opt.value}>
                  {opt.title}
                </option>
              ))
            : rentSelectOptions.map((opt) => (
                <option value={opt.value} key={opt.value}>
                  {opt.title}
                </option>
              ))}
        </select>

        {/* search with btn */}
        <div className="md:w-96 lg:w-[400px]">
          <div className="relative flex w-full flex-wrap items-stretch">
            <input
              type="search"
              className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-prim-light bg-light bg-clip-padding px-3 py-1 text-base font-normal leading-[1.6] text-black outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-black focus:shadow-prim-light focus:outline-none dark:border-sec-light dark:bg-dark dark:text-white dark:placeholder:text-white dark:focus:border-secondary focus:dark:text-white dark:focus:shadow-sec-light"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="button-addon3"
            />

            {/* <!--Search button--> */}
            <button
              className="relative z-[2] rounded-r border-2 border-primary px-6 pt-0.5 text-sm font-medium uppercase text-black transition duration-200 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 dark:border-secondary dark:text-white dark:hover:bg-white dark:hover:bg-opacity-5"
              type="button"
              id="button-addon3"
            >
              Tìm kiếm
            </button>
          </div>
        </div>
        {/*  */}
        <div>
          <select name="city" id="city">
            {city.map((item) => (
              <option value={item.cityID} key={item.cityID}>
                {item.cityName}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default Searchbar;
