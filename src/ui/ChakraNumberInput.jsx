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

function ChakraNumberInput({
  register,
  req = false,
  name,
  label,
  error,
  placeholder,
}) {
  return (
    <FormControl isRequired={req} isInvalid={error}>
      <FormLabel>{label}</FormLabel>
      <NumberInput>
        <NumberInputField
          {...register(`${name}`, {
            required: { value: req, message: "vui long nhap vao" },
            valueAsNumber: true,
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
