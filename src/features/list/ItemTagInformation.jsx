import {
  Tag,
  TagLabel,
  TagLeftIcon,
  useColorModeValue,
} from "@chakra-ui/react";

function ItemTagInformation({ icon, value }) {
  const scheme = useColorModeValue("green", "green");

  return (
    <Tag size="md" variant="outline" colorScheme={scheme}>
      <TagLeftIcon fontSize='large' as={icon} />
      <TagLabel>{value}</TagLabel>
    </Tag>
  );
}

export default ItemTagInformation;
