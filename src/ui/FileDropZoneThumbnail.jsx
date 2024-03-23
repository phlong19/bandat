import { Flex, Image, Button } from "@chakra-ui/react";

function FileDropZoneThumbnail({ isImage = false, file, onClick }) {
  return (
    <Flex pos="relative" className="group">
      {isImage ? (
        <Image
          src={file.preview || file.mediaLink}
          alt="Preview"
          boxSize="100px"
          objectFit="cover"
          onLoad={() => URL.revokeObjectURL(file.preview)}
        />
      ) : (
        <video
          style={{ width: 150, height: 100 }}
          src={file.preview || file.mediaLink}
          controls
        />
      )}
      <Button
        className="invisible group-hover:visible"
        size="xs"
        pos="absolute"
        top={1}
        left={1}
        borderRadius={9999}
        title="Loại bỏ file này"
        colorScheme="red"
        onClick={onClick}
      >
        x
      </Button>
    </Flex>
  );
}

export default FileDropZoneThumbnail;
