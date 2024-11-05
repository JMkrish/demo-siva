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
      console.log("Form data:", formData);
      toast({
        title: "Registration Successful",
        description: "Your profile has been created successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="6xl" py={8}>
      <VStack spacing={4} mb={8}>
        <Heading as="h2" size="lg" textAlign="center">
          Personal Profile
        </Heading>
      </VStack>

      <Box maxW="6xl" mx="auto" borderWidth={1} borderRadius="lg" p={8}>
        <Text color="red.500" fontWeight="bold">
          Name, DOB, Gender and email address cannot be changed after creating
          the profile except by Admin.
        </Text>
        <form onSubmit={handleSubmit}>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
            {/* Left Column - Form Fields */}
            <VStack
              spacing={6}
              align="stretch"
              gridColumn={{ base: "1", md: "span 2" }}
            >
              <Divider my={3} borderColor="gray.300" />

              <Heading as="h3" size="md">
                Personal Information
              </Heading>

              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                <FormControl isRequired isInvalid={!!errors.firstName}>
                  <FormLabel fontSize="sm">First Name</FormLabel>
                  <Input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter first name"
                  />
                  {errors.firstName && (
                    <Text color="red.500" fontSize="sm">
                      {errors.firstName}
                    </Text>
                  )}
                </FormControl>

                <FormControl>
                  <FormLabel fontSize="sm">Middle Name</FormLabel>
                  <Input
                    name="middleName"
                    value={formData.middleName}
                    onChange={handleChange}
                    placeholder="Enter middle name"
                  />
                </FormControl>
              </SimpleGrid>

              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                <FormControl isRequired isInvalid={!!errors.lastName}>
                  <FormLabel fontSize="sm">Last Name</FormLabel>
                  <Input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Enter last name"
                  />
                  {errors.lastName && (
                    <Text color="red.500" fontSize="sm">
                      {errors.lastName}
                    </Text>
                  )}
                </FormControl>

                <FormControl>
                  <FormLabel fontSize="sm">Suffix</FormLabel>
                  <Input
                    name="suffix"
                    value={formData.suffix}
                    onChange={handleChange}
                    placeholder="Enter suffix"
                  />
                </FormControl>
              </SimpleGrid>

              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                <FormControl isRequired isInvalid={!!errors.dob}>
                  <FormLabel fontSize="sm">
                    Date of Birth (MM/DD/YYYY)
                  </FormLabel>
                  <Input
                    name="dob"
                    type="date"
                    value={formData.dob}
                    onChange={handleChange}
                  />
                  {errors.dob && (
                    <Text color="red.500" fontSize="sm">
                      {errors.dob}
                    </Text>
                  )}
                </FormControl>

                <FormControl isRequired isInvalid={!!errors.gender}>
                  <FormLabel fontSize="sm">Gender</FormLabel>
                  <Select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    placeholder="Select gender"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other/Prefer Not to Answer</option>
                  </Select>
                  {errors.gender && (
                    <Text color="red.500" fontSize="sm">
                      {errors.gender}
                    </Text>
                  )}
                </FormControl>
              </SimpleGrid>

              {/* Contact Information Section */}
              <Divider my={3} borderColor="gray.300" />

              <Heading as="h3" size="md">
                Contact Information
              </Heading>

              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                <FormControl>
                  <FormLabel fontSize="sm">Primary Phone Number</FormLabel>
                  <InputGroup>
                    <InputLeftElement children={<PhoneIcon />} />
                    <Input
                      name="primaryPhone"
                      type="tel"
                      value={formData.primaryPhone}
                      onChange={handleChange}
                      placeholder="Enter primary phone number"
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
                      placeholder="Enter cell phone number"
                    />
                  </InputGroup>
                </FormControl>
              </SimpleGrid>

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
                      placeholder="Enter email"
                    />
                  </InputGroup>
                  {errors.email && (
                    <Text color="red.500" fontSize="sm">
                      {errors.email}
                    </Text>
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
                      placeholder="Confirm your email"
                    />
                  </InputGroup>
                  {errors.confirmEmail && (
                    <Text color="red.500" fontSize="sm">
                      {errors.confirmEmail}
                    </Text>
                  )}
                </FormControl>
              </SimpleGrid>

              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                <FormControl isRequired isInvalid={!!errors.password}>
                  <FormLabel fontSize="sm">Password</FormLabel>
                  <Input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                  />
                  {errors.password && (
                    <Text color="red.500" fontSize="sm">
                      {errors.password}
                    </Text>
                  )}
                </FormControl>

                <FormControl isRequired isInvalid={!!errors.confirmPassword}>
                  <FormLabel fontSize="sm">Confirm Password</FormLabel>
                  <Input
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                  />
                  {errors.confirmPassword && (
                    <Text color="red.500" fontSize="sm">
                      {errors.confirmPassword}
                    </Text>
                  )}
                </FormControl>
              </SimpleGrid>

              {/* Residential Address Section */}
              <Divider my={3} borderColor="gray.300" />

              <Heading as="h3" size="md">
                Residential Address
              </Heading>

              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                <FormControl isRequired>
                  <FormLabel fontSize="sm">Street Address</FormLabel>
                  <Input
                    name="address1"
                    value={formData.address1}
                    onChange={handleChange}
                    placeholder="Street Address"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel fontSize="sm">Apartment/Suite/Building#</FormLabel>
                  <Input
                    name="address2"
                    value={formData.address2}
                    onChange={handleChange}
                    placeholder="Apartment/Suite/Building#"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel fontSize="sm">City</FormLabel>
                  <Input
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel fontSize="sm">State</FormLabel>
                  <Select
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="Select state"
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
                    />
                    <Text>-</Text>
                    <Input
                      name="zipExt"
                      value={formData.zipExt}
                      onChange={handleChange}
                      placeholder="Extension"
                      maxLength={4}
                      w="100px"
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
                  >
                    <option value="middlesex">Middlesex</option>
                    <option value="suffolk">Suffolk</option>
                    {/* Add more counties as needed */}
                  </Select>
                </FormControl>
              </SimpleGrid>

              <Divider my={3} borderColor="gray.300" />

              {/* Mailing Address Section */}
              <Box mt={6}>
                <VStack align="start" w="100%" mb={4} spacing={2}>
                  <Heading as="h3" size="md">
                    Mailing Address
                  </Heading>
                  <Checkbox
                    isChecked={sameAsResidential}
                    onChange={handleSameAddress}
                    colorScheme="blue"
                    size="lg"
                  >
                    <Text fontSize="sm">
                      Check if same as the address above
                    </Text>
                  </Checkbox>
                </VStack>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                  <FormControl isRequired>
                    <FormLabel fontSize="sm">Street Address</FormLabel>
                    <Input
                      name="mailAddress1"
                      value={
                        sameAsResidential
                          ? formData.address1
                          : formData.mailAddress1
                      }
                      onChange={handleChange}
                      placeholder="Street Address"
                      isDisabled={sameAsResidential}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel fontSize="sm">
                      Apartment/Suite/Building#
                    </FormLabel>
                    <Input
                      name="mailAddress2"
                      value={
                        sameAsResidential
                          ? formData.address2
                          : formData.mailAddress2
                      }
                      onChange={handleChange}
                      placeholder="Apartment/Suite/Building#"
                      isDisabled={sameAsResidential}
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel fontSize="sm">City</FormLabel>
                    <Input
                      name="mailCity"
                      value={
                        sameAsResidential ? formData.city : formData.mailCity
                      }
                      onChange={handleChange}
                      placeholder="City"
                      isDisabled={sameAsResidential}
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel fontSize="sm">State</FormLabel>
                    <Select
                      name="mailState"
                      value={
                        sameAsResidential ? formData.state : formData.mailState
                      }
                      onChange={handleChange}
                      placeholder="Select state"
                      isDisabled={sameAsResidential}
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
                        name="mailZipCode"
                        value={
                          sameAsResidential
                            ? formData.zipCode
                            : formData.mailZipCode
                        }
                        onChange={handleChange}
                        placeholder="Zip Code"
                        maxLength={5}
                        isDisabled={sameAsResidential}
                      />
                      <Text>-</Text>
                      <Input
                        name="mailZipExt"
                        value={
                          sameAsResidential
                            ? formData.zipExt
                            : formData.mailZipExt
                        }
                        onChange={handleChange}
                        placeholder="Extension"
                        maxLength={4}
                        w="100px"
                        isDisabled={sameAsResidential}
                      />
                    </HStack>
                  </FormControl>

                  <FormControl>
                    <FormLabel fontSize="sm">County</FormLabel>
                    <Select
                      name="mailCounty"
                      value={
                        sameAsResidential
                          ? formData.county
                          : formData.mailCounty
                      }
                      onChange={handleChange}
                      placeholder="Select county"
                      isDisabled={sameAsResidential}
                    >
                      <option value="middlesex">Middlesex</option>
                      <option value="suffolk">Suffolk</option>
                      {/* Add more counties as needed */}
                    </Select>
                  </FormControl>
                </SimpleGrid>
              </Box>

              <Divider my={3} borderColor="gray.300" />
            </VStack>

            {/* Right Column - Profile Image */}
            <VStack
              spacing={4}
              align="start"
              gridColumn={{ base: "1", md: "3" }}
              w="100%"
            >
              <Box
                boxSize="200px"
                borderWidth={2}
                borderRadius="lg"
                borderStyle="dashed"
                borderColor="gray.300"
                position="relative"
                overflow="hidden"
                alignSelf="start"
              >
                <Image
                  src={imagePreview}
                  alt="Profile Preview"
                  objectFit="cover"
                  w="100%"
                  h="100%"
                />
              </Box>
              <FormControl>
                <FormLabel fontSize="sm">Profile Image</FormLabel>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  variant="unstyled"
                  p={2}
                />
                <Text fontSize="xs" color="gray.500" mt={2}>
                  (Only JPG/PNG/JPEG/GIF files are allowed)
                </Text>
              </FormControl>
            </VStack>
          </SimpleGrid>

          <HStack justify="center" mt={8} spacing={4}>
            <Button type="submit" colorScheme="blue" size="lg">
              Save Profile
            </Button>
            <Button colorScheme="gray" size="lg">
              Cancel
            </Button>
          </HStack>
        </form>
      </Box>
    </Container>
  );
}
