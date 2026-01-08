import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  computed,
  inject,
  signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxGraphModule, PanningAxis, type Node, type Edge } from '@swimlane/ngx-graph';
import { curveBundle } from 'd3-shape';
import { GraphStore } from '@core/state/graph.store';
import { GraphDomainStore } from '@core/state/graph-domain.store';
import { GraphConfigurationService } from '@core/services/graph-configuration.service';
import { PopoverPositioningService } from '@core/services/popover-positioning.service';
import { type GraphNode, type GraphNodeKind, type GraphMetrics } from '@core/models';

@Component({
  selector: 'app-graph-visualization',
  standalone: true,
  imports: [CommonModule, NgxGraphModule],
  templateUrl: './graph-visualization.component.html',
  styleUrl: './graph-visualization.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GraphVisualizationComponent implements AfterViewInit, OnDestroy {
  private readonly graphStore = inject(GraphStore);
  private readonly graphDomainStore = inject(GraphDomainStore);
  private readonly graphConfig = inject(GraphConfigurationService);
  private readonly popoverPositioning = inject(PopoverPositioningService);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  @ViewChild('graphContainer', { static: true }) graphContainer?: ElementRef<HTMLDivElement>;
  private resizeObserver?: ResizeObserver;
  private viewportQuery?: MediaQueryList;
  private viewportListener?: (event: MediaQueryListEvent) => void;
  private hoverTimeout: ReturnType<typeof setTimeout> | null = null;
  private leaveTimeout: ReturnType<typeof setTimeout> | null = null;
  readonly curve = curveBundle.beta(1);
  protected readonly panningAxis = PanningAxis.Horizontal;
  protected readonly isCompact = signal(false);
  private readonly branchArrowPrimaryId = 'server-b-endpoint-primary';
  private readonly branchArrowSecondaryId = 'server-b-endpoint-secondary';
  private readonly branchArrowWidth = 208;
  private readonly branchArrowHeight = 120;
  private readonly branchArrowTopTip = 2.165;
  private readonly branchArrowBottomTip = 106.883;
  private readonly straightArrowHeadWidth = 3.75;
  private readonly straightArrowHeadHeight = 4.33;
  private readonly straightArrowLineThickness = 0.75;
  private readonly branchLinkPoints = new Map<string, { x: number; y: number }[]>();

  private readonly graphMetrics = signal<GraphMetrics>({
    minWidth: 0,
    minHeight: 0,
    nodeWidth: 0,
    nodeHeight: 0,
    nodeIconSize: 0,
    nodeIconX: 0,
    nodeIconY: 0,
    badgeSize: 0,
    badgeX: 0,
    badgeY: 0,
    labelY: 0,
    tagY: 0,
    layoutNodePadding: 0,
    layoutRankPadding: 0,
    layoutMarginX: 0,
    layoutMarginY: 0,
    panOffsetX: 0,
    panOffsetY: 0,
    popoverPerimeterWidth: 0,
    popoverDetailsWidth: 0,
    popoverMinHeight: 0,
    popoverOffsetY: 0,
    popoverViewportPadding: 0
  });

  readonly metrics = this.graphMetrics;
  private readonly graphSize = signal({ width: 0, height: 0 });

  private readonly graphData = this.graphDomainStore.graphData;

  readonly nodes = computed<Node[]>(() => {
    const metrics = this.graphMetrics();
    return this.graphData().nodes.map(node => ({
      id: node.id,
      label: node.label,
      data: node,
      dimension: {
        width: metrics.nodeWidth,
        height: metrics.nodeHeight
      }
    }));
  });

  readonly links = computed<Edge[]>(() => {
    return this.graphData().edges.map(edge => ({
      id: edge.id,
      source: edge.source,
      target: edge.target
    }));
  });

  readonly layout = 'dagre';

  readonly layoutSettings = computed(() => {
    const metrics = this.graphMetrics();
    return {
      orientation: 'LR',
      nodePadding: metrics.layoutNodePadding,
      rankPadding: metrics.layoutRankPadding,
      marginX: metrics.layoutMarginX,
      marginY: metrics.layoutMarginY
    };
  });

  readonly view = computed<[number, number]>(() => {
    const { width, height } = this.graphSize();
    const { minWidth, minHeight } = this.graphMetrics();
    return [Math.max(width, minWidth), Math.max(height, minHeight)];
  });

  readonly panOffsetX = computed(() => this.graphMetrics().panOffsetX);
  readonly panOffsetY = computed(() => (this.isCompact() ? 0 : this.graphMetrics().panOffsetY));

  protected cacheLinkPoints(link: Edge): string {
    if (!this.isBranchArrow(link)) {
      return '';
    }
    const points = (link as Edge & { points?: { x: number; y: number }[] }).points;
    if (points && points.length) {
      this.branchLinkPoints.set(link.id ?? '', points);
    }
    return '';
  }

  protected isBranchArrow(link: Edge): boolean {
    return link.id === this.branchArrowPrimaryId || link.id === this.branchArrowSecondaryId;
  }

  protected shouldRenderBranchArrow(link: Edge): boolean {
    return link.id === this.branchArrowPrimaryId;
  }

  protected getStraightArrowPath(link: Edge): string | null {
    const points = (link as Edge & { points?: { x: number; y: number }[] }).points;
    if (!points || points.length < 2) {
      return null;
    }

    const start = points[0];
    const end = points[points.length - 1];
    const centerY = (start.y + end.y) / 2;
    const arrowHalfHeight = this.straightArrowHeadHeight / 2;
    const lineHalfThickness = this.straightArrowLineThickness / 2;
    const lineEndX = end.x - this.straightArrowHeadWidth;

    return [
      `M${end.x} ${centerY}`,
      `L${lineEndX} ${centerY - arrowHalfHeight}`,
      `L${lineEndX} ${centerY + arrowHalfHeight}`,
      `L${end.x} ${centerY}Z`,
      `M${start.x} ${centerY + lineHalfThickness}`,
      `L${lineEndX} ${centerY + lineHalfThickness}`,
      `L${lineEndX} ${centerY - lineHalfThickness}`,
      `L${start.x} ${centerY - lineHalfThickness}`,
      `L${start.x} ${centerY + lineHalfThickness}Z`
    ].join('');
  }

  protected getBranchArrowTransform(): string | null {
    const primaryPoints = this.branchLinkPoints.get(this.branchArrowPrimaryId);
    const secondaryPoints = this.branchLinkPoints.get(this.branchArrowSecondaryId);
    if (!primaryPoints || !secondaryPoints) {
      return null;
    }

    const source = primaryPoints[0];
    const primaryEnd = primaryPoints[primaryPoints.length - 1];
    const secondaryEnd = secondaryPoints[secondaryPoints.length - 1];
    const topTargetY = Math.min(primaryEnd.y, secondaryEnd.y);
    const bottomTargetY = Math.max(primaryEnd.y, secondaryEnd.y);
    const height = bottomTargetY - topTargetY;
    if (height <= 0) {
      return null;
    }

    const tipSpan = this.branchArrowBottomTip - this.branchArrowTopTip;
    const scaleX = 1;
    const scaleY = this.branchArrowHeight / tipSpan;
    const translateX = source.x;
    const midY = (topTargetY + bottomTargetY) / 2;
    const translateY = midY - this.branchArrowHeight / 2 - this.branchArrowTopTip * scaleY;

    return `translate(${translateX}, ${translateY}) scale(${scaleX}, ${scaleY})`;
  }

  getNodeIcon(node: Node): string {
    const data = node.data as GraphNode | undefined;
    const kind = (data?.kind || 'server') as GraphNodeKind;
    return data?.icon || this.graphConfig.getIconPath(kind);
  }

  protected getNodeTransform(node: Node): string {
    if (node.id === 'endpoint-primary') {
      return 'translate(168, 0)';
    }
    if (node.id === 'endpoint-secondary') {
      return 'translate(168, -25)';
    }
    return '';
  }

  ngAfterViewInit(): void {
    this.updateMetrics();
    this.setupViewportQuery();
    const container = this.graphContainer?.nativeElement;
    if (!container) {
      return;
    }

    const updateSize = () => {
      this.graphSize.set({
        width: container.clientWidth,
        height: container.clientHeight
      });
    };

    updateSize();
    const observer = new ResizeObserver(() => updateSize());
    observer.observe(container);
    this.resizeObserver = observer;
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
    if (this.viewportQuery && this.viewportListener) {
      this.viewportQuery.removeEventListener('change', this.viewportListener);
    }
  }

  private setupViewportQuery(): void {
    if (typeof window === 'undefined') {
      return;
    }
    const query = window.matchMedia('(max-width: 1124px)');
    const update = (event: MediaQueryList | MediaQueryListEvent) => {
      this.isCompact.set(event.matches);
    };
    update(query);
    const listener = (event: MediaQueryListEvent) => update(event);
    query.addEventListener('change', listener);
    this.viewportQuery = query;
    this.viewportListener = listener;
  }

  protected onCanvasClick(): void {
    this.graphStore.clearSelection();
  }

  protected onNodeSelect(event: MouseEvent | KeyboardEvent, node: Node): void {
    event.stopPropagation();
    const data = node.data as GraphNode | undefined;
    const popoverData = data?.popoverData;
    if (!popoverData) return;

    const selected = this.graphStore.selectedNode();
    if (selected?.id === node.id) {
      this.graphStore.clearSelection();
      return;
    }

    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const kind = (data?.kind || 'server') as GraphNodeKind;
    const popoverIcon = this.graphConfig.getPopoverIconPath(kind);
    const variant = popoverData.variant ?? this.graphConfig.getPopoverVariant(kind);
    const metrics = this.graphMetrics();
    const position = this.popoverPositioning.calculatePosition(rect, variant, {
      popoverPerimeterWidth: metrics.popoverPerimeterWidth,
      popoverDetailsWidth: metrics.popoverDetailsWidth,
      popoverMinHeight: metrics.popoverMinHeight,
      popoverOffsetY: metrics.popoverOffsetY,
      popoverViewportPadding: metrics.popoverViewportPadding
    });

    this.graphStore.selectNode(
      {
        id: node.id,
        label: node.label || '',
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
        type: data?.type || 'unknown',
        kind,
        popoverData: {
          ...popoverData,
          variant,
          header: popoverData.header
            ? { ...popoverData.header, icon: popoverData.header.icon || popoverIcon }
            : popoverData.header
        }
      },
      position
    );
  }

  protected onNodeKeydown(event: KeyboardEvent, node: Node): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.onNodeSelect(event, node);
    }
  }

  protected onNodeHover(event: MouseEvent, node: Node): void {
    if (this.hoverTimeout) {
      clearTimeout(this.hoverTimeout);
    }
    if (this.leaveTimeout) {
      clearTimeout(this.leaveTimeout);
      this.leaveTimeout = null;
    }

    const target = event.currentTarget as HTMLElement;
    if (!target) return;

    this.hoverTimeout = setTimeout(() => {
      const data = node.data as GraphNode | undefined;
      const popoverData = data?.popoverData;
      if (!popoverData) return;

      const rect = target.getBoundingClientRect();
      const kind = (data?.kind || 'server') as GraphNodeKind;
      const popoverIcon = this.graphConfig.getPopoverIconPath(kind);
      const variant = popoverData.variant ?? this.graphConfig.getPopoverVariant(kind);
      const metrics = this.graphMetrics();
      const position = this.popoverPositioning.calculatePosition(rect, variant, {
        popoverPerimeterWidth: metrics.popoverPerimeterWidth,
        popoverDetailsWidth: metrics.popoverDetailsWidth,
        popoverMinHeight: metrics.popoverMinHeight,
        popoverOffsetY: metrics.popoverOffsetY,
        popoverViewportPadding: metrics.popoverViewportPadding
      });

      this.graphStore.selectNode(
        {
          id: node.id,
          label: node.label || '',
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
          type: data?.type || 'unknown',
          kind,
          popoverData: {
            ...popoverData,
            variant,
            header: popoverData.header
              ? { ...popoverData.header, icon: popoverData.header.icon || popoverIcon }
              : popoverData.header
          }
        },
        position
      );
    }, 300);
  }

  protected onNodeLeave(): void {
    if (this.hoverTimeout) {
      clearTimeout(this.hoverTimeout);
      this.hoverTimeout = null;
    }

    this.leaveTimeout = setTimeout(() => {
      this.graphStore.clearSelection();
    }, 200);
  }

  private updateMetrics(): void {
    const styles = getComputedStyle(this.host.nativeElement);
    const readVar = (name: string) => Number.parseFloat(styles.getPropertyValue(name)) || 0;

    this.graphMetrics.set({
      minWidth: readVar('--graph-min-width'),
      minHeight: readVar('--graph-min-height'),
      nodeWidth: readVar('--graph-node-width'),
      nodeHeight: readVar('--graph-node-height'),
      nodeIconSize: readVar('--graph-node-icon-size'),
      nodeIconX: readVar('--graph-node-icon-x'),
      nodeIconY: readVar('--graph-node-icon-y'),
      badgeSize: readVar('--graph-node-badge-size'),
      badgeX: readVar('--graph-node-badge-x'),
      badgeY: readVar('--graph-node-badge-y'),
      labelY: readVar('--graph-node-label-y'),
      tagY: readVar('--graph-node-tag-y'),
      layoutNodePadding: readVar('--graph-layout-node-padding'),
      layoutRankPadding: readVar('--graph-layout-rank-padding'),
      layoutMarginX: readVar('--graph-layout-margin-x'),
      layoutMarginY: readVar('--graph-layout-margin-y'),
      panOffsetX: readVar('--graph-pan-offset-x'),
      panOffsetY: readVar('--graph-pan-offset-y'),
      popoverPerimeterWidth: readVar('--popover-perimeter-width'),
      popoverDetailsWidth: readVar('--popover-details-width'),
      popoverMinHeight: readVar('--popover-min-height'),
      popoverOffsetY: readVar('--popover-offset-y'),
      popoverViewportPadding: readVar('--popover-viewport-padding')
    });
  }
}
