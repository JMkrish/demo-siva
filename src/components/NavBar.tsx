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

interface NavBarProps {
  onNavigate: (view: string) => void;
  isLoggedIn?: boolean;
  onLogout?: () => void;
}

export function NavBar({ onNavigate, isLoggedIn, onLogout }: NavBarProps) {
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    onLogout?.();
    onNavigate("login");
  };

  const navItems = [
    {
      label: isLoggedIn ? "Profile" : "Home",
      href: "#",
      onClick: () => onNavigate(isLoggedIn ? "profile" : "home"),
    },
    { label: "Courses", href: "#", onClick: () => onNavigate("courses") },
    {
      label: "Certificates",
      href: "#",
      onClick: () => onNavigate("certificates"),
    },
    { label: "HELP", href: "#", onClick: () => onNavigate("help") },
    {
      label: isLoggedIn ? "Logout" : "Login",
      href: "#",
      onClick: () => (isLoggedIn ? handleLogout() : onNavigate("login")),
    },
  ];

  return (
    <Container maxW="6xl">
      <Flex justify="space-between" w="100%" align="center">
        {/* Left side items */}
        <Link
          href="/"
          _hover={{ textDecoration: "none" }}
          onClick={() => onNavigate("home")}
        >
          <Flex align="center">
            <Image src={logo} alt="Serigor Logo" boxSize="65px" />
            <Text color="white" fontSize="xl" fontWeight="semibold">
              Serigor University
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
