import { useState } from "react";
import type { ElementType } from "react";

import {
  FileText,
  Download,
  TrendingUp,
  DollarSign,
  Users,
  Target,
  X,
} from "lucide-react";

type Report = {
  name: string;
  type: string;
  date: string;
  status: string;
};

const initialReports: Report[] = [
  {
    name: "Monthly Campaign Performance",
    type: "Campaign",
    date: "Sep 28, 2026",
    status: "Ready",
  },
  {
    name: "Channel Performance Report",
    type: "Analytics",
    date: "Sep 27, 2026",
    status: "Ready",
  },
  {
    name: "Lead Generation Report",
    type: "Leads",
    date: "Sep 26, 2026",
    status: "Ready",
  },
  {
    name: "Audience Engagement Report",
    type: "Audience",
    date: "Sep 25, 2026",
    status: "Ready",
  },
];

export default function Reports() {
  const [reports, setReports] = useState<Report[]>(initialReports);
  const [showModal, setShowModal] = useState(false);

  const [reportName, setReportName] = useState("");
  const [reportType, setReportType] = useState("Campaign");

  const createReport = () => {
    if (!reportName.trim()) {
      return;
    }

    const newReport: Report = {
      name: reportName.trim(),
      type: reportType,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      status: "Ready",
    };

    setReports((currentReports) => [
      newReport,
      ...currentReports,
    ]);

    setReportName("");
    setReportType("Campaign");
    setShowModal(false);
  };

  const exportReport = (report: Report) => {
    const csvContent = [
      "Report Name,Type,Date,Status",
      `"${report.name}","${report.type}","${report.date}","${report.status}"`,
      "",
      "Performance Summary",
      "Metric,Value,Change",
      "Revenue,$52,670,+18.4%",
      "Conversions,606,+12.8%",
      "Conversion Rate,4.82%,+8.6%",
      "ROAS,3.42x,+15.2%",
    ].join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${report.name
      .replace(/[^a-z0-9]/gi, "_")
      .toLowerCase()}.csv`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Reports
          </h1>

          <p className="text-sm text-slate-500">
            Create, view, and export marketing performance reports.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          <FileText className="h-4 w-4" />
          Create Report
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <ReportKpi
          title="Reports Generated"
          value={String(24 + reports.length - initialReports.length)}
          icon={FileText}
        />

        <ReportKpi
          title="Total Revenue"
          value="$52,670"
          icon={DollarSign}
        />

        <ReportKpi
          title="Total Conversions"
          value="606"
          icon={Target}
        />

        <ReportKpi
          title="Leads Generated"
          value="1,248"
          icon={Users}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <div className="mb-5">
            <h2 className="font-semibold text-slate-900">
              Performance Summary
            </h2>

            <p className="text-sm text-slate-500">
              Current marketing performance
            </p>
          </div>

          <div className="space-y-4">
            <Metric
              label="Revenue"
              value="$52,670"
              change="+18.4%"
            />

            <Metric
              label="Conversions"
              value="606"
              change="+12.8%"
            />

            <Metric
              label="Conversion Rate"
              value="4.82%"
              change="+8.6%"
            />

            <Metric
              label="ROAS"
              value="3.42x"
              change="+15.2%"
            />
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <div className="mb-5">
            <h2 className="font-semibold text-slate-900">
              Report Types
            </h2>

            <p className="text-sm text-slate-500">
              Reports available in your workspace
            </p>
          </div>

          <div className="space-y-3">
            {[
              "Campaign Performance",
              "Channel Performance",
              "Lead Generation",
              "Audience Engagement",
            ].map((report) => (
              <div
                key={report}
                className="flex items-center justify-between rounded-lg border border-slate-100 p-3"
              >
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-blue-600" />

                  <span className="text-sm font-medium text-slate-700">
                    {report}
                  </span>
                </div>

                <span className="text-xs text-slate-400">
                  Available
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 p-6">
          <h2 className="font-semibold text-slate-900">
            Recent Reports
          </h2>

          <p className="text-sm text-slate-500">
            Recently generated reports
          </p>
        </div>

        <div className="divide-y divide-slate-100">
          {reports.map((report, index) => (
            <div
              key={`${report.name}-${index}`}
              className="flex items-center justify-between p-5"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-blue-50 p-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>

                <div>
                  <p className="text-sm font-medium text-slate-900">
                    {report.name}
                  </p>

                  <p className="text-xs text-slate-500">
                    {report.type} • {report.date}
                  </p>
                </div>
              </div>

              <button
                onClick={() => exportReport(report)}
                className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50"
              >
                <Download className="h-4 w-4" />
                Export
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Create Report Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Create Report
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Create a new marketing performance report.
                </p>
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-5 p-6">
              <div>
                <label className="text-sm font-medium text-slate-700">
                  Report Name
                </label>

                <input
                  value={reportName}
                  onChange={(e) =>
                    setReportName(e.target.value)
                  }
                  placeholder="Enter report name"
                  className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Report Type
                </label>

                <select
                  value={reportType}
                  onChange={(e) =>
                    setReportType(e.target.value)
                  }
                  className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                >
                  <option>Campaign</option>
                  <option>Analytics</option>
                  <option>Leads</option>
                  <option>Audience</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4">
              <button
                onClick={() => setShowModal(false)}
                className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                onClick={createReport}
                disabled={!reportName.trim()}
                className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Create Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ReportKpi({
  title,
  value,
  icon: Icon,
}: {
  title: string;
  value: string;
  icon: ElementType;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">
          {title}
        </p>

        <Icon className="h-5 w-5 text-blue-600" />
      </div>

      <p className="mt-3 text-2xl font-bold text-slate-900">
        {value}
      </p>
    </div>
  );
}

function Metric({
  label,
  value,
  change,
}: {
  label: string;
  value: string;
  change: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-slate-600">
        {label}
      </span>

      <div className="flex items-center gap-3">
        <span className="font-semibold text-slate-900">
          {value}
        </span>

        <span className="flex items-center gap-1 text-xs font-medium text-green-600">
          <TrendingUp className="h-3 w-3" />
          {change}
        </span>
      </div>
    </div>
  );
}