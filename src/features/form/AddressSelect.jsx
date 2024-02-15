import {
  FormControl,
  FormLabel,
  Select,
  Grid,
  Flex,
  Button,
} from "@chakra-ui/react";
import { useSearchbar } from "../list/useSearchbar";
import { useSearchParams } from "react-router-dom";
import { SlRefresh } from "react-icons/sl";

function AddressSelect() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, isLoading } = useSearchbar();

  function handleClick() {
    searchParams.delete("city");
    searchParams.delete("dis");
    searchParams.delete("ward");
    setSearchParams(searchParams);
  }

  return (
    <Flex w="100%" gap={1.5}>
      <Grid templateColumns="repeat(3, 1fr)" gap={3} w="100%">
        <FormControl isRequired>
          <FormLabel noOfLines={1}>Tỉnh, Thành phố</FormLabel>
          <Select
            value={
              data?.city?.filter(
                (c) => c.cityID === Number(searchParams.get("city")),
              )?.[0]?.cityID || "none"
            }
            onChange={(e) => {
              searchParams.set("city", e.target.value);
              searchParams.delete("dis");
              searchParams.delete("ward");
              setSearchParams(searchParams);
            }}
            isDisabled={isLoading}
          >
            <option value="none" key={Math.random()}>
              ---
            </option>
            {data?.city.map((item) => (
              <option value={item.cityID} key={item.cityID}>
                {item.cityName}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Quận, huyện</FormLabel>
          <Select
            onChange={(e) => {
              searchParams.set("dis", e.target.value);
              searchParams.delete("ward");
              setSearchParams(searchParams);
            }}
            value={
              data?.dis?.filter(
                (d) => d.disID === Number(searchParams.get("dis")),
              )?.[0]?.disID || "none"
            }
            isDisabled={isLoading}
          >
            {!data?.dis?.length ? (
              <option value="none">Vui lòng chọn tỉnh thành phố trước</option>
            ) : (
              <>
                <option value="none" key={Math.random()}>
                  ---
                </option>
                {data.dis.map((item) => (
                  <option value={item.disID} key={item.disID}>
                    {item.disName}
                  </option>
                ))}
              </>
            )}
          </Select>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Phường, xã</FormLabel>
          <Select
            onChange={(e) => {
              searchParams.set("ward", e.target.value);
              setSearchParams(searchParams);
            }}
            defaultValue="none"
            isDisabled={isLoading}
          >
            {!data?.ward?.length ? (
              <option value="none">Vui lòng chọn quận huyện trước</option>
            ) : (
              <>
                <option value="none" key={Math.random()}>
                  ---
                </option>
                {data.ward.map((item) => (
                  <option value={item.wardID} key={item.wardID}>
                    {item.wardName}
                  </option>
                ))}
              </>
            )}
          </Select>
        </FormControl>
      </Grid>
      <Button variant="outline" alignSelf="end" onClick={handleClick}>
        <SlRefresh />
      </Button>
    </Flex>
  );
}

export default AddressSelect;
