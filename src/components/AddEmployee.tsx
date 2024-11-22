import {
  Container,
  VStack,
  Heading,
  Text,
  Box,
  Button,
  ButtonGroup,
  Alert,
  Card,
  CardBody,
  FormControl,
  FormLabel,
  Select,
  Input,
  Checkbox,
  Flex,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";

interface AddEmployeeProps {
  onBack: () => void;
}

export function AddEmployee({ onBack }: AddEmployeeProps) {
  return (
    <Container maxW="6xl" className="transition animated fadeIn">
      {/* Header Panel */}
      <Card mb={6}>
        <CardBody>
          <Heading as="h2" size="lg" color="red.700" mb={2}>
            Manage Employee
          </Heading>
          <Text fontSize="sm" color="gray.600">
            View, Add and Update Employee
          </Text>
        </CardBody>
      </Card>

      {/* Action Buttons */}
      <Box mb={6}>
        <ButtonGroup spacing={4} mb={4}>
          <Button colorScheme="blue" onClick={onBack}>
            Back
          </Button>
        </ButtonGroup>
        <Alert status="success" variant="subtle">
          &nbsp;
        </Alert>
      </Box>

      {/* Add Form */}
      <Card>
        <Box p={4} bg="gray.50" borderTopRadius="md">
          <Heading size="md">Add Employee</Heading>
        </Box>
        <CardBody>
          <VStack spacing={6} align="stretch">
            {/* Instructions */}
            <Box>
              <Heading as="h5" size="sm" mb={2}>
                Instructions
              </Heading>
              <UnorderedList spacing={2}>
                <ListItem>
                  Search using Accreditation number or Email Address.
                </ListItem>
                <ListItem>Click Search.</ListItem>
                <ListItem>
                  Please select the service provider and Title to save the
                  employee.
                </ListItem>
              </UnorderedList>
            </Box>

            {/* Search Fields */}
            <Flex direction={{ base: "column", md: "row" }} gap={6}>
              <FormControl>
                <FormLabel>Accreditation#</FormLabel>
                <Input placeholder="Accreditation Number" />
              </FormControl>

              <FormControl>
                <FormLabel>Email Address</FormLabel>
                <Input placeholder="Email Address" />
              </FormControl>

              <FormControl>
                <FormLabel>&nbsp;</FormLabel>
                <Button colorScheme="blue">Search</Button>
              </FormControl>
            </Flex>

            {/* Service Provider */}
            <FormControl>
              <FormLabel>Service Provider</FormLabel>
              <Select defaultValue="-1">
                <option value="-1">Select a provider</option>
                <option value="7">Silver Spring Associates</option>
                <option value="27">A & A Lead Inspections</option>
                <option value="56">ABC Lead Inspections</option>
                <option value="54">Test Service Provider</option>
                <option value="64">Serigor Test LLC</option>
                <option value="66">Test Dev Service Provider LLC</option>
              </Select>
            </FormControl>

            {/* Personal Information */}
            <Flex direction={{ base: "column", md: "row" }} gap={6}>
              <FormControl>
                <FormLabel>First Name</FormLabel>
                <Input isDisabled placeholder="First Name" />
              </FormControl>

              <FormControl>
                <FormLabel>Middle Name</FormLabel>
                <Input isDisabled placeholder="Middle Name" />
              </FormControl>

              <FormControl>
                <FormLabel>Last Name</FormLabel>
                <Input isDisabled placeholder="Last Name" />
              </FormControl>

              <FormControl>
                <FormLabel>Suffix</FormLabel>
                <Input isDisabled placeholder="Suffix" />
              </FormControl>
            </Flex>

            {/* Title */}
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input placeholder="Title" />
            </FormControl>

            {/* Authorization Checkbox */}
            <Box>
              <Checkbox>Authorized for corporate actions</Checkbox>
            </Box>
          </VStack>
        </CardBody>

        {/* Footer Buttons */}
        <Box p={4} borderTop="1px" borderColor="gray.200">
          <ButtonGroup spacing={4}>
            <Button colorScheme="blue">Save Employee</Button>
            <Button colorScheme="gray" onClick={onBack}>
              Cancel
            </Button>
          </ButtonGroup>
        </Box>
      </Card>
    </Container>
  );
}
