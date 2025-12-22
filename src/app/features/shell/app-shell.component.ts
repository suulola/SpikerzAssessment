import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarMenuItem } from './sidebar/sidebar.types';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent],
  templateUrl: './app-shell.component.html',
  styleUrl: './app-shell.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppShellComponent {
  isSidebarCollapsed = signal(false);
  isMobileSidebarOpen = signal(false);

  constructor(private readonly router: Router) {}

  toggleSidebar(): void {
    this.isSidebarCollapsed.update(collapsed => !collapsed);
  }

  openMobileSidebar(): void {
    this.isMobileSidebarOpen.set(true);
  }

  closeMobileSidebar(): void {
    this.isMobileSidebarOpen.set(false);
  }

  onMenuItemClick(menuItem: SidebarMenuItem): void {
    if (menuItem.route) {
      this.router.navigate([menuItem.route]);
    }

    this.closeMobileSidebar();
  }

  onSidebarLogout(): void {
    console.log('Logout clicked');
    this.closeMobileSidebar();
  }
}
