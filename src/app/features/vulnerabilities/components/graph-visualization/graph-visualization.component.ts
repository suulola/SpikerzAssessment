import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxGraphModule, type Node, type Edge } from '@swimlane/ngx-graph';
import { curveBundle } from 'd3-shape';
import { GraphStore } from '@core/state/graph.store';
import { type NodePopoverData, type GraphNodeKind, type PopoverVariant } from '@core/models';

@Component({
  selector: 'app-graph-visualization',
  standalone: true,
  imports: [CommonModule, NgxGraphModule],
  templateUrl: './graph-visualization.component.html',
  styleUrl: './graph-visualization.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GraphVisualizationComponent {
  private readonly graphStore = inject(GraphStore);
  readonly curve = curveBundle.beta(1);
  private hoverTimeout: any = null;
  readonly iconByKind: Record<GraphNodeKind, string> = {
    perimeter: 'assets/icons/graph/node-perimeter.svg',
    server: 'assets/icons/graph/node-server.svg',
    endpoint: 'assets/icons/graph/popover-endpoint.svg'
  };

  readonly popoverIconByKind: Record<GraphNodeKind, string> = {
    perimeter: 'assets/icons/graph/node-perimeter.svg',
    server: 'assets/icons/graph/node-server.svg',
    endpoint: 'assets/icons/graph/popover-endpoint.svg'
  };

  private readonly popoverVariantByKind: Record<GraphNodeKind, PopoverVariant> = {
    perimeter: 'perimeter',
    server: 'details',
    endpoint: 'details'
  };

  getNodeIcon(node: Node): string {
    const kind = (node.data?.kind || 'server') as GraphNodeKind;
    return node.data?.icon || this.iconByKind[kind];
  }

  readonly nodes: Node[] = [
    {
      id: 'alert',
      label: 'Edge Gateway',
      data: {
        kind: 'perimeter',
        type: 'alert',
        label: 'Edge Gateway',
        tag: 'FW',
        popoverData: {
          variant: this.popoverVariantByKind.perimeter,
          title: 'Ingress Alerts',
          vulnerabilities: ['CVE-2024-3094', 'CVE-2023-46805', 'CVE-2023-34362', 'CVE-2024-3400', 'CVE-2023-38408', 'CVE-2023-44487'],
          metadata: {
            label: 'Site',
            value: 'edge-ams-01'
          }
        } as NodePopoverData
      },
      dimension: {
        width: 120,
        height: 130
      }
    },
    {
      id: 'server-a',
      label: 'API Gateway',
      data: {
        kind: 'server',
        type: 'server',
        label: 'ApiGw-01',
        popoverData: {
          variant: this.popoverVariantByKind.server,
          header: {
            icon: this.popoverIconByKind.server,
            title: 'ApiGw-01'
          },
          rows: [
            {
              gap: 'tight',
              items: [
                { type: 'icon', icon: 'assets/icons/popover/receipt-text.svg' },
                { type: 'text', value: 'Service:', textStyle: 'title' },
                { type: 'text', value: 'Public API', textStyle: 'title' },
                { type: 'chip', value: '10.10.12.14', tone: 'purple' }
              ]
            },
            {
              gap: 'tight',
              items: [
                { type: 'chip', value: '10.10.12.14', tone: 'purple' },
                { type: 'text', value: 'Ports', textStyle: 'title' },
                { type: 'chip', value: '443', tone: 'purple' },
                { type: 'chip', value: '8443', tone: 'purple' }
              ]
            }
          ]
        } as NodePopoverData
      },
      dimension: {
        width: 120,
        height: 130
      }
    },
    {
      id: 'server-b',
      label: 'Auth Service',
      data: {
        kind: 'server',
        type: 'server',
        label: 'AuthSrv-02',
        popoverData: {
          variant: this.popoverVariantByKind.server,
          header: {
            icon: this.popoverIconByKind.server,
            title: 'AuthSrv-02'
          },
          rows: [
            {
              gap: 'tight',
              items: [
                { type: 'icon', icon: 'assets/icons/popover/receipt-text.svg' },
                { type: 'text', value: 'Policy:', textStyle: 'title' },
                { type: 'chip', value: 'MFA', tone: 'yellow' },
                { type: 'chip', value: 'Enforced', tone: 'green' },
                { type: 'text', value: 'SSO Gateway', textStyle: 'title' }
              ]
            },
            {
              gap: 'tight',
              items: [
                { type: 'chip', value: '10.10.22.21', tone: 'purple' },
                { type: 'text', value: 'Hosts', textStyle: 'title' },
                { type: 'chip', value: '10.10.22.22', tone: 'purple' },
                { type: 'chip', value: '10.10.22.23', tone: 'purple' },
                { type: 'chip', value: 'ALB-2A7B', tone: 'blue' }
              ]
            },
            {
              gap: 'tight',
              items: [
                { type: 'icon', icon: 'assets/icons/popover/receipt-text.svg' },
                { type: 'text', value: 'Region:', textStyle: 'title' },
                { type: 'chip', value: 'us-east-1', tone: 'yellow' },
                { type: 'text', value: 'Auth Cluster', textStyle: 'title' }
              ]
            },
            {
              gap: 'tight',
              items: [
                { type: 'chip', value: '10.10.22.21', tone: 'purple' },
                { type: 'chip', value: '10.10.22.22', tone: 'purple' },
                { type: 'text', value: 'Targets', textStyle: 'title' },
                { type: 'chip', value: '10.10.22.23', tone: 'purple' },
                { type: 'chip', value: '10.10.22.24', tone: 'purple' }
              ]
            }
          ]
        } as NodePopoverData
      },
      dimension: {
        width: 120,
        height: 130
      }
    },
    {
      id: 'endpoint-primary',
      label: 'Customer DB',
      data: {
        kind: 'endpoint',
        type: 'endpoint',
        label: 'CustomerDB',
        tag: '10.10.31.10',
        popoverData: {
          variant: this.popoverVariantByKind.endpoint,
          header: {
            icon: this.popoverIconByKind.endpoint,
            title: 'CustomerDB'
          },
          rows: [
            {
              gap: 'tight',
              items: [
                { type: 'icon', icon: 'assets/icons/popover/receipt-text.svg' },
                { type: 'text', value: 'Database:', textStyle: 'title' },
                { type: 'text', value: 'Customer Records', textStyle: 'title' },
                { type: 'chip', value: '10.10.31.10', tone: 'purple' }
              ]
            },
            {
              gap: 'tight',
              items: [
                { type: 'chip', value: '10.10.31.10', tone: 'purple' },
                { type: 'text', value: 'Ports', textStyle: 'title' },
                { type: 'chip', value: '5432', tone: 'purple' },
                { type: 'chip', value: '6432', tone: 'purple' }
              ]
            }
          ]
        } as NodePopoverData
      },
      dimension: {
        width: 120,
        height: 130
      }
    },
    {
      id: 'endpoint-secondary',
      label: 'Billing DB',
      data: {
        kind: 'endpoint',
        type: 'endpoint',
        label: 'BillingDB',
        tag: '10.10.41.20',
        popoverData: {
          variant: this.popoverVariantByKind.endpoint,
          header: {
            icon: this.popoverIconByKind.endpoint,
            title: 'BillingDB'
          },
          rows: [
            {
              gap: 'tight',
              items: [
                { type: 'icon', icon: 'assets/icons/popover/receipt-text.svg' },
                { type: 'text', value: 'Policy:', textStyle: 'title' },
                { type: 'chip', value: 'PCI', tone: 'yellow' },
                { type: 'chip', value: 'Encrypted', tone: 'green' },
                { type: 'text', value: 'Billing Ledger', textStyle: 'title' }
              ]
            },
            {
              gap: 'tight',
              items: [
                { type: 'chip', value: '10.10.41.20', tone: 'purple' },
                { type: 'text', value: 'Hosts', textStyle: 'title' },
                { type: 'chip', value: '10.10.41.21', tone: 'purple' },
                { type: 'chip', value: '10.10.41.22', tone: 'purple' },
                { type: 'chip', value: 'LB-7C2F', tone: 'blue' }
              ]
            },
            {
              gap: 'tight',
              items: [
                { type: 'icon', icon: 'assets/icons/popover/receipt-text.svg' },
                { type: 'text', value: 'Region:', textStyle: 'title' },
                { type: 'chip', value: 'eu-west-1', tone: 'yellow' },
                { type: 'text', value: 'Billing Cluster', textStyle: 'title' }
              ]
            },
            {
              gap: 'tight',
              items: [
                { type: 'chip', value: '10.10.41.20', tone: 'purple' },
                { type: 'chip', value: '10.10.41.21', tone: 'purple' },
                { type: 'text', value: 'Targets', textStyle: 'title' },
                { type: 'chip', value: '10.10.41.22', tone: 'purple' },
                { type: 'chip', value: '10.10.41.23', tone: 'purple' }
              ]
            }
          ]
        } as NodePopoverData
      },
      dimension: {
        width: 120,
        height: 130
      }
    }
  ];

  readonly links: Edge[] = [
    {
      id: 'alert-server-a',
      source: 'alert',
      target: 'server-a'
    },
    {
      id: 'server-a-server-b',
      source: 'server-a',
      target: 'server-b'
    },
    {
      id: 'server-b-endpoint-primary',
      source: 'server-b',
      target: 'endpoint-primary'
    },
    {
      id: 'server-b-endpoint-secondary',
      source: 'server-b',
      target: 'endpoint-secondary'
    }
  ];

  readonly layout = 'dagre';

  readonly layoutSettings = {
    orientation: 'LR',
    nodePadding: 20,
    rankPadding: 40,
    marginX: 20,
    marginY: 20
  };

  readonly view: [number, number] = [727, 308];
  readonly panOffsetX = 36.5;
  readonly panOffsetY = 86;

  protected onNodeHover(event: MouseEvent, node: Node): void {
    if (this.hoverTimeout) {
      clearTimeout(this.hoverTimeout);
    }
    this.graphStore.unpinPopover();

    const popoverData = node.data?.popoverData;
    if (!popoverData) return;

    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const kind = (node.data?.kind || 'server') as GraphNodeKind;
    const popoverIcon = this.popoverIconByKind[kind];
    const variant = popoverData.variant ?? this.popoverVariantByKind[kind];
    const popoverX = this.getPopoverX(rect, variant);

    this.graphStore.selectNode(
      {
        id: node.id,
        label: node.label || '',
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
        radius: 50,
        color: '#1873DE',
        type: node.data?.type || 'unknown',
        kind,
        popoverData: {
          ...popoverData,
          variant,
          header: popoverData.header
            ? { ...popoverData.header, icon: popoverData.header.icon || popoverIcon }
            : popoverData.header
        }
      },
      {
        x: popoverX,
        y: rect.bottom + 10
      }
    );
  }

  private getPopoverX(rect: DOMRect, variant: PopoverVariant): number {
    const viewportWidth = window.innerWidth;
    const viewportPadding = 16;
    const mobileWidth = viewportWidth * 0.9;
    const baseWidth = variant === 'perimeter' ? 460 : 391;
    const maxPopoverWidth = Math.max(0, Math.min(baseWidth, mobileWidth));
    const halfWidth = maxPopoverWidth / 2;
    const centerX = rect.left + rect.width / 2;
    const minX = viewportPadding + halfWidth;
    const maxX = viewportWidth - viewportPadding - halfWidth;

    return Math.min(Math.max(centerX, minX), maxX);
  }

  protected onNodeLeave(): void {
    if (this.hoverTimeout) {
      clearTimeout(this.hoverTimeout);
    }

    this.hoverTimeout = setTimeout(() => {
      if (!this.graphStore.isPopoverPinned()) {
        this.graphStore.clearSelection();
      }
    }, 150);
  }
}
