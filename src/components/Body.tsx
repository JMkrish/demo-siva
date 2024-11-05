import { Container, Flex, Text } from "@chakra-ui/react";

export function Body() {
  return (
    <Container maxW="1280px" w="100%">
      <Flex align="center" justify="center" w="100%">
        <Text color="black" fontSize="xl" align="center">
          Body
        </Text>
      </Flex>
    </Container>
  );
}
