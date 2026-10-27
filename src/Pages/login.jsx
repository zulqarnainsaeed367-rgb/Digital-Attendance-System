
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GraduationCap, Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");

  function handleLogin(e) {
    e.preventDefault();
    navigate(`/${role}`);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F5F7FB] p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl sm:p-8">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0B1F4D] text-[#F5C542]">
          <GraduationCap size={36} />
        </div>

        <h1 className="text-center text-3xl font-bold text-[#0B1F4D]">
          Welcome Back
        </h1>
        <p className="mt-2 text-center text-sm text-gray-500">
          Digital Attendance System
        </p>

        <form onSubmit={handleLogin} className="mt-8 space-y-5">
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-semibold text-gray-700">
              Email Address
            </label>
            <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 focus-within:border-[#0B1F4D]">
              <Mail size={19} className="text-gray-400" />
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full py-3 outline-none"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-semibold text-gray-700">
              Password
            </label>
            <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 focus-within:border-[#0B1F4D]">
              <Lock size={19} className="text-gray-400" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full py-3 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-500"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="role" className="mb-2 block text-sm font-semibold text-gray-700">
              Demo role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-[#0B1F4D]"
            >
              <option value="admin">Admin</option>
              <option value="teacher">Teacher</option>
              <option value="student">Student</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-[#0B1F4D] py-3.5 font-semibold text-white transition hover:bg-[#16346F]"
          >
            Login to Dashboard
          </button>
        </form>

        <p className="mt-6 text-center text-xs leading-5 text-gray-500">
          Demo only: this frontend redirects by role and does not authenticate
          users or protect dashboard routes.
        </p>
      </div>
    </div>
  );
}
