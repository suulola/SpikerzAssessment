export type PopoverVariant = 'perimeter' | 'details';
export type GraphNodeKind = 'perimeter' | 'server' | 'endpoint';
export type PopoverItemType = 'icon' | 'text' | 'chip';
export type PopoverItemTone = 'purple' | 'yellow' | 'green' | 'blue';
export type PopoverTextStyle = 'label' | 'title';
export type PopoverRowGap = 'tight' | 'wide';

export interface PopoverItem {
  readonly type: PopoverItemType;
  readonly value?: string;
  readonly icon?: string;
  readonly tone?: PopoverItemTone;
  readonly textStyle?: PopoverTextStyle;
}

export interface PopoverRow {
  readonly gap?: PopoverRowGap;
  readonly items: readonly PopoverItem[];
}

export interface NodePopoverData {
  readonly variant: PopoverVariant;
  readonly title?: string;
  readonly vulnerabilities?: readonly string[];
  readonly metadata?: {
    readonly label?: string;
    readonly value?: string;
  };
  readonly header?: {
    readonly icon: string;
    readonly title: string;
  };
  readonly rows?: readonly PopoverRow[];
}

export interface GraphNode {
  id: string;
  label: string;
  x: number;
  y: number;
  radius?: number;
  color?: string;
  type: string;
  kind?: GraphNodeKind;
  hasBadge?: boolean;
  connections?: string[];
  popoverData?: NodePopoverData;
}

export interface NodePosition {
  x: number;
  y: number;
}

export interface NodeClickEvent {
  node: GraphNode;
  position: NodePosition;
  event: MouseEvent;
}
