import {Component, Input} from '@angular/core';
import {DashboardModel} from '../models/dashboard.model';

@Component({
  selector: 'app-dashboard-profit-loss',
  template: `
    <p style="padding: 10px 0">
      Profit & Loss
    </p>
    <div class="row">
      <div style="margin-bottom: 10px" class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
        <app-dash-card [title]="'Net sales profit/loss'"
                       reportLink="/report"
                       [content]="totalSaleComponent"
                       description="Profit/Loss you generate of sales you made over specified period">
          <ng-template #totalSaleComponent>
            <app-net-sales-profit [netSaleProfit]="data.profit"></app-net-sales-profit>
          </ng-template>
        </app-dash-card>
      </div>
      <div style="margin-bottom: 10px" class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
        <app-dash-card [title]="'Net sales profit/loss margin'"
                       [content]="totalGrossProfit"
                       reportLink="/report"
                       description="Percentage of a profit/loss per cost of sales you made over specified period">
          <ng-template #totalGrossProfit>
            <app-net-sales-profit-margin [netSaleProfitMargin]="data.margin"></app-net-sales-profit-margin>
          </ng-template>
        </app-dash-card>
      </div>
    </div>
  `,
  styleUrls: []
})

export class ProfitComponent {
  @Input() data: DashboardModel;
  constructor() {
  }
}
