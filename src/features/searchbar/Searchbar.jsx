import { useState } from "react";
import { useForm } from "react-hook-form";

import {
  FaFilterCircleDollar,
  FaMagnifyingGlassArrowRight,
} from "react-icons/fa6";

import {
  Flex,
  Input,
  Select,
  Box,
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
import Button from "../../ui/Button";

import { useMapView } from "../../context/MapViewContext";
import { navLinks, prices } from "../../constants/navlink";
import ChakraSlider from "./ChakraSlider";
import { SlRefresh } from "react-icons/sl";
import { m2 } from "../../constants/anyVariables";

function Searchbar() {
  const { mapView } = useMapView();
  const [sliderValue, setSliderValue] = useState(0);
  const [purType, setPurType] = useState(true);
  const bg = useColorModeValue("white", "#222");

  const arr = purType ? navLinks[0].child_links : navLinks[1].child_links;

  const [cityID, setCityID] = useState(NaN);
  const [disID, setDisID] = useState(NaN);
  const [wardID, setWardID] = useState(NaN);

  const { register, reset, handleSubmit } = useForm();

  function handleReset(e) {
    e.preventDefault();
    setSliderValue(0);
    setPurType(true);
    reset();
  }

  function onSubmit(data) {
    const fullData = { ...data, area: sliderValue };
    console.log(fullData);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`${
        mapView ? "w-full" : "max-w-[80%]"
      } mx-auto flex items-center`}
    >
      <Accordion
        allowMultiple
        bg={bg}
        defaultIndex={[1]}
        boxShadow="sm"
        borderLeftRadius="lg"
        zIndex={999}
      >
        <AccordionItem border="none">
          <AccordionButton minW="150px" gap={2.5} justifyContent="center">
            <FaFilterCircleDollar />
            <span>Lọc</span>
          </AccordionButton>
          <AccordionPanel
            borderRadius="md"
            position="absolute"
            bg={bg}
            boxShadow="lg"
            width={mapView ? "55%" : "75%"}
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
                pb={4}
                gap={3.5}
                alignItems="baseline"
                display="flex"
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
                    Diện tích (<span className="text-xs">{m2}</span>)
                  </FormLabel>
                  <ChakraSlider
                    setSliderValue={setSliderValue}
                    sliderValue={sliderValue}
                    value={300}
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

        <Button widthBase={false} icon={<FaMagnifyingGlassArrowRight />}>
          search
        </Button>
      </Flex>
    </form>
  );
}

export default Searchbar;
