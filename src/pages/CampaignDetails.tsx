import { ArrowLeft, BarChart3, DollarSign, Target, Users } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useCampaignStore } from "../store";

export default function CampaignDetails() {
  const { id } = useParams();
  const campaigns = useCampaignStore((state) => state.campaigns);

  const campaign = campaigns.find(
    (item) => item.id === Number(id),
  );

  if (!campaign) {
    return (
      <div className="space-y-4">
        <Link
          to="/campaigns"
          className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Campaigns
        </Link>

        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
          <h1 className="text-xl font-bold text-slate-900">
            Campaign not found
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            The campaign you're looking for does not exist.
          </p>
        </div>
      </div>
    );
  }

  const roas =
    campaign.spend > 0
      ? (campaign.revenue / campaign.spend).toFixed(2)
      : "0.00";

  return (
    <div className="space-y-6">
      <Link
        to="/campaigns"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Campaigns
      </Link>

      <div className="flex flex-col justify-between gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:flex-row md:items-center">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-900">
              {campaign.name}
            </h1>

            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
              {campaign.status}
            </span>
          </div>

          <p className="mt-2 text-sm text-slate-500">
            {campaign.channel} • {campaign.objective ?? "Marketing Campaign"}
          </p>
        </div>

        <Link
          to="/campaigns"
          className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          Manage Campaign
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          icon={<DollarSign className="h-5 w-5" />}
          label="Spend"
          value={`$${campaign.spend.toLocaleString()}`}
        />

        <MetricCard
          icon={<BarChart3 className="h-5 w-5" />}
          label="Revenue"
          value={`$${campaign.revenue.toLocaleString()}`}
        />

        <MetricCard
          icon={<Users className="h-5 w-5" />}
          label="Conversions"
          value={campaign.conversions.toLocaleString()}
        />

        <MetricCard
          icon={<Target className="h-5 w-5" />}
          label="ROAS"
          value={`${roas}x`}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-semibold text-slate-900">
            Campaign Information
          </h2>

          <div className="mt-5 space-y-4">
            <InfoRow
              label="Campaign Name"
              value={campaign.name}
            />

            <InfoRow
              label="Channel"
              value={campaign.channel}
            />

            <InfoRow
              label="Objective"
              value={campaign.objective ?? "Conversions"}
            />

            <InfoRow
              label="Budget"
              value={`$${(campaign.budget ?? 0).toLocaleString()}`}
            />

            <InfoRow
              label="Status"
              value={campaign.status}
            />
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-semibold text-slate-900">
            Performance Summary
          </h2>

          <div className="mt-5 space-y-4">
            <InfoRow
              label="Total Spend"
              value={`$${campaign.spend.toLocaleString()}`}
            />

            <InfoRow
              label="Total Revenue"
              value={`$${campaign.revenue.toLocaleString()}`}
            />

            <InfoRow
              label="Conversions"
              value={campaign.conversions.toLocaleString()}
            />

            <InfoRow
              label="Return on Ad Spend"
              value={`${roas}x`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3 text-slate-500">
        {icon}
        <span className="text-sm">{label}</span>
      </div>

      <p className="mt-3 text-2xl font-bold text-slate-900">
        {value}
      </p>
    </div>
  );
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
      <span className="text-sm text-slate-500">
        {label}
      </span>

      <span className="text-sm font-semibold text-slate-900">
        {value}
      </span>
    </div>
  );
}