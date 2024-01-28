import AsyncSelect from "react-select/async";
import { sellSelectOptions } from "../constants/navlink";

function SelectComponent({ data, name }) {
  return (
    <AsyncSelect
    //   cacheOptions={data}
      options={sellSelectOptions}
      defaultValue={data[0]}
      isClearable
      isSearchable
      name={name}
    />
  );
}

export default SelectComponent;
