import {
  Container,
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Text,
  VStack,
  HStack,
  Button,
  Input,
  Select,
  InputGroup,
  InputLeftElement,
  Flex,
  SimpleGrid,
} from "@chakra-ui/react";
import {
  SearchIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import {
  coursesData,
  durationFilters,
  statusFilters,
} from "../data/coursesData";
import type { Course } from "../data/coursesData";
import { useState, useMemo } from "react";

export function Courses() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [durationFilter, setDurationFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5; // Number of rows to show per page

  // Filter courses based on search query and filters
  const filteredCourses = useMemo(() => {
    return coursesData.filter((course) => {
      // Search filter
      const searchMatch =
        course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchQuery.toLowerCase());

      // Status filter
      const statusMatch =
        statusFilter === "all" ||
        course.status.toLowerCase() === statusFilter.toLowerCase();

      // Duration filter
      let durationMatch = true;
      if (durationFilter !== "all") {
        const weeks = parseInt(course.duration);
        switch (durationFilter) {
          case "short":
            durationMatch = weeks >= 8 && weeks <= 10;
            break;
          case "medium":
            durationMatch = weeks >= 11 && weeks <= 14;
            break;
          case "long":
            durationMatch = weeks >= 15;
            break;
        }
      }

      return searchMatch && statusMatch && durationMatch;
    });
  }, [searchQuery, statusFilter, durationFilter]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredCourses.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedCourses = filteredCourses.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  // Handle page navigation
  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <Box w="100%" overflowX="hidden">
      <Container maxW="6xl" py={8} px={{ base: 2, md: 4, lg: 8 }}>
        <VStack spacing={8} align="stretch">
          {/* Header Section */}
          <Box>
            <Heading size="lg" mb={2}>
              Available Courses
            </Heading>
            <Text color="gray.600">
              Browse and register for our available training courses
            </Text>
          </Box>

          {/* Search and Filter Section */}
          <VStack spacing={4} align="stretch">
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
              <InputGroup>
                <InputLeftElement>
                  <SearchIcon color="gray.500" />
                </InputLeftElement>
                <Input
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </InputGroup>
              <Select
                placeholder="Filter by Status"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                {statusFilters.map((filter) => (
                  <option key={filter.value} value={filter.value}>
                    {filter.label}
                  </option>
                ))}
              </Select>

              <Select
                placeholder="Duration"
                value={durationFilter}
                onChange={(e) => setDurationFilter(e.target.value)}
              >
                {durationFilters.map((filter) => (
                  <option key={filter.value} value={filter.value}>
                    {filter.label}
                  </option>
                ))}
              </Select>
            </SimpleGrid>
          </VStack>

          {/* Courses Table */}
          <Box overflowX="auto" mx={-4} px={4}>
            <Table
              variant="simple"
              borderWidth={1}
              borderRadius="lg"
              size={{ base: "sm", md: "md" }}
            >
              <Thead bg="gray.50">
                <Tr>
                  <Th>ID</Th>
                  <Th>Course</Th>
                  <Th display={{ base: "none", md: "table-cell" }}>
                    Instructor
                  </Th>
                  <Th display={{ base: "none", lg: "table-cell" }}>Schedule</Th>
                  <Th display={{ base: "none", md: "table-cell" }}>Duration</Th>
                  <Th>Status</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {paginatedCourses.length > 0 ? (
                  paginatedCourses.map((course) => (
                    <Tr key={course.id}>
                      <Td fontWeight="medium">{course.id}</Td>
                      <Td>
                        <VStack align="start" spacing={1}>
                          <Text>{course.name}</Text>
                          <Text
                            display={{ base: "block", md: "none" }}
                            fontSize="sm"
                            color="gray.600"
                          >
                            {course.instructor}
                          </Text>
                        </VStack>
                      </Td>
                      <Td display={{ base: "none", md: "table-cell" }}>
                        {course.instructor}
                      </Td>
                      <Td display={{ base: "none", lg: "table-cell" }}>
                        {course.schedule}
                      </Td>
                      <Td display={{ base: "none", md: "table-cell" }}>
                        {course.duration}
                      </Td>
                      <Td>
                        <Badge
                          colorScheme={
                            course.status === "Open" ? "green" : "red"
                          }
                          borderRadius="full"
                          px={2}
                        >
                          {course.status}
                        </Badge>
                      </Td>
                      <Td>
                        <Button
                          size="sm"
                          colorScheme="blue"
                          isDisabled={course.status === "Full"}
                        >
                          Register
                        </Button>
                      </Td>
                    </Tr>
                  ))
                ) : (
                  <Tr>
                    <Td colSpan={7} textAlign="center" py={4}>
                      <Text color="gray.500">
                        No courses found matching your criteria
                      </Text>
                    </Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
          </Box>

          {/* Pagination Controls */}
          {filteredCourses.length > 0 && (
            <VStack spacing={4} align="stretch">
              <Flex
                direction={{ base: "column", md: "row" }}
                justify="space-between"
                align={{ base: "center", md: "center" }}
                gap={4}
              >
                <Text
                  color="gray.600"
                  textAlign={{ base: "center", md: "left" }}
                >
                  Showing {startIndex + 1} to{" "}
                  {Math.min(startIndex + rowsPerPage, filteredCourses.length)}{" "}
                  of {filteredCourses.length} courses
                </Text>
                <HStack spacing={2} justify="center">
                  <Button
                    leftIcon={<ChevronLeftIcon />}
                    onClick={handlePreviousPage}
                    isDisabled={currentPage === 1}
                    size="sm"
                  >
                    Previous
                  </Button>
                  <Text color="gray.600">
                    Page {currentPage} of {totalPages}
                  </Text>
                  <Button
                    rightIcon={<ChevronRightIcon />}
                    onClick={handleNextPage}
                    isDisabled={currentPage === totalPages}
                    size="sm"
                  >
                    Next
                  </Button>
                </HStack>
              </Flex>
            </VStack>
          )}

          {/* Info Section */}
          <Box bg="blue.50" p={4} borderRadius="md">
            <Text fontSize="sm" color="blue.800">
              <strong>Note:</strong> Course registration is subject to
              availability and eligibility requirements. Please review course
              details carefully before registering.
            </Text>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}
