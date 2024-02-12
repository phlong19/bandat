import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

import { Image, Button, Text, Flex, Box } from "@chakra-ui/react";

import { useColorModeValue } from "@chakra-ui/react";
import {
  LIMIT_IMG_UPLOAD,
  LIMIT_VID_UPLOAD,
} from "../../constants/anyVariables";

const limit = LIMIT_IMG_UPLOAD + LIMIT_VID_UPLOAD;

function FilesDropzone({ files, setFiles, setValue, onChange }) {
  const [error, setError] = useState("");

  // bg & border color drop & drag
  const bg = useColorModeValue("gray.100", "#1d1d1d");
  const borderColor = useColorModeValue("gray.300", "#ffffff29");

  const onDrop = useCallback(
    (acceptedFiles) => {
      const temp = files;
      if (files.images.length + acceptedFiles.length > LIMIT_IMG_UPLOAD) {
        return setError("Vượt quá số lượng giới hạn file tải lên");
      }
      acceptedFiles.forEach((file) =>
        file.type.startsWith("image")
          ? temp.images.push(file)
          : temp.videos.push(file),
      );
      temp.images.forEach((file) =>
        Object.assign(file, { preview: URL.createObjectURL(file) }),
      );
      temp.videos.forEach((file) =>
        Object.assign(file, { preview: URL.createObjectURL(file) }),
      );
      setValue("files", temp);
      setFiles(temp);
    },
    [setFiles, setValue, files],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: onDrop,
    maxFiles: limit,
  });

  //   create thumbs
  const thumbsImg = files.images?.map((file) => (
    <Flex pos="relative" className="group" key={file.path}>
      <Image src={file.preview} alt="Preview" boxSize="100px" />
      <Button
        className="invisible group-hover:visible"
        size="xs"
        borderRadius={0}
        pos="absolute"
        bottom={0}
        right={0}
        title="Loại bỏ file này"
        colorScheme="red"
        borderTopLeftRadius={5}
        onClick={() => {
          setFiles((prev) =>
            prev.images.filter((i) => i.preview !== file.preview),
          );
          setValue("files", files);
        }}
      >
        x
      </Button>
    </Flex>
  ));

  const thumbsVid = files.videos?.map((file) => (
    <Flex pos="relative" className="group" key={file.path}>
      <video style={{ width: 150, height: 100 }} src={file.preview} controls />
      <Button
        className="invisible group-hover:visible"
        size="xs"
        borderRadius={0}
        pos="absolute"
        bottom={0}
        right={0}
        title="Loại bỏ file này"
        colorScheme="red"
        borderTopLeftRadius={5}
        onClick={() => {
          setFiles((prev) =>
            prev.videos.filter((i) => i.preview !== file.preview),
          );
          setValue("files", files);
        }}
      >
        x
      </Button>
    </Flex>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => {
      files.images.forEach((file) => URL.revokeObjectURL(file.preview));
      files.videos.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  return (
    <Flex
      direction="column"
      className="container"
      p={4}
      border="1px solid"
      borderColor={borderColor}
    >
      <Box
        bg={bg}
        borderColor={borderColor}
        {...getRootProps({
          className:
            "dropzone relative min-h-24 border-dashed flex justify-center items-center border-2 cursor-pointer",
        })}
      >
        <input {...getInputProps({ onChange })} />
        {error.length === 0 ? (
          <Text fontSize="sm" color="gray.500">
            Drag & drop file here, or click to select files
          </Text>
        ) : (
          <Text fontSize="sm" color="red.500">
            {error}
          </Text>
        )}
      </Box>
      <Flex gap={1} wrap="wrap" my={3}>
        {thumbsVid} {thumbsImg}
      </Flex>
    </Flex>
  );
}

export default FilesDropzone;
