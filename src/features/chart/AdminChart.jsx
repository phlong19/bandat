import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Center,
  Spinner,
  Flex,
  Text,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import { useGetProfilesData } from "./useGetProfilesData";
import { format, startOfMonth } from "date-fns";
import { vi } from "date-fns/locale/vi";

function AdminChart() {
  const accent = useColorModeValue("primary", "secondary");
  const empty = useColorModeValue("gray.300", "gray.600");

  const { data, count, isLoading } = useGetProfilesData();

  if (isLoading) {
    return (
      <Center minH={400} h={400}>
        <Spinner emptyColor={empty} />
      </Center>
    );
  }

  const groupedData = data.reduce((group, curProfile) => {
    // gen key from year - month
    const date = new Date(curProfile.created_at);
    const monthStart = startOfMonth(date);
    const month = format(monthStart, "yyyy - MMM", { locale: vi });

    if (!group[month]) {
      group[month] = {
        name: month,
        "Người dùng": 0,
      };
    }

    group[month]["Người dùng"] += 1;

    return group;
  }, {});

  const profileData = Object.values(groupedData).sort((a, b) =>
    a.name.localeCompare(b.name),
  );

  return (
    <>
      <Flex justify="space-between">
        <Heading
          fontSize="md"
          fontFamily="lexend"
          fontWeight="500"
          color={accent}
        >
          thong ke nguoi dung dang ky theo thang
        </Heading>
        <Text pr={18}>Tong so tai khoan: {count}</Text>
      </Flex>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={profileData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="Người dùng"
            fill="#79B473"
            activeBar={<Rectangle fill="#52AA5E" />}
          />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}

export default AdminChart;
