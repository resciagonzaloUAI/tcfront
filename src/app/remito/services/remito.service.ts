import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from 'src/app/shared/services/base.service';
import { Observable } from 'rxjs';
import { Remito } from 'src/app/shared/types/Remito';

@Injectable({
  providedIn: 'root',
})
export class RemitoService extends BaseService<Remito> {
  constructor(httpClient: HttpClient) {
    super(httpClient, 'remito');
  }

  cumpleRemito(id: number): Observable<Remito> {
    return this.http.patch(`${this.API_SERVER}/${this.endpoint}/${id}`, {});
  }
}
