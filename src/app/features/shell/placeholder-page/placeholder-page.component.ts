import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-placeholder-page',
  standalone: true,
  imports: [CommonModule, SkeletonModule],
  templateUrl: './placeholder-page.component.html',
  styleUrl: './placeholder-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaceholderPageComponent {
  readonly stats = [1, 2, 3, 4];
  readonly charts = [1, 2, 3];
}
