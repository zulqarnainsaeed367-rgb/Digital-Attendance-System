import { NavLink, useNavigate } from 'react-router-dom';
import {
  BarChart3,
  BookOpen,
  CalendarCheck2,
  GraduationCap,
  LogOut,
  Users,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const roleMenus = {
  admin: [
    { name: 'Overview', path: '/admin-dashboard', icon: BarChart3 },
    { name: 'Students', path: '/admin-dashboard/students', icon: Users },
    { name: 'Teachers', path: '/admin-dashboard/teachers', icon: GraduationCap },
    { name: 'Classes', path: '/admin-dashboard/classes', icon: BookOpen },
    { name: 'Attendance', path: '/admin-dashboard/attendance', icon: CalendarCheck2 },
  ],
  teacher: [
    { name: 'Overview', path: '/teacher-dashboard', icon: BarChart3 },
    { name: 'Classes', path: '/teacher-dashboard/classes', icon: BookOpen },
    { name: 'Attendance', path: '/teacher-dashboard/attendance', icon: CalendarCheck2 },
    { name: 'Reports', path: '/teacher-dashboard/reports', icon: BarChart3 },
  ],
  student: [
    { name: 'Overview', path: '/student-dashboard', icon: BarChart3 },
    { name: 'Profile', path: '/student-dashboard/profile', icon: Users },
    { name: 'Attendance', path: '/student-dashboard/attendance', icon: CalendarCheck2 },
    { name: 'History', path: '/student-dashboard/history', icon: BookOpen },
  ],
};

export default function Sidebar({ role }) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const menuItems = roleMenus[role] || [];

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <aside className="flex w-full shrink-0 flex-col bg-[#0B1F4D] p-4 text-white md:min-h-screen md:w-64 md:p-5">
      <div className="mb-4 flex items-center gap-3 md:mb-8">
        <div className="rounded-xl bg-[#F5C542] p-2 text-[#0B1F4D]">
          <GraduationCap size={28} />
        </div>
        <div>
          <h2 className="font-bold">AttendEase</h2>
          <p className="text-xs text-blue-200">Attendance System</p>
        </div>
      </div>

      <p className="mb-3 text-xs uppercase tracking-wider text-blue-200">Menus</p>

      <nav className="flex gap-2 overflow-x-auto md:flex-1 md:flex-col md:gap-2">
        {menuItems.map(({ name, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
                isActive
                  ? 'bg-[#F5C542] font-semibold text-[#0B1F4D]'
                  : 'text-blue-100 hover:bg-white/10'
              }`
            }
          >
            <Icon size={19} />
            {name}
          </NavLink>
        ))}
      </nav>

      <button
        type="button"
        onClick={handleLogout}
        className="mt-3 flex items-center gap-2 rounded-xl px-4 py-3 text-sm text-blue-100 transition hover:bg-white/10 md:mt-auto"
      >
        <LogOut size={19} />
        Logout
      </button>
    </aside>
  );
}
