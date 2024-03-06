import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../context/UserContext";
import {
  Box,
  Badge,
  Flex,
  Button,
  Center,
  Spinner,
  Card,
  CardHeader,
  Stack,
  StackDivider,
  Heading,
  CardBody,
  Text,
  useColorModeValue,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  useDisclosure,
} from "@chakra-ui/react";
import ChakraBreadcrumb from "../ui/ChakraBreadcrumb";
import AddressSelect from "../features/searchbar/AddressSelect";
import Avatar from "../ui/Avatar";

import { BiEditAlt, BiSave } from "react-icons/bi";
import { MdOutlineLockReset } from "react-icons/md";
import { PiIdentificationBadgeLight } from "react-icons/pi";
import { CgArrowsExchange } from "react-icons/cg";

import { getFullAddress } from "../services/apiGeneral";
import { EDITOR_LEVEL } from "../constants/anyVariables";
import ModalAvatar from "../features/account/ModalAvatar";
import ModalPassword from "../features/account/ModalPassword";
import ModalEmail from "../features/account/ModalEmail";
import ModalUsername from "../features/account/ModalUsername";
import ModalAdress from "../features/account/ModalAdress";

function AccountManagement() {
  const { data, email, user, level, isLoading } = useAuth();

  // chakra
  const bg = useColorModeValue("light", "dark");
  const color = useColorModeValue("gray.700", "gray.400");

  // address state
  const [cityID, setCityID] = useState(data?.cityID || NaN);
  const [disID, setDisID] = useState(data?.disID || NaN);
  const [wardID, setWardID] = useState(data?.wardID || NaN);

  if (isLoading) {
    return (
      <Center minH="90dvh">
        <Spinner />
      </Center>
    );
  }

  const isConfirmed = Boolean(user.confirmed_at);

  return (
    <Box>
      <ChakraBreadcrumb page="Tài khoản" />
      <Card bg={bg} mt={7}>
        <CardHeader>
          <Heading size="md">Thông tin tài khoản</Heading>
        </CardHeader>

        <CardBody pt={3}>
          <Stack divider={<StackDivider />} spacing="4">
            {/* avatar */}
            <ModalAvatar
              data={data}
              level={level}
              cityID={cityID}
              disID={disID}
              wardID={wardID}
              color={color}
            />
            {/* email */}
            <ModalEmail color={color} email={email} isConfirmed={isConfirmed} />
            {/* password */}
            <ModalPassword color={color} />
            {/* username */}
            <ModalUsername />
            {/* address */}
            <ModalAdress />
          </Stack>
        </CardBody>
      </Card>
    </Box>
  );
}

export default AccountManagement;
