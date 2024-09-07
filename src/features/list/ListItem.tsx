import { Link } from "react-router-dom";

import ItemImages from "../../ui/ItemImages";

import { formatCurrencyWOText } from "../../utils/helper";
import { ListProps } from "../../model";
import {
  Flex,
  IconButton,
  Text,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import { TbShoppingCart } from "react-icons/tb";
import { useAppDispatch } from "../../hooks/redux";
import { addItem } from "../../redux/cartSlice";
import toast from "react-hot-toast";
import { INSTOCK } from "../../constants/anyVariables";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
  data: ListProps["data"];
}

function ListItem({ data }: Props) {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const accent = useColorModeValue("primary", "secondary");

  const {
    id,
    slug,
    name,
    price,
    specification,
    status: { id: typeID, type },
    images,
    summary,
  } = data!;

  const disabled = typeID !== INSTOCK;

  function onAddToCart() {
    dispatch(addItem({ id }));
    queryClient.invalidateQueries({ queryKey: ["client-cart"] });
    toast.success(`Đã thêm sản phẩm [${name}] vào giỏ hàng!`);
  }

  return (
    <div
      className={`group mt-2 rounded-lg border-2 bg-white p-1.5 transition-colors duration-200 hover:border-primary dark:bg-darker md:m-0 md:p-2 lg:p-2 xl:p-2`}
    >
      <Link to={`/san-pham/${slug}`}>
        {/* images */}
        <div className="relative mx-auto w-full overflow-hidden min-h-[130px]">
          <ItemImages
            images={images}
            productID={id}
            type={type}
            typeID={typeID}
          />
        </div>
      </Link>

      {/* informations */}
      <div className="mt-2">
        <Link to={`/san-pham/${slug}`}>
          <h3 className="mb-0.5 line-clamp-2 text-ellipsis whitespace-normal break-words text-lg capitalize text-black group-hover:text-primary dark:text-white dark:group-hover:text-secondary md:mb-1 md:text-base">
            {name}
          </h3>
        </Link>
      </div>

      <div>
        <Text noOfLines={2} fontSize="13" minH='40px' color="gray" >
          {summary}
        </Text>
        <Text fontSize="13.5" mt={1} noOfLines={1} pt="1px" fontStyle="italic">
          {specification}
        </Text>
      </div>

      <Flex w="100%" justify="space-between" align="center" pt={1}>
        <Text fontSize="15" fontWeight={600} color={accent}>
          {formatCurrencyWOText(price!)}
        </Text>

        <Tooltip
          label="Thêm vào giỏ hàng"
          isDisabled={disabled}
          hasArrow
          placement="bottom-end"
        >
          <IconButton
            isDisabled={disabled}
            aria-label="add-to-cart"
            color={accent}
            icon={<TbShoppingCart size={18} />}
            onClick={onAddToCart}
          />
        </Tooltip>
      </Flex>
    </div>
  );
}

export default ListItem;
