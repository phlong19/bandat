import { useState } from "react";
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
  ResponsiveContainer,
} from "recharts";
import {
  useColorModeValue,
  Box,
  Center,
  Text,
  Button,
  Spinner,
} from "@chakra-ui/react";

import { startOfMonth, format, isToday } from "date-fns";
import { vi } from "date-fns/locale";

import { useGetREPostByPurType } from "./useGetREPostByPurType";
import ChartDatePicker from "./ChartDatePicker";
import { billion } from "../../constants/anyVariables";

function PostBarChart() {
  const empty = useColorModeValue("gray.300", "gray.600");
  const gray = useColorModeValue("#c9c9c9", "#464646");

  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [purType, setPurType] = useState(true);
  const measure = purType ? "tỷ" : "triệu";
  // check today
  const isInit = dateRange[0] === dateRange[0];
  console.log(isInit);

  const { data, count, isLoading, refetch } = useGetREPostByPurType(
    purType,
    dateRange,
  );

  if (isLoading) {
    return (
      <Center minH={300} h={300}>
        <Spinner emptyColor={empty} />
      </Center>
    );
  }

  if (!isLoading && (!data || data?.length < 1)) {
    return (
      <Box>
        <ChartDatePicker
          count={count}
          dateRange={dateRange}
          setDateRange={setDateRange}
          purType={purType}
          setPurType={setPurType}
        />
        <Center minH={300} h={300} flexDirection="column" gap={1.5}>
          {isInit ? (
            <Text>Vui lòng chọn ngày</Text>
          ) : (
            <>
              <Text>Không có dữ liệu để hiển thị</Text>
              <Button
                onClick={refetch}
                size="sm"
                colorScheme="green"
                variant="ghost"
              >
                Tải lại
              </Button>
            </>
          )}
        </Center>
      </Box>
    );
  }

  const grouped = data.reduce((group, cur) => {
    // gen key from year - month
    const date = new Date(cur.created_at);
    const monthStart = startOfMonth(date);
    const month = format(monthStart, "yyyy - MMM", { locale: vi });
    if (!group[month]) {
      group[month] = {
        name: month,
        totalAmount: 0,
        "Bài đăng": 0,
      };
    }
    group[month]["Bài đăng"] += 1;
    group[month].totalAmount += cur.price;

    return group;
  }, {});

  const chartData = Object.values(grouped).map((d) => ({
    ...d,
    [`Giá TB (${measure})`]: (d.totalAmount / d["Bài đăng"] / billion).toFixed(
      2,
    ),
  }));

  return (
    <Box maxH={300}>
      <ChartDatePicker
        count={count}
        dateRange={dateRange}
        setDateRange={setDateRange}
        purType={purType}
        setPurType={setPurType}
      />
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          width={500}
          height={400}
          data={chartData}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid stroke={gray} />
          <XAxis dataKey="name" scale="auto" />
          <YAxis domain={[0, "dataMax + 10"]} />
          <Tooltip />
          <Legend />
          {/* <Area
            type="monotone"
            dataKey="Bài đăng"
            fill="salmon"
            stroke="salmon"
          /> */}
          <Bar dataKey="Bài đăng" barSize={20} fill="#79b473" />
          <Line
            type="monotone"
            dataKey={`Giá TB (${measure})`}
            stroke="salmon"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </Box>
  );
}

export default PostBarChart;
