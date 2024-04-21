import { useState } from "react";
import { RangeDatepicker } from "chakra-dayzed-datepicker";

function Contacts() {
  const [date, setDate] = useState([new Date(), new Date()]);
  console.log(date);

  return <RangeDatepicker onDateChange={setDate} selectedDates={date} />;
}

export default Contacts;
