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

export function TrainingCoursesHelp() {
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
            Training Courses
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
                      id="LRCARegisterTrainingcourses"
                    >
                      View & Request to register for Training courses and view
                      my Training.
                    </Link>
                  </Heading>
                </Box>
                <Box p={4}>
                  <Text>This section allows you to:</Text>
                  <VStack align="stretch" pl={4} spacing={2} mt={2}>
                    <Text>• Browse available training courses</Text>
                    <Text>• Submit registration requests for courses</Text>
                    <Text>• View your current and completed training</Text>
                    <Text>• Check course schedules and availability</Text>
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
