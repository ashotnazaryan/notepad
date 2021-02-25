import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) {

  }

  static parseParams = (params: { [key: string]: any }): HttpParams => {
    let submitParams = new HttpParams();

    Object.keys(params).forEach((key) => {
      submitParams = submitParams.append(key, params[key]);
    });

    return submitParams;
  }

  get = (url: string): Observable<any> => {
    return this.http.get(url);
  }
}