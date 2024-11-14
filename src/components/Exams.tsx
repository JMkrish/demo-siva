import {
  Container,
  VStack,
  Heading,
  Text,
  Box,
  Flex,
  Button,
  Input,
  Select,
  FormControl,
  FormLabel,
  Card,
  CardBody,
  ButtonGroup,
  Alert,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  NumberInput,
  NumberInputField,
  FormErrorMessage,
  CardHeader,
} from "@chakra-ui/react";
import { EditIcon, ViewIcon } from "@chakra-ui/icons";
import { examCategories, scheduledExams } from "../data/examsData";
import { pastExams } from "../data/pastExamsData";
import { useState } from "react";

export function Exams() {
  const [currentView, setCurrentView] = useState<"schedule" | "past">("schedule");
  const [formData, setFormData] = useState({
    category: "NA",
    examDate: "",
    startTime: "09:30 AM",
    location: "1800 Washington Boulevard, Baltimore, MD 21230",
    duration: "2",
    examFees: "",
    registrationLimit: "10"
  });

  const renderPastExams = () => (
    <Card>
      <CardHeader>
        <Heading size="md">Past Exams</Heading>
      </CardHeader>
      <CardBody>
        <Box overflowX="auto">
          <Table variant="striped">
            <Thead>
              <Tr>
                <Th>Exam Category</Th>
                <Th>Exam Date</Th>
                <Th>Start Time</Th>
                <Th>Location</Th>
                <Th>Duration</Th>
                <Th>Registration Limit</Th>
                <Th>Registrations</Th>
              </Tr>
            </Thead>
            <Tbody>
              {pastExams.map((exam) => (
                <Tr key={exam.id}>
                  <Td width="15%" whiteSpace="nowrap">{exam.category}</Td>
                  <Td width="10%" whiteSpace="nowrap">{exam.examDate}</Td>
                  <Td width="10%" whiteSpace="nowrap">{exam.startTime}</Td>
                  <Td width="10%" whiteSpace="nowrap">{exam.location}</Td>
                  <Td width="10%" whiteSpace="nowrap">{exam.duration}</Td>
                  <Td width="10%" whiteSpace="nowrap">{exam.registrationLimit}</Td>
                  <Td width="5%" whiteSpace="nowrap">
                    <Button
                      size="sm"
                      colorScheme="blue"
                      borderRadius="full"
                      title="View Registrations"
                    >
                      {exam.registrations}
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>

          {/* Pagination */}
          <Flex justify="space-between" mt={4} align="center">
            <Text>
              Showing 1 to 10 of {pastExams.length} entries
            </Text>
            <ButtonGroup>
              <Button isDisabled>Previous</Button>
              <Button variant="solid" colorScheme="blue">1</Button>
              <Button variant="outline">2</Button>
              <Button variant="outline">3</Button>
              <Button variant="outline">4</Button>
              <Button variant="outline">5</Button>
              <Button isDisabled>...</Button>
              <Button variant="outline">9</Button>
              <Button>Next</Button>
            </ButtonGroup>
          </Flex>
        </Box>
      </CardBody>
    </Card>
  );

  return (
    <Container maxW="6xl" className="transition animated fadeIn">
      {/* Header Panel */}
      <Card mb={6}>
        <CardBody>
          <Heading as="h2" size="lg" color="red.700" mb={2}>
            3RD PARTY / INSTRUCTOR EXAM
          </Heading>
          <Text fontSize="sm" color="gray.600">
            Schedule and update exam results
          </Text>
        </CardBody>
      </Card>

      {/* Action Buttons and Alert */}
      <Box mb={6}>
        <ButtonGroup spacing={4} mb={4}>
          <Button
            colorScheme={currentView === "schedule" ? "red" : "blue"}
            onClick={() => setCurrentView("schedule")}
          >
            Schedule Exams
          </Button>
          <Button
            colorScheme={currentView === "past" ? "red" : "blue"}
            onClick={() => setCurrentView("past")}
          >
            Past Exams
          </Button>
        </ButtonGroup>
        <Alert status="success" variant="subtle">
          &nbsp;
        </Alert>
      </Box>

      {/* Conditional Content */}
      {currentView === "schedule" ? (
        // Existing Schedule Form and Table
        <>
          {/* Schedule Form */}
          <Card mb={6}>
            <CardBody>
              <VStack spacing={6} align="stretch">
                <Flex direction={{ base: "column", md: "row" }} gap={6}>
                  <FormControl isRequired>
                    <FormLabel>Exam Category</FormLabel>
                    <Select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                      {examCategories.map(cat => (
                        <option key={cat.value} value={cat.value}>
                          {cat.label}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                </Flex>

                <Flex direction={{ base: "column", md: "row" }} gap={6}>
                  <FormControl isRequired>
                    <FormLabel>Exam Date</FormLabel>
                    <Input
                      type="date"
                      value={formData.examDate}
                      onChange={(e) => setFormData({ ...formData, examDate: e.target.value })}
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Start Time</FormLabel>
                    <Input
                      type="time"
                      value={formData.startTime}
                      onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Location</FormLabel>
                    <Input
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />
                  </FormControl>
                </Flex>

                <Flex direction={{ base: "column", md: "row" }} gap={6}>
                  <FormControl isRequired>
                    <FormLabel>Duration (Hours)</FormLabel>
                    <NumberInput min={1} max={8} value={formData.duration}>
                      <NumberInputField
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      />
                    </NumberInput>
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Exam Fees ($)</FormLabel>
                    <NumberInput min={0}>
                      <NumberInputField
                        value={formData.examFees}
                        onChange={(e) => setFormData({ ...formData, examFees: e.target.value })}
                      />
                    </NumberInput>
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Registration Limit</FormLabel>
                    <NumberInput min={1} value={formData.registrationLimit}>
                      <NumberInputField
                        onChange={(e) => setFormData({ ...formData, registrationLimit: e.target.value })}
                      />
                    </NumberInput>
                  </FormControl>
                </Flex>

                <Box>
                  <Button colorScheme="green" mr={3}>
                    Schedule
                  </Button>
                  <Button variant="outline">
                    Cancel
                  </Button>
                </Box>
              </VStack>
            </CardBody>
          </Card>

          {/* Scheduled Exams Table */}
          <Card>
            <CardBody>
              <Heading size="md" mb={4}>Scheduled Exams</Heading>
              <Text mb={4} color="gray.600">Note: May edit up to 90 days from Exam Date.</Text>

              <Box overflowX="auto">
                <Table variant="striped">
                  <Thead>
                    <Tr>
                      <Th></Th>
                      <Th>Exam Category</Th>
                      <Th>Exam Date</Th>
                      <Th>Start Time</Th>
                      <Th>Location</Th>
                      <Th>Duration</Th>
                      <Th>Registration Limit</Th>
                      <Th>Registrations</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {scheduledExams.map((exam) => (
                      <Tr key={exam.id}>
                        <Td>
                          <IconButton
                            aria-label="Edit exam"
                            icon={<EditIcon />}
                            size="sm"
                            colorScheme="blue"
                            variant="outline"
                          />
                        </Td>
                        <Td>{exam.category}</Td>
                        <Td>{exam.examDate}</Td>
                        <Td>{exam.startTime}</Td>
                        <Td>{exam.location}</Td>
                        <Td>{exam.duration}</Td>
                        <Td>{exam.registrationLimit}</Td>
                        <Td>
                          <Button
                            size="sm"
                            leftIcon={<ViewIcon />}
                            colorScheme="blue"
                          >
                            {exam.registrations}
                          </Button>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>
            </CardBody>
          </Card>
        </>
      ) : (
        // Past Exams Content
        renderPastExams()
      )}
    </Container>
  );
} 