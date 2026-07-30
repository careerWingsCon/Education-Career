import React, { useState } from 'react';
import { StudentResult, SubjectResult } from '../types';
import { X, Plus, Trash2, Check, Save } from 'lucide-react';

interface CustomResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (student: StudentResult) => void;
  initialData?: StudentResult | null;
}

export const CustomResultModal: React.FC<CustomResultModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const [studentName, setStudentName] = useState(initialData?.studentName || 'MOHD MUSTAFA ALI');
  const [hallTicketNo, setHallTicketNo] = useState(initialData?.hallTicketNo || 'Y234023365');
  const [department, setDepartment] = useState(initialData?.department || 'Under Graduation');
  const [course, setCourse] = useState(initialData?.course || 'Commerce');
  const [year, setYear] = useState(initialData?.year || '2026');
  const [examination, setExamination] = useState(initialData?.examination || 'SEMESTER 6');
  const [resultStatus, setResultStatus] = useState(initialData?.resultStatus || 'PASSED IN FIRST CLASS WITH DISTINCTION');
  const [sgpa, setSgpa] = useState<number>(initialData?.sgpa || 9.25);

  const [subjects, setSubjects] = useState<SubjectResult[]>(
    initialData?.subjects || [
      { sl: 1, subjectName: 'PART I ENGLISH', subjectCode: 'AU601', credits: 2, grade: 'A', total: 0 },
      { sl: 2, subjectName: 'PART II ARABIC', subjectCode: 'AU602', credits: 4, grade: 'A', total: 0 },
      { sl: 3, subjectName: 'PART III (Optionals) BUSINESS STUDIES WITH FUNCTIONAL MANAGEMENT', subjectCode: 'AU603', credits: 4, grade: 'A+', total: 0 },
      { sl: 4, subjectName: 'ACCOUNTANCY WITH COMPUTER ACCOUNTING', subjectCode: 'AU604', credits: 4, grade: 'A+', total: 0 },
      { sl: 5, subjectName: 'ECONOMICS', subjectCode: 'AU605', credits: 4, grade: 'A', total: 0 },
      { sl: 6, subjectName: 'COMPUTER APPLICATION-COM', subjectCode: 'AU606', credits: 4, grade: 'A', total: 0 },
    ]
  );

  if (!isOpen) return null;

  const handleAddSubject = () => {
    const nextSl = subjects.length + 1;
    setSubjects([
      ...subjects,
      {
        sl: nextSl,
        subjectName: `New Subject ${nextSl}`,
        subjectCode: `AU60${nextSl}`,
        credits: 4,
        grade: 'A',
        total: 0,
      },
    ]);
  };

  const handleRemoveSubject = (index: number) => {
    const updated = subjects.filter((_, i) => i !== index).map((s, idx) => ({ ...s, sl: idx + 1 }));
    setSubjects(updated);
  };

  const handleSubjectChange = (index: number, field: keyof SubjectResult, value: string | number) => {
    const updated = [...subjects];
    updated[index] = { ...updated[index], [field]: value };
    setSubjects(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newStudent: StudentResult = {
      studentName: studentName.trim().toUpperCase(),
      hallTicketNo: hallTicketNo.trim().toUpperCase(),
      department: department.trim(),
      course: course.trim(),
      year: year.trim(),
      examination: examination.trim().toUpperCase(),
      resultStatus: resultStatus.trim(),
      sgpa,
      declarationDate: '25-07-2026',
      subjects,
    };

    onSave(newStudent);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl overflow-hidden my-8 border border-gray-200 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-[#164E80] text-white px-6 py-4 flex items-center justify-between">
          <h3 className="font-bold text-lg font-sans">
            {initialData ? 'Edit Student Result Data' : 'Create Custom Student Result Sheet'}
          </h3>
          <button
            onClick={onClose}
            className="text-sky-200 hover:text-white transition-colors p-1 rounded-full hover:bg-sky-900"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Student Info Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Student Name
              </label>
              <input
                type="text"
                required
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded text-sm font-medium focus:ring-2 focus:ring-[#164E80] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Hall Ticket No
              </label>
              <input
                type="text"
                required
                value={hallTicketNo}
                onChange={(e) => setHallTicketNo(e.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded text-sm font-mono font-bold focus:ring-2 focus:ring-[#164E80] outline-none uppercase"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Department
              </label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded text-sm font-medium focus:ring-2 focus:ring-[#164E80] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Course Name
              </label>
              <input
                type="text"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded text-sm font-medium focus:ring-2 focus:ring-[#164E80] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Year
              </label>
              <input
                type="text"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded text-sm font-medium focus:ring-2 focus:ring-[#164E80] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Examination
              </label>
              <input
                type="text"
                value={examination}
                onChange={(e) => setExamination(e.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded text-sm font-medium focus:ring-2 focus:ring-[#164E80] outline-none uppercase"
              />
            </div>
          </div>

          {/* Subjects Table Editor */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-xs font-bold text-gray-700 uppercase">
                Subjects &amp; Marks List ({subjects.length})
              </label>
              <button
                type="button"
                onClick={handleAddSubject}
                className="inline-flex items-center gap-1 text-xs font-bold text-[#164E80] hover:text-[#0f385e] bg-sky-50 px-2.5 py-1 rounded border border-sky-200"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Subject Row
              </button>
            </div>

            <div className="space-y-2">
              {subjects.map((sub, idx) => (
                <div key={idx} className="flex flex-wrap items-center gap-2 bg-gray-50 p-2.5 rounded border border-gray-200">
                  <span className="text-xs font-bold text-gray-500 w-6 text-center">{idx + 1}</span>

                  <input
                    type="text"
                    placeholder="Subject Name"
                    value={sub.subjectName}
                    onChange={(e) => handleSubjectChange(idx, 'subjectName', e.target.value)}
                    className="flex-1 min-w-[140px] p-2 border border-gray-300 rounded text-xs bg-white"
                  />

                  <input
                    type="text"
                    placeholder="Code"
                    value={sub.subjectCode}
                    onChange={(e) => handleSubjectChange(idx, 'subjectCode', e.target.value)}
                    className="w-20 p-2 border border-gray-300 rounded text-xs font-mono uppercase bg-white"
                  />

                  <input
                    type="number"
                    placeholder="Credits"
                    value={sub.credits}
                    onChange={(e) => handleSubjectChange(idx, 'credits', parseInt(e.target.value) || 0)}
                    className="w-16 p-2 border border-gray-300 rounded text-xs text-center bg-white"
                  />

                  <select
                    value={sub.grade}
                    onChange={(e) => handleSubjectChange(idx, 'grade', e.target.value)}
                    className="w-20 p-2 border border-gray-300 rounded text-xs font-bold bg-white"
                  >
                    <option value="O">O</option>
                    <option value="A+">A+</option>
                    <option value="A">A</option>
                    <option value="B+">B+</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="F">F</option>
                  </select>

                  <button
                    type="button"
                    onClick={() => handleRemoveSubject(idx)}
                    className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
                    title="Remove subject"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-gray-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2 text-sm font-bold text-white bg-[#164E80] hover:bg-[#0f385e] rounded shadow-xs"
            >
              <Save className="w-4 h-4" />
              Save &amp; View Result Sheet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
