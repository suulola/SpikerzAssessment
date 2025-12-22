export interface SidebarMenuItem {
  id: string;
  label: string;
  icon: any;
  route?: string;
}

export interface SidebarProfile {
  name: string;
  role: string;
  avatar?: string | null;
}
