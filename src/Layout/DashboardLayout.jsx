import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

export default function DashboardLayout({ role }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#F5F7FB] md:flex-row">
      <Sidebar role={role} />

      <div className="min-w-0 flex-1 md:ml-64">
        <Navbar role={role} />

        <main className="p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
