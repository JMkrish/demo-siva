import {
  Container,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Heading,
  Text,
  Link,
  Divider,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { useState } from "react";

interface LoginProps {
  onNavigate?: (view: string) => void;
  onLoginSuccess?: (userData: any) => void;
}

export function Login({ onNavigate, onLoginSuccess }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    let isValid = true;

    if (!email) {
      setEmailError("Username is required.");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter valid email");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Please enter your password.");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (isValid) {
      const registeredUsers = JSON.parse(
        localStorage.getItem("registeredUsers") || "[]"
      );
      const user = registeredUsers.find(
        (u: any) => u.email === email && u.password === password
      );

      if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        onLoginSuccess?.(user);
        onNavigate?.("profile");
      } else {
        setLoginError("Invalid email or password. Please try again.");
      }
    }
  };

  return (
    <Container maxW="6xl" py={8}>
      {/* Title Section */}
      <VStack spacing={4} mb={8}>
        <Heading as="h3" size="lg" textAlign="center">
          Log in
        </Heading>
        <Heading as="h4" size="md" color="gray.600" fontWeight="normal">
          Enter your Username and Password
        </Heading>
      </VStack>

      {/* Login Form */}
      <Box
        maxW="md"
        mx="auto"
        borderWidth={1}
        borderRadius="md"
        p={6}
        borderColor="gray.300"
      >
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl isRequired isInvalid={!!emailError}>
              <FormLabel htmlFor="email">Username</FormLabel>
              <Input
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setLoginError("");
                }}
              />
              {emailError && (
                <Text color="red.500" fontSize="sm">
                  {emailError}
                </Text>
              )}
            </FormControl>

            <FormControl isRequired isInvalid={!!passwordError}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setLoginError("");
                }}
              />
              {passwordError && (
                <Text color="red.500" fontSize="sm">
                  {passwordError}
                </Text>
              )}
            </FormControl>

            <VStack align="stretch" w="100%" spacing={2}>
              <Text>
                Forgot your Password?{" "}
                <Link color="blue.500" href="#">
                  Click here
                </Link>{" "}
                to reset password.
              </Text>
              <Text>
                Forgot your Username?{" "}
                <Link color="blue.500" href="#">
                  Click here
                </Link>{" "}
                to reset.
              </Text>
            </VStack>

            {/* Login Error Alert */}
            {loginError && (
              <Alert status="error" borderRadius="md">
                <AlertIcon />
                {loginError}
              </Alert>
            )}

            <Button
              type="submit"
              colorScheme="blue"
              width="100%"
              isInvalid={!!loginError}
              _invalid={{
                borderColor: "red.500",
                boxShadow: "0 0 0 1px red.500",
              }}
            >
              Login
            </Button>

            <Divider my={4} />

            <VStack align="stretch" w="100%" spacing={4}>
              <Text>
                You can browse the training courses{" "}
                <strong>from the MENU</strong> but will need an account to
                register for the training.
              </Text>
              <Text align="center" fontWeight="bold">
                First-time users, please register here.
              </Text>
              <Button
                onClick={() => onNavigate?.("register")}
                colorScheme="green"
                width="100%"
              >
                Register
              </Button>
            </VStack>
          </VStack>
        </form>
      </Box>
    </Container>
  );
}
