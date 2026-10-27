export default function AdminDashboard() {
  return (
    <section className="space-y-4">
      <div>
        <p className="text-sm font-medium text-gray-500">Overview</p>
        <h1 className="text-2xl font-bold text-[#0B1F4D] sm:text-3xl">
          Admin Dashboard
        </h1>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          ["Students", "Manage student records"],
          ["Teachers", "Manage teacher accounts"],
          ["Attendance", "Review attendance activity"],
        ].map(([title, description]) => (
          <article key={title} className="rounded-2xl bg-white p-5 shadow-sm">
            <h2 className="font-semibold text-[#0B1F4D]">{title}</h2>
            <p className="mt-2 text-sm text-gray-500">{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}