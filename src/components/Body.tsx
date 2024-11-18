import { Container } from "@chakra-ui/react";
import { Login } from "./Login";
import { Registration } from "./Registration";
import { UserProfile } from "./UserProfile";
import { Courses } from "./Courses";
import { TrainingCoursesHelp } from "./TrainingCoursesHelp";
import { ExamsHelp } from "./ExamsHelp";
import Home from "./Home";
import { Exams } from "./Exams";

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
      case "dashboard":
        return <UserProfile onNavigate={onNavigate} />;
      case "courses":
        return <Courses />;
      case "courses-help":
        return <TrainingCoursesHelp />;
      case "exams-help":
        return <ExamsHelp />;
      case "exams":
        return <Exams />;
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
