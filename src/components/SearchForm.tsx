import React, { useState, useEffect } from 'react';
import { Search, AlertCircle, RotateCw, RefreshCw } from 'lucide-react';

interface SearchFormProps {
  onSearch: (
    hallTicket: string,
    department?: string,
    course?: string,
    exam?: string,
    year?: string
  ) => void;
  onOpenCreateModal?: () => void;
}

export const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [hallTicketInput, setHallTicketInput] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('2026');
  const [captchaCode, setCaptchaCode] = useState<string>('AJ75KE');
  const [userCaptcha, setUserCaptcha] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchStatusText, setSearchStatusText] = useState<string>('');

  // Generate array of years from 2026 down to 1990
  const yearOptions = Array.from({ length: 2026 - 1990 + 1 }, (_, i) => (2026 - i).toString());

  // Generate random 6-character captcha code
  const generateCaptcha = () => {
    const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
    let code = '';
    for (let i = 0; i < 6; i++) {
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
    
    const regNum = hallTicketInput.trim();

    if (!regNum) {
      setErrorMsg('Please enter a valid Registration Number');
      return;
    }

    if (userCaptcha.trim().toUpperCase() !== captchaCode.toUpperCase()) {
      setErrorMsg('Security Check code does not match. Please enter the correct text.');
      return;
    }

    setErrorMsg('');
    setIsSearching(true);
    setSearchStatusText('Connecting to Examination Server...');

    // If selected year is not 2017, stay in endless loading state ("sirf load hotay rehna")
    if (selectedYear !== '2017') {
      setTimeout(() => {
        setSearchStatusText(
          `Searching Examination Database for Reg No. ${regNum}... Records are published for Year 2017. Please select Examination Year 2017.`
        );
      }, 1200);
      return;
    }

    // When year 2017 is selected:
    setTimeout(() => {
      setSearchStatusText('Fetching official HSE 2017 examination results...');
    }, 600);

    setTimeout(() => {
      onSearch(
        regNum,
        'HSE',
        'Commerce',
        'Regular',
        '2017'
      );
      setIsSearching(false);
    }, 1200);
  };

  if (isSearching) {
    return (
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-xs max-w-4xl mx-auto text-center flex flex-col items-center justify-center min-h-[380px]">
        <div className="relative mb-6">
          <div className="w-16 h-16 border-4 border-blue-100 border-t-[#18326a] rounded-full animate-spin" />
          <RefreshCw className="w-6 h-6 text-[#18326a] absolute inset-0 m-auto animate-pulse" />
        </div>

        <h4 className="text-lg font-bold text-slate-900 mb-2">
          Fetching Official Examination Result
        </h4>
        
        <p className="text-xs sm:text-sm text-blue-900 font-medium bg-blue-50/80 px-5 py-2.5 rounded-xl border border-blue-200/70 mb-5 animate-pulse">
          {searchStatusText || 'Connecting to Examination Server...'}
        </p>

        <p className="text-xs text-slate-500 mb-5">
          Register No: <strong className="font-mono text-slate-800">{hallTicketInput}</strong>
        </p>

        <button
          type="button"
          onClick={() => {
            setIsSearching(false);
            setSearchStatusText('');
          }}
          className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-full transition-colors cursor-pointer"
        >
          Cancel / Edit Input
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200/80 shadow-xs max-w-4xl mx-auto text-left">
      {/* Top Pill / Badge */}
      <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-blue-50/90 border border-blue-200/70 text-blue-900 text-[11px] font-bold tracking-wider uppercase mb-3">
        CHECK RESULT
      </div>

      {/* Main Title & Subtitle */}
      <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1a2b4c] tracking-tight">
        HSE Second Year March Examinations {selectedYear}
      </h2>
      <p className="text-xs sm:text-sm text-slate-500 mt-1.5 mb-8 leading-relaxed">
        Enter the student details exactly as recorded in the examination register to fetch the official result.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Row 1: Registration Number & Examination Year */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          {/* Registration Number */}
          <div>
            <label className="block text-sm font-bold text-[#1a2b4c] mb-1.5">
              Registration Number
            </label>
            <input
              type="text"
              id="input-hallticket"
              value={hallTicketInput}
              onChange={(e) => {
                setHallTicketInput(e.target.value.toUpperCase());
                if (errorMsg) setErrorMsg('');
              }}
              placeholder=""
              className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 text-sm focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 outline-none transition-all font-mono"
            />
            <p className="text-xs text-slate-400 mt-1.5">
              Enter your 8-digit registration number.
            </p>
          </div>

          {/* Examination Year (1990 to 2026) */}
          <div>
            <label className="block text-sm font-bold text-[#1a2b4c] mb-1.5">
              Examination Year
            </label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 text-sm focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 outline-none transition-all font-medium cursor-pointer"
            >
              {yearOptions.map((yr) => (
                <option key={yr} value={yr}>
                  {yr}
                </option>
              ))}
            </select>
            <p className="text-xs text-slate-400 mt-1.5">
              Select examination year (1990 - 2026).
            </p>
          </div>
        </div>

        {/* Row 2: Security Check */}
        <div>
          <label className="block text-sm font-bold text-[#1a2b4c] mb-1.5">
            Security Check
          </label>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Styled Captcha Display Box */}
            <div className="relative overflow-hidden bg-slate-100 border border-slate-300 rounded-xl px-5 py-2.5 flex items-center justify-center select-none min-w-[140px] h-[48px]">
              {/* Scratch lines background */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30" viewBox="0 0 140 48">
                <line x1="10" y1="38" x2="130" y2="10" stroke="#000" strokeWidth="1.5" />
                <line x1="15" y1="12" x2="125" y2="40" stroke="#000" strokeWidth="1.5" />
                <line x1="5" y1="24" x2="135" y2="24" stroke="#000" strokeWidth="1" />
              </svg>
              <span className="font-serif font-black text-xl tracking-[0.25em] text-slate-800 italic relative z-10 skew-x-[-8deg]">
                {captchaCode.split('').join(' ')}
              </span>
            </div>

            {/* Refresh Button */}
            <button
              type="button"
              onClick={generateCaptcha}
              className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-white border border-slate-300 hover:bg-slate-50 text-[#18326a] font-bold text-xs rounded-xl shadow-2xs transition-colors h-[48px] cursor-pointer"
            >
              <RotateCw className="w-3.5 h-3.5 text-[#18326a]" />
              Refresh
            </button>

            {/* Captcha Text Input */}
            <input
              type="text"
              value={userCaptcha}
              onChange={(e) => {
                setUserCaptcha(e.target.value.toUpperCase());
                if (errorMsg) setErrorMsg('');
              }}
              placeholder=""
              className="flex-1 bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 text-sm focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 outline-none transition-all font-mono uppercase h-[48px]"
            />
          </div>
          <p className="text-xs text-slate-400 mt-1.5">
            Enter the text shown in the image before continuing.
          </p>
        </div>

        {errorMsg && (
          <p className="p-3 text-xs font-semibold text-red-700 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
            {errorMsg}
          </p>
        )}

        {/* Buttons Row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4 pb-2">
          <button
            type="submit"
            id="btn-submit-search"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#18326a] hover:bg-[#122552] text-white font-bold text-sm rounded-full shadow-sm transition-all cursor-pointer"
          >
            <Search className="w-4 h-4 text-white" />
            Check Result
          </button>
        </div>
      </form>
    </div>
  );
};



