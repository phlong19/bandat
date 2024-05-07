import { useState } from "react";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/UserContext";
import {
  Box,
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
  Input,
  useColorModeValue,
  Accordion,
  AccordionItem,
  FormControl,
  FormLabel,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import ChakraBreadcrumb from "../ui/ChakraBreadcrumb";
import AddressSelect from "../features/searchbar/AddressSelect";

import { BiSave } from "react-icons/bi";
import ModalAvatar from "../features/account/ModalAvatar";
import ModalPassword from "../features/account/ModalPassword";
import ModalEmail from "../features/account/ModalEmail";
import ModalUsername from "../features/account/ModalUsername";

import { useUpdateAddress } from "../features/account/useUpdateAddress";
import { useForm } from "react-hook-form";
import { account } from "../constants/message";
import OtherInformations from "../features/account/OtherInformations";
import ModalPhone from "../features/account/ModalPhone";

function AccountManagement() {
  const { data, email, user, level, isLoading } = useAuth();
  const { handleSubmit, register } = useForm({
    defaultValues: {
      address: data?.address,
    },
  });
  const { updateAdd, isUpdatingAdd } = useUpdateAddress();
  // userID
  const id = user?.id;

  // chakra
  const bg = useColorModeValue("light", "dark");
  const color = useColorModeValue("gray.700", "gray.400");

  // address state
  const [cityID, setCityID] = useState(data?.cityID || NaN);
  const [disID, setDisID] = useState(data?.disID || NaN);
  const [wardID, setWardID] = useState(data?.wardID || NaN);

  // submit address
  function onSubmit(data) {
    if (!cityID && !disID && !wardID) {
      return toast.error(account.missingAddress);
    }
    updateAdd({ userID: id, cityID, disID, wardID, ...data });
  }

  const isConfirmed = Boolean(user.confirmed_at);

  return (
    <Box>
      <ChakraBreadcrumb page="Tài khoản" />
      <Card bg={bg} mt={7}>
        <CardHeader>
          <Heading size="md">Thông tin tài khoản</Heading>
        </CardHeader>

        {isLoading ? (
          <Center minH="90dvh">
            <Spinner />
          </Center>
        ) : (
          <CardBody pt={3}>
            <Stack divider={<StackDivider />} spacing="4">
              {/* avatar */}
              <ModalAvatar data={data} level={level} color={color} id={id} />
              {/* phone */}
              <ModalPhone
                color={color}
                id={id}
                phone={data?.phone}
                isConfirmed={user?.phone_confirmed_at}
              />
              {/* email */}
              <ModalEmail
                color={color}
                email={email}
                isConfirmed={isConfirmed}
                id={id}
              />
              {/* password */}
              <ModalPassword color={color} id={id} />
              {/* username */}
              <ModalUsername color={color} name={data.fullName} id={id} />
              {/* address */}
              <Flex align="center" justify="space-between">
                <Accordion allowToggle w="100%">
                  <AccordionItem border="none">
                    <h2>
                      <AccordionButton pl={0} justifyContent="space-between">
                        <Box>
                          <Heading
                            size="xs"
                            textAlign="left"
                            textTransform="capitalize"
                          >
                            Địa chỉ
                          </Heading>
                          <Text pt="2" fontSize="xs" color={color}>
                            Địa chỉ hiển thị với người dùng khác.
                          </Text>
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>

                    <AccordionPanel px={0} pb={0} pt={4}>
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <AddressSelect
                          cityID={cityID}
                          disID={disID}
                          wardID={wardID}
                          setCityID={setCityID}
                          setDisID={setDisID}
                          setWardID={setWardID}
                        />
                        <FormControl mt={3}>
                          <FormLabel fontSize="sm">
                            (Tùy chọn) Địa chỉ cụ thể
                          </FormLabel>
                          <Input
                            fontSize="sm"
                            w={{ lg: "30%" }}
                            placeholder="Số nhà, ngõ ngách, thôn xóm"
                            {...register("address")}
                          />
                        </FormControl>
                        <Box w="100%" textAlign="end" mt={4}>
                          <Button
                            size="xs"
                            fontWeight="400"
                            colorScheme="green"
                            variant="outline"
                            borderWidth={1.5}
                            rightIcon={<BiSave />}
                            type="submit"
                            isLoading={isUpdatingAdd}
                          >
                            Lưu
                          </Button>
                        </Box>
                      </form>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </Flex>
              <OtherInformations data={data} color={color} id={id} />
            </Stack>
          </CardBody>
        )}
      </Card>
    </Box>
  );
}

export default AccountManagement;
