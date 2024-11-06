import {
  Container,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Heading,
  Text,
  SimpleGrid,
  useToast,
  Select,
  Checkbox,
  HStack,
  InputGroup,
  InputLeftElement,
  Image,
  Divider,
} from "@chakra-ui/react";
import { useState } from "react";
import { PhoneIcon, EmailIcon, AddIcon } from "@chakra-ui/icons";
import defaultAvatar from "../assets/images/default-avatar.png";

interface FormDataType {
  firstName: string;
  middleName: string;
  lastName: string;
  suffix: string;
  dob: string;
  gender: string;
  email: string;
  phone: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipCode: string;
  zipExt: string;
  county: string;
  mailAddress1: string;
  mailAddress2: string;
  mailCity: string;
  mailState: string;
  mailZipCode: string;
  mailZipExt: string;
  mailCounty: string;
  profileImage: File | null;
  primaryPhone: string;
  cellPhone: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
}

interface UserCredentials {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export function Registration() {
  const toast = useToast();
  const [formData, setFormData] = useState<FormDataType>({
    firstName: "",
    middleName: "",
    lastName: "",
    suffix: "",
    dob: "",
    gender: "",
    email: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zipCode: "",
    zipExt: "",
    county: "",
    mailAddress1: "",
    mailAddress2: "",
    mailCity: "",
    mailState: "",
    mailZipCode: "",
    mailZipExt: "",
    mailCounty: "",
    profileImage: null,
    primaryPhone: "",
    cellPhone: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
  });

  const [sameAsResidential, setSameAsResidential] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [imagePreview, setImagePreview] = useState(defaultAvatar);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.match(/image\/(jpeg|jpg|png|gif)/)) {
        setFormData((prev) => ({ ...prev, profileImage: file }));
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        toast({
          title: "Invalid file format",
          description: "Only JPG/PNG/JPEG/GIF files are allowed",
          status: "error",
          duration: 3000,
        });
      }
    }
  };

  const handleSameAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSameAsResidential(e.target.checked);
    if (e.target.checked) {
      setFormData((prev) => ({
        ...prev,
        mailAddress1: prev.address1,
        mailAddress2: prev.address2,
        mailCity: prev.city,
        mailState: prev.state,
        mailZipCode: prev.zipCode,
        mailZipExt: prev.zipExt,
        mailCounty: prev.county,
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.dob) newErrors.dob = "Date of birth is required";
    if (!formData.gender) newErrors.gender = "Gender is required";

    if (!formData.confirmEmail) {
      newErrors.confirmEmail = "Please confirm your email";
    } else if (formData.email !== formData.confirmEmail) {
      newErrors.confirmEmail = "Emails do not match";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const credentials: UserCredentials = {
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
      };

      const existingUsers = JSON.parse(
        localStorage.getItem("registeredUsers") || "[]"
      );

      if (
        existingUsers.some(
          (user: UserCredentials) => user.email === credentials.email
        )
      ) {
        toast({
          title: "Registration Failed",
          description: "An account with this email already exists.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      }

      existingUsers.push(credentials);

      localStorage.setItem("registeredUsers", JSON.stringify(existingUsers));

      console.log("Form data:", formData);
      toast({
        title: "Registration Successful",
        description:
          "Your profile has been created successfully. You can now login.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      console.log(
        "Stored users:",
        JSON.parse(localStorage.getItem("registeredUsers") || "[]")
      );
    }
  };

  return (
    <Container maxW="6xl" py={8}>
      {/* Header Section */}
      <VStack spacing={4} mb={8}>
        <Heading as="h2" size="lg">
          Create Your Serigor Account
        </Heading>
        <Text color="gray.600" textAlign="center" maxW="2xl">
          Join our community of learners and professionals. Fill out the form below to get started.
        </Text>
      </VStack>

      <Box maxW="6xl" mx="auto" borderWidth={1} borderRadius="lg" p={8} bg="white" shadow="md">
        <form onSubmit={handleSubmit}>
          <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={8}>
            {/* Main Form Content - Left Side */}
            <VStack spacing={6} align="stretch" gridColumn={{ base: "1", lg: "span 2" }}>
              {/* Account Credentials Section */}
              <Box bg="gray.50" p={6} borderRadius="md">
                <Heading as="h3" size="md" mb={4} color="blue.700">
                  Account Credentials
                </Heading>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                  <FormControl isRequired isInvalid={!!errors.email}>
                    <FormLabel fontSize="sm">Email</FormLabel>
                    <InputGroup>
                      <InputLeftElement children={<EmailIcon />} />
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        bg="white"
                      />
                    </InputGroup>
                    {errors.email && (
                      <Text color="red.500" fontSize="sm">{errors.email}</Text>
                    )}
                  </FormControl>

                  <FormControl isRequired isInvalid={!!errors.confirmEmail}>
                    <FormLabel fontSize="sm">Confirm Email</FormLabel>
                    <InputGroup>
                      <InputLeftElement children={<EmailIcon />} />
                      <Input
                        name="confirmEmail"
                        type="email"
                        value={formData.confirmEmail}
                        onChange={handleChange}
                        bg="white"
                      />
                    </InputGroup>
                    {errors.confirmEmail && (
                      <Text color="red.500" fontSize="sm">{errors.confirmEmail}</Text>
                    )}
                  </FormControl>

                  <FormControl isRequired isInvalid={!!errors.password}>
                    <FormLabel fontSize="sm">Password</FormLabel>
                    <Input
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      bg="white"
                    />
                    {errors.password && (
                      <Text color="red.500" fontSize="sm">{errors.password}</Text>
                    )}
                  </FormControl>

                  <FormControl isRequired isInvalid={!!errors.confirmPassword}>
                    <FormLabel fontSize="sm">Confirm Password</FormLabel>
                    <Input
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      bg="white"
                    />
                    {errors.confirmPassword && (
                      <Text color="red.500" fontSize="sm">{errors.confirmPassword}</Text>
                    )}
                  </FormControl>
                </SimpleGrid>
              </Box>

              {/* Personal Information Section */}
              <Box bg="gray.50" p={6} borderRadius="md">
                <Heading as="h3" size="md" mb={4} color="blue.700">
                  Personal Information
                </Heading>
                <Text color="red.500" fontSize="sm" mb={4}>
                  * These details cannot be changed after registration without admin approval
                </Text>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                  <FormControl isRequired isInvalid={!!errors.firstName}>
                    <FormLabel fontSize="sm">First Name</FormLabel>
                    <Input
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      bg="white"
                    />
                    {errors.firstName && (
                      <Text color="red.500" fontSize="sm">{errors.firstName}</Text>
                    )}
                  </FormControl>

                  <FormControl>
                    <FormLabel fontSize="sm">Middle Name</FormLabel>
                    <Input
                      name="middleName"
                      value={formData.middleName}
                      onChange={handleChange}
                      bg="white"
                    />
                  </FormControl>

                  <FormControl isRequired isInvalid={!!errors.lastName}>
                    <FormLabel fontSize="sm">Last Name</FormLabel>
                    <Input
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      bg="white"
                    />
                    {errors.lastName && (
                      <Text color="red.500" fontSize="sm">{errors.lastName}</Text>
                    )}
                  </FormControl>

                  <FormControl>
                    <FormLabel fontSize="sm">Suffix</FormLabel>
                    <Input
                      name="suffix"
                      value={formData.suffix}
                      onChange={handleChange}
                      bg="white"
                    />
                  </FormControl>

                  <FormControl isRequired isInvalid={!!errors.dob}>
                    <FormLabel fontSize="sm">Date of Birth</FormLabel>
                    <Input
                      name="dob"
                      type="date"
                      value={formData.dob}
                      onChange={handleChange}
                      bg="white"
                    />
                    {errors.dob && (
                      <Text color="red.500" fontSize="sm">{errors.dob}</Text>
                    )}
                  </FormControl>

                  <FormControl isRequired isInvalid={!!errors.gender}>
                    <FormLabel fontSize="sm">Gender</FormLabel>
                    <Select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      bg="white"
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other/Prefer Not to Answer</option>
                    </Select>
                    {errors.gender && (
                      <Text color="red.500" fontSize="sm">{errors.gender}</Text>
                    )}
                  </FormControl>
                </SimpleGrid>
              </Box>

              {/* Contact Details Section */}
              <Box bg="gray.50" p={6} borderRadius="md">
                <Heading as="h3" size="md" mb={4} color="blue.700">
                  Contact Details
                </Heading>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                  {/* Phone Numbers */}
                  <FormControl>
                    <FormLabel fontSize="sm">Primary Phone</FormLabel>
                    <InputGroup>
                      <InputLeftElement children={<PhoneIcon />} />
                      <Input
                        name="primaryPhone"
                        type="tel"
                        value={formData.primaryPhone}
                        onChange={handleChange}
                        bg="white"
                      />
                    </InputGroup>
                  </FormControl>

                  <FormControl>
                    <FormLabel fontSize="sm">Cell Phone</FormLabel>
                    <InputGroup>
                      <InputLeftElement children={<PhoneIcon />} />
                      <Input
                        name="cellPhone"
                        type="tel"
                        value={formData.cellPhone}
                        onChange={handleChange}
                        bg="white"
                      />
                    </InputGroup>
                  </FormControl>

                  {/* Address Fields */}
                  <FormControl isRequired gridColumn={{ base: "auto", md: "span 2" }}>
                    <FormLabel fontSize="sm">Street Address</FormLabel>
                    <Input
                      name="address1"
                      value={formData.address1}
                      onChange={handleChange}
                      placeholder="Street Address"
                      bg="white"
                    />
                  </FormControl>

                  <FormControl gridColumn={{ base: "auto", md: "span 2" }}>
                    <FormLabel fontSize="sm">Apartment/Suite/Building#</FormLabel>
                    <Input
                      name="address2"
                      value={formData.address2}
                      onChange={handleChange}
                      placeholder="Apartment/Suite/Building#"
                      bg="white"
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel fontSize="sm">City</FormLabel>
                    <Input
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="City"
                      bg="white"
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel fontSize="sm">State</FormLabel>
                    <Select
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="Select state"
                      bg="white"
                    >
                      <option value="MA">Massachusetts</option>
                      <option value="NY">New York</option>
                      <option value="CA">California</option>
                      {/* Add more states as needed */}
                    </Select>
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel fontSize="sm">Zip Code</FormLabel>
                    <HStack>
                      <Input
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        placeholder="Zip Code"
                        maxLength={5}
                        bg="white"
                      />
                      <Text>-</Text>
                      <Input
                        name="zipExt"
                        value={formData.zipExt}
                        onChange={handleChange}
                        placeholder="Extension"
                        maxLength={4}
                        w="100px"
                        bg="white"
                      />
                    </HStack>
                  </FormControl>

                  <FormControl>
                    <FormLabel fontSize="sm">County</FormLabel>
                    <Select
                      name="county"
                      value={formData.county}
                      onChange={handleChange}
                      placeholder="Select county"
                      bg="white"
                    >
                      <option value="middlesex">Middlesex</option>
                      <option value="suffolk">Suffolk</option>
                      {/* Add more counties as needed */}
                    </Select>
                  </FormControl>
                </SimpleGrid>
              </Box>

            </VStack>

            {/* Profile Image Section - Right Side */}
            <VStack spacing={4} align="stretch">
              <Box 
                bg="gray.50" 
                p={6} 
                borderRadius="md" 
                w="100%"
              >
                <Heading as="h3" size="md" mb={6} color="blue.700">
                  Profile Picture
                </Heading>
                <VStack 
                  spacing={6} 
                  align="center" 
                  w="100%"
                >
                  <Box
                    w="240px"  // Fixed width
                    h="240px"  // Fixed height
                    position="relative"
                    borderWidth={2}
                    borderRadius="lg"
                    borderStyle="dashed"
                    borderColor="gray.300"
                    overflow="hidden"
                    bg="white"
                  >
                    <Image
                      src={imagePreview}
                      alt="Profile Preview"
                      objectFit="cover"
                      w="100%"
                      h="100%"
                    />
                  </Box>
                  <VStack spacing={2} w="100%">
                    <FormControl>
                      <Button
                        as="label"
                        htmlFor="profile-image"
                        cursor="pointer"
                        colorScheme="blue"
                        width="100%"
                        size="md"
                        _hover={{ bg: "blue.600" }}
                      >
                        Choose Photo
                        <Input
                          id="profile-image"
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          display="none"
                        />
                      </Button>
                    </FormControl>
                    <Text fontSize="xs" color="gray.500" textAlign="center">
                      Supported formats: JPG/JPEG/PNG/GIF
                    </Text>
                  </VStack>
                </VStack>
              </Box>
            </VStack>
          </SimpleGrid>

          {/* Submit Button Section */}
          <VStack mt={8} spacing={4}>
            <Button
              type="submit"
              colorScheme="blue"
              size="lg"
              px={12}
              loadingText="Creating Account..."
            >
              Create Account
            </Button>
            <Text color="gray.600" fontSize="sm">
              By creating an account, you agree to our Terms of Service and Privacy Policy
            </Text>
          </VStack>
        </form>
      </Box>
    </Container>
  );
}
