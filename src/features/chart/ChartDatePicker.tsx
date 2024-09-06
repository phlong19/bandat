import { useMemo } from "react";
import {
  Heading,
  Flex,
  Text,
  Button,
  useColorModeValue,
  Box,
  Stack,
} from "@chakra-ui/react";
import { RangeDatepicker } from "chakra-dayzed-datepicker";
import { COMPLETED, WAITING } from "../../constants/anyVariables";
import { formatCurrencyWOText } from "../../utils/helper";

interface Props {
  sum: number;
  total: number;
  count: number | null | undefined;
  status: number;
  setStatus: React.Dispatch<React.SetStateAction<number>>;
  dateRange: Date[];
  setDateRange: React.Dispatch<React.SetStateAction<Date[]>>;
}

function ChartDatePicker({
  sum,
  count,
  total,
  status,
  setStatus,
  dateRange,
  setDateRange,
}: Props) {
  const accent = useColorModeValue("primary", "secondary");
  const title =
    status == WAITING
      ? "Chờ xử lý"
      : status > COMPLETED
        ? "Đã hủy"
        : "Đã hoàn thành";

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
      inputProps: {
        w: { base: "100%", md: "70%" },
        size: "md",
        borderRadius: "md",
      },
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
          Dữ liệu đơn hàng theo trạng thái
        </Heading>
        <Text textAlign="end">Tổng số đơn hàng: {count}</Text>
      </Flex>
      <Flex gap={3} w="full">
        <Flex
          flexGrow={1}
          flexDirection={{ base: "column", md: "row" }}
          align="center"
          gap={2}
          ml="40px"
        >
          <RangeDatepicker
            propsConfigs={props}
            closeOnSelect
            configs={{ dateFormat: "dd/MM/yyyy", firstDayOfWeek: 1 }}
            selectedDates={dateRange}
            onDateChange={setDateRange}
          />
          <Button
            colorScheme="green"
            borderWidth={0.5}
            fontWeight={400}
            onClick={() => setStatus((s) => (s > COMPLETED ? WAITING : s + 1))}
          >
            {title}
          </Button>
        </Flex>

        <Stack spacing={1} w="fit-content" textAlign="end">
          <Text fontSize="13">
            Tổng số đơn hàng {title.toLocaleLowerCase()}: {total}
          </Text>
          <Text fontSize="13">
            Tổng giá trị đơn hàng {title.toLocaleLowerCase()}:{" "}
            {formatCurrencyWOText(sum)}
          </Text>
        </Stack>
      </Flex>
    </>
  );
}

export default ChartDatePicker;
