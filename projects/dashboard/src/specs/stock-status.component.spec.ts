import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StockStatusComponent } from '../components/stock-status.component';

describe('TotalStocksComponent', () => {
  let component: StockStatusComponent;
  let fixture: ComponentFixture<StockStatusComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StockStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
