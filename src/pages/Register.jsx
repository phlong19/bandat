import { useState } from "react";
import { Input } from "@chakra-ui/react";
import MultiStepForm from "../features/auth/MultiStepForm";
import RegisterFormV1 from "../features/auth/v1/RegisterFormV1";

const pass = import.meta.env.VITE_PASS;

function Register() {
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  return (
    <>
      {password !== pass && <RegisterFormV1 />}
      <button
        className="absolute bottom-0 left-0 text-dark opacity-0 hover:opacity-100 dark:text-white"
        onClick={() => setShow((s) => !s)}
      >
        click
      </button>
      {show && (
        <Input
          w="300px"
          position="absolute"
          bottom={0}
          left={10}
          value={password}
          type="password"
          placeholder="type password"
          onChange={(e) => setPassword(e.target.value)}
        />
      )}
      {password === pass && <MultiStepForm />}
    </>
  );
}

export default Register;
