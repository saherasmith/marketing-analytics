import { create } from "zustand";

export type CampaignStatus = "Active" | "Paused" | "Draft";

export type Campaign = {
  id: number;
  name: string;
  channel: string;
  status: CampaignStatus;
  spend: number;
  revenue: number;
  conversions: number;
  objective?: string;
  budget?: number;
};

type CampaignStore = {
  campaigns: Campaign[];
  addCampaign: (campaign: Omit<Campaign, "id">) => void;
  deleteCampaign: (id: number) => void;
  toggleCampaign: (id: number) => void;
};

const initialCampaigns: Campaign[] = [
  {
    id: 1,
    name: "Summer Performance Campaign",
    channel: "Google Ads",
    status: "Active",
    spend: 8420,
    revenue: 24680,
    conversions: 284,
  },
  {
    id: 2,
    name: "Social Media Awareness",
    channel: "Meta Ads",
    status: "Active",
    spend: 5280,
    revenue: 14920,
    conversions: 196,
  },
  {
    id: 3,
    name: "B2B Lead Generation",
    channel: "LinkedIn",
    status: "Paused",
    spend: 3140,
    revenue: 9870,
    conversions: 84,
  },
  {
    id: 4,
    name: "Holiday Email Campaign",
    channel: "Email",
    status: "Draft",
    spend: 850,
    revenue: 3200,
    conversions: 42,
  },
];

export const useCampaignStore = create<CampaignStore>((set) => ({
  campaigns: initialCampaigns,

  addCampaign: (campaign) =>
    set((state) => ({
      campaigns: [
        ...state.campaigns,
        {
          ...campaign,
          id: Date.now(),
        },
      ],
    })),

  deleteCampaign: (id) =>
    set((state) => ({
      campaigns: state.campaigns.filter(
        (campaign) => campaign.id !== id,
      ),
    })),

  toggleCampaign: (id) =>
    set((state) => ({
      campaigns: state.campaigns.map((campaign) =>
        campaign.id === id
          ? {
              ...campaign,
              status:
                campaign.status === "Active"
                  ? "Paused"
                  : "Active",
            }
          : campaign,
      ),
    })),
}));