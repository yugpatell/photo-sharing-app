import React from "react";
import {
  SimpleGrid,
  Center,
  Heading,
  VStack,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import Post from "../Posts/Post";
import NewPost from "./NewPost";
import { EditIcon } from "@chakra-ui/icons";
const Posts = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Center py={6}>
        <VStack>
          <Button
            variant={"solid"}
            bg={"teal.400"}
            color={"white"}
            size={"lg"}
            mr={4}
            _hover={{
              bg: "teal.300",
            }}
            leftIcon={<EditIcon />}
            onClick={onOpen}
          >
             New Post 
          </Button>
          <Heading as="h1" size="xl"></Heading>
          <SimpleGrid columns={[1, 1, 2, 3]} spacing={10}>
            <Post />
            <Post />
            <Post />
            <Post />
          </SimpleGrid>
        </VStack>
      </Center>

      <NewPost isOpen={isOpen} onOpen={onOpen} onClose={onClose}/>
    </>
  );
};

export default Posts;
