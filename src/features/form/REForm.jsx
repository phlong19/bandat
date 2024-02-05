import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberIncrementStepper,
  Input,
  InputGroup,
  Button,
  Grid,
  Select,
  VStack,
  Heading,
  Alert,
  AlertIcon,
  Checkbox,
  Flex,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import QuillEditor from "./QuillEditor";

import {
  directions,
  rentSelectOptions,
  sellSelectOptions,
} from "../../constants/navlink";

function REForm({ edit = false }) {
  const [purType, setPurType] = useState(true);
  const arr = purType ? sellSelectOptions : rentSelectOptions;
  const {
    control,
    register,
    formState: { errors, isSubmitting },
    getValues,
    handleSubmit,
  } = useForm();

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Heading size="md" py="18">
        Tạo bài đăng bán bất động sản
      </Heading>
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
            <Select>
              {arr.map((opt) => (
                <option value={opt.value} key={opt.label}>
                  {opt.label}
                </option>
              ))}
            </Select>
          </FormControl>
        </Grid>
        {/* address */}
        <Grid templateColumns="repeat(3,1fr)" gap={3} w="100%">
          <FormControl>
            <FormLabel>Tỉnh, Thành phố</FormLabel>
            <Select>{/* ward */}</Select>
          </FormControl>
          <FormControl>
            <FormLabel>Quận, huyện</FormLabel>
            <Select>{/* ward */}</Select>
          </FormControl>
          <FormControl>
            <FormLabel>Phường, xã</FormLabel>
            <Select>{/* ward */}</Select>
          </FormControl>
        </Grid>
        {/* address - details */}
        <FormControl isRequired>
          <FormLabel>Địa chỉ cụ thể</FormLabel>
          <Input type="text" placeholder="Số nhà - Ngõ - Ngách" />
        </FormControl>
        {/* title */}
        <FormControl isRequired>
          <FormLabel>Tiêu đề</FormLabel>
          <Input type="text" />
        </FormControl>
        {/* area & price */}
        <Grid gap={3} templateColumns="repeat(2,1fr)" w="100%">
          <FormControl isRequired>
            <FormLabel>Diện tích</FormLabel>
            <NumberInput min={1}>
              <NumberInputField placeholder="m²" />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Giá trị ước tính</FormLabel>
            <NumberInput min={1}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
        </Grid>
        <Alert>
          <AlertIcon />
          Các thông tin liên quan
        </Alert>
        {/* other fields */}
        <Grid templateColumns="repeat(3,1fr)" w="100%" gap={3}>
          <FormControl>
            <FormLabel>Số phòng ngủ</FormLabel>
            <Input type="number" />
          </FormControl>
          <FormControl>
            <FormLabel>Số phòng vệ sinh</FormLabel>
            <Input type="number" />
          </FormControl>
          <FormControl>
            <FormLabel>Số lượng tầng</FormLabel>
            <Input type="number" />
          </FormControl>
        </Grid>
        <Grid templateColumns="repeat(3,1fr)" w="100%" gap={3}>
          <FormControl>
            <FormLabel>Mặt tiền (m)</FormLabel>
            <Input type="number" placeholder="mét" />
          </FormControl>
          <FormControl>
            <FormLabel>Đường vào</FormLabel>
            <Input type="number" placeholder="mét" />
          </FormControl>
          <FormControl>
            <FormLabel>Hướng nhà</FormLabel>
            <Select>
              {directions.map((dir) => (
                <option value={dir} key={dir}>
                  {dir}
                </option>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Flex w="100%">
          <Checkbox size="lg">Bất động sản có bao gồm nội thất?</Checkbox>
        </Flex>
        {/* des */}
        <FormControl>
          <FormLabel>Mô tả chi tiết</FormLabel>
          <Controller
            name="description"
            control={control}
            render={({ field: { onChange } }) => (
              <QuillEditor onChange={onChange} />
            )}
          />
        </FormControl>
        {/* file input */}
        <Flex>
          <FormControl>
            <FormLabel>hi up file</FormLabel>
            <InputGroup>
              <Input type="file" py={1} />
            </InputGroup>
            <FormErrorMessage>loi up files</FormErrorMessage>
          </FormControl>
        </Flex>
        <Button type="submit">submit</Button>
      </VStack>
    </form>
  );
}

export default REForm;
