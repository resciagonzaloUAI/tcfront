import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from 'src/app/shared/services/base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProveedoresService extends BaseService<any> {
  constructor(httpClient: HttpClient) {
    super(httpClient, 'proveedores');
  }

  uploadArticles(formData: any): Observable<any> {
    return this.http.post(`${this.API_SERVER}/${this.apiUrl}`, formData);
  }
}
