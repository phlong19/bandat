import { useRef } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import { newsForm } from "../constants/message";

function ChakraModalDialog({ isOpen, onClose, onCloseDialog }) {
  const cancelRef = useRef();

  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
    >
      <AlertDialogOverlay />

      <AlertDialogContent>
        <AlertDialogHeader>{newsForm.dialogTitle}</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>{newsForm.dialogMessage}</AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={onCloseDialog}>
            Hủy
          </Button>
          <Button colorScheme="red" ml={3} onClick={onClose}>
            Xác nhận
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ChakraModalDialog;
