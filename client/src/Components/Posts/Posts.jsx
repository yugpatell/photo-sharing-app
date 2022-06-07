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
import { useEffect } from "react";
import axios from "axios";

const Posts = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [posts, setPosts] = React.useState([]);

  const fetchPosts = () => {
    axios.get("http://localhost:8080/posts/").then((res) => {
      let postsData = res.data;
      postsData.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });
      setPosts(postsData);
    });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

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
          <SimpleGrid columns={[1, 1, 1, 2, 2, 3]} spacing={10}>
            {posts.map((post) => (
              <Post
                key={post._id}
                postId={post._id}
                author={post.author}
                authorName={post.authorName}
                authorPicture={post.authorProfilePicture}
                title={post.title}
                description={post.description}
                date={post.date}
                postPicture={post.postPicture}
                fetchPosts={fetchPosts}
              />
            ))}
          </SimpleGrid>
        </VStack>
      </Center>

      <NewPost
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        fetchPosts={fetchPosts}
      />
    </>
  );
};

export default Posts;
