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
import unidecode from "unidecode";
import slugify from "react-slugify";

function ListItem({ data, purType, isPopup = false, author = true }) {
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
    profile: { id: authorID, avatar, fullName },
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
          ? "mt-2 border-2 bg-white p-1 transition-colors duration-200 hover:border-primary dark:bg-darker md:p-2 lg:m-0 lg:p-2 xl:p-2"
          : "min-w-[160px] p-[2px] text-black lg:w-full"
      } group rounded-lg`}
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
      <div className="mt-2">
        <Link to={`/nha-dat/${slug}`}>
          <h3
            className={`${
              isPopup
                ? "text-black"
                : "text-black group-hover:text-primary dark:text-white dark:group-hover:text-secondary"
            } mb-1 line-clamp-2 text-ellipsis whitespace-normal break-words text-sm capitalize `}
          >
            {name}
          </h3>
        </Link>

        {/* bed & bath & floor */}
        <InformationStack
          data={addData}
          area={area}
          isLaptop={isLaptop}
          isPopup={isPopup}
        />

        {/* address */}
        <div className="my-2 flex gap-1 text-xs">
          <span className="text-base">
            <SlLocationPin />
          </span>
          <span>
            {disName}, {cityName}
          </span>
        </div>
        {/* author */}
        {(!mapView || !isLaptop) && (
          <div className="mt-auto flex items-center gap-1.5">
            <div className="flex h-8 max-w-full items-center gap-2 lg:max-w-[40%] lg:gap-1.5 xl:max-w-[45%] xl:gap-2">
              {author && (
                <Avatar
                  src={avatar}
                  name={fullName}
                  size="xs"
                  alt="author avatar"
                />
              )}
              <div className={`${!author ? "text-xs" : "text-[10px] "}`}>
                {author && (
                  <Link
                    to={`/danh-ba/nguoi-dung/${slugify(
                      unidecode(fullName),
                    )}?u=${authorID}`}
                    className="line-clamp-1 font-semibold"
                  >
                    {fullName}
                  </Link>
                )}
                <p>
                  {!author && "Đăng"} {formattedDate}
                </p>
              </div>
            </div>

            <div className="ml-auto flex items-center gap-1 font-roboto text-sm font-semibold text-primary dark:text-secondary">
              <span>
                {formatCurrency(price)} {!purType && "/ tháng"}
              </span>
              {purType && <span className="text-black dark:text-white">-</span>}
              {purType && (
                <span className="font-semibold text-primary dark:text-secondary">
                  {formatCurrency(pricePerArea(purType, price, area))}/{m2}
                </span>
              )}
            </div>

            <div className="flex items-center">
              {!isLaptop && <Bookmark postID={id} />}
            </div>
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
            {purType && <span className="text-black dark:text-white">-</span>}
            <span className="font-semibold text-primary dark:text-secondary">
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
