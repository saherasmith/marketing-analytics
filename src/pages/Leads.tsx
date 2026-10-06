import {
  Users,
  UserPlus,
  UserCheck,
  TrendingUp,
} from "lucide-react";

const leads = [
  {
    name: "Aarav Sharma",
    email: "aarav@example.com",
    source: "Google Ads",
    status: "New",
    value: "$1,200",
  },
  {
    name: "Priya Kumar",
    email: "priya@example.com",
    source: "Meta Ads",
    status: "Contacted",
    value: "$2,400",
  },
  {
    name: "Rahul Mehta",
    email: "rahul@example.com",
    source: "LinkedIn",
    status: "Qualified",
    value: "$4,800",
  },
  {
    name: "Ananya Singh",
    email: "ananya@example.com",
    source: "Email",
    status: "New",
    value: "$1,850",
  },
  {
    name: "Vikram Rao",
    email: "vikram@example.com",
    source: "Google Ads",
    status: "Converted",
    value: "$3,600",
  },
];

export default function Leads() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Leads
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Track, manage and convert your marketing leads.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Total Leads"
          value="1,284"
          change="+12.4%"
          icon={<Users className="h-5 w-5" />}
        />

        <KpiCard
          title="New Leads"
          value="386"
          change="+8.7%"
          icon={<UserPlus className="h-5 w-5" />}
        />

        <KpiCard
          title="Qualified Leads"
          value="428"
          change="+14.2%"
          icon={<UserCheck className="h-5 w-5" />}
        />

        <KpiCard
          title="Conversion Rate"
          value="18.6%"
          change="+3.8%"
          icon={<TrendingUp className="h-5 w-5" />}
        />
      </div>

      {/* Leads Table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-4">
          <h2 className="font-semibold text-slate-900">
            Recent Leads
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Recently captured marketing leads.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-5 py-4 font-semibold text-slate-700">
                  Lead
                </th>
                <th className="px-5 py-4 font-semibold text-slate-700">
                  Source
                </th>
                <th className="px-5 py-4 font-semibold text-slate-700">
                  Status
                </th>
                <th className="px-5 py-4 font-semibold text-slate-700">
                  Lead Value
                </th>
              </tr>
            </thead>

            <tbody>
              {leads.map((lead) => (
                <tr
                  key={lead.email}
                  className="border-t border-slate-100 hover:bg-slate-50"
                >
                  <td className="px-5 py-4">
                    <p className="font-semibold text-slate-900">
                      {lead.name}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {lead.email}
                    </p>
                  </td>

                  <td className="px-5 py-4 text-slate-600">
                    {lead.source}
                  </td>

                  <td className="px-5 py-4">
                    <StatusBadge status={lead.status} />
                  </td>

                  <td className="px-5 py-4 font-semibold text-slate-900">
                    {lead.value}
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

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    New: "bg-blue-100 text-blue-700",
    Contacted: "bg-amber-100 text-amber-700",
    Qualified: "bg-purple-100 text-purple-700",
    Converted: "bg-green-100 text-green-700",
  };

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
        styles[status] || "bg-slate-100 text-slate-600"
      }`}
    >
      {status}
    </span>
  );
}