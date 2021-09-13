import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {DashboardService} from '../services/dashboard.service';
import * as  moment from 'moment';

@Component({
  selector: 'app-expenses',
  template: `
    <div style="height: 100%" class="d-flex justify-content-center align-items-center">
      <span *ngIf="!expensesProgress" style="font-size: 30px">{{expenses | currency: 'TZS '}}</span>
      <app-data-not-ready [width]="100" height="100" [isLoading]="expensesProgress"
                          *ngIf="expensesProgress || (!expenses && expenses!==0)">
      </app-data-not-ready>
    </div>
  `,
  styleUrls: []
})

export class ExpensesComponent implements OnInit {
  expenses = 0;
  expensesProgress = false;
  @Input() dateRange: Observable<Date>;
  @Input() initialDataRange: Date;

  constructor(private readonly dashboardApi: DashboardService) {
  }

  ngOnInit(): void {
    if (this.initialDataRange) {
      this._expenses(this.initialDataRange);
    }
    this.dateRange.subscribe(value => {
      this.expenses = undefined;
      this._expenses(value);
    });
  }

  _expenses(dateRange: any): any {
    dateRange = moment(dateRange).format('YYYY-MM-DD');
    this.expensesProgress = true;
    this.dashboardApi
      .expenses(dateRange)
      .then(value => {
        this.expensesProgress = false;
        this.expenses = value.total;
      })
      .catch(_ => {
        this.expensesProgress = false;
      });
  }
}
