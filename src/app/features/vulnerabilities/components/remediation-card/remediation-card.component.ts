import { Component, input, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface RemediationTechniqueData {
  readonly id: string;
  readonly title: string;
  readonly shortDescription: string;
  readonly fullDescription: string;
  readonly type: 'A' | 'B' | 'C';
}

interface IconConfig {
  readonly label: string;
  readonly sublabel: string;
}

@Component({
  selector: 'app-remediation-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './remediation-card.component.html',
  styleUrl: './remediation-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RemediationCardComponent {
  technique = input.required<RemediationTechniqueData>();
  protected readonly isExpanded = signal(false);

  private readonly iconMapping: Record<'A' | 'B' | 'C', IconConfig> = {
    A: {
      label: 'SSH Server',
      sublabel: 'Bastion'
    },
    B: {
      label: 'Firewall',
      sublabel: 'Edge'
    },
    C: {
      label: 'Sensor',
      sublabel: 'SIEM'
    }
  };

  protected readonly iconConfig = computed<IconConfig>(() => {
    return this.iconMapping[this.technique().type];
  });

  protected toggleExpanded(): void {
    this.isExpanded.update(value => !value);
  }
}
