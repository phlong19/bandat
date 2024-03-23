import { Button } from "@chakra-ui/react";
import { LuChevronsLeft } from "react-icons/lu";
import { useGoBack } from "../hooks/useGoBack";

function GoBackButton() {
  const back = useGoBack();
  return (
    <Button
      variant="outline" size='sm'
      fontWeight={500}
      leftIcon={<LuChevronsLeft />}
      onClick={back}
    >
      Quay lại
    </Button>
  );
}

export default GoBackButton;
