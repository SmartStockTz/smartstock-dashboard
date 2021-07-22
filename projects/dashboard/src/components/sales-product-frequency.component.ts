import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatTableDataSource} from '@angular/material/table';
import {DashboardService} from '../services/dashboard.service';
import {LogService} from '@smartstocktz/core-libs';
import {SalesModel} from '../models/sale.model';

@Component({
  selector: 'app-dashboard-sales-product-frequency',
  template: `
    <div class="col-12">
      <div class="d-flex flex-row flex-wrap btn-block align-items-center">
        <mat-card-subtitle>Product Sold By Date</mat-card-subtitle>
        <span class="flex-grow-1"></span>
        <mat-form-field appearance="outline" style="margin-right: 8px">
          <mat-label>Date</mat-label>
          <input matInput [matDatepicker]="pickerDate" [formControl]="dateFormControl">
          <mat-datepicker-toggle matSuffix [for]="pickerDate"></mat-datepicker-toggle>
          <mat-datepicker [touchUi]="true" #pickerDate></mat-datepicker>
        </mat-form-field>
        <button (click)="reloadProducts()" [disabled]="getProductsProgress" mat-flat-button
                class="ft-button dashboard-refresh-button" color="primary">
          <mat-icon *ngIf="!getProductsProgress">refresh</mat-icon>
          <mat-progress-spinner *ngIf="getProductsProgress" style="display: inline-block"
                                mode="indeterminate"
                                [diameter]="15" color="primary">
          </mat-progress-spinner>
        </button>
      </div>

      <div class="col-12">
        <mat-form-field style="width: 100%">
          <mat-label>Filter</mat-label>
          <input matInput [formControl]="productFilterControl">
        </mat-form-field>
      </div>
      <mat-card class="mat-elevation-z1">
        <table *ngIf="soldProductsDatasource" mat-table [dataSource]="soldProductsDatasource">
          <ng-container matColumnDef="product">
            <th mat-header-cell *matHeaderCellDef>Product</th>
            <td style="max-width: 200px" mat-cell *matCellDef="let element">{{element.product}}</td>
            <td mat-footer-cell *matFooterCellDef></td>
          </ng-container>
          <ng-container matColumnDef="date">
            <th mat-header-cell *matHeaderCellDef>Time</th>
            <td mat-cell *matCellDef="let element">{{element.createdAt | date}}</td>
            <td mat-footer-cell *matFooterCellDef></td>
          </ng-container>
          <ng-container matColumnDef="quantity">
            <th mat-header-cell *matHeaderCellDef>Total Sold</th>
            <td mat-cell *matCellDef="let element">{{element.quantity}}</td>
            <td mat-footer-cell *matFooterCellDef></td>
          </ng-container>
          <ng-container matColumnDef="amount">
            <th mat-header-cell *matHeaderCellDef>Total Revenue</th>
            <td mat-cell *matCellDef="let element">{{element.amount}}</td>
            <td mat-footer-cell *matFooterCellDef></td>
          </ng-container>
          <tr mat-header-row *matHeaderRowDef="columns"></tr>
          <tr mat-row *matRowDef="let row; columns: columns;"></tr>
          <tr mat-footer-row style="font-size: 20px" *matFooterRowDef="columns"></tr>
        </table>

        <app-data-not-ready *ngIf="!soldProductsDatasource"></app-data-not-ready>

        <mat-paginator #soldProductPaginator [pageSizeOptions]="[25, 50, 75, 100]"
                       showFirstLastButtons></mat-paginator>

      </mat-card>
    </div>
  `,
  styleUrls: ['../styles/sales-product-frequency.style.scss'],
  providers: [
    DashboardService
  ]
})
export class SalesProductFrequencyComponent implements OnInit {
  dateFormControl = new FormControl();
  getProductsProgress = false;
  columns = ['product', 'date', 'quantity', 'amount'];
  soldProductsDatasource: MatTableDataSource<SalesModel>;
  @ViewChild('soldProductPaginator') soldProductPaginator: MatPaginator;
  productFilterControl = new FormControl('');

  constructor(private readonly _report: DashboardService,
              private readonly _logger: LogService,
              private readonly _snack: MatSnackBar) {
  }

  ngOnInit() {
    this.productFilterControl.valueChanges.subscribe(value => {
      if (value) {
        this.soldProductsDatasource.filter = value.toString().toLocaleLowerCase();
      }
    });
    this._getSoldProduct();
  }

  reloadProducts() {
  }

  _getSoldProduct() {
  }
}
