import { Text } from "@chakra-ui/react";
import { ErrorMessage } from "@hookform/error-message";
import { TbEye, TbEyeClosed } from "react-icons/tb";

function FormInput({
  label,
  type = "text",
  id,
  hookForm,
  errors,
  setShowPassword,
  showPassword,
  password = false,
}) {
  // if type = password
  let newType = type;
  if (password && showPassword) {
    newType = "text";
  } else if (password && !showPassword) {
    newType = "password";
  }

  return (
    <div className="group relative w-full">
      <input
        type={newType}
        id={id}
        placeholder=" "
        className="w-full rounded-lg border-2 border-dark/80 bg-white px-4 py-3 font-roboto text-base outline-none invalid:border-red-500 focus:border-primary dark:border-white dark:bg-dark dark:focus:border-secondary"
        {...hookForm}
        onKeyDown={(e) => {
          if (e.key === "Enter") e.preventDefault();
        }}
      />
      <label
        htmlFor={id}
        className="absolute left-0 top-0 translate-x-3 translate-y-1/2 bg-white text-lg transition-all duration-200 ease-in-out dark:bg-dark"
      >
        {label}
      </label>
      {password && (
        <button
          className="absolute right-2 top-5 text-xl"
          onClick={(e) => {
            e.preventDefault();
            setShowPassword((s) => !s);
          }}
        >
          {showPassword ? <TbEye /> : <TbEyeClosed />}
        </button>
      )}
      <ErrorMessage
        errors={errors}
        name={id}
        render={({ message }) => (
          <Text color="red.500" fontSize="sm" mt="2" ml={1}>
            {message}
          </Text>
        )}
      />
    </div>
  );
}

export default FormInput;
