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
  type RiskSummaryItem,
} from '../models';
import { GraphConfigurationService } from './graph-configuration.service';

@Injectable({
  providedIn: 'root',
})
export class GraphDomainService {
  private readonly graphConfig = inject(GraphConfigurationService);

  getGraphData(): Observable<GraphData> {
    const nodes: GraphNode[] = [
      {
        id: 'alert',
        label: 'Loremipsumm',
        type: 'alert',
        kind: 'perimeter',
        popoverData: {
          variant: this.graphConfig.getPopoverVariant('perimeter'),
          title: 'Lorem Ipsum Dolor Sit',
          vulnerabilities: ['1.2.3.4', '1.2.3.4', '1.2.3.4', '1.2.3.4', '1.2.3.4', '1.2.3.4'],
          metadata: {
            label: 'Lorem',
            value: '1.2.3.4',
          },
        } as NodePopoverData,
      },
      {
        id: 'server-a',
        label: 'Loremipsu',
        type: 'server',
        kind: 'server',
        popoverData: {
          variant: this.graphConfig.getPopoverVariant('server'),
          header: {
            icon: 'assets/icons/graph/node-server.svg',
            title: 'Loremipsu',
          },
          rows: [
            {
              gap: 'tight',
              items: [
                { type: 'icon', icon: 'assets/icons/popover/receipt-text.svg' },
                { type: 'text', value: 'Lorem:', textStyle: 'title' },
                { type: 'text', value: 'Loremipsum Loremipsum', textStyle: 'title' },
                { type: 'chip', value: '1.2.3.4', tone: 'purple' },
              ],
            },
            {
              gap: 'tight',
              items: [
                { type: 'chip', value: '1.2.3.4', tone: 'purple' },
                { type: 'text', value: 'Loremipsum', textStyle: 'title' },
                { type: 'chip', value: '1.2.3.4', tone: 'purple' },
                { type: 'chip', value: '1.2.3.4', tone: 'purple' },
              ],
            },
          ],
        } as NodePopoverData,
      },
      {
        id: 'server-b',
        label: 'graph.nodes.authService',
        type: 'server',
        kind: 'server',
        popoverData: {
          variant: this.graphConfig.getPopoverVariant('server'),
          header: {
            icon: 'assets/icons/graph/node-server.svg',
            title: 'Loremipsu',
          },
          rows: [
            {
              gap: 'tight',
              items: [
                { type: 'icon', icon: 'assets/icons/popover/receipt-text.svg' },
                { type: 'text', value: 'Lorem:', textStyle: 'title' },
                { type: 'text', value: 'Loremipsum Loremipsum', textStyle: 'title' },
                { type: 'chip', value: '1.2.3.4', tone: 'purple' },
              ],
            },
            {
              gap: 'tight',
              items: [
                { type: 'chip', value: '1.2.3.4', tone: 'purple' },
                { type: 'text', value: 'Loremipsum', textStyle: 'title' },
                { type: 'chip', value: '1.2.3.4', tone: 'purple' },
                { type: 'chip', value: '1.2.3.4', tone: 'purple' },
              ],
            },
          ],
        } as NodePopoverData,
      },
      {
        id: 'endpoint-primary',
        label: 'Loremipsumdolorsit',
        type: 'endpoint',
        kind: 'endpoint',
        tag: '192.168.1.1',
        icon: 'assets/icons/graph/popover-endpoint.svg',
        popoverData: {
          variant: this.graphConfig.getPopoverVariant('endpoint'),
          header: {
            icon: 'assets/icons/graph/popover-endpoint.svg',
            title: 'Loremipsumdolorsit',
            subtitle: '192.168.1.1',
          },
          rows: [
            {
              gap: 'tight',
              items: [
                { type: 'icon', icon: 'assets/icons/popover/receipt-text.svg' },
                { type: 'text', value: 'Lorem:', textStyle: 'title' },
                { type: 'chip', value: 'Lorem "ipsum"', tone: 'yellow' },
              ],
            },
            {
              gap: 'tight',
              items: [
                { type: 'text', value: 'Loremipsum', textStyle: 'title' },
                { type: 'chip', value: 'lorem 1234,5678', tone: 'blue' },
              ],
            },
          ],
        } as NodePopoverData,
      },
      {
        id: 'endpoint-secondary',
        label: 'Loremipsumdolorsit002',
        type: 'endpoint',
        kind: 'endpoint',
        tag: '192.168.1.2',
        icon: 'assets/icons/graph/popover-endpoint.svg',
        popoverData: {
          variant: this.graphConfig.getPopoverVariant('endpoint'),
          header: {
            icon: 'assets/icons/graph/popover-endpoint.svg',
            title: 'Loremipsumdolorsit002',
            subtitle: '192.168.1.2',
          },
          rows: [
            {
              gap: 'tight',
              items: [
                { type: 'icon', icon: 'assets/icons/popover/receipt-text.svg' },
                { type: 'text', value: 'Lorem:', textStyle: 'title' },
                { type: 'chip', value: 'Lorem "ipsum"', tone: 'yellow' },
              ],
            },
            {
              gap: 'tight',
              items: [
                { type: 'text', value: 'Loremipsum', textStyle: 'title' },
                { type: 'chip', value: 'lorem 1234,5678', tone: 'blue' },
              ],
            },
          ],
        } as NodePopoverData,
      },
    ];

    const edges: GraphEdge[] = [
      { id: 'alert-server-a', source: 'alert', target: 'server-a' },
      { id: 'server-a-server-b', source: 'server-a', target: 'server-b' },
      { id: 'server-b-endpoint-primary', source: 'server-b', target: 'endpoint-primary' },
      { id: 'server-b-endpoint-secondary', source: 'server-b', target: 'endpoint-secondary' },
    ];

    return of({ nodes, edges }).pipe(delay(120));
  }

  getAssetRiskRows(): Observable<AssetRiskRow[]> {
    const rows: AssetRiskRow[] = [
      {
        icon: 'assets/icons/graph/asset-server.svg',
        name: 'Loremipsumdolorsit',
        ip: '192.168.1.1',
        risk: 'Critical',
      },
      {
        icon: 'assets/icons/graph/asset-server.svg',
        name: 'Loremipsumdolorsit002',
        ip: '192.168.1.2',
        risk: 'Critical',
      },
      {
        icon: 'assets/icons/graph/asset-server.svg',
        name: 'api-gateway-01',
        ip: '192.168.1.8',
        risk: 'High',
      },
      {
        icon: 'assets/icons/graph/asset-server.svg',
        name: 'billing-service-01',
        ip: '192.168.1.12',
        risk: 'Medium',
      },
      {
        icon: 'assets/icons/graph/asset-server.svg',
        name: 'analytics-worker-01',
        ip: '192.168.1.18',
        risk: 'Low',
      },
      {
        icon: 'assets/icons/graph/asset-server.svg',
        name: 'auth-proxy-01',
        ip: '192.168.1.21',
        risk: 'High',
      },
    ];

    return of(rows).pipe(delay(80));
  }

  getRiskSummary(): Observable<RiskSummaryItem[]> {
    const summary: RiskSummaryItem[] = [
      {
        count: 2,
        label: 'Critical',
        toneClass: 'graph-panel__risk-item--critical',
      },
      {
        count: 2,
        label: 'High',
        toneClass: 'graph-panel__risk-item--high',
      },
      {
        count: 1,
        label: 'Medium',
        toneClass: 'graph-panel__risk-item--medium',
      },
      {
        count: 1,
        label: 'Low',
        toneClass: 'graph-panel__risk-item--low',
      },
    ];

    return of(summary).pipe(delay(80));
  }

  getLegendItems(): Array<{ label: RiskSummaryItem['label']; icon: string; toneClass: string }> {
    return [
      {
        label: 'Critical',
        icon: 'assets/icons/graph/legend-critical.svg',
        toneClass: 'graph-panel__legend-chip--critical',
      },
      {
        label: 'High',
        icon: 'assets/icons/graph/legend-high.svg',
        toneClass: 'graph-panel__legend-chip--warning',
      },
      {
        label: 'Low',
        icon: 'assets/icons/graph/legend-low.svg',
        toneClass: 'graph-panel__legend-chip--ok',
      },
    ];
  }

  getRemediationTechniques(kind?: GraphNodeKind): RemediationTechnique[] {
    if (kind !== 'perimeter') {
      return [];
    }

    return [
      {
        id: '1',
        title: 'graph.remediation.updateFirewallRules.title',
        description: 'graph.remediation.updateFirewallRules.description',
        priority: 'high',
      },
      {
        id: '2',
        title: 'graph.remediation.enableLogging.title',
        description: 'graph.remediation.enableLogging.description',
        priority: 'medium',
      },
      {
        id: '3',
        title: 'graph.remediation.configureRateLimiting.title',
        description: 'graph.remediation.configureRateLimiting.description',
        priority: 'medium',
      },
    ];
  }
}
