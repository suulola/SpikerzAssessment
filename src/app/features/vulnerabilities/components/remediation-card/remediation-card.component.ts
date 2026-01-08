import { Component, input, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { type RemediationIconConfig, type RemediationTechniqueData } from '@core/models';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-remediation-card',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './remediation-card.component.html',
  styleUrl: './remediation-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RemediationCardComponent {
  technique = input.required<RemediationTechniqueData>();
  protected readonly isExpanded = signal(false);

  private readonly iconMapping: Record<'A' | 'B' | 'C', RemediationIconConfig> = {
    A: {
      label: 'Server',
      sublabel: 'Server',
    },
    B: {
      label: 'remediation.icon.firewall',
      sublabel: 'remediation.icon.edge',
    },
    C: {
      label: 'remediation.icon.sensor',
      sublabel: 'remediation.icon.siem',
    },
  };

  protected readonly iconConfig = computed<RemediationIconConfig>(() => {
    return this.iconMapping[this.technique().type];
  });

  protected toggleExpanded(): void {
    this.isExpanded.update((value) => !value);
  }
}
