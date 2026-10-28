const stats = [
  { label: 'Total Students', value: '1,284', color: 'bg-[#EAF3FF]' },
  { label: 'Total Teachers', value: '86', color: 'bg-[#FFF2CF]' },
  { label: 'Total Classes', value: '42', color: 'bg-[#E8F7F1]' },
  { label: 'Attendance %', value: '94.6%', color: 'bg-[#FCE7F3]' },
];

const students = [
  { name: 'Aisha Khan', id: 'ST-2041', section: 'CS-7A', status: 'Present' },
  { name: 'Bilal Ahmed', id: 'ST-2042', section: 'CS-7B', status: 'Late' },
  { name: 'Sara Mir', id: 'ST-2045', section: 'SE-6A', status: 'Present' },
  { name: 'Hamza Ali', id: 'ST-2048', section: 'AI-8A', status: 'Absent' },
];

const teachers = [
  { name: 'Dr. Syed Bukhari', subject: 'Web Technologies', classes: '4' },
  { name: 'Ms. Zoya Noor', subject: 'Database Systems', classes: '3' },
  { name: 'Mr. Faisal Khan', subject: 'Algorithms', classes: '5' },
];

const attendanceData = [
  { day: 'Mon', rate: '96%' },
  { day: 'Tue', rate: '94%' },
  { day: 'Wed', rate: '95%' },
  { day: 'Thu', rate: '93%' },
  { day: 'Fri', rate: '97%' },
];

export default function AdminDashboard() {
  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-medium text-gray-500">Overview</p>
        <h1 className="text-2xl font-bold text-[#0B1F4D] sm:text-3xl">Admin Dashboard</h1>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, color }) => (
          <article key={label} className={`${color} rounded-2xl p-5 shadow-sm`}>
            <p className="text-sm font-medium text-gray-600">{label}</p>
            <h2 className="mt-3 text-3xl font-bold text-[#0B1F4D]">{value}</h2>
          </article>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
        <article className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-lg font-bold text-[#0B1F4D]">Student management</h2>
            <button className="rounded-lg bg-[#0B1F4D] px-3 py-2 text-sm font-medium text-white">
              Add student
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="text-gray-500">
                <tr>
                  <th className="pb-3 font-medium">Student</th>
                  <th className="pb-3 font-medium">ID</th>
                  <th className="pb-3 font-medium">Section</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id} className="border-t border-gray-200 text-gray-700">
                    <td className="py-3">{student.name}</td>
                    <td className="py-3">{student.id}</td>
                    <td className="py-3">{student.section}</td>
                    <td className="py-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                          student.status === 'Present'
                            ? 'bg-green-100 text-green-700'
                            : student.status === 'Late'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {student.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <article className="rounded-2xl bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold text-[#0B1F4D]">Teacher management</h2>
          <div className="mt-4 space-y-4">
            {teachers.map((teacher) => (
              <div key={teacher.name} className="rounded-xl border border-gray-200 p-3">
                <p className="font-semibold text-[#0B1F4D]">{teacher.name}</p>
                <p className="mt-1 text-sm text-gray-500">{teacher.subject}</p>
                <p className="mt-2 text-xs text-gray-400">{teacher.classes} active classes</p>
              </div>
            ))}
          </div>
        </article>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-2xl bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold text-[#0B1F4D]">Class and section management</h2>
          <div className="mt-4 space-y-3 text-sm text-gray-600">
            <div className="flex items-center justify-between rounded-xl bg-gray-50 px-3 py-2">
              <span>CS-7A</span>
              <span className="font-medium text-[#0B1F4D]">32 students</span>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-gray-50 px-3 py-2">
              <span>CS-7B</span>
              <span className="font-medium text-[#0B1F4D]">29 students</span>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-gray-50 px-3 py-2">
              <span>SE-6A</span>
              <span className="font-medium text-[#0B1F4D]">35 students</span>
            </div>
          </div>
        </article>

        <article className="rounded-2xl bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold text-[#0B1F4D]">Attendance overview</h2>
          <div className="mt-4 flex items-end gap-3">
            {attendanceData.map((entry) => (
              <div key={entry.day} className="flex flex-1 flex-col items-center gap-2">
                <div className="flex h-24 w-full items-end justify-center rounded-t-xl bg-[#EAF3FF] p-2">
                  <span className="text-sm font-semibold text-[#0B1F4D]">{entry.rate}</span>
                </div>
                <span className="text-sm text-gray-500">{entry.day}</span>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}