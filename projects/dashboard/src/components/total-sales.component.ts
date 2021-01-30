import {Component, Input, OnInit} from '@angular/core';
import {AdminDashboardService} from '../services/admin-dashboard.service';
import {Observable} from 'rxjs';
import {toSqlDate} from '@smartstocktz/core-libs';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'smartstock-total-sales',
  template: `
    <mat-card class="mat-elevation-z3 p-0 d-flex flex-column justify-content-between">
      <div>
        <div class="row pt-4 pl-4 m-0 align-items-center">
          <svg width="36" height="40" viewBox="0 0 76 83" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M54.4601 52.4682C52.3767 52.4682 50.3629 52.3394 48.4572 52.0999V46.2398C50.3632 46.4794 52.3761 46.6099 54.4601 46.6099C64.8441 46.6099 73.511 43.4199 75.5468 39.1744C75.8433 39.7928 75.9998 40.4331 75.9998 41.0895V43.1174C75.9998 48.2818 66.3561 52.4682 54.4601 52.4682Z"
              fill="#1b5e20"/>
            <path
              d="M48.4574 57.841V57.3855C50.3634 57.6251 52.3763 57.7557 54.4603 57.7557C64.8442 57.7557 73.5112 54.5657 75.547 50.3201C75.8435 50.9384 76 51.5787 76 52.2351V54.263C76 59.4276 66.3563 63.6139 54.4603 63.6139C52.0813 63.6139 49.7932 63.4461 47.6534 63.1369C48.1838 62.0984 48.4574 61.0033 48.4574 59.8688V57.841Z"
              fill="#1b5e20"/>
            <path
              d="M48.4574 67.1964V66.7409C50.3634 66.9805 52.3763 67.111 54.4603 67.111C64.8442 67.111 73.5112 63.921 75.547 59.6755C75.8435 60.2937 76 60.9341 76 61.5905V63.6184C76 68.7829 66.3563 72.9693 54.4603 72.9693C52.0813 72.9693 49.7932 72.8014 47.6534 72.4922C48.1838 71.4538 48.4574 70.3586 48.4574 69.2241V67.1964Z"
              fill="#1b5e20"/>
            <path
              d="M54.1798 0.364716C42.2838 0.364716 32.6401 4.55108 32.6401 9.71544V11.7433C32.6401 16.9077 42.2838 21.0941 54.1798 21.0941C66.0757 21.0941 75.7195 16.9077 75.7195 11.7433V9.71544C75.7195 4.55108 66.0757 0.364716 54.1798 0.364716Z"
              fill="#1b5e20"/>
            <path
              d="M54.1798 25.6753C43.7959 25.6753 35.129 22.4855 33.0932 18.2398C32.7967 18.858 32.6401 19.4984 32.6401 20.1549V22.1828C32.6401 27.3472 42.2838 31.5336 54.1798 31.5336C66.0757 31.5336 75.7195 27.3472 75.7195 22.1828V20.1549C75.7195 19.4984 75.563 18.858 75.2665 18.2398C73.2307 22.4855 64.5638 25.6753 54.1798 25.6753Z"
              fill="#1b5e20"/>
            <path
              d="M54.1798 36.115C43.7959 36.115 35.129 32.925 33.0932 28.6794C32.7967 29.2977 32.6401 29.938 32.6401 30.5946V32.6225C32.6401 37.787 42.2838 41.9734 54.1798 41.9734C66.0757 41.9734 75.7195 37.787 75.7195 32.6225V30.5946C75.7195 29.938 75.563 29.2977 75.2665 28.6794C73.2307 32.9252 64.5638 36.115 54.1798 36.115Z"
              fill="#1b5e20"/>
            <path
              d="M22.2231 40.4339C10.3271 40.4339 0.683411 44.6203 0.683411 49.7847V51.8126C0.683411 56.9769 10.3271 61.1633 22.2231 61.1633C34.1189 61.1633 43.7628 56.9769 43.7628 51.8126V49.7847C43.7628 44.6203 34.1189 40.4339 22.2231 40.4339Z"
              fill="#1b5e20"/>
            <path
              d="M22.3996 66.0054C12.0157 66.0054 3.34875 62.8154 1.31294 58.5699C1.01647 59.1883 0.859926 59.8284 0.859926 60.4848V62.5129C0.859926 67.6773 10.5036 71.8636 22.3996 71.8636C34.2955 71.8636 43.9393 67.6773 43.9393 62.5129V60.4848C43.9393 59.8284 43.7828 59.1879 43.4863 58.5699C41.4505 62.8152 32.7836 66.0054 22.3996 66.0054Z"
              fill="#1b5e20"/>
            <path
              d="M22.2231 76.9745C11.8392 76.9745 3.17223 73.7846 1.13643 69.5391C0.839953 70.1575 0.683411 70.798 0.683411 71.4541V73.482C0.683411 78.6463 10.3271 82.8327 22.2231 82.8327C34.1189 82.8327 43.7628 78.6463 43.7628 73.482V71.4539C43.7628 70.7975 43.6063 70.157 43.3098 69.5389C41.274 73.7845 32.607 76.9745 22.2231 76.9745Z"
              fill="#1b5e20"/>
          </svg>
          <p class="m-0 px-3 ">TOTAL SALES </p>
        </div>
        <p class="h4 py-3 pl-4 ml-5 total-sale-text" [ngClass]="totalSale ? 'total-sale-text-type' : ''">{{totalSale | currency: 'Tzs '}}</p>
      </div>
      <div class="d-flex flex-column justify-content-center align-items-center m-0 p-0" style="height: 200px">
        <smartstock-data-not-ready style="position: absolute" [width]="100" height="100" [isLoading]="isLoading"
                                   *ngIf="isLoading || (!totalSale && totalSale!==0)"></smartstock-data-not-ready>
        <div id="totalSales" class="w-100 h-75 m-0 p-0"></div>
        <button mat-button class="ml-auto mr-3 mt-0" color="primary">Explore More
          <mat-icon>arrow_forward</mat-icon>
        </button>
      </div>
    </mat-card>

<!--    <div style="height: 100%" class="d-flex justify-content-center align-items-center">-->
<!--      <span *ngIf="!isLoading" style="font-size: 30px">{{totalSale | currency: 'TZS '}}</span>-->
<!--      <smartstock-data-not-ready [width]="100" height="100" [isLoading]="isLoading"-->
<!--                                 *ngIf="isLoading  || (!totalSale && totalSale!==0)"></smartstock-data-not-ready>-->
<!--    </div>-->
  `,
  styleUrls: ['../styles/total-sales.style.scss'],
})
export class TotalSalesComponent implements OnInit {
  totalSale = 0;
  isLoading = false;
  totalSaleChart: Highcharts.Chart = undefined;
  @Input() dateRange: Observable<{ begin: Date, end: Date }>;
  @Input() initialDataRange: { begin: Date, end: Date };

  constructor(private readonly dashboardApi: AdminDashboardService) {
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
  private getTotalSale(dateRange: { begin: Date, end: Date }): void {
    this.isLoading = true;
    this.dashboardApi.getSalesOverview(toSqlDate(dateRange.begin), toSqlDate(dateRange.end), 'day').then(value => {
      this.isLoading = false;
      this.initiateGraph(value);
      this.totalSale = value.map(t => t.amount).reduce((acc, data) => acc + data, 0);
    }).catch(_ => {
      console.log(_);
      this.isLoading = false;
    });
  }

  // private getTotalSale(dateRange: { begin: Date, end: Date }): void {
  //   this.isLoading = true;
  //   this.dashboardApi.getTotalSale(toSqlDate(dateRange.begin), toSqlDate(dateRange.end)).then(value => {
  //     this.isLoading = false;
  //     this.totalSale = value[0].sales;
  //   }).catch(_ => {
  //     this.isLoading = false;
  //   });
  // }

  private initiateGraph(data: any): any {
    const saleDays = [];
    const totalSales = [];
    Object.keys(data).forEach(key => {
        saleDays.push(data[key].id);
        totalSales.push(data[key].amount);
    });
    // @ts-ignore
    this.totalSaleChart = Highcharts.chart('totalSales', {
      chart: {
        type: 'areaspline',
        spacingTop: 0,
        spacingRight: 0,
        spacingBottom: 0,
        spacingLeft: 0,
        plotBorderWidth: 0,
        margin: [0, -27, 4, -27]
      },
      title: {
        text: null
      },
      // @ts-ignore
      xAxis: {
        // allowDecimals: false,
        categories: saleDays,
        title: {
          text: null
        },
        labels: {
          // tslint:disable-next-line:typedef
          formatter() {
            return this.value;
          }
        },
        lineWidth: 0,
        visible: false,
        startOnTick: false,
        endOnTick: false,
      },
      // @ts-ignore
      yAxis: {
        lineWidth: 0,
        visible: false,
        startOnTick: false,
        endOnTick: false,
        title: {
          text: 'Total Sales'
        },
        labels: {
          // tslint:disable-next-line:typedef
          formatter() {
            return this.value;
          }
        }
      },
      plotOptions: {
        areaspline: {
          fillOpacity: 0.4,
        }
      },
      legend: false,
      tooltip: {
        valueDecimals: 2,
// pointFormat: '{series.name} had stockpiled <b>{point.y:,.0f}</b><br/>warheads in {point.x}'
      },
      // @ts-ignore
      series: [{
        name: 'Sales',
        color: '#199716',
        data: totalSales
      }]
    });
  }

}
