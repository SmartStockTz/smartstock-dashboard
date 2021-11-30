import {Component, Input, OnInit} from '@angular/core';
import {DashboardState} from '../states/dashboard.state';

@Component({
  selector: 'app-net-sales-profit',
  template: `
    <div style="height: 100%" class="d-flex justify-content-center align-items-center">
      <span *ngIf="(dashboardState.loadReport | async) === false" style="font-size: 30px">
        {{netSaleProfit | number}}
      </span>
      <app-data-not-ready [width]="100" height="100"
                          [isLoading]="(dashboardState.loadReport | async) === true"
                          *ngIf="(dashboardState.loadReport | async) === true">
      </app-data-not-ready>
    </div>
  `,
  styleUrls: []
})

export class ProfitAmountComponent implements OnInit {
  @Input() netSaleProfit = 0;

  constructor(public readonly dashboardState: DashboardState) {
  }

  ngOnInit(): void {
  }

}
