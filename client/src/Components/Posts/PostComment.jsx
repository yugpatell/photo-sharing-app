import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  Textarea,
} from "@chakra-ui/react";

import { ChatIcon } from "@chakra-ui/icons";
import { useRef } from "react";
import Comments from "./Comments";

export default function InitialFocus({ isOpen, onOpen, onClose }) {
  const initialRef = useRef();

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        motionPreset="slideInBottom"
      >
        <ModalOverlay bg="" />
        <ModalContent>
          <ModalHeader>
            <Comments />
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Comment</FormLabel>
              <Textarea placeholder="..." />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} leftIcon={<ChatIcon />}>
              Post Comment
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
