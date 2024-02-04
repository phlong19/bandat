import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import QuillEditor from "./QuillEditor";

function REForm({ edit = false }) {
  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit,
    control,
  } = useForm();

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <FormLabel>Email address</FormLabel>
        <Input placeholder="email" />
        <FormHelperText>We&apos;ll never share your email.</FormHelperText>

        {errors && (
          <FormErrorMessage>
            Please provide your real email address
          </FormErrorMessage>
        )}

        <FormControl>
          <Controller
            name="description"
            control={control}
            render={({ field: { onChange } }) => (
              <QuillEditor onChange={onChange} />
            )}
          />
        </FormControl>

        <Button type="submit">submit</Button>
      </FormControl>
    </form>
  );
}

export default REForm;
