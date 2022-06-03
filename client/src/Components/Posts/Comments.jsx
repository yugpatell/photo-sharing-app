import { Box, Heading, HStack, Text } from "@chakra-ui/react";
import React from "react";

const Comments = () => {
  return (
    <Box>
      <HStack>
        <Heading size={"sm"}>Yug</Heading>
        <Heading size={"sm"}>3 hours ago</Heading>
      </HStack>
      <Heading size={"xs"} color={"blue.300"}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Heading>
    </Box>
  );
};

export default Comments;
