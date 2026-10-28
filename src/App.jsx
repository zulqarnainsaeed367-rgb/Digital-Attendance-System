import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import DashboardLayout from './Layout/DashboardLayout';
import Login from './Pages/login';
import AdminDashboard from './Pages/Admindashboard';
import TeacherDashboard from './Pages/TeacherDashboard';
import StudentDashboard from './Pages/studentDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { getUserRolePath } from './services/mockAuth';

function AppRoutes() {
  const { user, isReady } = useAuth();

  if (!isReady) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F5F7FB] text-sm font-medium text-[#0B2E59]">
        Loading application...
      </div>
    );
  }

  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={user ? getUserRolePath(user.role) : '/login'} replace />}
      />
      <Route
        path="/login"
        element={user ? <Navigate to={getUserRolePath(user.role)} replace /> : <Login />}
      />

      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route path="/admin-dashboard" element={<DashboardLayout role="admin" />}>
          <Route index element={<AdminDashboard />} />
          <Route path="students" element={<AdminDashboard />} />
          <Route path="teachers" element={<AdminDashboard />} />
          <Route path="classes" element={<AdminDashboard />} />
          <Route path="attendance" element={<AdminDashboard />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute allowedRoles={['teacher']} />}>
        <Route path="/teacher-dashboard" element={<DashboardLayout role="teacher" />}>
          <Route index element={<TeacherDashboard />} />
          <Route path="classes" element={<TeacherDashboard />} />
          <Route path="attendance" element={<TeacherDashboard />} />
          <Route path="reports" element={<TeacherDashboard />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute allowedRoles={['student']} />}>
        <Route path="/student-dashboard" element={<DashboardLayout role="student" />}>
          <Route index element={<StudentDashboard />} />
          <Route path="profile" element={<StudentDashboard />} />
          <Route path="attendance" element={<StudentDashboard />} />
          <Route path="history" element={<StudentDashboard />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to={user ? getUserRolePath(user.role) : '/login'} replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
