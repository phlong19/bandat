import { useState } from "react";
import { Center, Progress } from "@chakra-ui/react";
import RegisterForm from "./RegisterForm";
import VerifyPhone from "./VerifyPhone";

export default function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(50);

  const [phone, setPhone] = useState("");

  return (
    <Center w="full" flexDirection="column">
      <Progress
        w={{ base: "95%", md: "70%", lg: "50%", xl: "600px" }}
        hasStripe
        colorScheme="green"
        value={progress}
        mb="8"
        isAnimated
      ></Progress>
      {step === 1 ? (
        <RegisterForm
          setProgress={setProgress}
          setPhone={setPhone}
          setStep={setStep}
        />
      ) : (
        <VerifyPhone phoneNum={phone} />
      )}
    </Center>
  );
}
