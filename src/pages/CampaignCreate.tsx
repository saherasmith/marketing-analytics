import { FormEvent, useState } from "react";
import { useCampaignStore } from "../store";
import { ArrowLeft, Save } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function CampaignCreate() {
  const navigate = useNavigate();
  const addCampaign = useCampaignStore((state) => state.addCampaign);

  const [name, setName] = useState("");
  const [channel, setChannel] = useState("Google Ads");
  const [objective, setObjective] = useState("Conversions");
  const [budget, setBudget] = useState("");
  const [status, setStatus] = useState("Draft");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!name.trim()) {
      alert("Please enter a campaign name.");
      return;
    }

    addCampaign({
  name,
  channel,
  objective,
  budget: Number(budget) || 0,
  status: status as "Active" | "Paused" | "Draft",
  spend: 0,
  revenue: 0,
  conversions: 0,
});

alert(`Campaign "${name}" created successfully!`);
navigate("/campaigns");
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link
          to="/campaigns"
          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>

        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Create Campaign
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Create a new marketing campaign.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-3xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Campaign Name
            </label>

            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="e.g. Summer Performance Campaign"
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Channel
            </label>

            <select
              value={channel}
              onChange={(event) => setChannel(event.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
            >
              <option>Google Ads</option>
              <option>Meta Ads</option>
              <option>Instagram</option>
              <option>LinkedIn</option>
              <option>Email</option>
              <option>YouTube</option>
              <option>TikTok</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Objective
            </label>

            <select
              value={objective}
              onChange={(event) => setObjective(event.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
            >
              <option>Conversions</option>
              <option>Lead Generation</option>
              <option>Brand Awareness</option>
              <option>Traffic</option>
              <option>Engagement</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Budget
            </label>

            <input
              type="number"
              value={budget}
              onChange={(event) => setBudget(event.target.value)}
              placeholder="5000"
              min="0"
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Status
            </label>

            <select
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
            >
              <option>Draft</option>
              <option>Active</option>
              <option>Paused</option>
            </select>
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-3 border-t border-slate-200 pt-5">
          <Link
            to="/campaigns"
            className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </Link>

          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
          >
            <Save className="h-4 w-4" />
            Create Campaign
          </button>
        </div>
      </form>
    </div>
  );
}