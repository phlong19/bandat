import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  Select,
  Spinner,
  Text,
  Tooltip,
  useColorModeValue,
  VStack,
  PopoverTrigger,
  Divider,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useDisclosure,
  AspectRatio,
  Image,
} from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";
import ChakraBreadcrumb from "../ui/ChakraBreadcrumb";
import { useGetCategories } from "../hooks/useGetCategories";
import { IoChevronForward } from "react-icons/io5";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { TbPencilCog, TbTrash } from "react-icons/tb";
import { useUpdateCategory } from "../hooks/useUpdateCategory";
import slugify from "react-slugify";
import unidecode from "unidecode";
import { BsQuestionCircle } from "react-icons/bs";
import { useDeleteCategory } from "../hooks/useDeleteCategory";
import toast from "react-hot-toast";
import { HiInformationCircle } from "react-icons/hi";

const message = "Vui lòng không bỏ trống trường này";

export default function Categories() {
  const page = "Quản lý danh mục";
  const { categoryTree, isFetching, data } = useGetCategories();
  const [id, setId] = useState<number | null>(null);
  const accent = useColorModeValue("primary", "secondary");
  const [disabled, setDisabled] = useState(false);
  const [hover, setHover] = useState(false);
  const [open, setOpen] = useState(false);

  const { mutate, isPending } = useUpdateCategory();
  const { deleteById } = useDeleteCategory();

  const [root, setRoot] = useState<number | null>(0);
  const [parent, setParent] = useState<number | null>(0);

  const currentCategory = data?.find((i) => i.id === id);
  const { register, setValue, handleSubmit } = useForm({
    values: { name: currentCategory?.name, type: currentCategory?.slug },
  });

  useEffect(() => {
    if (parent) {
      const parentData = data?.find((i) => i.id === parent);
      setRoot(parentData?.parent || 0);
    }
  }, [parent, data]);

  function onClick(e: any) {
    e.stopPropagation();
    const [id, level] = e.currentTarget.id?.split("-");
    const numberId = Number(id);
    setId(numberId);

    if (level === "root") {
      setRoot(null);
      setDisabled(true);
      setParent(numberId);
    } else {
      setDisabled(false);
      setParent(numberId);
    }
  }

  function onDelete(id: number) {
    if (!id) return;

    deleteById(id);
  }

  function reset() {
    setValue("name", "");
    setValue("type", "");
    setDisabled(false);
    setId(0);
    setRoot(0);
    setParent(0);
  }

  function onSubmit(data: { name?: string; type?: string }) {
    if (!data || !data?.name || !data?.type) {
      return;
    }

    const { name, type } = data;

    if (type.split(" ").length > 1) {
      return toast.error(
        "Đường dẫn không đúng định dạng, vui lòng xem hướng dẫn.",
      );
    }

    const formedData = {
      name,
      parent: root || null,
      id: parent,
      slug: type,
    };

    mutate({ form: formedData, isEdit: Boolean(id) });
    reset();
  }

  const rootCat = useMemo(() => data?.filter((i) => i.parent === null), []);
  const parentCat = useMemo(
    () => data?.filter((i) => rootCat?.some((r) => r.id === i.parent)),
    [],
  );

  // for parent select render
  // if id => parent select option cant have child cat
  const array = id ? rootCat : rootCat?.concat(parentCat || []);

  return (
    <Box>
      <Helmet>
        <title>{page}</title>
      </Helmet>

      <ChakraBreadcrumb page={page} />

      <Flex
        w="100%"
        gap={{ base: 4, xl: 5 }}
        flexDir={{ base: "column", md: "row" }}
        px={{ base: 1, md: 1.5 }}
        justifyContent="space-between"
      >
        <Box flexGrow={1}>
          <Alert status="warning" my={3}>
            <AlertIcon />
            <AlertDescription>Chỉ hỗ trợ đến danh mục cấp 3.</AlertDescription>
          </Alert>
          <Box ml={3}>
            <Text fontSize={"xs"}>
              Có 3 cấp danh mục: gốc {">"} cha {">"} con
            </Text>
            <Flex align="center" gap={1} fontSize={"xs"}>
              Ví dụ:
              <span className="text-primary">Mỹ phẩm</span>
              {">"}
              <span className="text-primary">Chăm sóc da mặt</span>
              {">"}
              <span className="text-primary">Sữa rửa mặt </span>
            </Flex>
          </Box>
          {isFetching ? (
            <Center>
              <Spinner />
            </Center>
          ) : (
            categoryTree?.map((i, index) => (
              <li
                key={index}
                className="relative w-full list-none overflow-hidden"
              >
                <Item
                  currentId={id}
                  title={i.title}
                  id={i.id}
                  child={i.child_links as any}
                  onClick={onClick}
                  onDelete={onDelete}
                />
              </li>
            ))
          )}
        </Box>
        <VStack
          spacing={3}
          h="fit-content"
          position="sticky"
          top={0}
          minW={{ base: "100%", md: "45%" }}
        >
          <Flex w="100%" justify="space-between" gap={2} align="center">
            <Popover
              isOpen={open}
              placement="bottom"
              onClose={() => setOpen(false)}
            >
              <PopoverTrigger>
                <Heading
                  size="md"
                  display="inline-flex"
                  alignItems="center"
                  gap={2}
                  color={accent}
                >
                  Thông tin chi tiết
                  <HiInformationCircle
                    className="cursor-pointer"
                    onMouseEnter={() => setOpen(true)}
                    onMouseLeave={() => setOpen(false)}
                  />
                </Heading>
              </PopoverTrigger>
              <PopoverContent
                w="100%"
                maxW={{ base: "100%", md: "500px", lg: "600px" }}
              >
                <PopoverArrow />

                <PopoverBody w="100%" fontSize="sm">
                  <Text>
                    Form này cho cả tạo mới & cập nhật danh mục. Bên góc trên
                    tay phải có thể nhìn thấy danh mục hiện tại. "---" nghĩa là
                    không có.
                  </Text>
                  <Text>
                    Ngoài ra tên nút
                    <span className="text-primary"> màu xanh </span>
                    bên phải cũng thay đổi để có thể biết được đang sửa hay thêm
                    mới danh mục.
                  </Text>
                  <Text>
                    Nếu đang ở chế độ sửa mà muốn thêm mới, có thể nhấn nút
                    <span className="text-red-500"> Reset </span>
                    để đặt mọi thứ về ban đầu.
                  </Text>
                </PopoverBody>
              </PopoverContent>
            </Popover>

            <Text fontSize="sm">Mã danh mục hiện tại: {id || "---"}</Text>
          </Flex>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-3">
            <FormControl isRequired>
              <FormLabel>Tên</FormLabel>
              <Input
                {...register("name", { required: message })}
                onChange={(e) =>
                  !id && setValue("type", slugify(unidecode(e.target.value)))
                }
              />
            </FormControl>

            <FormControl>
              <FormLabel>Đường dẫn</FormLabel>

              <Input {...register("type", { required: message })} />
            </FormControl>

            <FormControl isDisabled={disabled}>
              <FormLabel>Danh mục cha</FormLabel>
              <Select
                value={root || "none"}
                onChange={(e) => setRoot(Number(e.target.value))}
              >
                <option value="none">---</option>
                {array?.map((item) => (
                  <option value={item.id} key={item.id}>
                    {item.name}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Danh mục</FormLabel>
              <Select
                isDisabled={!Boolean(id)}
                value={parent || "none"}
                onChange={(e) => setParent(Number(e.target.value))}
              >
                <option value="none">---</option>
                {data?.map((i) => (
                  <option value={i.id} key={i.id}>
                    {i.name}
                  </option>
                ))}
              </Select>
            </FormControl>
            <Flex justify="space-between">
              <Button
                onClick={reset}
                variant="outline"
                size="sm"
                colorScheme="red"
              >
                Reset
              </Button>

              <Button
                size="sm"
                colorScheme="green"
                isLoading={isPending}
                loadingText={"Đợi xíu"}
                type="submit"
                variant="outline"
              >
                {id ? "Cập nhật" : "Tạo mới"}
              </Button>
            </Flex>
          </form>

          {/* tutor */}

          <Popover
            isOpen={hover}
            placement="bottom"
            onClose={() => setHover(false)}
          >
            <PopoverTrigger>
              <Flex
                align="center"
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(true)}
                gap={2}
                alignSelf="baseline"
                mt={1}
              >
                <BsQuestionCircle />
                <Text>Lưu ý</Text>
              </Flex>
            </PopoverTrigger>
            <PopoverContent
              w="100%"
              maxW={{ base: "100%", md: "500px", lg: "600px" }}
            >
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Những điều cần biết</PopoverHeader>
              <PopoverBody w="100%" fontSize="sm">
                <Text>Bên cạnh mỗi danh mục có 2 nút: sửa & xóa</Text>
                <Text color="darkorange">
                  Lưu ý: Khi xóa một danh mục, tất cả các danh mục con của nó
                  (nếu có) sẽ tự động được chuyển thành danh mục gốc.
                </Text>

                <Image
                  src="/flow.png"
                  maxW="500px"
                  minW="100px"
                  alt="anh huong dan xoa danh muc"
                />
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </VStack>
      </Flex>
    </Box>
  );
}

interface ItemProps {
  id?: number;
  title: string;
  child?: {
    id: number;
    title: string;
    type: string;
    child?: {
      id: number;
      type: string;
      title: string;
    }[];
  }[];
  onClick: (e: any) => void;
  onDelete: (id: number) => void;
  currentId: number | null;
}

function Item({ currentId, id, title, child, onClick, onDelete }: ItemProps) {
  const accent = useColorModeValue("primary", "secondary");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [internalId, setInternalId] = useState<null | number>(0);

  function open(e: any) {
    e.stopPropagation();
    setInternalId(Number(e.currentTarget.id));
    onOpen();
  }

  return (
    <>
      <Accordion allowMultiple>
        <AccordionItem className="!border-none">
          <h2>
            <AccordionButton pl={0} py={0} _expanded={{ color: accent }}>
              <Box as="span" p={2} flex="1" textAlign="left">
                {title}
                <Tooltip label="Sửa">
                  <IconButton
                    as="span"
                    size="xs"
                    onClick={onClick}
                    id={`${id?.toString()}-root`}
                    colorScheme="green"
                    variant="outline"
                    ml={5}
                    aria-label="edit"
                    icon={<TbPencilCog />}
                  />
                </Tooltip>

                <Tooltip label="Xóa">
                  <IconButton
                    as="span"
                    size="xs"
                    onClick={open}
                    id={`${id?.toString()}`}
                    colorScheme="red"
                    variant="outline"
                    ml={5}
                    aria-label="delete"
                    icon={<TbTrash />}
                  />
                </Tooltip>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} display="flex" flexDir="column" fontSize="md">
            {child?.map((child) => {
              return child.child ? (
                <Accordion allowMultiple key={child.type}>
                  <AccordionItem className="!border-none" my={1}>
                    <h2>
                      <AccordionButton my={1} _expanded={{ color: accent }}>
                        <Box as="span" flex="1" textAlign="left">
                          <Box>
                            {child.title}
                            <Tooltip label="Sửa">
                              <IconButton
                                as="span"
                                id={`${child?.id?.toString()}-parent`}
                                onClick={onClick}
                                size="xs"
                                colorScheme="green"
                                variant="outline"
                                ml={5}
                                aria-label="edit"
                              >
                                <TbPencilCog />
                              </IconButton>
                            </Tooltip>
                            <Tooltip label="Xóa">
                              <IconButton
                                as="span"
                                size="xs"
                                onClick={open}
                                id={`${child?.id?.toString()}`}
                                colorScheme="red"
                                variant="outline"
                                ml={5}
                                aria-label="delete"
                                icon={<TbTrash />}
                              />
                            </Tooltip>
                          </Box>
                        </Box>
                        {child.child.length > 0 && <AccordionIcon />}
                      </AccordionButton>
                    </h2>

                    <AccordionPanel
                      py={2}
                      display="flex"
                      flexDir="column"
                      gap={5}
                      fontSize="md"
                    >
                      {child?.child?.map((link) => (
                        <Flex
                          cursor="pointer"
                          className={`${
                            currentId == link.id ? "text-primary" : ""
                          } pl-3 hover:text-primary dark:hover:text-secondary`}
                          key={link.type}
                          align="center"
                          gap={2}
                        >
                          <IoChevronForward />

                          {link.title}
                          <Tooltip label="Sửa">
                            <IconButton
                              as="span"
                              id={`${link?.id?.toString()}-child`}
                              onClick={onClick}
                              size="xs"
                              colorScheme="green"
                              variant="outline"
                              ml={5}
                              aria-label="edit"
                            >
                              <TbPencilCog />
                            </IconButton>
                          </Tooltip>
                          <Tooltip label="Xóa">
                            <IconButton
                              as="span"
                              size="xs"
                              onClick={open}
                              id={`${link?.id?.toString()}`}
                              colorScheme="red"
                              variant="outline"
                              ml={5}
                              aria-label="delete"
                              icon={<TbTrash />}
                            />
                          </Tooltip>
                        </Flex>
                      ))}
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              ) : (
                <Flex key={child.type} align="center" gap={2} mt={2}>
                  <IoChevronForward />
                  {child.title}
                  <Tooltip label="Sửa">
                    <IconButton
                      as="span"
                      id={`${child?.id?.toString()}-parent`}
                      onClick={onClick}
                      size="xs"
                      colorScheme="green"
                      variant="outline"
                      ml={5}
                      aria-label="edit"
                    >
                      <TbPencilCog />
                    </IconButton>
                  </Tooltip>
                  <Tooltip label="Xóa">
                    <IconButton
                      as="span"
                      size="xs"
                      onClick={open}
                      id={`${child?.id?.toString()}`}
                      colorScheme="red"
                      variant="outline"
                      ml={5}
                      aria-label="delete"
                      icon={<TbTrash />}
                    />
                  </Tooltip>
                </Flex>
              );
            })}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      <DeleteDialog
        isOpen={isOpen}
        onClose={onClose}
        id={internalId}
        onAction={onDelete}
      />
    </>
  );
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAction: (id: number) => void;
  id: number | null;
}

function DeleteDialog({ id, isOpen, onClose, onAction }: Props) {
  const cancelRef = useRef(null);

  function onClick() {
    if (!id) return;
    onAction(id);
    onClose();
  }

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isCentered
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Xóa danh mục
          </AlertDialogHeader>

          <AlertDialogBody>
            Chắc chắn xóa? Hành động này không thể hoàn tác
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Hủy
            </Button>
            <Button colorScheme="red" onClick={onClick} ml={3}>
              Xác nhận
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
