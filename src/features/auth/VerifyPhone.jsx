import { Center, Heading } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import {
  Button,
  FormControl,
  Text,
  Spinner,
  Box,
  Flex,
  Stack,
  useColorModeValue,
  HStack,
  PinInput,
  PinInputField,
} from "@chakra-ui/react";
import { useVerifyPhone } from "./useVerifyPhone";
import { showLast4PhoneNum } from "../../utils/helper";
import Logo from "../../ui/Logo";
import useCountdown from "../../hooks/useCountDown";
import { toast } from "react-hot-toast";
import { error } from "../../constants/message";
import { useResendSMS } from "./useResendSMS";

function VerifyPhone({ phoneNum }) {
  const accent = useColorModeValue("primary", "secondary");

  const phone = `84${phoneNum}`;
  const { register, handleSubmit, reset } = useForm();
  const { formattedSeconds, isComplete, setSeconds, setIsComplete } =
    useCountdown(90, () => toast.error(error.codeExprired));
  const { mutate, isPending } = useVerifyPhone();
  const { isSending, resendSMS } = useResendSMS();

  function onSubmit(data) {
    const { pin1, pin2, pin3, pin4, pin5, pin6 } = data;

    const pin = `${pin1}${pin2}${pin3}${pin4}${pin5}${pin6}`;
    console.log("Complete pin:", pin);

    mutate({ phone, token: pin });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <Flex
        mx="auto"
        w="full"
        maxW={{ base: "full", md: "70%", lg: "50%", xl: "600px" }}
        align={"center"}
        justify={"center"}
        rounded="md"
        bg={useColorModeValue("gray.50", "darker")}
      >
        <Stack spacing={8} py={12} w={{ base: "90%", lg: "85%" }}>
          <Stack align={"center"}>
            <Box pb={2}>
              <Logo size="w-40" />
            </Box>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Xác thực số điện thoại
            </Heading>
            <Text
              fontSize={"md"}
              color={useColorModeValue("gray.600", "gray.300")}
            >
              Nhập mã 6 số được gửi về thiết bị 📱
            </Text>
          </Stack>

          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "dark")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4} w="full">
              <Center
                fontSize={{ base: "sm", sm: "md" }}
                fontWeight="bold"
                color={useColorModeValue("gray.800", "whiteAlpha.800")}
              >
                Số điện thoại {showLast4PhoneNum(phone)}
              </Center>

              <FormControl>
                <Center>
                  <HStack>
                    <PinInput otp focusBorderColor={accent}>
                      {[1, 2, 3, 4, 5, 6].map((index) => (
                        <PinInputField
                          key={index}
                          {...register(`pin${index}`, {
                            required: true,
                            valueAsNumber: true,
                          })}
                        />
                      ))}
                    </PinInput>
                  </HStack>
                </Center>
              </FormControl>

              <Stack spacing={6}>
                <Button
                  w={{ base: "full", sm: "180px" }}
                  mx="auto"
                  colorScheme="green"
                  isLoading={isPending}
                  loadingText="Chờ xíu"
                  type="submit"
                >
                  Xác nhận
                </Button>
              </Stack>
            </Stack>
            {/* re send */}
            <Center alignItems="center" pb={3} mt={5} gap={3}>
              <Text>Bạn có thể gửi lại mã sau {formattedSeconds}</Text>
              <Button
                isLoading={isSending}
                isDisabled={!isComplete}
                size="xs"
                spinner={<Spinner color="white" size="xs" />}
                colorScheme="red"
                onClick={() => {
                  reset();
                  resendSMS({ phone });
                  setSeconds(90);
                  setIsComplete(false);
                }}
              >
                Gửi lại
              </Button>
            </Center>
          </Box>
        </Stack>
      </Flex>
    </form>
  );
}

export default VerifyPhone;
