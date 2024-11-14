export interface Exam {
  id: string;
  category: string;
  examDate: string;
  startTime: string;
  location: string;
  duration: string;
  registrationLimit: number;
  registrations: number;
}

export const examCategories = [
  { value: "NA", label: "Select a Exam Category" },
  { value: "IIT", label: "Inspector Technician Instructor" },
  { value: "IPD", label: "Project Designer Instructor" },
  { value: "IRA", label: "Risk Assessor Instructor" },
  { value: "IS1", label: "Structural Steel Supervisor Instructor" },
  { value: "IS2", label: "Removal and Demolition Supervisor Instructor" },
  { value: "IS4", label: "Maintenance and Repainting Supervisor Instructor" },
  { value: "IT", label: "Inspector Technician" },
  { value: "IVI", label: "Visual Inspector Instructor" },
  { value: "IW1", label: "Structural Steel Worker Instructor" },
  { value: "IW2", label: "Abatement Worker Instructor" },
  { value: "RA", label: "Risk Assessor" },
  { value: "S2", label: "Removal and Demolition Supervisor" },
  { value: "SuperInst", label: "Supervisor Instructor" },
  { value: "VI", label: "Visual Inspector" }
];

export const scheduledExams: Exam[] = [
  {
    id: "zCJ4MvO608Dg4TtxZYRHuQ",
    category: "Inspector Technician",
    examDate: "2031/02/06",
    startTime: "09:30 AM",
    location: "1800 Washington Boulevard, Baltimore, MD 21230",
    duration: "2 Hours",
    registrationLimit: 10,
    registrations: 1
  },
  {
    id: "SmCTw9ldmOmK4kgYRoQk1w",
    category: "Inspector Technician",
    examDate: "2030/02/06",
    startTime: "09:30 AM",
    location: "1800 Washington Boulevard, Baltimore, MD 21230",
    duration: "2 Hours",
    registrationLimit: 10,
    registrations: 1
  },
  {
    id: "2ktJJ_UOQ969lnsD_qIZIA",
    category: "Inspector Technician",
    examDate: "2029/02/06",
    startTime: "09:30 AM",
    location: "1800 Washington Boulevard, Baltimore, MD 21230",
    duration: "2 Hours",
    registrationLimit: 10,
    registrations: 1
  },
  {
    id: "3Y5n71G84OcxJLFnnBLRrg",
    category: "Inspector Technician",
    examDate: "2028/02/06",
    startTime: "09:30 AM",
    location: "1800 Washington Boulevard, Baltimore, MD 21230",
    duration: "2 Hours",
    registrationLimit: 10,
    registrations: 1
  },
  {
    id: "OVwSfYbW26ZI2iaMnrUqBg",
    category: "Inspector Technician",
    examDate: "2027/02/06",
    startTime: "09:30 AM",
    location: "1800 Washington Boulevard, Baltimore, MD 21230",
    duration: "2 Hours",
    registrationLimit: 10,
    registrations: 1
  },
  {
    id: "C1tJgn-X6iA4DlZ5atGESQ",
    category: "Inspector Technician",
    examDate: "2026/02/06",
    startTime: "09:30 AM",
    location: "1800 Washington Boulevard, Baltimore, MD 21230",
    duration: "2 Hours",
    registrationLimit: 10,
    registrations: 1
  },
  {
    id: "uLjzhX0N3CN40lHxuqL0pA",
    category: "Inspector Technician",
    examDate: "2025/02/06",
    startTime: "09:30 AM",
    location: "1800 Washington Boulevard, Baltimore, MD 21230",
    duration: "2 Hours",
    registrationLimit: 10,
    registrations: 1
  },
  {
    id: "J-WciKxQKp4mCEpSsHs7MA",
    category: "Visual Inspector",
    examDate: "2024/12/01",
    startTime: "09:30 AM",
    location: "1800 Washington Boulevard, Baltimore, MD 21230",
    duration: "2 Hours",
    registrationLimit: 10,
    registrations: 0
  },
  {
    id: "ioIqZ6aQWGfyX-V9vYQW-A",
    category: "Inspector Technician",
    examDate: "2024/11/20",
    startTime: "09:30 AM",
    location: "1800 Washington Boulevard, Baltimore, MD 21230",
    duration: "2 Hours",
    registrationLimit: 10,
    registrations: 0
  },
  {
    id: "vfzigduIZBod1m43zs2ibg",
    category: "Inspector Technician Instructor",
    examDate: "2024/11/12",
    startTime: "09:30 AM",
    location: "1800 Washington Boulevard, Baltimore, MD 21230",
    duration: "2 Hours",
    registrationLimit: 10,
    registrations: 0
  },
  {
    id: "K9mP2rL5sX8wQ4vY7nB1cA",
    category: "Risk Assessor",
    examDate: "2024/12/15",
    startTime: "10:00 AM",
    location: "1800 Washington Boulevard, Baltimore, MD 21230",
    duration: "3 Hours",
    registrationLimit: 15,
    registrations: 5
  },
  {
    id: "H6tN8yF3mR9kD2wX5pC7vE",
    category: "Supervisor Instructor",
    examDate: "2024/12/20",
    startTime: "11:00 AM",
    location: "1800 Washington Boulevard, Baltimore, MD 21230",
    duration: "2.5 Hours",
    registrationLimit: 12,
    registrations: 3
  }
]; 