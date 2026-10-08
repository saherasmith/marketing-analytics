import { useMemo, useState } from "react";

type BudgetItem = {
  id: number;
  campaign: string;
  channel: string;
  budget: number;
  spent: number;
};

const initialBudgets: BudgetItem[] = [
  {
    id: 1,
    campaign: "Summer Performance Campaign",
    channel: "Google Ads",
    budget: 10000,
    spent: 8420,
  },
  {
    id: 2,
    campaign: "Social Media Awareness",
    channel: "Meta Ads",
    budget: 7000,
    spent: 5280,
  },
  {
    id: 3,
    campaign: "B2B Lead Generation",
    channel: "LinkedIn",
    budget: 4000,
    spent: 3140,
  },
  {
    id: 4,
    campaign: "Holiday Email Campaign",
    channel: "Email",
    budget: 5000,
    spent: 3200,
  },
];

export default function Budget() {
  const [budgets, setBudgets] = useState(initialBudgets);

  const totals = useMemo(() => {
    const budget = budgets.reduce((sum, item) => sum + item.budget, 0);
    const spent = budgets.reduce((sum, item) => sum + item.spent, 0);
    const remaining = budget - spent;
    const percentage = budget === 0 ? 0 : (spent / budget) * 100;

    return {
      budget,
      spent,
      remaining,
      percentage,
    };
  }, [budgets]);

  function addBudget() {
    const newBudget: BudgetItem = {
      id: Date.now(),
      campaign: "New Campaign Budget",
      channel: "Google Ads",
      budget: 5000,
      spent: 0,
    };

    setBudgets((current) => [...current, newBudget]);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Budget Management
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Track campaign budgets and spending.
          </p>
        </div>

        <button
          onClick={addBudget}
          className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
        >
          + Add Budget
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">Total Budget</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">
            ${totals.budget.toLocaleString()}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">Total Spent</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">
            ${totals.spent.toLocaleString()}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">Remaining</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">
            ${totals.remaining.toLocaleString()}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">Overall Usage</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">
            {totals.percentage.toFixed(1)}%
          </p>
        </div>
      </div>

      {/* Overall Budget Progress */}
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-slate-900">
              Overall Budget Usage
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Monitor total campaign spending.
            </p>
          </div>

          <span className="text-sm font-semibold text-slate-700">
            {totals.percentage.toFixed(1)}%
          </span>
        </div>

        <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100">
          <div
            className={`h-full rounded-full ${
              totals.percentage >= 100
                ? "bg-red-500"
                : totals.percentage >= 80
                  ? "bg-amber-500"
                  : "bg-blue-600"
            }`}
            style={{
              width: `${Math.min(totals.percentage, 100)}%`,
            }}
          />
        </div>

        {totals.percentage >= 100 && (
          <p className="mt-3 text-sm font-medium text-red-600">
            ⚠ Budget limit reached.
          </p>
        )}

        {totals.percentage >= 80 && totals.percentage < 100 && (
          <p className="mt-3 text-sm font-medium text-amber-600">
            ⚠ Budget usage has crossed 80%.
          </p>
        )}
      </div>

      {/* Campaign Budgets */}
      <div className="rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 p-6">
          <h2 className="font-semibold text-slate-900">
            Campaign Budgets
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Budget and spending by campaign.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-slate-200 bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                  Campaign
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                  Channel
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                  Budget
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                  Spent
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                  Usage
                </th>
              </tr>
            </thead>

            <tbody>
              {budgets.map((item) => {
                const usage =
                  item.budget === 0
                    ? 0
                    : (item.spent / item.budget) * 100;

                return (
                  <tr
                    key={item.id}
                    className="border-b border-slate-100 last:border-0"
                  >
                    <td className="px-6 py-4">
                      <p className="font-medium text-slate-900">
                        {item.campaign}
                      </p>
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {item.channel}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-700">
                      ${item.budget.toLocaleString()}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-700">
                      ${item.spent.toLocaleString()}
                    </td>

                    <td className="min-w-[220px] px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className={`h-full rounded-full ${
                              usage >= 100
                                ? "bg-red-500"
                                : usage >= 80
                                  ? "bg-amber-500"
                                  : "bg-blue-600"
                            }`}
                            style={{
                              width: `${Math.min(usage, 100)}%`,
                            }}
                          />
                        </div>

                        <span className="w-12 text-right text-sm font-medium text-slate-700">
                          {usage.toFixed(0)}%
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}