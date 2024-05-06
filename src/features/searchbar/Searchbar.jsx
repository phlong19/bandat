import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMediaQuery } from "react-responsive";
import { useNavigate, useLocation } from "react-router-dom";

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
  const [purType, setPurType] = useState(true);
  const link = `/nha-dat-${purType ? "ban" : "cho-thue"}`;
  const isTablet = useMediaQuery({
    query: "(min-width: 640px)",
  });
  const navigate = useNavigate();

  const bg = useColorModeValue("white", "darker");
  const bgAcc = useColorModeValue("white", "darker");
  const color = useColorModeValue("darker", "white");

  const arr = purType ? navLinks[0].child_links : navLinks[1].child_links;

  // current search form
  const { state } = useLocation();
  const search = { ...state?.fullData };

  const [above, setAbove] = useState(search?.area === "above");

  const [cityID, setCityID] = useState(search?.cityID || NaN);
  const [disID, setDisID] = useState(search?.disID || NaN);
  const [wardID, setWardID] = useState(search?.wardID || NaN);

  const { register, reset, handleSubmit } = useForm({
    defaultValues: {
      reType: search?.reType,
      query: search?.query,
      price: search?.price,
    },
  });

  const min = above ? 1 : search?.area?.[0] || 1;
  const max = above ? maxAreaSearch : search?.area?.[1] || maxAreaSearch;

  const [rangeValue, setRangeValue] = useState([min, max]);

  function handleReset(e) {
    e.preventDefault();
    setRangeValue([1, maxAreaSearch]);
    setPurType(true);
    setAbove(false);
    reset();
  }

  function onSubmit(data) {
    const fullData = {
      ...data,
      purType,
      area: above ? "above" : rangeValue,
      cityID,
      disID,
      wardID,
    };
    // send data to destination page location (hook)
    navigate(link, { state: { fullData }, replace: true });
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
          <AccordionPanel
            mt={1}
            borderRadius="md"
            position="absolute"
            bg={bgAcc}
            boxShadow="lg"
            width={mapView ? "65%" : "85%"}
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
                  <FormLabel fontSize="sm">Dạng bán</FormLabel>
                  <Select
                    defaultValue={search?.purType?.toString() || "true"}
                    onChange={(e) => setPurType(e.target.value === "true")}
                  >
                    <option value="true">Bán</option>
                    <option value="false">Cho thuê</option>
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel fontSize="sm">Loại hình</FormLabel>
                  <Select {...register("reType")}>
                    {arr.map((opt) => (
                      <option value={opt.type} key={opt.type}>
                        {opt.title}
                      </option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl mx={2}>
                  <FormLabel fontSize="sm">
                    <span className="mr-1.5">Diện tích:</span>
                    {!above && (
                      <span className="text-primary dark:text-secondary">
                        {rangeValue[0]} - {rangeValue[1]}{" "}
                        <span className="text-xs">{m2}</span>
                      </span>
                    )}
                  </FormLabel>
                  <ChakraRangeSlider
                    setRangeValue={setRangeValue}
                    rangeValue={rangeValue}
                    above={above}
                    setAbove={setAbove}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel fontSize="sm">Giá</FormLabel>
                  <Select {...register("price")}>
                    {prices.map((item) => (
                      <option value={item.value} key={item.label}>
                        {item.label}
                      </option>
                    ))}
                  </Select>
                </FormControl>

                <IconButton
                  mt={{
                    base: "10px",
                    md: "-30px",
                    lg: "-10px",
                    xl: "15px",
                  }}
                  icon={<SlRefresh />}
                  alignSelf="center"
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
              <IconButton type="submit" bg={bg} color={color} icon={<BiSearchAlt />} />
            ) : (
              <Button
                fontSize="sm"
                bg={bg}
                color={color}
                _hover={{
                  _dark: { bg: "secondary", opacity: 0.8 },
                  _light: { bg: "prim-light", color: "darker" },
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
