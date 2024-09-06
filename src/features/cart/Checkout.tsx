import {
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  SimpleGrid,
  Heading,
  Flex,
  Text,
  useColorModeValue,
  Box,
  Stack,
  Center,
  Spinner,
  AspectRatio,
  Image,
  Textarea,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import ChakraAlert from "../../ui/ChakraAlert";

import { useForm } from "react-hook-form";
import { LuChevronsLeft } from "react-icons/lu";
import { TbList, TbMapPin, TbUserSquareRounded } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import { getCartProducts } from "../../services/apiProduct";
import toast from "react-hot-toast";
import { formatCurrencyWOText } from "../../utils/helper";
import { useState } from "react";
import AddressSelect from "../searchbar/AddressSelect";
import { useCreateOrder } from "./useCreateOrder";
import { WAITING } from "../../constants/anyVariables";

const requiredMessage = "Không bỏ trống trường này";

export default function Checkout() {
  const navigate = useNavigate();
  const accent = useColorModeValue("primary", "secondary");
  const border = useColorModeValue("gray.300", "whiteAlpha.700");
  const bg = useColorModeValue("white", "#afafaf1c");

  const [cityID, setCityID] = useState(NaN);
  const [disID, setDisID] = useState(NaN);
  const [wardID, setWardID] = useState(NaN);

  const { count, products } = useAppSelector((state) => state.cart);
  const ids = products.map((i) => i?.id);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate, isPending } = useCreateOrder();

  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["client-cart"],
    queryFn: () => getCartProducts(ids),
    enabled: ids.length > 0,
  });

  if (error) {
    toast.error("Đã xảy ra lỗi, quay về giỏ hàng");
    navigate("/gio-hang", { state: { stage: 1 } });
  }

  const mergedData = data.map((i) => ({
    ...i,
    quantity: products.find((p) => p.id === i.id)?.quantity,
  }));

  const total = mergedData.reduce(
    (acc, cur) => (acc += cur.price * cur.quantity!),
    0,
  );

  function onSubmit(data: any) {
    if (!cityID || !disID || !wardID) {
      return toast.error("Vui lòng cung cấp đầy đủ địa chỉ giao hàng.");
    }

    const formedData = {
      ...data,
      total,
      details: JSON.stringify(
        mergedData.map((i) => ({
          ...i,
          images: i.images.filter((img) => img.isImage === true).slice(0, 1),
        })),
      ),
      cityID,
      disID,
      wardID,
      status: WAITING,
    };

    mutate(formedData);
  }

  return (
    <Box pos="relative" bg={bg} borderRadius="10px">
      <Box pt="25" pl="25">
        <Button
          variant="outline"
          size="sm"
          fontWeight={500}
          leftIcon={<LuChevronsLeft />}
          onClick={() => navigate("/gio-hang", { state: { state: 1 } })}
        >
          Quay lại giỏ hàng
        </Button>
        <Flex justify="space-between" mt={8} align="center">
          <Text
            fontSize="xl"
            color={accent}
            fontWeight="600"
            fontFamily="roboto"
            noOfLines={1}
          >
            Đặt hàng
          </Text>
        </Flex>
      </Box>
      <Box className="w-full" maxW="1500px" mx="auto" p="20px">
        <Flex
          w="100%"
          gap={{ base: 3, lg: 4, xl: 5 }}
          flexDir={{ base: "column", md: "row" }}
          px={{ base: 1, md: 1.5 }}
          justifyContent="space-between"
        >
          <form onSubmit={handleSubmit(onSubmit)} id="order" className="w-full">
            <Heading
              fontSize={21}
              className="flex items-center gap-1 pb-3.5 !font-roboto"
            >
              <TbList className="text-primary" />
              Danh sách sản phẩm
            </Heading>

            {isLoading ? (
              <Center minH={"20dvh"}>
                <Spinner />
              </Center>
            ) : (
              <Stack mt={2} mb={3.5} p={2} bg={"light"} borderRadius="10">
                {mergedData.map((i) => (
                  <Flex align="center" gap={3} key={i.id}>
                    <AspectRatio
                      minW={{ base: "80px", md: "90px" }}
                      maxW={90}
                      ratio={16 / 9}
                    >
                      <Image
                        minW="80px"
                        src={i.images[0].mediaLink}
                        alt={i.name}
                        className="rounded"
                      />
                    </AspectRatio>
                    <Stack w="fit-content">
                      <Text fontSize="md" noOfLines={1}>
                        {i.name}
                      </Text>
                      <Text>{formatCurrencyWOText(i.price)}</Text>
                    </Stack>
                    <Text ml="auto" mr={2} fontSize={15}>
                      x{i?.quantity}
                    </Text>
                  </Flex>
                ))}
              </Stack>
            )}
            <ChakraAlert
              type="info"
              message={`Vui lòng điền đầy đủ các trường có dấu`}
              html={`<span className="text-red-500 ml-1">*</span>`}
            />
            <Heading
              fontSize={21}
              className="flex items-center gap-1 py-3.5 !font-roboto"
            >
              <TbUserSquareRounded className="text-primary" /> Thông tin người
              đặt
            </Heading>
            <SimpleGrid
              mb={3}
              columns={{ base: 1, sm: 2 }}
              spacing={{ base: 2.5, md: 5, xl: 8 }}
            >
              <FormControl isRequired isInvalid={Boolean(errors.name)}>
                <FormLabel>Họ và tên</FormLabel>
                <Input
                  placeholder="Họ và tên người đặt"
                  type="text"
                  {...register("name", {
                    required: requiredMessage,
                    minLength: {
                      value: 4,
                      message: "Vui lòng cung cấp đầy đủ họ tên",
                    },
                  })}
                />
                {errors.name && (
                  <FormErrorMessage>
                    {errors.name.message?.toString()}
                  </FormErrorMessage>
                )}
              </FormControl>

              <FormControl isRequired isInvalid={Boolean(errors.phone)}>
                <FormLabel>Số điện thoại</FormLabel>
                <Input
                  placeholder="Số điện thoại"
                  type="number"
                  {...register("phone", {
                    required: requiredMessage,
                    minLength: {
                      value: 10,
                      message: "Số điện thoại không hợp lệ",
                    },
                    maxLength: {
                      value: 11,
                      message: "Số điện thoại không hợp lệ",
                    },
                  })}
                />
                {errors.phone && (
                  <FormErrorMessage>
                    {errors.phone.message?.toString()}
                  </FormErrorMessage>
                )}
              </FormControl>
            </SimpleGrid>

            <FormControl>
              <FormLabel>
                Email <span className="text-[13px]">(Không bắt buộc)</span>
              </FormLabel>
              <Input
                type="email"
                {...register("email")}
                placeholder="Địa chỉ Email"
              />
              {errors.email && (
                <FormErrorMessage>
                  {errors.email.message?.toString()}
                </FormErrorMessage>
              )}
            </FormControl>
            <Stack spacing="5" my={4}>
              <Heading
                fontSize={21}
                className="flex items-center gap-1 pb-3.5 !font-roboto"
              >
                <TbMapPin className="text-primary" /> Địa chỉ nhận hàng
              </Heading>

              <AddressSelect
                isForm
                cityID={cityID}
                disID={disID}
                wardID={wardID}
                setCityID={setCityID}
                setDisID={setDisID}
                setWardID={setWardID}
              />
              <FormControl isRequired>
                <FormLabel>Địa chỉ cụ thể</FormLabel>
                <Input
                  {...register("address", { required: requiredMessage })}
                  placeholder="Số nhà, ngõ ngách"
                  type="text"
                />

                {errors.address && (
                  <FormErrorMessage>
                    {errors.address.message?.toString()}
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl>
                <FormLabel>Ghi chú</FormLabel>
                <Textarea
                  {...register("note")}
                  placeholder="Đi vào ngõ A, rẽ trái, ..."
                />
              </FormControl>
            </Stack>
          </form>

          {/* sticky box */}
          <Box
            position={{ base: "relative", lg: "sticky" }}
            top={20}
            w={{ base: "full", md: "40%" }}
            border="1px solid transparent"
            borderColor={border}
            rounded="md"
            pt={5}
            px={3.5}
            mt={1}
            pos="sticky"
            h={{ base: "fit-content", md: "100%" }}
          >
            <Stack
              spacing={3}
              fontSize={16}
              pb={2}
              borderBottom="1px solid lightgray"
            >
              <Flex justify="space-between">
                <Text>Tổng</Text>
                <Text>{count} sản phẩm</Text>
              </Flex>
              <Flex justify="space-between">
                <Text>Tổng tiền</Text>
                <Text>{formatCurrencyWOText(total)}</Text>
              </Flex>
              <Flex justify="space-between">
                <Text>Giảm giá trực tiếp</Text>
                <Text>{formatCurrencyWOText(0)}</Text>
              </Flex>
              <Flex justify="space-between">
                <Text>Giảm giá voucher</Text>
                <Text>{formatCurrencyWOText(0)}</Text>
              </Flex>
              <Flex justify="space-between">
                <Text>Tiết kiệm được</Text>
                <Text>{formatCurrencyWOText(0)}</Text>
              </Flex>
              <Text className="!font-roboto italic" fontWeight={600}>
                Thanh toán khi nhận hàng
              </Text>
            </Stack>
            <Box py={3}>
              <Flex justify="space-between" fontSize={{ base: 18, lg: 20 }}>
                <Text fontWeight={600}>Thành tiền</Text>
                <Text color={accent}>{formatCurrencyWOText(total)}</Text>
              </Flex>

              <Button
                w="100%"
                borderRadius="99"
                my={2}
                colorScheme="green"
                type="submit"
                form="order"
                isLoading={isPending || isLoading}
              >
                Hoàn tất
              </Button>

              <Text textAlign="center" w="95%">
                Bằng việc tiến hành đặt mua hàng, bạn đồng ý với việc lưu trữ và
                sử dụng dữ liệu của chúng tôi.
              </Text>
            </Box>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
