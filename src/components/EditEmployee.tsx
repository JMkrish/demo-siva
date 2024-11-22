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
} from "@chakra-ui/react";
import { useState } from "react";
import type { Employee } from "./ManageEmployees";

interface EditEmployeeProps {
  employee: Employee;
  onBack: () => void;
}

export function EditEmployee({ employee, onBack }: EditEmployeeProps) {
  const [formData, setFormData] = useState({
    ...employee,
    authorizedForCorpActions: employee.authorizedForCorpActions === "Yes",
  });

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

      {/* Edit Form */}
      <Card>
        <Box p={4} bg="gray.50" borderTopRadius="md">
          <Heading size="md">Update Employee</Heading>
        </Box>
        <CardBody>
          <VStack spacing={6} align="stretch">
            {/* Service Provider */}
            <FormControl>
              <FormLabel>Service Provider</FormLabel>
              <Select isDisabled defaultValue="7">
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
                <Input
                  value={formData.firstName}
                  isDisabled
                  placeholder="First Name"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Middle Name</FormLabel>
                <Input
                  value={formData.middleName}
                  isDisabled
                  placeholder="Middle Name"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Last Name</FormLabel>
                <Input
                  value={formData.lastName}
                  isDisabled
                  placeholder="Last Name"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Suffix</FormLabel>
                <Input
                  value={formData.suffix}
                  isDisabled
                  placeholder="Suffix"
                />
              </FormControl>
            </Flex>

            {/* Title */}
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Title"
              />
            </FormControl>

            {/* Authorization Checkbox */}
            <Box>
              <Checkbox
                isChecked={formData.authorizedForCorpActions}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    authorizedForCorpActions: e.target.checked,
                  })
                }
              >
                Authorized for corporate actions
              </Checkbox>
            </Box>
          </VStack>
        </CardBody>

        {/* Footer Buttons */}
        <Box p={4} borderTop="1px" borderColor="gray.200">
          <ButtonGroup spacing={4}>
            <Button colorScheme="blue">Save Employee</Button>
            <Button colorScheme="red">Terminate Employee</Button>
            <Button colorScheme="gray" onClick={onBack}>
              Cancel
            </Button>
          </ButtonGroup>
        </Box>
      </Card>
    </Container>
  );
}
