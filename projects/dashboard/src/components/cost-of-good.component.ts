import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {DashboardService} from '../services/dashboard.service';
import * as moment from 'moment';

@Component({
  selector: 'app-cost-of-good',
  template: `
    <div style="height: 100%" class="d-flex justify-content-center align-items-center">
      <span *ngIf="!costOfGoodSoldProgress" style="font-size: 30px">{{costOfGoodSold | currency: 'TZS '}}</span>
      <app-data-not-ready [width]="100" height="100" [isLoading]="costOfGoodSoldProgress"
                          *ngIf="costOfGoodSoldProgress || (!costOfGoodSold && costOfGoodSold!==0)">
      </app-data-not-ready>
    </div>
  `,
  styleUrls: []
})

export class CostOfGoodComponent implements OnInit {
  costOfGoodSold = 0;
  costOfGoodSoldProgress = false;
  @Input() dateRange: Observable<Date>;
  @Input() initialDataRange: Date;

  constructor(private readonly dashboardApi: DashboardService) {
  }

  ngOnInit(): void {
    if (this.initialDataRange) {
      this._costOfGoodSold(this.initialDataRange);
    }
    this.dateRange.subscribe(value => {
      this.costOfGoodSold = undefined;
      this._costOfGoodSold(value);
    });
  }

  _costOfGoodSold(dateRange: any): any {
    dateRange = moment(dateRange).format('YYYY-MM-DD');
    this.costOfGoodSoldProgress = true;
    this.dashboardApi
      .costOfGoodSold(dateRange)
      .then(value => {
        this.costOfGoodSoldProgress = false;
        this.costOfGoodSold = value.cogs;
      })
      .catch(_ => {
        this.costOfGoodSoldProgress = false;
      });
  }
}
