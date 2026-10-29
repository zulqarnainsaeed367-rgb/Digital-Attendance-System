import { useState } from 'react';
import { GraduationCap, Lock, Mail, UserRound } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getUserRolePath } from '../services/mockAuth';

export default function Signup() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('student');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSignup(event) {
    event.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      setIsSubmitting(true);
      const newUser = await register(name, email, password, role);
      navigate(getUserRolePath(newUser.role), { replace: true });
    } catch (signupError) {
      setError(signupError.message || 'Unable to create your account. Please try again.');
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

        <h1 className="text-center text-3xl font-bold text-[#0B1F4D]">Create Account</h1>
        <p className="mt-2 text-center text-sm text-gray-500">Join Digital Attendance System</p>

        <form onSubmit={handleSignup} className="mt-8 space-y-5">
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-semibold text-gray-700">
              Full Name
            </label>
            <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 focus-within:border-[#0B1F4D]">
              <UserRound size={19} className="text-gray-400" />
              <input
                id="name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Your full name"
                className="w-full py-3 outline-none"
                autoComplete="name"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="signup-email" className="mb-2 block text-sm font-semibold text-gray-700">
              Email Address
            </label>
            <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 focus-within:border-[#0B1F4D]">
              <Mail size={19} className="text-gray-400" />
              <input
                id="signup-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="w-full py-3 outline-none"
                autoComplete="email"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="signup-role" className="mb-2 block text-sm font-semibold text-gray-700">
              Register As
            </label>
            <select
              id="signup-role"
              value={role}
              onChange={(event) => setRole(event.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#0B1F4D]"
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>

          <div>
            <label htmlFor="signup-password" className="mb-2 block text-sm font-semibold text-gray-700">
              Password
            </label>
            <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 focus-within:border-[#0B1F4D]">
              <Lock size={19} className="text-gray-400" />
              <input
                id="signup-password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="At least 6 characters"
                className="w-full py-3 outline-none"
                autoComplete="new-password"
                minLength={6}
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="confirm-password" className="mb-2 block text-sm font-semibold text-gray-700">
              Confirm Password
            </label>
            <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 focus-within:border-[#0B1F4D]">
              <Lock size={19} className="text-gray-400" />
              <input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="Enter your password again"
                className="w-full py-3 outline-none"
                autoComplete="new-password"
                required
              />
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
            {isSubmitting ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-[#0B1F4D] hover:underline">
            Log in
          </Link>
        </p>
        <p className="mt-3 text-center text-xs text-gray-500">
          Admin accounts are created by the system administrator.
        </p>
      </div>
    </div>
  );
}
