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
} from "@chakra-ui/react";

// UI
import QuillEditor from "./QuillEditor";
import FilesDropzone from "./FilesDropzone";
import ChakraNumberInput from "../../ui/ChakraNumberInput";
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
  m2,
  maxDesLength,
  maxLength,
  million,
  minDesLength,
  minLength,
} from "../../constants/anyVariables";
import { directions } from "../../constants/navlink";
import { getStatusBadgeColor, parseCurrency } from "../../utils/helper";
import { reform } from "../../constants/message";

import { useCreateRE } from "./useCreateRE";
import { useUpdateRE } from "./useUpdateRE";
import FormActions from "./FormActions";
import unidecode from "unidecode";
import { useGetCategories } from "../../hooks/useGetCategories";
import { ListProps } from "../../model";
import { Database } from "../../database";

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
        <Flex
          justify="space-between"
          flexDirection={{ base: "column", md: "row" }}
          gap={{ base: 2, md: 0 }}
          align="center"
          pt="18"
          pb={2}
        >
          <Heading size={{ base: "sm", md: "md" }} noOfLines={1}>
            {!edit ? "Thêm mới" : "Sửa"} thông tin sản phẩm
          </Heading>
          <Flex gap={3} align="center">
            <Text fontSize="sm" fontWeight="700">
              Trạng thái:
            </Text>
            <Badge
              colorScheme={badgeColor}
              fontSize="xs"
              p={{ base: "1.5px 8px", md: "3px 10px" }}
              borderRadius="lg"
              textTransform="capitalize"
            >
              {editData?.status?.type || "Còn hàng"}
            </Badge>
          </Flex>
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
                  {/* purType & re type */}
                  <Grid templateColumns="repeat(2, 1fr)" gap={3} w="100%">
                    <FormControl isRequired>
                      <FormLabel>Dạng bán</FormLabel>
                      <Select>
                        <option value="true">Bán</option>
                        <option value="false">Cho thuê</option>
                      </Select>
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel>Loại hình</FormLabel>
                      <Select>
                        <option>ho</option>
                      </Select>
                    </FormControl>
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
                      <FormLabel>`Giá sản phẩm</FormLabel>
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
                  </Grid>

                  {/* other fields */}
                  <Grid templateColumns="repeat(3,1fr)" w="100%" gap={3}>
                    <ChakraNumberInput
                      register={register}
                      error={""}
                      label="Số phòng ngủ"
                      name="bed_room"
                      value={0}
                      req
                    />
                  </Grid>
                  <Grid templateColumns="repeat(3,1fr)" w="100%" gap={3}>
                    <ChakraNumberInput
                      register={register}
                      error={""}
                      label="Đường vào"
                      name="entryLength"
                      value={0}
                    />

                    <FormControl>
                      <FormLabel fontSize={{ base: "sm", md: "md" }}>
                        Hướng nhà
                      </FormLabel>
                      <Select>
                        <option>hi</option>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Flex w="100%">
                    <Checkbox size={{ base: "sm", md: "md" }}>
                      Bất động sản có bao gồm nội thất?
                    </Checkbox>
                  </Flex>
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
                  allowImage={false}
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
