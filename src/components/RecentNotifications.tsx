import React from 'react';
import { ExamNotification } from '../types';
import { Bell, FileText, Sparkles } from 'lucide-react';

interface RecentNotificationsProps {
  notifications: ExamNotification[];
  onSelectSample: (ht: string) => void;
}

export const RecentNotifications: React.FC<RecentNotificationsProps> = ({
  notifications,
  onSelectSample,
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-2xs overflow-hidden">
      {/* Header */}
      <div className="bg-[#164E80] text-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 font-semibold text-sm sm:text-base">
          <Bell className="w-4 h-4 text-amber-300 animate-pulse" />
          <span>Latest Examination Results & Notifications</span>
        </div>
        <span className="text-xs bg-amber-400 text-gray-900 px-2 py-0.5 rounded font-bold uppercase">
          July 2026
        </span>
      </div>

      {/* Notifications List */}
      <div className="divide-y divide-gray-100 max-h-[460px] overflow-y-auto">
        {notifications.map((item) => (
          <div
            key={item.id}
            className="p-3.5 bg-white flex items-start gap-3"
          >
            <FileText className="w-4 h-4 text-[#164E80] mt-0.5 flex-shrink-0" />
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                {item.isNew && (
                  <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 bg-red-600 text-white text-[10px] font-bold rounded uppercase">
                    <Sparkles className="w-2.5 h-2.5" /> NEW
                  </span>
                )}
                <span className="text-[11px] font-semibold text-sky-800 bg-sky-100 px-1.5 py-0.2 rounded">
                  {item.category}
                </span>
                <span className="text-xs text-gray-400 font-mono">
                  {item.date}
                </span>
              </div>

              <h4 className="text-xs sm:text-sm font-medium text-gray-800 leading-snug">
                {item.title}
              </h4>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Access Footer */}
      <div className="bg-gray-50 border-t border-gray-200 p-3 text-center">
        <p className="text-xs text-gray-600 font-medium">
          Official Examination Cell Notifications &amp; Announcements
        </p>
      </div>
    </div>
  );
};
