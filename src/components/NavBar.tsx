import {
  Container,
  Flex,
  Text,
  Image,
  Link,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Show,
  Hide,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
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
      <Flex justify="space-between" w="100%" align="center">
        {/* Left side items */}
        <Link href="/" _hover={{ textDecoration: "none" }}>
          <Flex align="center">
            <Image src={logo} alt="Harvard Logo" boxSize="65px" />
            <Text color="white" fontSize="xl" fontWeight="semibold">
              Harvard University
            </Text>
          </Flex>
        </Link>

        {/* Desktop Navigation */}
        <Hide below="md">
          <Flex align="center" gap={6}>
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
          </Flex>
        </Hide>

        {/* Mobile Navigation */}
        <Show below="md">
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<HamburgerIcon />}
              variant="outline"
              color="white"
              _hover={{ bg: "whiteAlpha.200" }}
              _active={{ bg: "whiteAlpha.300" }}
            />
            <MenuList>
              {navItems.map((item, index) => (
                <MenuItem
                  key={index}
                  onClick={item.onClick}
                  as="a"
                  href={item.href}
                >
                  {item.label}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </Show>
      </Flex>
    </Container>
  );
}
