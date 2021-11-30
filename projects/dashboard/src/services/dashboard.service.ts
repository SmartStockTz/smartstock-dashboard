import {Injectable} from '@angular/core';
import {getDaasAddress, UserService} from '@smartstocktz/core-libs';
import {DashboardModel} from '../models/dashboard.model';
import {functions} from 'bfast';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private readonly userService: UserService) {
  }

  // private static validateDates(from, to): void {
  //   if (!from || from.toString() === '') {
  //     throw new Error('from query field required');
  //   }
  //   if (!to || to.toString() === '') {
  //     throw new Error('to query field required');
  //   }
  // }

  async dashboardSummary(date: Date): Promise<DashboardModel> {
    const shop = await this.userService.getCurrentShop();
    const url = getDaasAddress(shop);
    return functions().request(url + '/report/dashboard').get({
      params: {
        date: date.toISOString()
      }
    });
  }

  // async getTotalSale(date): Promise<{ sales: number }> {
  //   const sales = await this.getSales(date);
  //   const salesWithNoDup = sales.reduce((a, b) => {
  //     a[b.batch] = {
  //       _id: b.batch,
  //       amount: b.amount - (isNaN(b?.refund?.amount) === false ? b.refund.amount : 0),
  //     };
  //     return a;
  //   }, {});
  //   return Object.values<any>(salesWithNoDup).reduce((a, b) => {
  //     a.sales += b.amount;
  //     return a;
  //   }, {sales: 0, id: null});
  // }
  //
  // async getTotalGrossSale(date: any): Promise<{ gross: number }> {
  //   const sales = await this.getSales(date);
  //   const salesWithNoDup = sales.reduce((a, b) => {
  //     a[b.batch] = {
  //       _id: b.batch,
  //       quantity: b.quantity - (isNaN(b?.refund?.quantity) ? 0 : b.refund.quantity),
  //       amount: b.amount - (isNaN(b?.refund?.amount) ? 0 : b.refund.amount),
  //       purchase: b.stock?.purchase,
  //     };
  //     return a;
  //   }, {});
  //   return Object.values<any>(salesWithNoDup).reduce((a, b) => {
  //     a.gross += (b.amount - (b.quantity * b.purchase));
  //     return a;
  //   }, {gross: 0, id: null});
  // }
  //
  // async costOfGoodSold(date: any): Promise<{ cogs: number }> {
  //   const sales = await this.getSales(date);
  //   const salesWithNoDup = sales.reduce((a, b) => {
  //     a[b.batch] = {
  //       _id: b.batch,
  //       quantity: b.quantity - (isNaN(b?.refund?.quantity) === false ? b.refund.quantity : 0),
  //       purchase: b.stock?.purchase,
  //     };
  //     return a;
  //   }, {});
  //   return Object.values<any>(salesWithNoDup).reduce((a, b) => {
  //     a.cogs += (b.quantity * b.purchase);
  //     return a;
  //   }, {cogs: 0, id: null});
  // }
  //
  // async netSalesProfitLoss(date: any): Promise<number> {
  //   DashboardService.validateDates(date, date);
  //   const gross = await this.getTotalGrossSale(date);
  //   const expenses = await this.expenses(date);
  //   return gross.gross - expenses.total;
  // }
  //
  // async netSalesProfitLossMargin(date: any): Promise<number> {
  //   DashboardService.validateDates(date, date);
  //   const sales = await this.getTotalSale(date);
  //   const gross = await this.getTotalGrossSale(date);
  //   const expenses = await this.expenses(date);
  //   return (gross.gross - expenses.total) / sales.sales;
  // }
  //
  // async expenses(date: any): Promise<{ total: number }> {
  //   date = moment(date).format('YYYY-MM-DD');
  //   const activeShop = await this.userService.getCurrentShop();
  //   DashboardService.validateDates(date, date);
  //   const cids: string[] = await database(activeShop.projectId)
  //     .table('expenses')
  //     .query()
  //     .equalTo('date', date)
  //     .cids(true)
  //     .find();
  //   const expenses: any[] = await Promise.all(
  //     cids.map(c => {
  //       return IpfsService.getDataFromCid(c);
  //     })
  //   ) as any[];
  //   return expenses.reduce<any>((a, b) => {
  //     a.total += b.amount;
  //     return a;
  //   }, {total: 0, id: null});
  // }
  //
  // async soldItems(date: any): Promise<{ total: number }> {
  //   const sales = await this.getSales(date);
  //   const salesWithNoDup = sales.reduce((a, b) => {
  //     a[b.batch] = {
  //       _id: b.batch,
  //       quantity: b.quantity - (isNaN(b?.refund?.quantity) ? 0 : b.refund.quantity),
  //     };
  //     return a;
  //   }, {});
  //   return Object.values<any>(salesWithNoDup).reduce((a, b) => {
  //     a.total += b.quantity;
  //     return a;
  //   }, {total: 0, id: null});
  // }
  //
  // private async getSales(date): Promise<SalesModel[]> {
  //   date = moment(date).format('YYYY-MM-DD');
  //   const activeShop = await this.userService.getCurrentShop();
  //   DashboardService.validateDates(date, date);
  //   const cids: string[] = await database(activeShop.projectId)
  //     .table('sales')
  //     .query()
  //     .cids(true)
  //     .equalTo('date', date)
  //     .find();
  //   return await Promise.all(
  //     cids.map(c => {
  //       return IpfsService.getDataFromCid(c);
  //     })
  //   ) as any[];
  // }
}
