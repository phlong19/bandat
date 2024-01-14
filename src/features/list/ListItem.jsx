import slugify from "react-slugify";
import { formatCurrency } from "../../utils/helper";
import { Link } from "react-router-dom";

function ListItem({ title, imgs, price, area, district, city }) {
  return (
    <Link to={`nha-dat/${slugify(title)}`} className="py-4">
      <h3 className="font-lexend mb-3 line-clamp-2 overflow-hidden text-ellipsis whitespace-normal break-words">
        {title}
      </h3>
      <div className="flex items-center justify-between">
        {/* imgs */}
        <div>
          {/* {imgs.map((image, i) => (
            <img
              key={i}
              src={image}
              alt="anh san pham"
              className="min-w-30 h-[90px] min-h-[90px] rounded object-cover"
            />
          ))} */}
        </div>
        {/* informations */}
        <div>
          <div className="txet-red-500">{formatCurrency(price)}</div>
        </div>
      </div>
    </Link>
  );
}

export default ListItem;
