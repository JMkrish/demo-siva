import { Grid, GridItem } from "@chakra-ui/react";
import { NavBar } from "./components/NavBar";
import { Body } from "./components/Body";
import { Footer } from "./components/Footer";
import "./App.css";

function App() {
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
        <NavBar />
      </GridItem>

      <GridItem area="body" bg="white" p={4}>
        <Body />
      </GridItem>

      <GridItem area="footer" bg="red" p={4}>
        <Footer />
      </GridItem>
    </Grid>
  );
}

export default App;
