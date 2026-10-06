import {
  BarChart3,
  DollarSign,
  MousePointerClick,
  Target,
  TrendingUp,
} from "lucide-react";

const performanceData = [
  { day: "Mon", spend: 3200, revenue: 8200, conversions: 92 },
  { day: "Tue", spend: 3800, revenue: 9600, conversions: 108 },
  { day: "Wed", spend: 4100, revenue: 11200, conversions: 126 },
  { day: "Thu", spend: 3600, revenue: 10400, conversions: 118 },
  { day: "Fri", spend: 4500, revenue: 12800, conversions: 142 },
  { day: "Sat", spend: 2900, revenue: 8900, conversions: 101 },
  { day: "Sun", spend: 2580, revenue: 7320, conversions: 84 },
];

const channelData = [
  { channel: "Google Ads", spend: 8420, revenue: 24680, conversions: 284 },
  { channel: "Meta Ads", spend: 5280, revenue: 14920, conversions: 196 },
  { channel: "LinkedIn", spend: 3140, revenue: 9870, conversions: 84 },
  { channel: "Email", spend: 850, revenue: 3200, conversions: 42 },
];

export default function Analytics() {
  const totalSpend = performanceData.reduce(
    (sum, item) => sum + item.spend,
    0,
  );

  const totalRevenue = performanceData.reduce(
    (sum, item) => sum + item.revenue,
    0,
  );

  const totalConversions = performanceData.reduce(
    (sum, item) => sum + item.conversions,
    0,
  );

  const roas = totalRevenue / totalSpend;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Analytics
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Analyze your marketing performance across campaigns and channels.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          icon={<DollarSign className="h-5 w-5" />}
          label="Total Spend"
          value={`$${totalSpend.toLocaleString()}`}
          change="+12.4%"
        />

        <MetricCard
          icon={<TrendingUp className="h-5 w-5" />}
          label="Revenue"
          value={`$${totalRevenue.toLocaleString()}`}
          change="+18.7%"
        />

        <MetricCard
          icon={<Target className="h-5 w-5" />}
          label="Conversions"
          value={totalConversions.toLocaleString()}
          change="+9.8%"
        />

        <MetricCard
          icon={<BarChart3 className="h-5 w-5" />}
          label="ROAS"
          value={`${roas.toFixed(2)}x`}
          change="+6.3%"
        />
      </div>

      {/* Performance Overview */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-slate-900">
              Performance Overview
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Spend, revenue and conversions over the last 7 days.
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {performanceData.map((item) => {
            const maxRevenue = 13000;
            const width = (item.revenue / maxRevenue) * 100;

            return (
              <div
                key={item.day}
                className="grid grid-cols-[50px_1fr_100px] items-center gap-3"
              >
                <span className="text-sm font-medium text-slate-500">
                  {item.day}
                </span>

                <div className="h-8 overflow-hidden rounded-lg bg-slate-100">
                  <div
                    className="flex h-full items-center rounded-lg bg-blue-600 px-3 text-xs font-semibold text-white"
                    style={{ width: `${width}%` }}
                  >
                    ${item.revenue.toLocaleString()}
                  </div>
                </div>

                <span className="text-right text-sm text-slate-600">
                  {item.conversions} conv.
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Channel Performance */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-6">
          <h2 className="font-semibold text-slate-900">
            Channel Performance
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Compare performance across marketing channels.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 font-semibold text-slate-700">
                  Channel
                </th>

                <th className="px-6 py-4 font-semibold text-slate-700">
                  Spend
                </th>

                <th className="px-6 py-4 font-semibold text-slate-700">
                  Revenue
                </th>

                <th className="px-6 py-4 font-semibold text-slate-700">
                  Conversions
                </th>

                <th className="px-6 py-4 font-semibold text-slate-700">
                  ROAS
                </th>
              </tr>
            </thead>

            <tbody>
              {channelData.map((channel) => {
                const channelRoas =
                  channel.revenue / channel.spend;

                return (
                  <tr
                    key={channel.channel}
                    className="border-t border-slate-100 hover:bg-slate-50"
                  >
                    <td className="px-6 py-4 font-semibold text-slate-900">
                      {channel.channel}
                    </td>

                    <td className="px-6 py-4 text-slate-600">
                      ${channel.spend.toLocaleString()}
                    </td>

                    <td className="px-6 py-4 font-medium text-slate-900">
                      ${channel.revenue.toLocaleString()}
                    </td>

                    <td className="px-6 py-4 text-slate-600">
                      {channel.conversions}
                    </td>

                    <td className="px-6 py-4">
                      <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700">
                        {channelRoas.toFixed(2)}x
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Funnel */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="font-semibold text-slate-900">
          Conversion Funnel
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Understand how users move from impressions to conversions.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-4">
          <FunnelCard
            icon={<MousePointerClick className="h-5 w-5" />}
            label="Impressions"
            value="482,400"
          />

          <FunnelCard
            icon={<MousePointerClick className="h-5 w-5" />}
            label="Clicks"
            value="48,392"
          />

          <FunnelCard
            icon={<UsersIcon />}
            label="Leads"
            value="6,842"
          />

          <FunnelCard
            icon={<Target className="h-5 w-5" />}
            label="Conversions"
            value="1,284"
          />
        </div>
      </div>
    </div>
  );
}

function MetricCard({
  icon,
  label,
  value,
  change,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  change: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="text-slate-500">{icon}</div>

        <span className="text-xs font-semibold text-green-600">
          {change}
        </span>
      </div>

      <p className="mt-4 text-sm text-slate-500">
        {label}
      </p>

      <p className="mt-1 text-2xl font-bold text-slate-900">
        {value}
      </p>
    </div>
  );
}

function FunnelCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg bg-slate-50 p-5">
      <div className="text-blue-600">{icon}</div>

      <p className="mt-4 text-sm text-slate-500">
        {label}
      </p>

      <p className="mt-1 text-xl font-bold text-slate-900">
        {value}
      </p>
    </div>
  );
}

function UsersIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-5 w-5"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}