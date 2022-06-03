import React from "react";
import {
  Box,
  Heading,
  HStack,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
  Divider,
} from "@chakra-ui/react";
import dateFormat from "dateformat";

const Comment = ({ authorName, body, date }) => {
  return (
    <>
      <Stack py={2}>
        <HStack direction={"column"} spacing={0} fontSize={"xs"}>
          <Text
            fontWeight={600}
            color={useColorModeValue("blue.400", "red.400")}
            textAlign={"center"}
          >
            {authorName}
          </Text>
          <Text color={useColorModeValue("gray.700", "white.300")} fontSize={"xs"} px={2}>
            {dateFormat(date, "mmmm dS, yyyy, h:MM TT")}
          </Text>
        </HStack>
        <Text color={useColorModeValue("gray.700", "white.300")} fontSize={"sm"}>
            {body}
          </Text>
        </Stack>
        <Divider/>
    </>
  );
};

export default Comment;
