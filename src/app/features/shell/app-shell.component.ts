import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Router, RouterOutlet } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarMenuItem } from '@core/models';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent, TranslateModule, ToastModule],
  templateUrl: './app-shell.component.html',
  styleUrl: './app-shell.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppShellComponent {
  isSidebarCollapsed = signal(false);
  isMobileSidebarOpen = signal(false);

  constructor(
    private readonly router: Router,
    private readonly messageService: MessageService,
    private readonly translate: TranslateService
  ) {}

  toggleSidebar(): void {
    this.isSidebarCollapsed.update((collapsed) => !collapsed);
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
    this.messageService.add({
      severity: 'info',
      sticky: true,
      summary: this.translate.instant('logout.title'),
      detail: this.translate.instant('logout.body'),
    });
    this.closeMobileSidebar();
  }
}
