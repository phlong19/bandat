import { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { v4 } from "uuid";

import { Text, Flex, Box, VStack, useColorModeValue } from "@chakra-ui/react";
import FileDropZoneThumbnail from "../../ui/FileDropZoneThumbnail";

import {
  LIMIT_IMG_UPLOAD,
  LIMIT_VID_UPLOAD,
  MAX_SIZE_UPLOAD,
} from "../../constants/anyVariables";
import { reform } from "../../constants/message";

const limit = LIMIT_IMG_UPLOAD + LIMIT_VID_UPLOAD;

function FilesDropzone({
  files,
  setFiles,
  setValue,
  onChange,
  addImagesRef,
  addVideosRef,
  deleteMediasRef,
}) {
  const [error, setError] = useState(false);
  let imgLeft = useRef(0);
  let vidLeft = useRef(0);
  // bg & border color drop & drag
  const bg = useColorModeValue("gray.100", "#1d1d1d");
  const borderColor = useColorModeValue("gray.300", "#ffffff29");

  // handle delete medias
  function handleClick(type, file) {
    setFiles((prev) => ({
      ...prev,
      [type]: prev[type].filter((i) => i.id !== file.id),
    }));

    if (type === "image") {
      setValue("files", {
        images: files.images.filter((i) => i.id !== file.id),
        videos: files.videos,
      });
      imgLeft.current++;
    } else {
      setValue("files", {
        images: files.images,
        videos: files.videos.filter((i) => i.id !== file.id),
      });
      vidLeft.current++;
    }

    // if delete existed media
    if (!file?.isNew) {
      deleteMediasRef.current.push(file);
    }

    // if delete just uploaded media
    if (file?.isNew) {
      const imgIndex = addImagesRef.current.findIndex((i) => i.id === file.id);
      addImagesRef.current.splice(imgIndex, 1);
      const vidIndex = addVideosRef.current.findIndex((i) => i.id === file.id);
      addVideosRef.current.splice(vidIndex, 1);
    }

    setError(false);
  }

  const onDrop = useCallback(
    (acceptedFiles) => {
      // clear error on new file drop
      setError(false);
      imgLeft.current = LIMIT_IMG_UPLOAD - files.images.length;
      vidLeft.current = LIMIT_VID_UPLOAD - files.videos.length;

      const mapped = acceptedFiles.map((file) => {
        file.type.startsWith("image") ? imgLeft.current-- : vidLeft.current--;
        if (imgLeft.current < 0 || vidLeft.current < 0) {
          return setError(reform.overFile);
        }
        return Object.assign(file, {
          preview: URL.createObjectURL(file),
          id: v4(),
          isNew: true,
        });
      });

      if (imgLeft.current >= 0 && vidLeft.current >= 0) {
        setFiles((prev) => {
          const mapImgs = mapped.filter((i) => i.type.startsWith("image"));
          const mapVids = mapped.filter((i) => i.type.startsWith("video"));

          const newImgs = [...prev.images, ...mapImgs];
          const newVids = [...prev.videos, ...mapVids];

          setValue("files", { images: newImgs, videos: newVids });

          addImagesRef.current.push(...mapImgs);
          addVideosRef.current.push(...mapVids);

          return { images: newImgs, videos: newVids };
        });
      }
    },
    [setFiles, setValue, files, addImagesRef, addVideosRef],
  );

  const { fileRejections, getRootProps, getInputProps } = useDropzone({
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

  // file rejections
  useEffect(() => {
    if (
      fileRejections.length > 0 &&
      fileRejections[0].file.type !== "video/mp4"
    ) {
      return setError(
        `Không chấp nhận file với định dạng ${fileRejections[0].file.type}`,
      );
    } else if (fileRejections.length > 0) {
      return setError(reform.overSize);
    }
  }, [fileRejections]);

  //   create thumbs
  const thumbsImg = files.images.map((file) => (
    <FileDropZoneThumbnail
      key={file.id}
      file={file}
      onClick={() => handleClick("images", file)}
      isImage
    />
  ));

  const thumbsVid = files.videos.map((file) => (
    <FileDropZoneThumbnail
      key={file.id}
      file={file}
      onClick={() => handleClick("videos", file)}
    />
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
            {reform.acceptMedias}
          </Text>
        </VStack>
      </Box>
      <Flex gap={1} wrap="wrap" my={3}>
        {thumbsVid} {thumbsImg}
      </Flex>
    </Flex>
  );
}

export default FilesDropzone;
