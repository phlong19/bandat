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
  VStack,
} from "@chakra-ui/react";

import { formatCurrency, getCoreNameType } from "../../utils/helper";
import { SOLD_STATUS } from "../../constants/anyVariables";

// top
let top = 7;

function TypePieChart({ data, count, isLoading, refetch }) {
  const accent = useColorModeValue("primary", "secondary");
  const empty = useColorModeValue("gray.300", "gray.600");
  const whiteblack = useColorModeValue("white", "#222");

  // consistant gen colors
  // const colors = useMemo(
  //   () => Array.from({ length: top }).map(() => genHexColor()),
  //   [],
  // );

  const [activeIndex, setActiveIndex] = useState(6);

  if (isLoading) {
    return (
      <Center minH={300} h={300}>
        <Spinner emptyColor={empty} />
      </Center>
    );
  }

  if (!isLoading && (!data || data.length < 1)) {
    return (
      <Box>
        <Flex justify="space-between" w="full" alignSelf="start">
          <Heading
            fontSize="md"
            fontFamily="lexend"
            fontWeight="500"
            color={accent}
          >
            Top {top} loại hình nhà đất
          </Heading>
          <Text pr={18}>Tổng số bài đăng BĐS: {count || "---"}</Text>
        </Flex>
        <Center minH={300} h={300} flexDirection="column" gap={1.5}>
          <Text>Không có dữ liệu để hiển thị</Text>
          <Button
            onClick={refetch}
            size="sm"
            colorScheme="green"
            variant="ghost"
          >
            Tải lại
          </Button>
        </Center>
      </Box>
    );
  }

  let chartData;
  let countSoldPosts = 0;
  let sum = 0;
  if (!isLoading && data?.length > 0) {
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

    const keyLength = Object.keys(groupedData).length;
    if (keyLength < top) {
      top = keyLength;
    }

    chartData = Object.values(groupedData)
      .sort((a, b) => a.total - b.total)
      .slice(-top);

    // calc & sum sold posts
    const soldPosts = data.filter((i) => i.status === SOLD_STATUS && i.purType);
    countSoldPosts = soldPosts.length;
    sum = soldPosts.reduce((acc, cur) => (acc += cur.price), 0);
  }

  return (
    <Box maxH={350}>
      <Flex justify="space-between" pl={{ base: 0, md: 12 }}>
        <Heading
          fontSize="md"
          fontFamily="lexend"
          fontWeight="500"
          color={accent}
        >
          Top {top} loại hình nhà đất
        </Heading>
        <VStack gap={0} justify="end">
          <Text ml="auto" fontSize="xs">
            Tổng số bài đăng BĐS: {count}
          </Text>
          <Text ml="auto" fontSize="xs">
            Tổng số BĐS đã bán: {countSoldPosts}
          </Text>
          <Text ml="auto" fontSize="xs">
            Tổng giá trị BĐS đã bán: {formatCurrency(sum)}
          </Text>
        </VStack>
      </Flex>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            activeIndex={activeIndex}
            activeShape={(props) =>
              renderActiveShape({ ...props, fill: "salmon" })
            }
            data={chartData}
            cx="50%"
            cy="50%"
            stroke={whiteblack}
            strokeWidth="2"
            innerRadius={70}
            outerRadius={100}
            dataKey="total"
            onMouseEnter={(_, index) => setActiveIndex(index)}
            // fill="mediumpurple"
            fill="#79B473"
          >
            {/* {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]} />
            ))} */}
          </Pie>
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
    payload,
    percent,
    value,
    fill,
  } = props;

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
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
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
        fill={fill}
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

// const genHexColor = () => {
//   console.log("2");
//   // Generate a random RGB color
//   const randomColor = Math.floor(Math.random() * 16777215);

//   // Convert the random color to RGB components
//   const r = (randomColor >> 16) & 255;
//   const g = (randomColor >> 8) & 255;
//   const b = randomColor & 255;

//   // Convert RGB components to hexadecimal
//   const hexColor =
//     "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);

//   return hexColor;
// };
