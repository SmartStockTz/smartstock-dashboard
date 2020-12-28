import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SalesProductFrequencyComponent } from '../components/sales-product-frequency.component';

describe('DashboardFrequentSoldProductComponent', () => {
  let component: SalesProductFrequencyComponent;
  let fixture: ComponentFixture<SalesProductFrequencyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesProductFrequencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesProductFrequencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
