import {
  Box,
  Container,
  Flex,
  Text,
  Image,
  Link,
  HStack,
} from "@chakra-ui/react";
import logo from "../assets/images/harvard-fac.webp";

export function NavBar() {
  const navItems = [
    // { label: "Home", href: "home.aspx#home" },
    // { label: "Courses", href: "courses.aspx#courses" },
    // { label: "Certificates", href: "Certificates.aspx#certificate" },
    // { label: "HELP", href: "faq.aspx#faq" },
    { label: "Home", href: "#" },
    { label: "Courses", href: "#" },
    { label: "Certificates", href: "#" },
    { label: "HELP", href: "#" },
    { label: "Login", href: "#", onClick: () => goToLogin() },
  ];

  const goToLogin = () => {
    // Implement login logic here
    console.log("Navigating to login...");
  };

  return (
    <Container maxW="1280px">
      <Flex justify="space-between" w="100%">
        {/* Left side items */}
        <Link href="/" _hover={{ textDecoration: "none" }}>
          <Flex align="center">
            <Image src={logo} alt="Harvard Logo" boxSize="65px" />
            <Text color="white" fontSize="xl" fontWeight="semibold">
              Harvard University
            </Text>
          </Flex>
        </Link>

        {/* Right side items */}
        <Flex align="center" gap={6}>
          {/* <HStack gap={6} align="center"> */}
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              onClick={item.onClick}
              color="white"
              fontSize="l"
              fontWeight="medium"
              _hover={{
                textDecoration: "none",
                color: "blue.800",
                bg: "white",
              }}
            >
              {item.label}
            </Link>
          ))}
          {/* </HStack> */}
        </Flex>
      </Flex>
    </Container>
  );
}
