import {
  Flex,
  Box,
  VStack,
  Text,
  Image as ChakraImage,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { useCallback, useRef, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { MAX_SIZE_UPLOAD, ratio } from "../../constants/anyVariables";
import { reform } from "../../constants/message";
import { v4 } from "uuid";

const accepted = ["image/png", "image/jpg", "image/jpeg"];

function Files360Dropzone({ onChange, files, setFiles, setValue }) {
  const [error, setError] = useState(false);
  const bg = useColorModeValue("gray.100", "#1d1d1d");
  const borderColor = useColorModeValue("gray.300", "#ffffff29");

  const limit = useRef(1);

  const onDrop = useCallback(
    (acceptedFiles) => {
      setError(false);

      limit.current = 1 - files.length;

      const mapped = acceptedFiles.map((file) => {
        limit.current--;
        if (limit.current < 0) {
          return setError(reform.overFile);
        }

        return Object.assign(file, {
          id: v4(),
          preview: URL.createObjectURL(file),
          isNew: true,
        });
      });

      if (limit.current >= 0) {
        setFiles([...mapped]);
        setValue("files360", [...mapped]);
      }
    },
    [files, setFiles, setValue],
  );

  const { fileRejections, getInputProps, getRootProps } = useDropzone({
    onDrop: onDrop,
    accept: {
      "image/png": [],
      "image/jpg": [],
      "image/jpeg": [],
    },
    maxSize: MAX_SIZE_UPLOAD,
    maxFiles: 1,
    getFilesFromEvent: async (event) => {
      const files = event.target.files || event.dataTransfer.files;
      const promises = [];
      for (let index = 0; index < files.length; index++) {
        const file = files[index];
        const promise = new Promise((resolve) => {
          const image = new Image();
          let url;
          image.onload = function () {
            file.width = image.width;
            file.height = image.height;
            resolve(file);
          };
          url = URL.createObjectURL(file);
          image.src = url;
        });
        promises.push(promise);
      }
      return await Promise.all(promises);
    },
    validator: ratioValidator,
  });

  useEffect(() => {
    if (fileRejections.length > 0) {
      console.log(fileRejections);
      if (!accepted.includes(fileRejections[0].file.type)) {
        return setError(
          `Không chấp nhận file với định dạng ${fileRejections[0].file.type}`,
        );
      } else if (fileRejections[0].file.size > MAX_SIZE_UPLOAD) {
        return setError(reform.overSize);
      } else if (fileRejections[0].errors[0].code === "small") {
        return setError(fileRejections[0].errors[0].message);
      }
    }
  }, [fileRejections]);

  function handleDelete() {
    setError("");
    setFiles([]);
    setValue("files360", []);
    limit.current = 1;
  }

  const thumbnail = files.length > 0 && (
    <Flex className="group" pos="relative">
      <ChakraImage
        src={files?.[0]?.preview || files?.[0].mediaLink}
        alt="Preview"
        boxSize="160px"
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
      {files.length < 1 && (
        <Box
          bg={bg}
          borderColor={borderColor}
          {...getRootProps({
            className:
              "dropzone relative min-h-24 border-dashed flex justify-center items-center border-2 cursor-pointer",
          })}
        >
          <input {...getInputProps({ onChange })} />
          <VStack
            fontSize={{ base: "xs", md: "sm" }}
            textAlign={{ base: "center", md: "left" }}
            color="gray.500"
          >
            {!error ? (
              <Text>{reform.helperMedia}</Text>
            ) : (
              <Text
                fontSize={{ base: "xs", md: "sm" }}
                textAlign={{ base: "center", md: "left" }}
                color="red.500"
              >
                {error}
              </Text>
            )}
            <Text fontStyle="italic" textAlign={{ base: "center", md: "left" }}>
              {reform.acceptFiles}
            </Text>
          </VStack>
        </Box>
      )}
      <Flex gap={1} wrap="wrap" my={3} justify="center" align="center">
        {thumbnail}
      </Flex>
    </Flex>
  );
}

export default Files360Dropzone;

// validator
function ratioValidator(file) {
  if (Number(file.width / file.height) !== ratio) {
    return {
      code: "small",
      message: reform.ratio,
    };
  }
  return null;
}
