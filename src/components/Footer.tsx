import { Container, Flex, Text } from "@chakra-ui/react";

export function Footer() {
  return (
    <Container maxW="1280px" w="100%">
      <Flex align="center" justify="center" w="100%">
        <Text color="black" fontSize="xl" align="center">
          Footer
        </Text>
      </Flex>
    </Container>
  );
}
