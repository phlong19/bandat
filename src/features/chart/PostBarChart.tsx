import { useEffect, useState } from "react";
import {
  ComposedChart,
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
  Spinner,
  Text,
  Button,
} from "@chakra-ui/react";

import {
  startOfMonth,
  format,
  compareAsc,
  startOfDay,
  endOfDay,
} from "date-fns";
import { vi } from "date-fns/locale";

import ChartDatePicker from "./ChartDatePicker";
import { COMPLETED, million } from "../../constants/anyVariables";
import { OrderListProps } from "../table/TableOrderRow";

interface Props {
  allData: OrderListProps["data"][];
  isFetching: boolean;
  refetch: any;
  count: number | null | undefined;
}

function PostBarChart({ isFetching, allData = [], refetch, count }: Props) {
  const empty = useColorModeValue("gray.300", "gray.600");
  const gray = useColorModeValue("#c9c9c9", "#464646");

  const [dateRange, setDateRange] = useState<Date[]>([]);
  const [status, setStatus] = useState<number>(COMPLETED);

  useEffect(() => {
    if (!isFetching && allData) {
      // the data fetched already sorted, so just take the first one as start, the last as end
      setDateRange([
        startOfDay(new Date(allData?.[0]?.created_at)),
        endOfDay(new Date(allData?.slice(-1)?.[0]?.created_at)),
      ]);
    }
  }, [isFetching, allData]);

  if (isFetching) {
    return (
      <Center minH={300} h={300}>
        <Spinner emptyColor={empty} />
      </Center>
    );
  }

  const data = allData.filter((i) => {
    // status
    const check = i.status.id === status;
    // date
    const date = new Date(i.created_at);
    const gte = compareAsc(date, dateRange[0]); // 1
    const lte = compareAsc(date, dateRange[1]); // -1
    return gte !== -1 && lte !== 1 && check;
  });

  const grouped = data.reduce((group: any, cur) => {
    // gen key from year - month
    const date = new Date(cur.created_at);
    const monthStart = startOfMonth(date);
    const month = format(monthStart, "yyyy - MMM", { locale: vi });

    if (!group[month]) {
      group[month] = {
        name: month,
        "Đơn hàng": 0,
        total: 0,
      };
    }
    group[month]["Đơn hàng"] += 1;
    group[month].total += cur.total;

    return group;
  }, {});

  const check = Object.values(grouped).some((i: any) => i.total > million);

  const currency = check ? million : 100000;
  const measure = check ? "triệu" : "trăm nghìn";

  const chartData = Object.values(grouped).map((d: any) => ({
    ...d,
    [`Tổng giá trị (${measure})`]: d.total / currency,
  }));

  const sum = data.reduce((acc, cur) => {
    if (cur.status.id === status) {
      acc += cur.total;
    }

    return acc;
  }, 0);

  return (
    <Box maxH={600} minH={{ base: 600, md: 450 }}>
      <ChartDatePicker
        total={data.length}
        count={count}
        sum={sum}
        dateRange={dateRange}
        setDateRange={setDateRange}
        status={status}
        setStatus={setStatus}
      />
      {data.length ? (
        <ResponsiveContainer width="100%" minHeight={300}>
          <ComposedChart
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
            <YAxis domain={[0, "dataMax + 5"]} />
            <Tooltip contentStyle={{ color: "#222" }} />
            <Legend wrapperStyle={{ bottom: "-35px" }} />
            <Bar dataKey="Đơn hàng" barSize={20} fill="#79b473" />
            <Area
              type="monotone"
              dataKey={`Tổng giá trị (${measure})`}
              fill="salmon"
              stroke="salmon"
            />
          </ComposedChart>
        </ResponsiveContainer>
      ) : (
        <Center minH={400} flexDirection="column" gap={2}>
          <Text fontSize="md">Không có dữ liệu.</Text>
          <Text textAlign='center'>Thử thay đổi trạng thái lọc đơn hàng hoặc tải lại dữ liệu</Text>

          <Button
            onClick={refetch}
            size="sm"
            colorScheme="green"
            variant="outline"
          >
            Tải lại.
          </Button>
        </Center>
      )}
    </Box>
  );
}

export default PostBarChart;
