import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {DashboardService} from '../services/dashboard.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DashboardModel} from '../models/dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardState {
  loadReport = new BehaviorSubject(false);
  // @ts-ignore
  report = new BehaviorSubject<DashboardModel>({});

  constructor(private readonly dashboardService: DashboardService,
              private readonly snack: MatSnackBar) {
  }

  summary(date: Date): void {
    this.loadReport.next(true);
    this.dashboardService.dashboardSummary(date).then(value => {
      this.report.next(value);
    }).catch(reason => {
      this.snack.open(reason ? reason.message : reason.toString(), 'Ok', {
        duration: 2000
      });
    }).finally(() => {
      this.loadReport.next(false);
    });
  }
}
