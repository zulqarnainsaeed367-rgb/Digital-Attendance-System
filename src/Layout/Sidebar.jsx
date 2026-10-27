
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  GraduationCap,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const menuItems = [
  { name: "Admin", path: "/admin", icon: LayoutDashboard },
  { name: "Teacher", path: "/teacher", icon: GraduationCap },
  { name: "Student", path: "/student", icon: GraduationCap },
];

export default function Sidebar() {
  const navigate = useNavigate();

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

      <p className="mb-3 text-xs uppercase tracking-wider text-blue-200">
        Dashboards
      </p>

      <nav className="flex gap-2 overflow-x-auto md:flex-1 md:flex-col md:gap-2">
        {menuItems.map(({ name, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            end
            className={({ isActive }) =>
              `flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
                isActive
                  ? "bg-[#F5C542] font-semibold text-[#0B1F4D]"
                  : "text-blue-100 hover:bg-white/10"
              }`
            }
          >
            <Icon size={19} />
            {name}
          </NavLink>
        ))}
      </nav>

      <button
        onClick={() => navigate("/")}
        className="mt-3 flex items-center gap-2 rounded-xl px-4 py-3 text-sm text-blue-100 hover:bg-white/10 md:mt-auto"
      >
        <LogOut size={19} />
        Back to Home
      </button>
    </aside>
  );
}
