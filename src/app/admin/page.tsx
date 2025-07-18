import Link from "next/link";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-10">
     
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        {/* <p className="text-gray-500 mt-1">Welcome back! Manage the Easy Taskers platform with the tools below.</p> */}
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow border">
          <p className="text-gray-500 text-sm mb-1">Active Disputes</p>
          <p className="text-3xl font-bold text-blue-600">12</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow border">
          <p className="text-gray-500 text-sm mb-1">Flagged Messages</p>
          <p className="text-3xl font-bold text-red-500">8</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow border">
          <p className="text-gray-500 text-sm mb-1">Review Appeals</p>
          <p className="text-3xl font-bold text-yellow-500">5</p>
        </div>
      </div>

      {/* Quick Action Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Disputes */}
        <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl shadow">
          <h2 className="text-lg font-semibold text-blue-700 mb-2">View Open Disputes</h2>
          <p className="text-sm text-blue-600 mb-4">
            Quickly access all currently unresolved disputes between clients and tradies.
          </p>
          <Link
            href="/admin/disputes"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
          >
            Go to Disputes
          </Link>
        </div>

        {/* Moderation */}
        <div className="bg-yellow-50 border border-yellow-100 p-6 rounded-2xl shadow">
          <h2 className="text-lg font-semibold text-yellow-700 mb-2">Moderation Queue</h2>
          <p className="text-sm text-yellow-600 mb-4">
            Review flagged chats, media uploads, and task descriptions for violations.
          </p>
          <Link
            href="/admin/moderation"
            className="inline-block bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-yellow-700 transition"
          >
            Go to Moderation
          </Link>
        </div>
      </div>

      {/* Secondary Actions (Optional) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Rules Management */}
        <div className="bg-gray-50 border border-gray-200 p-6 rounded-2xl shadow">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Manage Platform Rules</h2>
          <p className="text-sm text-gray-600 mb-4">Update moderation rules, terms of service, and compliance logic.</p>
          <Link
            href="/admin/rules"
            className="inline-block bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-900 transition"
          >
            Go to Rules
          </Link>
        </div>

        {/* Review Appeals */}
        <div className="bg-red-50 border border-red-100 p-6 rounded-2xl shadow">
          <h2 className="text-lg font-semibold text-red-700 mb-2">Review Appeals</h2>
          <p className="text-sm text-red-600 mb-4">
            Handle user-submitted appeals for removed reviews or banned content.
          </p>
          <Link
            href="/admin/reviews"
            className="inline-block bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition"
          >
            Go to Review Appeals
          </Link>
        </div>
      </div>
    </div>
  );
}
