import type {
  Campaign,
  CampaignMetric,
  DashboardMetric,
} from "../types";

export function calculateCTR(
  clicks: number,
  impressions: number,
): number {
  if (impressions === 0) return 0;

  return (clicks / impressions) * 100;
}

export function calculateCPC(
  spend: number,
  clicks: number,
): number {
  if (clicks === 0) return 0;

  return spend / clicks;
}

export function calculateConversionRate(
  conversions: number,
  clicks: number,
): number {
  if (clicks === 0) return 0;

  return (conversions / clicks) * 100;
}

export function calculateCPA(
  spend: number,
  conversions: number,
): number {
  if (conversions === 0) return 0;

  return spend / conversions;
}

export function calculateROAS(
  revenue: number,
  spend: number,
): number {
  if (spend === 0) return 0;

  return revenue / spend;
}

export function calculateROI(
  revenue: number,
  spend: number,
): number {
  if (spend === 0) return 0;

  return ((revenue - spend) / spend) * 100;
}

export function aggregateMetrics(
  metrics: CampaignMetric[],
): CampaignMetric {
  return metrics.reduce(
    (total, metric) => ({
      date: metric.date,

      spend: total.spend + metric.spend,

      revenue:
        total.revenue + metric.revenue,

      impressions:
        total.impressions +
        metric.impressions,

      clicks:
        total.clicks + metric.clicks,

      conversions:
        total.conversions +
        metric.conversions,

      leads:
        total.leads + metric.leads,
    }),
    {
      date: "",

      spend: 0,

      revenue: 0,

      impressions: 0,

      clicks: 0,

      conversions: 0,

      leads: 0,
    },
  );
}

export function getCampaignTotals(
  campaign: Campaign,
) {
  const totals = aggregateMetrics(
    campaign.metrics,
  );

  return {
    ...totals,

    ctr: calculateCTR(
      totals.clicks,
      totals.impressions,
    ),

    cpc: calculateCPC(
      totals.spend,
      totals.clicks,
    ),

    conversionRate:
      calculateConversionRate(
        totals.conversions,
        totals.clicks,
      ),

    cpa: calculateCPA(
      totals.spend,
      totals.conversions,
    ),

    roas: calculateROAS(
      totals.revenue,
      totals.spend,
    ),

    roi: calculateROI(
      totals.revenue,
      totals.spend,
    ),
  };
}

export function formatMetric(
  value: number,
  format: DashboardMetric["format"],
): string {
  switch (format) {
    case "currency":
      return new Intl.NumberFormat(
        "en-US",
        {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 0,
        },
      ).format(value);

    case "percent":
      return `${value.toFixed(2)}%`;

    case "decimal":
      return value.toFixed(2);

    case "number":
    default:
      return new Intl.NumberFormat(
        "en-US",
      ).format(Math.round(value));
  }
}