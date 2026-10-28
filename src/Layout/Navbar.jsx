import { Bell, Search, UserRound } from 'lucide-react';

const roleTitles = {
  admin: 'Admin Overview',
  teacher: 'Teacher Overview',
  student: 'Student Overview',
};

export default function Navbar({ role }) {
  return (
    <header className="flex items-center justify-between gap-4 border-b border-gray-200 bg-white px-6 py-4">
      <div>
        <h2 className="text-lg font-bold text-[#0B1F4D]">Digital Attendance</h2>
        <p className="text-xs text-gray-500">{roleTitles[role] || 'Dashboard'}</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 sm:flex">
          <Search size={18} className="text-gray-500" />
          <input
            placeholder="Search..."
            className="w-28 bg-transparent text-sm outline-none"
          />
        </div>

        <button
          aria-label="Notifications"
          className="rounded-lg p-2 text-gray-600 transition hover:bg-gray-100"
        >
          <Bell size={21} />
        </button>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0B1F4D] text-white">
          <UserRound size={21} />
        </div>
      </div>
    </header>
  );
}
