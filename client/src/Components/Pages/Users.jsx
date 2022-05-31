import { useState, useEffect } from "react";
import axios from "axios";
import UserProfile from "./UserProfile";
import {
  SimpleGrid,
  Box,
  Stack,
  Wrap,
  WrapItem,
  Center,
} from "@chakra-ui/react";

export default function Profiles() {
  const [profiles, setProfiles] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8080/profile/users").then(
      (res) => {
        setProfiles(res.data);
        console.log(res.data);
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);
  return (
    <>
      <SimpleGrid columns={4} spacing={15}>
        <Box bg="tomato" height="80px"></Box>
        <Box bg="tomato" height="80px"></Box>
        <Box bg="tomato" height="80px"></Box>
        <Box bg="tomato" height="80px"></Box>
        <Box bg="tomato" height="80px"></Box>
        <Box bg="tomato" height="80px"></Box>
      </SimpleGrid>
    </>
  );
}
