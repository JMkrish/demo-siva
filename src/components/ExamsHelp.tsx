import {
  Container,
  VStack,
  Heading,
  Box,
  Card,
  CardHeader,
  CardBody,
  Text,
  Link,
  Center,
} from "@chakra-ui/react";

export function ExamsHelp() {
  return (
    <Container maxW="6xl" className="section-content">
      {/* Title Section */}
      <Center mb={8}>
        <Box className="section-title" pt={1}>
          <Heading
            as="h2"
            size="xl"
            className="main-title"
            textAlign="center"
            color="blue.700"
          >
            3RD PARTY / INSTRUCTOR EXAM
          </Heading>
        </Box>
      </Center>

      {/* Content Section */}
      <VStack spacing={6} align="stretch">
        <Box className="container">
          <Card variant="outline">
            <CardHeader>
              <Heading as="h4" size="md" fontWeight="bold" mb={4}>
                Topic
              </Heading>
            </CardHeader>
            <CardBody>
              <Box className="panel panel-default">
                <Box
                  className="panel-heading"
                  p={4}
                  bg="gray.50"
                  borderRadius="md"
                >
                  <Heading as="h4" size="md" className="panel-title">
                    <Link
                      href="#"
                      color="blue.600"
                      _hover={{ color: "blue.800", textDecoration: "none" }}
                      title="View"
                      id="LRCAManageExams"
                    >
                      Schedule, and manage exams.
                    </Link>
                  </Heading>
                </Box>
                <Box p={4}>
                  <Text>This section allows you to:</Text>
                  <VStack align="stretch" pl={4} spacing={2} mt={2}>
                    <Text>• Schedule new exams</Text>
                    <Text>• View scheduled exams</Text>
                    <Text>• Manage exam registrations</Text>
                    <Text>• Update exam details</Text>
                  </VStack>
                </Box>
              </Box>
            </CardBody>
          </Card>
        </Box>
      </VStack>
    </Container>
  );
} 