import { useCallback, useEffect, useRef, useState } from "react";
import { v4 } from "uuid";
import {
  Flex,
  Box,
  Text,
  Image as ChakraImage,
  Button,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";
import { account, newsForm } from "../../constants/message";
import { MAX_SIZE_AVATAR } from "../../constants/anyVariables";

const LIMIT = 1;
const accepted = ["image/png", "image/jpg", "image/jpeg"];

function AvatarDropzone({ onChange, files, setFiles, setValue }) {
  const [error, setError] = useState(false);
  const limit = useRef(1);
  const bg = useColorModeValue("gray.100", "#1d1d1d");
  const borderColor = useColorModeValue("gray.300", "#ffffff29");

  // onDrop callback
  const onDrop = useCallback(
    (acceptedFiles) => {
      setError(false);

      limit.current = 1 - files.length;
      const mapped = acceptedFiles.map((file) => {
        limit.current--;
        if (limit.current < 0) {
          return setError(newsForm.overFile);
        }
        return Object.assign(file, {
          preview: URL.createObjectURL(file),
          id: v4(),
        });
      });

      if (limit.current >= 0) {
        setFiles([...mapped]);
        setValue("files", [...mapped]);
      }
    },
    [files, setFiles, setValue],
  );

  const { fileRejections, getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/png": [],
      "image/jpg": [],
      "image/jpeg": [],
    },
    maxSize: MAX_SIZE_AVATAR,
    maxFiles: LIMIT,
    onDrop: onDrop,
  });

  useEffect(() => {
    if (fileRejections.length > 0) {
      console.log(fileRejections);
      if (!accepted.includes(fileRejections[0].file.type)) {
        return setError(
          `Không chấp nhận file với định dạng ${fileRejections[0].file.type}`,
        );
      }
      return setError(fileRejections[0].errors[0].message);
    }
  }, [fileRejections]);

  // delete current thumb
  function handleDelete() {
    setError("");
    setFiles([]);
    setValue("files", []);
    limit.current = 1;
  }

  const thumbnail = files.length > 0 && (
    <Flex className="group" pos="relative">
      <ChakraImage
        src={files?.[0]?.preview || files?.[0]}
        alt="Preview"
        boxSize="130px"
        objectFit="cover"
        onLoad={() => URL.revokeObjectURL(files[0].preview)}
      />
      <Button
        className="invisible group-hover:visible"
        size="xs"
        pos="absolute"
        top={1}
        left={1}
        borderRadius={9999}
        title="Loại bỏ file này"
        colorScheme="red"
        onClick={handleDelete}
      >
        x
      </Button>
    </Flex>
  );

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
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
        <VStack fontSize="sm" color="gray.500">
          {!error ? (
            <Text>{account.helperMedia}</Text>
          ) : (
            <Text fontSize="sm" color="red.500">
              {error}
            </Text>
          )}
          <Text>{account.acceptFiles}</Text>
        </VStack>
      </Box>
      <Flex gap={1} wrap="wrap" my={3}>
        {thumbnail}
      </Flex>
    </Flex>
  );
}

export default AvatarDropzone;
