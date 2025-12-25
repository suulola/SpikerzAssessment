import { GraphNode } from './graph-node.model';
import { GraphEdge } from './graph-edge.model';

export interface GraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
}
