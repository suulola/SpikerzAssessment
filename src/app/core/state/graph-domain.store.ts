import { Injectable, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { GraphDomainService } from '@core/services/graph-domain.service';
import { type GraphData, type AssetRiskRow, type RiskSummaryItem } from '@core/models';

@Injectable({
  providedIn: 'root'
})
export class GraphDomainStore {
  private readonly graphDomainService = inject(GraphDomainService);

  private readonly graphDataSignal = toSignal(this.graphDomainService.getGraphData(), {
    initialValue: { nodes: [], edges: [] } as GraphData
  });

  private readonly assetRiskRowsSignal = toSignal(this.graphDomainService.getAssetRiskRows(), {
    initialValue: [] as AssetRiskRow[]
  });

  private readonly riskSummarySignal = toSignal(this.graphDomainService.getRiskSummary(), {
    initialValue: [] as RiskSummaryItem[]
  });

  readonly graphData = computed(() => this.graphDataSignal());
  readonly assetRiskRows = computed(() => this.assetRiskRowsSignal());
  readonly riskSummary = computed(() => this.riskSummarySignal());
  readonly legendItems = computed(() => this.graphDomainService.getLegendItems());
}
