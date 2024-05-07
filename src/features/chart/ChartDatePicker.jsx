import { useMemo } from "react";
import {
  Heading,
  Flex,
  Text,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { RangeDatepicker } from "chakra-dayzed-datepicker";

function ChartDatePicker({
  count,
  purType,
  dateRange,
  setDateRange,
  setPurType,
}) {
  const accent = useColorModeValue("primary", "secondary");
  const title = purType ? "Bán" : "Cho thuê";

  const props = useMemo(
    () => ({
      dayOfMonthBtnProps: {
        defaultBtnProps: {
          _hover: {
            background: "salmon",
            color: "white",
          },
        },
        isInRangeBtnProps: {
          _light: {
            bg: "blackAlpha.400",
            color: "black",
            _hover: {
              background: "salmon",
              color: "white",
            },
          },
          _dark: {
            bg: "whiteAlpha.500",
            color: "white",
            _hover: {
              background: "salmon",
              color: "white",
            },
          },
        },
        selectedBtnProps: {
          background: "salmon",
          color: "white",
        },
        todayBtnProps: {
          background: "lightsalmon",
          _light: { color: "white" },
          _dark: { color: "black" },
        },
      },
      inputProps: { w: "60%", size: "sm", borderRadius: "md" },
      calendarPanelProps: {
        wrapperProps: {
          borderColor: "green",
        },
        contentProps: {
          borderWidth: 0,
        },
        headerProps: {
          padding: "5px",
        },
        dividerProps: {
          display: "none",
        },
      },
      weekdayLabelProps: {
        fontWeight: "normal",
      },
      dateHeadingProps: {
        fontWeight: "semibold",
      },
    }),
    [],
  );

  return (
    <>
      <Flex justify="space-between">
        <Heading
          pb={3}
          fontSize="md"
          fontFamily="lexend"
          fontWeight="500"
          color={accent}
        >
          Dữ liệu bài đăng theo dạng bán
        </Heading>
        <Text pr={18}>
          Số bài đăng {title.toLocaleLowerCase()} BĐS : {count || "---"}
        </Text>
      </Flex>
      <Flex gap={1.5} justify="center" w="full">
        <RangeDatepicker
          propsConfigs={props}
          closeOnSelect
          configs={{ dateFormat: "dd/MM/yyyy", firstDayOfWeek: 1 }}
          selectedDates={dateRange}
          onDateChange={setDateRange}
        />
        <Button
          colorScheme="green"
          variant="ghost"
          borderWidth={0.5}
          fontWeight={400}
          size="sm"
          onClick={() => setPurType((s) => !s)}
        >
          {title}
        </Button>
      </Flex>
    </>
  );
}

export default ChartDatePicker;
