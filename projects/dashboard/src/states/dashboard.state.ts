import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardState {
  test: BehaviorSubject<number> = new BehaviorSubject<any>(0);

  addTest(test: number): void {
    this.test.next(test);
  }

  reduceTest(qt: number): void {
    this.test.next(qt);
  }
}
