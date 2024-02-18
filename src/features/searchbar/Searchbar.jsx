import { useState } from "react";
import { areaOptions, navLinks } from "../../constants/navlink";
import { useSearchbar } from "./useSearchbar";
import ErrorFallBack from "../../ui/ErrorFallBack";

import Button from "../../ui/Button";
import { TbRefresh } from "react-icons/tb";
import { useSearchParams } from "react-router-dom";

function Searchbar() {
  const [purType, setPurType] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const arr = purType ? navLinks[0].child_links : navLinks[1].child_links;

  const { data, isLoading, error } = useSearchbar();

  function reset() {
    searchParams.delete("city");
    searchParams.delete("dis");
    searchParams.delete("ward");
    searchParams.delete("purType");
    searchParams.delete("reType");
    searchParams.delete("area");
    // dirty way
    document.querySelector("#purType").value = "none";
    document.querySelector("#reType").value = "none";
    document.querySelector("#city").value = "none";
    document.querySelector("#dis").value = "none";
    document.querySelector("#ward").value = "none";
    document.querySelector("#area").value = "all";

    setSearchParams(searchParams);
  }

  if (error) {
    return <ErrorFallBack home />;
  }

  return (
    <div className="mx-auto flex flex-col items-stretch justify-center gap-1 md:w-full lg:w-2/3">
      <div className="flex justify-center gap-1.5">
        {/* purType */}
        <select
          className="select hidden min-w-32 sm:block lg:max-w-32"
          name="purType"
          id="purType"
          defaultValue="none"
          onChange={(e) => {
            setPurType(() => {
              if (e.target.value === "none") {
                searchParams.delete("purType");
                searchParams.delete("reType");
              } else {
                searchParams.set("purType", e.target.value === "true");
                searchParams.delete("reType");
              }
              searchParams.set("reType", "none");
              setSearchParams(searchParams);
              return e.target.value === "true";
            });
          }}
        >
          <option value="none">Loại hình</option>
          <option value="true">Bán</option>
          <option value="false">Cho thuê</option>
        </select>
        {/* re type */}
        <select
          name="reType"
          id="reType"
          className="select hidden sm:block sm:min-w-36 lg:min-w-60 lg:max-w-60"
          defaultValue="none"
          onChange={(e) => {
            searchParams.set("reType", e.target.value);
            setSearchParams(searchParams);
          }}
        >
          <option value="none">Loại nhà đất</option>
          {arr.map((opt) => (
            <option value={opt.type} key={opt.type}>
              {opt.title}
            </option>
          ))}
        </select>

        {/* search with btn */}
        <div className="w-full md:w-96 lg:w-[400px]">
          <div className="relative flex w-full flex-wrap items-stretch">
            <input type="search" className="select" placeholder="Search" />

            {/* <!--Search button--> */}
            <button
              className="relative z-[2] rounded-r border-2 border-primary px-6 pt-0.5 text-sm font-medium uppercase text-black transition duration-200 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 dark:border-secondary dark:text-white dark:hover:bg-white dark:hover:bg-opacity-5"
              type="button"
            >
              Tìm kiếm
            </button>
          </div>
        </div>
      </div>
      {/* address  */}
      <div className="hidden w-full justify-center gap-1.5 sm:flex">
        {/* city */}
        <select
          name="city"
          id="city"
          className="select min-h-9 w-fit min-w-36 max-w-48"
          value={
            data?.city?.filter(
              (c) => c.cityID === Number(searchParams.get("city")),
            )?.[0]?.cityID || "none"
          }
          onChange={(e) => {
            searchParams.set("city", e.target.value);
            searchParams.delete("dis");
            searchParams.delete("ward");
            setSearchParams(searchParams);
          }}
          disabled={isLoading}
        >
          <option value="none">Tỉnh, Thành phố</option>
          {data?.city?.map((item) => (
            <option value={item.cityID} key={item.cityID}>
              {item.cityName}
            </option>
          ))}
        </select>

        {/* district */}
        <select
          name="dis"
          id="dis"
          className="select min-h-9 w-fit min-w-36 max-w-48"
          value={
            data?.dis?.filter(
              (d) => d.disID === Number(searchParams.get("dis")),
            )?.[0]?.disID || "none"
          }
          onChange={(e) => {
            searchParams.set("dis", e.target.value);
            searchParams.delete("ward");
            setSearchParams(searchParams);
          }}
          disabled={isLoading}
        >
          {!data?.dis?.length ? (
            <option value="none">Vui lòng chọn tỉnh thành phố trước</option>
          ) : (
            <>
              <option value="none">Quận, huyện</option>
              {data.dis.map((item) => (
                <option value={item.disID} key={item.disID}>
                  {item.disName}
                </option>
              ))}
            </>
          )}
        </select>
        {/* ward */}
        <select
          name="ward"
          id="ward"
          className="select min-h-9 w-fit min-w-36 max-w-48"
          defaultValue="none"
          onChange={(e) => {
            searchParams.set("ward", e.target.value);
            setSearchParams(searchParams);
          }}
          disabled={isLoading}
        >
          {!data?.ward?.length ? (
            <option value="none">Vui lòng chọn quận huyện trước</option>
          ) : (
            <>
              <option value="none">Phường, xã</option>
              {data.ward.map((item) => (
                <option value={item.wardID} key={item.wardID}>
                  {item.wardName}
                </option>
              ))}
            </>
          )}
        </select>
        {/* more */}
        <select
          name="area"
          id="area"
          className="select min-h-9 min-w-30 lg:max-w-36"
          defaultValue="all"
          onChange={(e) => {
            searchParams.set("area", e.target.value);
            setSearchParams(searchParams);
          }}
        >
          <option value="all">Diện tích</option>
          {areaOptions.map((item, i) => (
            <option value={item.value} key={i}>
              {item.label}
            </option>
          ))}
        </select>
        <Button icon={<TbRefresh />} widthBase={false} onClick={reset} />
      </div>
    </div>
  );
}

export default Searchbar;
