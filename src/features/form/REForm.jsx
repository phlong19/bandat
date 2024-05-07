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
import AddressSelect from "../searchbar/AddressSelect";
import DocumentCheckBoxes from "./DocumentCheckBoxes";
import NameInput from "./NameInput";
import GoBackButton from "../../ui/GoBackButton";

// variables, custom hooks, helper funcs, messages
import {
  BASE_MEDIA_UPLOAD,
  DEFAULT_RE_STATUS,
  LIMIT_IMG_UPLOAD,
  LIMIT_VID_UPLOAD,
  SOLD_STATUS,
  m2,
  maxDesLength,
  maxLength,
  million,
  minDesLength,
  minLength,
} from "../../constants/anyVariables";
import { directions, navLinks } from "../../constants/navlink";
import { getStatusBadgeColor, parseCurrency } from "../../utils/helper";
import { reform } from "../../constants/message";

import { useCreateRE } from "./useCreateRE";
import { useUpdateRE } from "./useUpdateRE";
import FormActions from "./FormActions";
import unidecode from "unidecode";
import Files360Dropzone from "./Files360Dropzone";
import ReportTable from "../table/ReportTable";
import MapLocationPick from "./MapLocationPick";

function REForm({ currentUserLevel, userID, edit = false, editData }) {
  // other states and derived states goes here
  const [purType, setPurType] = useState(true);
  const accent = useColorModeValue("primary", "secondary");
  const arr = purType ? navLinks[0].child_links : navLinks[1].child_links;
  let badgeColor = getStatusBadgeColor(editData?.status.id);

  // track new added & deleted medias & docs
  const addImagesRef = useRef([]);
  const addVideosRef = useRef([]);
  const deleteMediasRef = useRef([]);
  const deleteDocsRef = useRef([]);
  const addDocsRef = useRef([]);

  // load existed medias and docs
  const existedImages =
    editData?.medias.filter(
      (media) => media.isImage === true && media.is360Image === false,
    ) || [];
  const existedVideos =
    editData?.medias.filter((media) => media.isImage !== true) || [];
  const existed360 =
    editData?.medias.filter((media) => media.is360Image === true) || [];
  const existedDocs = editData?.docs || [];

  // medias & docs state
  const [files, setFiles] = useState({
    images: [...existedImages],
    videos: [...existedVideos],
  });
  const [files360, setFiles360] = useState([...existed360]);

  const [docs, setDocs] = useState([...existedDocs]);

  const [check, setCheck] = useState(existed360.length > 0);

  // for address select
  const [cityID, setCityID] = useState(editData?.cityID || NaN);
  const [disID, setDisID] = useState(editData?.disID || NaN);
  const [wardID, setWardID] = useState(editData?.wardID || NaN);
  const [position, setPosition] = useState(
    edit ? { lat: editData.lat, lng: editData.long } : null,
  );

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
      address: editData?.address,
      price: editData?.price,
      des: editData?.des,
      files: {
        images: existedImages,
        videos: existedVideos,
      },
      files360: existed360,
    },
  });

  function onSubmit(data) {
    // check address
    if (!cityID || !disID || !wardID) {
      return toast.error(reform.missingAddress);
    }
    // check docs
    if (docs.length < 1) {
      return toast.error(reform.requiredDocs);
    }
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
        cityID,
        disID,
        wardID,
        purType,
        status: DEFAULT_RE_STATUS,
        userID,
        docs,
        slug,
        lat: position?.lat || null,
        long: position?.lng || null,
      });
    } else {
      update({
        ...data,
        level: currentUserLevel,
        userID,
        authorID: editData?.userID,
        postID: editData.id,
        price: priceNum,
        cityID,
        disID,
        wardID,
        purType,
        status: DEFAULT_RE_STATUS,
        slug,
        // docs
        newDocs: addDocsRef.current,
        deleteDocs: deleteDocsRef.current,
        // medias
        deleteMedias: deleteMediasRef.current,
        newMedias: {
          images: addImagesRef.current,
          videos: addVideosRef.current,
        },
        oldFiles360: existed360,
        lat: position?.lat || null,
        long: position?.lng || null,
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
            {!edit ? "Tạo" : "Sửa"} bài đăng bán bất động sản
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
              {editData?.status.status || "Chưa duyệt"}
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
                    1. Địa chỉ BĐS
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
                      <Select
                        onChange={(e) => setPurType(e.target.value === "true")}
                        value={editData?.purType}
                      >
                        <option value="true">Bán</option>
                        <option value="false">Cho thuê</option>
                      </Select>
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel>Loại hình</FormLabel>
                      <Select
                        {...register("reType")}
                        value={editData?.type.type}
                      >
                        {arr.map((opt) => (
                          <option value={opt.type} key={opt.type}>
                            {opt.title}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  {/* address */}
                  <AddressSelect
                    isForm
                    cityID={cityID}
                    disID={disID}
                    wardID={wardID}
                    setCityID={setCityID}
                    setDisID={setDisID}
                    setWardID={setWardID}
                  />
                  {/* address - details */}
                  <FormControl isRequired>
                    <FormLabel>Địa chỉ cụ thể</FormLabel>
                    <Input
                      type="text"
                      placeholder="Số nhà - Ngõ - Ngách"
                      {...register("address")}
                    />
                  </FormControl>
                  {/* map location picker */}
                  <MapLocationPick
                    edit={edit}
                    position={position}
                    setPosition={setPosition}
                  />
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
                    error={errors.name}
                  />
                  {/* area & price */}
                  <Grid gap={3} templateColumns="repeat(2,1fr)" w="100%">
                    <ChakraNumberInput
                      register={register}
                      error={errors.area}
                      label="Diện tích"
                      name="area"
                      req={true}
                      placeholder={m2}
                      value={editData?.area}
                    />

                    <FormControl isRequired isInvalid={errors.price}>
                      <FormLabel>{`Giá trị ${
                        purType ? "bán" : "thuê / tháng"
                      }`}</FormLabel>
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

                  {/* documents */}
                  <DocumentCheckBoxes
                    setDocs={setDocs}
                    value={existedDocs}
                    deleteDocsRef={deleteDocsRef}
                    addDocsRef={addDocsRef}
                    edit={edit}
                  />

                  {/* other fields */}
                  <Grid templateColumns="repeat(3,1fr)" w="100%" gap={3}>
                    <ChakraNumberInput
                      register={register}
                      error={errors.bed_room}
                      label="Số phòng ngủ"
                      name="bed_room"
                      value={editData?.bed_room}
                      req
                    />

                    <ChakraNumberInput
                      register={register}
                      error={errors.bath_room}
                      label="Số phòng vệ sinh"
                      name="bath_room"
                      value={editData?.bath_room}
                      req
                    />

                    <ChakraNumberInput
                      register={register}
                      error={errors.floor}
                      label="Số lượng tầng"
                      name="floor"
                      value={editData?.floor}
                    />
                  </Grid>
                  <Grid templateColumns="repeat(3,1fr)" w="100%" gap={3}>
                    <ChakraNumberInput
                      register={register}
                      name="facade"
                      error={errors.facade}
                      label="Mặt tiền"
                      value={editData?.facade}
                    />

                    <ChakraNumberInput
                      register={register}
                      error={errors.entryLength}
                      label="Đường vào"
                      name="entryLength"
                      value={editData?.entryLength}
                    />

                    <FormControl>
                      <FormLabel fontSize={{ base: "sm", md: "md" }}>
                        Hướng nhà
                      </FormLabel>
                      <Select
                        {...register("direction")}
                        defaultValue={editData?.direction}
                      >
                        {directions.map((dir) => (
                          <option value={dir} key={dir}>
                            {dir}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Flex w="100%">
                    <Checkbox
                      size={{ base: "sm", md: "md" }}
                      {...register("fur")}
                      defaultChecked={editData?.fur}
                    >
                      Bất động sản có bao gồm nội thất?
                    </Checkbox>
                  </Flex>
                </VStack>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
          {/* des */}
          <FormControl isRequired isInvalid={errors.des}>
            <FormLabel>Mô tả chi tiết</FormLabel>
            {errors.des && (
              <FormErrorMessage>{errors.des.message}</FormErrorMessage>
            )}
            <Controller
              name="des"
              control={control}
              render={({ field: { onChange } }) => (
                <QuillEditor
                  onChange={onChange}
                  allowImage={false}
                  value={editData?.des}
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
            <FormControl isRequired isInvalid={errors.files}>
              <FormLabel>Hình ảnh, video bất động sản</FormLabel>
              <Checkbox
                required={false}
                onChange={() => {
                  setCheck((s) => !s);
                  setFiles360([]);
                  setValue("files360", []);
                }}
                size="sm"
                color={useColorModeValue("gray.700", "gray.400")}
                defaultChecked={check}
              >
                Tôi có thể cung cấp ảnh 360°
              </Checkbox>
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

            {check && (
              <FormControl
                isInvalid={false}
                w={files360.length < 1 ? "70%" : "30%"}
                minW={{ base: "full", md: "auto" }}
              >
                <FormLabel>Hình ảnh 360°</FormLabel>
                <FormHelperText mb={2}>{files360.length}/1 ảnh</FormHelperText>
                <Controller
                  control={control}
                  name="files360"
                  render={({ field: { onChange } }) => (
                    <Files360Dropzone
                      onChange={onChange}
                      files={files360}
                      setFiles={setFiles360}
                      setValue={setValue}
                    />
                  )}
                />
              </FormControl>
            )}
          </Flex>

          {/* note */}
          {edit && <ChakraAlert type="warning" message={reform.note} />}

          {editData?.status.id !== SOLD_STATUS && (
            <Flex
              w="100%"
              justify={edit ? "space-between" : "end"}
              align="center"
            >
              {edit && (
                <FormActions
                  authorID={editData.profile.id}
                  postID={editData.id}
                  statusID={editData.status.id}
                  userID={userID}
                  level={currentUserLevel}
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

      {edit && <ReportTable id={editData.id} />}
    </>
  );
}

export default REForm;
