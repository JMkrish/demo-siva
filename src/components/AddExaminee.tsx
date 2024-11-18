import {
  Container,
  VStack,
  Heading,
  Text,
  Box,
  Flex,
  Button,
  Input,
  FormControl,
  FormLabel,
  Card,
  CardBody,
  ButtonGroup,
  Alert,
  Table,
  Tbody,
  Tr,
  Td,
  FormErrorMessage,
  CardHeader,
} from "@chakra-ui/react";
import { useState } from "react";
import type { Exam } from "../data/examsData";

interface AddExamineeProps {
  exam: Exam;
  onBack: () => void;
}

export function AddExaminee({ exam, onBack }: AddExamineeProps) {
  const [searchForm, setSearchForm] = useState({
    lastName: "",
    firstName: "",
    dateOfBirth: "",
    email: "",
  });

  const [searchResults, setSearchResults] = useState<any[]>([]);

  return (
    <Container maxW="6xl" className="transition animated fadeIn">
      {/* Header Panel */}
      <Card mb={6}>
        <CardBody>
          <Heading as="h2" size="lg" color="red.700" mb={2}>
            Users Registered for the Exam
          </Heading>
        </CardBody>
      </Card>

      {/* Action Buttons */}
      <Box mb={6}>
        <ButtonGroup spacing={4} mb={4}>
          <Button colorScheme="blue" onClick={onBack}>
            Back
          </Button>
          <Button colorScheme="blue">
            Registrations
          </Button>
          <Button colorScheme="red">
            Add Examinee
          </Button>
        </ButtonGroup>
        <Alert status="success" variant="subtle">
          &nbsp;
        </Alert>
      </Box>

      {/* Selected Exam Details */}
      <Card mb={6}>
        <CardBody>
          <Heading as="h5" size="sm" color="red.700" mb={4}>
            Selected Exam Details:
          </Heading>
          <Box overflowX="auto">
            <Table variant="striped">
              <Tbody>
                <Tr>
                  <Td fontWeight="bold" width="200px">Exam Category:</Td>
                  <Td>{exam.category}</Td>
                </Tr>
                <Tr>
                  <Td fontWeight="bold">Exam Date:</Td>
                  <Td>{exam.examDate}</Td>
                </Tr>
                <Tr>
                  <Td fontWeight="bold">Start Time:</Td>
                  <Td>{exam.startTime}</Td>
                </Tr>
                <Tr>
                  <Td fontWeight="bold">Location:</Td>
                  <Td>{exam.location}</Td>
                </Tr>
              </Tbody>
            </Table>
          </Box>
        </CardBody>
      </Card>

      {/* Search User Details */}
      <Card mb={6}>
        <CardHeader>
          <Heading size="md">Search User Details</Heading>
        </CardHeader>
        <CardBody>
          <VStack spacing={6} align="stretch">
            <Flex direction={{ base: "column", md: "row" }} gap={6}>
              <FormControl>
                <FormLabel>User Last Name</FormLabel>
                <Input
                  placeholder="User Last Name"
                  value={searchForm.lastName}
                  onChange={(e) => setSearchForm({ ...searchForm, lastName: e.target.value })}
                />
              </FormControl>

              <FormControl>
                <FormLabel>User First Name</FormLabel>
                <Input
                  placeholder="User First Name"
                  value={searchForm.firstName}
                  onChange={(e) => setSearchForm({ ...searchForm, firstName: e.target.value })}
                />
              </FormControl>
            </Flex>

            <Flex direction={{ base: "column", md: "row" }} gap={6}>
              <FormControl>
                <FormLabel>User Date of Birth</FormLabel>
                <Input
                  placeholder="MM/DD/YYYY"
                  value={searchForm.dateOfBirth}
                  onChange={(e) => setSearchForm({ ...searchForm, dateOfBirth: e.target.value })}
                />
                <FormErrorMessage>Invalid Date Format (MM/DD/YYYY)</FormErrorMessage>
              </FormControl>

              <FormControl>
                <FormLabel>User EmailID</FormLabel>
                <Input
                  type="email"
                  placeholder="EmailID"
                  value={searchForm.email}
                  onChange={(e) => setSearchForm({ ...searchForm, email: e.target.value })}
                />
                <FormErrorMessage>Please enter valid Email</FormErrorMessage>
              </FormControl>
            </Flex>

            <Text color="gray.600" fontSize="sm">
              Note: Please provide any of one user details such as User Last Name, User First Name, 
              User Date of Birth or User EmailID.
            </Text>

            <Box>
              <Button colorScheme="green">
                Search
              </Button>
            </Box>
          </VStack>
        </CardBody>
      </Card>

      {/* User Results */}
      <Card>
        <CardHeader>
          <Heading size="md">User Results</Heading>
        </CardHeader>
        <CardBody>
          <Box overflowX="auto">
            {searchResults.length > 0 ? (
              <Table variant="striped">
                {/* Add table content when needed */}
              </Table>
            ) : (
              <Text textAlign="center" py={4}>No results found</Text>
            )}
          </Box>
          <Box mt={6}>
            <Button
              colorScheme="green"
              isDisabled={searchResults.length === 0}
            >
              Add Examinee
            </Button>
          </Box>
        </CardBody>
      </Card>
    </Container>
  );
} 