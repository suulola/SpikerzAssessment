export interface RemediationTechniqueData {
  readonly id: string;
  readonly title: string;
  readonly shortDescription: string;
  readonly fullDescription: string;
  readonly type: 'A' | 'B' | 'C';
}

export interface RemediationIconConfig {
  readonly label: string;
  readonly sublabel: string;
}
