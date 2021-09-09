import {Component, Input, OnInit} from '@angular/core';
import {DashboardService} from '../services/dashboard.service';
import {Observable} from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-net-sales-profit-margin',
  template: `
    <div style="height: 100%" class="d-flex justify-content-center align-items-center">
      <span *ngIf="!netSaleProfitMarginProgress" style="font-size: 30px">{{netSaleProfitMargin | percent}}</span>
      <app-data-not-ready [width]="100" height="100" [isLoading]="netSaleProfitMarginProgress"
                          *ngIf="netSaleProfitMarginProgress || (!netSaleProfitMargin && netSaleProfitMargin!==0)">
      </app-data-not-ready>
    </div>
  `,
  styleUrls: []
})

export class NetSalesProfitMarginComponent implements OnInit {
  netSaleProfitMargin = 0;
  netSaleProfitMarginProgress = false;
  @Input() dateRange: Observable<Date>;
  @Input() initialDataRange: Date;

  constructor(private readonly dashboardApi: DashboardService) {
  }

  ngOnInit(): void {
    if (this.initialDataRange) {
      this._netSalesProfitMargin(this.initialDataRange);
    }
    this.dateRange.subscribe(value => {
      this.netSaleProfitMargin = undefined;
      this._netSalesProfitMargin(value);
    });
  }

  _netSalesProfitMargin(dateRange: any): any {
    dateRange = moment(dateRange).format('YYYY-MM-DD');
    this.netSaleProfitMarginProgress = true;
    this.dashboardApi
      .netSalesProfitLossMargin(dateRange)
      .then(value => {
        this.netSaleProfitMarginProgress = false;
        this.netSaleProfitMargin = value;
      })
      .catch(_ => {
        this.netSaleProfitMarginProgress = false;
      });
  }
}
