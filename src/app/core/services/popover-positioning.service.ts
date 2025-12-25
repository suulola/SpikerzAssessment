import { Injectable } from '@angular/core';
import { PopoverVariant, PopoverMetrics, PopoverPosition } from '../models';

@Injectable({
  providedIn: 'root'
})
export class PopoverPositioningService {
  calculateX(rect: DOMRect, variant: PopoverVariant, metrics: PopoverMetrics): number {
    const viewportWidth = window.innerWidth;
    const baseWidth = variant === 'perimeter'
      ? metrics.popoverPerimeterWidth
      : metrics.popoverDetailsWidth;
    const maxWidth = Math.max(
      0,
      Math.min(baseWidth, viewportWidth - metrics.popoverViewportPadding * 2)
    );
    const halfWidth = maxWidth / 2;
    const centerX = rect.left + rect.width / 2;
    const minX = metrics.popoverViewportPadding + halfWidth;
    const maxX = viewportWidth - metrics.popoverViewportPadding - halfWidth;

    return Math.min(Math.max(centerX, minX), maxX);
  }

  calculateY(rect: DOMRect, metrics: PopoverMetrics): number {
    const viewportHeight = window.innerHeight;
    const padding = metrics.popoverViewportPadding;
    const offset = metrics.popoverOffsetY;
    const popoverHeight = metrics.popoverMinHeight;
    const belowY = rect.bottom + offset;
    const aboveY = rect.top - offset - popoverHeight;

    if (belowY + popoverHeight <= viewportHeight - padding) {
      return belowY;
    }

    return Math.max(padding, aboveY);
  }

  calculatePosition(
    rect: DOMRect,
    variant: PopoverVariant,
    metrics: PopoverMetrics
  ): PopoverPosition {
    return {
      x: this.calculateX(rect, variant, metrics),
      y: this.calculateY(rect, metrics)
    };
  }
}
