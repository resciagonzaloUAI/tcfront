import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from 'src/app/shared/services/base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReportesService extends BaseService<any> {
  constructor(httpClient: HttpClient) {
    super(httpClient, 'reportes');
  }

  getMostSoldProducts(): Observable<any> {
    return this.http.get(`${this.API_SERVER}/${this.endpoint}/products`);
  }

  getMostSoldClients(): Observable<any> {
    return this.http.get(`${this.API_SERVER}/${this.endpoint}/customers`);
  }

  getMostBuyProviders(): Observable<any> {
    return this.http.get(`${this.API_SERVER}/${this.endpoint}/providers`);
  }

  getSales(): Observable<any> {
    return this.http.get(`${this.API_SERVER}/${this.endpoint}/sales`);
  }
}
