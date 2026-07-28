import React, { useState, useEffect } from 'react';
import { Search, AlertCircle, GraduationCap, ShieldCheck, RefreshCw } from 'lucide-react';

interface SearchFormProps {
  onSearch: (
    hallTicket: string,
    department?: string,
    course?: string,
    exam?: string,
    year?: string
  ) => void;
  onOpenCreateModal: () => void;
}

export const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [hallTicketInput, setHallTicketInput] = useState<string>('');
  const [department, setDepartment] = useState<string>('Select Department');
  const [course, setCourse] = useState<string>('');
  const [exam, setExam] = useState<string>('Regular');
  const [selectedYear, setSelectedYear] = useState<string>('2026');
  const [captchaCode, setCaptchaCode] = useState<string>('7B9K4');
  const [userCaptcha, setUserCaptcha] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchStatusText, setSearchStatusText] = useState<string>('');

  const isCourseDisabled = department === 'SSLC' || department === 'HSE' || department === 'Select Department';

  // Get available course list dynamically based on selected Department
  const getCourseOptions = () => {
    switch (department) {
      case 'Under Graduation':
        return [
          { label: 'Select Course', value: '' },
          { label: 'B.Com (Computer Application)', value: 'BCOM_CA' },
          { label: 'B.Com (General)', value: 'BCOM_GEN' },
          { label: 'B.Sc (Computer Science)', value: 'BSC_CS' },
          { label: 'B.Sc (Mathematics, Physics, Chemistry)', value: 'BSC_MPC' },
          { label: 'B.Sc (Botany, Zoology, Chemistry)', value: 'BSC_BZC' },
          { label: 'B.A (History, Economics, Political Science)', value: 'BA' },
          { label: 'B.B.A (Bachelor of Business Administration)', value: 'BBA' },
          { label: 'B.C.A (Bachelor of Computer Applications)', value: 'BCA' },
        ];
      case 'P G & Professional Courses':
        return [
          { label: 'Select Course', value: '' },
          { label: 'M.Com (Master of Commerce)', value: 'MCOM' },
          { label: 'M.Sc (Computer Science)', value: 'MSC_CS' },
          { label: 'M.Sc (Organic Chemistry)', value: 'MSC_CHEM' },
          { label: 'M.Sc (Mathematics)', value: 'MSC_MATH' },
          { label: 'M.A (English Literature)', value: 'MA_ENG' },
          { label: 'M.A (Economics)', value: 'MA_ECO' },
          { label: 'M.B.A (Master of Business Administration)', value: 'MBA' },
          { label: 'M.C.A (Master of Computer Applications)', value: 'MCA' },
        ];
      case 'B. Tech & B. Arch':
        return [
          { label: 'Select Course', value: '' },
          { label: 'B.Tech (Computer Science & Engineering)', value: 'BTECH_CSE' },
          { label: 'B.Tech (Electronics & Communication Engg)', value: 'BTECH_ECE' },
          { label: 'B.Tech (Electrical & Electronics Engg)', value: 'BTECH_EEE' },
          { label: 'B.Tech (Civil Engineering)', value: 'BTECH_CIVIL' },
          { label: 'B.Tech (Mechanical Engineering)', value: 'BTECH_MECH' },
          { label: 'B.Tech (Information Technology)', value: 'BTECH_IT' },
          { label: 'B.Arch (Bachelor of Architecture)', value: 'BARCH' },
        ];
      case 'M. Tech':
        return [
          { label: 'Select Course', value: '' },
          { label: 'M.Tech (Computer Science & Engineering)', value: 'MTECH_CSE' },
          { label: 'M.Tech (VLSI & Embedded Systems)', value: 'MTECH_VLSI' },
          { label: 'M.Tech (Structural Engineering)', value: 'MTECH_STRUCT' },
          { label: 'M.Tech (Power Electronics)', value: 'MTECH_POWER' },
          { label: 'M.Tech (CAD / CAM)', value: 'MTECH_CAD' },
        ];
      case 'Pharmacy':
        return [
          { label: 'Select Course', value: '' },
          { label: 'B.Pharmacy (Bachelor of Pharmacy)', value: 'BPHARM' },
          { label: 'M.Pharmacy (Pharmaceutics)', value: 'MPHARM' },
          { label: 'Pharm.D (Doctor of Pharmacy)', value: 'PHARMD' },
        ];
      case 'SSLC':
      case 'HSE':
        return [{ label: 'Not Applicable for SSLC / HSE', value: 'NA' }];
      default:
        return [{ label: 'Select Department First', value: '' }];
    }
  };

  // Automatically adjust selected course when department changes
  useEffect(() => {
    if (department === 'SSLC' || department === 'HSE') {
      setCourse('NA');
    } else {
      setCourse('');
    }
  }, [department]);

  // Generate array of years from 2026 down to 1990
  const yearOptions = Array.from({ length: 2026 - 1990 + 1 }, (_, i) => (2026 - i).toString());

  // Generate random 5-character captcha code
  const generateCaptcha = () => {
    const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
    let code = '';
    for (let i = 0; i < 5; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(code);
    setUserCaptcha('');
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!hallTicketInput.trim()) {
      setErrorMsg('Please enter a valid Hall Ticket Number');
      return;
    }

    if (userCaptcha.trim().toUpperCase() !== captchaCode.toUpperCase()) {
      setErrorMsg('Security Captcha Code does not match. Please enter the correct code.');
      return;
    }

    setErrorMsg('');
    setIsSearching(true);
    setSearchStatusText('Connecting to Acharya Nagarjuna University Examination Portal...');

    // Only proceed to result if Department is HSE AND Year is 2017; otherwise keep loading continuously ("2017 years select karay to hi result ana werna sirf load hona")
    if (department !== 'HSE' || selectedYear !== '2017') {
      if (department !== 'HSE' && selectedYear !== '2017') {
        setSearchStatusText(
          'Searching Database... Please select HSE (11 / 12th Class) Department and Year 2017 to load result.'
        );
      } else if (department !== 'HSE') {
        setSearchStatusText(
          department === 'Select Department'
            ? 'Searching Examination Database... Please select Department (Only HSE results for 2017 are active).'
            : `Searching Examination Portal Database for ${department}... Results pending publication. Please select HSE (11 / 12th Class) and Year 2017 to view result.`
        );
      } else {
        setSearchStatusText(
          `Searching Examination Portal Database for Year ${selectedYear}... Results pending publication. Please select Year 2017 to view result.`
        );
      }
      return;
    }

    // Step-by-step progress simulation before displaying result
    setTimeout(() => {
      setSearchStatusText(`Fetching Marksheet Record for Hall Ticket ${hallTicketInput.trim()}...`);
    }, 600);

    setTimeout(() => {
      onSearch(
        hallTicketInput.trim(),
        department,
        course,
        exam,
        selectedYear
      );
      setIsSearching(false);
    }, 1400);
  };

  if (isSearching) {
    return (
      <div className="bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden">
        <div className="bg-[#164E80] text-white px-5 py-3.5 flex items-center justify-between border-b border-sky-900">
          <div className="flex items-center gap-2.5">
            <GraduationCap className="w-5 h-5 text-amber-300" />
            <h3 className="font-bold text-base sm:text-lg font-sans">Student Result Processing</h3>
          </div>
        </div>

        <div className="p-8 sm:p-12 text-center flex flex-col items-center justify-center min-h-[360px]">
          <div className="relative mb-6">
            <div className="w-16 h-16 border-4 border-sky-100 border-t-[#164E80] rounded-full animate-spin"></div>
            <RefreshCw className="w-6 h-6 text-[#164E80] absolute inset-0 m-auto animate-pulse" />
          </div>

          <h4 className="text-base font-bold text-gray-900 mb-2">
            Searching &amp; Validating Marksheet Data
          </h4>
          
          <p className="text-xs sm:text-sm text-sky-800 font-mono font-medium max-w-md bg-sky-50 px-4 py-2 rounded border border-sky-200 mb-5 animate-pulse">
            {searchStatusText || 'Connecting to Examination Server...'}
          </p>

          <div className="w-full max-w-xs bg-gray-200 rounded-full h-2 mb-5 overflow-hidden">
            <div className="bg-[#164E80] h-2 rounded-full animate-pulse w-3/4"></div>
          </div>

          <p className="text-xs text-gray-600 mb-5">
            Hall Ticket No: <strong className="font-mono text-gray-800">{hallTicketInput}</strong> | Department: <strong className="text-gray-800">{department}</strong> | Year: <strong className="text-gray-800">{selectedYear}</strong>
          </p>

          {(department !== 'HSE' || selectedYear !== '2017') && (
            <p className="text-xs font-semibold text-amber-800 bg-amber-50 p-2.5 rounded border border-amber-200 mb-5">
              ⚠️ Active marksheet records are currently published for <strong>HSE (11 / 12th Class)</strong> in Examination Year <strong>2017</strong>. Please select HSE and Year 2017 to submit and view your result sheet.
            </p>
          )}

          <button
            type="button"
            onClick={() => {
              setIsSearching(false);
              setSearchStatusText('');
            }}
            className="px-5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs font-bold rounded shadow transition-colors cursor-pointer"
          >
            Cancel / Edit Inputs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden">
      {/* Top Title Banner */}
      <div className="bg-[#164E80] text-white px-5 py-3.5 flex items-center justify-between border-b border-sky-900">
        <div className="flex items-center gap-2.5">
          <GraduationCap className="w-5 h-5 text-amber-300" />
          <div>
            <h3 className="font-bold text-base sm:text-lg font-sans leading-tight">
              Student Examination Marks Portal
            </h3>
            <p className="text-[11px] text-sky-200 font-medium hidden sm:block">
              Official Online Marksheet &amp; Result Verification Portal
            </p>
          </div>
        </div>
        <span className="text-xs bg-sky-950 text-sky-200 px-2.5 py-1 rounded border border-sky-700 font-mono font-semibold">
          Session {selectedYear}
        </span>
      </div>

      <div className="p-5 sm:p-7">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 1) Hall Ticket No */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Hall Ticket No <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                id="input-hallticket"
                value={hallTicketInput}
                onChange={(e) => {
                  setHallTicketInput(e.target.value.toUpperCase());
                  if (errorMsg) setErrorMsg('');
                }}
                placeholder="Enter Hall Ticket No"
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-md p-3 pr-10 uppercase tracking-wider font-mono font-bold focus:ring-2 focus:ring-[#164E80] focus:border-[#164E80] focus:bg-white transition-all outline-none"
              />
              {hallTicketInput && (
                <button
                  type="button"
                  onClick={() => setHallTicketInput('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs bg-gray-200 hover:bg-gray-300 rounded-full w-5 h-5 flex items-center justify-center font-bold"
                >
                  ×
                </button>
              )}
            </div>
          </div>

          {/* 2) Select Department */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Select Department <span className="text-red-600">*</span>
            </label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md p-2.5 focus:ring-2 focus:ring-[#164E80] focus:border-[#164E80] focus:bg-white transition-all outline-none font-medium"
            >
              <option value="Select Department">Select Department</option>
              <option value="SSLC">SSLC (Secondary School Leaving Certificate)</option>
              <option value="HSE">HSE (11 / 12th Class)</option>
              <option value="Under Graduation">Under Graduation</option>
              <option value="P G & Professional Courses">P G &amp; Professional Courses</option>
              <option value="B. Tech & B. Arch">B. Tech &amp; B. Arch</option>
              <option value="M. Tech">M. Tech</option>
              <option value="Pharmacy">Pharmacy</option>
            </select>
          </div>

          {/* 3) Select Course */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 flex items-center justify-between">
              <span>Select Course <span className="text-red-600">*</span></span>
              {isCourseDisabled && (department === 'SSLC' || department === 'HSE') && (
                <span className="text-[11px] text-amber-700 font-semibold lowercase font-sans">
                  (not applicable for {department})
                </span>
              )}
            </label>
            <select
              value={course}
              disabled={isCourseDisabled}
              onChange={(e) => setCourse(e.target.value)}
              className={`w-full text-sm rounded-md p-2.5 transition-all outline-none font-medium border ${
                isCourseDisabled
                  ? 'bg-gray-100 border-gray-200 text-gray-500 cursor-not-allowed opacity-80'
                  : 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-2 focus:ring-[#164E80] focus:border-[#164E80] focus:bg-white'
              }`}
            >
              {getCourseOptions().map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* 4) Select Exam */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Select Exam <span className="text-red-600">*</span>
            </label>
            <select
              value={exam}
              onChange={(e) => setExam(e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md p-2.5 focus:ring-2 focus:ring-[#164E80] focus:border-[#164E80] focus:bg-white transition-all outline-none font-medium"
            >
              <option value="Regular">Regular Examinations</option>
              <option value="Supplementary">Supplementary Examinations</option>
              <option value="Revaluation">Revaluation &amp; Personal Verification Results</option>
              <option value="Special">Special Examinations / Improvement</option>
            </select>
          </div>

          {/* 5) Select Year (1990 to 2026) */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Select Year <span className="text-red-600">*</span>
            </label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md p-2.5 focus:ring-2 focus:ring-[#164E80] focus:border-[#164E80] focus:bg-white transition-all outline-none font-medium"
            >
              {yearOptions.map((yr) => (
                <option key={yr} value={yr}>
                  {yr}
                </option>
              ))}
            </select>
          </div>

          {/* Security Captcha Code */}
          <div className="p-3.5 bg-gray-50 border border-gray-200 rounded-md">
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#164E80]" />
              Enter Security Code (Captcha) <span className="text-red-600">*</span>
            </label>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Visual Captcha Display Box */}
              <div className="flex items-center gap-2">
                <div className="px-4 py-2 bg-gradient-to-r from-sky-900 to-slate-900 text-amber-300 font-mono font-black text-lg tracking-widest rounded select-none border border-sky-950 shadow-inner italic flex items-center justify-center min-w-[130px]">
                  {captchaCode}
                </div>
                <button
                  type="button"
                  onClick={generateCaptcha}
                  title="Generate new captcha code"
                  className="p-2 text-gray-600 hover:text-[#164E80] hover:bg-sky-100 rounded transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>

              {/* Captcha Input */}
              <input
                type="text"
                value={userCaptcha}
                onChange={(e) => {
                  setUserCaptcha(e.target.value.toUpperCase());
                  if (errorMsg) setErrorMsg('');
                }}
                placeholder="Enter Code Shown Above"
                className="flex-1 bg-white border border-gray-300 text-gray-900 text-sm rounded-md p-2.5 uppercase font-mono font-bold tracking-wider focus:ring-2 focus:ring-[#164E80] focus:border-[#164E80] outline-none"
              />
            </div>
          </div>

          {errorMsg && (
            <p className="p-2.5 text-xs font-semibold text-red-700 bg-red-50 border border-red-200 rounded flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
              {errorMsg}
            </p>
          )}

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              id="btn-submit-search"
              className="w-full inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#164E80] hover:bg-[#0f385e] text-white font-bold text-sm rounded-md shadow transition-all cursor-pointer"
            >
              <Search className="w-4 h-4" />
              Submit / Get Result
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


