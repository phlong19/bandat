import { useState } from "react";
import slugify from "react-slugify";
import { Link } from "react-router-dom";

import { IoImagesOutline } from "react-icons/io5";
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

function ListItem({ data, purType }) {
  const [hiddenPhoneNum, setHiddenPhoneNum] = useState(false);
  // no des in mobile view, floor is an optional if the item still have place to display it
  // user has to upload equal or more than 4 imgs
  const {
    area,
    bath_room,
    bed_room,
    city: { cityName },
    created_at,
    dis: { disName },
    ward: { wardName },
    description,
    floor,
    images,
    name,
    price,
    profile: { phone, avatar, fullName },
  } = data;
  // console.log(data);
  return (
    <div className="mt-2 rounded-lg bg-white p-1 dark:bg-black md:p-2 lg:p-2.5">
      <Link to={`/nha-dat/${slugify(name)}`}>
        {/* images */}
        <div className="relative mx-auto w-full overflow-hidden">
          {/* vip label */}
          <div className="absolute"></div>

          <ItemImages images={images} />
        </div>
      </Link>

      {/* informations */}
      <div className="mt-3">
        <Link to={`/nha-dat/${slugify(name)}`}>
          <h3 className="mb-1 line-clamp-2 text-ellipsis whitespace-normal break-words font-lexend font-semibold uppercase">
            {name}
          </h3>
        </Link>
        <div className="flex items-center gap-3">
          <span className="font-bold text-primary dark:text-secondary">
            {formatCurrency(price)}
          </span>
          <span className="font-bold text-primary dark:text-secondary">
            {area}
            {m2}
          </span>
          <span className="mr-2">
            {formatCurrency(pricePerArea(price, area))}
            {purType ? m2 : "/tháng"}
          </span>
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
              <span className="flex items-center gap-1.5">
                {floor}
                <span className="mb-1 text-2xl">
                  <ImStack />
                </span>
              </span>
            )}
          </div>
        </div>
        {/* address */}
        <div className="mb-4 mt-1 flex gap-1">
          <span className="text-lg">
            <SlLocationPin />
          </span>
          <span>
            {wardName}, {disName}, {cityName}
          </span>
        </div>
        {/* author */}
        <div className="flex w-full items-center justify-between">
          <div className="flex h-8 w-[45%] items-center">
            <img
              src={avatar}
              alt="author avatar"
              className="object-conver mr-3 h-8 w-8 rounded-full border border-dark/50 dark:border-light/50"
            />
            <div>
              <span className="font-semibold">{fullName}</span>
              <p>{formatDate(created_at)}</p>
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
            <Bookmark />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListItem;
