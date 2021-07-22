import {Component, Input} from '@angular/core';
import {Observable} from 'rxjs';

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
                       description="Total cost of good sold over specified period">
          <ng-template #totalSaleComponent>
            <app-cost-of-good [initialDataRange]="initialRange"
                             [dateRange]="dateRange">
            </app-cost-of-good>
          </ng-template>
        </app-dash-card>
      </div>
      <div style="margin-bottom: 10px" class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
        <app-dash-card [title]="'Other expenses'"
                       [content]="totalGrossProfit"
                       reportLink="/report"
                       description="Total expenses of a specified period">
          <ng-template #totalGrossProfit>
            <app-expenses [initialDataRange]="initialRange"
                                  [dateRange]="dateRange"></app-expenses>
          </ng-template>
        </app-dash-card>
      </div>
    </div>
  `,
  styleUrls: []
})

export class DashboardExpensesComponent{
  @Input() initialRange: {begin: any, end: any};
  @Input() dateRange: Observable<{ begin: any, end: any }>;
  constructor() {
  }
}
