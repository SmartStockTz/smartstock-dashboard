import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
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
  @Input() dateRange: Observable<Date>;
  @Input() initialDataRange: Date;

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

  _soldItems(dateRange: any): any {
    dateRange = moment(dateRange).format('YYYY-MM-DD');
    this.soldItemsProgress = true;
    this.dashboardApi
      .soldItems(dateRange)
      .then(value => {
        this.soldItemsProgress = false;
        this.soldItems = value.total;
      })
      .catch(_ => {
        this.soldItemsProgress = false;
      });
  }
}
