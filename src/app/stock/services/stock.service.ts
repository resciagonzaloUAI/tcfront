import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from 'src/app/shared/services/base.service';
import { Stock } from 'src/app/shared/types/Stock';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StockService extends BaseService<Stock> {
  constructor(private httpClient: HttpClient) {
    super(httpClient, 'stock');
  }

  // Method to get the stock for an articulo by its ID

  getStockForArticulo(tempSelectedArticulo: number): Observable<number> {
    return this.httpClient
      .get<number>(`${this.API_SERVER}/stock/${tempSelectedArticulo}`)
      .pipe(map((response: any) => response?.stock ?? 0));
  }
}
