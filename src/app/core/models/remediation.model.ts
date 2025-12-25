export type RemediationPriority = 'high' | 'medium' | 'low';

export interface RemediationTechnique {
  id: string;
  title: string;
  description: string;
  priority: RemediationPriority;
}
