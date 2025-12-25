import { Injectable, inject } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import {
  type GraphNode,
  type GraphEdge,
  type NodePopoverData,
  type GraphData,
  type GraphNodeKind,
  type RemediationTechnique,
  type AssetRiskRow,
  type RiskSummaryItem
} from '../models';
import { GraphConfigurationService } from './graph-configuration.service';

@Injectable({
  providedIn: 'root'
})
export class GraphDomainService {
  private readonly graphConfig = inject(GraphConfigurationService);

  getGraphData(): Observable<GraphData> {
    const nodes: GraphNode[] = [
      {
        id: 'alert',
        label: 'Edge Gateway',
        type: 'alert',
        kind: 'perimeter',
        tag: 'FW',
        popoverData: {
          variant: this.graphConfig.getPopoverVariant('perimeter'),
          title: 'Ingress Alerts',
          vulnerabilities: [
            'CVE-2024-3094',
            'CVE-2023-46805',
            'CVE-2023-34362',
            'CVE-2024-3400',
            'CVE-2023-38408',
            'CVE-2023-44487'
          ],
          metadata: {
            label: 'Site',
            value: 'edge-ams-01'
          }
        } as NodePopoverData
      },
      {
        id: 'server-a',
        label: 'API Gateway',
        type: 'server',
        kind: 'server',
        popoverData: {
          variant: this.graphConfig.getPopoverVariant('server'),
          header: {
            icon: 'assets/icons/graph/node-server.svg',
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
      {
        id: 'server-b',
        label: 'Auth Service',
        type: 'server',
        kind: 'server',
        popoverData: {
          variant: this.graphConfig.getPopoverVariant('server'),
          header: {
            icon: 'assets/icons/graph/node-server.svg',
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
      {
        id: 'endpoint-primary',
        label: 'CustomerDB',
        type: 'endpoint',
        kind: 'endpoint',
        tag: '10.10.31.10',
        icon: 'assets/icons/graph/popover-endpoint.svg',
        popoverData: {
          variant: this.graphConfig.getPopoverVariant('endpoint'),
          header: {
            icon: 'assets/icons/graph/popover-endpoint.svg',
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
      {
        id: 'endpoint-secondary',
        label: 'BillingDB',
        type: 'endpoint',
        kind: 'endpoint',
        tag: '10.10.41.20',
        icon: 'assets/icons/graph/popover-endpoint.svg',
        popoverData: {
          variant: this.graphConfig.getPopoverVariant('endpoint'),
          header: {
            icon: 'assets/icons/graph/popover-endpoint.svg',
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
      }
    ];

    const edges: GraphEdge[] = [
      { id: 'alert-server-a', source: 'alert', target: 'server-a' },
      { id: 'server-a-server-b', source: 'server-a', target: 'server-b' },
      { id: 'server-b-endpoint-primary', source: 'server-b', target: 'endpoint-primary' },
      { id: 'server-b-endpoint-secondary', source: 'server-b', target: 'endpoint-secondary' }
    ];

    return of({ nodes, edges }).pipe(delay(120));
  }

  getAssetRiskRows(): Observable<AssetRiskRow[]> {
    const rows: AssetRiskRow[] = [
      {
        icon: 'assets/icons/graph/asset-server.svg',
        name: 'app-api-01',
        ip: '192.168.1.1',
        risk: 'Critical'
      },
      {
        icon: 'assets/icons/graph/asset-server.svg',
        name: 'app-api-02',
        ip: '192.168.1.2',
        risk: 'Critical'
      },
      {
        icon: 'assets/icons/graph/asset-server.svg',
        name: 'api-gateway-01',
        ip: '192.168.1.8',
        risk: 'High'
      },
      {
        icon: 'assets/icons/graph/asset-server.svg',
        name: 'billing-service-01',
        ip: '192.168.1.12',
        risk: 'Medium'
      },
      {
        icon: 'assets/icons/graph/asset-server.svg',
        name: 'analytics-worker-01',
        ip: '192.168.1.18',
        risk: 'Low'
      },
      {
        icon: 'assets/icons/graph/asset-server.svg',
        name: 'auth-proxy-01',
        ip: '192.168.1.21',
        risk: 'High'
      }
    ];

    return of(rows).pipe(delay(80));
  }

  getRiskSummary(): Observable<RiskSummaryItem[]> {
    const summary: RiskSummaryItem[] = [
      {
        count: 2,
        label: 'Critical',
        toneClass: 'graph-panel__risk-item--critical'
      },
      {
        count: 2,
        label: 'High',
        toneClass: 'graph-panel__risk-item--high'
      },
      {
        count: 1,
        label: 'Medium',
        toneClass: 'graph-panel__risk-item--medium'
      },
      {
        count: 1,
        label: 'Low',
        toneClass: 'graph-panel__risk-item--low'
      }
    ];

    return of(summary).pipe(delay(80));
  }

  getLegendItems(): Array<{ label: RiskSummaryItem['label']; icon: string; toneClass: string }> {
    return [
      {
        label: 'Critical',
        icon: 'assets/icons/graph/legend-critical.svg',
        toneClass: 'graph-panel__legend-chip--critical'
      },
      {
        label: 'High',
        icon: 'assets/icons/graph/legend-high.svg',
        toneClass: 'graph-panel__legend-chip--warning'
      },
      {
        label: 'Low',
        icon: 'assets/icons/graph/legend-low.svg',
        toneClass: 'graph-panel__legend-chip--ok'
      }
    ];
  }

  getRemediationTechniques(kind?: GraphNodeKind): RemediationTechnique[] {
    if (kind !== 'perimeter') {
      return [];
    }

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
}
