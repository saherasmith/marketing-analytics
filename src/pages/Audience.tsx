import {
  Users,
  UserPlus,
  UserCheck,
  TrendingUp,
} from "lucide-react";

const audiences = [
  {
    name: "Website Visitors",
    type: "Retargeting",
    size: "24,580",
    engagement: "68%",
    status: "Active",
  },
  {
    name: "High Intent Customers",
    type: "Lookalike",
    size: "12,840",
    engagement: "74%",
    status: "Active",
  },
  {
    name: "Newsletter Subscribers",
    type: "Customer List",
    size: "8,420",
    engagement: "52%",
    status: "Active",
  },
  {
    name: "B2B Decision Makers",
    type: "Interest Based",
    size: "6,280",
    engagement: "61%",
    status: "Active",
  },
];

export default function Audience() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Audience
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Understand and manage your target audience segments.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Total Audience"
          value="52,120"
          change="+8.4%"
          icon={<Users className="h-5 w-5" />}
        />

        <KpiCard
          title="New Users"
          value="3,842"
          change="+12.6%"
          icon={<UserPlus className="h-5 w-5" />}
        />

        <KpiCard
          title="Active Users"
          value="38,420"
          change="+6.2%"
          icon={<UserCheck className="h-5 w-5" />}
        />

        <KpiCard
          title="Engagement Rate"
          value="64.8%"
          change="+4.7%"
          icon={<TrendingUp className="h-5 w-5" />}
        />
      </div>

      {/* Audience Segments */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-4">
          <h2 className="font-semibold text-slate-900">
            Audience Segments
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Your current audience groups and their engagement.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-5 py-4 font-semibold text-slate-700">
                  Audience
                </th>
                <th className="px-5 py-4 font-semibold text-slate-700">
                  Type
                </th>
                <th className="px-5 py-4 font-semibold text-slate-700">
                  Size
                </th>
                <th className="px-5 py-4 font-semibold text-slate-700">
                  Engagement
                </th>
                <th className="px-5 py-4 font-semibold text-slate-700">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {audiences.map((audience) => (
                <tr
                  key={audience.name}
                  className="border-t border-slate-100 hover:bg-slate-50"
                >
                  <td className="px-5 py-4 font-semibold text-slate-900">
                    {audience.name}
                  </td>

                  <td className="px-5 py-4 text-slate-600">
                    {audience.type}
                  </td>

                  <td className="px-5 py-4 text-slate-600">
                    {audience.size}
                  </td>

                  <td className="px-5 py-4 font-medium text-slate-700">
                    {audience.engagement}
                  </td>

                  <td className="px-5 py-4">
                    <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700">
                      {audience.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function KpiCard({
  title,
  value,
  change,
  icon,
}: {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
          {icon}
        </div>

        <span className="text-xs font-semibold text-green-600">
          {change}
        </span>
      </div>

      <p className="mt-4 text-sm text-slate-500">
        {title}
      </p>

      <p className="mt-1 text-2xl font-bold text-slate-900">
        {value}
      </p>
    </div>
  );
}