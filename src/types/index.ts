export type CampaignStatus =
  | "active"
  | "paused"
  | "scheduled"
  | "completed"
  | "archived";

export type CampaignObjective =
  | "Brand Awareness"
  | "Traffic"
  | "Engagement"
  | "Lead Generation"
  | "Conversions"
  | "Sales"
  | "App Installs";

export type Channel =
  | "Google Ads"
  | "Meta Ads"
  | "Instagram"
  | "LinkedIn"
  | "YouTube"
  | "TikTok"
  | "Email"
  | "Organic Search";

export type CreativeType =
  | "Image"
  | "Video"
  | "Carousel"
  | "Text"
  | "Story"
  | "Reel"
  | "Email";

export interface CampaignMetric {
  date: string;
  spend: number;
  revenue: number;
  impressions: number;
  clicks: number;
  conversions: number;
  leads: number;
}

export interface Campaign {
  id: string;
  name: string;
  description: string;

  objective: CampaignObjective;

  channel: Channel;

  startDate: string;
  endDate: string;

  budget: number;
  dailyBudget: number;

  targetAudience: string;

  location: string;

  ageRange: string;

  gender: string;

  interests: string[];

  keywords: string[];

  landingPage: string;

  utmSource: string;
  utmMedium: string;
  utmCampaign: string;

  creativeType: CreativeType;

  status: CampaignStatus;

  metrics: CampaignMetric[];

  createdAt: string;
  updatedAt: string;
}

export interface AnalyticsMetric {
  date: string;

  spend: number;
  revenue: number;

  impressions: number;
  clicks: number;

  conversions: number;
  leads: number;
}

export type LeadStatus =
  | "New"
  | "Contacted"
  | "Qualified"
  | "Proposal"
  | "Converted"
  | "Lost";

export interface Lead {
  id: string;

  name: string;
  email: string;
  company: string;

  source: Channel;

  campaignId: string;

  status: LeadStatus;

  score: number;

  createdDate: string;
  lastActivity: string;

  assignedTo: string;

  notes: string;
}

export type TaskStatus =
  | "Todo"
  | "In Progress"
  | "Review"
  | "Completed";

export type TaskPriority =
  | "Low"
  | "Medium"
  | "High"
  | "Urgent";

export interface MarketingTask {
  id: string;

  title: string;

  description: string;

  assignedTo: string;

  campaignId?: string;

  dueDate: string;

  priority: TaskPriority;

  status: TaskStatus;

  createdAt: string;
}

export type TeamRole =
  | "Admin"
  | "Manager"
  | "Analyst"
  | "Content Manager"
  | "Viewer";

export interface TeamMember {
  id: string;

  name: string;

  email: string;

  role: TeamRole;

  status: "Active" | "Inactive";

  assignedCampaigns: number;

  lastActive: string;
}

export type NotificationType =
  | "budget"
  | "campaign"
  | "performance"
  | "task"
  | "report"
  | "lead"
  | "system";

export interface Notification {
  id: string;

  title: string;

  message: string;

  type: NotificationType;

  read: boolean;

  createdAt: string;
}

export interface DateRange {
  start: string;
  end: string;
  label: string;
}

export interface Report {
  id: string;

  name: string;

  dateRange: DateRange;

  campaignIds: string[];

  channels: Channel[];

  metrics: string[];

  charts: string[];

  tables: string[];

  createdAt: string;
}

export interface AudienceSegment {
  id: string;

  name: string;

  size: number;

  conversionRate: number;

  engagementRate: number;

  revenue: number;
}

export interface Filter {
  campaign?: string;

  channel?: Channel;

  status?: CampaignStatus;

  location?: string;

  audience?: string;

  device?: string;
}

export interface DashboardMetric {
  label: string;

  value: number;

  previousValue: number;

  change: number;

  format:
    | "currency"
    | "number"
    | "percent"
    | "decimal";

  suffix?: string;

  sparkline: number[];
}