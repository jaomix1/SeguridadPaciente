import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, retry, tap } from 'rxjs/operators';
import { BaseService } from '../baseService';
import { Query } from 'src/app/modelos/query/query';
import { ResponseContract } from 'src/app/modelos/responseContract';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PqService extends BaseService {
  private apiUrl: string = '/api/investigaciones/5p';
  constructor(@Inject('UrlApi') baseUrl: string, private http: HttpClient) {
    super(baseUrl);
  }

  send(data: any): Observable<any> {
    return this.http
      .post<ResponseContract<any>>(this._baseUrl + this.apiUrl, data)
      .pipe(
        map((response) => response.data),
        tap((a) => {
          this.logs('crear registro de PQs');
          this.logs(a);
        }),
        catchError(this.errorMgmt)
      );
  }

}
