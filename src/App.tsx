import { Grid, GridItem } from "@chakra-ui/react";
import { NavBar } from "./components/NavBar";
import { Body } from "./components/Body";
import { Footer } from "./components/Footer";
import { useState } from "react";
import "./App.css";

function App() {
  const [currentView, setCurrentView] = useState('home');

  const handleNavigation = (view: string) => {
    setCurrentView(view);
  };

  return (
    <Grid
      templateAreas={{ base: `"nav" "body" "footer"` }}
      minH="100vh"
      w="100vw"
      maxW="100%"
      m="0"
      p="0"
      templateRows="auto 1fr auto"
    >
      <GridItem area="nav" bg="blue.800" p={4}>
        <NavBar onNavigate={handleNavigation} />
      </GridItem>

      <GridItem area="body" bg="white" p={4}>
        <Body currentView={currentView} />
      </GridItem>

      <GridItem area="footer" bg="blackAlpha.800" p={4}>
        <Footer />
      </GridItem>
    </Grid>
  );
}

export default App;
