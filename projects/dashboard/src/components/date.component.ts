import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { UserService } from "smartstock-core";
import { UntypedFormControl } from "@angular/forms";

@Component({
  selector: "app-current-shop",
  template: `
    <mat-card>
      <mat-card-content
        class="d-flex flex-lg-row flex-lg-row flex-md-row flex-sm-column flex-column align-items-center"
      >
        <div class="flex-grow-1 d-flex flex-row">
          <div class="d-flex flex-column justify-content-center">
            <h4 style="overflow: hidden; text-overflow: ellipsis;" *ngIf="shop">
              {{ shop.businessName }}
            </h4>
            <span style="width: 4px; height: 4px"></span>
            <mat-card-subtitle *ngIf="shop">{{
              shop.category
            }}</mat-card-subtitle>
          </div>
          <span style="flex: 1 1 auto"></span>
        </div>
        <div class="d-flex justify-content-center align-items-center">
          <mat-form-field appearance="fill">
            <mat-label>Choose a date</mat-label>
            <input
              [formControl]="dateControl"
              matInput
              [matDatepicker]="picker"
            />
            <mat-datepicker-toggle
              matSuffix
              [for]="picker"
            ></mat-datepicker-toggle>
            <mat-datepicker [touchUi]="true" #picker></mat-datepicker>
          </mat-form-field>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styleUrls: ["../styles/date-range.style.scss"]
})
export class DateComponent implements OnInit {
  shop: any;
  @Output() dateSelected = new EventEmitter<Date>();
  dateControl = new UntypedFormControl(new Date());

  constructor(private readonly userService: UserService) {}

  ngOnInit(): void {
    this.userService.getCurrentShop().then((value) => {
      this.shop = value;
    });
    this.dateSelected.emit(this.dateControl.value);
    this.dateControl.valueChanges.subscribe((value) => {
      if (value) {
        this.dateSelected.emit(value);
      }
    });
  }
}
