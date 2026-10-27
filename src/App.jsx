import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardLayout from "./Layout/DashboardLayout";
import Login from "./Pages/login";
import AdminDashboard from "./Pages/Admindashboard";
import TeacherDashboard from "./Pages/TeacherDashboard";
import StudentDashboard from "./Pages/studentDashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<DashboardLayout />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="teacher" element={<TeacherDashboard />} />
          <Route path="student" element={<StudentDashboard />} />
        </Route>
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
