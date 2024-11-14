import {
  Container,
  Box,
  VStack,
  Heading,
  Text,
  Avatar,
  SimpleGrid,
  Divider,
  Icon,
  Button,
  Link,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { dashboardTiles } from "../data/dashboardData";
import type { DashboardTile } from "../data/dashboardData";

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
        <Box w="full" p={8} borderWidth={1} borderRadius="lg" shadow="md">
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mb={8}>
            <Box>
              <Avatar
                size="2xl"
                name={`${userData.firstName} ${userData.lastName}`}
              />
            </Box>
            <Box>
              <Heading size="md" mb={4}>
                Welcome, {userData.firstName}!
              </Heading>
              <Text>
                <strong>Email:</strong> {userData.email}
              </Text>
              <Text>
                <strong>Status:</strong> Active
              </Text>
            </Box>
          </SimpleGrid>

          <Divider mb={8} />

          <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6}>
            {dashboardTiles.map((tile, index) => (
              <Box
                key={index}
                p={4}
                borderWidth={1}
                borderRadius="lg"
                shadow="sm"
                _hover={{ shadow: "md", transform: "translateY(-2px)" }}
                transition="all 0.2s"
              >
                <VStack spacing={3} align="stretch" h="100%">
                  <Icon as={tile.icon} boxSize={8} color="blue.500" />
                  <Heading size="sm" color="blue.800">
                    {tile.title}
                  </Heading>
                  <Text fontSize="sm" color="gray.600" noOfLines={3}>
                    {tile.description}
                  </Text>
                  <Box mt="auto" pt={2}>
                    <Button
                      size="sm"
                      colorScheme="blue"
                      width="100%"
                      onClick={() => onNavigate?.(tile.link)}
                    >
                      Select
                    </Button>
                    <Link
                      onClick={() => onNavigate?.(tile.helpLink)}
                      fontSize="sm"
                      color="gray.500"
                      display="block"
                      textAlign="center"
                      mt={2}
                      cursor="pointer"
                      _hover={{ textDecoration: 'none' }}
                    >
                      Help
                    </Link>
                  </Box>
                </VStack>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      </VStack>
    </Container>
  );
}
