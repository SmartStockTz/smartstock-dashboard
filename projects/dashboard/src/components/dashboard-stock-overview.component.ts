import {Component} from '@angular/core';

@Component({
  selector: 'app-dashboard-stock-overview-component',
  template: `
    <p style="padding: 10px 0">
      Stock overview
    </p>
    <div class="row">
      <div style="margin-bottom: 10px" class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
        <app-dash-card [title]="'Stocks Health'"
                       [content]="stockHealth"
                       [reportLink]="'/report'"
                       description="Comparison of your total stocks and out of stock product">
          <ng-template #stockHealth>
            <app-stock-status></app-stock-status>
          </ng-template>
        </app-dash-card>
      </div>
      <div style="margin-bottom: 10px" class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
        <app-dash-card [title]="'Category Wise'"
                       [reportLink]="'/report'"
                       [content]="stockByCategory"
                       description="Category distribution of your stocks">
          <ng-template #stockByCategory>
            <app-stock-by-category></app-stock-by-category>
          </ng-template>
        </app-dash-card>
      </div>
    </div>
  `,
  styleUrls: []
})

export class DashboardStockOverviewComponent {
  constructor() {
  }
}
