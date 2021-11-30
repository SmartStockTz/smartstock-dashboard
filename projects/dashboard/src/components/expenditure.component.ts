import {Component, Input} from '@angular/core';
import {DashboardModel} from '../models/dashboard.model';

@Component({
  selector: 'app-dashboard-expenses',
  template: `
    <p style="padding: 10px 0">
      Expenditures
    </p>
    <div class="row">
      <div style="margin-bottom: 10px" class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
        <app-dash-card [title]="'Cost of good sold'"
                       reportLink="/report"
                       [content]="totalSaleComponent"
                       description="Total cost of good sold over specified period both cash and invoice">
          <ng-template #totalSaleComponent>
            <app-cost-of-good [cost]="data.cogs_cash+data.cogs_invoice"></app-cost-of-good>
          </ng-template>
        </app-dash-card>
      </div>
      <div style="margin-bottom: 10px" class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
        <app-dash-card [title]="'Expenses'"
                       [content]="totalGrossProfit"
                       reportLink="/report"
                       description="Total expenses of a specified period">
          <ng-template #totalGrossProfit>
            <app-expenses [expense]="data.expense"></app-expenses>
          </ng-template>
        </app-dash-card>
      </div>
    </div>
  `,
  styleUrls: []
})

export class ExpensesComponent {
  @Input() data: DashboardModel;

  constructor() {
  }
}
