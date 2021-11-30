import {Component, Input, OnInit} from '@angular/core';
import {DashboardState} from '../states/dashboard.state';

@Component({
  selector: 'app-total-sales',
  template: `
    <div style="height: 100%" class="d-flex justify-content-center align-items-center">
      <span *ngIf="(dashboardState.loadReport  | async)===false" style="font-size: 30px">
        {{totalSale | number}}
      </span>
      <app-data-not-ready [width]="100" height="100"
                          [isLoading]="(dashboardState.loadReport  | async)===true"
                          *ngIf="(dashboardState.loadReport  | async)===true">
      </app-data-not-ready>
    </div>
  `,
  styleUrls: ['../styles/total-sales.style.scss'],
})
export class TotalSalesComponent implements OnInit {
  @Input() totalSale = 0;

  constructor(public readonly dashboardState: DashboardState) {
  }

  ngOnInit(): void {
  }

}
