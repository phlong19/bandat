import { useRef } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

function ChakraFormDialog({
  action,
  color,
  onAction,
  warning = false,
  isLoading,
}) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const ref = useRef();

  return (
    <>
      <Button
        colorScheme={color.split(".")[0]}
        onClick={onOpen}
        isLoading={isLoading}
        loadingText="Vui lòng chờ"
        size="sm"
      >
        {action}
      </Button>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={ref}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {action}
            </AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
              Xác nhận {action.toLowerCase()}?{" "}
              {warning && "Hành động này không thể hoàn tác"}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={ref} onClick={onClose}>
                Hủy
              </Button>
              <Button
                colorScheme={warning ? "red" : color.split(".")[0]}
                onClick={() => {
                  onAction();
                  onClose();
                }}
                ml={3}
              >
                Xác nhận
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default ChakraFormDialog;
