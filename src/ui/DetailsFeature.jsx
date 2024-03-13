import { Flex, Icon, Text, useColorModeValue } from "@chakra-ui/react";

function DetailsFeature({ value, label, icon, doc = false, children }) {
  const border = useColorModeValue("gray.300", "whiteAlpha.700");
  const accent = useColorModeValue("primary", "secondary");

  return !doc ? (
    <Flex
      justify="space-between"
      w="100%"
      align="center"
      borderBottom="1px solid transparent"
      py={1}
      borderColor={border}
    >
      <Flex align="center" gap={{ base: 1, lg: 2 }}>
        <Icon as={icon} fontSize={20} />
        {label}
      </Flex>
      <Text color={accent}>{value}</Text>
    </Flex>
  ) : (
    <Flex
      justify="space-between"
      w="100%"
      align="center"
      borderBottom="1px solid transparent"
      py={1}
      borderColor={border}
    >
      <Flex w="full" align="center" gap={{ base: 1, lg: 2 }}>
        <Icon as={icon} fontSize={20} />

        {children}
      </Flex>
    </Flex>
  );
}

export default DetailsFeature;
