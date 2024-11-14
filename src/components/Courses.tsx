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
  InputGroup,
  InputLeftElement,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  FormControl,
  FormLabel,
  Badge,
  Card,
  CardHeader,
  CardBody,
  ButtonGroup,
  Alert,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { coursesData, durationFilters, statusFilters } from "../data/coursesData";
import { useState, useMemo } from "react";
import { myTrainingData } from "../data/myTrainingData";

export function Courses() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("-1");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [currentView, setCurrentView] = useState<"courses" | "training">("courses");

  // Calculate pagination values
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedCourses = coursesData.slice(startIndex, endIndex);
  const totalPages = Math.ceil(coursesData.length / itemsPerPage);

  // Reset handler for filters
  const handleReset = () => {
    setStartDate("");
    setEndDate("");
    setSelectedCourse("-1");
    setCurrentPage(1);
  };

  // Course options matching your reference
  const courseOptions = [
    { value: "-1", label: "Select a course" },
    { value: "1", label: "Visual Inspector (VI) - Initial" },
    { value: "2", label: "Visual Inspector (VI) - Refresher" },
    { value: "3", label: "Inspector Technician (IT) - Refresher" },
    { value: "4", label: "Inspector Technician (IT) - Initial" },
    // ... add all other course options
  ];

  const renderMyTraining = () => (
    <Card>
      <CardHeader>
        <Heading size="md">My Training</Heading>
      </CardHeader>
      <CardBody>
        <Box overflowX="auto">
          <Table variant="striped" borderWidth={1}>
            <Thead>
              <Tr>
                <Th>Training Course Name</Th>
                <Th>Request Status</Th>
                <Th>Training Provider</Th>
                <Th>Start Date</Th>
                <Th>End Date</Th>
                <Th>Training Card #</Th>
                <Th>Card Void Status</Th>
                <Th>Course Result</Th>
                <Th>Expiration Date</Th>
              </Tr>
            </Thead>
            <Tbody>
              {myTrainingData.map((record, index) => (
                <Tr key={index}>
                  <Td>
                    <Text>{record.courseName}</Text>
                  </Td>
                  <Td>
                    <Badge
                      colorScheme={record.requestStatus === "Approved" ? "green" : "yellow"}
                    >
                      {record.requestStatus}
                    </Badge>
                  </Td>
                  <Td>{record.trainingProvider}</Td>
                  <Td>{record.startDate}</Td>
                  <Td>{record.endDate}</Td>
                  <Td>{record.trainingCardNo || ""}</Td>
                  <Td>
                    <Badge
                      colorScheme={record.cardVoidStatus === "Void" ? "red" : "green"}
                    >
                      {record.cardVoidStatus}
                    </Badge>
                  </Td>
                  <Td>{record.courseResult}</Td>
                  <Td>{record.expirationDate || ""}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>

        {/* Pagination for My Training */}
        <Flex justify="space-between" mt={4} align="center">
          <Text>
            Showing 1 to 10 of {myTrainingData.length} entries
          </Text>
          <ButtonGroup>
            <Button>Previous</Button>
            <Button variant="outline">1</Button>
            <Button variant="outline">2</Button>
            <Button variant="outline">3</Button>
            <Button variant="outline">4</Button>
            <Button>Next</Button>
          </ButtonGroup>
        </Flex>
      </CardBody>
    </Card>
  );

  return (
    <Container maxW="6xl" className="transition animated fadeIn">
      {/* Header Panel */}
      <Card mb={6}>
        <CardBody>
          <Heading as="h2" size="lg" color="red.700" mb={2}>
            TRAINING COURSES
          </Heading>
          <Text fontSize="sm" color="gray.600">
            View and Register various training courses being offered by the LPPP accredited training providers. 
            Trainee must coordinate and confirm directly with the training provider after registration via this portal.
          </Text>
        </CardBody>
      </Card>

      {/* Action Buttons and Alert */}
      <Box mb={6}>
        <ButtonGroup spacing={4} mb={4}>
          <Button
            colorScheme={currentView === "courses" ? "red" : "blue"}
            variant="solid"
            onClick={() => setCurrentView("courses")}
          >
            Courses
          </Button>
          <Button
            colorScheme={currentView === "training" ? "red" : "blue"}
            onClick={() => setCurrentView("training")}
          >
            My Training
          </Button>
        </ButtonGroup>
        <Alert status="success" variant="subtle">
          &nbsp;
        </Alert>
      </Box>

      {/* Conditional Content */}
      {currentView === "courses" ? (
        // Existing Courses Content
        <Card>
          <CardHeader>
            <Heading size="md">List of courses</Heading>
          </CardHeader>
          <CardBody>
            {/* Search Filters */}
            <Flex direction={{ base: "column", md: "row" }} gap={6} mb={6}>
              <FormControl>
                <FormLabel>From Date</FormLabel>
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  placeholder="Start Date"
                />
              </FormControl>

              <FormControl>
                <FormLabel>To Date</FormLabel>
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  placeholder="End Date"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Course</FormLabel>
                <Select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                >
                  {courseOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>&nbsp;</FormLabel>
                <ButtonGroup spacing={4}>
                  <Button colorScheme="blue">Search</Button>
                  <Button variant="outline">Reset</Button>
                </ButtonGroup>
              </FormControl>
            </Flex>

            <Text fontWeight="bold" mb={4}>*Please contact the Training Provider to confirm the price</Text>

            {/* Courses Table */}
            <Box overflowX="auto">
              <Table variant="striped" borderWidth={1}>
                <Thead>
                  <Tr>
                    <Th>Course Name</Th>
                    <Th>Training Provider</Th>
                    <Th>*Price</Th>
                    <Th>Start Date</Th>
                    <Th>End Date</Th>
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {paginatedCourses.map((course, index) => (
                    <Tr key={course.id}>
                      <Td>
                        <Text>{course.name}</Text>
                      </Td>
                      <Td>
                        <VStack align="stretch" spacing={1}>
                          <Text fontWeight="bold">ABC Lead Associates</Text>
                          <Text><strong>Physical Location: </strong>{course.location}</Text>
                          <Text color="red.700"><strong>Session Type: </strong>Online</Text>
                          <Text><strong>Phone: </strong>{course.phone}</Text>
                          <Text><strong>Email Address: </strong>{course.email}</Text>
                        </VStack>
                      </Td>
                      <Td>{course.price || "-"}</Td>
                      <Td>{course.startDate}</Td>
                      <Td>{course.endDate}</Td>
                      <Td>
                        <Button
                          size="sm"
                          colorScheme="blue"
                          isDisabled={course.status === "Full"}
                        >
                          Send Request
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>

            {/* Pagination */}
            <Flex justify="space-between" mt={4} align="center">
              <Text>
                Showing {startIndex + 1} to {Math.min(endIndex, coursesData.length)} of {coursesData.length} entries
              </Text>
              <ButtonGroup>
                <Button
                  onClick={() => setCurrentPage(prev => prev - 1)}
                  isDisabled={currentPage === 1}
                >
                  Previous
                </Button>
                <Button
                  isDisabled
                  variant="outline"
                >
                  {currentPage}
                </Button>
                <Button
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  isDisabled={currentPage >= totalPages}
                >
                  Next
                </Button>
              </ButtonGroup>
            </Flex>
          </CardBody>
        </Card>
      ) : (
        // My Training Content
        renderMyTraining()
      )}
    </Container>
  );
}
