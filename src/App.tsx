import React, { useState } from 'react';
import { StudentResult } from './types';
import { SAMPLE_STUDENTS, getStudentResult } from './data/mockResults';
import { AnuHeader } from './components/AnuHeader';
import { SearchForm } from './components/SearchForm';
import { ResultSheet } from './components/ResultSheet';
import { CustomResultModal } from './components/CustomResultModal';

export default function App() {
  const [currentView, setCurrentView] = useState<'search' | 'result'>('search');
  const [selectedStudent, setSelectedStudent] = useState<StudentResult | null>(null);
  const [customStudents, setCustomStudents] = useState<Record<string, StudentResult>>({});
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Handle searching for a hall ticket number with form metadata
  const handleSearch = (
    hallTicket: string,
    department?: string,
    course?: string,
    exam?: string,
    year?: string
  ) => {
    const cleanHt = hallTicket.trim().toUpperCase();
    
    let baseStudent: StudentResult;
    if (customStudents[cleanHt]) {
      baseStudent = customStudents[cleanHt];
    } else if (SAMPLE_STUDENTS[cleanHt]) {
      baseStudent = SAMPLE_STUDENTS[cleanHt];
    } else {
      baseStudent = getStudentResult(cleanHt);
    }

    // Format readable course name
    const courseMap: Record<string, string> = {
      'BCOM_CA': 'B.Com ( Computer Application )',
      'BCOM_GEN': 'B.Com ( General )',
      'BSC_CS': 'B.Sc ( Computer Science )',
      'BSC_MPC': 'B.Sc ( Mathematics, Physics, Chemistry )',
      'BSC_BZC': 'B.Sc ( Botany, Zoology, Chemistry )',
      'BA': 'B.A ( History, Economics, Political Science )',
      'BBA': 'B.B.A ( Bachelor of Business Administration )',
      'BCA': 'B.C.A ( Bachelor of Computer Applications )',
      'MCOM': 'M.Com ( Master of Commerce )',
      'MSC_CS': 'M.Sc ( Computer Science )',
      'MSC_CHEM': 'M.Sc ( Organic Chemistry )',
      'MSC_MATH': 'M.Sc ( Mathematics )',
      'MA_ENG': 'M.A ( English Literature )',
      'MA_ECO': 'M.A ( Economics )',
      'MBA': 'M.B.A ( Master of Business Administration )',
      'MCA': 'M.C.A ( Master of Computer Applications )',
      'BTECH_CSE': 'B.Tech ( Computer Science & Engineering )',
      'BTECH_ECE': 'B.Tech ( Electronics & Communication Engg )',
      'BTECH_EEE': 'B.Tech ( Electrical & Electronics Engg )',
      'BTECH_CIVIL': 'B.Tech ( Civil Engineering )',
      'BTECH_MECH': 'B.Tech ( Mechanical Engineering )',
      'BTECH_IT': 'B.Tech ( Information Technology )',
      'BARCH': 'B.Arch ( Bachelor of Architecture )',
      'MTECH_CSE': 'M.Tech ( Computer Science & Engineering )',
      'MTECH_VLSI': 'M.Tech ( VLSI & Embedded Systems )',
      'MTECH_STRUCT': 'M.Tech ( Structural Engineering )',
      'MTECH_POWER': 'M.Tech ( Power Electronics )',
      'MTECH_CAD': 'M.Tech ( CAD / CAM )',
      'BPHARM': 'B.Pharmacy ( Bachelor of Pharmacy )',
      'MPHARM': 'M.Pharmacy ( Pharmaceutics )',
      'PHARMD': 'Pharm.D ( Doctor of Pharmacy )',
      'NA': 'Commerce',
    };

    let formattedCourse = baseStudent.course || 'Commerce';
    if (course && courseMap[course]) {
      formattedCourse = courseMap[course];
    } else if (course && course !== 'Select Course' && course !== 'NA' && course !== '') {
      formattedCourse = course;
    } else if (department === 'HSE' || department === 'HSE (11 / 12th Class)' || department === 'SSLC' || department === 'SSLC (Secondary School Leaving Certificate)') {
      formattedCourse = 'Commerce';
    }

    // Override student metadata if selected in form
    const updatedStudent: StudentResult = {
      ...baseStudent,
      department: (department && department !== 'Select Department') ? department : baseStudent.department,
      course: formattedCourse,
      year: year || baseStudent.year,
      examination: exam ? `${exam.toUpperCase()} EXAMINATIONS` : baseStudent.examination,
    };

    setSelectedStudent(updatedStudent);
    setCurrentView('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle saving new or edited student result
  const handleSaveStudent = (newStudent: StudentResult) => {
    setCustomStudents((prev) => ({
      ...prev,
      [newStudent.hallTicketNo]: newStudent,
    }));
    setSelectedStudent(newStudent);
    setCurrentView('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToSearch = () => {
    setCurrentView('search');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-gray-900 antialiased selection:bg-sky-200 selection:text-sky-900">
      {currentView === 'result' && selectedStudent ? (
        <ResultSheet
          student={selectedStudent}
          onMoreResult={handleBackToSearch}
          onEditStudent={() => setIsModalOpen(true)}
        />
      ) : (
        <div className="pb-12">
          {/* Main Official University Header */}
          <AnuHeader />

          {/* Quick Notice Bar */}
          <div className="bg-[#12416C] text-sky-100 text-xs py-2 px-4 text-center border-b border-sky-900 font-medium">
            Official Higher Secondary Examination Marks Portal | BOARD OF HIGHER SECONDARY EXAMINATION
          </div>

          {/* Main Content Area */}
          <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
            <SearchForm
              onSearch={handleSearch}
              onOpenCreateModal={() => setIsModalOpen(true)}
            />
          </main>

          {/* Footer */}
          <footer className="mt-16 bg-white border-t border-gray-200 py-6 text-center text-xs text-gray-500">
            <p className="font-semibold text-gray-700">
              © {new Date().getFullYear()} BOARD OF HIGHER SECONDARY EXAMINATION. All Rights Reserved.
            </p>
          </footer>
        </div>
      )}

      {/* Modal for creating/editing custom student result */}
      <CustomResultModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveStudent}
        initialData={selectedStudent}
      />
    </div>
  );
}
