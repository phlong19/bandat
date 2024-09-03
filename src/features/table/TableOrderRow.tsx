import { Menu, MenuButton, Td, Tr } from "@chakra-ui/react";
import { Json } from "../../database";
import { PiDotsSixVerticalBold } from "react-icons/pi";
import MenuActionOrder from "./MenuActionOrder";

interface Props {
  data: {
    address: string;
    cityID: number;
    disID: number;
    wardID: number;
    created_at: string;
    details: Json;
    id: number;
    name: string;
    phone: string;
    total: number;
    status: {
      id: number;
      created_at: string;
      type: string;
    };
    email: string | null;
    note: string | null;
  };
  level: number;
  userID: string;
}

function TableOrderRow({ data, level, userID }: Props) {
  const {
    id,
    status: { id: statusID, type },
  } = data;

  return (
    <Tr>
      <Td pl={0}></Td>

      <Td>
        <Menu>
          <MenuButton className="invisible rounded-md border border-dark p-1 group-hover:visible dark:border-white">
            <PiDotsSixVerticalBold fontSize={18} />
          </MenuButton>
          <MenuActionOrder
            orderID={id}
            statusID={statusID}
            userID={userID}
            level={level}
          />
        </Menu>
      </Td>
    </Tr>
  );
}

export default TableOrderRow;
