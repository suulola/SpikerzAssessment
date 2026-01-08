import { Component, ChangeDetectionStrategy, input, output, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith } from 'rxjs/operators';
import { LucideAngularModule, LogOut, LucideIconData } from 'lucide-angular';
import { SidebarMenuItem, SidebarProfile, SidebarIcon } from '@core/models';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  private readonly router = inject(Router);

  private readonly currentRoute = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.router.url),
      startWith(this.router.url)
    )
  );
  readonly menuItems = input<SidebarMenuItem[]>([
    { id: 'dash', label: 'Dashboard', icon: 'assets/icons/dashboard.svg', route: '/dashboard' },
    {
      id: 'threat-scenarios',
      label: 'Threat Scenarios',
      icon: 'assets/icons/threat-scenarios.svg',
      route: '/threat-scenarios',
    },
    {
      id: 'inventory',
      label: 'Inventory',
      icon: 'assets/icons/sidebar/inventory.svg',
      route: '/inventory',
    },
    {
      id: 'vulnerabilities',
      label: 'Vulnerabilities',
      icon: 'assets/icons/vulnerabilities.svg',
      route: '/vulnerabilities',
    },
    {
      id: 'integration',
      label: 'Integration',
      icon: 'assets/icons/integration.svg',
      route: '/integration',
    },
    { id: 'policy', label: 'Policy', icon: 'assets/icons/policy.svg', route: '/policy' },
    { id: 'report', label: 'Report', icon: 'assets/icons/report.svg', route: '/report' },
  ]);
  readonly secondaryMenuItems = input<SidebarMenuItem[]>([
    {
      id: 'settings',
      label: 'Settings',
      icon: 'assets/icons/sidebar/settings.svg',
      route: '/settings',
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: 'assets/icons/sidebar/notifications.svg',
      route: '/notifications',
    },
  ]);
  readonly profile = input<SidebarProfile>({
    name: 'John Doe',
    role: 'Admin',
    avatar: 'assets/icons/sidebar/avatar-default.svg',
  });
  readonly collapsed = input(false);

  readonly menuItemClick = output<SidebarMenuItem>();
  readonly toggle = output<void>();
  readonly logout = output<void>();

  readonly icons = {
    LogOut,
  };

  selectedMenuItemId = computed(() => {
    const currentUrl = this.currentRoute();
    const allMenuItems = [...this.menuItems(), ...this.secondaryMenuItems()];
    const matchedItem = allMenuItems.find((item) => currentUrl?.startsWith(item.route || ''));
    return matchedItem?.id || null;
  });

  isLucideIcon(icon: SidebarIcon): icon is LucideIconData {
    return typeof icon !== 'string';
  }

  onMenuItemClick(menuItem: SidebarMenuItem): void {
    this.menuItemClick.emit(menuItem);
  }

  onToggle(): void {
    this.toggle.emit();
  }

  onLogout(): void {
    this.logout.emit();
  }

  isMenuItemSelected(menuItemId: string): boolean {
    return this.selectedMenuItemId() === menuItemId;
  }

  getUserInitials(): string {
    return this.profile()?.name
      ? this.profile()!
          .name.split(' ')
          .map((part) => part[0])
          .join('')
          .toUpperCase()
          .substring(0, 2)
      : '';
  }
}
