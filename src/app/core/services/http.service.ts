import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class BaseHttpService {
  constructor(protected http: HttpClient) {}

  protected get = <T>(url: string): Observable<T> => {
    return this.http.get<T>(url);
  };
}
