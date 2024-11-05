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
  Checkbox,
  Link,
  Divider,
} from "@chakra-ui/react";
import { useState } from "react";

interface LoginProps {
  onNavigate?: (view: string) => void;
}

export function Login({ onNavigate }: LoginProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validation logic
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
      console.log("Login attempted");
    }
  };

  return (
    <Container maxW="1280px" py={8}>
      {/* Title Section */}
      <VStack spacing={4} mb={8}>
        <Text color="red" fontSize="lg"></Text>
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
            <FormControl isRequired>
              <FormLabel htmlFor="email">Username</FormLabel>
              <Input
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError && (
                <Text color="red.500" fontSize="sm">
                  {emailError}
                </Text>
              )}
            </FormControl>

            <FormControl isRequired>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordError && (
                <Text color="red.500" fontSize="sm">
                  {passwordError}
                </Text>
              )}
              <Checkbox
                mt={2}
                onChange={(e) => setShowPassword(e.target.checked)}
              >
                Show password
              </Checkbox>
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

            <Button type="submit" colorScheme="blue" width="100%">
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
                onClick={() => onNavigate?.('register')}
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
