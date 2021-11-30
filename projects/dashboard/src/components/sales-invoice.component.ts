import {Component, Input} from '@angular/core';
import {DashboardModel} from '../models/dashboard.model';

@Component({
  selector: 'app-sales-invoice',
  template: `
    <p style="padding: 10px 0">
      Invoice Sales
    </p>
    <div class="row">
      <div style="margin-bottom: 10px"
           class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
        <app-dash-card [title]="'Total'"
                       reportLink="/report"
                       [content]="totalSaleComponent"
                       description="Total sale over specified period">
          <ng-template #totalSaleComponent>
            <app-total-sales [totalSale]="data.sales_invoice"></app-total-sales>
          </ng-template>
        </app-dash-card>
      </div>
      <div style="margin-bottom: 10px" class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
        <app-dash-card [title]="'Items'"
                       [content]="soldItems"
                       reportLink="/report"
                       description="Total item sold of this specified period">
          <ng-template #soldItems>
            <app-sold-items [soldItems]="data.items_invoice"></app-sold-items>
          </ng-template>
        </app-dash-card>
      </div>
    </div>
  `,
  styleUrls: []
})

export class SalesInvoiceComponent {
  @Input() data: DashboardModel;
  constructor() {
  }
}
