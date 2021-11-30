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
            <app-dashboard-profit-loss [data]="dashboardState.report | async"></app-dashboard-profit-loss>
            <app-sales-cash [data]="dashboardState.report | async"></app-sales-cash>
            <app-sales-invoice [data]="dashboardState.report | async"></app-sales-invoice>
            <app-dashboard-expenses [data]="dashboardState.report | async"></app-dashboard-expenses>
            <!--            <app-dashboard-stock-overview-component></app-dashboard-stock-overview-component>-->
          </div>
        </div>
      </ng-template>
    </app-layout-sidenav>
  `,
  styleUrls: ['../styles/dashboard.style.scss']
})
export class DashboardPageComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;
  dateRange = new Subject<Date>();
  initialRange: Date;

  constructor(public readonly dashboardState: DashboardState,
              public readonly deviceState: DeviceState) {
    document.title = 'SmartStock - Dashboard';
  }

  ngOnInit(): void {
    this.initialRange = new Date();
    this.dashboardState.summary(this.initialRange);
  }

  dateSelected(date: Date): void {
    this.initialRange = date;
    this.dashboardState.summary(this.initialRange);
  }
}
