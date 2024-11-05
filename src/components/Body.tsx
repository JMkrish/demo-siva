import { Container, Flex, Text } from "@chakra-ui/react";
import { Login } from "./Login";

interface BodyProps {
  currentView: string;
}

export function Body({ currentView }: BodyProps) {
  const renderContent = () => {
    switch (currentView) {
      case "login":
        return <Login />;
      default:
        return (
          <Flex align="center" justify="center" w="100%">
            <Text color="black" fontSize="xl" align="center">
              Body
            </Text>
          </Flex>
        );
    }
  };

  return (
    <Container maxW="1280px" w="100%">
      {renderContent()}
    </Container>
  );
}
