import slugify from "react-slugify";
import { formatCurrency } from "../../utils/helper";
import { Link } from "react-router-dom";

function ListItem({ data }) {
  return (
    <Link
      to={`/nha-dat/${slugify(data.name)}`}
      className="relative w-full overflow-hidden"
    >
      <div></div>
    </Link>
  );
}

export default ListItem;
