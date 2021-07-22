import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTableModule} from '@angular/material/table';
import {ReactiveFormsModule} from '@angular/forms';
import {SalesTrendsComponent} from './components/sales-trends.component';
import {SalesProductFrequencyComponent} from './components/sales-product-frequency.component';
import {DashboardPageComponent} from './pages/dashboard.page';
import {MatNativeDateModule} from '@angular/material/core';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {MatSortModule} from '@angular/material/sort';
import {TotalSalesComponent} from './components/total-sales.component';
import {DateRangeComponent} from './components/date-range.component';
import {MatDividerModule} from '@angular/material/divider';
import {TotalGrossSaleComponent} from './components/total-gross-sale.component';
import {StockStatusComponent} from './components/stock-status.component';
import {StockByCategoryComponent} from './components/stock-by-category.component';
import {StockExpiredComponent} from './components/stock-expired.component';
import {RouterModule, ROUTES, Routes} from '@angular/router';
import {ConfigsService, LibModule} from '@smartstocktz/core-libs';
import {DashboardStockOverviewComponent} from './components/dashboard-stock-overview.component';
import {DashboardSalesPerformanceComponent} from './components/dashboard-sales-performance.component';
import {DashboardExpensesComponent} from './components/dashboard-expenses.component';
import {CostOfGoodComponent} from './components/cost-of-good.component';
import {ExpensesComponent} from './components/expenses.component';
import {SoldItemsComponent} from './components/sold-items.component';
import {DashboardProfitLossComponent} from './components/dashboard-profit-loss.component';
import {NetSalesProfitComponent} from './components/net-sales-profit.component';
import {NetSalesProfitMarginComponent} from './components/net-sales-profit-margin.component';


const routes: Routes = [
  {path: '', component: DashboardPageComponent},
];

@NgModule({
  declarations: [
    SalesTrendsComponent,
    SalesProductFrequencyComponent,
    DashboardPageComponent,
    TotalSalesComponent,
    DateRangeComponent,
    TotalGrossSaleComponent,
    StockStatusComponent,
    StockByCategoryComponent,
    StockExpiredComponent,
    DashboardStockOverviewComponent,
    DashboardSalesPerformanceComponent,
    DashboardExpensesComponent,
    CostOfGoodComponent,
    ExpensesComponent,
    SoldItemsComponent,
    DashboardProfitLossComponent,
    NetSalesProfitComponent,
    NetSalesProfitMarginComponent
  ],
  imports: [
    CommonModule,
    {
      ngModule: RouterModule,
      providers: [
        {
          useValue: routes,
          multi: true,
          provide: ROUTES
        }
      ]
    },
    LibModule,
    MatSidenavModule,
    MatCardModule,
    MatFormFieldModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatNativeDateModule,
    MatTooltipModule,
    MatSelectModule,
    MatDividerModule,
  ]
})
export class DashboardModule {
  constructor() {
    // this.configs.addMenu({
    //   name: 'dashboard',
    //   link: '/dashboard',
    //   icon: 'dashboard',
    //   roles: ['admin'],
    //   pages: []
    // });
  }
}
