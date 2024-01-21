import { IoImagesOutline } from "react-icons/io5";
import Bookmark from "./Bookmark";
import ViewInMap from "./ViewInMap";
import { useMapView } from "../context/MapViewContext";

function ItemImages({ images, isLaptop, isPopup }) {
  const { mapView } = useMapView();

  return (
    <div className="items-stretch justify-center md:flex md:gap-1 xl:relative">
      <img
        src={images[0].mediaLink}
        alt="main img"
        className="aspect-video w-full rounded-t object-cover md:w-1/4 md:rounded-md md:py-[1px] lg:h-full lg:w-full"
      />
      <div className="flex items-center justify-center gap-[2px] lg:hidden">
        {images.slice(1, 4).map((item, i) => (
          <img
            key={i}
            src={item.mediaLink}
            alt="child img"
            className="mt-[2px] aspect-[4/3] w-1/3 rounded-b object-cover md:gap-1 md:rounded-md"
          />
        ))}
      </div>
      {images.length > 4 && (
        <div className="absolute bottom-0 right-0 flex h-10 w-full items-end justify-end gap-2 bg-[linear-gradient(180deg,rgba(44,44,44,0)_0%,rgba(44,44,44,0.8)_100%)] pb-1 font-semibold text-white md:h-14 md:pb-2.5 lg:hidden">
          <span className="text-2xl">
            <IoImagesOutline />
          </span>
          <span className="mr-3 text-base">{images.length - 4}</span>
        </div>
      )}
      {!isPopup && isLaptop && (
        <div className="absolute right-2 top-2 flex flex-col justify-center gap-2">
          <div>
            <Bookmark />
          </div>
          <div>{mapView && <ViewInMap />}</div>
        </div>
      )}
    </div>
  );
}

export default ItemImages;
