export interface DetailedYearMarks {
  ce: number | string;
  pe?: number | string;
  te: number | string;
  total: number | string;
}

export interface DetailedGrandTotal {
  ce: number | string;
  pe?: number | string;
  te: number | string;
  total: number | string;
}

export interface SubjectResult {
  sl: number;
  subjectName: string;
  subjectCode: string;
  credits: number;
  grade: string;
  total: number | string;
  internalMarks?: number;
  externalMarks?: number;
  
  // Detailed HSE / Higher Secondary breakdown fields from image
  firstYear?: DetailedYearMarks;
  secondYear?: DetailedYearMarks;
  grandTotal?: DetailedGrandTotal;
  gradeInWords?: string;
}

export interface StudentResult {
  studentName: string;
  hallTicketNo: string;
  department: string;
  course: string;
  year: string;
  examination: string;
  fatherName?: string;
  collegeName?: string;
  sgpa?: number;
  cgpa?: number;
  resultStatus?: string;
  declarationDate?: string;
  subjects: SubjectResult[];
}

export interface ExamNotification {
  id: string;
  title: string;
  date: string;
  category: string;
  isNew?: boolean;
}
