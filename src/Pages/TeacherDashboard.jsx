import { useEffect, useMemo, useState } from 'react';
import QRCode from 'qrcode';

const classes = [
  { id: 'web-7a', name: 'Web Technologies - CS-7A', students: 32 },
  { id: 'db-6b', name: 'Database Systems - SE-6B', students: 28 },
  { id: 'alg-8c', name: 'Algorithms - AI-8C', students: 27 },
];

const attendanceSummary = [
  { label: 'Present', value: 24, color: 'bg-green-100 text-green-700' },
  { label: 'Absent', value: 5, color: 'bg-red-100 text-red-700' },
  { label: 'Already marked', value: 3, color: 'bg-yellow-100 text-yellow-700' },
];

const students = [
  { name: 'Aisha Khan', status: 'Present' },
  { name: 'Bilal Ahmed', status: 'Present' },
  { name: 'Sara Mir', status: 'Absent' },
  { name: 'Hamza Ali', status: 'Already marked' },
  { name: 'Nadia Usman', status: 'Present' },
  { name: 'Usman Tariq', status: 'Present' },
];

export default function TeacherDashboard() {
  const [selectedClass, setSelectedClass] = useState(classes[0].id);
  const [sessionKey, setSessionKey] = useState(0);
  const [qrDataUrl, setQrDataUrl] = useState('');

  const qrValue = useMemo(() => {
    const sessionId = `attendance-${selectedClass}-${sessionKey}`;
    return JSON.stringify({
      sessionId,
      classId: selectedClass,
      type: 'attendance-checkin',
      expiresInMinutes: 20,
    });
  }, [selectedClass, sessionKey]);

  useEffect(() => {
    let isMounted = true;

    QRCode.toDataURL(qrValue)
      .then((url) => {
        if (isMounted) {
          setQrDataUrl(url);
        }
      })
      .catch(() => {
        if (isMounted) {
          setQrDataUrl('');
        }
      });

    return () => {
      isMounted = false;
    };
  }, [qrValue]);

  const selectedClassName = classes.find((item) => item.id === selectedClass)?.name || 'Class';

  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-medium text-gray-500">Overview</p>
        <h1 className="text-2xl font-bold text-[#0B1F4D] sm:text-3xl">Teacher Dashboard</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {attendanceSummary.map(({ label, value, color }) => (
          <article key={label} className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">{label}</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-3xl font-bold text-[#0B1F4D]">{value}</span>
              <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${color}`}>{label}</span>
            </div>
          </article>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between gap-4">
            <h2 className="text-lg font-bold text-[#0B1F4D]">Attendance session</h2>
            <button
              type="button"
              onClick={() => setSessionKey((value) => value + 1)}
              className="rounded-lg bg-[#0B1F4D] px-3 py-2 text-sm font-medium text-white"
            >
              Refresh QR
            </button>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Select class
              <select
                value={selectedClass}
                onChange={(event) => setSelectedClass(event.target.value)}
                className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-gray-700 outline-none focus:border-[#0B1F4D]"
              >
                {classes.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </label>

            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#0B1F4D] bg-[#F5F7FB] p-5 text-center">
              {qrDataUrl ? (
                <img src={qrDataUrl} alt="Attendance QR Code" className="h-48 w-48 rounded-xl bg-white p-3 shadow-sm" />
              ) : (
                <div className="flex h-48 w-48 items-center justify-center rounded-xl bg-white text-sm text-gray-400">
                  QR unavailable
                </div>
              )}
              <p className="mt-3 text-sm font-medium text-[#0B1F4D]">{selectedClassName}</p>
              <p className="text-xs text-gray-500">Session valid for 20 minutes</p>
            </div>

            <div className="rounded-xl bg-gray-50 p-3 text-xs text-gray-600">
              <span className="font-semibold text-[#0B1F4D]">QR payload:</span> {qrValue || 'Loading session...'}
            </div>
          </div>
        </article>

        <article className="rounded-2xl bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold text-[#0B1F4D]">Class roster</h2>
          <div className="mt-4 space-y-3">
            {students.map((student) => (
              <div key={student.name} className="flex items-center justify-between rounded-xl border border-gray-200 px-3 py-2">
                <span className="font-medium text-gray-700">{student.name}</span>
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                    student.status === 'Present'
                      ? 'bg-green-100 text-green-700'
                      : student.status === 'Already marked'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                  }`}
                >
                  {student.status}
                </span>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
