import { useMemo, useState } from "react";
import {
  MoreHorizontal,
  Pause,
  Play,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useCampaignStore } from "../store";

export default function Campaigns() {
  const campaigns = useCampaignStore((state) => state.campaigns);
  const deleteCampaign = useCampaignStore(
    (state) => state.deleteCampaign,
  );
  const toggleCampaign = useCampaignStore(
    (state) => state.toggleCampaign,
  );

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [channelFilter, setChannelFilter] = useState("All");

  const filteredCampaigns = useMemo(() => {
    return campaigns.filter((campaign) => {
      const matchesSearch =
        campaign.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        campaign.channel
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        campaign.status === statusFilter;

      const matchesChannel =
        channelFilter === "All" ||
        campaign.channel === channelFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesChannel
      );
    });
  }, [
    campaigns,
    search,
    statusFilter,
    channelFilter,
  ]);

  function handleDelete(id: number) {
    const campaign = campaigns.find(
      (item) => item.id === id,
    );

    if (!campaign) return;

    const confirmed = window.confirm(
      `Delete "${campaign.name}"?`,
    );

    if (confirmed) {
      deleteCampaign(id);
    }
  }

  function formatCurrency(value: number) {
    return `$${value.toLocaleString()}`;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Campaigns
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Create, manage and monitor your marketing campaigns.
          </p>
        </div>

        <Link
          to="/campaigns/new"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          New Campaign
        </Link>
      </div>

      {/* Filters */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="grid gap-3 md:grid-cols-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <input
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search campaigns..."
              className="w-full rounded-lg border border-slate-300 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-blue-500"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value)
            }
            className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
          >
            <option value="All">All statuses</option>
            <option value="Active">Active</option>
            <option value="Paused">Paused</option>
            <option value="Draft">Draft</option>
          </select>

          <select
            value={channelFilter}
            onChange={(event) =>
              setChannelFilter(event.target.value)
            }
            className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
          >
            <option value="All">All channels</option>
            <option value="Google Ads">Google Ads</option>
            <option value="Meta Ads">Meta Ads</option>
            <option value="Instagram">Instagram</option>
            <option value="LinkedIn">LinkedIn</option>
            <option value="Email">Email</option>
            <option value="YouTube">YouTube</option>
            <option value="TikTok">TikTok</option>
          </select>
        </div>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-3">
        <SummaryCard
          label="Total Campaigns"
          value={campaigns.length.toString()}
        />

        <SummaryCard
          label="Active Campaigns"
          value={campaigns
            .filter(
              (campaign) =>
                campaign.status === "Active",
            )
            .length.toString()}
        />

        <SummaryCard
          label="Total Revenue"
          value={formatCurrency(
            campaigns.reduce(
              (total, campaign) =>
                total + campaign.revenue,
              0,
            ),
          )}
        />
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-4">
          <h2 className="font-semibold text-slate-900">
            Campaign Performance
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            {filteredCampaigns.length} campaign
            {filteredCampaigns.length === 1
              ? ""
              : "s"}{" "}
            shown
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-5 py-4 font-semibold text-slate-700">
                  Campaign
                </th>

                <th className="px-5 py-4 font-semibold text-slate-700">
                  Channel
                </th>

                <th className="px-5 py-4 font-semibold text-slate-700">
                  Status
                </th>

                <th className="px-5 py-4 font-semibold text-slate-700">
                  Spend
                </th>

                <th className="px-5 py-4 font-semibold text-slate-700">
                  Revenue
                </th>

                <th className="px-5 py-4 font-semibold text-slate-700">
                  Conversions
                </th>

                <th className="px-5 py-4 text-right font-semibold text-slate-700">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredCampaigns.map((campaign) => (
                <tr
                  key={campaign.id}
                  className="border-t border-slate-100 hover:bg-slate-50"
                >
                  <td className="px-5 py-4">
                    <Link
                      to={`/campaigns/${campaign.id}`}
                      className="font-semibold text-slate-900 hover:text-blue-600"
                    >
                      {campaign.name}
                    </Link>
                  </td>

                  <td className="px-5 py-4 text-slate-600">
                    {campaign.channel}
                  </td>

                  <td className="px-5 py-4">
                    <StatusBadge
                      status={campaign.status}
                    />
                  </td>

                  <td className="px-5 py-4 font-medium text-slate-700">
                    {formatCurrency(campaign.spend)}
                  </td>

                  <td className="px-5 py-4 font-medium text-slate-900">
                    {formatCurrency(campaign.revenue)}
                  </td>

                  <td className="px-5 py-4 text-slate-600">
                    {campaign.conversions.toLocaleString()}
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-1">
                      {campaign.status !== "Draft" && (
                        <button
                          onClick={() =>
                            toggleCampaign(
                              campaign.id,
                            )
                          }
                          title={
                            campaign.status ===
                            "Active"
                              ? "Pause campaign"
                              : "Resume campaign"
                          }
                          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                        >
                          {campaign.status ===
                          "Active" ? (
                            <Pause className="h-4 w-4" />
                          ) : (
                            <Play className="h-4 w-4" />
                          )}
                        </button>
                      )}

                      <button
                        title="Delete campaign"
                        onClick={() =>
                          handleDelete(campaign.id)
                        }
                        className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>

                      <button
                        title="More actions"
                        className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredCampaigns.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-5 py-12 text-center"
                  >
                    <p className="font-medium text-slate-700">
                      No campaigns found
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      Try changing your search or filters.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: "Active" | "Paused" | "Draft";
}) {
  const styles = {
    Active: "bg-green-100 text-green-700",
    Paused: "bg-amber-100 text-amber-700",
    Draft: "bg-slate-100 text-slate-600",
  };

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  );
}

function SummaryCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-slate-500">
        {label}
      </p>

      <p className="mt-2 text-2xl font-bold text-slate-900">
        {value}
      </p>
    </div>
  );
}