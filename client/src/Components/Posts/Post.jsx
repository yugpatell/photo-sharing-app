import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  Image,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import PostComment from "../Posts/PostComment";
import dateFormat from "dateformat";

export default function BlogPostWithImage({
  postId,
  author,
  authorName,
  authorPicture,
  title,
  description,
  date,
  postPicture,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Center py={6}>
        <Box
          maxW={"445px"}
          minW={"445px"}
          maxH={"445px"}
          minH={"445px"}
          w={"full"}
          bg={useColorModeValue("white", "gray.900")}
          boxShadow={"2xl"}
          rounded={"md"}
          p={6}
          overflowY={"hidden"}
          onClick={onOpen}
          cursor={"pointer"}
          _hover={{
            transform: "scale(1.01)",
          }}
        >
          <Box
            h={"210px"}
            bg={"gray.100"}
            mt={-6}
            mx={-6}
            mb={6}
            pos={"relative"}
          >
            <Image
              boxSize="150px"
              objectFit="cover"
              w="100%"
              h="100%"
              src={postPicture}
            />
          </Box>
          <Stack minH={"120px"}>
            <Text
              color={"green.500"}
              textTransform={"uppercase"}
              fontWeight={800}
              fontSize={"sm"}
              letterSpacing={1.1}
            >
              Post
            </Text>
            <Heading
              color={useColorModeValue("gray.700", "white")}
              fontSize={"2xl"}
              fontFamily={"body"}
            >
              {title}
            </Heading>
            <Text color={"gray.500"}>{description}</Text>
          </Stack>
          <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
            <Avatar src={authorPicture} alt={"Author"} />
            <Stack direction={"column"} spacing={0} fontSize={"sm"}>
              <Text
                fontWeight={600}
                color={useColorModeValue("blue.400", "red.400")}
              >
                {authorName}
              </Text>
              <Text color={"gray.500"}>
                {dateFormat(date, "mmmm dS, yyyy, h:MM TT")}
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Center>

      <PostComment postId={postId} isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </>
  );
}
