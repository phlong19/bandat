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
  Alert,
  AlertIcon,
  Checkbox,
  Flex,
  Badge,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import QuillEditor from "./QuillEditor";

import { directions, navLinks } from "../../constants/navlink";
import FilesDropzone from "./FilesDropzone";
import {
  BASE_MEDIA_UPLOAD,
  DEFAULT_RE_STATUS,
  LIMIT_IMG_UPLOAD,
  LIMIT_VID_UPLOAD,
} from "../../constants/anyVariables";
import ChakraNumberInput from "../../ui/ChakraNumberInput";
import { useSearchbar } from "../list/useSearchbar";
import { useSearchParams } from "react-router-dom";
import { useCreateRE } from "./useCreateRE";
import { useAuth } from "../../context/UserContext";

function REForm({ edit = false }) {
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
  const [files, setFiles] = useState({ images: [], videos: [] });
  const arr = purType ? navLinks[0].child_links : navLinks[1].child_links;

  const [searchParams, setSearchParams] = useSearchParams();
  const { data, error, isLoading } = useSearchbar();

  // submit & create new re
  const { isCreating, mutate } = useCreateRE();
  const { data: authData } = useAuth();

  function onSubmit(data) {
    if (!data.files || data?.files.length < BASE_MEDIA_UPLOAD) {
      return setError("files", { type: "required", message: "dmm" });
    } else if (!data.des) {
      return setError("des", {
        type: "required",
        message: "vui long dien mo ta chi tiet",
      });
    }
 
    mutate({
      ...data,
      purType: purType,
      status: DEFAULT_RE_STATUS,
      userID: authData.id,
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
            colorScheme="red"
            fontSize="sm"
            p="3px 10px"
            borderRadius="lg"
            textTransform="capitalize"
          >
            Chưa duyệt
          </Badge>
        </Flex>
      </Flex>
      <Alert my={2} status="info">
        <AlertIcon />
        Vui lòng điền đủ trường có dấu{" "}
        <span className="ml-1 text-red-600">*</span>
      </Alert>
      <VStack gap={3}>
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
        <Grid templateColumns="repeat(3, 1fr)" gap={3} w="100%">
          <FormControl>
            <FormLabel noOfLines={1}>Tỉnh, Thành phố</FormLabel>
            <Select
              {...register("cityID")}
              value={
                data?.city?.filter(
                  (c) => c.cityID === Number(searchParams.get("city")),
                )?.[0]?.cityID || "none"
              }
              onChange={(e) => {
                searchParams.set("city", e.target.value);
                searchParams.delete("dis");
                searchParams.delete("ward");
                setSearchParams(searchParams);
              }}
              isDisabled={isLoading}
            >
              <option value="none">Tỉnh, Thành phố</option>
              {data?.city.map((item) => (
                <option value={item.cityID} key={item.cityID}>
                  {item.cityName}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Quận, huyện</FormLabel>
            <Select
              {...register("disID")}
              onChange={(e) => {
                searchParams.set("dis", e.target.value);
                searchParams.delete("ward");
                setSearchParams(searchParams);
              }}
              value={
                data?.dis?.filter(
                  (d) => d.disID === Number(searchParams.get("dis")),
                )?.[0]?.disID || "none"
              }
              isDisabled={isLoading}
            >
              {!data?.dis?.length ? (
                <option value="none">Vui lòng chọn tỉnh thành phố trước</option>
              ) : (
                <>
                  <option value="none">Quận, huyện</option>
                  {data.dis.map((item) => (
                    <option value={item.disID} key={item.disID}>
                      {item.disName}
                    </option>
                  ))}
                </>
              )}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Phường, xã</FormLabel>
            <Select
              {...register("wardID")}
              onChange={(e) => {
                searchParams.set("ward", e.target.value);
                setSearchParams(searchParams);
              }}
              defaultValue="none"
              isDisabled={isLoading}
            >
              {!data?.ward?.length ? (
                <option value="none">Vui lòng chọn quận huyện trước</option>
              ) : (
                <>
                  <option value="none">Phường, xã</option>
                  {data.ward.map((item) => (
                    <option value={item.wardID} key={item.wardID}>
                      {item.wardName}
                    </option>
                  ))}
                </>
              )}
            </Select>
          </FormControl>
        </Grid>
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
        <FormControl isRequired>
          <FormLabel>Tiêu đề</FormLabel>
          <Input type="text" {...register("name")} />
        </FormControl>
        {/* area & price */}
        <Grid gap={3} templateColumns="repeat(2,1fr)" w="100%">
          <FormControl isRequired>
            <FormLabel>Diện tích</FormLabel>
            <ChakraNumberInput register={register("area")} placeholder="mét" />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Giá trị {purType ? "bán" : "thuê / tháng"}</FormLabel>
            <ChakraNumberInput
              register={register("price")}
              placeholder={purType ? "tỷ" : "triệu"}
            />
          </FormControl>
        </Grid>
        {/* other fields */}
        <Grid templateColumns="repeat(3,1fr)" w="100%" gap={3}>
          <FormControl>
            <FormLabel>Số phòng ngủ</FormLabel>
            <ChakraNumberInput register={register("bed_room")} />
          </FormControl>
          <FormControl>
            <FormLabel>Số phòng vệ sinh</FormLabel>
            <ChakraNumberInput register={register("bath_room")} />
          </FormControl>
          <FormControl>
            <FormLabel>Số lượng tầng</FormLabel>
            <ChakraNumberInput register={register("floor")} />
          </FormControl>
        </Grid>
        <Grid templateColumns="repeat(3,1fr)" w="100%" gap={3}>
          <FormControl>
            <FormLabel>Mặt tiền</FormLabel>
            <ChakraNumberInput register={register("facade")} />
          </FormControl>
          <FormControl>
            <FormLabel>Đường vào</FormLabel>
            <ChakraNumberInput register={register("entryLength")} />
          </FormControl>
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
        <Alert status="warning">
          <AlertIcon />
          Mỗi lần submit sửa là bài đăng sẽ chờ duyệt lại, đảm bảo đúng các
          thông tin để đỡ phải sửa nhiều, bài đăng luôn được hiển thị :D
        </Alert>

        <Flex w="100%" justify="flex-end">
          <Button
            spinner={isCreating}
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
