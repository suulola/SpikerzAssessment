import { Component, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { DividerModule } from 'primeng/divider';
import { GraphStore } from '@core/state/graph.store';
import { GraphNode } from '@core/models';

@Component({
  selector: 'app-node-popover',
  standalone: true,
  imports: [CommonModule, ButtonModule, ChipModule, DividerModule],
  templateUrl: './node-popover.component.html',
  styleUrl: './node-popover.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NodePopoverComponent {
  constructor(private readonly graphStore: GraphStore) {}

  get selectedNode() {
    return this.graphStore.selectedNode;
  }

  get popoverPosition() {
    return this.graphStore.popoverPosition;
  }

  get isOpen() {
    return this.graphStore.isPopoverOpen;
  }

  connectedNodes = computed(() => {
    return this.graphStore.connectedNodes();
  });

  nodeTypeDisplay = computed(() => {
    const node = this.selectedNode();
    if (!node) return '';

    const typeMap: Record<string, string> = {
      'firewall': 'Firewall',
      'load-balancer': 'Load Balancer',
      'server': 'Server',
      'database': 'Database'
    };

    return typeMap[node.type] || node.type;
  });

  nodeStatusVariant = computed(() => {
    const node = this.selectedNode();
    if (!node) return 'success';

    return 'success';
  });

  getNodeTypeClass(type: string): string {
    return `node-type-${type}`;
  }

  getNodeTypeIcon(type: string): string {
    const iconMap: Record<string, string> = {
      'firewall': 'pi pi-shield',
      'load-balancer': 'pi pi-server',
      'server': 'pi pi-desktop',
      'database': 'pi pi-database'
    };

    return iconMap[type] || 'pi pi-circle';
  }

  getNodeBackgroundColor(type: string): string {
    const colorMap: Record<string, string> = {
      'firewall': '#FFF1F0',
      'load-balancer': '#D7EAFF',
      'server': '#F0F1F3',
      'database': '#E9FAF0'
    };

    return colorMap[type] || '#FFFFFF';
  }

  getNodeIconColor(type: string): string {
    const colorMap: Record<string, string> = {
      'firewall': '#E5372B',
      'load-balancer': '#1873DE',
      'server': '#858D9D',
      'database': '#02983E'
    };

    return colorMap[type] || '#525D73';
  }

  remediationTechniques = computed(() => {
    const node = this.selectedNode();
    if (!node) return [];

    if (node.type === 'firewall') {
      return [
        {
          id: '1',
          title: 'Update firewall rules',
          description: 'Review and update firewall rules to ensure proper security configuration.',
          priority: 'high'
        },
        {
          id: '2',
          title: 'Enable logging',
          description: 'Enable detailed logging for security monitoring and audit trails.',
          priority: 'medium'
        },
        {
          id: '3',
          title: 'Configure rate limiting',
          description: 'Implement rate limiting to prevent DDoS attacks.',
          priority: 'medium'
        }
      ];
    }

    return [];
  });

  close(): void {
    this.graphStore.clearSelection();
  }

  onPopoverClick(event: MouseEvent): void {
    event.stopPropagation();
  }

  onPopoverEnter(event: MouseEvent): void {
    event.stopPropagation();
    this.graphStore.pinPopover();
  }

  onPopoverLeave(): void {
    this.graphStore.unpinPopover();
    this.close();
  }

  onBackdropClick(): void {
    this.close();
  }

  getPopoverStyles = computed(() => {
    const position = this.popoverPosition();
    if (!position) {
      return {
        display: 'none'
      };
    }

    return {
      display: 'block',
      position: 'fixed',
      left: `${position.x}px`,
      top: `${position.y}px`,
      transform: 'translateY(-50%)'
    };
  });

  connectionCount = computed(() => {
    const connections = this.connectedNodes();
    return connections.length;
  });

  getPriorityClass(priority: string): string {
    return `priority-${priority}`;
  }

  trackByTechniqueId(_index: number, technique: any): string {
    return technique.id;
  }

  trackByNodeId(_index: number, node: GraphNode): string {
    return node.id;
  }
}
