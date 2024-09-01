// libs
import { useRef, useState } from "react";
import { NumericFormat } from "react-number-format";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-hot-toast";
import slugify from "react-slugify";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  useColorModeValue,
  Button,
  Grid,
  Select,
  VStack,
  Heading,
  Checkbox,
  Flex,
  Badge,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  Box,
  AccordionPanel,
  AccordionIcon,
  Skeleton,
} from "@chakra-ui/react";

// UI
import QuillEditor from "./QuillEditor";
import FilesDropzone from "./FilesDropzone";
import ChakraAlert from "../../ui/ChakraAlert";
import NameInput from "./NameInput";
import GoBackButton from "../../ui/GoBackButton";

// variables, custom hooks, helper funcs, messages
import {
  BASE_MEDIA_UPLOAD,
  INSTOCK,
  LIMIT_IMG_UPLOAD,
  LIMIT_VID_UPLOAD,
  OUT_STOCK,
  OUT,
  TEMP_OUT,
  maxDesLength,
  maxLength,
  million,
  minDesLength,
  minLength,
} from "../../constants/anyVariables";
import { getStatusBadgeColor, parseCurrency } from "../../utils/helper";
import { reform } from "../../constants/message";

import { useCreateRE } from "./useCreateRE";
import { useUpdateRE } from "./useUpdateRE";
import FormActions from "./FormActions";
import unidecode from "unidecode";
import { useGetCategories } from "../../hooks/useGetCategories";
import { ListProps } from "../../model";

interface Props {
  level: number;
  userID: string;
  edit?: boolean;
  editData: ListProps["data"];
}

function REForm({ level, userID, edit = false, editData }: Props) {
  // other states and derived states goes here
  const accent = useColorModeValue("primary", "secondary");
  let badgeColor = getStatusBadgeColor(editData?.status.id);

  const { categoryTree, isFetching } = useGetCategories();
  const [root, setRoot] = useState(0);
  const [parent, setParent] = useState(0);
  const child = useRef(0);

  // track new added & deleted medias & docs
  const addImagesRef = useRef([]);
  const addVideosRef = useRef([]);
  const deleteMediasRef = useRef([]);

  // load existed medias and docs
  const existedImages =
    editData?.images.filter((media) => media.isImage === true) || [];
  const existedVideos =
    editData?.images.filter((media) => media.isImage !== true) || [];

  // medias & docs state
  const [files, setFiles] = useState({
    images: [...existedImages],
    videos: [...existedVideos],
  });

  // custom hooks
  const { isCreating, create } = useCreateRE();
  const { update, isUpdating } = useUpdateRE();

  // initialize form, load values if editing
  const {
    control,
    register,
    formState: { errors },
    setError,
    setValue,
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: editData?.name,
      price: editData?.price,
      des: editData?.description,
      files: {
        images: existedImages,
        videos: existedVideos,
      },
      brand: editData?.brand,
      manu: editData?.manufacturer,
      spec: editData?.specification,
      status: editData?.status.id,
    },
  });

  function onSubmit(data: any) {
    // check description exist
    if (!data.des) {
      return setError("des", {
        type: "required",
        message: reform.missingDes,
      });
    }
    // check submit data has files? is the number of images enough?
    if (!data?.files || data?.files?.images?.length < BASE_MEDIA_UPLOAD) {
      return setError("files", {
        type: "required",
        message: reform.missingImages,
      });
    }

    // parse the price and check
    const priceNum = parseCurrency(data.price);
    // check price
    if (priceNum < million) {
      return setError("price", {
        type: "min",
        message: reform.minPrice,
      });
    }

    const formattedName = unidecode(data.name);
    const slug = slugify(formattedName);

    if (!edit) {
      create({
        ...data,
        price: priceNum,
        status: INSTOCK,
        userID,
        slug,
      });
    } else {
      update({
        ...data,
        level: level,
        userID,
        price: priceNum,
        status: INSTOCK,
        slug,
        // medias
        deleteMedias: deleteMediasRef.current,
        newMedias: {
          images: addImagesRef.current,
          videos: addVideosRef.current,
        },
      });
    }
  }

  return (
    <>
      {edit && <GoBackButton />}
      <form onSubmit={handleSubmit(onSubmit)} className="mb-5">
        <Flex align="center" pt="18" pb={2}>
          <Heading size={{ base: "sm", md: "md" }} noOfLines={1}>
            {!edit ? "Thêm mới" : "Sửa"} thông tin sản phẩm
          </Heading>
        </Flex>
        <ChakraAlert
          type="info"
          message={`Vui lòng điền đầy đủ các trường có dấu`}
          html={`<span className="text-red-500 ml-1">*</span>`}
        />
        <VStack gap={3} my={3}>
          <Accordion w="full" allowMultiple>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box
                    as="span"
                    fontWeight={600}
                    color={accent}
                    flex="1"
                    textAlign="left"
                    fontSize={{ base: "sm", md: "md" }}
                  >
                    1. Danh mục sản phẩm
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={3}>
                <VStack gap={3}>
                  <Grid templateColumns="repeat(3, 1fr)" gap={3} w="100%">
                    {isFetching ? (
                      <>
                        <Skeleton
                          height="40px"
                          borderRadius="0.375rem"
                        ></Skeleton>
                        <Skeleton
                          height="40px"
                          borderRadius="0.375rem"
                        ></Skeleton>
                        <Skeleton
                          height="40px"
                          borderRadius="0.375rem"
                        ></Skeleton>
                      </>
                    ) : (
                      <>
                        <FormControl isRequired>
                          <FormLabel>Danh mục gốc</FormLabel>
                          <Select
                            onChange={(e) => setRoot(Number(e.target.value))}
                            defaultValue="none"
                          >
                            <option value="none">---</option>
                            {categoryTree?.map((item) => (
                              <option value={item.id} key={item.id}>
                                {item.title}
                              </option>
                            ))}
                          </Select>
                        </FormControl>

                        <FormControl>
                          <FormLabel>Danh mục cha</FormLabel>
                          <Select
                            defaultValue="none"
                            onChange={(e) => setParent(Number(e.target.value))}
                          >
                            {!root ? (
                              <option value="none">
                                Vui lòng chọn danh mục gốc trước
                              </option>
                            ) : (
                              categoryTree
                                ?.find((i) => i.id === root)
                                ?.child_links?.map((item) => (
                                  <option value={item.id} key={item.id}>
                                    {item.title}
                                  </option>
                                ))
                            )}
                          </Select>
                        </FormControl>
                        <FormControl>
                          <FormLabel>Danh mục con</FormLabel>
                          <Select
                            defaultValue="none"
                            onChange={(e) =>
                              (child.current = Number(e.target.value))
                            }
                          >
                            {!parent ? (
                              <option value="none">
                                Vui lòng chọn danh mục cha trước
                              </option>
                            ) : (
                              categoryTree
                                ?.reduce((acc: any[], cur) => {
                                  if (cur.id === root) {
                                    const found = cur.child_links?.find(
                                      (i) => i.id === parent,
                                    )?.child;
                                    return found || [];
                                  }

                                  return acc;
                                }, [])
                                .map((i) => (
                                  <option value={i.id} key={i.id}>
                                    {i.title}
                                  </option>
                                ))
                            )}
                          </Select>
                        </FormControl>
                      </>
                    )}
                  </Grid>
                </VStack>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <AccordionButton>
                <Heading
                  w="full"
                  color={accent}
                  fontWeight={600}
                  as="h2"
                  fontFamily="lexend"
                  textAlign="left"
                  fontSize={{ base: "sm", md: "md" }}
                >
                  2. Các thông tin chính
                </Heading>
                <AccordionIcon />
              </AccordionButton>

              <AccordionPanel>
                <VStack gap={3}>
                  {/* title */}
                  <NameInput
                    register={register("name", {
                      required: reform.missingName,
                      value: editData?.name,
                      minLength: {
                        value: minLength,
                        message: reform.nameTooShort,
                      },
                      maxLength: {
                        value: maxLength,
                        message: reform.nameTooLong,
                      },
                    })}
                    postId={editData?.id}
                    error={errors?.name}
                  />
                  {/* area & price */}
                  <Grid gap={3} templateColumns="repeat(2,1fr)" w="100%">
                    <FormControl isRequired isInvalid={Boolean(errors.price)}>
                      <FormLabel>Giá sản phẩm</FormLabel>
                      <Controller
                        name="price"
                        control={control}
                        rules={{
                          required: reform.requiredMessage,
                        }}
                        render={({ field: { onChange } }) => (
                          <Input
                            as={NumericFormat}
                            prefix="₫"
                            thousandSeparator="."
                            decimalSeparator=","
                            onChange={onChange}
                            defaultValue={editData?.price}
                          />
                        )}
                      />
                      {errors.price && (
                        <FormErrorMessage>
                          {errors.price.message}
                        </FormErrorMessage>
                      )}
                    </FormControl>
                    <FormControl isInvalid={Boolean(errors.status)}>
                      <FormLabel>Trạng thái</FormLabel>
                      <Select
                        {...register("status", {
                          required: reform.requiredMessage,
                        })}
                      >
                        <option value={INSTOCK}>Còn hàng</option>
                        <option value={TEMP_OUT}>Tạm hết hàng</option>
                        <option value={OUT_STOCK}>Hết hàng</option>
                        <option value={OUT}>Ngừng nhập hàng</option>
                      </Select>
                      {errors.brand && (
                        <FormErrorMessage>
                          {errors.brand.message}
                        </FormErrorMessage>
                      )}
                    </FormControl>
                  </Grid>

                  {/* other fields */}
                  <Grid templateColumns="repeat(3,1fr)" w="100%" gap={3}>
                    <FormControl isInvalid={Boolean(errors.brand)}>
                      <FormLabel>Thương hiệu</FormLabel>
                      <Input {...register("brand")} />
                      {errors.brand && (
                        <FormErrorMessage>
                          {errors.brand.message}
                        </FormErrorMessage>
                      )}
                    </FormControl>
                    <FormControl isInvalid={Boolean(errors.manu)}>
                      <FormLabel>Nhà sản xuất</FormLabel>
                      <Input {...register("manu")} />
                      {errors.manu && (
                        <FormErrorMessage>
                          {errors.manu.message}
                        </FormErrorMessage>
                      )}
                    </FormControl>

                    <FormControl isInvalid={Boolean(errors.spec)}>
                      <FormLabel>Quy cách</FormLabel>
                      <Input
                        {...register("spec")}
                        placeholder="1 hộp 30 gói 100mg"
                      />
                      {errors.spec && (
                        <FormErrorMessage>
                          {errors.spec.message}
                        </FormErrorMessage>
                      )}
                    </FormControl>
                  </Grid>
                </VStack>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
          {/* des */}
          <FormControl isRequired isInvalid={Boolean(errors.des)}>
            <FormLabel>Mô tả chi tiết</FormLabel>
            {errors.des && (
              <FormErrorMessage>
                {errors.des.message?.toString()}
              </FormErrorMessage>
            )}
            <Controller
              name="des"
              control={control}
              render={({ field: { onChange } }) => (
                <QuillEditor
                  onChange={onChange}
                  allowImage
                  value={editData?.description}
                />
              )}
              rules={{
                minLength: {
                  value: minDesLength,
                  message: reform.desTooShort,
                },
                maxLength: {
                  value: maxDesLength,
                  message: reform.desTooLong,
                },
              }}
            />
          </FormControl>
          {/* file input */}
          <Flex
            width="full"
            flexDirection={{ base: "column", md: "row" }}
            gap={3}
            align={{ base: "start", md: "end" }}
          >
            <FormControl isRequired isInvalid={Boolean(errors.files)}>
              <FormLabel>Hình ảnh, video bất động sản</FormLabel>

              <FormHelperText mb={2}>
                {files.images.length}/{LIMIT_IMG_UPLOAD} ảnh -{" "}
                {files.videos.length}/{LIMIT_VID_UPLOAD} videos
              </FormHelperText>
              {errors.files && (
                <FormErrorMessage>{errors.files.message}</FormErrorMessage>
              )}
              <Controller
                name="files"
                control={control}
                render={({ field: { onChange } }) => (
                  <FilesDropzone
                    files={files}
                    setFiles={setFiles}
                    setValue={setValue}
                    onChange={onChange}
                    addImagesRef={addImagesRef}
                    addVideosRef={addVideosRef}
                    deleteMediasRef={deleteMediasRef}
                  />
                )}
              />
            </FormControl>
          </Flex>

          {/* note */}
          {edit && <ChakraAlert type="warning" message={reform.note} />}

          {editData?.status.id !== OUT_STOCK && (
            <Flex
              w="100%"
              justify={edit ? "space-between" : "end"}
              align="center"
            >
              {edit && (
                <FormActions
                  postID={editData!.id}
                  statusID={editData!.status.id}
                  userID={userID}
                  level={level}
                />
              )}
              <Button
                isLoading={isCreating || isUpdating}
                loadingText={!edit ? reform.creating : reform.saving}
                borderWidth={2}
                colorScheme="green"
                variant="outline"
                type="submit"
              >
                {!edit ? reform.submit : reform.save}
              </Button>
            </Flex>
          )}
        </VStack>
      </form>
    </>
  );
}

export default REForm;
