import { useState } from "react";
import { PieChart, Pie, Sector, ResponsiveContainer } from "recharts";
import {
  useColorModeValue,
  Box,
  Center,
  Flex,
  Heading,
  Button,
  Text,
  Spinner,
} from "@chakra-ui/react";

import { useGetREPostData } from "./useGetREPostData";
import { getCoreNameType } from "../../utils/helper";

// top
const top = 7;

function TypePieChart() {
  const accent = useColorModeValue("primary", "secondary");
  const empty = useColorModeValue("gray.300", "gray.600");
  const whiteblack = useColorModeValue("white", "#222");

  const [activeIndex, setActiveIndex] = useState(6);
  const { data, count, isLoading, refetch } = useGetREPostData();

  if (isLoading) {
    return (
      <Center minH={300} h={300}>
        <Spinner emptyColor={empty} />
      </Center>
    );
  }

  if (!isLoading && (!data || data.length < 1)) {
    return (
      <Center minH={300} h={300} flexDirection="column" gap={1.5}>
        <Text>Không có dữ liệu để hiển thị</Text>
        <Button onClick={refetch} size="sm" colorScheme="green" variant="ghost">
          Tải lại
        </Button>
      </Center>
    );
  }

  let chartData;
  if (!isLoading && data.length > 0) {
    // calc top re type
    const groupedData = data.reduce((group, cur) => {
      const key = cur.REType_ID;
      if (!group[key]) {
        group[key] = {
          type: key,
          name: getCoreNameType(cur.type.name, cur.type.type),
          total: 0,
        };
      }

      group[key].total += 1;

      return group;
    }, {});

    chartData = Object.values(groupedData)
      .sort((a, b) => a.total - b.total)
      .slice(-top);
  }

  return (
    <Box maxH={300}>
      <Flex justify="space-between">
        <Heading
          fontSize="md"
          fontFamily="lexend"
          fontWeight="500"
          color={accent}
        >
          top {top} loai hinh nha dat
        </Heading>
        <Text pr={18}>Tong so bai dang bds: {count}</Text>
      </Flex>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={chartData}
            cx="50%"
            cy="50%"
            stroke={whiteblack}
            strokeWidth="2"
            innerRadius={70}
            outerRadius={100}
            fill="#79B473"
            dataKey="total"
            onMouseEnter={(_, index) => setActiveIndex(index)}
          />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
}

export default TypePieChart;

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const mainFill = "#5e8859";
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={mainFill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={mainFill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`SL: ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`${(percent * 100).toFixed(2)}%`}
      </text>
    </g>
  );
};
