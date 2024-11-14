export interface PastExam {
  id: string;
  category: string;
  examDate: string;
  startTime: string;
  location: string;
  duration: string;
  registrationLimit: number;
  registrations: number;
}

export const pastExams: PastExam[] = [
  {
    id: "SYavRUlsvN2pR1NdubqhAg",
    category: "Inspector Technician Instructor",
    examDate: "2024/11/12",
    startTime: "09:30 AM",
    location: "1800 Washington Boulevard, Baltimore, MD 21230",
    duration: "2 Hours",
    registrationLimit: 10,
    registrations: 0
  },
  {
    id: "pdY73BlneJ54qDJut20SEQ",
    category: "Risk Assessor",
    examDate: "2024/11/08",
    startTime: "09:30 AM",
    location: "1800 Washington Boulevard, Baltimore, MD 21230",
    duration: "2 Hours",
    registrationLimit: 10,
    registrations: 1
  },
  // Add more past exams...
]; 