import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NodePopoverComponent } from '../../components/node-popover/node-popover.component';
import { VulnerabilityDetailsPanelComponent } from '../../components/vulnerability-details-panel/vulnerability-details-panel.component';
import { VulnerabilityGraphPanelComponent } from '../../components/vulnerability-graph-panel/vulnerability-graph-panel.component';

@Component({
  selector: 'app-vulnerabilities-page',
  standalone: true,
  imports: [
    CommonModule,
    NodePopoverComponent,
    VulnerabilityDetailsPanelComponent,
    VulnerabilityGraphPanelComponent
  ],
  templateUrl: './vulnerabilities-page.component.html',
  styleUrl: './vulnerabilities-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VulnerabilitiesPageComponent {}
