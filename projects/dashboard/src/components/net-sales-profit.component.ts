import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {DashboardService} from '../services/dashboard.service';
import * as moment from 'moment';

@Component({
  selector: 'app-net-sales-profit',
  template: `
    <div style="height: 100%" class="d-flex justify-content-center align-items-center">
      <span *ngIf="!netSaleProfitProgress" style="font-size: 30px">{{netSaleProfit | currency: 'TZS '}}</span>
      <app-data-not-ready [width]="100" height="100" [isLoading]="netSaleProfitProgress"
                          *ngIf="netSaleProfitProgress || (!netSaleProfit && netSaleProfit!==0)">
      </app-data-not-ready>
    </div>
  `,
  styleUrls: []
})

export class NetSalesProfitComponent implements OnInit {
  netSaleProfit = 0;
  netSaleProfitProgress = false;
  @Input() dateRange: Observable<Date>;
  @Input() initialDataRange: Date;

  constructor(private readonly dashboardApi: DashboardService) {
  }

  ngOnInit(): void {
    if (this.initialDataRange) {
      this._netSalesProfit(this.initialDataRange);
    }
    this.dateRange.subscribe(value => {
      this.netSaleProfit = undefined;
      this._netSalesProfit(value);
    });
  }

  _netSalesProfit(dateRange: any): any {
    dateRange = moment(dateRange).format('YYYY-MM-DD');
    this.netSaleProfitProgress = true;
    this.dashboardApi
      .netSalesProfitLoss(dateRange)
      .then(value => {
        this.netSaleProfitProgress = false;
        this.netSaleProfit = value;
      })
      .catch(_ => {
        console.log(_);
        this.netSaleProfitProgress = false;
      });
  }
}
