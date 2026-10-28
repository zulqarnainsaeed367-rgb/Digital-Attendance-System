import { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

const attendanceRecords = [
  { title: 'Web Technologies', status: 'Present', date: '14 Oct 2026' },
  { title: 'Database Systems', status: 'Absent', date: '11 Oct 2026' },
  { title: 'Algorithms', status: 'Present', date: '09 Oct 2026' },
  { title: 'Web Technologies', status: 'Late', date: '06 Oct 2026' },
];

export default function StudentDashboard() {
  const scannerRef = useRef(null);
  const [scanStatus, setScanStatus] = useState('Ready to scan your class QR code.');
  const [scanCode, setScanCode] = useState('');

  useEffect(() => {
    const elementId = 'student-qr-reader';

    if (!document.getElementById(elementId)) {
      return undefined;
    }

    const scanner = new Html5QrcodeScanner(
      elementId,
      { fps: 10, qrbox: { width: 250, height: 250 } },
      false,
    );

    scanner.render(
      (decodedText) => {
        try {
          const payload = JSON.parse(decodedText);
          const validSession = payload.type === 'attendance-checkin' && payload.classId;

          if (!validSession) {
            setScanStatus('Invalid or expired QR code. Please try a fresh session.');
            return;
          }

          setScanCode(decodedText);
          setScanStatus('Attendance marked successfully. Your session has been validated.');
        } catch {
          setScanStatus('This QR code is not a valid attendance session.');
        }
      },
      () => {
        setScanStatus('Camera is scanning for valid QR codes...');
      },
    );

    scannerRef.current = scanner;

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(() => {});
      }
    };
  }, []);

  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-medium text-gray-500">Overview</p>
        <h1 className="text-2xl font-bold text-[#0B1F4D] sm:text-3xl">Student Dashboard</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <article className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Attendance percentage</p>
          <h2 className="mt-3 text-3xl font-bold text-[#0B1F4D]">92%</h2>
        </article>
        <article className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Present</p>
          <h2 className="mt-3 text-3xl font-bold text-[#0B1F4D]">18</h2>
        </article>
        <article className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Pending</p>
          <h2 className="mt-3 text-3xl font-bold text-[#0B1F4D]">3</h2>
        </article>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <article className="rounded-2xl bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold text-[#0B1F4D]">Student profile</h2>
          <div className="mt-4 space-y-3 text-sm text-gray-600">
            <div className="flex justify-between rounded-xl bg-gray-50 px-3 py-2">
              <span>Name</span>
              <span className="font-medium text-[#0B1F4D]">Ayesha Ali</span>
            </div>
            <div className="flex justify-between rounded-xl bg-gray-50 px-3 py-2">
              <span>Student ID</span>
              <span className="font-medium text-[#0B1F4D]">CS-2024-118</span>
            </div>
            <div className="flex justify-between rounded-xl bg-gray-50 px-3 py-2">
              <span>Class</span>
              <span className="font-medium text-[#0B1F4D]">CS-7A</span>
            </div>
            <div className="flex justify-between rounded-xl bg-gray-50 px-3 py-2">
              <span>Advisor</span>
              <span className="font-medium text-[#0B1F4D]">Dr. A. Farooq</span>
            </div>
          </div>
        </article>

        <article className="rounded-2xl bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold text-[#0B1F4D]">Scan QR to mark attendance</h2>
          <div id="student-qr-reader" className="mt-4 w-full overflow-hidden rounded-2xl border border-gray-200 bg-[#F5F7FB]" />
          <p className="mt-3 rounded-xl bg-blue-50 px-3 py-2 text-sm text-[#0B1F4D]">{scanStatus}</p>
          {scanCode && (
            <div className="mt-3 rounded-xl border border-green-200 bg-green-50 px-3 py-2 text-xs text-green-700">
              Last scanned session: {scanCode}
            </div>
          )}
        </article>
      </div>

      <article className="rounded-2xl bg-white p-5 shadow-sm">
        <h2 className="text-lg font-bold text-[#0B1F4D]">Attendance history</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="text-gray-500">
              <tr>
                <th className="pb-3 font-medium">Course</th>
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {attendanceRecords.map((record) => (
                <tr key={`${record.title}-${record.date}`} className="border-t border-gray-200 text-gray-700">
                  <td className="py-3">{record.title}</td>
                  <td className="py-3">{record.date}</td>
                  <td className="py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        record.status === 'Present'
                          ? 'bg-green-100 text-green-700'
                          : record.status === 'Late'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>
    </section>
  );
}