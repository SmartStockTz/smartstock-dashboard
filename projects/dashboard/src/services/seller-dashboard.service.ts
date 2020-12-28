import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SettingsService} from '@smartstocktz/core-libs';
import {StorageService} from '@smartstocktz/core-libs';

@Injectable()
export class SellerDashboardService {

  constructor(private readonly httpClient: HttpClient,
              private readonly storageService: StorageService,
              private readonly settingsService: SettingsService) {
  }

  getTotalSaleOfUserByDate(date: string): Promise<{ total: number }[]> {
    return new Promise<{ total: number }[]>(async (resolve, reject) => {
      try {
        const user = await this.storageService.getActiveUser();
        const activeShop = await this.storageService.getActiveShop();
        this.httpClient.get<{ total: number }[]>(
          this.settingsService.ssmFunctionsURL + `/dashboard/seller/sales/${user.id}/${activeShop.projectId}/${date}`, {
            headers: this.settingsService.ssmFunctionsHeader
          }).subscribe(value => {
          resolve(value);
        }, error => {
          reject(error);
        });
      } catch (e) {
        reject(e);
      }
    });
  }

  getTotalCostOfGoodSoldOfUserByDate(date: string): Promise<{ total: number }[]> {
    return new Promise<{ total: number }[]>(async (resolve, reject) => {
      try {
        const user = await this.storageService.getActiveUser();
        const activeShop = await this.storageService.getActiveShop();
        this.httpClient.get<{ total: number }[]>(
          this.settingsService.ssmFunctionsURL + `/dashboard/seller/stock/${user.id}/${activeShop.projectId}/${date}`, {
            headers: this.settingsService.ssmFunctionsHeader
          }).subscribe(value => {
          resolve(value);
        }, error => {
          reject(error);
        });
      } catch (e) {
        reject(e);
      }
    });
  }

  getSalesTrendByUserAndDates(fromDate: string, toDate: string): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const user = await this.storageService.getActiveUser();
        const activeShop = await this.storageService.getActiveShop();
        this.httpClient.get(this.settingsService.ssmFunctionsURL +
          `/dashboard/seller/salesGraphData/day/${user.id}/${activeShop.projectId}/${fromDate}/${toDate}`, {
          headers: this.settingsService.ssmFunctionsHeader
        }).subscribe(value => {
          resolve(value);
        }, error => {
          reject(error);
        });
      } catch (e) {
        reject(e);
      }
    });
  }

  getSoldProductsByDate(date: string): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const user = await this.storageService.getActiveUser();
        const activeShop = await this.storageService.getActiveShop();
        this.httpClient.get(this.settingsService.ssmFunctionsURL +
          `/dashboard/seller/dailySales/${user.id}/${activeShop.projectId}/${date}`, {
          headers: this.settingsService.ssmFunctionsHeader
        }).subscribe(value => {
          resolve(value);
        }, error => {
          reject(error);
        });
      } catch (e) {
        reject(e);
      }
    });
  }
}
