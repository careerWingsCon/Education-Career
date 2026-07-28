import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { initAuth, googleSignIn, logout, getAccessToken } from '../lib/auth';
import { listDriveFiles, uploadFileToDrive, deleteDriveFile, DriveFile } from '../lib/drive';
import { StudentResult } from '../types';
import { HardDrive, Upload, Trash2, ExternalLink, RefreshCw, LogOut, CheckCircle2, AlertCircle, FileText } from 'lucide-react';

interface GoogleDriveManagerProps {
  currentStudent?: StudentResult | null;
}

export const GoogleDriveManager: React.FC<GoogleDriveManagerProps> = ({ currentStudent }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [files, setFiles] = useState<DriveFile[]>([]);
  const [isLoadingFiles, setIsLoadingFiles] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = initAuth(
      (currentUser, accessToken) => {
        setUser(currentUser);
        setToken(accessToken);
        fetchDriveFiles(accessToken);
      },
      () => {
        setUser(null);
        setToken(null);
        setFiles([]);
      }
    );
    return () => unsubscribe();
  }, []);

  const fetchDriveFiles = async (accessToken?: string) => {
    const activeToken = accessToken || token || getAccessToken();
    if (!activeToken) return;

    setIsLoadingFiles(true);
    try {
      const driveFiles = await listDriveFiles(activeToken);
      setFiles(driveFiles);
    } catch (error: any) {
      console.error(error);
      setStatusMessage({ type: 'error', text: 'Failed to load Google Drive files. Please sign in again.' });
    } finally {
      setIsLoadingFiles(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoggingIn(true);
    setStatusMessage(null);
    try {
      const res = await googleSignIn();
      if (res) {
        setUser(res.user);
        setToken(res.accessToken);
        setStatusMessage({ type: 'success', text: `Signed in successfully as ${res.user.displayName || res.user.email}!` });
        await fetchDriveFiles(res.accessToken);
      }
    } catch (error: any) {
      setStatusMessage({ type: 'error', text: `Google Sign-In failed: ${error.message}` });
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleSignOut = async () => {
    await logout();
    setUser(null);
    setToken(null);
    setFiles([]);
    setStatusMessage({ type: 'info', text: 'Signed out from Google Drive.' });
  };

  const handleSaveMarksheetToDrive = async () => {
    if (!currentStudent) return;
    const activeToken = token || getAccessToken();
    if (!activeToken) {
      setStatusMessage({ type: 'error', text: 'Please sign in with Google first to save to Drive.' });
      return;
    }

    setIsUploading(true);
    setStatusMessage(null);

    try {
      const fileName = `Kerala_Board_Marksheet_${currentStudent.hallTicketNo}_${currentStudent.studentName.replace(/\s+/g, '_')}.html`;
      
      const subjectRowsHtml = currentStudent.subjects
        .map(
          (s) =>
            `<tr>
              <td style="padding: 8px; border: 1px solid #ddd;">${s.sl}</td>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>${s.subjectName}</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${s.subjectCode}</td>
              <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${s.total}</td>
              <td style="padding: 8px; border: 1px solid #ddd; text-align: center; color: #15803d; font-weight: bold;">${s.grade}</td>
            </tr>`
        )
        .join('');

      const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Marksheet - ${currentStudent.studentName}</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 800px; margin: 0 auto; }
    .header { text-align: center; border-bottom: 2px solid #0B387A; padding-bottom: 15px; margin-bottom: 20px; }
    .header h1 { color: #0B387A; margin: 0; font-size: 24px; }
    .header p { color: #2B7B38; font-weight: bold; margin: 5px 0 0 0; }
    .student-info { background: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0; margin-bottom: 20px; }
    .student-info table { width: 100%; border-collapse: collapse; }
    .student-info td { padding: 6px 0; }
    table.marks { width: 100%; border-collapse: collapse; margin-top: 15px; }
    table.marks th { background: #0B387A; color: white; padding: 10px; text-align: left; }
    .result-badge { background: #dcfce7; color: #166534; padding: 10px; font-weight: bold; text-align: center; border-radius: 6px; margin-top: 20px; font-size: 16px; }
  </style>
</head>
<body>
  <div class="header">
    <h1>KERALA BOARD UN EDU</h1>
    <p>Official Higher Secondary Examination Result Sheet (${currentStudent.year})</p>
  </div>
  <div class="student-info">
    <table>
      <tr><td><strong>Student Name:</strong> ${currentStudent.studentName}</td><td><strong>Register / Hall Ticket No:</strong> ${currentStudent.hallTicketNo}</td></tr>
      <tr><td><strong>Father Name:</strong> ${currentStudent.fatherName}</td><td><strong>Department:</strong> ${currentStudent.department}</td></tr>
      <tr><td><strong>Course:</strong> ${currentStudent.course}</td><td><strong>Declaration Date:</strong> ${currentStudent.declarationDate}</td></tr>
    </table>
  </div>
  <h3>Subject Marks Breakdown</h3>
  <table class="marks">
    <thead>
      <tr><th>#</th><th>Subject Name</th><th>Code</th><th>Total Score</th><th>Grade</th></tr>
    </thead>
    <tbody>
      ${subjectRowsHtml}
    </tbody>
  </table>
  <div class="result-badge">
    STATUS: ${currentStudent.resultStatus}
  </div>
</body>
</html>
      `;

      const uploaded = await uploadFileToDrive(activeToken, fileName, 'text/html', htmlContent);
      setStatusMessage({
        type: 'success',
        text: `Marksheet successfully saved to your Google Drive! (${uploaded.name})`,
      });
      await fetchDriveFiles(activeToken);
    } catch (err: any) {
      console.error(err);
      setStatusMessage({ type: 'error', text: `Failed to save marksheet: ${err.message}` });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteFile = async (fileId: string, fileName: string) => {
    const activeToken = token || getAccessToken();
    if (!activeToken) return;

    try {
      await deleteDriveFile(activeToken, fileId);
      setStatusMessage({ type: 'info', text: `Deleted file "${fileName}" from Google Drive.` });
      setDeleteConfirmId(null);
      await fetchDriveFiles(activeToken);
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: `Failed to delete file: ${err.message}` });
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs mb-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 bg-blue-50 text-blue-700 rounded-lg">
            <HardDrive className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
              Google Drive Integration
              <span className="text-[10px] font-semibold uppercase px-2 py-0.5 bg-green-100 text-green-800 rounded-full">
                Active
              </span>
            </h3>
            <p className="text-xs text-slate-500">
              Save result sheets directly to your Google Drive account
            </p>
          </div>
        </div>

        {user ? (
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-xs font-bold text-slate-800">{user.displayName || 'Google User'}</p>
              <p className="text-[11px] text-slate-500">{user.email}</p>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign Out
            </button>
          </div>
        ) : (
          <button
            onClick={handleGoogleSignIn}
            disabled={isLoggingIn}
            className="inline-flex items-center justify-center gap-3 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs px-4 py-2.5 rounded-lg border border-slate-300 shadow-xs transition-all disabled:opacity-50"
          >
            <svg className="w-4 h-4" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
            </svg>
            {isLoggingIn ? 'Connecting...' : 'Sign in with Google'}
          </button>
        )}
      </div>

      {statusMessage && (
        <div
          className={`mt-3 p-3 rounded-lg text-xs flex items-center gap-2 ${
            statusMessage.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : statusMessage.type === 'error'
              ? 'bg-rose-50 text-rose-800 border border-rose-200'
              : 'bg-blue-50 text-blue-800 border border-blue-200'
          }`}
        >
          {statusMessage.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Save Current Marksheet Action Button */}
      {currentStudent && user && (
        <div className="mt-4 p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between gap-3">
          <div className="text-xs">
            <span className="font-semibold text-slate-700">Save current result sheet for: </span>
            <span className="font-bold text-blue-900">{currentStudent.studentName} ({currentStudent.hallTicketNo})</span>
          </div>
          <button
            onClick={handleSaveMarksheetToDrive}
            disabled={isUploading}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-blue-700 hover:bg-blue-800 text-white font-medium text-xs rounded-lg shadow-xs transition-all disabled:opacity-50 shrink-0"
          >
            <Upload className="w-3.5 h-3.5" />
            {isUploading ? 'Saving...' : 'Save Marksheet to Drive'}
          </button>
        </div>
      )}

      {/* Google Drive Files List */}
      {user && (
        <div className="mt-5">
          <div className="flex items-center justify-between mb-2.5">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-blue-600" />
              Your Google Drive Files ({files.length})
            </h4>
            <button
              onClick={() => fetchDriveFiles()}
              disabled={isLoadingFiles}
              className="text-xs text-blue-700 hover:text-blue-900 font-medium flex items-center gap-1"
            >
              <RefreshCw className={`w-3 h-3 ${isLoadingFiles ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>

          {isLoadingFiles ? (
            <div className="py-6 text-center text-xs text-slate-500">
              Loading Google Drive files...
            </div>
          ) : files.length === 0 ? (
            <div className="py-6 text-center text-xs text-slate-400 border border-dashed border-slate-200 rounded-lg">
              No files found in Google Drive. Click "Save Marksheet to Drive" to export a result sheet!
            </div>
          ) : (
            <div className="divide-y divide-slate-100 border border-slate-200 rounded-lg max-h-56 overflow-y-auto">
              {files.map((file) => (
                <div key={file.id} className="p-2.5 hover:bg-slate-50 flex items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <FileText className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="font-medium text-slate-800 truncate" title={file.name}>
                      {file.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {file.webViewLink && (
                      <a
                        href={file.webViewLink}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1 text-slate-500 hover:text-blue-600 transition-colors"
                        title="View in Google Drive"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}

                    {deleteConfirmId === file.id ? (
                      <div className="flex items-center gap-1 bg-red-50 p-1 rounded border border-red-200">
                        <span className="text-[10px] text-red-700 font-bold">Delete?</span>
                        <button
                          onClick={() => handleDeleteFile(file.id, file.name)}
                          className="px-1.5 py-0.5 bg-red-600 text-white text-[10px] rounded font-bold"
                        >
                          Yes
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(null)}
                          className="px-1.5 py-0.5 bg-slate-200 text-slate-700 text-[10px] rounded font-bold"
                        >
                          No
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeleteConfirmId(file.id)}
                        className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                        title="Delete from Drive"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
