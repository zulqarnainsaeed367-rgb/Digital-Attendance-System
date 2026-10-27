export default function TeacherDashboard() {
  return (
    <section className="space-y-4">
      <div>
        <p className="text-sm font-medium text-gray-500">Overview</p>
        <h1 className="text-2xl font-bold text-[#0B1F4D] sm:text-3xl">
          Teacher Dashboard
        </h1>
      </div>
      <article className="rounded-2xl bg-white p-5 shadow-sm">
        <h2 className="font-semibold text-[#0B1F4D]">Class attendance</h2>
        <p className="mt-2 text-sm text-gray-500">
          Your attendance and class tools will appear here.
        </p>
      </article>
    </section>
  );
}