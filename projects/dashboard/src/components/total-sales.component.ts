import {Component, Input, OnInit} from '@angular/core';
import {DashboardService} from '../services/dashboard.service';
import {Observable} from 'rxjs';
import {DateRangeModel} from '../models/date-range.model';

@Component({
  selector: 'app-total-sales',
  template: `
    <div style="height: 100%" class="d-flex justify-content-center align-items-center">
      <span *ngIf="!totalSaleProgress" style="font-size: 30px">{{totalSale | currency: 'TZS '}}</span>
      <app-data-not-ready [width]="100" height="100" [isLoading]="totalSaleProgress"
                          *ngIf="totalSaleProgress  || (!totalSale && totalSale!==0)"></app-data-not-ready>
    </div>
  `,
  styleUrls: ['../styles/total-sales.style.scss'],
})
export class TotalSalesComponent implements OnInit {
  totalSale = 0;
  totalSaleProgress = false;
  @Input() dateRange: Observable<{ begin: Date, end: Date }>;
  @Input() initialDataRange: { begin: Date, end: Date };

  constructor(private readonly dashboardApi: DashboardService) {
  }

  ngOnInit(): void {
    if (this.initialDataRange) {
      this.getTotalSale(this.initialDataRange);
    }
    this.dateRange.subscribe(value => {
      this.totalSale = undefined;
      this.getTotalSale(value);
    });
  }

  private getTotalSale(dateRange: DateRangeModel): void {
    this.totalSaleProgress = true;
    this.dashboardApi.getTotalSale(dateRange.begin, dateRange.end)
      .then(value => {
        this.totalSaleProgress = false;
        this.totalSale = value[0].sales;
      })
      .catch(_ => {
        this.totalSaleProgress = false;
      });
  }

}
