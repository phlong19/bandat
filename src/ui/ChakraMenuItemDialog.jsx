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
  MenuItem,
  useDisclosure,
} from "@chakra-ui/react";

function ChakraMenuItemDialog({
  action,
  icon,
  color,
  onAction,
  warning = false,
}) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const ref = useRef();

  return (
    <MenuItem gap={3} color={color} onClick={onOpen}>
      {icon}
      {action}
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
    </MenuItem>
  );
}

export default ChakraMenuItemDialog;
