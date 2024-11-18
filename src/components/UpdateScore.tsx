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
  Tbody,
  Tr,
  Td,
  Checkbox,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import type { ExamRegistration } from "../data/examRegistrationsData";
import type { Exam } from "../data/examsData";

interface UpdateScoreProps {
  examinee: ExamRegistration;
  exam: Exam;
  onBack: () => void;
}

export function UpdateScore({ examinee, exam, onBack }: UpdateScoreProps) {
  const [formData, setFormData] = useState({
    attended: "-1",
    questionsAsked: "",
    correctAnswers: "",
    feeExempted: false
  });

  const [score, setScore] = useState<number | null>(null);
  const [result, setResult] = useState<"Pass" | "Fail" | null>(null);
  const passThreshold = 70;

  const calculateScore = () => {
    if (formData.questionsAsked && formData.correctAnswers) {
      const questions = parseFloat(formData.questionsAsked);
      const correct = parseFloat(formData.correctAnswers);
      if (questions > 0) {
        const calculatedScore = (correct / questions) * 100;
        const roundedScore = Math.round(calculatedScore * 100) / 100;
        setScore(roundedScore);
        setResult(roundedScore >= passThreshold ? "Pass" : "Fail");
      }
    }
  };

  useEffect(() => {
    calculateScore();
  }, [formData.questionsAsked, formData.correctAnswers]);

  const resultBgColor = useColorModeValue(
    result === "Pass" ? "green.600" : result === "Fail" ? "red.600" : "transparent",
    result === "Pass" ? "green.500" : result === "Fail" ? "red.500" : "transparent"
  );

  return (
    <Container maxW="6xl" className="transition animated fadeIn">
      <Card mb={6}>
        <CardBody>
          <Heading as="h2" size="lg" color="red.700" mb={2}>
            Update Score
          </Heading>
          <Text fontSize="sm" color="gray.600">
            Please, fill out the form below and click on submit button.
          </Text>
        </CardBody>
      </Card>

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

      {/* Current Exam Score */}
      <Card mb={6}>
        <CardBody>
          <Heading as="h5" size="sm" color="red.700" mb={4}>
            Current Exam Score:
          </Heading>
          <Table variant="striped">
            <Tbody>
              <Tr>
                <Td fontWeight="bold">First Name</Td>
                <Td>{examinee.firstName}</Td>
              </Tr>
              <Tr>
                <Td fontWeight="bold">Last Name</Td>
                <Td>{examinee.lastName}</Td>
              </Tr>
              <Tr>
                <Td fontWeight="bold">Attended</Td>
                <Td>{examinee.examResult ? "Yes" : "No"}</Td>
              </Tr>
              {examinee.examResult && (
                <>
                  <Tr>
                    <Td fontWeight="bold">Question Asked</Td>
                    <Td>30</Td>
                  </Tr>
                  <Tr>
                    <Td fontWeight="bold">Correct Answers</Td>
                    <Td>28</Td>
                  </Tr>
                  <Tr>
                    <Td fontWeight="bold">Score(%)</Td>
                    <Td>93.33</Td>
                  </Tr>
                  <Tr>
                    <Td fontWeight="bold">Result</Td>
                    <Td>{examinee.examResult}</Td>
                  </Tr>
                </>
              )}
            </Tbody>
          </Table>
        </CardBody>
      </Card>

      {/* Update Score Form */}
      <Card>
        <CardBody>
          <VStack spacing={6} align="stretch">
            <Flex direction={{ base: "column", md: "row" }} gap={6}>
              <FormControl isRequired>
                <FormLabel>Attended</FormLabel>
                <Select
                  value={formData.attended}
                  onChange={(e) => setFormData({ ...formData, attended: e.target.value })}
                >
                  <option value="-1">Select Attendance</option>
                  <option value="1">Yes</option>
                  <option value="0">No</option>
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Questions Asked</FormLabel>
                <Input
                  type="number"
                  max={999}
                  value={formData.questionsAsked}
                  onChange={(e) => setFormData({ ...formData, questionsAsked: e.target.value })}
                  placeholder="Questions Asked"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Correct Answers</FormLabel>
                <Input
                  type="number"
                  max={999}
                  value={formData.correctAnswers}
                  onChange={(e) => setFormData({ ...formData, correctAnswers: e.target.value })}
                  placeholder="Correct Answers"
                />
              </FormControl>
            </Flex>

            <Flex direction={{ base: "column", md: "row" }} gap={6}>
              <FormControl>
                <FormLabel>Score(%)</FormLabel>
                <Text fontSize="lg">{score !== null ? score.toFixed(2) : ""}</Text>
              </FormControl>

              <FormControl>
                <FormLabel>Result</FormLabel>
                <Text
                  fontSize="lg"
                  fontWeight="bold"
                  color="white"
                  bg={resultBgColor}
                  px={2}
                  py={1}
                  borderRadius="md"
                  display="inline-block"
                >
                  {result || ""}
                </Text>
              </FormControl>

              <FormControl>
                <Checkbox
                  isChecked={formData.feeExempted}
                  onChange={(e) => setFormData({ ...formData, feeExempted: e.target.checked })}
                >
                  Fee Exempted
                </Checkbox>
              </FormControl>
            </Flex>

            <Flex direction={{ base: "column", md: "row" }} gap={6}>
              <FormControl>
                <FormLabel>Is this exam a requirement for your government employment?</FormLabel>
                <Input value="Yes" isReadOnly />
              </FormControl>

              <FormControl>
                <FormLabel>Exam Date & Time</FormLabel>
                <Input value={`${exam.examDate} ${exam.startTime}`} isReadOnly />
              </FormControl>

              <FormControl>
                <FormLabel>Exam Category</FormLabel>
                <Input value={exam.category} isReadOnly />
              </FormControl>
            </Flex>
          </VStack>
        </CardBody>

        <Box p={4} borderTopWidth={1}>
          <Button colorScheme="green" mr={3}>
            Submit
          </Button>
          <Button colorScheme="red" onClick={onBack}>
            Cancel
          </Button>
        </Box>
      </Card>
    </Container>
  );
} 