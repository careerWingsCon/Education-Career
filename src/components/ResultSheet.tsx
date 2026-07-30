import React from 'react';
import { StudentResult } from '../types';
import { AnuHeader } from './AnuHeader';
import { Printer, ArrowLeft, CheckCircle2, Download, Share2 } from 'lucide-react';

interface ResultSheetProps {
  student: StudentResult;
  onMoreResult: () => void;
  onEditStudent?: () => void;
}

export const ResultSheet: React.FC<ResultSheetProps> = ({
  student,
  onMoreResult,
  onEditStudent
}) => {
  const handlePrint = () => {
    window.print();
  };

  // Format credit numbers with leading zero if single digit (e.g., 02, 04)
  const formatCredit = (c: number) => {
    return c < 10 ? `0${c}` : `${c}`;
  };

  // Calculate total marks obtained and maximum possible marks across subjects
  const totalMarksObtained = student.subjects.reduce((acc, subj) => {
    const val =
      subj.secondYear?.total !== undefined
        ? Number(subj.secondYear.total) || 0
        : Number(subj.total) || 0;
    return acc + val;
  }, 0);

  const totalMaxMarks = student.subjects.reduce((acc, subj) => {
    const val =
      subj.secondYear?.total !== undefined
        ? Number(subj.secondYear.total) || 0
        : Number(subj.total) || 0;
    return acc + (val > 100 ? 200 : 100);
  }, 0);

  const percentage = totalMaxMarks > 0 ? ((totalMarksObtained / totalMaxMarks) * 100).toFixed(2) : '0.00';

  return (
    <div className="min-h-screen bg-gray-50 pb-12 print:bg-white print:pb-0 print:min-h-0">
      {/* Official Header */}
      <AnuHeader />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 print:px-0 print:py-2 print:max-w-none">
        {/* Action Buttons (Hidden on Print) */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6 print:hidden">
          <button
            onClick={handlePrint}
            id="btn-print-result"
            className="inline-flex items-center justify-center gap-1.5 px-5 py-2 bg-[#2B6CB0] hover:bg-[#2C5282] text-white font-medium text-sm rounded transition-colors shadow-xs"
          >
            <Printer className="w-4 h-4" />
            Print
          </button>

          <button
            onClick={onMoreResult}
            id="btn-more-result"
            className="inline-flex items-center justify-center gap-1.5 px-5 py-2 bg-[#2B6CB0] hover:bg-[#2C5282] text-white font-medium text-sm rounded transition-colors shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            More result
          </button>


        </div>

        {/* Result Sheet Container Card */}
        <div className="bg-white border border-gray-300 rounded-sm shadow-xs p-4 sm:p-8 print:border-none print:shadow-none print:p-0">
          
          {/* Centered Main Title */}
          <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-900 mb-6 font-sans tracking-tight">
            Result Sheet
          </h2>

          {/* Student Information Section */}
          <div className="mb-8">
            <h3 className="text-sm sm:text-base font-bold text-gray-700 mb-2 font-sans">
              Student Information
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse border border-gray-400">
                <tbody>
                  <tr className="border-b border-gray-400">
                    <th className="py-2.5 px-4 font-semibold text-gray-700 bg-gray-50/50 w-1/3 border-r border-gray-400">
                      Student Name
                    </th>
                    <td className="py-2.5 px-4 text-gray-900 font-medium uppercase">
                      {student.studentName}
                    </td>
                  </tr>

                  <tr className="border-b border-gray-400">
                    <th className="py-2.5 px-4 font-semibold text-gray-700 bg-gray-50/50 border-r border-gray-400">
                      Hall Ticket No
                    </th>
                    <td className="py-2.5 px-4 text-gray-900 font-medium tracking-wide">
                      {student.hallTicketNo}
                    </td>
                  </tr>

                  <tr className="border-b border-gray-400">
                    <th className="py-2.5 px-4 font-semibold text-gray-700 bg-gray-50/50 border-r border-gray-400">
                      Department
                    </th>
                    <td className="py-2.5 px-4 text-gray-900 font-medium">
                      {student.department}
                    </td>
                  </tr>

                  <tr className="border-b border-gray-400">
                    <th className="py-2.5 px-4 font-semibold text-gray-700 bg-gray-50/50 border-r border-gray-400">
                      Group
                    </th>
                    <td className="py-2.5 px-4 text-gray-900 font-medium">
                      {student.course}
                    </td>
                  </tr>

                  <tr className="border-b border-gray-400">
                    <th className="py-2.5 px-4 font-semibold text-gray-700 bg-gray-50/50 border-r border-gray-400">
                      Year
                    </th>
                    <td className="py-2.5 px-4 text-gray-900 font-medium">
                      {student.year}
                    </td>
                  </tr>

                  <tr>
                    <th className="py-2.5 px-4 font-semibold text-gray-700 bg-gray-50/50 border-r border-gray-400">
                      Examination
                    </th>
                    <td className="py-2.5 px-4 text-gray-900 font-medium uppercase">
                      {student.examination}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Marks & Subjects Table */}
          <div className="mb-8">
            {/* Table Format Switcher (Standard vs Higher Secondary Image Format) */}
            {student.subjects.some((s) => s.firstYear) && (
              <div className="mb-3 flex items-center justify-between text-xs print:hidden">
                <span className="font-bold text-gray-700 uppercase tracking-wider">
                  Detailed Higher Secondary Evaluation Format (Matching Image)
                </span>
              </div>
            )}

            <div className="overflow-x-auto">
              {student.subjects.some((s) => s.firstYear) ? (
                /* Detailed Higher Secondary Marks Table - Second Year Only */
                <table className="w-full text-xs sm:text-sm border-collapse border border-gray-400 text-center font-sans">
                  <thead>
                    <tr className="border-b border-gray-400 bg-gray-50 uppercase text-gray-800 font-bold">
                      <th rowSpan={2} className="py-2 px-3 text-left border-r border-gray-400 font-bold min-w-[200px]">
                        SUBJECTS
                      </th>
                      <th colSpan={4} className="py-1.5 px-2 border-r border-gray-400 text-center font-bold">
                        MARKS OBTAINED
                      </th>
                      <th rowSpan={2} className="py-2 px-2 border-r border-gray-400 text-center font-bold w-24">
                        Grade Obtained
                      </th>
                      <th rowSpan={2} className="py-2 px-2 text-center font-bold w-28">
                        Grade in Words
                      </th>
                    </tr>

                    <tr className="border-b border-gray-400 bg-gray-50 text-gray-800 text-xs font-semibold">
                      {/* Marks Breakdown */}
                      <th className="py-1 px-2 border-r border-gray-400">CE</th>
                      <th className="py-1 px-2 border-r border-gray-400">PE</th>
                      <th className="py-1 px-2 border-r border-gray-400">TE</th>
                      <th className="py-1 px-2 border-r border-gray-400 font-bold">Total</th>
                    </tr>
                  </thead>

                  <tbody>
                    {student.subjects.map((subj, idx) => (
                      <tr key={idx} className="border-b border-gray-400 hover:bg-gray-50/50 transition-colors">
                        {/* Subject Title */}
                        <td className="py-2.5 px-3 text-left font-bold text-gray-900 uppercase border-r border-gray-400 leading-snug">
                          {subj.subjectName}
                        </td>

                        {/* Marks Breakdown: CE, PE, TE, Total */}
                        <td className="py-2 px-2 border-r border-gray-400 font-semibold text-gray-800">
                          {subj.secondYear?.ce ?? '--'}
                        </td>
                        <td className="py-2 px-2 border-r border-gray-400 font-semibold text-gray-800">
                          {subj.secondYear?.pe ?? '--'}
                        </td>
                        <td className="py-2 px-2 border-r border-gray-400 font-semibold text-gray-800">
                          {subj.secondYear?.te ?? '--'}
                        </td>
                        <td className="py-2 px-2 border-r border-gray-400 font-extrabold text-gray-950 bg-gray-50/50">
                          {subj.secondYear?.total ?? subj.total}
                        </td>

                        {/* Grade Obtained */}
                        <td className="py-2 px-2 border-r border-gray-400 font-bold text-gray-900">
                          {subj.grade}
                        </td>

                        {/* Grade in Words */}
                        <td className="py-2 px-2 font-bold text-gray-900">
                          {subj.gradeInWords || (subj.grade === 'A+' ? 'A plus' : subj.grade === 'B+' ? 'B plus' : 'A grade')}
                        </td>
                      </tr>
                    ))}
                  </tbody>

                  <tfoot>
                    <tr className="border-t-2 border-gray-400 bg-gray-100/90 font-bold text-gray-900 text-xs sm:text-sm">
                      <td className="py-2.5 px-3 text-left uppercase border-r border-gray-400 font-extrabold">
                        GRAND TOTAL MARKS
                      </td>
                      <td className="py-2 px-2 border-r border-gray-400 font-bold">
                        {student.subjects.reduce((acc, s) => acc + (Number(s.secondYear?.ce) || 0), 0) || '--'}
                      </td>
                      <td className="py-2 px-2 border-r border-gray-400 font-bold">
                        {student.subjects.reduce((acc, s) => acc + (Number(s.secondYear?.pe) || 0), 0) || '--'}
                      </td>
                      <td className="py-2 px-2 border-r border-gray-400 font-bold">
                        {student.subjects.reduce((acc, s) => acc + (Number(s.secondYear?.te) || 0), 0) || '--'}
                      </td>
                      <td className="py-2 px-2 border-r border-gray-400 font-black text-emerald-950 bg-emerald-100/70 text-sm">
                        {totalMarksObtained} / {totalMaxMarks}
                      </td>
                      <td colSpan={2} className="py-2 px-3 text-right font-black text-emerald-950 bg-emerald-100/70">
                        PERCENTAGE: <span className="text-base font-mono font-extrabold ml-1.5 text-emerald-900">{percentage}%</span>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              ) : (
                /* Standard University Marks Table */
                <table className="w-full text-xs sm:text-sm border-collapse border border-gray-400">
                  <thead>
                    <tr className="border-b border-gray-400 bg-gray-50">
                      <th className="py-2.5 px-3 font-bold text-gray-800 text-center border-r border-gray-400 w-12">
                        SL
                      </th>
                      <th className="py-2.5 px-4 font-bold text-gray-800 text-left border-r border-gray-400">
                        Subjects
                      </th>
                      <th className="py-2.5 px-3 font-bold text-gray-800 text-center border-r border-gray-400 w-28 sm:w-36">
                        Subject Code
                      </th>
                      <th className="py-2.5 px-3 font-bold text-gray-800 text-center border-r border-gray-400 w-20">
                        Credits
                      </th>
                      <th className="py-2.5 px-3 font-bold text-gray-800 text-center border-r border-gray-400 w-20">
                        Grade
                      </th>
                      <th className="py-2.5 px-3 font-bold text-gray-800 text-center w-20">
                        Total
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {student.subjects.map((subj) => (
                      <tr key={subj.sl} className="border-b border-gray-400 hover:bg-gray-50/50 transition-colors">
                        <td className="py-2.5 px-3 text-center border-r border-gray-400 text-gray-800 font-medium">
                          {subj.sl}
                        </td>
                        <td className="py-2.5 px-4 text-left border-r border-gray-400 text-gray-900 font-medium">
                          {subj.subjectName}
                        </td>
                        <td className="py-2.5 px-3 text-center border-r border-gray-400 text-gray-800 font-mono text-xs sm:text-sm uppercase">
                          {subj.subjectCode}
                        </td>
                        <td className="py-2.5 px-3 text-center border-r border-gray-400 text-gray-800 font-medium">
                          {formatCredit(subj.credits)}
                        </td>
                        <td className="py-2.5 px-3 text-center border-r border-gray-400 font-bold text-gray-900">
                          {subj.grade}
                        </td>
                        <td className="py-2.5 px-3 text-center text-gray-800 font-medium">
                          {subj.total}
                        </td>
                      </tr>
                    ))}
                  </tbody>

                  <tfoot>
                    <tr className="border-t-2 border-gray-400 bg-gray-100/90 font-bold text-gray-900 text-xs sm:text-sm">
                      <td colSpan={3} className="py-2.5 px-4 text-left uppercase border-r border-gray-400 font-extrabold">
                        GRAND TOTAL MARKS
                      </td>
                      <td className="py-2.5 px-3 text-center border-r border-gray-400 font-bold">
                        {student.subjects.reduce((acc, s) => acc + (Number(s.credits) || 0), 0)} Credits
                      </td>
                      <td className="py-2.5 px-3 text-center border-r border-gray-400 font-extrabold text-emerald-900 bg-emerald-100/70">
                        {percentage}%
                      </td>
                      <td className="py-2.5 px-3 text-center font-black text-emerald-950 bg-emerald-100/70">
                        {totalMarksObtained} / {totalMaxMarks}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              )}
            </div>
          </div>

          {/* Performance & Status Summary */}
          <div className="bg-emerald-50/70 border border-emerald-200 rounded-lg p-4 mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 print:border-gray-300 print:bg-white">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0" />
              <div>
                <p className="text-xs text-emerald-800 font-bold uppercase tracking-wider">
                  Result Status
                </p>
                <p className="text-base sm:text-lg font-extrabold text-emerald-900">
                  {student.resultStatus || 'PASSED IN FIRST CLASS WITH DISTINCTION'}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-right sm:text-left border-t md:border-t-0 md:border-l border-emerald-200 pt-3 md:pt-0 md:pl-6 w-full md:w-auto justify-between sm:justify-end">
              <div>
                <span className="text-[11px] text-emerald-800 font-semibold uppercase block">TOTAL MARKS</span>
                <span className="text-base sm:text-lg font-extrabold text-emerald-950 font-mono">
                  {totalMarksObtained} <span className="text-xs text-gray-500 font-normal">/ {totalMaxMarks}</span>
                </span>
              </div>

              <div className="border-l border-emerald-200 pl-4 sm:pl-6">
                <span className="text-[11px] text-emerald-800 font-semibold uppercase block">PERCENTAGE</span>
                <span className="text-base sm:text-lg font-extrabold text-emerald-950 font-mono">
                  {percentage}%
                </span>
              </div>

              {student.sgpa && (
                <div className="border-l border-emerald-200 pl-4 sm:pl-6">
                  <span className="text-[11px] text-emerald-800 font-semibold uppercase block">SGPA</span>
                  <span className="text-base sm:text-lg font-bold text-emerald-950 font-mono">{student.sgpa.toFixed(2)}</span>
                </div>
              )}

              {student.cgpa && (
                <div className="border-l border-emerald-200 pl-4 sm:pl-6">
                  <span className="text-[11px] text-emerald-800 font-semibold uppercase block">CGPA</span>
                  <span className="text-base sm:text-lg font-bold text-emerald-950 font-mono">{student.cgpa.toFixed(2)}</span>
                </div>
              )}
            </div>
          </div>



        </div>
      </main>
    </div>
  );
};
