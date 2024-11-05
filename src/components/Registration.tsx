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
} from "@chakra-ui/react";
import { useState } from "react";
import { PhoneIcon, EmailIcon, AddIcon } from '@chakra-ui/icons';
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
  });

  const [sameAsResidential, setSameAsResidential] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [imagePreview, setImagePreview] = useState(defaultAvatar);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.match(/image\/(jpeg|jpg|png|gif)/)) {
        setFormData(prev => ({ ...prev, profileImage: file }));
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
      setFormData(prev => ({
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
    <Container maxW="1280px" py={8}>
      <VStack spacing={4} mb={8}>
        <Heading as="h2" size="lg" textAlign="center">
          Personal Profile
        </Heading>
        <Text color="red.500" fontWeight="bold">
          Name, DOB, Gender and email address cannot be changed after creating the profile except by Admin.
        </Text>
      </VStack>

      <Box maxW="6xl" mx="auto" borderWidth={1} borderRadius="lg" p={8}>
        <form onSubmit={handleSubmit}>
          <SimpleGrid 
            columns={{ base: 1, md: 3 }}
            spacing={8}
          >
            {/* Left Column - Form Fields */}
            <VStack 
              spacing={6} 
              align="stretch"
              gridColumn={{ base: "1", md: "span 2" }}
            >
              <Heading as="h3" size="md">Personal Information</Heading>
              
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                <FormControl isRequired isInvalid={!!errors.firstName}>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter first name"
                  />
                  {errors.firstName && (
                    <Text color="red.500" fontSize="sm">{errors.firstName}</Text>
                  )}
                </FormControl>

                <FormControl>
                  <FormLabel>Middle Name</FormLabel>
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
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Enter last name"
                  />
                  {errors.lastName && (
                    <Text color="red.500" fontSize="sm">{errors.lastName}</Text>
                  )}
                </FormControl>

                <FormControl>
                  <FormLabel>Suffix</FormLabel>
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
                  <FormLabel>Date of Birth (MM/DD/YYYY)</FormLabel>
                  <Input
                    name="dob"
                    type="date"
                    value={formData.dob}
                    onChange={handleChange}
                  />
                  {errors.dob && (
                    <Text color="red.500" fontSize="sm">{errors.dob}</Text>
                  )}
                </FormControl>

                <FormControl isRequired isInvalid={!!errors.gender}>
                  <FormLabel>Gender</FormLabel>
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
                    <Text color="red.500" fontSize="sm">{errors.gender}</Text>
                  )}
                </FormControl>
              </SimpleGrid>

              <FormControl isRequired isInvalid={!!errors.email}>
                <FormLabel>Email</FormLabel>
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
                  <Text color="red.500" fontSize="sm">{errors.email}</Text>
                )}
              </FormControl>

              <FormControl>
                <FormLabel>Phone Number</FormLabel>
                <InputGroup>
                  <InputLeftElement children={<PhoneIcon />} />
                  <Input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                  />
                </InputGroup>
              </FormControl>

              {/* Residential Address Section */}
              <Heading as="h3" size="md" mt={6}>Residential Address</Heading>
              {/* Add residential address fields here */}

              {/* Mailing Address Section */}
              <Heading as="h3" size="md" mt={6}>
                Mailing Address
                <Checkbox ml={4} onChange={handleSameAddress}>
                  Same as residential address
                </Checkbox>
              </Heading>
              {/* Add mailing address fields here */}
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
                <FormLabel>Profile Image</FormLabel>
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