import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StockExpiredComponent } from '../components/stock-expired.component';

describe('StockExpiredComponent', () => {
  let component: StockExpiredComponent;
  let fixture: ComponentFixture<StockExpiredComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StockExpiredComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockExpiredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
