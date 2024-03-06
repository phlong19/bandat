import { Tag, TagLabel, TagLeftIcon } from "@chakra-ui/react";

function ItemTagInformation({ icon, value }) {
  return (
    <Tag size="sm" variant="outline" fontSize='12px'>
      <TagLeftIcon fontSize="md" as={icon} />
      <TagLabel>{value}</TagLabel>
    </Tag>
  );
}

export default ItemTagInformation;
