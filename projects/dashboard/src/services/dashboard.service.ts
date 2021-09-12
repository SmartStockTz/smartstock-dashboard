import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {StorageService, UserService} from '@smartstocktz/core-libs';
import {database, functions} from 'bfast';
import {FaasUtil} from '../utils/faas.util';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private readonly httpClient: HttpClient,
              private readonly userService: UserService) {
  }

  async getTotalSale(date): Promise<{ sales: number }> {
    date = moment(date).format('YYYY-MM-DD');
    const activeShop = await this.userService.getCurrentShop();
    return functions(activeShop.projectId).request(
      FaasUtil.functionsUrl(`/reports/dashboard/sales/${date}/${date}`, activeShop.projectId)
    ).get();
  }

  async getTotalGrossSale(date: any): Promise<{ gross: number }> {
    date = moment(date).format('YYYY-MM-DD');
    const activeShop = await this.userService.getCurrentShop();
    return functions(activeShop.projectId).request(
      FaasUtil.functionsUrl(`/reports/dashboard/gross/${date}/${date}`, activeShop.projectId)
    ).get();
  }

  async costOfGoodSold(date: any): Promise<{ cogs: number }> {
    date = moment(date).format('YYYY-MM-DD');
    const activeShop = await this.userService.getCurrentShop();
    return functions(activeShop.projectId).request(
      FaasUtil.functionsUrl(`/reports/dashboard/cogs/${date}/${date}`, activeShop.projectId)
    ).get();
  }

  async netSalesProfitLoss(date: any): Promise<number> {
    date = moment(date).format('YYYY-MM-DD');
    const activeShop = await this.userService.getCurrentShop();
    return functions(activeShop.projectId).request(
      FaasUtil.functionsUrl(`/reports/dashboard/net/${date}/${date}`, activeShop.projectId)
    ).get();
  }

  async netSalesProfitLossMargin(date: any): Promise<number> {
    date = moment(date).format('YYYY-MM-DD');
    const activeShop = await this.userService.getCurrentShop();
    return functions(activeShop.projectId).request(
      FaasUtil.functionsUrl(`/reports/dashboard/margin/${date}/${date}`, activeShop.projectId)
    ).get();
  }


  async expenses(date: any): Promise<{ total: number }[]> {
    date = moment(date).format('YYYY-MM-DD');
    const activeShop = await this.userService.getCurrentShop();
    return functions(activeShop.projectId).request(
      FaasUtil.functionsUrl(`/reports/dashboard/expenses/${date}/${date}`, activeShop.projectId)
    ).get();
  }

  async soldItems(date: any): Promise<{ total: number }> {
    date = moment(date).format('YYYY-MM-DD');
    const activeShop = await this.userService.getCurrentShop();
    return functions(activeShop.projectId).request(
      FaasUtil.functionsUrl(`/reports/dashboard/sold/${date}/${date}`, activeShop.projectId)
    ).get();
  }

  // async getStockStatus(): Promise<{ x: string; y: number }[]> {
  //   const activeShop = await this.userService.getCurrentShop();
  //   let stocks = await this.storage.getStocks();
  //   const status: { x: string; y: number }[] = [];
  //   if (stocks && Array.isArray(stocks) && stocks.length > 0) {
  //     status.push({x: 'total', y: stocks.length});
  //     status.push({x: 'out', y: stocks.filter(stock => stock.quantity <= 0).length});
  //     status.push({x: 'order', y: stocks.filter(stock => stock.quantity <= stock.reorder).length});
  //   } else {
  //     stocks = await database(activeShop.projectId).collection('stocks').getAll(null, {});
  //     status.push({x: 'total', y: stocks.length});
  //     status.push({x: 'out', y: stocks.filter(stock => stock.quantity > 0).length});
  //     status.push({x: 'order', y: stocks.filter(stock => stock.quantity <= stock.reorder).length});
  //   }
  //   return status;
  // }

  // async getStockStatusByCategory(): Promise<{ x: string; y: number }[]> {
  //   const activeShop = await this.storage.getActiveShop();
  //   const categories = {};
  //   let stocks = await this.storage.getStocks();
  //   const status: { x: string; y: number }[] = [];
  //   if (stocks && Array.isArray(stocks) && stocks.length > 0) {
  //     stocks.forEach(stock => categories[stock.category] = stock.category);
  //     Object.keys(categories).forEach(category => {
  //       status.push({x: category, y: stocks.filter(stock => stock.category === category).length});
  //     });
  //   } else {
  //     stocks = await database(activeShop.projectId).collection('stocks').getAll(null, {});
  //     stocks.forEach(stock => categories[stock.category] = stock.category);
  //     Object.keys(categories).forEach(category => {
  //       status.push({x: category, y: stocks.filter(stock => stock.category === category).length});
  //     });
  //   }
  //   return status;
  // }
}
