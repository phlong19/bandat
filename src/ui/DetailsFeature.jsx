import { Flex, Icon } from "@chakra-ui/react";

function DetailsFeature({ value, label, icon }) {
  return (
    <Flex justify="space-between" w="100%" align="center">
      <Flex align="center" gap={{ base: 1, lg: 2 }}>
        <Icon as={icon} fontSize={16} />
        {label}:
      </Flex>
      {value}
    </Flex>
  );
}

export default DetailsFeature;
