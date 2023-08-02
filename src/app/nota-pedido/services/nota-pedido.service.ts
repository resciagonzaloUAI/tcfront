import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from 'src/app/shared/services/base.service';
import { Observable } from 'rxjs';
import { NotaPedidoArticulo } from 'src/app/shared/types/NotaPedidoArticulo';

@Injectable({
  providedIn: 'root',
})
export class NotaPedidoService extends BaseService<any> {
  constructor(httpClient: HttpClient) {
    super(httpClient, 'nota-pedido');
  }

  getArticulosByNotaPedido(params?: any): Observable<NotaPedidoArticulo[]> {
    return this.http.get<NotaPedidoArticulo[]>(
      `${this.API_SERVER}/${this.endpoint}`,
      {
        params,
      }
    );
  }
}
