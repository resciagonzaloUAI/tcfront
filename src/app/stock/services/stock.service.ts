import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from 'src/app/shared/services/base.service';
import { Stock } from 'src/app/shared/types/Stock';

@Injectable({
  providedIn: 'root',
})
export class StockService extends BaseService<Stock> {
  constructor(httpClient: HttpClient) {
    super(httpClient, 'stock');
  }
}
