import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalCloseButton,
  Image,
  AspectRatio,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import { memo } from "react";
import { ReactPhotoSphereViewer } from "react-photo-sphere-viewer";
import Slider from "react-slick";

const DetailsMediasModal = memo(function DetailsMediasModal({
  onClose,
  isOpen,
  settings,
  newMedia,
  image360,
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size={{ sm: "3xl", lg: "4xl", "2xl": "5xl" }}
    >
      <ModalOverlay zIndex={10000} />
      <ModalContent className="modal-media">
        <ModalHeader>Toàn bộ ảnh / video bất động sản</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Slider {...settings}>
            {newMedia.map((media) => (
              <AspectRatio key={media.id}>
                {!media.isImage ? (
                  <video src={media.mediaLink} controls />
                ) : media.is360Image ? (
                  <AspectRatio ratio={16 / 9} w="full" _before="none">
                    <ReactPhotoSphereViewer
                      src={image360[0].mediaLink}
                      width="100%"
                    />
                  </AspectRatio>
                ) : (
                  <Image src={media.mediaLink} />
                )}
              </AspectRatio>
            ))}
          </Slider>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="green"
            size="sm"
            variant="outline"
            mr={3}
            onClick={onClose}
          >
            Đóng
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});

export default DetailsMediasModal;
