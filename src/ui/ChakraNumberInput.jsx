import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import { reform } from "../constants/message";

function ChakraNumberInput({
  register,
  req = false,
  name,
  label,
  error,
  placeholder,
  value,
}) {
  return (
    <FormControl isRequired={req} isInvalid={error}>
      <FormLabel fontSize={{ base: "sm", md: "md" }}>{label}</FormLabel>
      <NumberInput min={0} defaultValue={value}>
        <NumberInputField
          {...register(`${name}`, {
            required: {
              value: req,
              message: reform.requiredMessage,
            },
            valueAsNumber: true,
            validate: (v) =>
              Number.isInteger(Number(v)) ||
              Number.isNaN(Number(v)) ||
              reform.numberInt,
          })}
          placeholder={placeholder}
        />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
}

export default ChakraNumberInput;
