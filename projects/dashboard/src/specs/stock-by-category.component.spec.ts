import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StockByCategoryComponent } from '../components/stock-by-category.component';

describe('StockByCategoryComponent', () => {
  let component: StockByCategoryComponent;
  let fixture: ComponentFixture<StockByCategoryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StockByCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
