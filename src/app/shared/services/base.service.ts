// base.service.ts

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export abstract class BaseService<T> {
  protected readonly API_SERVER = 'http://localhost:3000';

  protected constructor(
    protected http: HttpClient,
    protected endpoint: string
  ) {}

  getAll(params?: any): Observable<T[]> {
    return this.http.get<T[]>(`${this.API_SERVER}/${this.endpoint}`, {
      params,
    });
  }

  getById(id: any): Observable<T> {
    return this.http.get<T>(`${this.API_SERVER}/${this.endpoint}/${id}`);
  }

  create(item: T): Observable<T> {
    return this.http.post<T>(`${this.API_SERVER}/${this.endpoint}`, item);
  }

  update(item: T): Observable<T> {
    return this.http.put<T>(`${this.API_SERVER}/${this.endpoint}`, item);
  }

  delete(id: any): Observable<void> {
    return this.http.delete<void>(`${this.API_SERVER}/${this.endpoint}/${id}`);
  }
}
