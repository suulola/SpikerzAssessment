export type RiskLevel = 'Critical' | 'High' | 'Medium' | 'Low';

export interface AssetRiskRow {
  icon: string;
  name: string;
  ip: string;
  risk: RiskLevel;
}

export interface RiskSummaryItem {
  count: number;
  label: RiskLevel;
  toneClass: string;
}
