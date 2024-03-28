import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Scatter,
  ResponsiveContainer,
} from "recharts";

import {
  useColorModeValue,
  Box,
  Center,
  Flex,
  Heading,
  Text,
  Button,
  Spinner,
} from "@chakra-ui/react";
import { RangeDatepicker } from "chakra-dayzed-datepicker";

import { useGetREPostByPurType } from "./useGetREPostByPurType";

const data = [
  {
    name: "Page A",
    uv: 590,
    pv: 800,
    amt: 1400,
    cnt: 490,
  },
  {
    name: "Page B",
    uv: 868,
    pv: 967,
    amt: 1506,
    cnt: 590,
  },
  {
    name: "Page C",
    uv: 1397,
    pv: 1098,
    amt: 989,
    cnt: 350,
  },
  {
    name: "Page D",
    uv: 1480,
    pv: 1200,
    amt: 1228,
    cnt: 480,
  },
  {
    name: "Page E",
    uv: 1520,
    pv: 1108,
    amt: 1100,
    cnt: 460,
  },
  {
    name: "Page F",
    uv: 1400,
    pv: 680,
    amt: 1700,
    cnt: 380,
  },
];

function PostBarChart() {
  const accent = useColorModeValue("primary", "secondary");
  const empty = useColorModeValue("gray.300", "gray.600");
  const gray = useColorModeValue("#c9c9c9", "#464646");

  const [dateRange, setDateRange] = useState([]);
  const [purType, setPurType] = useState(true);

  const {
    data: fake,
    count,
    isLoading,
  } = useGetREPostByPurType(purType, dateRange);

  if (isLoading) {
    return (
      <Center minH={300} h={300}>
        <Spinner emptyColor={empty} />
      </Center>
    );
  }

  if (!isLoading && data.length < 1) {
    return (
      <Center minH={300} h={300}>
        <Text>Không có dữ liệu để hiển thị</Text>
      </Center>
    );
  }

  return (
    <Box maxH={300}>
      <Flex justify="space-between">
        <Heading
          pb={3}
          fontSize="md"
          fontFamily="lexend"
          fontWeight="500"
          color={accent}
        >
          top some title here
        </Heading>
        <Text pr={18}>Tong so bai dang bds : {count}</Text>
      </Flex>
      <Flex gap={3}>
        <RangeDatepicker
          // TODO
          propsConfigs={{
            inputProps: { w: "60%", size: "sm", borderRadius: "md" },
          }}
          configs={{ firstDayOfWeek: 1 }}
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
          {purType ? "ban" : "thue"}
        </Button>
      </Flex>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid stroke={gray} />
          <XAxis dataKey="name" scale="band" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="amt" fill="salmon" stroke="salmon" />
          <Bar dataKey="pv" barSize={20} fill="#79b473" />
          <Line type="monotone" dataKey="uv" stroke="green" />
        </ComposedChart>
      </ResponsiveContainer>
    </Box>
  );
}

export default PostBarChart;

// const configInput = {};
