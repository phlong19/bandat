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
  Button as ChakraButton,
  FormLabel,
} from "@chakra-ui/react";

import AddressSelect from "./AddressSelect";
import Button from "../../ui/Button";

import { useMapView } from "../../context/MapViewContext";
import { navLinks } from "../../constants/navlink";
import ChakraSlider from "./ChakraSlider";
import { SlRefresh } from "react-icons/sl";

function Searchbar() {
  const [sliderValue, setSliderValue] = useState(0);
  const [purType, setPurType] = useState(true);
  const { mapView } = useMapView();
  const bg = useColorModeValue("white", "dark");

  const arr = purType ? navLinks[0].child_links : navLinks[1].child_links;

  const [cityID, setCityID] = useState(NaN);
  const [disID, setDisID] = useState(NaN);
  const [wardID, setWardID] = useState(NaN);

  const {
    formState: { errors },
    register,
    reset,
    handleSubmit,
  } = useForm();

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`${
        mapView ? "w-full" : "max-w-[80%]"
      } mx-auto flex items-center`}
    >
      <Accordion allowMultiple bg={bg} boxShadow="sm" borderLeftRadius="lg">
        <AccordionItem border="none">
          <AccordionButton minW="150px" gap={2.5} justifyContent="center">
            <FaFilterCircleDollar />
            <span>Lọc</span>
          </AccordionButton>
          <AccordionPanel
            borderRadius="md"
            position="absolute"
            bg={bg}
            zIndex={999}
            boxShadow="lg"
            width={mapView ? "40%" : "75%"}
          >
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

                <FormControl ml={2}>
                  <FormLabel>Diện tích</FormLabel>
                  <ChakraSlider
                    setSliderValue={setSliderValue}
                    sliderValue={sliderValue}
                    value={300}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Giá</FormLabel>
                  <Select>{}</Select>
                  <input type="text" hidden />
                </FormControl>

                <ChakraButton variant="outline" alignSelf="center">
                  <SlRefresh fontSize="65px" />
                </ChakraButton>
              </AccordionPanel>
            </AccordionItem>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      <Flex w="100%" gap="1px" align="center">
        <Input {...register("query")} borderLeftRadius="none" />

        <Button widthBase={false} icon={<FaMagnifyingGlassArrowRight />}>
          search
        </Button>
      </Flex>
    </form>
  );
}

export default Searchbar;
