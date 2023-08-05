import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from 'src/app/shared/services/base.service';
import { Articulo } from 'src/app/shared/types/Articulo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArticulosService extends BaseService<any> {
  constructor(httpClient: HttpClient) {
    super(httpClient, 'articulos');
  }
  getAllByProvs(providerId: string): Observable<Articulo[]> {
    return this.http.get<Articulo[]>(
      `${this.API_SERVER}/${this.endpoint}/proveedor/${providerId}`
    );
  }
}
