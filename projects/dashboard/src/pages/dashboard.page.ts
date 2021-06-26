import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {Subject} from 'rxjs';
import {DeviceState} from '@smartstocktz/core-libs';
import {DashboardState} from '../states/dashboard.state';

@Component({
  selector: 'app-dashboard-sales',
  template: `
    <app-layout-sidenav
      [heading]="'Dashboard'"
      [leftDrawer]="side"
      [body]="body"
      [leftDrawerMode]="(deviceState.enoughWidth | async)===true?'side': 'over'"
      [leftDrawerOpened]="(deviceState.enoughWidth | async)===true">
      <ng-template #side>
        <app-drawer></app-drawer>
      </ng-template>
      <ng-template #body>
        <div
          [ngStyle]="{padding: (deviceState.isSmallScreen | async)===true?'24px 0':'24px 16px', marginBottom: '24px'}"
          [ngClass]="(deviceState.isSmallScreen | async)===true?'container-fluid':'container'">
          <div class="col-12 col-lg-10 col-xl-10 offset-xl-1 offset-lg-1 offset-md-0 offset-sm-0">
            <app-current-shop (dateSelected)="dateSelected($event)"></app-current-shop>
            <p style="padding: 10px 0">
              Sales performance
            </p>
            <div class="row">
              <div style="margin-bottom: 10px" class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                <app-dash-card [title]="'Total Sales'"
                               reportLink="/report"
                               [content]="totalSaleComponent"
                               description="Total sale over specified period">
                  <ng-template #totalSaleComponent>
                    <app-total-sales [initialDataRange]="initialRange"
                                     [dateRange]="dateRange"></app-total-sales>
                  </ng-template>
                </app-dash-card>
              </div>
              <div style="margin-bottom: 10px" class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                <app-dash-card [title]="'Gross Profit'"
                               [content]="totalGrossProfit"
                               reportLink="/report"
                               description="Total gross profit over specified period">
                  <ng-template #totalGrossProfit>
                    <app-total-gross-sale [initialDataRange]="initialRange"
                                          [dateRange]="dateRange"></app-total-gross-sale>
                  </ng-template>
                </app-dash-card>
              </div>
            </div>
            <p style="padding: 10px 0">
              How are your stocks performing?
            </p>
            <div class="row">
              <div style="margin-bottom: 10px" class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                <app-dash-card [title]="'Stocks Health'"
                               [content]="stockHealth"
                               [reportLink]="'/report'"
                               description="Comparison of your total stocks and out of stock product">
                  <ng-template #stockHealth>
                    <app-stock-status></app-stock-status>
                  </ng-template>
                </app-dash-card>
              </div>
              <div style="margin-bottom: 10px" class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                <app-dash-card [title]="'Category Wise'"
                               [reportLink]="'/report'"
                               [content]="stockByCategory"
                               description="Category distribution of your stocks">
                  <ng-template #stockByCategory>
                    <app-stock-by-category></app-stock-by-category>
                  </ng-template>
                </app-dash-card>
              </div>
            </div>
          </div>
        </div>
      </ng-template>
    </app-layout-sidenav>
  `,
  styleUrls: ['../styles/dashboard.style.scss']
})
export class DashboardPageComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;
  dateRange = new Subject<{ begin: Date; end: Date }>();
  initialRange: { begin: Date; end: Date };

  constructor(public readonly dashboardState: DashboardState,
              public readonly deviceState: DeviceState) {
    document.title = 'SmartStock - Dashboard';
  }

  ngOnInit(): void {
  }

  dateSelected(dateRange: { begin: Date; end: Date }): void {
    this.initialRange = dateRange;
    this.dateRange.next(dateRange);
  }
}
