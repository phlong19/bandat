// libs
import { useState } from "react";
import { NumericFormat } from "react-number-format";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import slugify from "react-slugify";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  Grid,
  Select,
  VStack,
  Heading,
  Checkbox,
  Flex,
  Badge,
  Text,
} from "@chakra-ui/react";

// icon
import { LuChevronsLeft } from "react-icons/lu";

// UI
import QuillEditor from "./QuillEditor";
import FilesDropzone from "./FilesDropzone";
import ChakraNumberInput from "../../ui/ChakraNumberInput";
import ChakraAlert from "../../ui/ChakraAlert";
import AddressSelect from "../searchbar/AddressSelect";
import DocumentCheckBoxes from "./DocumentCheckBoxes";
import NameInput from "./NameInput";

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

function REForm({ id, edit = false, editData }) {
  const {
    control,
    register,
    reset,
    formState: { errors },
    setError,
    setValue,
    handleSubmit,
  } = useForm();

  const [purType, setPurType] = useState(true);
  const arr = purType ? navLinks[0].child_links : navLinks[1].child_links;

  const existedImages =
    editData?.medias.filter((media) => media.isImage === true) || [];
  const existedVideos =
    editData?.medias.filter((media) => media.isImage !== true) || [];

  const [files, setFiles] = useState({
    images: [...existedImages],
    videos: [...existedVideos],
  });

  // initial existed docs when edit data
  const existedDocs = editData?.docs.map((doc) => doc.docName.doc_id) || [];
  const [docs, setDocs] = useState([...existedDocs]);

  // for address select
  const [cityID, setCityID] = useState(NaN);
  const [disID, setDisID] = useState(NaN);
  const [wardID, setWardID] = useState(NaN);

  // custom hooks
  const { isCreating, create } = useCreateRE();
  const { update, isUpdating } = useUpdateRE();

  let badgeColor = getStatusBadgeColor(editData?.status.id);

  function onSubmit(data) {
    // check address
    if (!cityID || !disID || !wardID) {
      return toast.error(reform.missingAddress);
    }
    // return;
    // check description exist
    if (!data.des) {
      return setError("des", {
        type: "required",
        message: reform.missingDes,
      });
    }
    // check submit data has files? is the number of images enough?
    if (!data.files || data.files.images.length < BASE_MEDIA_UPLOAD) {
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

    if (!edit) {
      create({
        ...data,
        price: priceNum,
        cityID,
        disID,
        wardID,
        purType: purType,
        status: DEFAULT_RE_STATUS,
        userID: id,
        docs,
        slug: slugify(data.name),
      });
    } else {
      update(data);
    }
  }

  return (
    <>
      {edit && (
        <Button
          variant="outline"
          fontWeight={500}
          leftIcon={<LuChevronsLeft />}
          as={Link}
          to="/quan-ly-bai-viet"
        >
          Quay lại
        </Button>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="mb-5">
        <Flex justify="space-between" align="center" pt="18" pb={2}>
          <Heading size="md" noOfLines={1}>
            {!edit ? "Tạo" : "Sửa"} bài đăng bán bất động sản
          </Heading>
          <Flex gap={3} align="center">
            <Text fontSize="sm" fontWeight="700">
              Trạng thái:
            </Text>
            <Badge
              colorScheme={badgeColor}
              fontSize="sm"
              p="3px 10px"
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
              <Select {...register("reType")} value={editData?.type.type}>
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
            cityID={cityID || editData?.cityID}
            disID={disID || editData?.disID}
            wardID={wardID || editData?.wardID}
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
              value={editData?.address}
            />
          </FormControl>
          {/* title */}
          <NameInput
            register={register("name", {
              required: reform.missingName,
              value: editData?.name,
              minLength: { value: minLength, message: reform.nameTooShort },
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
                <FormErrorMessage>{errors.price.message}</FormErrorMessage>
              )}
            </FormControl>
          </Grid>

          {/* documents */}
          <DocumentCheckBoxes setDocs={setDocs} value={existedDocs} />

          {/* other fields */}
          <Grid templateColumns="repeat(3,1fr)" w="100%" gap={3}>
            <ChakraNumberInput
              register={register}
              error={errors.bed_room}
              label="Số phòng ngủ"
              name="bed_room"
              value={editData?.bed_room}
            />

            <ChakraNumberInput
              register={register}
              error={errors.bath_room}
              label="Số phòng vệ sinh"
              name="bath_room"
              value={editData?.bath_room}
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
              <FormLabel>Hướng nhà</FormLabel>
              <Select {...register("direction")} value={editData?.direction}>
                {directions.map((dir) => (
                  <option value={dir} key={dir}>
                    {dir}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Flex w="100%">
            <Checkbox size="md" {...register("fur")} value={editData?.fur}>
              Bất động sản có bao gồm nội thất?
            </Checkbox>
          </Flex>
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
          <FormControl isRequired isInvalid={errors.files}>
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
                />
              )}
            />
          </FormControl>

          {/* note */}
          <ChakraAlert type="warning" message={reform.note} />

          {editData?.status.id !== SOLD_STATUS && (
            <Flex w="100%" justify="flex-end" align="center" gap={2}>
              <Button onClick={reset}>reset</Button>
              <Button
                isLoading={isCreating || isUpdating}
                loadingText={!edit ? reform.creating : reform.saving}
                right={0}
                borderWidth={2}
                colorScheme="teal"
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
