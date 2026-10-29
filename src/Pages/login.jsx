import { useEffect, useState } from 'react';
import { Eye, EyeOff, GraduationCap, Lock, Mail } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { demoUsers, getUserRolePath } from '../services/mockAuth';

export default function Login() {
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      navigate(getUserRolePath(user.role), { replace: true });
    }
  }, [navigate, user]);

  async function handleLogin(event) {
    event.preventDefault();
    setError('');

    if (!role || !email.trim() || !password.trim()) {
      setError('Please choose a role and enter both email and password.');
      return;
    }

    try {
      setIsSubmitting(true);
      const authenticatedUser = await login(email, password, role);
      navigate(getUserRolePath(authenticatedUser.role), { replace: true });
    } catch (loginError) {
      setError(loginError.message || 'Unable to log in. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F5F7FB] p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl sm:p-8">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0B1F4D] text-[#F5C542]">
          <GraduationCap size={36} />
        </div>

        <h1 className="text-center text-3xl font-bold text-[#0B1F4D]">Welcome Back</h1>
        <p className="mt-2 text-center text-sm text-gray-500">Digital Attendance System</p>

        <form onSubmit={handleLogin} className="mt-8 space-y-5">
          <div>
            <label htmlFor="role" className="mb-2 block text-sm font-semibold text-gray-700">
              Login As
            </label>
            <select
              id="role"
              value={role}
              onChange={(event) => setRole(event.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#0B1F4D]"
              required
            >
              <option value="">Select your role</option>
              {[...new Set(demoUsers.map((item) => item.role))].map((itemRole) => (
                <option key={itemRole} value={itemRole}>
                  {itemRole.charAt(0).toUpperCase() + itemRole.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-semibold text-gray-700">
              Email Address
            </label>
            <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 focus-within:border-[#0B1F4D]">
              <Mail size={19} className="text-gray-400" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="w-full py-3 outline-none"
                autoComplete="email"
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
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                className="w-full py-3 outline-none"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                className="text-gray-500"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-[#0B1F4D] py-3.5 font-semibold text-white transition hover:bg-[#16346F] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? 'Logging in...' : 'Login to Dashboard'}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-gray-600">
          Don&apos;t have an account?{' '}
          <Link to="/signup" className="font-semibold text-[#0B1F4D] hover:underline">
            Sign up
          </Link>
        </p>

        <div className="mt-6 rounded-2xl bg-[#F5F7FB] p-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#0B1F4D]">
            Demo accounts
          </p>
          <ul className="space-y-2 text-sm text-gray-600">
            {demoUsers.map((item) => (
              <li key={item.email} className="flex items-center justify-between gap-3">
                <span className="font-medium capitalize">{item.role}</span>
                <span className="text-right text-xs">{item.email} / {item.password}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
