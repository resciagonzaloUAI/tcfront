import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from 'src/app/shared/services/base.service';

@Injectable({
  providedIn: 'root',
})
export class RemitoService extends BaseService<any> {
  constructor(httpClient: HttpClient) {
    super(httpClient, 'almacen');
  }
}
