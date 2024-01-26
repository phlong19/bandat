import { useState } from "react";
import slugify from "react-slugify";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import { TbBed } from "react-icons/tb";
import { LiaBathSolid } from "react-icons/lia";
import { ImStack } from "react-icons/im";
import { SlLocationPin } from "react-icons/sl";
import { BiPhoneCall } from "react-icons/bi";

import {
  formatCurrency,
  formatDate,
  hiddenLast3PhoneNum,
  pricePerArea,
} from "../../utils/helper";
import { m2 } from "../../constants/anyVariables";

import Button from "../../ui/Button";
import Bookmark from "../../ui/Bookmark";
import ItemImages from "../../ui/ItemImages";
import { useMapView } from "../../context/MapViewContext";

function ListItem({ data, purType, isPopup = false }) {
  const { mapView } = useMapView();
  const [hiddenPhoneNum, setHiddenPhoneNum] = useState(false);
  const isLaptop = useMediaQuery({
    query: "(min-width: 1000px)",
  });

  const {
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
    profile: { phone, avatar, fullName },
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
        <Link to={`/nha-dat/${slugify(name)}`}>
          {/* images */}
          <div className="relative mx-auto w-full overflow-hidden">
            {/* vip label */}
            <div className="absolute"></div>

            <ItemImages images={images} isLaptop={isLaptop} isPopup={isPopup} />
          </div>
        </Link>
      )}

      {/* informations */}
      <div className="mt-3">
        <Link to={`/nha-dat/${slugify(name)}`}>
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
            isPopup ? "gap-1" : "gap-3"
          } flex flex-wrap items-center`}
        >
          <span className="font-bold text-primary dark:text-secondary">
            {formatCurrency(price)}
          </span>
          <span className="font-bold text-primary dark:text-secondary">
            {area}
            {m2.replace("/", "")}
          </span>
          <span className="mr-2">
            {formatCurrency(pricePerArea(price, area))}
            {purType ? m2 : "/tháng"}
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
          <div className="hidden w-full items-center justify-between xs:flex">
            <div className="flex h-8 w-[45%] items-center">
              <img
                src={avatar}
                alt="author avatar"
                className="object-conver mr-3 h-8 w-8 rounded-full border border-dark/50 dark:border-light/50"
              />
              <div>
                <span className="line-clamp-1 font-semibold">{fullName}</span>
                <p>{formatDate(created_at, "short")}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                onClick={() => setHiddenPhoneNum(true)}
                widthBase={false}
                basePY={false}
                icon={<BiPhoneCall />}
              >
                {hiddenPhoneNum ? (
                  <a href={`tel:0${phone}`}>0{phone}</a>
                ) : (
                  hiddenLast3PhoneNum(phone)
                )}
              </Button>
              {!isLaptop && <Bookmark />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ListItem;
