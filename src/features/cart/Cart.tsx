import {
  Card,
  CardHeader,
  Flex,
  Text,
  CardBody,
  CardFooter,
  Table,
  Tbody,
  useColorModeValue,
  Thead,
  Tr,
  Th,
  Center,
  Spinner,
  Button,
  Td,
  Stack,
  Image,
  AspectRatio,
  IconButton,
  Tooltip,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { getCartProducts } from "../../services/apiProduct";
import { RiShoppingBasketFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { formatCurrencyWOText } from "../../utils/helper";
import { TbCircleMinus, TbCirclePlus, TbTrash } from "react-icons/tb";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import toast from "react-hot-toast";
import { error as errMessage } from "../../constants/message";
import {
  decrease,
  increase,
  inputQuantity,
  remove,
} from "../../redux/cartSlice";
import ChakraModalDialog from "../../ui/ChakraModalDialog";

const captions = ["Sản phẩm", "Số lượng", "Thành tiền"];

export default function Cart() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const accent = useColorModeValue("primary", "secondary");
  const bg = useColorModeValue("white", "#afafaf1c");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { count, products } = useAppSelector((state) => state.cart);

  const ids = products.map((i) => i?.id);

  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["client-cart", ids],
    queryFn: () => getCartProducts(ids),
    enabled: ids.length > 0,
  });

  if (error) {
    toast.error(errMessage.fetchError);
    return navigate("/danh-muc/thuc-pham-chuc-nang");
  }

  const mergedData = data.map((i) => ({
    ...i,
    quantity: products.find((p) => p.id === i.id)?.quantity,
  }));

  const total = mergedData.reduce(
    (acc, cur) => (acc += cur.price * cur.quantity!),
    0,
  );

  function blur(e: React.ChangeEvent<HTMLInputElement>, id: number) {
    const quantity = products.find((p) => p.id === id)?.quantity;
    const newQuantity = Number(e.target.value);

    if (newQuantity < 1) {
      toast.error("Số lượng sản phẩm không thể nhỏ hơn 1");
      e.target.value = String(quantity || 1);
      return;
    }

    // no change => return to prevent waste dispatch
    if (quantity === newQuantity) return;

    setTimeout(() => {
      dispatch(inputQuantity({ id, quantity: Number(e.target.value) }));
    }, 500);
  }

  function minus(id: number) {
    dispatch(decrease({ id }));
    (document.getElementById(`quantity-${id}`) as HTMLInputElement)!.value =
      String(Number(products.find((p) => p.id === id)?.quantity) - 1);
  }

  function plus(id: number) {
    dispatch(increase({ id }));
    (document.getElementById(`quantity-${id}`) as HTMLInputElement)!.value =
      String(Number(products.find((p) => p.id === id)?.quantity) + 1);
  }
  return (
    <Card overflowX={{ sm: "auto", xl: "hidden" }} bg={bg} borderRadius="10px">
      <CardHeader pt="25" pl="25">
        <Flex justify="space-between" align="center">
          <Text
            fontSize="xl"
            color={accent}
            fontWeight="600"
            fontFamily="roboto"
            noOfLines={1}
          >
            Giỏ hàng
          </Text>
        </Flex>
      </CardHeader>

      <CardBody minH="50dvh">
        {isLoading ? (
          <Center minH="40dvh">
            <Spinner />
          </Center>
        ) : data.length ? (
          <Table variant="striped">
            <Thead display={{ base: "none", md: "table-header-group" }}>
              <Tr my=".8rem" pl="0px" color="gray.400">
                {captions.map((caption, i) => (
                  <Th
                    color="gray.400"
                    textTransform="capitalize"
                    fontSize="small"
                    key={i}
                    ps={i === 0 ? "0px" : undefined}
                    pr={0}
                  >
                    {caption}
                  </Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {mergedData.map((i, index) => (
                <Tr
                  key={index}
                  display={{ base: "flex", md: "table-row" }}
                  flexDirection="column"
                  className="group"
                >
                  <Td
                    w={{ base: "100%", md: "55%" }}
                    paddingInline={{ base: 4, md: 6 }}
                  >
                    <Flex gap={5}>
                      <AspectRatio
                        minW={{ base: "150px", md: "190px" }}
                        maxW={190}
                        ratio={16 / 9}
                      >
                        <Image
                          minW={150}
                          src={i.images[0].mediaLink}
                          alt={i.name}
                          className="rounded"
                        />
                      </AspectRatio>
                      <Stack w="fit-content">
                        <Text fontSize="md" noOfLines={1}>
                          {i.name}
                        </Text>
                        <Text
                          color="gray"
                          noOfLines={2}
                          fontSize={13}
                          fontStyle="italic"
                        >
                          Hiệu: {i.brand} - {i.specification}
                        </Text>
                        <Text noOfLines={{ base: 2, md: 3 }} fontSize={13}>
                          {i.description}
                        </Text>
                      </Stack>
                    </Flex>
                  </Td>

                  <Td>
                    <Flex align="start" justify="space-between">
                      <Stack>
                        <Flex align="center" gap={3} mt={1}>
                          <Tooltip label="Giảm số lượng đi 1" hasArrow>
                            <IconButton
                              aria-label="decreased"
                              colorScheme="green"
                              variant="ghost"
                              className="!rounded-full"
                              onClick={() => minus(i.id)}
                            >
                              <TbCircleMinus className="text-[22px] md:text-[25px]" />
                            </IconButton>
                          </Tooltip>
                          <Input
                            id={`quantity-${i.id}`}
                            fontSize="lg"
                            textAlign="center"
                            type="number"
                            width="50px"
                            px="2px"
                            defaultValue={
                              products.find((p) => p.id === i.id)?.quantity
                            }
                            onBlur={(e) => blur(e, i.id)}
                          />

                          <Tooltip label="Tăng số lượng lên 1" hasArrow>
                            <IconButton
                              colorScheme="green"
                              variant="ghost"
                              className="!rounded-full"
                              aria-label="increase"
                              onClick={() => plus(i.id)}
                            >
                              <TbCirclePlus className="text-[22px] md:text-[25px]" />
                            </IconButton>
                          </Tooltip>
                        </Flex>

                        <Tooltip
                          label="Loại bỏ sản phẩm khỏi giỏ hàng"
                          hasArrow
                        >
                          <Button
                            className="opacity-0 group-hover:opacity-100"
                            size="sm"
                            colorScheme="red"
                            leftIcon={<TbTrash size={17} />}
                            w="fit-content"
                            mx="auto"
                            onClick={onOpen}
                          >
                            Xóa
                          </Button>
                        </Tooltip>
                        <ChakraModalDialog
                          isOpen={isOpen}
                          onCloseDialog={() => {
                            dispatch(remove({ id: i.id }));
                            toast.success(`Đã xóa ${i.name} khỏi giỏ hàng!`);
                          }}
                          title="Xóa khỏi giỏ hàng?"
                          message="Xác nhận xóa sản phẩm này khỏi giỏ hàng, hành động này không thể hoàn tác."
                          onClose={onClose}
                        />
                      </Stack>

                      <Text fontSize={17} display={{ md: "none" }}>
                        {formatCurrencyWOText(i.price * i.quantity!)}
                      </Text>
                    </Flex>
                  </Td>

                  <Td
                    fontSize="17"
                    display={{ base: "none", md: "table-cell" }}
                  >
                    {formatCurrencyWOText(i.price * i.quantity!)}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        ) : (
          <Center h="40dvh" flexDir="column" gap={3}>
            <Text fontSize={18}>Giỏ hàng của bạn hiện đang trống.</Text>
            <Button
              as={Link}
              to="/danh-muc/thuc-pham-chuc-nang"
              colorScheme="green"
              leftIcon={<RiShoppingBasketFill size={17} />}
            >
              Lướt xem sản phẩm
            </Button>
          </Center>
        )}
      </CardBody>

      {products.length > 0 && (
        <>
          <div className="mx-auto w-[97%] border-t border-gray-500"></div>
          <CardFooter
            flexDir="column"
            gap={3}
            fontSize={{ base: "md", md: 18 }}
            w={{ base: "100%", md: "55%", lg: "40%" }}
            alignSelf="end"
          >
            <Flex justify="space-between">
              <Text>Tổng</Text>
              <Text fontWeight={600} color={accent}>
                {count} sản phẩm
              </Text>
            </Flex>
            <Flex justify="space-between">
              <Text>Thanh toán</Text>
              <Text fontWeight={600} color={accent}>
                {formatCurrencyWOText(total)}
              </Text>
            </Flex>

            <Flex justify="space-between">
              <Text>Hình thức</Text>
              <Text color="gray">Thanh toán khi nhận hàng</Text>
            </Flex>

            <Button
              width="fit-content"
              alignSelf="end"
              mt={4}
              colorScheme="green"
              onClick={() => navigate("/gio-hang", { state: { stage: 2 } })}
            >
              Đặt hàng ngay
            </Button>
          </CardFooter>
        </>
      )}
    </Card>
  );
}
