import {Component, Input} from '@angular/core';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-dashboard-sales-performance',
  template: `
    <p style="padding: 10px 0">
      Sales performance
    </p>
    <div class="row">
      <div style="margin-bottom: 10px" class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
        <app-dash-card [title]="'Total Sales'"
                       reportLink="/report"
                       [content]="totalSaleComponent"
                       description="Total sale over specified period">
          <ng-template #totalSaleComponent>
            <app-total-sales [initialDataRange]="initialRange"
                             [dateRange]="dateRange"></app-total-sales>
          </ng-template>
        </app-dash-card>
      </div>
      <div style="margin-bottom: 10px" class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
        <app-dash-card [title]="'Sold items'"
                       [content]="soldItems"
                       reportLink="/report"
                       description="Total item sold of this specified period">
          <ng-template #soldItems>
            <app-sold-items [initialDataRange]="initialRange"
                                  [dateRange]="dateRange"></app-sold-items>
          </ng-template>
        </app-dash-card>
      </div>
    </div>
  `,
  styleUrls: []
})

export class DashboardSalesPerformanceComponent{
  @Input() initialRange: { begin: Date; end: Date };
  @Input() dateRange: Observable<any>;
  constructor() {
  }
}
