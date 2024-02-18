// libs
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
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import slugify from "react-slugify";

// UI
import QuillEditor from "./QuillEditor";
import FilesDropzone from "./FilesDropzone";
import ChakraNumberInput from "../../ui/ChakraNumberInput";
import ChakraAlert from "../../ui/ChakraAlert";
import AddressSelect from "./AddressSelect";
import DocumentCheckBoxes from "./DocumentCheckBoxes";
import NameInput from "./NameInput";

// others
import {
  BASE_MEDIA_UPLOAD,
  DEFAULT_RE_STATUS,
  LIMIT_IMG_UPLOAD,
  LIMIT_VID_UPLOAD,
  maxDesLength,
  maxLength,
  minDesLength,
  minLength,
} from "../../constants/anyVariables";
import { directions, navLinks } from "../../constants/navlink";
import { useCreateRE } from "./useCreateRE";

function REForm({ id, edit = false, editData }) {
  const {
    control,
    register,
    formState: { errors },
    getValues,
    setError,
    setValue,
    handleSubmit,
  } = useForm();

  const [purType, setPurType] = useState(true);
  const arr = purType ? navLinks[0].child_links : navLinks[1].child_links;

  const [files, setFiles] = useState({ images: [], videos: [] });
  const [docs, setDocs] = useState([]);
  const [searchParams] = useSearchParams();

  // submit & create new re
  const { isCreating, mutate } = useCreateRE();

  function onSubmit(data) {
    const cityID =
      searchParams.get("city") !== "none" ? searchParams.get("city") : null;
    const disID =
      searchParams.get("dis") !== "none" ? searchParams.get("dis") : null;
    const wardID =
      searchParams.get("ward") !== "none" ? searchParams.get("ward") : null;

    // check address
    if (!cityID || !disID || !wardID) {
      return toast.error("dmm select dia chi");
    }
    console.log(cityID, disID, wardID);
    // check description exist
    if (!data.des) {
      return setError("des", {
        type: "required",
        message: "vui long dien mo ta chi tiet",
      });
    }
    // check submit data has files? is the number of images enough?
    if (!data.files || data.files.images.length < BASE_MEDIA_UPLOAD) {
      return setError("files", {
        type: "required",
        message: `so luong anh cung cap it nhat la ${BASE_MEDIA_UPLOAD}`,
      });
    }
    console.log(data, cityID, disID, wardID);
    mutate({
      ...data,
      cityID,
      disID,
      wardID,
      purType: purType,
      status: DEFAULT_RE_STATUS,
      userID: id,
      docs,
      slug: slugify(data.name),
    });
  }

  return (
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
            colorScheme={
              editData?.status !== DEFAULT_RE_STATUS ? "red" : "green"
            }
            fontSize="sm"
            p="3px 10px"
            borderRadius="lg"
            textTransform="capitalize"
          >
            {editData?.status !== DEFAULT_RE_STATUS ? "Chưa duyệt" : "Đã duyệt"}
          </Badge>
        </Flex>
      </Flex>
      <ChakraAlert
        type="info"
        message={`Vui lòng điền đủ trường có dấu`}
        html={`<span className="text-red-500 ml-1">*</span>`}
      />
      <VStack gap={3} my={3}>
        {/* purType & re type */}
        <Grid templateColumns="repeat(2,1fr)" gap={3} w="100%">
          <FormControl isRequired>
            <FormLabel>Dạng bán</FormLabel>
            <Select onChange={(e) => setPurType(e.target.value === "true")}>
              <option value="true">Bán</option>
              <option value="false">Cho thuê</option>
            </Select>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Loại hình</FormLabel>
            <Select {...register("reType")}>
              {arr.map((opt) => (
                <option value={opt.type} key={opt.type}>
                  {opt.title}
                </option>
              ))}
            </Select>
          </FormControl>
        </Grid>
        {/* address */}
        <AddressSelect />
        {/* address - details */}
        <FormControl isRequired>
          <FormLabel>Địa chỉ cụ thể</FormLabel>
          <Input
            type="text"
            placeholder="Số nhà - Ngõ - Ngách"
            {...register("address")}
          />
        </FormControl>
        {/* title */}
        <NameInput
          register={register("name", {
            required: "ten bai viet la gif?",
            // dev
            minLength: { value: 10, message: "viet dai them vao" },
            maxLength: {
              value: maxLength,
              message: "dm vuot qua so ki tu roi",
            },
          })}
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
            placeholder="mét"
          />

          <ChakraNumberInput
            register={register}
            name="price"
            error={errors.price}
            label={`Giá trị ${purType ? "bán" : "thuê / tháng"}`}
            req={true}
            placeholder={purType ? "tỷ" : "triệu"}
          />
        </Grid>

        {/* documents */}
        <DocumentCheckBoxes setDocs={setDocs} />

        {/* other fields */}
        <Grid templateColumns="repeat(3,1fr)" w="100%" gap={3}>
          <ChakraNumberInput
            register={register}
            error={errors.bed_room}
            label="Số phòng ngủ"
            name="bed_room"
          />

          <ChakraNumberInput
            register={register}
            error={errors.bath_room}
            label="Số phòng vệ sinh"
            name="bath_room"
          />

          <ChakraNumberInput
            register={register}
            error={errors.floor}
            label="Số lượng tầng"
            name="floor"
          />
        </Grid>
        <Grid templateColumns="repeat(3,1fr)" w="100%" gap={3}>
          <ChakraNumberInput
            register={register}
            name="facade"
            error={errors.facade}
            label="Mặt tiền"
          />

          <ChakraNumberInput
            register={register}
            error={errors.entryLength}
            label="Đường vào"
            name="entryLength"
          />

          <FormControl>
            <FormLabel>Hướng nhà</FormLabel>
            <Select {...register("direction")}>
              {directions.map((dir) => (
                <option value={dir} key={dir}>
                  {dir}
                </option>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Flex w="100%">
          <Checkbox size="md" {...register("fur")}>
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
              <QuillEditor onChange={onChange} allowImage={false} />
            )}
            rules={{
              minLength: {
                value: minDesLength,
                message: "vui long cung cap them chi tiet va mo ta",
              },
              maxLength: {
                value: maxDesLength,
                message: "dai the? hoc sinh gioi van quoc gia a",
              },
            }}
          />
        </FormControl>
        {/* file input */}
        <FormControl isRequired isInvalid={errors.files}>
          <FormLabel>Hình ảnh, video bất động sản</FormLabel>
          <FormHelperText mb={2}>
            {files.images.length}/{LIMIT_IMG_UPLOAD} images -{" "}
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
        <ChakraAlert
          type="warning"
          message="Mỗi lần submit sửa là bài đăng sẽ chờ duyệt lại, đảm bảo đúng các
          thông tin để đỡ phải sửa nhiều, bài đăng luôn được hiển thị :D"
        />

        <Flex w="100%" justify="flex-end">
          <Button
            isLoading={isCreating}
            loadingText="Chờ tí"
            right={0}
            colorScheme="teal"
            variant="outline"
            type="submit"
          >
            submit
          </Button>
        </Flex>
      </VStack>
    </form>
  );
}

export default REForm;
