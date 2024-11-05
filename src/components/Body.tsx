import { Container, Flex, Text } from "@chakra-ui/react";
import { Login } from "./Login";
import { Registration } from "./Registration";

interface BodyProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

export function Body({ currentView, onNavigate }: BodyProps) {
  const renderContent = () => {
    switch (currentView) {
      case "login":
        return <Login onNavigate={onNavigate} />;
      case "register":
        return <Registration />;
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
    <Container maxW="6xl" w="100%">
      {renderContent()}
    </Container>
  );
}
