// libs
import {
  Badge,
  Menu,
  MenuButton,
  Flex,
  Td,
  Text,
  Tr,
  Image,
  AspectRatio,
  useColorModeValue,
} from "@chakra-ui/react";

// icons + ui
import MenuActionRE from "./MenuActionRE";
import { PiDotsSixVerticalBold } from "react-icons/pi";

// others
import {
  formatDate,
  getStatusBadgeColor,
  formatCurrencyWOText,
} from "../../utils/helper";
import { ListProps } from "../../model";
import { Link } from "react-router-dom";
import { OUT } from "../../constants/anyVariables";

interface Props {
  data: ListProps["data"];
  level: number;
  userID: string;
}

function TableRERow({ data, level, userID }: Props) {
  const {
    id,
    name,
    manufacturer,
    brand,
    price,
    specification,
    created_at,
    images,
    summary,
    slug,
    status: { id: statusID, type },
  } = data!;

  let statusBadge = getStatusBadgeColor(statusID);
  const accent = useColorModeValue("primary", "secondary");

  return (
    <Tr className="group">
      <Td width={{ sm: "190px" }} maxWidth={{ sm: "300px" }} px="0px">
        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          <AspectRatio ratio={16 / 9} minW="150px">
            <Link to={`/quan-ly-san-pham/${slug}`}>
              <Image
                borderRadius="8px"
                border="1px solid lightgray"
                minW={120}
                src={images[0].mediaLink}
                me="18px"
                alt={name}
              />
            </Link>
          </AspectRatio>
        </Flex>
      </Td>

      <Td maxW={250} title={name}>
        <Link
          to={`/quan-ly-san-pham/${slug}`}
          className="transition-colors duration-200 hover:text-primary"
        >
          <Text noOfLines={2}>{name}</Text>
        </Link>
      </Td>

      <Td maxW={250}>
        <Text color={accent} fontWeight={600}>
          {formatCurrencyWOText(price)}
        </Text>
      </Td>

      <Td
        maxW={150}
        title={`Thương hiệu ${brand} / Nhà sản xuất ${manufacturer}`}
      >
        <Text noOfLines={2}>{brand}</Text>
        <Text noOfLines={2}>{manufacturer}</Text>
      </Td>
      <Td maxW={200} pr={0}>
        {specification}
      </Td>
      {/* summary */}
      <Td minW="150px" maxW="250" title={summary || ""}>
        <Text color="gray" className="italic" noOfLines={2}>
          {summary}
        </Text>
      </Td>

      <Td>
        <Badge
          fontSize="xs"
          p="3px 10px"
          borderRadius="lg"
          colorScheme={statusBadge}
          textTransform="capitalize"
        >
          {statusID === OUT ? "Ngừng nhập" : type}
        </Badge>
      </Td>
      <Td>
        <Text pb=".5rem">{formatDate(created_at)}</Text>
      </Td>

      <Td>
        <Menu>
          <MenuButton className="invisible rounded-md border border-dark p-1 group-hover:visible dark:border-white">
            <PiDotsSixVerticalBold fontSize={18} />
          </MenuButton>
          <MenuActionRE
            productID={id}
            slug={slug}
            statusID={statusID}
            level={level}
          />
        </Menu>
      </Td>
    </Tr>
  );
}

export default TableRERow;
