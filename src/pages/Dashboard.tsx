import {
  BarChart3,
  MousePointerClick,
  TrendingUp,
  Users,
} from "lucide-react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const stats = [
  {
    title: "Total Spend",
    value: "$24,680",
    change: "+12.4%",
    icon: TrendingUp,
  },
  {
    title: "Revenue",
    value: "$78,420",
    change: "+18.2%",
    icon: BarChart3,
  },
  {
    title: "Clicks",
    value: "48,392",
    change: "+9.8%",
    icon: MousePointerClick,
  },
  {
    title: "Conversions",
    value: "1,284",
    change: "+15.6%",
    icon: Users,
  },
];

const performanceData = [
  { month: "Jan", spend: 4200, revenue: 9800 },
  { month: "Feb", spend: 5100, revenue: 12100 },
  { month: "Mar", spend: 4700, revenue: 11300 },
  { month: "Apr", spend: 6200, revenue: 14800 },
  { month: "May", spend: 5800, revenue: 13900 },
  { month: "Jun", spend: 7100, revenue: 17200 },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Dashboard
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Overview of your marketing performance
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">
                  {stat.title}
                </p>

                <Icon className="h-5 w-5 text-blue-600" />
              </div>

              <p className="mt-3 text-2xl font-bold text-slate-900">
                {stat.value}
              </p>

              <p className="mt-2 text-sm font-medium text-green-600">
                {stat.change}
              </p>
            </div>
          );
        })}
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">
          Performance Overview
        </h2>

        <div className="mt-6 h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Legend />

              <Line
                type="monotone"
                dataKey="spend"
                name="Spend"
                stroke="#2563eb"
                strokeWidth={2}
                dot={{ r: 4 }}
              />

              <Line
                type="monotone"
                dataKey="revenue"
                name="Revenue"
                stroke="#16a34a"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}