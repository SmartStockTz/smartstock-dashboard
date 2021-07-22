import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {DateRangeModel} from '../models/date-range.model';
import {DashboardService} from '../services/dashboard.service';
import * as moment from 'moment';

@Component({
  selector: 'app-sold-items',
  template: `
    <div style="height: 100%" class="d-flex justify-content-center align-items-center">
      <span *ngIf="!soldItemsProgress" style="font-size: 30px">{{soldItems | number}}</span>
      <app-data-not-ready [width]="100" height="100" [isLoading]="soldItemsProgress"
                          *ngIf="soldItemsProgress || (!soldItems && soldItems!==0)">
      </app-data-not-ready>
    </div>
  `,
  styleUrls: []
})

export class SoldItemsComponent implements OnInit{
  soldItems = 0;
  soldItemsProgress = false;
  @Input() dateRange: Observable<DateRangeModel>;
  @Input() initialDataRange: DateRangeModel;

  constructor(private readonly dashboardApi: DashboardService) {
  }

  ngOnInit(): void {
    if (this.initialDataRange) {
      this._soldItems(this.initialDataRange);
    }
    this.dateRange.subscribe(value => {
      this.soldItems = undefined;
      this._soldItems(value);
    });
  }

  _soldItems(dateRange: DateRangeModel): any {
    dateRange.begin = moment(dateRange.begin).format('YYYY-MM-DD');
    dateRange.end = moment(dateRange.end).format('YYYY-MM-DD');
    this.soldItemsProgress = true;
    this.dashboardApi
      .soldItems(dateRange.begin, dateRange.end)
      .then(value => {
        this.soldItemsProgress = false;
        this.soldItems = value;
      })
      .catch(_ => {
        this.soldItemsProgress = false;
      });
  }
}
