import { Avatar } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale/vi";

import { SlLocationPin } from "react-icons/sl";

import Bookmark from "../../ui/Bookmark";
import ItemImages from "../../ui/ItemImages";
import InformationStack from "./InformationStack";

import { formatCurrency, pricePerArea } from "../../utils/helper";
import { useMapView } from "../../context/MapViewContext";
import { m2 } from "../../constants/anyVariables";

function ListItem({ data, purType, isPopup = false }) {
  const { mapView } = useMapView();
  const isLaptop = useMediaQuery({
    query: "(min-width: 1000px)",
  });

  const {
    id,
    slug,
    area,
    city: { cityName },
    created_at,
    dis: { disName },
    images,
    name,
    price,
    type,
    profile: { avatar, fullName },
    ...addData
  } = data;

  const formattedDate = formatDistanceToNow(new Date(created_at), {
    locale: vi,
    addSuffix: true,
  });

  return (
    <div
      className={`${
        !isPopup
          ? "mt-2 bg-white p-1 dark:bg-darker md:p-2 lg:m-0 lg:p-2.5 xl:p-2"
          : "min-w-[160px] p-[2px] text-black lg:w-full"
      }  rounded-lg`}
    >
      {!isPopup && (
        <Link to={`/nha-dat/${slug}`}>
          {/* images */}
          <div className="relative mx-auto w-full overflow-hidden">
            <ItemImages
              images={images}
              isLaptop={isLaptop}
              isPopup={isPopup}
              type={type}
              postID={id}
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
        {/* money */}

        {/* bed & bath & floor */}
        <InformationStack
          data={addData}
          area={area}
          isLaptop={isLaptop}
          isPopup={isPopup}
        />

        {/* address */}
        <div className="my-2 flex gap-1">
          <span className="text-base">
            <SlLocationPin />
          </span>
          <span>
            {disName}, {cityName}
          </span>
        </div>
        {/* author */}
        {(!mapView || !isLaptop) && (
          <div className="mt-auto hidden items-center xs:flex">
            <div className="flex h-8 max-w-full items-center gap-2 lg:max-w-[35%] lg:gap-1.5 xl:max-w-[45%] xl:gap-2">
              <Avatar
                src={avatar}
                name={fullName}
                size="xs"
                alt="author avatar"
              />
              <div>
                <span className="line-clamp-1 text-xs font-semibold">
                  {fullName}
                </span>
                <p className="text-xs">{formattedDate}</p>
              </div>
            </div>

            <div
              className={`${
                isPopup ? "gap-1 text-sm" : "gap-2"
              } ml-auto flex items-center font-semibold text-primary dark:text-secondary`}
            >
              <span>
                {formatCurrency(price)} {!purType && "/ tháng"}
              </span>
              {purType && "-"}
              <span className="mr-2 font-semibold text-primary dark:text-secondary">
                {formatCurrency(pricePerArea(purType, price, area))}
                {purType && `/${m2}`}
              </span>
            </div>

            <div className="flex items-center">{!isLaptop && <Bookmark />}</div>
          </div>
        )}
        {isPopup && (
          <div
            className={`${
              isPopup ? "gap-1 text-sm" : "gap-2"
            } ml-auto flex items-center font-semibold text-primary dark:text-secondary`}
          >
            <span>
              {formatCurrency(price)} {!purType && "/ tháng"}
            </span>
            {purType && "-"}
            <span className="mr-2 font-semibold text-primary dark:text-secondary">
              {formatCurrency(pricePerArea(purType, price, area))}
              {purType && `/${m2}`}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default ListItem;
