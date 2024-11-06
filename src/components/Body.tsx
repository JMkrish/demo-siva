import { Container } from "@chakra-ui/react";
import { Login } from "./Login";
import { Registration } from "./Registration";
import { UserProfile } from "./UserProfile";
import { Courses } from "./Courses";
import Home from "./Home";

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
      case "courses":
        return <Courses />;
      default:
        return <Home />;
    }
  };

  return (
    <Container maxW="100%" w="100%">
      {renderContent()}
    </Container>
  );
}
