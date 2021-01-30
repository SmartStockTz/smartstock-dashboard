import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {AdminDashboardService} from '../services/admin-dashboard.service';
import {toSqlDate} from '@smartstocktz/core-libs';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'smartstock-total-gross-sale',
  template: `
    <mat-card class="mat-elevation-z3 p-0 d-flex flex-column justify-content-between">
      <div>
        <div class="row pt-4 pl-4 m-0 align-items-center">
          <svg width="40" height="36" viewBox="0 0 488 412" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M51.725 316.622C48.025 320.322 43.625 323.322 38.925 325.322V350.822V393.022C38.925 403.122 47.125 411.222 57.125 411.222H98.125C108.225 411.222 116.325 403.022 116.325 393.022V350.822V297.022V254.822C116.325 253.922 116.225 253.022 116.125 252.222L51.725 316.622Z" fill="#1B5E20"/>
            <path d="M476.325 52.722C475.925 52.722 475.525 52.722 475.025 52.722C447.425 54.022 419.725 55.322 392.125 56.622C387.825 56.822 383.625 57.022 381.225 62.222C378.825 67.322 381.525 70.222 384.525 73.222C393.025 81.722 401.425 90.322 410.025 98.622L400.625 108.022L324.125 184.522L317.325 191.322L300.625 208.022L234.825 273.822L231.025 270.022L152.325 191.322L135.625 174.622L131.125 170.122C127.525 166.522 122.925 164.822 118.225 164.822C113.525 164.822 108.925 166.622 105.325 170.122L100.825 174.622L5.325 270.122C-1.775 277.222 -1.775 288.822 5.325 295.922L9.825 300.422C13.425 304.022 18.025 305.722 22.725 305.722C27.425 305.722 32.025 303.922 35.625 300.422L118.225 217.822L122.025 221.622L200.725 300.322L217.425 317.022L221.925 321.522C225.525 325.122 230.125 326.822 234.825 326.822C239.525 326.822 244.125 325.022 247.725 321.522L252.225 317.022L330.925 238.322L347.625 221.622L354.425 214.822L430.925 138.322L440.225 129.022L465.225 153.822C467.525 156.122 469.825 158.622 473.125 158.622C474.325 158.622 475.725 158.222 477.225 157.422C482.225 154.722 483.325 150.322 483.525 145.422C484.725 118.422 486.025 91.522 487.325 64.522C487.625 56.422 484.225 52.722 476.325 52.722Z" fill="#1B5E20"/>
            <path d="M201.025 333.422L184.325 316.722L148.325 280.722C146.725 283.422 145.825 286.622 145.825 289.922V297.122V385.922V393.122C145.825 403.222 154.025 411.322 164.025 411.322H205.025C215.125 411.322 223.225 403.122 223.225 393.122V385.922V348.422C216.625 346.522 210.525 342.922 205.525 337.922L201.025 333.422Z" fill="#1B5E20"/>
            <path d="M268.525 333.422L264.025 337.922C260.725 341.222 256.925 343.922 252.725 345.922V385.922V393.122C252.725 403.222 260.925 411.322 270.925 411.322H311.925C322.025 411.322 330.125 403.122 330.125 393.122V385.922V297.122V289.922C330.125 284.922 328.125 280.422 324.825 277.122L268.525 333.422Z" fill="#1B5E20"/>
            <path d="M370.725 231.122L363.925 237.922L359.525 242.322V254.822V263.422V297.022V305.622V350.722V392.922C359.525 403.022 367.725 411.122 377.725 411.122H418.725C428.825 411.122 436.925 402.922 436.925 392.922V350.722V305.722V297.122V263.522V254.922V209.722V167.522C436.925 166.722 436.825 165.922 436.725 165.122L370.725 231.122Z" fill="#1B5E20"/>
          </svg>              <p class="m-0 px-3 ">GROSS PROFIT </p>
        </div>
        <p class="h4 py-3 pl-4 ml-5 total-sale-text" [ngClass]="totalGrossSale ? 'total-sale-text-type' : ''">{{totalGrossSale | currency: 'Tzs '}}</p>
      </div>
      <div class="d-flex flex-column justify-content-center align-items-center m-0 p-0" style="height: 200px">
        <smartstock-data-not-ready style="position: absolute" [width]="100" height="100" [isLoading]="isLoading"
                                   *ngIf="isLoading || (!totalGrossSale && totalGrossSale!==0)"></smartstock-data-not-ready>
        <div id="grossProfit" class="w-100 h-75 m-0 p-0"></div>
        <button mat-button class="ml-auto mr-3 mt-0" color="primary">Explore More
          <mat-icon>arrow_forward</mat-icon>
        </button>
      </div>
    </mat-card>

    <!--    <div style="height: 100%" class="d-flex justify-content-center align-items-center">-->
<!--      <span *ngIf="!isLoading" style="font-size: 30px">{{totalGrossSale | currency: 'TZS '}}</span>-->
<!--      <smartstock-data-not-ready [width]="100" height="100" [isLoading]="isLoading"-->
<!--                                 *ngIf="isLoading || (!totalGrossSale && totalGrossSale!==0)"></smartstock-data-not-ready>-->
<!--    </div>-->
  `,
  styleUrls: ['../styles/total-gross-sale.style.scss']
})
export class TotalGrossSaleComponent implements OnInit {
  totalGrossSale = 0;
  isLoading = false;
  grossProfitChart: Highcharts.Chart = undefined;

  @Input() dateRange: Observable<{ begin: Date, end: Date }>;
  @Input() initialDataRange: { begin: Date, end: Date };

  constructor(private readonly dashboardApi: AdminDashboardService) {
  }

  ngOnInit(): void {
    if (this.initialDataRange) {
      this.getTotalGrossSale(this.initialDataRange);
    }
    this.dateRange.subscribe(value => {
      this.totalGrossSale = undefined;
      this.getTotalGrossSale(value);
    });
  }
  private getTotalGrossSale(dateRange: { begin: Date, end: Date }): void {
    this.isLoading = true;
    this.dashboardApi.getSalesOverview(toSqlDate(dateRange.begin), toSqlDate(dateRange.end), 'day').then(value => {
      this.initiateGraph(value);
      this.totalGrossSale = value.map(t => t.amount).reduce((acc, data) => acc + data, 0);
      this.isLoading = false;
    }).catch(_ => {
      console.log(_);
      this.isLoading = false;
    });
  }

  // private getTotalGrossSale(dateRange: { begin: Date, end: Date }): any {
  //   this.isLoading = true;
  //   this.dashboardApi.getTotalGrossSale(toSqlDate(dateRange.begin), toSqlDate(dateRange.end)).then(value => {
  //     this.isLoading = false;
  //     this.totalGrossSale = value[0].gross;
  //     console.log(value);
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
    this.grossProfitChart = Highcharts.chart('grossProfit', {
      chart: {
        // type: 'spline',
        spacingTop: 0,
        spacingRight: 0,
        spacingBottom: 0,
        spacingLeft: 0,
        plotBorderWidth: 0,
        margin: [0, -25, 4, -25]
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
            return this.value.toFixed(2);
          },
          crossShare: true,
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
            return this.value.toFixed(2);
          },
        },
        crossShare: true,
      },
      plotOptions: {
        area: {
          fillOpacity: 0,
        }
      },
      legend: false,
      tooltip: {
        valueDecimals: 2,
        shared: true,
        split: false,
        formatter(): any {
          return this.points[0].x + '<br> <span style="color: #1b5e20"> \u25CF</span>  ' +
            this.points[0].series.name + '<b>: ' + this.points[0].y.toFixed(2) + '</b>';
        }
      },
      // @ts-ignore
      series: [{
        name: 'Gross Profit',
        color: '#1B5E20',
        type: 'column',
        data: totalSales
      }, {
        name: 'Sales',
        color: '#1B5E20',
        type: 'spline',
        data: totalSales
      }]
    });
  }

}
