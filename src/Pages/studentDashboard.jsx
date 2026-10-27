export default function StudentDashboard() {
  return (
    <section className="space-y-4">
      <div>
        <p className="text-sm font-medium text-gray-500">Overview</p>
        <h1 className="text-2xl font-bold text-[#0B1F4D] sm:text-3xl">
          Student Dashboard
        </h1>
      </div>
      <article className="rounded-2xl bg-white p-5 shadow-sm">
        <h2 className="font-semibold text-[#0B1F4D]">My attendance</h2>
        <p className="mt-2 text-sm text-gray-500">
          Your attendance summary and class information will appear here.
        </p>
      </article>
    </section>
  );
}