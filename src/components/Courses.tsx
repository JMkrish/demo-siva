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
  useBreakpointValue,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
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
  const itemsPerPage = useBreakpointValue({ base: 5, md: 8 }) || 5;

  const filteredCourses = useMemo(() => {
    const searchTerm = searchQuery.trim().toLowerCase();

    return coursesData.filter((course) => {
      const searchMatches =
        searchTerm === "" ||
        [course.name, course.instructor, course.id, course.schedule].some(
          (field) => field.toLowerCase().includes(searchTerm)
        );

      const matchesStatus =
        statusFilter === "all" ||
        course.status.toLowerCase() === statusFilter.toLowerCase();

      const matchesDuration =
        durationFilter === "all" ||
        (durationFilter === "short" && parseInt(course.duration) <= 10) ||
        (durationFilter === "medium" &&
          parseInt(course.duration) > 10 &&
          parseInt(course.duration) <= 14) ||
        (durationFilter === "long" && parseInt(course.duration) > 14);

      return searchMatches && matchesStatus && matchesDuration;
    });
  }, [searchQuery, statusFilter, durationFilter]);

  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
  const currentCourses = filteredCourses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Container maxW="6xl" overflow="hidden">
      <VStack spacing={6} align="stretch" overflow="hidden">
        <Heading as="h2" size="lg">
          Available Courses
        </Heading>

        {/* Filters Section */}
        <Flex direction={{ base: "column", md: "row" }} gap={4} mb={6}>
          <InputGroup maxW={{ base: "100%" }}>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.300" />
            </InputLeftElement>
            <Input
              placeholder="Search by course name, instructor, ID..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
          </InputGroup>

          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            maxW={{ base: "100%" }}
          >
            {statusFilters.map((filter) => (
              <option key={filter.value} value={filter.value}>
                {filter.label}
              </option>
            ))}
          </Select>

          <Select
            value={durationFilter}
            onChange={(e) => setDurationFilter(e.target.value)}
            maxW={{ base: "100%" }}
          >
            {durationFilters.map((filter) => (
              <option key={filter.value} value={filter.value}>
                {filter.label}
              </option>
            ))}
          </Select>
        </Flex>

        {/* No Results Message */}
        {filteredCourses.length === 0 && (
          <Box textAlign="center" py={8}>
            <Text color="gray.600">
              No courses found matching your search criteria.
            </Text>
          </Box>
        )}

        {/* Courses Table - only show if there are results */}
        {filteredCourses.length > 0 && (
          <Box overflowX="hidden" width="100%">
            <Table
              variant="striped"
              borderWidth={1}
              size={{ base: "sm", md: "md" }}
            >
              <Thead>
                <Tr>
                  <Th>Course Name</Th>
                  <Th display={{ base: "none", md: "table-cell" }}>
                    Instructor
                  </Th>
                  <Th display={{ base: "none", md: "table-cell" }}>Schedule</Th>
                  <Th>Duration</Th>
                  <Th>Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                {currentCourses.map((course) => (
                  <Tr key={course.id}>
                    <Td>
                      <VStack align="start" spacing={1}>
                        <Text fontWeight="medium">{course.name}</Text>
                        <Text
                          fontSize="sm"
                          color="gray.600"
                          display={{ base: "block", md: "none" }}
                        >
                          {course.instructor}
                        </Text>
                      </VStack>
                    </Td>
                    <Td display={{ base: "none", md: "table-cell" }}>
                      {course.instructor}
                    </Td>
                    <Td display={{ base: "none", md: "table-cell" }}>
                      {course.schedule}
                    </Td>
                    <Td>{course.duration}</Td>
                    <Td>
                      <Badge
                        colorScheme={course.status === "Open" ? "green" : "red"}
                        borderRadius="full"
                        px={2}
                      >
                        {course.status}
                      </Badge>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        )}

        {/* Pagination - only show if there are results */}
        {filteredCourses.length > 0 && (
          <Flex justify="center" mt={4}>
            <HStack>
              <Button
                size="sm"
                onClick={() => setCurrentPage(currentPage - 1)}
                isDisabled={currentPage === 1}
              >
                Previous
              </Button>
              <Text>
                Page {currentPage} of {totalPages}
              </Text>
              <Button
                size="sm"
                onClick={() => setCurrentPage(currentPage + 1)}
                isDisabled={currentPage === totalPages}
              >
                Next
              </Button>
            </HStack>
          </Flex>
        )}
      </VStack>
    </Container>
  );
}
