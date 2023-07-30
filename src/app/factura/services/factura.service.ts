import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../../shared/services/base.service';
import { Factura } from '../../shared/types/Factura';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FileSaverService } from 'ngx-filesaver';

@Injectable({
  providedIn: 'root',
})
export class FacturaService extends BaseService<Factura> {
  constructor(
    httpClient: HttpClient,
    private fileSaverService: FileSaverService
  ) {
    super(httpClient, 'factura');
  }

  download(id: number): Observable<void> {
    return this.http
      .get(`${this.API_SERVER}/${this.endpoint}/${id}/document`, {
        responseType: 'blob',
      })
      .pipe(
        map((blob: Blob) => {
          this.fileSaverService.save(blob, `factura_${id}.pdf`);
        })
      );
  }
}
