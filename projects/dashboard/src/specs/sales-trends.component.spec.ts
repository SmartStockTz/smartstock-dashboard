import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SalesTrendsComponent } from '../components/sales-trends.component';

describe('DashboardSaleTrendsComponent', () => {
  let component: SalesTrendsComponent;
  let fixture: ComponentFixture<SalesTrendsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesTrendsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesTrendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
