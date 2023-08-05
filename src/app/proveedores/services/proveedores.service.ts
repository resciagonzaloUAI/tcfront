import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from 'src/app/shared/services/base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProveedoresService extends BaseService<any> {
  constructor(httpClient: HttpClient) {
    super(httpClient, 'proveedor');
  }

  uploadArticles(formData: any, idProveedor: number): Observable<any> {
    console.log(formData);

    return this.http.post(
      `${this.API_SERVER}/${this.endpoint}/upload-articles/${idProveedor}`,
      formData
    );
  }
}
