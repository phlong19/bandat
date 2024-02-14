import { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";

import { Image, Button, Text, Flex, Box } from "@chakra-ui/react";

import { useColorModeValue } from "@chakra-ui/react";
import {
  LIMIT_IMG_UPLOAD,
  LIMIT_VID_UPLOAD,
  MAX_SIZE_UPLOAD,
} from "../../constants/anyVariables";

const limit = LIMIT_IMG_UPLOAD + LIMIT_VID_UPLOAD;

function FilesDropzone({ files, setFiles, setValue, onChange }) {
  const [error, setError] = useState(false);
  let imgLeft = useRef(0);
  let vidLeft = useRef(0);
  // bg & border color drop & drag
  const bg = useColorModeValue("gray.100", "#1d1d1d");
  const borderColor = useColorModeValue("gray.300", "#ffffff29");

  const onDrop = useCallback(
    (acceptedFiles) => {
      // clear error on new file drop
      setError(false);
      imgLeft.current = LIMIT_IMG_UPLOAD - files.images.length;
      vidLeft.current = LIMIT_VID_UPLOAD - files.videos.length;

      const mapped = acceptedFiles.map((file) => {
        file.type.startsWith("image") ? imgLeft.current-- : vidLeft.current--;
        if (imgLeft.current < 0 || vidLeft.current < 0) {
          return setError("Vượt quá số lượng giới hạn file tải lên");
        }
        return Object.assign(file, {
          preview: URL.createObjectURL(file),
        });
      });

      if (imgLeft.current >= 0 && vidLeft.current >= 0) {
        setFiles((prev) => {
          const newImgs = [
            ...prev.images,
            ...mapped.filter((i) => i.type.startsWith("image")),
          ];
          const newVids = [
            ...prev.videos,
            ...mapped.filter((i) => i.type.startsWith("video")),
          ];
          setValue("files", { images: newImgs, videos: newVids });

          return { images: newImgs, videos: newVids };
        });
      }
    },
    [setFiles, setValue, files],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: onDrop,
    maxFiles: limit,
    maxSize: MAX_SIZE_UPLOAD, // 5 mb
    accept: {
      "image/png": [],
      "image/jpg": [],
      "image/jpeg": [],
      "video/mp4": [],
    },
  });

  //   create thumbs
  const thumbsImg = files.images.map((file) => (
    <Flex pos="relative" className="group" key={file.path}>
      <Image src={file.preview} alt="Preview" boxSize="100px" />
      <Button
        className="invisible group-hover:visible"
        size="xs"
        pos="absolute"
        top={1}
        left={1}
        borderRadius={9999}
        title="Loại bỏ file này"
        colorScheme="red"
        onClick={() => {
          setFiles((prev) => ({
            ...prev,
            images: prev.images.filter((i) => i.preview !== file.preview),
          }));

          setValue("files", {
            images: files.images.filter((i) => i.preview !== file.preview),
            videos: files.videos,
          });
          imgLeft.current++;
          setError(false);
        }}
      >
        x
      </Button>
    </Flex>
  ));

  const thumbsVid = files.videos.map((file) => (
    <Flex pos="relative" className="group" key={file.path}>
      <video style={{ width: 150, height: 100 }} src={file.preview} controls />
      <Button
        className="invisible group-hover:visible"
        size="xs"
        pos="absolute"
        top={1}
        left={1}
        borderRadius={9999}
        title="Loại bỏ file này"
        colorScheme="red"
        onClick={() => {
          setFiles((prev) => ({
            ...prev,
            videos: prev.videos.filter((i) => i.preview !== file.preview),
          }));

          setValue("files", {
            images: files.images,
            videos: files.videos.filter((i) => i.preview !== file.preview),
          });
          vidLeft.current++;
          setError(false);
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
        {!error ? (
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
