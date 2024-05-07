import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Button,
  Grid,
  Input,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Radio,
  RadioGroup,
  AccordionIcon,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useUpdateOthers } from "./useUpdateOthers";
import { BiSave } from "react-icons/bi";
import { convertSex } from "../../utils/helper";

function OtherInformations({ data, color, id }) {
  const [newSex, setNewSex] = useState(convertSex(data?.sex));
  const { mutate, isPending } = useUpdateOthers();
  const { handleSubmit, register } = useForm({
    defaultValues: {
      birthday: data?.birthday,
      bio: data?.bio,
    },
  });

  function onSubmit(data) {
    let sex;
    let date = data?.birthday;
    // convert sex option
    switch (newSex) {
      case "1": // male
        sex = true;
        break;
      case "2": // female
        sex = false;
        break;
      case "3": // undefined
        sex = null;
        break;
    }

    if (!date) {
      date = null;
    }

    mutate({ ...data, birthday: date, sex, userID: id });
  }

  return (
    <Flex>
      <Accordion allowToggle w="100%">
        <AccordionItem border="none">
          <h2>
            <AccordionButton pl={0} justifyContent="space-between">
              <Box>
                <Heading size="xs" textAlign="left" textTransform="capitalize">
                  Các thông tin khác
                </Heading>
                <Text pt="2" textAlign="left" fontSize="xs" color={color}>
                  (Tùy chọn) Chỉ hiển thị trong trang thông tin cá nhân.
                </Text>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel px={0} pb={0} pt={4}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid
                templateColumns={{
                  base: "repeat(1, 1fr)",
                  md: "repeat(2, 1fr)",
                }}
                px={1}
                rowGap={2}
                columnGap={3}
              >
                {/* sex */}
                <Flex gap={4}>
                  <Box>
                    <Text fontSize="small">Giới tính</Text>
                  </Box>
                  <RadioGroup
                    size="sm"
                    colorScheme="green"
                    value={newSex}
                    onChange={setNewSex}
                  >
                    <Stack direction="column">
                      <Radio value="1">Nam</Radio>
                      <Radio value="2">Nữ</Radio>
                      <Radio value="3">Không muốn tiết lộ</Radio>
                    </Stack>
                  </RadioGroup>
                </Flex>
                {/* birth */}
                <Box>
                  <Text fontSize="sm">Ngày sinh</Text>
                  <Text fontSize="xs">*Lưu ý: Định dạng tháng/ngày/năm</Text>
                  <Input
                    rounded={{ base: "lg", md: "md" }}
                    size={{ base: "sm", md: "md" }}
                    type="date"
                    w={{ sm: "80%", lg: "60%", xl: "40%", "2xl": "30%" }}
                    mt={2}
                    {...register("birthday")}
                  />
                </Box>
                {/* bio */}
                <Box>
                  <Text>Giới thiệu ngắn</Text>
                  <Textarea {...register("bio")} mt={1} fontSize="sm" />
                </Box>
              </Grid>

              <Box w="100%" textAlign="end" mt={2}>
                <Button
                  size="xs"
                  fontWeight="400"
                  colorScheme="green"
                  variant="outline"
                  borderWidth={1.5}
                  rightIcon={<BiSave />}
                  type="submit"
                  isLoading={isPending}
                >
                  Lưu
                </Button>
              </Box>
            </form>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Flex>
  );
}

export default OtherInformations;
