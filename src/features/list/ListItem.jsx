import { Avatar } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import { TbBed } from "react-icons/tb";
import { LiaBathSolid } from "react-icons/lia";
import { ImStack } from "react-icons/im";
import { SlLocationPin } from "react-icons/sl";

import Bookmark from "../../ui/Bookmark";
import ItemImages from "../../ui/ItemImages";

import { formatCurrency, formatDate, pricePerArea } from "../../utils/helper";
import { m2 } from "../../constants/anyVariables";
import { useMapView } from "../../context/MapViewContext";

function ListItem({ data, purType, isPopup = false }) {
  const { mapView } = useMapView();
  const isLaptop = useMediaQuery({
    query: "(min-width: 1000px)",
  });

  const {
    slug,
    area,
    bath_room,
    bed_room,
    city: { cityName },
    created_at,
    dis: { disName },
    floor,
    images,
    name,
    price,
    type,
    profile: { avatar, fullName },
  } = data;

  return (
    <div
      className={`${
        !isPopup
          ? "mt-2 bg-white p-1 shadow-sm shadow-prim-light dark:bg-black/20 dark:shadow-sec-light md:p-2 lg:m-0 lg:p-2.5 xl:p-2"
          : "min-w-[160px] p-[2px] text-black lg:w-full"
      }  rounded-lg`}
    >
      {!isPopup && (
        <Link to={`/nha-dat/${slug}`}>
          {/* images */}
          <div className="relative mx-auto w-full overflow-hidden">
            {/* vip label */}
            <div className="absolute"></div>

            <ItemImages
              images={images}
              isLaptop={isLaptop}
              isPopup={isPopup}
              type={type}
            />
          </div>
        </Link>
      )}

      {/* informations */}
      <div className="mt-3">
        <Link to={`/nha-dat/${slug}`}>
          <h3
            className={`${
              isPopup ? "text-black" : "text-black dark:text-white"
            } mb-1 line-clamp-2 text-ellipsis whitespace-normal break-words font-lexend font-semibold uppercase `}
          >
            {name}
          </h3>
        </Link>
        <div
          className={`${
            isPopup ? "gap-1" : "gap-2"
          } flex flex-wrap items-center`}
        >
          <span className="font-bold text-primary dark:text-secondary">
            {formatCurrency(price)} {!purType && "/tháng"}
          </span>
          <span className="font-bold text-primary dark:text-secondary">
            - {area}
            {m2} -
          </span>
          <span className="mr-2">
            {formatCurrency(pricePerArea(purType, price, area))}
            {purType && `/${m2}`}
          </span>
          {/* bed | bath | floor */}
          {(!mapView || isPopup || !isLaptop) && (
            <div className="flex gap-2.5">
              {bed_room && (
                <span className="flex items-center gap-1.5">
                  {bed_room}
                  <span className="text-[26px]">
                    <TbBed />
                  </span>
                </span>
              )}
              {bath_room && (
                <span className="flex items-center gap-1.5">
                  {bath_room}
                  <span className="mb-1 text-2xl">
                    <LiaBathSolid />
                  </span>
                </span>
              )}
              {floor && (
                <span
                  className={`${
                    !isLaptop || isPopup ? "flex" : "hidden"
                  } items-center gap-1.5`}
                >
                  {floor}
                  <span className="mb-1 text-2xl">
                    <ImStack />
                  </span>
                </span>
              )}
            </div>
          )}
        </div>
        {/* address */}
        <div className="mb-4 mt-1 flex gap-1">
          <span className="text-lg">
            <SlLocationPin />
          </span>
          <span>
            {disName}, {cityName}
          </span>
        </div>
        {/* author */}
        {(!mapView || !isLaptop) && (
          <div className="hidden items-center justify-between xs:flex">
            <div className="flex h-8 items-center gap-2">
              <Avatar
                src={avatar}
                name={fullName}
                size="sm"
                alt="author avatar"
              />
              <div>
                <span className="line-clamp-1 font-semibold">{fullName}</span>
                <p>{formatDate(created_at, "short")}</p>
              </div>
            </div>
            {/* TODO: styling */}
            <p className="text-xs font-roboto">what&#39;d we place here?</p>
            <div className="flex items-center">{!isLaptop && <Bookmark />}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ListItem;
