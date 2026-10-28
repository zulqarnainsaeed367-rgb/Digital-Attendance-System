import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getUserRolePath } from '../services/mockAuth';

export default function ProtectedRoute({ allowedRoles = [] }) {
  const { user, isReady } = useAuth();

  if (!isReady) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F5F7FB] px-4 text-sm font-medium text-[#0B2E59]">
        Loading dashboard...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length && !allowedRoles.includes(user.role)) {
    return <Navigate to={getUserRolePath(user.role)} replace />;
  }

  return <Outlet />;
}
