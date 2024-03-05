import { useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
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
  const queryClient = useQueryClient();

  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={onCloseDialog}
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
          <Button
            colorScheme="red"
            ml={3}
            onClick={() => {
              queryClient.removeQueries({ queryKey: ["SingleNews"] });
              onCloseDialog();
              onClose();
            }}
          >
            Xác nhận
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ChakraModalDialog;
