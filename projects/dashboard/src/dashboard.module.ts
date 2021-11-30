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
import {DashboardPageComponent} from './pages/dashboard.page';
import {MatNativeDateModule} from '@angular/material/core';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {MatSortModule} from '@angular/material/sort';
import {TotalSalesComponent} from './components/total-sales.component';
import {DateComponent} from './components/date.component';
import {MatDividerModule} from '@angular/material/divider';
import {TotalGrossSaleComponent} from './components/total-gross-sale.component';
import {RouterModule, ROUTES, Routes} from '@angular/router';
import {LibModule} from '@smartstocktz/core-libs';
import {SalesCashComponent} from './components/sales-cash.component';
import {ExpensesComponent} from './components/expenditure.component';
import {ExpenditureCogsComponent} from './components/expenditure-cogs.component';
import {ItemsComponent} from './components/items.component';
import {ProfitComponent} from './components/profit.component';
import {ProfitAmountComponent} from './components/profit-amount.component';
import {ProfitMarginComponent} from './components/profit-margin.component';
import {ExpenditureExpenseComponent} from './components/expenditure-expense.component';
import {SalesInvoiceComponent} from './components/sales-invoice.component';


const routes: Routes = [
  {path: '', component: DashboardPageComponent},
];

@NgModule({
  declarations: [
    DashboardPageComponent,
    TotalSalesComponent,
    DateComponent,
    TotalGrossSaleComponent,
    SalesInvoiceComponent,
    SalesCashComponent,
    ExpenditureExpenseComponent,
    ExpenditureCogsComponent,
    ExpensesComponent,
    ItemsComponent,
    ProfitComponent,
    ProfitAmountComponent,
    ProfitMarginComponent
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
