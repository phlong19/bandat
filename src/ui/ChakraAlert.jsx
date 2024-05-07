import { Alert, AlertIcon } from "@chakra-ui/react";
import parse from "html-react-parser";

function ChakraAlert({ type, message, html }) {
  return (
    <Alert status={type} fontSize={{ base: "xs", md: "sm" }}>
      <AlertIcon />
      {message} {html && parse(html)}
    </Alert>
  );
}

export default ChakraAlert;
