export interface TrainingRecord {
  courseName: string;
  requestStatus: "Approved" | "Pending";
  trainingProvider: string;
  startDate: string;
  endDate: string;
  trainingCardNo?: string;
  cardVoidStatus: "Void" | "Not Void";
  courseResult?: "Pass" | "";
  expirationDate?: string;
}

export const myTrainingData: TrainingRecord[] = [
  {
    courseName: "Visual Inspector",
    requestStatus: "Approved",
    trainingProvider: "Silver Spring Associates",
    startDate: "2020/12/16",
    endDate: "2020/12/16",
    trainingCardNo: "100003",
    cardVoidStatus: "Not Void",
    courseResult: "Pass",
    expirationDate: "2022/12/17"
  },
  {
    courseName: "Visual Inspector",
    requestStatus: "Pending",
    trainingProvider: "A & A Lead Inspections",
    startDate: "2022/12/21",
    endDate: "2022/12/22",
    cardVoidStatus: "Void",
    courseResult: "Pass"
  },
  // ... add more training records
]; 