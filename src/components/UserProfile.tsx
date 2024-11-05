import {
  Container,
  Box,
  VStack,
  Heading,
  Text,
  Avatar,
  SimpleGrid,
  Divider,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface UserProfileProps {
  onNavigate?: (view: string) => void;
}

export function UserProfile({ onNavigate }: UserProfileProps) {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      setUserData(JSON.parse(currentUser));
    } else {
      onNavigate?.("login");
    }
  }, [onNavigate]);

  if (!userData) return null;

  return (
    <Container maxW="6xl" py={8}>
      <VStack spacing={8}>
        <Heading size="lg">User Profile</Heading>

        <Box w="full" p={8} borderWidth={1} borderRadius="lg" shadow="md">
          <VStack spacing={6} align="stretch">
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              <Box>
                <Avatar
                  size="2xl"
                  name={`${userData.firstName} ${userData.lastName}`}
                />
              </Box>
              <Box>
                <Heading size="md" mb={4}>
                  Personal Information
                </Heading>
                <Text>
                  <strong>Name:</strong> {userData.firstName}{" "}
                  {userData.lastName}
                </Text>
                <Text>
                  <strong>Email:</strong> {userData.email}
                </Text>
              </Box>
            </SimpleGrid>

            <Divider />

            <Box>
              <Heading size="md" mb={4}>
                Account Status
              </Heading>
              <Text>
                <strong>Status:</strong> Active
              </Text>
              <Text>
                <strong>Member Since:</strong> {new Date().toLocaleDateString()}
              </Text>
            </Box>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}
