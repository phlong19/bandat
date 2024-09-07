import { Badge } from "@chakra-ui/react";
import Bookmark from "./Bookmark";
import { getStatusBadgeColor } from "../utils/helper";

/**
 *
 * @param images array of images
 * @param productID
 * @param type product status (instock, outstock)
 * @param typID status id from supabase
 */
function ItemImages({ images, productID, typeID, type }) {
  return (
    <div className="relative items-stretch justify-center md:flex md:gap-0.5">
      <img
        src={images[0]?.mediaLink}
        alt="main img"
        className="aspect-video w-full rounded object-cover md:rounded-md md:pt-[1px] lg:h-full"
      />

      <div className="absolute left-1.5 top-1">
        <Badge
          textTransform="capitalize"
          borderRadius="3"
          colorScheme={getStatusBadgeColor(typeID)}
        >
          {type}
        </Badge>
      </div>

      <div className="absolute right-2 top-2 rounded">
        <div>
          <Bookmark productID={productID} />
        </div>
      </div>
    </div>
  );
}

export default ItemImages;
