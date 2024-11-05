import { Container, Flex, Text } from "@chakra-ui/react";
import { Login } from "./Login";
import { Registration } from "./Registration";
import { UserProfile } from "./UserProfile";

interface BodyProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onLoginSuccess?: (userData: any) => void;
}

export function Body({ currentView, onNavigate, onLoginSuccess }: BodyProps) {
  const renderContent = () => {
    switch (currentView) {
      case "login":
        return (
          <Login onNavigate={onNavigate} onLoginSuccess={onLoginSuccess} />
        );
      case "register":
        return <Registration />;
      case "profile":
        return <UserProfile onNavigate={onNavigate} />;
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
