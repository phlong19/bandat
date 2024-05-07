import { useParams } from "react-router-dom";
import {
  FormControl,
  FormLabel,
  Select,
  Grid,
  Flex,
  Button,
} from "@chakra-ui/react";
import { SlRefresh } from "react-icons/sl";
import { useSearchbar } from "./useSearchbar";

function AddressSelect({
  isForm = false,
  cityID,
  disID,
  wardID,
  setCityID,
  setDisID,
  setWardID,
}) {
  const title = useParams();
  const { data, isLoading, refetch } = useSearchbar(
    cityID,
    disID,
    wardID,
    Boolean(title),
  );

  function handleClick() {
    setCityID(NaN);
    setDisID(NaN);
    setWardID(NaN);
    refetch({ cancelRefetch: false });
  }

  return (
    <Flex w="100%" gap={1.5}>
      <Grid
        templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
        gap={3}
        w="100%"
      >
        <FormControl isRequired={isForm}>
          <FormLabel>Tỉnh, Thành phố</FormLabel>

          <Select
            value={cityID || "none"}
            onChange={(e) => {
              setCityID(Number(e.target.value));
              setDisID(NaN);
              setWardID(NaN);
            }}
            isDisabled={isLoading}
          >
            <option value="none">---</option>
            {data?.city.map((item) => (
              <option value={item.cityID} key={item.cityID}>
                {item.cityName}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl isRequired={isForm}>
          <FormLabel>Quận, huyện</FormLabel>
          <Select
            onChange={(e) => {
              setDisID(Number(e.target.value));
              setWardID(NaN);
            }}
            value={disID || "none"}
            isDisabled={isLoading}
          >
            {!data?.dis.length ? (
              <option value="none">Vui lòng chọn tỉnh thành phố trước</option>
            ) : (
              <>
                <option value="none">---</option>
                {data?.dis.map((item) => (
                  <option value={item.disID} key={item.disID}>
                    {item.disName}
                  </option>
                ))}
              </>
            )}
          </Select>
        </FormControl>
        <FormControl isRequired={isForm}>
          <FormLabel>Phường, xã</FormLabel>
          <Select
            onChange={(e) => setWardID(Number(e.target.value))}
            value={wardID || "none"}
            isDisabled={isLoading}
          >
            {!data?.ward.length ? (
              <option value="none">Vui lòng chọn quận huyện trước</option>
            ) : (
              <>
                <option value="none">---</option>
                {data?.ward.map((item) => (
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
