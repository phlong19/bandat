import { useState } from "react";
import { useForm } from "react-hook-form";

import {
  FaFilterCircleDollar,
  FaMagnifyingGlassArrowRight,
} from "react-icons/fa6";
import { SlRefresh } from "react-icons/sl";

import {
  Flex,
  Input,
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

function Searchbar({ home = false }) {
  const { mapView } = useMapView();
  const [rangeValue, setRangeValue] = useState([0, maxAreaSearch]);
  const [purType, setPurType] = useState(true);
  const bg = useColorModeValue("white", "#222");
  const bgBtn = useColorModeValue("primary", "secondary");
  const color = useColorModeValue("white", "black");

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
      className={`${mapView ? "w-full" : "max-w-[95%] md:max-w-[80%]"} ${
        home && "max-w-full"
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
        <AccordionItem border="none" className="mt-1.5 md:mt-0">
          <AccordionButton
            mt="3px"
            className="max-w-28 md:max-w-36"
            gap={2.5}
            justifyContent="center"
          >
            <FaFilterCircleDollar />
            <span className="hidden text-sm sm:block">Lọc</span>
          </AccordionButton>
          <AccordionPanel
            borderRadius="md"
            position="absolute"
            bg={bg}
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
                  <FormLabel>Dạng bán</FormLabel>
                  <Select
                    onChange={(e) => setPurType(e.target.value === "true")}
                  >
                    <option value="all">Tất cả</option>
                    <option value="true">Bán</option>
                    <option value="false">Cho thuê</option>
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel>Loại hình</FormLabel>
                  <Select {...register("reType")}>
                    <option value="all">Tất cả</option>
                    {arr.map((opt) => (
                      <option value={opt.type} key={opt.type}>
                        {opt.title}
                      </option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl ml={2}>
                  <FormLabel>
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
                  <FormLabel>Giá</FormLabel>
                  <Select {...register("price")}>
                    {prices.map((item) => (
                      <option value={item.value} key={item.label}>
                        {item.label}
                      </option>
                    ))}
                  </Select>
                  <input type="text" hidden />
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
        <Input {...register("query")} borderLeftRadius="none" />

        <Button bg={bgBtn} color={color} _hover={{ opacity: 0.85 }} gap={1.5}>
          <div>
            <FaMagnifyingGlassArrowRight />
          </div>
          <span className="invisible text-sm font-normal sm:visible">
            Tìm kiếm
          </span>
        </Button>
      </Flex>
    </form>
  );
}

export default Searchbar;
