import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TotalSalesComponent } from '../components/total-sales.component';

describe('TotalSalesComponent', () => {
  let component: TotalSalesComponent;
  let fixture: ComponentFixture<TotalSalesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalSalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
