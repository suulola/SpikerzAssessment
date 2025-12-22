import { Injectable, computed, signal } from '@angular/core';
import { GraphNode, GraphEdge, NodePosition } from '../models';

@Injectable({
  providedIn: 'root'
})
export class GraphStore {
  private readonly _nodes = signal<GraphNode[]>([]);
  private readonly _edges = signal<GraphEdge[]>([]);
  private readonly _selectedNode = signal<GraphNode | null>(null);
  private readonly _popoverPosition = signal<NodePosition | null>(null);
  private readonly _isLoading = signal<boolean>(false);
  private readonly _isPopoverPinned = signal<boolean>(false);

  readonly nodes = this._nodes.asReadonly();
  readonly edges = this._edges.asReadonly();
  readonly selectedNode = this._selectedNode.asReadonly();
  readonly popoverPosition = this._popoverPosition.asReadonly();
  readonly isLoading = this._isLoading.asReadonly();
  readonly isPopoverPinned = this._isPopoverPinned.asReadonly();

  readonly selectedNodeConnections = computed(() => {
    const selected = this._selectedNode();
    if (!selected || !selected.connections) {
      return [];
    }
    return selected.connections;
  });

  readonly connectedNodes = computed(() => {
    const connections = this.selectedNodeConnections();
    const allNodes = this._nodes();
    return allNodes.filter(node => connections.includes(node.id));
  });

  readonly isPopoverOpen = computed(() => {
    return this._selectedNode() !== null && this._popoverPosition() !== null;
  });

  setNodes(nodes: GraphNode[]): void {
    this._nodes.set(nodes);
  }

  setEdges(edges: GraphEdge[]): void {
    this._edges.set(edges);
  }

  selectNode(node: GraphNode, position: NodePosition): void {
    this._selectedNode.set(node);
    this._popoverPosition.set(position);
  }

  clearSelection(): void {
    this._selectedNode.set(null);
    this._popoverPosition.set(null);
    this._isPopoverPinned.set(false);
  }

  pinPopover(): void {
    this._isPopoverPinned.set(true);
  }

  unpinPopover(): void {
    this._isPopoverPinned.set(false);
  }

  setLoading(loading: boolean): void {
    this._isLoading.set(loading);
  }

  getNodeById(id: string): GraphNode | undefined {
    return this._nodes().find(node => node.id === id);
  }

  updateNode(id: string, updates: Partial<GraphNode>): void {
    this._nodes.update(nodes =>
      nodes.map(node =>
        node.id === id ? { ...node, ...updates } : node
      )
    );
  }

  addNode(node: GraphNode): void {
    this._nodes.update(nodes => [...nodes, node]);
  }

  removeNode(id: string): void {
    this._nodes.update(nodes => nodes.filter(node => node.id !== id));

    if (this._selectedNode()?.id === id) {
      this.clearSelection();
    }
  }

  addEdge(edge: GraphEdge): void {
    this._edges.update(edges => [...edges, edge]);
  }

  removeEdge(id: string): void {
    this._edges.update(edges => edges.filter(edge => edge.id !== id));
  }

  reset(): void {
    this._nodes.set([]);
    this._edges.set([]);
    this._selectedNode.set(null);
    this._popoverPosition.set(null);
    this._isLoading.set(false);
  }
}
