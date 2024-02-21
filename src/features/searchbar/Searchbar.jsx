import { useState } from "react";
import { useForm } from "react-hook-form";

import { Flex, Input, Select } from "@chakra-ui/react";

import AddressSelect from "./AddressSelect";
import Button from "../../ui/Button";
import { TbRefresh } from "react-icons/tb";

import { navLinks } from "../../constants/navlink";

function Searchbar() {
  const [purType, setPurType] = useState(true);

  const arr = purType ? navLinks[0].child_links : navLinks[1].child_links;

  const {
    formState: { errors },
    register,
    reset,
    handleSubmit,
  } = useForm();

  function onSubmit(data) {
    console.log(data);
  }
  // TODO: styling and fix the damn select address

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* purType */}
      <Select onChange={(e) => setPurType(e.target.value === "true")}>
        <option value="none">--</option>
        <option value="true">Bán</option>
        <option value="false">Cho thuê</option>
      </Select>
      {/* re type */}
      <Select {...register("reType")}>
        <option value="none"></option>
        {arr.map((opt) => (
          <option value={opt.type} key={opt.type}>
            {opt.title}
          </option>
        ))}
      </Select>

      <Flex>
        <Input {...register("query")} />
        <Button>search</Button>
      </Flex>

      <AddressSelect onReset={reset} />
    </form>
  );
}

export default Searchbar;
