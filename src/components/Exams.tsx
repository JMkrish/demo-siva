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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import { EditIcon, ViewIcon, WarningIcon, CheckIcon } from "@chakra-ui/icons";
import { examCategories, scheduledExams, type Exam } from "../data/examsData";
import { pastExams } from "../data/pastExamsData";
import { ExamRegistration, activeExaminees } from "../data/examRegistrationsData";
import { useState } from "react";
import { AddExaminee } from "./AddExaminee";
import { UpdateScore } from "./UpdateScore";

export function Exams() {
  const [currentView, setCurrentView] = useState<"schedule" | "past">("schedule");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    category: "NA",
    examDate: "",
    startTime: "09:30 AM",
    location: "1800 Washington Boulevard, Baltimore, MD 21230",
    duration: "2",
    examFees: "",
    registrationLimit: "10"
  });
  const [showRegistrations, setShowRegistrations] = useState(false);
  const [selectedExamId, setSelectedExamId] = useState<string | null>(null);
  const [showAddExaminee, setShowAddExaminee] = useState(false);
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [showUpdateScore, setShowUpdateScore] = useState(false);
  const [selectedExaminee, setSelectedExaminee] = useState<ExamRegistration | null>(null);
  const [showPastRegistrations, setShowPastRegistrations] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [examToApprove, setExamToApprove] = useState<ExamRegistration | null>(null);
  const { 
    isOpen: isApproveModalOpen, 
    onOpen: onApproveModalOpen, 
    onClose: onApproveModalClose 
  } = useDisclosure();
  const {
    isOpen: isCancelModalOpen,
    onOpen: onCancelModalOpen,
    onClose: onCancelModalClose
  } = useDisclosure();
  const [approvedExaminees, setApprovedExaminees] = useState<string[]>([]);
  const { 
    isOpen: isUnapproveModalOpen, 
    onOpen: onUnapproveModalOpen, 
    onClose: onUnapproveModalClose 
  } = useDisclosure();
  const {
    isOpen: isUnapproveModalCancelOpen,
    onOpen: onUnapproveModalCancelOpen,
    onClose: onUnapproveModalCancelClose
  } = useDisclosure();

  const handleEditClick = (exam: Exam) => {
    console.log("Editing exam:", exam);

    const formattedDate = exam.examDate.split('/').join('-');
    const formattedTime = exam.startTime.split(' ')[0];
    const formattedDuration = exam.duration.replace(" Hours", "");

    setFormData({
      id: exam.id,
      category: examCategories.find(cat => 
        cat.label === exam.category || cat.value === exam.category
      )?.value || "NA",
      examDate: formattedDate,
      startTime: formattedTime,
      location: exam.location,
      duration: formattedDuration,
      examFees: exam.examFees || "",
      registrationLimit: exam.registrationLimit.toString()
    });

    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      id: "",
      category: "NA",
      examDate: "",
      startTime: "09:30 AM",
      location: "1800 Washington Boulevard, Baltimore, MD 21230",
      duration: "2",
      examFees: "",
      registrationLimit: "10"
    });
  };

  const handleAddExaminee = () => {
    if (selectedExam) {
      setShowAddExaminee(true);
    }
  };

  const handleViewRegistrations = (exam: Exam) => {
    setSelectedExamId(exam.id);
    setSelectedExam(exam);
    setShowRegistrations(true);
  };

  const handleUpdateScore = (examinee: ExamRegistration) => {
    setSelectedExaminee(examinee);
    setShowUpdateScore(true);
  };

  const handleViewPastRegistrations = (exam: Exam) => {
    setSelectedExamId(exam.id);
    setSelectedExam(exam);
    setShowPastRegistrations(true);
  };

  const handleApproveClick = (examinee: ExamRegistration) => {
    setExamToApprove(examinee);
    onApproveModalOpen();
  };

  const handleConfirmApprove = () => {
    if (examToApprove) {
      setApprovedExaminees(prev => [...prev, examToApprove.examId]);
    }
    onApproveModalClose();
    setExamToApprove(null);
  };

  const handleCancelApprove = () => {
    onApproveModalClose();
    onCancelModalOpen();
  };

  const handleUnapproveClick = (examinee: ExamRegistration) => {
    setExamToApprove(examinee);
    onUnapproveModalOpen();
  };

  const handleConfirmUnapprove = () => {
    if (examToApprove) {
      setApprovedExaminees(prev => prev.filter(id => id !== examToApprove.examId));
    }
    onUnapproveModalClose();
    setExamToApprove(null);
  };

  const handleCancelUnapprove = () => {
    onUnapproveModalClose();
    onUnapproveModalCancelOpen();
  };

  const ApproveConfirmationModal = () => (
    <Modal isOpen={isApproveModalOpen} onClose={onApproveModalClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center">
          <VStack spacing={4}>
            <WarningIcon boxSize="50px" color="orange.300" />
            <Text>Are you sure?</Text>
          </VStack>
        </ModalHeader>
        <ModalBody textAlign="center">
          This user will be approved for this exam schedule!
        </ModalBody>
        <ModalFooter justifyContent="center">
          <ButtonGroup spacing={4}>
            <Button colorScheme="gray" onClick={handleCancelApprove}>
              No, cancel!
            </Button>
            <Button colorScheme="red" onClick={handleConfirmApprove}>
              Yes, approve!
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

  const CancelConfirmationModal = () => (
    <Modal isOpen={isCancelModalOpen} onClose={onCancelModalClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center">
          <VStack spacing={4}>
            <CheckIcon boxSize="50px" color="green.500" />
            <Text>Alright</Text>
          </VStack>
        </ModalHeader>
        <ModalBody textAlign="center">
          Nothing changed!
        </ModalBody>
        <ModalFooter justifyContent="center">
          <Button colorScheme="green" onClick={onCancelModalClose}>
            OK
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

  const UnapproveConfirmationModal = () => (
    <Modal isOpen={isUnapproveModalOpen} onClose={onUnapproveModalClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center">
          <VStack spacing={4}>
            <WarningIcon boxSize="50px" color="orange.300" />
            <Text>Are you sure?</Text>
          </VStack>
        </ModalHeader>
        <ModalBody textAlign="center">
          This user will be unapproved for this exam schedule!
        </ModalBody>
        <ModalFooter justifyContent="center">
          <ButtonGroup spacing={4}>
            <Button colorScheme="gray" onClick={handleCancelUnapprove}>
              No, cancel!
            </Button>
            <Button colorScheme="red" onClick={handleConfirmUnapprove}>
              Yes, unapprove!
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

  const UnapproveConfirmationCancelModal = () => (
    <Modal isOpen={isUnapproveModalCancelOpen} onClose={onUnapproveModalCancelClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center">
          <VStack spacing={4}>
            <CheckIcon boxSize="50px" color="green.500" />
            <Text>Alright</Text>
          </VStack>
        </ModalHeader>
        <ModalBody textAlign="center">
          Nothing changed!
        </ModalBody>
        <ModalFooter justifyContent="center">
          <Button colorScheme="green" onClick={onUnapproveModalCancelClose}>
            OK
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

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
                      leftIcon={<ViewIcon />}
                      colorScheme="blue"
                      onClick={() => handleViewPastRegistrations(exam)}
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

  const renderRegistrations = () => (
    <>
      <Card mb={6}>
        <CardBody>
          <Heading as="h2" size="lg" color="red.700" mb={2}>
            Users Registered for the Exam
          </Heading>
        </CardBody>
      </Card>

      <Box mb={6}>
        <ButtonGroup spacing={4} mb={4}>
          <Button
            colorScheme="blue"
            onClick={() => setShowRegistrations(false)}
          >
            Back
          </Button>
          <Button colorScheme="red">
            Registrations
          </Button>
          <Button
            colorScheme="blue"
            onClick={handleAddExaminee}
          >
            Add Examinee
          </Button>
        </ButtonGroup>
        <Alert status="success" variant="subtle">
          &nbsp;
        </Alert>
      </Box>

      {/* Active Examinees */}
      <Card mb={6}>
        <CardHeader>
          <Heading size="md">Active Examinees</Heading>
        </CardHeader>
        <CardBody>
          <Box overflowX="auto">
            <Table variant="striped">
              <Thead>
                <Tr>
                  <Th>Last Name</Th>
                  <Th>Suffix</Th>
                  <Th>First Name</Th>
                  <Th>Middle Name</Th>
                  <Th>Email</Th>
                  <Th>Phone Number</Th>
                  <Th>Exam Date</Th>
                  <Th>Start Time</Th>
                  <Th>Exam Category</Th>
                  <Th>Exam Result</Th>
                  <Th>Approve</Th>
                  <Th>Update Score</Th>
                  <Th>Delete</Th>
                </Tr>
              </Thead>
              <Tbody>
                {activeExaminees.map((examinee, index) => (
                  <Tr key={index}>
                    <Td>{examinee.lastName}</Td>
                    <Td>{examinee.suffix}</Td>
                    <Td>{examinee.firstName}</Td>
                    <Td>{examinee.middleName}</Td>
                    <Td>{examinee.email}</Td>
                    <Td>{examinee.phoneNumber}</Td>
                    <Td>{examinee.examDate}</Td>
                    <Td>{examinee.startTime}</Td>
                    <Td>{examinee.examCategory}</Td>
                    <Td>{examinee.examResult}</Td>
                    <Td>
                      {approvedExaminees.includes(examinee.examId) ? (
                        <Button
                          size="sm"
                          colorScheme="green"
                          leftIcon={<CheckIcon />}
                          onClick={() => handleUnapproveClick(examinee)}
                        />
                      ) : (
                        <Button
                          size="sm"
                          colorScheme="yellow"
                          title="Approve"
                          onClick={() => handleApproveClick(examinee)}
                        >
                          !
                        </Button>
                      )}
                    </Td>
                    <Td>
                      <Button
                        size="sm"
                        colorScheme="green"
                        onClick={() => handleUpdateScore(examinee)}
                      >
                        Update Score
                      </Button>
                    </Td>
                    <Td>
                      <Button
                        size="sm"
                        colorScheme="red"
                      >
                        Delete
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </CardBody>
      </Card>

      {/* Deleted Examinees */}
      <Card>
        <CardHeader>
          <Heading size="md">Deleted Examinees</Heading>
        </CardHeader>
        <CardBody>
          <Box overflowX="auto">
            <Table variant="striped">
              <Thead>
                <Tr>
                  <Th>Last Name</Th>
                  <Th>First Name</Th>
                  <Th>Email</Th>
                  <Th>Exam Date</Th>
                  <Th>Exam Category</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td colSpan={5} textAlign="center">No data available</Td>
                </Tr>
              </Tbody>
            </Table>
          </Box>
        </CardBody>
      </Card>
    </>
  );

  const renderPastRegistrations = () => (
    <>
      {/* Header */}
      <Card mb={6}>
        <CardBody>
          <Heading as="h2" size="lg" color="red.700" mb={2}>
            Users Registered for the Past Exams
          </Heading>
        </CardBody>
      </Card>

      {/* Back Button and Alert */}
      <Box mb={6}>
        <ButtonGroup spacing={4} mb={4}>
          <Button
            colorScheme="blue"
            onClick={() => setShowPastRegistrations(false)}
          >
            Back
          </Button>
        </ButtonGroup>
        <Alert status="success" variant="subtle">
          &nbsp;
        </Alert>
      </Box>

      {/* Past Registrations Table */}
      <Card>
        <CardBody>
          <Box overflowX="auto">
            <Table variant="striped">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th>Phone Number</Th>
                  <Th>Exam Category</Th>
                  <Th>Exam Date</Th>
                  <Th>Exam Result</Th>
                  <Th>Paid</Th>
                  <Th>Fee Exempted Flag</Th>
                  <Th>Score(%)</Th>
                  <Th>Training Category</Th>
                  <Th>Training Start Date</Th>
                  <Th>Training Card</Th>
                  <Th>Exceeded Exam-Training gap</Th>
                </Tr>
              </Thead>
              <Tbody>
                {activeExaminees.map((examinee, index) => (
                  <Tr key={index}>
                    <Td whiteSpace="nowrap">{`${examinee.firstName} ${examinee.lastName}`}</Td>
                    <Td whiteSpace="nowrap">{examinee.email}</Td>
                    <Td whiteSpace="nowrap">{examinee.phoneNumber}</Td>
                    <Td whiteSpace="nowrap">{examinee.examCategory}</Td>
                    <Td whiteSpace="nowrap">{examinee.examDate}</Td>
                    <Td whiteSpace="nowrap">{examinee.examResult || "Score Needs to be updated"}</Td>
                    <Td whiteSpace="nowrap">{examinee.paid ? "Yes" : ""}</Td>
                    <Td whiteSpace="nowrap">{examinee.feeExempted ? "Yes" : "No"}</Td>
                    <Td whiteSpace="nowrap">{examinee.score || ""}</Td>
                    <Td whiteSpace="nowrap">{examinee.trainingCategory}</Td>
                    <Td whiteSpace="nowrap">{examinee.trainingEndDate || ""}</Td>
                    <Td whiteSpace="nowrap">{examinee.trainingCard || ""}</Td>
                    <Td whiteSpace="nowrap">{examinee.exceededGap ? "Yes" : "No"}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>

            {/* Pagination */}
            <Flex justify="space-between" mt={4} align="center">
              <Text>
                Showing 1 to 10 of {activeExaminees.length} entries
              </Text>
              <ButtonGroup>
                <Button isDisabled>Previous</Button>
                <Button variant="solid" colorScheme="blue">1</Button>
                <Button variant="outline">2</Button>
                <Button>Next</Button>
              </ButtonGroup>
            </Flex>
          </Box>
        </CardBody>
      </Card>
    </>
  );

  return (
    <Container maxW="6xl" className="transition animated fadeIn">
      <ApproveConfirmationModal />
      <CancelConfirmationModal />
      <UnapproveConfirmationModal />
      <UnapproveConfirmationCancelModal />
      
      {showUpdateScore && selectedExaminee && selectedExam ? (
        <UpdateScore
          examinee={selectedExaminee}
          exam={selectedExam}
          onBack={() => {
            setShowUpdateScore(false);
            setSelectedExaminee(null);
          }}
        />
      ) : showAddExaminee && selectedExam ? (
        <AddExaminee
          exam={selectedExam}
          onBack={() => {
            setShowAddExaminee(false);
            setSelectedExam(null);
          }}
        />
      ) : showPastRegistrations ? (
        renderPastRegistrations()
      ) : showRegistrations ? (
        renderRegistrations()
      ) : (
        <>
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
                          isDisabled={isEditing}
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
                      <Button 
                        colorScheme="green" 
                        mr={3}
                      >
                        {isEditing ? 'Update Exam' : 'Schedule'}
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={handleCancel}
                      >
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
                                onClick={() => {
                                  console.log("Edit button clicked");
                                  handleEditClick(exam);
                                }}
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
                                onClick={() => handleViewRegistrations(exam)}
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
        </>
      )}
    </Container>
  );
} 