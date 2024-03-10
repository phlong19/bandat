import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMediaQuery } from "react-responsive";

import { FaFilterCircleDollar } from "react-icons/fa6";
import { BiSearchAlt } from "react-icons/bi";
import { SlRefresh } from "react-icons/sl";

import {
  Flex,
  InputGroup,
  Input,
  InputRightElement,
  Select,
  Box,
  Button,
  useColorModeValue,
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionIcon,
  AccordionPanel,
  FormControl,
  IconButton,
  FormLabel,
} from "@chakra-ui/react";

import AddressSelect from "./AddressSelect";
import ChakraRangeSlider from "./ChakraRangeSlider";

import { useMapView } from "../../context/MapViewContext";
import { navLinks, prices } from "../../constants/navlink";
import { m2, maxAreaSearch } from "../../constants/anyVariables";

function Searchbar() {
  const { mapView } = useMapView();
  const [rangeValue, setRangeValue] = useState([0, maxAreaSearch]);
  const [purType, setPurType] = useState(true);
  const isTablet = useMediaQuery({
    query: "(min-width: 640px)",
  });

  const bg = useColorModeValue("white", "darker");
  const bgAcc = useColorModeValue("white", "darker");
  const bgBtn = useColorModeValue("primary", "secondary");
  const color = useColorModeValue("darker", "white");

  const arr = purType ? navLinks[0].child_links : navLinks[1].child_links;

  const [cityID, setCityID] = useState(NaN);
  const [disID, setDisID] = useState(NaN);
  const [wardID, setWardID] = useState(NaN);

  const { register, reset, handleSubmit } = useForm();

  function handleReset(e) {
    e.preventDefault();
    setRangeValue([0, maxAreaSearch]);
    setPurType(true);
    reset();
  }

  function onSubmit(data) {
    const fullData = { ...data, area: rangeValue };
    console.log(fullData);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`${
        mapView ? "w-full" : "max-w-[95%] md:max-w-[80%]"
      } mx-auto flex items-center`}
    >
      <Accordion
        allowMultiple
        bg={bg}
        defaultIndex={[1]}
        boxShadow="sm"
        borderLeftRadius="lg"
        zIndex={999}
        alignSelf="stretch"
      >
        <AccordionItem border="none">
          <AccordionButton
            mt="3px"
            className="max-w-28 text-dark dark:text-white md:max-w-36"
            gap={2.5}
            justifyContent="center"
          >
            <FaFilterCircleDollar />
            <span className="hidden text-sm sm:block">Lọc</span>
          </AccordionButton>
          <AccordionPanel mt={1}
            borderRadius="md"
            position="absolute"
            bg={bgAcc}
            boxShadow="lg"
            width={mapView ? "65%" : "75%"}
          >
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    Các thông tin khác
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel
                px={0}
                pb={4}
                gap={2}
                alignItems="baseline"
                className="sm:flex"
              >
                <FormControl maxW="150px">
                  <FormLabel fontSize='sm'>Dạng bán</FormLabel>
                  <Select
                    onChange={(e) => setPurType(e.target.value === "true")}
                  >
                    <option value="true">Bán</option>
                    <option value="false">Cho thuê</option>
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel>Loại hình</FormLabel>
                  <Select {...register("reType")}>
                    {arr.map((opt) => (
                      <option value={opt.type} key={opt.type}>
                        {opt.title}
                      </option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl mx={2}>
                  <FormLabel fontSize='sm'>
                    <span className="mr-1.5">Diện tích:</span>
                    <span className="text-primary dark:text-secondary">
                      {rangeValue[0]} - {rangeValue[1]}{" "}
                      <span className="text-xs">{m2}</span>
                    </span>
                  </FormLabel>
                  <ChakraRangeSlider
                    setRangeValue={setRangeValue}
                    rangeValue={rangeValue}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel fontSize='sm'>Giá</FormLabel>
                  <Select {...register("price")}>
                    {prices.map((item) => (
                      <option value={item.value} key={item.label}>
                        {item.label}
                      </option>
                    ))}
                  </Select>
                </FormControl>

                <IconButton
                  icon={<SlRefresh />}
                  alignSelf="end"
                  type="reset"
                  onClick={handleReset}
                />
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    Địa chỉ
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel id="hi" pb={4} maxW="100%">
                <AddressSelect
                  cityID={cityID}
                  disID={disID}
                  wardID={wardID}
                  setCityID={setCityID}
                  setDisID={setDisID}
                  setWardID={setWardID}
                />
              </AccordionPanel>
            </AccordionItem>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      <Flex w="100%" gap="2px" align="center">
        <InputGroup>
          <Input
            {...register("query")}
            borderLeftRadius="none"
            textColor="darker"
            pr={120}
          />
          <InputRightElement width="fit-content">
            {!isTablet ? (
              <IconButton bg={bgBtn} color={color} icon={<BiSearchAlt />} />
            ) : (
              <Button
                fontSize="sm"
                bg={bg}
                color={color}
                _hover={{
                  _dark: { bg: "secondary", color: "darker" },
                  _light: { bg: "prim-light", color: "darker" },
                }}
                transitionDuration="300ms"
                px={{ sm: 5 }}
                gap={1.5}
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
