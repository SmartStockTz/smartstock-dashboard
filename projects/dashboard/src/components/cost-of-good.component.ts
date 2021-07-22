import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {DashboardService} from '../services/dashboard.service';
import {DateRangeModel} from '../models/date-range.model';
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
  @Input() dateRange: Observable<DateRangeModel>;
  @Input() initialDataRange: DateRangeModel;

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

  _costOfGoodSold(dateRange: DateRangeModel): any {
    dateRange.begin = moment(dateRange.begin).format('YYYY-MM-DD');
    dateRange.end = moment(dateRange.end).format('YYYY-MM-DD');
    this.costOfGoodSoldProgress = true;
    this.dashboardApi
      .costOfGoodSold(dateRange.begin, dateRange.end)
      .then(value => {
        this.costOfGoodSoldProgress = false;
        this.costOfGoodSold = value[0].cogs;
      })
      .catch(_ => {
        this.costOfGoodSoldProgress = false;
      });
  }
}
