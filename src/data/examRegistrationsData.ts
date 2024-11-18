export interface ExamRegistration {
  lastName: string;
  suffix?: string;
  firstName: string;
  middleName?: string;
  email: string;
  phoneNumber: string;
  examDate: string;
  startTime: string;
  examCategory: string;
  examResult?: string;
  paid?: boolean;
  feeExempted?: boolean;
  feeWaiverRequested?: boolean;
  score?: string;
  trainingCategory: string;
  trainingEndDate?: string;
  trainingCard?: string;
  exceededGap?: boolean;
  isApproved?: boolean;
  examId: string;
}

export const activeExaminees: ExamRegistration[] = [
  {
    examId: "SmCTw9ldmOmK4kgYRoQk1w",
    lastName: "Inspector",
    firstName: "Jimmy",
    middleName: "V",
    email: "fake2insp@srgr.com",
    phoneNumber: "5566889944",
    examDate: "2030/02/06",
    startTime: "09:30 AM",
    examCategory: "Inspector Technician",
    trainingCategory: "Inspector Technician",
    trainingEndDate: "9/30/2021",
    feeWaiverRequested: true,
    exceededGap: true,
    isApproved: false
  },
  {
    examId: "K9mP2rL5sX8wQ4vY7nB1cA",
    lastName: "Smith",
    firstName: "John",
    email: "john.smith@example.com",
    phoneNumber: "1234567890",
    examDate: "2024/12/15",
    startTime: "10:00 AM",
    examCategory: "Risk Assessor",
    trainingCategory: "Risk Assessor",
    trainingEndDate: "2024/11/15",
    feeWaiverRequested: false,
    exceededGap: false,
    isApproved: true,
    examResult: "Pass",
    score: "92"
  },
  {
    examId: "H6tN8yF3mR9kD2wX5pC7vE",
    lastName: "Johnson",
    firstName: "Sarah",
    email: "sarah.j@example.com",
    phoneNumber: "9876543210",
    examDate: "2024/12/20",
    startTime: "11:00 AM",
    examCategory: "Supervisor Instructor",
    trainingCategory: "Supervisor Instructor",
    trainingEndDate: "2024/12/01",
    feeWaiverRequested: false,
    exceededGap: false,
    isApproved: true
  }
];

export const deletedExaminees: ExamRegistration[] = []; 