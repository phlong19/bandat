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
  value,
}) {
  return (
    <FormControl isRequired={req} isInvalid={error}>
      <FormLabel>{label}</FormLabel>
      <NumberInput>
        <NumberInputField
          {...register(`${name}`, {
            value: value,
            required: {
              value: req,
              message: "khong thay dau sao do a? nhap day du vao",
            },
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
