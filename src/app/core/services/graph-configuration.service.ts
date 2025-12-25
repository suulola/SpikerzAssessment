import { Injectable } from '@angular/core';
import { GraphNodeKind, PopoverVariant } from '../models';

@Injectable({
  providedIn: 'root'
})
export class GraphConfigurationService {
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

  readonly popoverVariantByKind: Record<GraphNodeKind, PopoverVariant> = {
    perimeter: 'perimeter',
    server: 'details',
    endpoint: 'details'
  };

  getIconPath(kind: GraphNodeKind): string {
    return this.iconByKind[kind];
  }

  getPopoverIconPath(kind: GraphNodeKind): string {
    return this.popoverIconByKind[kind];
  }

  getPopoverVariant(kind: GraphNodeKind): PopoverVariant {
    return this.popoverVariantByKind[kind];
  }
}
