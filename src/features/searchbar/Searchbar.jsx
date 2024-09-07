import { useForm } from "react-hook-form";
import { useMediaQuery } from "react-responsive";
import { useNavigate, useLocation } from "react-router-dom";

import { BiSearchAlt } from "react-icons/bi";

import {
  Flex,
  InputGroup,
  Input,
  InputRightElement,
  Button,
  IconButton,
} from "@chakra-ui/react";

function Searchbar() {
  const isTablet = useMediaQuery({
    query: "(min-width: 640px)",
  });
  const navigate = useNavigate();

  // current search form
  const { state } = useLocation();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      query: state?.query,
    },
  });

  function onSubmit(data) {
    if (!data?.query || data?.query?.length < 1) {
      return;
    }
    // send data to destination page location (hook)
    navigate("/tim-kiem", { state: data, replace: true });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto flex items-center"
    >
      <Flex w="100%" gap="2px" align="center">
        <InputGroup>
          <Input
            {...register("query")}
            className="text-darker dark:text-white"
            borderColor="darkgray"
            fontSize={14}
            pl={2}
            mr="5px"
          />
          <InputRightElement width="fit-content">
            {!isTablet ? (
              <IconButton
                type="submit"
                colorScheme="green"
                icon={<BiSearchAlt />}
              />
            ) : (
              <Button
                fontSize="sm"
                colorScheme="green"
                _hover={{
                  bg: "secondary",
                }}
                transitionDuration="300ms"
                px={{ sm: 5 }}
                gap={1.5}
                type="submit"
              >
                Tìm kiếm
              </Button>
            )}
          </InputRightElement>
        </InputGroup>
      </Flex>
    </form>
  );
}

export default Searchbar;
