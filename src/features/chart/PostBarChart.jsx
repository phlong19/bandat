import { useEffect, useState } from "react";
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
import { useColorModeValue, Box, Center, Spinner } from "@chakra-ui/react";

import { startOfMonth, format, compareAsc } from "date-fns";
import { vi } from "date-fns/locale";

import ChartDatePicker from "./ChartDatePicker";
import {
  billion,
  DEFAULT_RE_STATUS,
  million,
} from "../../constants/anyVariables";

function PostBarChart({ isFetchingAllData, allData = [] }) {
  const empty = useColorModeValue("gray.300", "gray.600");
  const gray = useColorModeValue("#c9c9c9", "#464646");

  const [dateRange, setDateRange] = useState([]);
  const [purType, setPurType] = useState(true);
  const measure = purType ? "tỷ" : "triệu";
  const currency = purType ? billion : million;

  useEffect(() => {
    if (!isFetchingAllData && allData) {
      // the data fetched already sorted, so just take the first one as start, the last as end
      setDateRange([
        new Date(allData?.[0]?.created_at),
        new Date(allData?.slice(-1)?.[0]?.created_at),
      ]);
    }
  }, [isFetchingAllData, allData]);

  if (isFetchingAllData) {
    return (
      <Center minH={300} h={300}>
        <Spinner emptyColor={empty} />
      </Center>
    );
  }

  const data = allData.filter((i) => {
    // purType
    const check = i.purType === purType;
    // date
    const date = new Date(i.created_at);
    const gte = compareAsc(date, dateRange[0]); // 1
    const lte = compareAsc(date, dateRange[1]); // -1
    return gte !== -1 && lte !== 1 && check;
  });

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
        "Được duyệt": 0,
      };
    }
    group[month]["Bài đăng"] += 1;
    group[month].totalAmount += cur.price / currency;
    group[month]["Được duyệt"] += cur.status !== DEFAULT_RE_STATUS ? 1 : 0;

    return group;
  }, {});

  const chartData = Object.values(grouped).map((d) => ({
    ...d,
    [`Giá TB (${measure})`]: (d.totalAmount / d["Bài đăng"]).toFixed(2),
  }));

  return (
    <Box maxH={300}>
      <ChartDatePicker
        count={data.length}
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
          <XAxis dataKey="name" scale="auto" angle={320} textAnchor="end" />
          <YAxis domain={[0, "dataMax + 10"]} />
          <Tooltip contentStyle={{ color: "#222" }} />
          <Legend wrapperStyle={{ bottom: "-35px" }} />
          <Area
            type="monotone"
            dataKey="Được duyệt"
            fill="salmon"
            stroke="salmon"
          />
          <Bar dataKey="Bài đăng" barSize={20} fill="#79b473" />
          <Line
            type="monotone"
            dataKey={`Giá TB (${measure})`}
            stroke="mediumpurple"
            strokeWidth={2}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </Box>
  );
}

export default PostBarChart;
