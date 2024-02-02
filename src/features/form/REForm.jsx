import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";

function REForm({ edit = false }) {
  const { register, formState, getValues, handleSubmit } = useForm();

  const { errors } = formState;

  function onSubmit() {}

  return (
    <form>
      <FormControl onSubmit={handleSubmit(onSubmit)}>
        <FormLabel>Email address</FormLabel>
        <Input
          isRequired
          type="email"
          {...register("email", { required: "Email address is required" })}
        />
        <FormHelperText>We&apos;ll never share your email.</FormHelperText>

        {errors && (
          <FormErrorMessage>
            Please provide your real email address
          </FormErrorMessage>
        )}
        <Button type="submit">submit</Button>
      </FormControl>
    </form>
  );
}

export default REForm;
