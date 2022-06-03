import React from "react";
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
  Stack,
  Box,
  VStack,
  IconButton,
  Flex,
  useColorModeValue,
  Image,
  Heading,
  Center,
} from "@chakra-ui/react";
import { useRef } from "react";
import { SmallCloseIcon } from "@chakra-ui/icons";

const NewPost = ({ isOpen, onOpen, onClose }) => {
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
            <Heading>
              {" "}
              <Box
                h={"210px"}
                bg={"gray.100"}
                mt={-6}
                mx={-6}
                mb={4}
                pos={"relative"}
              >
                <Image
                  boxSize="150px"
                  objectFit="cover"
                  w="100%"
                  h="100%"
                  src="k"
                />
              </Box>
              <Center>
                <VStack>
                  <Heading>Post Image</Heading>
                  <Button w="full">Change Picture</Button>
                </VStack>
              </Center>
            </Heading>
          </ModalHeader>
          <ModalCloseButton color={"black"} />
          <ModalBody pb={0}>
            <Stack
              spacing={6}
              w={"full"}
              maxW={"md"}
              rounded={"xl"}
              p={6}
              my={2}
            >
              <FormControl id="name" isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  placeholder="Name"
                  _placeholder={{ color: "gray.500" }}
                  type="text"
                  isDisabled
                />
              </FormControl>
              <FormControl id="title" isRequired>
                <FormLabel>Title of post</FormLabel>
                <Input
                  placeholder="Title"
                  _placeholder={{ color: "gray.500" }}
                  type="text"
                />
              </FormControl>
              <FormControl id="description" isRequired>
                <FormLabel>Description</FormLabel>
                <Textarea
                  placeholder="Description"
                  _placeholder={{ color: "gray.500" }}
                  type="password"
                />
              </FormControl>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Post Comment
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default NewPost;
