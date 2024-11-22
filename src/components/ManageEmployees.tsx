import {
  Container,
  Box,
  VStack,
  Heading,
  Text,
  Button,
  ButtonGroup,
  Alert,
  Card,
  CardBody,
  FormControl,
  FormLabel,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Flex,
} from "@chakra-ui/react";
import { useState } from "react";
import { EditEmployee } from "./EditEmployee";
import { AddEmployee } from "./AddEmployee";

export interface Employee {
  firstName: string;
  middleName: string;
  lastName: string;
  suffix: string;
  title: string;
  accreditedFor: string;
  accreditationNo: string;
  authorizedForCorpActions: string;
}

const mockEmployees: Employee[] = [
  {
    firstName: "Bala",
    middleName: "Subrahma",
    lastName: "Vega",
    suffix: "Mr.",
    title: "Administrator",
    accreditedFor: "",
    accreditationNo: "0",
    authorizedForCorpActions: "Yes",
  },
  {
    firstName: "Frank",
    middleName: "D",
    lastName: "Morr",
    suffix: "",
    title: "Corp Manager",
    accreditedFor: "",
    accreditationNo: "0",
    authorizedForCorpActions: "No",
  },
];

interface ManageEmployeesProps {
  onNavigate?: (view: string) => void;
}

export function ManageEmployees({ onNavigate }: ManageEmployeesProps) {
  const [showEditView, setShowEditView] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );
  const [showAddView, setShowAddView] = useState(false);

  const handleEditClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setShowEditView(true);
  };

  const handleAddClick = () => {
    setShowAddView(true);
  };

  return (
    <Container maxW="6xl" className="transition animated fadeIn">
      {showAddView ? (
        <AddEmployee onBack={() => setShowAddView(false)} />
      ) : showEditView && selectedEmployee ? (
        <EditEmployee
          employee={selectedEmployee}
          onBack={() => {
            setShowEditView(false);
            setSelectedEmployee(null);
          }}
        />
      ) : (
        <>
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
              <Button
                colorScheme="blue"
                onClick={() => onNavigate?.("dashboard")}
              >
                Back
              </Button>
              <Button colorScheme="blue" onClick={handleAddClick}>
                Add Employee
              </Button>
            </ButtonGroup>
            <Alert status="success" variant="subtle">
              &nbsp;
            </Alert>
          </Box>

          {/* Main Content */}
          <Card>
            <CardBody>
              <Heading size="md" mb={4}>
                List of employees
              </Heading>

              {/* Service Provider Selection */}
              <Box mb={6}>
                <Flex maxW="50%">
                  <FormControl>
                    <FormLabel>Service Provider:</FormLabel>
                    <Select defaultValue="7">
                      <option value="7">Silver Spring Associates</option>
                      <option value="27">A & A Lead Inspections</option>
                      <option value="56">ABC Lead Inspections</option>
                      <option value="54">Test Service Provider</option>
                      <option value="64">Serigor Test LLC</option>
                      <option value="66">Test Dev Service Provider LLC</option>
                    </Select>
                  </FormControl>
                </Flex>
              </Box>

              {/* Search Box */}
              <Flex justify="flex-end" mb={4}>
                <Box>
                  <FormControl>
                    <Flex gap={2} align="center">
                      <FormLabel mb={0}>Search:</FormLabel>
                      <Input size="sm" />
                    </Flex>
                  </FormControl>
                </Box>
              </Flex>

              {/* Employees Table */}
              <Box overflowX="auto">
                <Table variant="striped">
                  <Thead>
                    <Tr>
                      <Th>First Name</Th>
                      <Th>Middle Name</Th>
                      <Th>Last Name</Th>
                      <Th>Suffix</Th>
                      <Th>Title</Th>
                      <Th>Accredited For</Th>
                      <Th>Accreditation#</Th>
                      <Th>Authorized For Corp Actions</Th>
                      <Th>Action</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {mockEmployees.map((employee, index) => (
                      <Tr key={index}>
                        <Td>{employee.firstName}</Td>
                        <Td>{employee.middleName}</Td>
                        <Td>{employee.lastName}</Td>
                        <Td>{employee.suffix}</Td>
                        <Td>{employee.title}</Td>
                        <Td>{employee.accreditedFor}</Td>
                        <Td>{employee.accreditationNo}</Td>
                        <Td>{employee.authorizedForCorpActions}</Td>
                        <Td>
                          <Button
                            size="xs"
                            colorScheme="blue"
                            onClick={() => handleEditClick(employee)}
                          >
                            Edit/View
                          </Button>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>

              {/* Pagination */}
              <Flex justify="space-between" align="center" mt={4}>
                <Text>
                  Showing 1 to {mockEmployees.length} of {mockEmployees.length}{" "}
                  entries
                </Text>
                <ButtonGroup>
                  <Button isDisabled>Previous</Button>
                  <Button variant="solid" colorScheme="blue">
                    1
                  </Button>
                  <Button isDisabled>Next</Button>
                </ButtonGroup>
              </Flex>
            </CardBody>
          </Card>
        </>
      )}
    </Container>
  );
}
