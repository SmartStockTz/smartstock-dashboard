import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {StorageService, UserService} from '@smartstocktz/core-libs';
import {BFast, bfast} from 'bfastjs';
import {FaasUtil} from '../utils/faas.util';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private readonly httpClient: HttpClient,
              private readonly userService: UserService,
              private readonly storage: StorageService) {
  }

  async getTotalSale(beginDate: string, endDate: string): Promise<{ sales: number }[]> {
    beginDate = moment(beginDate).format('YYYY-MM-DD');
    endDate = moment(endDate).format('YYYY-MM-DD');
    const activeShop = await this.userService.getCurrentShop();
    return bfast.functions(activeShop.projectId).request(
      FaasUtil.functionsUrl(`/reports/dashboard/sales/${beginDate}/${endDate}`, activeShop.projectId)
    ).get();
  }

  async getTotalGrossSale(beginDate: string, endDate: string): Promise<{ gross: number }[]> {
    beginDate = moment(beginDate).format('YYYY-MM-DD');
    endDate = moment(endDate).format('YYYY-MM-DD');
    const activeShop = await this.storage.getActiveShop();
    beginDate = moment(beginDate).format('YYYY-MM-DD');
    endDate = moment(endDate).format('YYYY-MM-DD');
    return bfast.functions(activeShop.projectId).request(
      FaasUtil.functionsUrl(`/reports/dashboard/gross/${beginDate}/${endDate}`, activeShop.projectId)
    ).get();
  }

  async costOfGoodSold(beginDate: string, endDate: string): Promise<{ cogs: number }[]> {
    beginDate = moment(beginDate).format('YYYY-MM-DD');
    endDate = moment(endDate).format('YYYY-MM-DD');
    const shop = await this.userService.getCurrentShop();
    return bfast.database(shop.projectId).collection('sales')
      .aggregate()
      .hashes([])
      .stage({
        $match: {
          $and: [
            {date: {$gte: beginDate}},
            {date: {$lte: endDate}},
          ]
        }
      })
      .stage({
        $group: {
          _id: '$batch',
          purchase: {$first: '$stock.purchase'},
          quantity: {$first: '$quantity'},
        },
      })
      .stage({
        $group: {
          _id: null,
          cogs: {
            $sum: {
              $multiply: ['$quantity', '$purchase']
            }
          }
        }
      })
      .find();
  }

  async netSalesProfitLoss(beginDate: string, endDate: string): Promise<{ total: number }> {
    beginDate = moment(beginDate).format('YYYY-MM-DD');
    endDate = moment(endDate).format('YYYY-MM-DD');
    const shop = await this.userService.getCurrentShop();
    const expenses = await this.expenses(beginDate, endDate);
    const gProfit = await bfast.database(shop.projectId)
      .collection('sales')
      .aggregate()
      .stage({
        $match: {
          $and: [
            {date: {$gte: beginDate}},
            {date: {$lte: endDate}},
          ]
        }
      })
      .stage({
        $group: {
          _id: '$batch',
          purchase: {$first: '$stock.purchase'},
          quantity: {$first: '$quantity'},
          amount: {$first: '$amount'},
        }
      })
      .stage({
        $group: {
          _id: null,
          gross: {
            $sum: {
              $subtract: ['$amount', {$multiply: ['$quantity', '$purchase']}]
            }
          }
        }
      })
      .find();
    return {total: gProfit[0].gross - expenses[0].total};
  }

  async netSalesProfitLossMargin(beginDate: string, endDate: string): Promise<{ total: number }> {
    beginDate = moment(beginDate).format('YYYY-MM-DD');
    endDate = moment(endDate).format('YYYY-MM-DD');
    const netP = await this.netSalesProfitLoss(beginDate, endDate);
    const sales = await this.getTotalSale(beginDate, endDate);
    return {total: (netP.total / sales[0].sales)};
  }


  async expenses(beginDate: string, endDate: string): Promise<{ total: number }[]> {
    beginDate = moment(beginDate).format('YYYY-MM-DD');
    endDate = moment(endDate).format('YYYY-MM-DD');
    const shop = await this.userService.getCurrentShop();
    return bfast.database(shop.projectId)
      .collection('expenses')
      .aggregate()
      .stage({
        $match: {
          $and: [
            {date: {$gte: beginDate}},
            {date: {$lte: endDate}},
          ]
        }
      })
      .stage({
        $group: {
          _id: null,
          total: {
            $sum: '$amount'
          }
        }
      })
      .find();
  }

  async soldItems(beginDate: string, endDate: string): Promise<number> {
    beginDate = moment(beginDate).format('YYYY-MM-DD');
    endDate = moment(endDate).format('YYYY-MM-DD');
    const shop = await this.userService.getCurrentShop();
    return bfast.database(shop.projectId)
      .collection('expenses')
      .query()
      .greaterThanOrEqual('date', beginDate)
      .lessThanOrEqual('date', endDate)
      .count(true)
      .find();
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
