import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  HStack,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
  Box,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { SmallCloseIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function UserProfileEdit() {
  const [showPassword, setShowPassword] = useState(false);
  // eslint-disable-next-line
  const [user, setUser] = useContext(UserContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showError, setError] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    if (user.user) {
      setFirstName(user.user.firstName);
      setLastName(user.user.lastName);
      setEmail(user.user.email);
    }
  }, [user]);

  const handleProfileChange = () => {
    axios
      .put(`http://localhost:8080/profile/user=${user.user.id}`, {
        firstName: firstName,
        lastName: lastName,
        email: email,
        oldPassword: oldPassword,
        newPassword: newPassword,
      })
      .then(
        (res) => {
          console.log("Successfully updated profile!");
          setError(null);
          navigate("/editprofile");
          window.location.reload(false);
        },
        (error) => {
          setError(error.response.data.errors[0]);
        }
      );
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
          User Profile Edit
        </Heading>
        <FormControl id="userName">
          <FormLabel>User Icon</FormLabel>
          <Stack direction={["column", "row"]} spacing={6}>
            <Center>
              <Avatar size="xl" src="https://bit.ly/sage-adebayo">
                <AvatarBadge
                  as={IconButton}
                  size="sm"
                  rounded="full"
                  top="-10px"
                  colorScheme="red"
                  aria-label="remove Image"
                  icon={<SmallCloseIcon />}
                />
              </Avatar>
            </Center>
            <Center w="full">
              <Button w="full">Change Icon</Button>
            </Center>
          </Stack>
        </FormControl>
        <Stack spacing={4}>
          <HStack>
            <Box>
              <FormControl id="firstName" isRequired>
                <FormLabel>First Name</FormLabel>
                <Input
                  type="text"
                  value={firstName}
                  onChange={(event) => {
                    setFirstName(event.target.value.replace(/[^a-zA-Z]/g, ""));
                  }}
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl id="lastName" isRequired>
                <FormLabel>Last Name</FormLabel>
                <Input
                  type="text"
                  value={lastName}
                  onChange={(event) => {
                    setLastName(event.target.value.replace(/[^a-zA-Z]/g, ""));
                  }}
                />
              </FormControl>
            </Box>
          </HStack>
          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value.replace(/[^a-zA-Z0-9@.]/g, ""));
              }}
            />
          </FormControl>
          <FormControl id="oldPassword" isRequired>
            <FormLabel>Old Password</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                onChange={(event) => {
                  setOldPassword(event.target.value);
                }}
              />
              <InputRightElement h={"full"}>
                <Button
                  variant={"ghost"}
                  onClick={() =>
                    setShowPassword((showPassword) => !showPassword)
                  }
                >
                  {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <FormControl id="newPassword" isRequired>
            <FormLabel>New Password</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                onChange={(event) => setNewPassword(event.target.value)}
              />
              <InputRightElement h={"full"}>
                <Button
                  variant={"ghost"}
                  onClick={() =>
                    setShowPassword((showPassword) => !showPassword)
                  }
                >
                  {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
        </Stack>
        {showError && <FormLabel color={"red"}> {showError}</FormLabel>}
        <Stack spacing={6} direction={["column", "row"]}>
          <Button
            bg={"red.400"}
            color={"white"}
            w="full"
            _hover={{
              bg: "red.500",
            }}
            onClick={() => navigate("/")}
          >
            Cancel
          </Button>
          <Button
            bg={"blue.400"}
            color={"white"}
            w="full"
            _hover={{
              bg: "blue.500",
            }}
            onClick={handleProfileChange}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}
