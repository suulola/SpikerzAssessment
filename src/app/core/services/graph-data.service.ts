import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { GraphNode, GraphEdge } from '../models';

@Injectable({
  providedIn: 'root'
})
export class GraphDataService {
  /**
   * Generate mock graph data matching the Figma design.
   * Layout based on the extracted Figma specifications.
   */
  getGraphData(): Observable<{ nodes: GraphNode[], edges: GraphEdge[] }> {
    const nodes: GraphNode[] = [
      {
        id: 'fw-1',
        label: 'edge-fw-01',
        type: 'firewall',
        x: 50,
        y: 100,
        hasBadge: true,
        connections: ['lb-1', 'lb-2']
      },
      {
        id: 'fw-2',
        label: 'edge-fw-02',
        type: 'firewall',
        x: 50,
        y: 250,
        hasBadge: false,
        connections: ['lb-1', 'server-1']
      },

      {
        id: 'lb-1',
        label: 'lb-public-01',
        type: 'load-balancer',
        x: 200,
        y: 100,
        hasBadge: false,
        connections: ['server-1', 'server-2']
      },
      {
        id: 'lb-2',
        label: 'lb-internal-01',
        type: 'load-balancer',
        x: 200,
        y: 250,
        hasBadge: true,
        connections: ['server-2', 'db-1']
      },

      {
        id: 'server-1',
        label: 'app-api-01',
        type: 'server',
        x: 350,
        y: 100,
        hasBadge: false,
        connections: ['db-1']
      },
      {
        id: 'server-2',
        label: 'app-api-02',
        type: 'server',
        x: 350,
        y: 250,
        hasBadge: false,
        connections: ['db-1']
      },

      {
        id: 'db-1',
        label: 'db-primary',
        type: 'database',
        x: 500,
        y: 175,
        hasBadge: false,
        connections: []
      }
    ];

    const edges: GraphEdge[] = [
      {
        id: 'edge-1',
        source: 'fw-1',
        target: 'lb-1',
        animated: false
      },
      {
        id: 'edge-2',
        source: 'fw-1',
        target: 'lb-2',
        animated: false
      },
      {
        id: 'edge-3',
        source: 'fw-2',
        target: 'lb-1',
        animated: false
      },
      {
        id: 'edge-4',
        source: 'fw-2',
        target: 'server-1',
        animated: false
      },

      {
        id: 'edge-5',
        source: 'lb-1',
        target: 'server-1',
        animated: false
      },
      {
        id: 'edge-6',
        source: 'lb-1',
        target: 'server-2',
        animated: false
      },
      {
        id: 'edge-7',
        source: 'lb-2',
        target: 'server-2',
        animated: false
      },
      {
        id: 'edge-8',
        source: 'lb-2',
        target: 'db-1',
        animated: false
      },

      {
        id: 'edge-9',
        source: 'server-1',
        target: 'db-1',
        animated: false
      },
      {
        id: 'edge-10',
        source: 'server-2',
        target: 'db-1',
        animated: false
      }
    ];

    return of({ nodes, edges }).pipe(delay(300));
  }

  /**
   * Get node details by ID (simulated API call)
   */
  getNodeDetails(nodeId: string): Observable<NodeDetails> {
    const details: Record<string, NodeDetails> = {
      'fw-1': {
        id: 'fw-1',
        name: 'edge-fw-01',
        type: 'Firewall',
        status: 'Active',
        description: 'Primary edge firewall controlling inbound SSH traffic',
        ipAddress: '192.168.1.1',
        port: '443',
        protocol: 'HTTPS',
        uptime: '99.9%',
        lastUpdate: '2024-12-22T10:00:00Z'
      },
      'fw-2': {
        id: 'fw-2',
        name: 'edge-fw-02',
        type: 'Firewall',
        status: 'Active',
        description: 'Secondary edge firewall for redundancy',
        ipAddress: '192.168.1.2',
        port: '443',
        protocol: 'HTTPS',
        uptime: '99.8%',
        lastUpdate: '2024-12-22T10:00:00Z'
      },
      'lb-1': {
        id: 'lb-1',
        name: 'lb-public-01',
        type: 'Load Balancer',
        status: 'Active',
        description: 'Public load balancer for SSH and API entry',
        ipAddress: '10.0.1.1',
        port: '80',
        protocol: 'HTTP',
        uptime: '99.95%',
        lastUpdate: '2024-12-22T10:00:00Z'
      },
      'lb-2': {
        id: 'lb-2',
        name: 'lb-internal-01',
        type: 'Load Balancer',
        status: 'Active',
        description: 'Internal load balancer for east-west traffic',
        ipAddress: '10.0.1.2',
        port: '80',
        protocol: 'HTTP',
        uptime: '99.92%',
        lastUpdate: '2024-12-22T10:00:00Z'
      },
      'server-1': {
        id: 'server-1',
        name: 'app-api-01',
        type: 'Server',
        status: 'Active',
        description: 'Primary API node in prod',
        ipAddress: '10.0.2.1',
        port: '8080',
        protocol: 'HTTP',
        uptime: '99.7%',
        lastUpdate: '2024-12-22T10:00:00Z'
      },
      'server-2': {
        id: 'server-2',
        name: 'app-api-02',
        type: 'Server',
        status: 'Active',
        description: 'Secondary API node in prod',
        ipAddress: '10.0.2.2',
        port: '8080',
        protocol: 'HTTP',
        uptime: '99.6%',
        lastUpdate: '2024-12-22T10:00:00Z'
      },
      'db-1': {
        id: 'db-1',
        name: 'db-primary',
        type: 'Database',
        status: 'Active',
        description: 'Primary PostgreSQL cluster leader',
        ipAddress: '10.0.3.1',
        port: '5432',
        protocol: 'PostgreSQL',
        uptime: '99.99%',
        lastUpdate: '2024-12-22T10:00:00Z'
      }
    };

    const nodeDetails = details[nodeId] || this.getDefaultNodeDetails(nodeId);
    return of(nodeDetails).pipe(delay(200));
  }

  private getDefaultNodeDetails(nodeId: string): NodeDetails {
    return {
      id: nodeId,
      name: 'Unknown Node',
      type: 'Unknown',
      status: 'Unknown',
      description: 'No details available',
      ipAddress: 'N/A',
      port: 'N/A',
      protocol: 'N/A',
      uptime: 'N/A',
      lastUpdate: new Date().toISOString()
    };
  }
}

export interface NodeDetails {
  id: string;
  name: string;
  type: string;
  status: string;
  description: string;
  ipAddress: string;
  port: string;
  protocol: string;
  uptime: string;
  lastUpdate: string;
}
