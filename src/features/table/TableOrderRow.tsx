import {
  Badge,
  Flex,
  Menu,
  MenuButton,
  Td,
  Text,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import { PiDotsSixVerticalBold } from "react-icons/pi";
import MenuActionOrder from "./MenuActionOrder";
import { formatCurrencyWOText } from "../../utils/helper";
import { Dispatch } from "react";
import { CANCEL, COMPLETED, WAITING } from "../../constants/anyVariables";
import { format } from "date-fns";

export interface OrderListProps {
  data: {
    city?: { id: number; created_at: string; cityName: string };

    created_at: string;
    id: number;
    name?: string;
    phone?: string;
    total: number;
    status: {
      id: number;
      created_at: string;
      type: string;
    };
    email?: string | null;
  };
  level: number;
  setSelectedID: Dispatch<React.SetStateAction<number | null>>;
}

function TableOrderRow({ data, level, setSelectedID }: OrderListProps) {
  const accent = useColorModeValue("primary", "secondary");
  const {
    id,
    status: { id: statusID, type },
    created_at,
    email,
    name,
    phone,
    total,
  } = data;

  const badgeColor = getStatusBadgeColor(statusID);

  function onClick() {
    setSelectedID(id);
  }

  return (
    <Tr className="group transition-colors duration-200 hover:bg-white hover:dark:bg-zinc-800">
      <Td pl={0} minW={50}>
        #{id}
      </Td>
      <Td maxW="250px">
        <Flex direction="column" gap={1}>
          <Text fontSize="md" noOfLines={2} title={name} fontWeight={600}>
            {name}
          </Text>
          {email && (
            <Text className="italic" color="gray" noOfLines={1} title={email}>
              {email}
            </Text>
          )}
        </Flex>
      </Td>

      <Td>{phone}</Td>

      <Td fontWeight={600} color={accent}>
        {formatCurrencyWOText(total)}
      </Td>

      <Td>
        <Badge
          fontSize="xs"
          p="3px 10px"
          borderRadius="lg"
          colorScheme={badgeColor}
          textTransform="capitalize"
        >
          {type}
        </Badge>
      </Td>

      <Td pl={0}>{format(new Date(created_at), "HH:mm dd/MM/yyyy")}</Td>

      <Td>
        <Menu>
          <MenuButton className="invisible rounded-md border border-dark p-1 group-hover:visible dark:border-white">
            <PiDotsSixVerticalBold fontSize={18} />
          </MenuButton>
          <MenuActionOrder
            orderID={id}
            statusID={statusID}
            level={level}
            onClick={onClick}
          />
        </Menu>
      </Td>
    </Tr>
  );
}

export default TableOrderRow;

function getStatusBadgeColor(id: number) {
  switch (id) {
    case WAITING:
      return "orange";
    case COMPLETED:
      return "green";
    case CANCEL:
      return "red";
  }

  return "orange";
}
