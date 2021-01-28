import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {StorageService} from '@smartstocktz/core-libs';
import bfast, {BFast} from 'bfastjs';
import {FaasUtil} from '../utils/faas.util';

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService {

  constructor(private readonly httpClient: HttpClient,
              private readonly storage: StorageService) {
  }

  async getTotalSale(beginDate: string, endDate: string): Promise<{ amount: number }> {
    const activeShop = await this.storage.getActiveShop();
    return bfast.functions(activeShop.projectId).request(
      FaasUtil.functionsUrl(`/reports/dashboard/sales/${beginDate}/${endDate}`, activeShop.projectId)
    ).get();
  }

  async getTotalGrossSale(beginDate: string, endDate: string): Promise<{ amount: number }> {
    const activeShop = await this.storage.getActiveShop();
    return bfast.functions(activeShop.projectId).request(
      FaasUtil.functionsUrl(`/reports/dashboard/cogs/${beginDate}/${endDate}`, activeShop.projectId)
    ).get();
  }

  async getStockStatus(): Promise<{ x: string; y: number }[]> {
    const activeShop = await this.storage.getActiveShop();
    let stocks = await this.storage.getStocks();
    const status: { x: string; y: number }[] = [];
    if (stocks && Array.isArray(stocks) && stocks.length > 0) {
      status.push({x: 'total', y: stocks.length});
      status.push({x: 'out', y: stocks.filter(stock => stock.quantity <= 0).length});
      status.push({x: 'order', y: stocks.filter(stock => stock.quantity <= stock.reorder).length});
    } else {
      stocks = await BFast.database(activeShop.projectId).collection('stocks').getAll(null, {});
      status.push({x: 'total', y: stocks.length});
      status.push({x: 'out', y: stocks.filter(stock => stock.quantity > 0).length});
      status.push({x: 'order', y: stocks.filter(stock => stock.quantity <= stock.reorder).length});
    }
    return status;
  }

  async getStockStatusByCategory(): Promise<{ x: string; y: number }[]> {
    const activeShop = await this.storage.getActiveShop();
    const categories = {};
    let stocks = await this.storage.getStocks();
    const status: { x: string; y: number }[] = [];
    if (stocks && Array.isArray(stocks) && stocks.length > 0) {
      stocks.forEach(stock => categories[stock.category] = stock.category);
      Object.keys(categories).forEach(category => {
        status.push({x: category, y: stocks.filter(stock => stock.category === category).length});
      });
    } else {
      stocks = await BFast.database(activeShop.projectId).collection('stocks').getAll(null, {});
      stocks.forEach(stock => categories[stock.category] = stock.category);
      Object.keys(categories).forEach(category => {
        status.push({x: category, y: stocks.filter(stock => stock.category === category).length});
      });
    }
    return status;
  }
}
