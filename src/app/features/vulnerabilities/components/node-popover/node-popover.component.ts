import { Component, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphStore } from '@core/state/graph.store';
import { GraphNode, RemediationTechnique } from '@core/models';
import { GraphDomainService } from '@core/services/graph-domain.service';

@Component({
  selector: 'app-node-popover',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './node-popover.component.html',
  styleUrl: './node-popover.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NodePopoverComponent {
  private closeTimeout: ReturnType<typeof setTimeout> | null = null;

  constructor(
    private readonly graphStore: GraphStore,
    private readonly graphDomainService: GraphDomainService
  ) {}

  get selectedNode() {
    return this.graphStore.selectedNode;
  }

  get popoverPosition() {
    return this.graphStore.popoverPosition;
  }

  get isOpen() {
    return this.graphStore.isPopoverOpen;
  }

  remediationTechniques = computed<RemediationTechnique[]>(() => {
    const node = this.selectedNode();
    return this.graphDomainService.getRemediationTechniques(node?.kind);
  });

  close(): void {
    this.graphStore.clearSelection();
  }

  onPopoverClick(event: MouseEvent): void {
    event.stopPropagation();
  }

  onPopoverEnter(event: MouseEvent): void {
    event.stopPropagation();
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
      this.closeTimeout = null;
    }
  }

  onPopoverLeave(): void {
    this.closeTimeout = setTimeout(() => {
      this.close();
    }, 200);
  }

  onBackdropClick(): void {
    this.close();
  }

  trackByTechniqueId(_index: number, technique: RemediationTechnique): string {
    return technique.id;
  }

  trackByNodeId(_index: number, node: GraphNode): string {
    return node.id;
  }
}
