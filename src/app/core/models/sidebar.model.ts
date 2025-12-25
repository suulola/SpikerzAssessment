import { LucideIconData } from 'lucide-angular';

export type SidebarAssetIcon =
  | 'assets/icons/dashboard.svg'
  | 'assets/icons/threat-scenarios.svg'
  | 'assets/icons/vulnerabilities.svg'
  | 'assets/icons/integration.svg'
  | 'assets/icons/policy.svg'
  | 'assets/icons/report.svg'
  | 'assets/icons/sidebar/settings.svg'
  | 'assets/icons/sidebar/notifications.svg';

export type SidebarIcon = SidebarAssetIcon | LucideIconData;

export interface SidebarMenuItem {
  id: string;
  label: string;
  icon: SidebarIcon;
  route?: string;
}

export interface SidebarProfile {
  name: string;
  role: string;
  avatar?: string | null;
}
